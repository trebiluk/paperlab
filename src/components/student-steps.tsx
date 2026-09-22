import { LabSvg } from "@/components/lab-svg";
import { labThumb, type Lab } from "@/lib/labs";

/** Easy step guide for every plan except the locking envelope, which has its own diagrams. */

function Badge({ n }: { n: number }) {
  return (
    <span className="flex size-11 items-center justify-center rounded-full bg-pine text-base font-semibold text-pine-fg tabular-nums">
      {n}
    </span>
  );
}

function Picture({ visual }: { visual: string }) {
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EEF2F7]">
      <LabSvg visual={visual} />
    </div>
  );
}

export function StudentStepGuide({ lab }: { lab: Lab }) {
  if (lab.steps.length === 0) {
    const example = lab.challenge ?? lab.plan.assessment[0] ?? "Hold the product. Count or fly.";
    return (
      <div className="mt-6" data-student-guide={lab.id}>
        <h2 className="font-display text-2xl font-semibold text-ink">Steps</h2>
        <p className="mt-2 text-lg text-ink-soft">Follow in order. One action each line.</p>
        <div className="mt-4">
          <Picture visual={labThumb(lab)} />
        </div>
        <p className="mt-4 text-lg leading-snug text-ink">{lab.ell}</p>
        <h2 className="mt-8 font-display text-2xl font-semibold text-ink">Example</h2>
        <p className="mt-3 text-lg leading-snug text-ink">{example}</p>
        <DoneWhen items={lab.plan.assessment} />
      </div>
    );
  }

  return (
    <div className="mt-6" data-student-guide={lab.id}>
      <h2 className="font-display text-2xl font-semibold text-ink">Steps</h2>
      <p className="mt-2 text-lg text-ink-soft">Follow in order. One action each line.</p>
      <ol className="mt-6 space-y-8">
        {lab.steps.map((step, index) => (
          <li key={step.title}>
            <Picture visual={step.visual} />
            <div className="mt-4 grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3">
              <Badge n={index + 1} />
              <p className="pt-2 text-lg leading-snug text-ink">{step.body.easy}</p>
            </div>
          </li>
        ))}
      </ol>
      <DoneWhen items={lab.plan.assessment} />
    </div>
  );
}

function DoneWhen({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10" aria-labelledby="plan-done">
      <h2 id="plan-done" className="font-display text-2xl font-semibold text-ink">
        Done when
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex min-h-11 items-center gap-3 text-lg text-ink">
            <span className="size-5 shrink-0 rounded-sm border-2 border-ink" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
