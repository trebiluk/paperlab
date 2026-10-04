import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Lab } from "@/lib/labs";
import { labNeighbors, minutesOf } from "@/lib/labs";
import { useGradeBand } from "@/lib/lesson";
import { setLabDone, useLabDone } from "@/lib/progress";
import { recordMake } from "@/lib/hub-record";
import { useCopy, useLineStatus } from "@/lib/copy";
import { useHubDir, useHubT } from "@/lib/hub-lang";
import { ReadAloud } from "@/components/read-aloud";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FoldIcon, SymbolStrip, symbolCopyKey, symbolsFor, type FoldSymbol } from "@/components/fold-icons";
import { StepDiagram, ZoomSheet, stepAccent } from "@/components/step-diagram";
import { SAFETY } from "@/lib/supports";
import { cn } from "@/lib/utils";

const START = new Set(["folds", "balloon", "hat", "cup", "pinwheel"]);
const WASH: Record<string, string> = {
  fold: "#e5f3f1",
  make: "#e7f2f8",
  fly: "#e5f4fb",
  hold: "#f8efd8",
  move: "#eef6e4",
  draw: "#f6f1e6",
};

function checksKey(id: string) {
  return `ppl-step-checks-v1:${id}`;
}

function loadChecks(id: string, count: number) {
  const blank = Array.from({ length: count }, () => false);
  try {
    const raw = JSON.parse(sessionStorage.getItem(checksKey(id)) || "null") as unknown;
    if (!Array.isArray(raw)) return blank;
    return blank.map((item, i) => raw[i] === true || item);
  } catch {
    return blank;
  }
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("pl-toast", { detail: message }));
}

