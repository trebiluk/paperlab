import { LabSvg } from "@/components/lab-svg";
import type { Lab } from "@/lib/labs";
import { STUDIO_GUIDES, type GuidePhase } from "@/lib/studio-guides";

/** Same bar as the locking envelope: a diagram, then one action per line. */

function kidLine(raw: string) {
  return raw
    .trim()
    .replace(/[.]+$/, "")
    .replace(/\bWrite the names\b/g, "Write crew aliases. No legal names")
    .replace(/\bCrew names\b/g, "Crew aliases. No legal names")
    .replace(/\bA name on the outside\b/g, "An alias on the outside. No legal name")
    .replace(/\bgets your name\b/g, "gets your alias. No legal name")
    .replace(/\byour name\b/gi, "your alias");
}

function actionLines(text: string) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+|(?:\s+Then\s+)/)
    .map(kidLine)
    .filter((line) => line.length > 0);
}

function oneChange(problem: string) {
  const p = problem.toLowerCase();
  if (p.includes("cut")) return "Stop. Match the thick line. Cut only that.";
  if (p.includes("name")) return "Write the alias bigger. No legal name.";
  if (p.includes("wet glue")) return "Wait until the glue is dry. Then test.";
  if (p.includes("throw") && p.includes("drop")) return "Drop it. Do not throw.";
  if (p.includes("glue") || p.includes("tab")) return "Glue the tab only. Press. Wait.";
  if (p.includes("tear") || p.includes("rip")) return "Ask for scrap. Start that fold again.";
  if (p.includes("throw")) return "Throw softer. Change one thing only.";
  if (p.includes("diagonal") || p.includes("plus")) return "Unfold. Flip those folds. Try the pinch again.";
  if (p.includes("pocket") || p.includes("flap")) return "Open the pocket. Tuck once more.";
  return "Undo that step. Match the picture. Try once more.";
}

function phasesOf(lab: Lab): GuidePhase[] {
  const studio = STUDIO_GUIDES[lab.id];
  if (lab.steps.length === 0 && studio) return studio;
  if (lab.steps.length === 0) {
    return [{ visual: "system", title: "Make", lines: actionLines(lab.ell) }];
  }
  return lab.steps.map((step) => ({
    visual: step.visual,
    title: step.title,
    lines: actionLines(step.body.easy),
  }));
}

function Badge({ n }: { n: number }) {
  return (
    <span className="flex size-11 items-center justify-center rounded-full bg-pine text-base font-semibold text-pine-fg tabular-nums">
      {n}
    </span>
  );
}

function Step({ n, children }: { n: number; children: string }) {
  return (
    <li className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3 text-lg leading-snug text-ink">
      <Badge n={n} />
      <span className="pt-2">{children}</span>
    </li>
  );
}

export function StudentStepGuide({ lab }: { lab: Lab }) {
  const phases = phasesOf(lab);
  let n = 0;
  const goal = kidLine(lab.challenge ?? lab.ell);
  const stuck = lab.plan.snags.length
    ? lab.plan.snags
    : ["Stuck on a fold"];

  return (
    <div className="mt-6" data-student-guide={lab.id}>
      <section aria-labelledby="plan-need">
        <h2 id="plan-need" className="font-display text-2xl font-semibold text-ink">
          You need
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-lg text-ink-soft">
          {lab.materials.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-lg text-ink">
          <span className="font-semibold">Goal. </span>
          {goal}
        </p>
      </section>

      <section className="mt-10" aria-labelledby="plan-steps">
        <h2 id="plan-steps" className="font-display text-2xl font-semibold text-ink">
          Steps
        </h2>
        <p className="mt-2 text-ink-soft">Follow in order. One action each line.</p>
        {phases.map((phase, index) => (
          <figure key={`${phase.title}-${index}`} className="mt-8">
            <div
              className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-bg-warm"
              data-diagram={index + 1}
              data-diagram-visual={phase.visual}
            >
              <LabSvg visual={phase.visual} />
            </div>
            <figcaption className="mt-3 text-sm font-medium text-pine">
              Diagram {index + 1} · {phase.title}
            </figcaption>
            <ol className="mt-4 space-y-3">
              {phase.lines.map((line) => {
                n += 1;
                return (
                  <Step key={n} n={n}>
                    {line}
                  </Step>
                );
              })}
            </ol>
          </figure>
        ))}
      </section>

      <section className="mt-10" aria-labelledby="plan-done">
        <h2 id="plan-done" className="font-display text-2xl font-semibold text-ink">
          Done when
        </h2>
        <ul className="mt-3 space-y-2">
          {[...lab.plan.assessment.map(kidLine), "If you label it, write an alias. No legal name."].map((item) => (
            <li key={item} className="flex min-h-11 items-center gap-3 text-lg text-ink">
              <span className="size-5 shrink-0 rounded-sm border-2 border-ink" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="plan-stuck">
        <h2 id="plan-stuck" className="font-display text-2xl font-semibold text-ink">
          Stuck? Try this
        </h2>
        <p className="mt-2 text-ink-soft">One change. Stay calm.</p>
        <table className="mt-4 w-full text-left text-base text-ink">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 pr-3 font-semibold">Problem</th>
              <th className="py-2 font-semibold">One change</th>
            </tr>
          </thead>
          <tbody>
            {stuck.map((problem) => (
              <tr key={problem} className="border-b border-line/70 align-top">
                <th scope="row" className="py-3 pr-3 font-medium">
                  {problem.replace(/\.$/, "")}
                </th>
                <td className="py-3">{oneChange(problem)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-lg text-ink">
          <span className="font-semibold">Help path. </span>
          Try the table → ask a peer → ask Mr. K.
        </p>
        <p className="mt-2 text-lg text-ink">
          <span className="font-semibold">Pause. </span>
          Put paper down · breathe · come back to the same step number.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="plan-words">
        <h2 id="plan-words" className="font-display text-2xl font-semibold text-ink">
          Words
        </h2>
        <p className="mt-2 text-ink-soft">Say once.</p>
        <table className="mt-4 w-full text-left text-base text-ink">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 pr-3 font-semibold">Word</th>
              <th className="py-2 pr-3 font-semibold">Means</th>
              <th className="py-2 font-semibold">Spanish cognate</th>
            </tr>
          </thead>
          <tbody>
            {lab.vocab.map((word) => (
              <tr key={word.term} className="border-b border-line/70 align-top">
                <th scope="row" className="py-3 pr-3 font-semibold">
                  {word.term}
                </th>
                <td className="py-3 pr-3">{word.meaning}</td>
                <td className="py-3" lang="es">
                  {word.es}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
