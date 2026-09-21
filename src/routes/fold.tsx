import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { TechniqueSample, TechniqueSvg } from "@/components/fold-svg";
import {
  FOLD_QUIZ,
  FOLD_TECHNIQUES,
  type FoldKind,
} from "@/lib/folds";
import { pageTitle } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fold")({
  component: FoldPage,
  head: () => ({
    meta: [{ title: pageTitle("Folding techniques") }],
  }),
});

function FoldPage() {
  const [active, setActive] = useState<FoldKind>("valley");
  const tech = FOLD_TECHNIQUES.find((t) => t.id === active) ?? FOLD_TECHNIQUES[1];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">
          Grade 3–8 · Paper folding
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Name the fold. Then make it.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Drawing has line types. Folding has moves. A dashed line on the
          development is a valley fold. A star of creases on a square is a
          collapse waiting to happen. Learn the six moves, then the cube
          (glued or origami) stops being a trick.
        </p>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-semibold">The six moves</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Tap a move. Try it on a scrap of paper before you touch the cube
            sheet.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FOLD_TECHNIQUES.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActive(t.id)}
                  aria-pressed={active === t.id}
                  className={cn(
                    "card-lift flex h-full min-h-11 w-full flex-col gap-2 rounded-xl bg-surface p-4 text-left shadow-card",
                    active === t.id && "ring-2 ring-pine/50",
                  )}
                >
                  <TechniqueSample id={t.id} />
                  <span className="font-medium">{t.name}</span>
                  <span className="text-xs text-muted">{t.look}</span>
                  <span className="text-sm text-ink-soft">{t.also}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="overflow-hidden rounded-xl bg-surface shadow-card">
            <div className="mx-auto aspect-[4/3] w-full max-w-xl p-4">
              <TechniqueSvg key={active} id={active} />
            </div>
          </div>
          <aside className="flex flex-col gap-4">
            <div className="rounded-xl bg-surface p-5 shadow-card">
              <p className="text-xs font-medium tracking-wide text-muted">
                How to do it
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">
                {tech.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {tech.do}
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                <span className="font-medium text-ink">Where. </span>
                {tech.use}
              </p>
            </div>
            <div className="rounded-xl bg-bg-warm p-5">
              <p className="text-sm font-medium">Try it on a scrap</p>
              <p className="mt-2 text-sm text-ink-soft">
                {tryIt(active)}
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            One crease, two names
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl bg-surface p-5 shadow-card">
              <h3 className="font-medium">Flip it</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Make a valley. Turn the paper over. That same crease is now a
                mountain. Origami diagrams pick a side and name the folds from
                that side. That is why the waterbomb diagonals are folded on
                the back.
              </p>
            </article>
            <article className="rounded-xl bg-surface p-5 shadow-card">
              <h3 className="font-medium">Line up, then press</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Hold the edges (or points) together first. Then crease.
                Creasing while you still hunt for the line makes a crooked
                wall. The letter-paper cube grid is only fold-and-unfold plus
                lining up.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Two cubes, same moves
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl bg-surface p-5 shadow-card">
              <p className="text-xs font-medium tracking-wide text-muted">
                Net cube · glue
              </p>
              <p className="mt-2 font-medium">Valley on every dashed line</p>
              <p className="mt-2 text-sm text-ink-soft">
                Pre-fold the five face hinges and the six tab hinges toward
                you. Unfold flat, then glue. Sharp valleys make the cube snap
                instead of fight.
              </p>
              <Button asChild variant="secondary" className="mt-4">
                <Link to="/build" search={{ path: "net" }}>
                  Build the net cube
                </Link>
              </Button>
            </li>
            <li className="rounded-xl bg-surface p-5 shadow-card">
              <p className="text-xs font-medium tracking-wide text-muted">
                Origami balloon · no glue
              </p>
              <p className="mt-2 font-medium">
                Square, plus, X, collapse, tuck
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Cut a square first. Book folds are valleys. Flip, then
                diagonals (mountains). Collapse the waterbomb base. Tuck four
                pockets. Inflate.
              </p>
              <Button asChild variant="secondary" className="mt-4">
                <Link to="/build" search={{ path: "origami" }}>
                  Fold the balloon
                </Link>
              </Button>
            </li>
          </ul>
        </section>

        <FoldQuiz />
      </div>
    </AppShell>
  );
}

function tryIt(id: FoldKind) {
  if (id === "crease")
    return "Fold a scrap in half. Press with a fingernail. Open it. If the crease springs back, press harder.";
  if (id === "valley")
    return "Hold the paper so the fold comes toward your chest. That is a valley. The dashed lines on the cube net are this move.";
  if (id === "mountain")
    return "Fold a valley, then flip the scrap. You did not make a new crease — you renamed it.";
  if (id === "unfold")
    return "Fold edge to edge, crease, open. Fold each half to that center crease. Open. You just made a quartered sheet — the letter-paper grid.";
  if (id === "collapse")
    return "On a small square: plus on one side, both diagonals on the other. Pinch the four side midpoints. The paper should fall into a triangle.";
  return "Fold a small triangle flap. Make a pocket next to it (fold a bit of the edge in). Slide the flap all the way in, then crease.";
}

function FoldQuiz() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [show, setShow] = useState(false);
  const score = useMemo(
    () => FOLD_QUIZ.filter((q) => picked[q.id] === q.answer).length,
    [picked],
  );

  return (
    <section className="mt-12 mb-8">
      <h2 className="font-display text-2xl font-semibold">Check the moves</h2>
      <p className="mt-2 text-ink-soft">
        Four questions. Choose, then check. A scrap of paper is allowed.
      </p>
      <ol className="mt-5 grid gap-4">
        {FOLD_QUIZ.map((q, i) => (
          <li key={q.id} className="rounded-xl bg-surface p-5 shadow-card">
            <p className="font-medium">
              {i + 1}. {q.prompt}
            </p>
            <div
              className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
              role="radiogroup"
              aria-label={`Question ${i + 1}`}
            >
              {q.options.map((opt) => {
                const isSelected = picked[q.id] === opt.id;
                const correct = show && opt.id === q.answer;
                const wrong = show && isSelected && opt.id !== q.answer;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setPicked((p) => ({ ...p, [q.id]: opt.id }))}
                    className={cn(
                      "min-h-11 rounded-md px-4 py-2 text-sm font-medium",
                      isSelected && !show && "bg-pine text-pine-fg",
                      !isSelected && !show && "bg-bg-warm text-ink-soft",
                      correct && "bg-ok text-pine-fg",
                      wrong && "bg-danger text-surface",
                      show && !correct && !wrong && "bg-bg-warm text-ink-soft",
                    )}
                  >
                    {opt.label}
                    {show && correct ? " · yes" : show && wrong ? " · no" : ""}
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
        <Button type="button" onClick={() => setShow(true)}>
          Check answers
        </Button>
        {show ? (
          <p className="text-sm font-medium tabular-nums" aria-live="polite">
            {score} / {FOLD_QUIZ.length}
          </p>
        ) : null}
      </div>
    </section>
  );
}
