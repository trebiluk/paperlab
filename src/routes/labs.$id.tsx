import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSvg } from "@/components/lab-svg";
import { pageTitle } from "@/lib/brand";
import {
  FAMILIES,
  clampStepIndex,
  familyName,
  getLab,
  isLabId,
  labNeighbors,
  minutesOf,
  parseStepParam,
  type Lab,
} from "@/lib/labs";
import { pickRead, useReadLevel, useRole } from "@/lib/lesson";
import { toggleLabDone, useLabDone } from "@/lib/progress";
import { ELL, SAFETY, SPED, TA, DESIGN_LOOP, loopPhaseFor } from "@/lib/supports";
import { mstName } from "@/lib/mst";
import { PERIOD_PATH, pathIndex, unitForLab } from "@/lib/units";
import { LabWatch } from "@/components/lab-watch";
import { skillOf, skillsOfLab } from "@/lib/skills";
import { TECHWORKS_NAME } from "@/lib/room";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/labs/$id")({
  component: LabPage,
  validateSearch: (s: Record<string, unknown>): { step?: number } => {
    const step = parseStepParam(s.step);
    return step ? { step } : {};
  },
  head: ({ params }) => ({
    meta: [{ title: pageTitle(getLab(params.id)?.name ?? "Lab") }],
  }),
});

function LabPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const lab = getLab(id);
  const read = useReadLevel();
  const role = useRole();
  const done = useLabDone(id);

  if (!lab || !isLabId(id)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-ink-soft">That lab is not on the list.</p>
        <Button asChild className="mt-4">
          <Link to="/labs" search={{ family: undefined, step: undefined, grade: undefined }}>
            All labs
          </Link>
        </Button>
      </div>
    );
  }

  const { prev, next } = labNeighbors(lab.id);
  const unit = unitForLab(lab.id);
  const idx = pathIndex(lab.id);
  const family = FAMILIES.find((f) => f.id === lab.family);
  const easy = read === "easy";
  const stepI = clampStepIndex(search.step, lab.steps.length);
  const phase = lab.steps.length
    ? loopPhaseFor(lab.steps[stepI]?.visual ?? "", stepI, lab.steps.length)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/labs"
          search={{ family: undefined, step: undefined, grade: undefined }}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-pine"
        >
          <ArrowLeft className="size-3.5" />
          All labs
        </Link>
        <button
          type="button"
          onClick={() => toggleLabDone(lab.id)}
          aria-pressed={done}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium",
            done ? "bg-ok/15 text-ok" : "bg-surface text-ink-soft shadow-card",
          )}
        >
          <Check className="size-4" aria-hidden />
          {done ? "Made on this Chromebook" : "We made this · +1 Gold"}
        </button>
      </div>

      <p className="mt-4 text-sm font-medium tracking-wide text-pine">
        {familyName(lab.family)}
        {unit ? ` · ${unit.name}` : ""}
        {idx >= 0 ? ` · ${idx + 1} of ${PERIOD_PATH.length}` : ""}
        {` · ${lab.grades} · ${lab.time}`}
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {lab.name}
      </h1>
      <p className={cn("mt-4 max-w-2xl text-ink-soft", easy && "text-lg leading-relaxed")}>
        {pickRead(read, lab.blurb)}
      </p>
      {easy ? null : (
        <>
          <p className="mt-3 max-w-2xl text-sm text-muted">{lab.teConcept}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {lab.mst.map((code) => (
              <li key={code} className="rounded-full bg-bg-warm px-3 py-1.5 text-xs font-medium text-pine">
                {code} · {mstName(code)}
              </li>
            ))}
          </ul>
        </>
      )}
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${TECHWORKS_NAME} skills`}>
        {skillsOfLab(lab).map((id) => {
          const s = skillOf(id);
          return (
            <li key={id}>
              <Link
                to="/skills"
                className="inline-flex h-9 items-center rounded-full bg-surface px-3 text-xs font-medium text-ink shadow-card"
              >
                {s?.name ?? id}
              </Link>
            </li>
          );
        })}
      </ul>
      {done ? <LabWatch labId={lab.id} /> : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface p-4 shadow-card sm:p-5">
          <p className="text-xs font-medium tracking-wide text-pine">On the desk</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {lab.materials.map((m) => (
              <li key={m} className="rounded-full bg-bg-warm px-3 py-1.5 text-sm text-ink">
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-card sm:p-5">
          <p className="text-xs font-medium tracking-wide text-pine">
            {easy ? "The test" : lab.challenge ? "Challenge" : lab.spec ? "Spec" : "The make"}
          </p>
          <p className={cn("mt-2 text-ink-soft", easy ? "text-lg leading-relaxed" : "text-sm")}>
            {lab.challenge ?? lab.spec ?? pickRead(read, lab.blurb)}
          </p>
        </div>
      </div>

      {easy || !lab.challenge || !lab.spec ? null : (
        <p className="mt-3 max-w-2xl rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
          <span className="font-medium text-ink">Spec. </span>
          {lab.spec}
        </p>
      )}

      <p className="mt-3 max-w-2xl text-sm text-muted">
        <span className="font-medium text-ink">Shop rule. </span>
        {shopRule(lab)}
      </p>

      {lab.studio ? (
        <div className="mt-8 rounded-xl bg-surface p-5 shadow-card sm:p-7">
          <h2 className="font-display text-2xl font-semibold">Open the studio</h2>
          <p className="mt-2 text-ink-soft">
            {family
              ? `Diagrams, a stepper, and printables for this ${family.name.toLowerCase()} lab live in the studio.`
              : "Diagrams, a stepper, and printables for this lab live in the studio."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link to={lab.studio.to} search={lab.studio.search}>
                Start the make
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            {role !== "student" ? (
              <Button asChild variant="secondary">
                <Link to="/plans/$id" params={{ id: lab.id }}>
                  <ClipboardList className="size-4" />
                  Lesson plan
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      ) : lab.steps.length > 0 ? (
        <Stepper key={lab.id} lab={lab} nextId={next.id} nextName={next.name} />
      ) : null}

      {role !== "student" ? <RoomNotes labId={lab.id} /> : null}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Words</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {lab.vocab.map((v) => (
            <li key={v.term} className="rounded-xl bg-surface p-4 shadow-card">
              <p className="font-medium">{v.term}</p>
              <p className="mt-1 text-sm text-ink-soft">{v.meaning}</p>
              <p lang="es" className="mt-1 text-sm text-ink-soft">
                {v.es}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {easy ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Say it</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Partner talk. Home language first is allowed, then one of these.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {ELL.frames.slice(0, 4).map((f) => (
              <li key={f} className="rounded-xl bg-surface p-4 text-lg leading-relaxed text-ink-soft shadow-card">
                {f}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lab.steps.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Design loop</h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {DESIGN_LOOP.map((d) => (
              <li
                key={d.id}
                className={cn(
                  "rounded-xl bg-surface p-3 shadow-card",
                  phase === d.id && "ring-2 ring-pine/50",
                )}
                aria-current={phase === d.id ? "step" : undefined}
              >
                <p className="text-xs font-medium tracking-wide text-pine">
                  {d.name}
                  {phase === d.id ? " · now" : ""}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{d.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="mt-10 flex flex-wrap justify-between gap-3">
        <Button asChild variant="secondary">
          <Link to="/labs/$id" params={{ id: prev.id }} search={{ step: 1 }}>
            <ArrowLeft className="size-4" />
            {prev.name}
          </Link>
        </Button>
        {role !== "student" ? (
          <Button asChild variant="ghost">
            <Link to="/plans/$id" params={{ id: lab.id }}>
              Lesson plan
            </Link>
          </Button>
        ) : null}
        <Button asChild variant="secondary">
          <Link to="/labs/$id" params={{ id: next.id }} search={{ step: 1 }}>
            {next.name}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Stepper({
  lab,
  nextId,
  nextName,
}: {
  lab: Lab;
  nextId: string;
  nextName: string;
}) {
  const read = useReadLevel();
  const role = useRole();
  const done = useLabDone(lab.id);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skipFocus = useRef(true);

  const count = lab.steps.length;
  const step = clampStepIndex(search.step, count);
  const current = lab.steps[step];
  const last = step === count - 1;
  const leftMin = lab.steps.slice(step).reduce((sum, s) => sum + minutesOf(s.minutes), 0);
  const totalMin = lab.steps.reduce((sum, s) => sum + minutesOf(s.minutes), 0) || 1;
  const spentMin = totalMin - leftMin + minutesOf(current.minutes);

  function go(index: number) {
    const next = Math.min(Math.max(index, 0), count - 1);
    if (next === step && search.step === next + 1) return;
    void navigate({
      search: (prev) => ({ ...prev, step: next + 1 }),
      resetScroll: false,
    });
  }

  useEffect(() => {
    const wanted = step + 1;
    if (search.step !== wanted) {
      void navigate({
        search: (prev) => ({ ...prev, step: wanted }),
        replace: true,
        resetScroll: false,
      });
    }
  }, [navigate, search.step, step]);

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
        if (target.closest("header") || target.closest('[role="radiogroup"]')) return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(step + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(step - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, count, navigate, search.step]);

  if (!current) return null;

  return (
    <div className="mt-8 grid gap-8 overflow-hidden lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div
            className="h-1 flex-1 overflow-hidden rounded-full bg-bg-warm"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalMin}
            aria-valuenow={spentMin}
            aria-valuetext={`${spentMin} of ${totalMin} minutes`}
            aria-label="Minutes through this lab"
          >
            <div
              className="h-full origin-left bg-pine transition-transform duration-200"
              style={{ transform: `scaleX(${spentMin / totalMin})` }}
            />
          </div>
          <p className="shrink-0 text-xs tabular-nums text-muted">{leftMin} min left</p>
        </div>
        <ol className="flex gap-1 overflow-x-auto pb-1">
          {lab.steps.map((s, i) => (
            <li key={`${i}-${s.title}`}>
              <button
                type="button"
                onClick={() => go(i)}
                className={cn(
                  "flex size-11 items-center justify-center rounded-md text-sm font-medium tabular-nums",
                  i === step ? "bg-pine text-pine-fg" : i < step ? "bg-moss/20 text-pine" : "bg-surface text-muted shadow-card",
                )}
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-current={i === step ? "step" : undefined}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <article className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
          <div aria-live="polite">
            <p className="text-xs font-medium tracking-wide text-muted">
              Step {step + 1} of {count} · {current.minutes}
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-2 font-display text-2xl font-semibold outline-none"
            >
              {current.title}
            </h2>
            <p className={cn("mt-4 leading-relaxed text-ink-soft", read === "easy" && "text-lg")}>
              {pickRead(read, current.body)}
            </p>
            {current.tip ? (
              <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
                <span className="font-medium text-ink">Tip. </span>
                {pickRead(read, current.tip)}
              </p>
            ) : null}
          </div>
          {last ? (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => toggleLabDone(lab.id)}
                aria-pressed={done}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium",
                  done ? "bg-ok/15 text-ok" : "bg-bg-warm text-ink",
                )}
              >
                <Check className="size-4" aria-hidden />
                {done ? "Marked as made" : "We made this · +1 Gold"}
              </button>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => go(step - 1)} disabled={step === 0}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {last ? (
              <Button asChild>
                <Link to="/labs/$id" params={{ id: nextId }} search={{ step: 1 }}>
                  Next lab · {nextName}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button onClick={() => go(step + 1)}>
                Keep going
                <ArrowRight className="size-4" />
              </Button>
            )}
            <p className="hidden text-xs text-muted sm:block">← → keys</p>
            {role !== "student" ? <CopyStepLink /> : null}
          </div>
        </article>
      </div>
      <aside className="order-first self-start lg:order-none lg:sticky lg:top-28">
        <div className="lab-frame overflow-hidden rounded-xl p-2 sm:p-3">
          <div className="mx-auto aspect-[4/3] w-full max-w-[22rem]">
            <LabSvg visual={current.visual} />
          </div>
        </div>
        <p className="mt-3 text-center text-sm font-medium text-ink-soft lg:hidden">{current.title}</p>
        {role === "teacher" ? (
          <p className="mt-2 text-center text-xs text-muted" title="Diagram id">
            {current.visual}
          </p>
        ) : null}
      </aside>
    </div>
  );
}

function CopyStepLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-pine"
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard can be blocked on a locked Chromebook */
        }
      }}
    >
      <Link2 className="size-3.5" aria-hidden />
      {copied ? "Copied" : "Copy this step"}
    </button>
  );
}

function shopRule(lab: Lab) {
  const byId: Record<string, number> = {
    beam: 8,
    catapult: 7,
    boat: 6,
    cup: 6,
    balloon: 3,
    chute: 4,
    copter: 4,
    pinwheel: 4,
    lantern: 10,
    whirligig: 11,
    kite: 11,
    grabber: 12,
  };
  if (lab.id in byId) return SAFETY[byId[lab.id]];
  if (lab.family === "fly") return SAFETY[1];
  return SAFETY[0];
}

function RoomNotes({ labId }: { labId: string }) {
  const lab = getLab(labId);
  const role = useRole();
  if (!lab) return null;
  if (role === "helper") {
    return (
      <section className="mt-10 rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-2xl font-semibold">Helper card</h2>
        <p className="mt-2 text-sm text-ink-soft">{TA.stance}</p>
        <p className="mt-3 text-sm text-ink-soft">
          <span className="font-medium text-ink">This lab. </span>
          {lab.ta}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Note title="Do" items={TA.do} />
          <Note title="Say" items={TA.say} />
          <Note title="Never" items={TA.dont} />
          <Note title="Watch" items={TA.watch} />
        </div>
      </section>
    );
  }
  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-2">
      <article className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold">ELL</h2>
        <p className="mt-2 text-sm text-ink-soft">{lab.ell}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {ELL.frames.slice(0, 4).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </article>
      <article className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold">Extra help</h2>
        <p className="mt-2 text-sm text-ink-soft">{lab.sped}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {SPED.access.slice(0, 3).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Button asChild variant="ghost" className="mt-3">
          <Link to="/plans/$id" params={{ id: lab.id }}>
            Full lesson plan
          </Link>
        </Button>
      </article>
    </section>
  );
}

function Note({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
        {items.slice(0, 4).map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
