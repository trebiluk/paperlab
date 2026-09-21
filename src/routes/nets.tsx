import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { CubeStage } from "@/components/folding-cube";
import { NetSvg } from "@/components/net-svg";
import { pageTitle } from "@/lib/brand";
import { CUBE_NETS, QUIZ, type Hexomino } from "@/lib/nets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/nets")({
  component: NetsPage,
  head: () => ({
    meta: [{ title: pageTitle("Net lab") }],
  }),
});

function NetsPage() {
  const [selected, setSelected] = useState(CUBE_NETS[0]);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">Geometry lab · fold or fail</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Eleven nets. One cube. Some fakes.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          A net is a flat arrangement of polygons that folds into a solid.
          There are 35 hexominoes — shapes made of six squares — but only 11
          of them fold into a cube. The others overlap, leave a hole, or ask
          two faces to occupy the same side.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {CUBE_NETS.map((net) => (
                <li key={net.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(net)}
                    className={cn(
                      "card-lift flex h-full w-full flex-col gap-2 rounded-xl bg-surface p-3 text-left shadow-card",
                      selected.id === net.id && "ring-2 ring-pine/50",
                    )}
                  >
                    <div className="aspect-square">
                      <NetSvg net={net} />
                    </div>
                    <span className="text-sm font-medium">{net.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-surface p-5 shadow-card">
              <h2 className="font-display text-xl font-semibold">{selected.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{selected.note}</p>
            </div>
          </div>
          <aside className="rounded-xl bg-surface p-5 shadow-card">
            <p className="text-sm text-muted">Latin cross folding</p>
            <CubeStage size={64} className="mt-3" />
          </aside>
        </div>

        <Rules />
        <Quiz />
      </div>
    </AppShell>
  );
}

function Rules() {
  const rules = [
    {
      title: "Exactly six squares",
      body: "A cube has six faces. Fewer leaves a hole. More piles two faces on one side.",
    },
    {
      title: "No 2 × 2 block",
      body: "Four squares in a window cannot wrap a cube — those faces cannot meet that way.",
    },
    {
      title: "No five in a row",
      body: "A strip of five or six is too long. The last square lands on a face that is already there.",
    },
    {
      title: "Watch for collisions",
      body: "A few hexominoes still overlap when folded even if they pass the first three tests. The wide U is the usual trap.",
    },
  ];
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-semibold">How to test a net</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {rules.map((r) => (
          <li key={r.title} className="rounded-xl bg-surface p-5 shadow-card">
            <h3 className="font-medium">{r.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [revealed, setRevealed] = useState(false);
  const score = QUIZ.filter((n) => answers[n.id] === n.valid).length;

  return (
    <section className="mt-14 mb-8">
      <h2 className="font-display text-2xl font-semibold">Fold or fail</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Would this fold into a cube? Tap yes or no. Six shapes — some stand
        up, some cheat.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUIZ.map((net) => (
          <QuizCard
            key={net.id}
            net={net}
            choice={answers[net.id] ?? null}
            revealed={revealed}
            onChoose={(v) => setAnswers((a) => ({ ...a, [net.id]: v }))}
          />
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button onClick={() => setRevealed(true)}>Reveal</Button>
        {revealed ? (
          <p className="text-sm font-medium tabular-nums text-ink-soft" aria-live="polite">
            {score} of {QUIZ.length} correct
          </p>
        ) : null}
      </div>
    </section>
  );
}

function QuizCard({
  net,
  choice,
  revealed,
  onChoose,
}: {
  net: Hexomino;
  choice: boolean | null;
  revealed: boolean;
  onChoose: (v: boolean) => void;
}) {
  const correct = revealed && choice === net.valid;
  const wrong = revealed && choice !== null && choice !== net.valid;
  return (
    <li
      className={cn(
        "flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-card",
        correct && "ring-2 ring-ok/40",
        wrong && "ring-2 ring-danger/40",
      )}
    >
      <div className="aspect-[4/3]">
        <NetSvg net={net} colored={false} />
      </div>
      <p className="text-sm font-medium">{net.name}</p>
      <div className="flex gap-2" role="radiogroup" aria-label={`${net.name}: folds or fails`}>
        <button
          type="button"
          role="radio"
          aria-checked={choice === true}
          onClick={() => onChoose(true)}
          className={cn(
            "h-11 flex-1 rounded-md text-sm font-medium",
            choice === true ? "bg-pine text-pine-fg" : "bg-bg-warm text-ink-soft",
          )}
        >
          Folds
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={choice === false}
          onClick={() => onChoose(false)}
          className={cn(
            "h-11 flex-1 rounded-md text-sm font-medium",
            choice === false ? "bg-ink text-surface" : "bg-bg-warm text-ink-soft",
          )}
        >
          Fails
        </button>
      </div>
      {revealed ? (
        <p className="text-sm text-ink-soft">
          {net.valid ? "This is a cube net. " : "Not a net. "}
          {net.note}
        </p>
      ) : null}
    </li>
  );
}
