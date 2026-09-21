import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { DevelopmentSvg, LineSample } from "@/components/development-svg";
import {
  CLOSING_SEAM,
  CONVENTION_QUIZ,
  LINE_TYPES,
  OTHER_CONVENTIONS,
  TABS,
  TAB_RULES,
  type LineKind,
  type TabId,
} from "@/lib/conventions";
import { pageTitle } from "@/lib/brand";
import { usePaper } from "@/lib/lesson";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/draw")({
  component: DrawPage,
  head: () => ({
    meta: [{ title: pageTitle("Development drawing") }],
  }),
});

const ALL_TABS = TABS.map((t) => t.id);

function DrawPage() {
  const paper = usePaper();
  const [highlight, setHighlight] = useState<LineKind | null>(null);
  const [layers, setLayers] = useState({
    construction: true,
    folds: true,
    tabs: true,
    labels: true,
    dimensions: true,
    glueMarks: true,
    matchMarks: true,
  });
  const [selected, setSelected] = useState<TabId | null>(null);

  const toggleLayer = (key: keyof typeof layers) =>
    setLayers((l) => ({ ...l, [key]: !l[key] }));

  const selectedTab = TABS.find((t) => t.id === selected);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">
          Grade 6 · Drawing conventions
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          The drawing that becomes a cube
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          In geometry this shape is a net. In technical drawing it is a{" "}
          <span className="font-medium text-ink">development</span> — the
          true-size unfolding of a solid, drawn with agreed line types, ready
          to cut, fold, and glue. Drafters anywhere should be able to read it.
        </p>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-semibold">Line types</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Tap a convention. The development keeps that line bright and fades
            the rest. Dashed fold lines are valley folds — fold toward you.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LINE_TYPES.map((lt) => (
              <li key={lt.id}>
                <button
                  type="button"
                  onClick={() =>
                    setHighlight((h) => (h === lt.id ? null : lt.id))
                  }
                  className={cn(
                    "card-lift flex h-full w-full flex-col gap-2 rounded-xl bg-surface p-4 text-left shadow-card",
                    highlight === lt.id && "ring-2 ring-pine/50",
                  )}
                >
                  <LineSample kind={lt.id} />
                  <span className="font-medium">{lt.name}</span>
                  <span className="text-xs text-muted">{lt.look}</span>
                  <span className="text-sm text-ink-soft">{lt.use}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {OTHER_CONVENTIONS.map((oc) => (
              <div
                key={oc.name}
                className="flex items-start gap-4 rounded-xl bg-surface p-4 shadow-card"
              >
                <div className="w-28 shrink-0 pt-1">
                  <LineSample
                    kind={oc.name.startsWith("Hidden") ? "hidden" : "centre"}
                  />
                </div>
                <div>
                  <p className="font-medium">{oc.name}</p>
                  <p className="text-xs text-muted">{oc.look}</p>
                  <p className="mt-1 text-sm text-ink-soft">{oc.use}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-bg-warm p-4">
            <p className="max-w-xl text-sm text-ink-soft">
              Dashed = valley (toward you). Dash-dot = mountain (away). Crease,
              fold-and-unfold, collapse, and tuck live next door.
            </p>
            <Button asChild variant="secondary">
              <Link to="/fold">Folding techniques</Link>
            </Button>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="rounded-xl bg-surface shadow-card">
            <div className="mx-auto aspect-[3/4] w-full max-w-xl">
              <DevelopmentSvg
                paper={paper}
                layers={layers}
                highlight={highlight}
                activeTabs={ALL_TABS}
                selectedTab={selected}
                onSelectTab={(id) =>
                  setSelected((cur) => (cur === id ? null : id))
                }
              />
            </div>
          </div>
          <aside className="flex flex-col gap-4">
            <div className="rounded-xl bg-surface p-4 shadow-card">
              <p className="text-sm font-medium">Show on the drawing</p>
              <ul className="mt-3 space-y-1">
                {(
                  [
                    ["construction", "Construction grid"],
                    ["folds", "Fold lines"],
                    ["tabs", "Glue tabs"],
                    ["glueMarks", "GLUE hatching"],
                    ["matchMarks", "Match letters A–G"],
                    ["labels", "Face names"],
                    ["dimensions", "Dimension"],
                  ] as const
                ).map(([key, label]) => (
                  <li key={key}>
                    <label className="flex h-11 cursor-pointer items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={layers[key]}
                        onChange={() => toggleLayer(key)}
                        className="size-4 accent-pine"
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-surface p-4 shadow-card">
              <p className="text-sm font-medium">Match a tab to its edge</p>
              <p className="mt-2 text-sm text-ink-soft">
                Click a tab on the drawing, or a letter below. The same letter
                sits on the edge it glues to.
              </p>
              <ul className="mt-3 grid grid-cols-4 gap-1.5">
                {TABS.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelected((cur) => (cur === t.id ? null : t.id))
                      }
                      className={cn(
                        "flex size-11 w-full items-center justify-center rounded-md font-display text-lg font-semibold",
                        selected === t.id
                          ? "bg-pine text-pine-fg"
                          : "bg-bg-warm text-ink",
                      )}
                      aria-pressed={selected === t.id}
                      aria-label={`Tab ${t.mark}, ${t.gluesTo}`}
                    >
                      {t.mark}
                    </button>
                  </li>
                ))}
                <li>
                  <span
                    className="flex size-11 w-full items-center justify-center rounded-md bg-bg-warm font-display text-lg font-semibold text-ink"
                    title={CLOSING_SEAM.note}
                  >
                    G
                  </span>
                </li>
              </ul>
              {selectedTab ? (
                <p className="mt-3 text-sm text-ink-soft">
                  <span className="font-medium text-ink">
                    Tab {selectedTab.mark}
                  </span>{" "}
                  on {selectedTab.host} glues to {selectedTab.gluesTo}.{" "}
                  {selectedTab.why}
                </p>
              ) : (
                <p className="mt-3 text-sm text-ink-soft">{CLOSING_SEAM.note}</p>
              )}
            </div>
            <Button asChild variant="secondary">
              <Link to="/print">
                <Printer className="size-4" />
                Print this development
              </Link>
            </Button>
          </aside>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Rules for glue tabs
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {TAB_RULES.map((r) => (
              <li key={r.title} className="rounded-xl bg-surface p-5 shadow-card">
                <h3 className="font-medium text-ink">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <ConventionQuiz />

        <section className="mt-12 mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
            <h2 className="font-display text-2xl font-semibold">
              Draw it yourself
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-soft">
              <li>Light construction grid: three squares across, four down.</li>
              <li>Shade or label the six keepers of the Latin cross.</li>
              <li>
                Draw six tapered tabs in the leftover squares — one per free
                side of Top, Bottom, and Back.
              </li>
              <li>Thick continuous outline around faces and tabs (the cut).</li>
              <li>
                Thin dashed fold lines on every shared edge, including tab
                hinges.
              </li>
              <li>
                Letter tabs A–F and copy each letter onto the matching free
                edge. Letter G on Top’s outer edge and Back’s outer edge (no
                tab).
              </li>
              <li>Write GLUE on each tab. Add one dimension: the edge length.</li>
              <li>
                Title block: “Development of a cube,” your name, and the scale
                (1:1, full size).
              </li>
            </ol>
          </div>
          <div className="rounded-xl bg-surface p-5 shadow-card">
            <p className="text-xs font-medium tracking-wide text-muted">
              Title block · example
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="border-b border-line pb-2">
                <dt className="text-xs text-muted">Title</dt>
                <dd className="font-medium">Development of a cube</dd>
              </div>
              <div className="border-b border-line pb-2">
                <dt className="text-xs text-muted">Name</dt>
                <dd className="text-faint">________________</dd>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-xs text-muted">Grade</dt>
                  <dd>6</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Scale</dt>
                  <dd>1:1</dd>
                </div>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ConventionQuiz() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [show, setShow] = useState(false);
  const score = useMemo(
    () => CONVENTION_QUIZ.filter((q) => picked[q.id] === q.answer).length,
    [picked],
  );

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold">Read the drawing</h2>
      <p className="mt-2 text-ink-soft">
        Four questions on conventions. Choose an answer, then check.
      </p>
      <ol className="mt-5 grid gap-4">
        {CONVENTION_QUIZ.map((q, i) => (
          <li key={q.id} className="rounded-xl bg-surface p-5 shadow-card">
            <p className="font-medium">
              {i + 1}. {q.prompt}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {q.options.map((opt) => {
                const isSelected = picked[q.id] === opt.id;
                const correct = show && opt.id === q.answer;
                const wrong = show && isSelected && opt.id !== q.answer;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPicked((p) => ({ ...p, [q.id]: opt.id }))}
                    className={cn(
                      "h-11 rounded-md px-4 text-sm font-medium",
                      isSelected && !show && "bg-pine text-pine-fg",
                      !isSelected && !show && "bg-bg-warm text-ink-soft",
                      correct && "bg-ok text-pine-fg",
                      wrong && "bg-danger text-surface",
                      show && !correct && !wrong && "bg-bg-warm text-ink-soft",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {show ? (
              <p className="mt-3 text-sm text-ink-soft">{q.explain}</p>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button onClick={() => setShow(true)}>Check answers</Button>
        {show ? (
          <p className="text-sm font-medium tabular-nums text-ink-soft">
            {score} of {CONVENTION_QUIZ.length} correct
          </p>
        ) : null}
      </div>
    </section>
  );
}