export function StepCard({ lab, index, phases }: {
  lab: Lab;
  index: number;
  phases: { visual: string; title: string; lines: string[] }[];
}) {
  const copy = useCopy();
  const status = useLineStatus();
  const t = useHubT();
  const dir = useHubDir();
  const grade = useGradeBand();
  const done = useLabDone(lab.id);
  const phase = phases[index];
  const count = phases.length;
  const last = index === count - 1;
  const accent = stepAccent(index);
  const [checks, setChecks] = useState(() => loadChecks(lab.id, count));
  const [finish, setFinish] = useState(false);
  const [didLast, setDidLast] = useState(false);
  const [passed, setPassed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [help, setHelp] = useState<FoldSymbol | null>(null);
  const [ruleOn, setRuleOn] = useState(false);
  const [started] = useState(() => Date.now());
  const symbols = symbolsFor(phase?.visual ?? "");
  const backGlyph = dir === "rtl" ? "→" : "←";
  const nextGlyph = dir === "rtl" ? "←" : "→";
  const leftMin = lab.steps.slice(index).reduce((sum, step) => sum + minutesOf(step.minutes), 0) || Math.max(1, phases.length - index);
  const rule = SAFETY[0];
  const { next } = labNeighbors(lab.id, grade);
  const wash = START.has(lab.id) ? "#e5f3f1" : WASH[lab.family] ?? "#f4efe6";

  useEffect(() => {
    sessionStorage.setItem(checksKey(lab.id), JSON.stringify(checks));
  }, [checks, lab.id]);

  useEffect(() => {
    if (index !== 0) return;
    const key = `ppl-rule-seen:${lab.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    setRuleOn(true);
  }, [index, lab.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        document.getElementById("pl-next")?.click();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        document.getElementById("pl-back")?.click();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function mark(i: number, on: boolean) {
    setChecks((prev) => prev.map((item, n) => (n === i ? on : item)));
  }

  function finishMake() {
    if (!done) {
      recordMake({
        level: lab.id,
        score: count,
        max: count,
        stars: 3,
        xp: 1,
        ms: Date.now() - started,
      });
      setLabDone(lab.id, true);
      toast(copy("plusGold"));
    }
    setCelebrate(true);
  }

  async function copyStep() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* locked Chromebook */
    }
    toast(copy("copied"));
  }

  if (!phase) return null;
  const title = status(phase.title);
  const lines = phase.lines.map((line) => status(line));
  const ready = didLast && passed;
  const spin = celebrate && lab.id === "pinwheel" && phase.visual === "pinwheel-spin";

  return (
    <div
      className="flex h-full min-h-0 flex-col"
      style={{ background: wash }}
      data-step-card={lab.id}
      data-step={index + 1}
      data-student-guide={lab.id}
    >
      <div className="pl-body flex min-h-0 flex-1 flex-col">
        <figure
          data-fold-diagram
          dir="ltr"
          className="pl-fig relative min-h-0 bg-white"
          onTouchStart={(e) => {
            (e.currentTarget as HTMLElement).dataset.x = String(e.changedTouches[0]?.clientX ?? 0);
          }}
          onTouchEnd={(e) => {
            const start = Number((e.currentTarget as HTMLElement).dataset.x || 0);
            const dx = (e.changedTouches[0]?.clientX ?? 0) - start;
            if (dx > 48) document.getElementById("pl-back")?.click();
            if (dx < -48) document.getElementById("pl-next")?.click();
          }}
        >
          <StepDiagram
            visual={phase.visual}
            accent={accent}
            label={`${title.text}. ${lines[0]?.text ?? ""}`}
            spin={spin}
            wiggle={celebrate && !spin}
            onZoom={() => setZoom(true)}
          />
          {celebrate ? (
            <div className="pl-stamp pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <span className="pl-stamp-mark grid size-36 place-items-center rounded-full border-4 border-current text-center text-xl font-semibold" style={{ color: accent }}>
                {copy("madeIt")}
              </span>
            </div>
          ) : null}
          {celebrate ? <Confetti accent={accent} /> : null}
          {celebrate ? <span className="pl-coin" aria-hidden /> : null}
        </figure>
        <div className="pl-side flex min-h-0 flex-1 flex-col bg-white">
          <div className="pl-panel min-h-0 flex-1 overflow-y-auto px-3 pt-2">
            <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label={copy("step")}>
              {phases.map((item, i) => (
                <Link
                  key={`${item.visual}-${i}`}
                  to="/labs/$id"
                  params={{ id: lab.id }}
                  search={{ step: i + 1 }}
                  aria-current={i === index ? "step" : undefined}
                  className="inline-flex size-11 items-center justify-center"
                  title={status(item.title).text}
                >
                  <span
                    className={cn(
                      "grid size-3.5 place-items-center rounded-full border-2 text-[10px] font-semibold text-white",
                      i === index ? "scale-110" : "",
                      checks[i] || i < index ? "text-white" : "bg-white",
                    )}
                    style={{
                      borderColor: accent,
                      background: i === index || checks[i] ? accent : "transparent",
                      color: checks[i] || i === index ? "#fff" : accent,
                    }}
                  >
                    {checks[i] ? "✓" : ""}
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-sm font-medium text-ink">
              <bdi>{lab.name}</bdi>
            </p>
            <p className="text-sm font-medium" style={{ color: accent }}>
              {copy("step")} {index + 1} {copy("of")} {count}
              <span className="ms-2 font-normal text-ink-soft">
                {copy("minLeft").replace("{n}", String(Math.max(1, leftMin)))}
              </span>
            </p>
            <h2 className="font-display text-xl font-semibold text-ink" lang={title.missing ? "en" : undefined} data-untranslated={title.missing ? "" : undefined}>
              <bdi>{title.text}</bdi>
            </h2>
            {finish && last ? (
              <div className="mt-2 grid gap-2">
                <p className="text-base text-ink-soft" lang={lab.challenge && status(lab.challenge).missing ? "en" : undefined} data-untranslated={lab.challenge && status(lab.challenge).missing ? "" : undefined}>
                  {lab.challenge ? status(lab.challenge).text : ""}
                </p>
                <button type="button" aria-pressed={didLast} onClick={() => setDidLast((v) => !v)} className="inline-flex min-h-11 items-center gap-2 border-2 border-ink px-3 text-base font-medium">
                  <span aria-hidden>{didLast ? "✓" : "○"}</span>
                  {copy("didLast")}
                </button>
                <button type="button" aria-pressed={passed} onClick={() => setPassed((v) => !v)} className="inline-flex min-h-11 items-center gap-2 border-2 border-ink px-3 text-base font-medium">
                  <span aria-hidden>{passed ? "✓" : "○"}</span>
                  {copy("passed")}
                </button>
              </div>
            ) : (
              <ul className="pl-lines mt-1 space-y-0.5">
                {lines.map((line, i) => (
                  <li key={i} className="text-ink" lang={line.missing ? "en" : undefined} data-untranslated={line.missing ? "" : undefined}>
                    {line.text}
                  </li>
                ))}
              </ul>
            )}
            <SymbolStrip
              symbols={symbols}
              labelFor={(id) => copy(symbolCopyKey(id) as "valley")}
              onOpen={(id) => {
                setHelp(id);
                const dialog = document.getElementById("pl-help");
                if (dialog instanceof HTMLDialogElement) dialog.showModal();
                window.dispatchEvent(new CustomEvent("pl-help-symbol", { detail: id }));
              }}
            />
            <div className="mt-1 flex flex-wrap gap-2">
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center gap-1 border-2 border-ink px-2 text-sm font-medium" aria-pressed={checks[index]} onClick={() => mark(index, !checks[index])}>
                ✓ {copy("didStep")}
              </button>
              <Sheet>
                <SheetTrigger className="inline-flex min-h-11 min-w-11 items-center border-2 border-ink px-2 text-sm font-medium">
                  📖 {copy("words")}
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[70dvh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{copy("words")}</SheetTitle>
                  </SheetHeader>
                  <ul className="space-y-2 p-4 text-base">
                    {lab.vocab.map((word) => (
                      <li key={word.term}>
                        <span className="font-semibold">{word.term}</span> · {word.meaning}
                      </li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
              <ReadAloud text={lines.map((line) => line.text).join(". ")} />
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center border-2 border-ink px-2 text-sm font-medium" onClick={() => setRuleOn(true)}>
                ⚠ {copy("shopChip")}
              </button>
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center border-2 border-ink px-2 text-sm font-medium" onClick={() => void copyStep()}>
                {copy("copied") === "Copied" ? "⧉" : "⧉"} {copy("step")}
              </button>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 border-t border-line px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {index > 0 ? (
              <Link
                id="pl-back"
                to="/labs/$id"
                params={{ id: lab.id }}
                search={{ step: index }}
                className="inline-flex min-h-14 min-w-14 items-center justify-center border-2 border-ink bg-white px-4 text-base font-medium text-ink"
              >
                <span aria-hidden>{backGlyph}</span>
                <span className="ml-1">{copy("back")}</span>
              </Link>
            ) : (
              <span id="pl-back" className="inline-flex min-h-14 min-w-14 items-center px-4 text-base text-muted" aria-disabled>
                {backGlyph} {copy("back")}
              </span>
            )}
            {celebrate && last ? (
              <>
                <Link
                  id="pl-next"
                  to="/labs/$id"
                  params={{ id: next.id }}
                  search={{ step: 1 }}
                  className="pl-next inline-flex min-h-14 min-w-40 flex-1 items-center justify-center px-4 text-base font-semibold text-white"
                  style={{ background: accent }}
                >
                  {copy("nextLab")} {nextGlyph}
                </Link>
                <button type="button" className="inline-flex min-h-14 items-center border-2 border-ink px-3 text-base font-medium" onClick={() => setCelebrate(false)}>
                  {copy("again")}
                </button>
              </>
            ) : last && finish ? (
              <button
                id="pl-next"
                type="button"
                onClick={() => {
                  if (ready || done) finishMake();
                }}
                className="pl-next inline-flex min-h-14 min-w-40 flex-1 items-center justify-center px-4 text-center text-base font-semibold text-white"
                style={{ background: accent }}
              >
                {done ? copy("made") : ready ? `${copy("weMade")} · ${copy("plusGold")}` : copy("whyWait")}
              </button>
            ) : last ? (
              <button
                id="pl-next"
                type="button"
                className="pl-next inline-flex min-h-14 min-w-40 flex-1 items-center justify-center px-4 text-base font-semibold text-white"
                style={{ background: accent }}
                onClick={() => {
                  mark(index, true);
                  setFinish(true);
                }}
              >
                {copy("finishBtn")} ✓
              </button>
            ) : (
              <Link
                id="pl-next"
                to="/labs/$id"
                params={{ id: lab.id }}
                search={{ step: index + 2 }}
                onClick={() => mark(index, true)}
                className="pl-next inline-flex min-h-14 min-w-40 flex-1 items-center justify-center px-4 text-base font-semibold text-white"
                style={{ background: accent }}
              >
                {copy("nextStep")} <span className="ml-1">{nextGlyph}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {ruleOn ? (
        <div className="fixed inset-0 z-[65] flex items-end justify-center bg-ink/40 sm:items-center" role="dialog" aria-modal onClick={() => setRuleOn(false)}>
          <div className="w-full max-w-md bg-white p-4 shadow-card" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-semibold">{copy("shopChip")}</p>
            <p className="mt-2 text-base">{rule === SAFETY[0] ? copy("scissors") : rule}</p>
            <button type="button" className="mt-4 inline-flex min-h-11 min-w-11 items-center border-2 border-ink px-3 font-medium" onClick={() => setRuleOn(false)}>
              {t("close", "Close")}
            </button>
          </div>
        </div>
      ) : null}
      <ZoomSheet open={zoom} onClose={() => setZoom(false)} visual={phase.visual} accent={accent} closeLabel={t("close", "Close")} title={copy("zoom")} />
      {help ? <span className="sr-only">{help}</span> : null}
    </div>
  );
}

function Confetti({ accent }: { accent: string }) {
  const bits = [accent, "#0e7490", "#c2410c", "#a16207", "#4d7c0f", "#be185d"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map((color, i) => (
        <span key={color} className="pl-bit" style={{ left: `${8 + i * 14}%`, background: color, animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );
}
