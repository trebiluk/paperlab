import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSvg } from "@/components/lab-svg";
import { pageTitle } from "@/lib/brand";
import { getLab, isLabId, labNeighbors } from "@/lib/labs";
import { pickRead, useReadLevel, useRole } from "@/lib/lesson";
import { ELL, SPED, TA, DESIGN_LOOP } from "@/lib/supports";
import { mstName } from "@/lib/mst";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/labs/$id")({
  component: LabPage,
  head: ({ params }) => ({
    meta: [{ title: pageTitle(getLab(params.id)?.name ?? "Lab") }],
  }),
});

function LabPage() {
  const { id } = Route.useParams();
  const lab = getLab(id);
  const read = useReadLevel();
  const role = useRole();

  if (!lab || !isLabId(id)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-ink-soft">That lab is not on the list.</p>
        <Button asChild className="mt-4">
          <Link to="/labs">All labs</Link>
        </Button>
      </div>
    );
  }

  const { prev, next } = labNeighbors(lab.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/labs" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-pine">
        <ArrowLeft className="size-3.5" />
        All labs
      </Link>
      <p className="mt-4 text-sm font-medium tracking-wide text-pine">
        {lab.family} · {lab.grades} · {lab.time}
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {lab.name}
      </h1>
      <p className={cn("mt-4 max-w-2xl text-ink-soft", read === "easy" && "text-lg leading-relaxed")}>
        {pickRead(read, lab.blurb)}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-muted">{lab.teConcept}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {lab.mst.map((code) => (
          <li key={code} className="rounded-full bg-bg-warm px-3 py-1.5 text-xs font-medium text-pine">
            {code} · {mstName(code)}
          </li>
        ))}
      </ul>
      {lab.spec ? (
        <p className="mt-4 max-w-2xl rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
          <span className="font-medium text-ink">Spec. </span>
          {lab.spec}
        </p>
      ) : null}

      {lab.studio ? (
        <div className="mt-8 rounded-xl bg-surface p-5 shadow-card sm:p-7">
          <h2 className="font-display text-2xl font-semibold">Open the studio</h2>
          <p className="mt-2 text-ink-soft">
            This lab has a full stepper, diagrams, and printables in the cube studio.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link to={lab.studio.to} search={lab.studio.search}>
                Start
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/plans/$id" params={{ id: lab.id }}>
                <ClipboardList className="size-4" />
                Lesson plan
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <Stepper labId={lab.id} />
      )}

      {role !== "student" ? <RoomNotes labId={lab.id} /> : null}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Words</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {lab.vocab.map((v) => (
            <li key={v.term} className="rounded-xl bg-surface p-4 shadow-card">
              <p className="font-medium">{v.term}</p>
              <p className="mt-1 text-sm text-ink-soft">{v.meaning}</p>
              <p className="mt-1 text-xs text-muted">{v.es}</p>
            </li>
          ))}
        </ul>
      </section>

      {lab.steps.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Design loop</h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {DESIGN_LOOP.map((d) => (
              <li key={d.id} className="rounded-xl bg-surface p-3 shadow-card">
                <p className="text-xs font-medium tracking-wide text-pine">{d.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{d.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="mt-10 flex flex-wrap justify-between gap-3">
        <Button asChild variant="secondary">
          <Link to="/labs/$id" params={{ id: prev.id }}>
            <ArrowLeft className="size-4" />
            {prev.name}
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/plans/$id" params={{ id: lab.id }}>
            Lesson plan
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/labs/$id" params={{ id: next.id }}>
            {next.name}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Stepper({ labId }: { labId: string }) {
  const lab = getLab(labId);
  const read = useReadLevel();
  const [step, setStep] = useState(0);
  if (!lab || lab.steps.length === 0) return null;
  const current = lab.steps[step];
  const last = step === lab.steps.length - 1;

  return (
    <div className="mt-8 grid gap-8 overflow-hidden lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-6">
        <ol className="flex gap-1 overflow-x-auto pb-1">
          {lab.steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
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
          <p className="text-xs font-medium tracking-wide text-muted">
            Step {step + 1} of {lab.steps.length} · {current.minutes}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{current.title}</h2>
          <p className={cn("mt-4 text-[17px] leading-relaxed text-ink-soft", read === "easy" && "text-lg")}>
            {pickRead(read, current.body)}
          </p>
          {current.tip ? (
            <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
              <span className="font-medium text-ink">Tip. </span>
              {pickRead(read, current.tip)}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setStep((n) => Math.max(0, n - 1))} disabled={step === 0}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {last ? (
              <Button asChild>
                <Link to="/plans/$id" params={{ id: lab.id }}>
                  Plan and assess
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button onClick={() => setStep((n) => n + 1)}>
                Keep going
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </article>
      </div>
      <aside className="order-first self-start lg:order-none lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-xl bg-bg-warm p-2 sm:p-3">
          <div className="mx-auto aspect-[4/3] w-full max-w-[22rem]">
            <LabSvg visual={current.visual} />
          </div>
        </div>
        <p className="mt-3 text-center text-sm font-medium text-ink-soft lg:hidden">{current.title}</p>
      </aside>
    </div>
  );
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
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Note title="Do" items={TA.do} />
          <Note title="Say" items={TA.say} />
          <Note title="Never" items={TA.dont} />
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
