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

function kidDone(raw: string) {
  return kidLine(raw)
    .replace(/\bHead inverted, not torn\b/g, "The head is a small fold, not a tear")
    .replace(/\bFail mode named\b/g, "Say what went wrong")
    .replace(/\bOral IPO\b/g, "Say what goes in, what the paper does, and what comes out")
    .replace(/\bOral: input, process, output\b/g, "Say what goes in, what the paper does, and what comes out")
    .replace(/\bOral: /g, "Say: ")
    .replace(/\bF, E, V\b/g, "faces, edges, and corners")
    .replace(/\bv2\b/g, "the second try")
    .replace(/\bboth axes\b/g, "both ways")
    .replace(/≥/g, "at least ")
    .replace(/\blabeled as waste\b/g, "labeled leftover")
    .replace(/\blabeled waste\b/g, "labeled leftover");
}

function actionLines(text: string) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+|(?:\s+Then\s+)/)
    .map(kidLine)
    .filter((line) => line.length > 0);
}

function diagramFile(labId: string, index: number, visual: string) {
  if (labId === "folds") {
    const named: Record<string, string> = {
      "scrap-flat": "01-scrap-flat.svg",
      "valley-toward": "valley-fold.jpg",
      "mountain-away": "mountain-fold.jpg",
      "fold-unfold-tuck": "fold-and-unfold.svg",
      "dashed-valley-match": "dashed-valley.svg",
    };
    if (named[visual]) return named[visual];
  }
  return `${String(index + 1).padStart(2, "0")}-${visual}.svg`;
}

function oneChange(problem: string) {
  const p = problem.toLowerCase();
  if (p.includes("cut")) return "Stop. Cut only the thick line.";
  if (p.includes("dashed")) return "That line is a fold. Tape it if you cut it.";
  if (p.includes("valley") || p.includes("mountain")) return "A valley folds toward you. A mountain folds away.";
  if (p.includes("square")) return "The sides have to match. Refold the corner before you cut.";
  if (p.includes("face")) return "The face stays on the outside. Unfold and flip those folds.";
  if (p.includes("name")) return "Write the alias bigger. No legal name.";
  if (p.includes("wet glue") || p.includes("glue")) return "Glue the tab only. Press. Wait until it holds.";
  if (p.includes("throw") && p.includes("drop")) return "Drop it. Do not throw.";
  if (p.includes("tear") || p.includes("rip")) return "Ask for scrap. Start that fold again.";
  if (p.includes("throw") || p.includes("fly") || p.includes("flight")) return "Change one thing only. Throw it the same way.";
  if (p.includes("span") || p.includes("brick") || p.includes("sag")) return "Make the top stiffer. Do not add tape you do not have.";
  if (p.includes("spin") || p.includes("pin")) return "Loosen the pin. The blades have to move.";
  if (p.includes("diagonal") || p.includes("plus")) return "Unfold. Flip those folds. Try the pinch again.";
  if (p.includes("pocket") || p.includes("flap")) return "Open the pocket. Tuck once more.";
  return "Match the picture for this step. Change one thing only.";
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

function StepLine({ children }: { children: string }) {
  return <li className="text-lg font-medium leading-snug text-ink">{children}</li>;
}

export function StudentStepGuide({ lab }: { lab: Lab }) {
  const phases = phasesOf(lab);
  const goal = kidLine(lab.challenge ?? lab.ell);
  const stuck = lab.plan.snags.length
    ? lab.plan.snags
    : ["Stuck on a fold"];

  return (
    <div className="mt-6" data-student-guide={lab.id}>
      <section className="sheet-section" aria-labelledby="plan-need">
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

      {lab.vocab.length > 0 ? (
        <section className="sheet-section" aria-labelledby="plan-words">
          <h2 id="plan-words" className="font-display text-2xl font-semibold text-ink">
            Words
          </h2>
          <p className="mt-2 text-ink-soft">You will use these. A fold toward you is a valley. A fold away from you is a mountain.</p>
          <table className="mt-4 w-full text-left text-base text-ink">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 pr-3 font-semibold">Word</th>
                <th className="py-2 pr-3 font-semibold">Means</th>
                <th className="py-2 font-semibold">Spanish</th>
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
      ) : null}

      <section className="sheet-section" aria-labelledby="plan-steps">
        <h2 id="plan-steps" className="font-display text-2xl font-semibold text-ink">
          Steps
        </h2>
        <p className="mt-2 text-ink-soft">Follow in order. The number is the picture. One action each line.</p>
        {phases.map((phase, index) => {
          const file = diagramFile(lab.id, index, phase.visual);
          const stepNo = index + 1;
          return (
          <figure key={`${phase.title}-${index}`} className="mt-8">
            <img
              src={`${import.meta.env.BASE_URL}images/plans/${lab.id}/${file}`}
              alt={`Step ${stepNo}: ${phase.title}. ${phase.lines[0] ?? "Fold diagram"}.`}
              width={800}
              height={520}
              data-diagram={stepNo}
              data-diagram-file={file}
              className="h-auto w-full rounded-xl bg-surface object-contain"
            />
            <figcaption className="mt-3 text-sm font-medium text-pine">
              Step {stepNo} · {phase.title}
            </figcaption>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {phase.lines.map((line, lineIndex) => (
                <StepLine key={`${stepNo}-${lineIndex}`}>{line}</StepLine>
              ))}
            </ul>
          </figure>
          );
        })}
      </section>

      <section className="sheet-section" aria-labelledby="plan-done">
        <h2 id="plan-done" className="font-display text-2xl font-semibold text-ink">
          Done when
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-lg text-ink">
          {[...lab.plan.assessment.map(kidDone), "If you label it, write an alias. No legal name."].map((item) => (
            <li key={item} className="min-h-11">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet-section" aria-labelledby="plan-stuck">
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
          Try the table. Then ask a partner. Then ask the teacher.
        </p>
        <p className="mt-2 text-lg text-ink">
          <span className="font-semibold">Pause. </span>
          Put the paper down. Breathe. Come back to the same step.
        </p>
      </section>
    </div>
  );
}
