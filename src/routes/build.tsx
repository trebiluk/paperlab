import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { SolidCube } from "@/components/folding-cube";
import { BandsSheet, BlankSheet, SheetNet } from "@/components/net-svg";
import { DevelopmentSvg } from "@/components/development-svg";
import { OrigamiSvg } from "@/components/origami-svg";
import { BUILD_STEPS, ORIGAMI_STEPS, readStepCopy, readStepTip } from "@/lib/steps";
import { pageTitle } from "@/lib/brand";
import { PAPERS, origamiSquare, type PaperId } from "@/lib/paper";
import { usePaper, useReadLevel } from "@/lib/lesson";
import { cn } from "@/lib/utils";

type Track = "net" | "origami";

export const Route = createFileRoute("/build")({
  component: BuildPage,
  validateSearch: (search: Record<string, unknown>): { path?: Track } => {
    if (search.path === "origami") return { path: "origami" };
    if (search.path === "net") return { path: "net" };
    return {};
  },
  head: () => ({
    meta: [{ title: pageTitle("Build") }],
  }),
});

function BuildPage() {
  const paper = usePaper();
  const spec = PAPERS[paper];
  const { path } = Route.useSearch();
  const track: Track = path === "origami" ? "origami" : "net";
  const navigate = Route.useNavigate();
  const [step, setStep] = useState(0);
  const [oriStep, setOriStep] = useState(0);
  const setTrack = (next: Track) => {
    setStep(0);
    setOriStep(0);
    void navigate({ search: { path: next } });
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-pine">
              Student build · {spec.name}
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {track === "origami"
                ? "Cut a square. Fold a balloon."
                : "From sheet to cube you can hold"}
            </h1>
          </div>
          <div className="flex rounded-md bg-bg-warm p-1" role="radiogroup" aria-label="Studio path">
            <TrackBtn
              active={track === "net"}
              onClick={() => setTrack("net")}
              label="Net cube"
            />
            <TrackBtn
              active={track === "origami"}
              onClick={() => setTrack("origami")}
              label="Origami balloon"
            />
          </div>
        </div>

        {track === "net" ? (
          <NetTrack
            paper={paper}
            step={step}
            setStep={setStep}
          />
        ) : (
          <OrigamiTrack
            paper={paper}
            step={oriStep}
            setStep={setOriStep}
          />
        )}
      </div>
    </AppShell>
  );
}

function TrackBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-none px-4 py-2 text-sm font-medium",
        active ? "bg-surface text-ink shadow-card" : "text-muted",
      )}
    >
      {label}
    </button>
  );
}

function NetTrack({
  paper,
  step,
  setStep,
}: {
  paper: PaperId;
  step: number;
  setStep: (n: number | ((s: number) => number)) => void;
}) {
  const spec = PAPERS[paper];
  const current = BUILD_STEPS[step];
  const last = step === BUILD_STEPS.length - 1;
  const read = useReadLevel();
  const easy = read === "easy";
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-6">
        <StepDots
          steps={BUILD_STEPS.map((s) => s.title)}
          step={step}
          onStep={setStep}
        />
        <article className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
          <p className="text-xs font-medium tracking-wide text-muted">
            Step {step + 1} of {BUILD_STEPS.length} · {current.minutes}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            {current.title}
          </h2>
          <p className={cn("mt-4 leading-relaxed text-ink-soft", easy ? "text-lg" : "text-base")}>
            {readStepCopy(current, spec, read)}
          </p>
          {current.tip ? (
            <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
              <span className="font-medium text-ink">Tip. </span>
              {readStepTip(current, spec, read)}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => setStep((n) => Math.max(0, n - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {last ? (
              <Button asChild>
                <Link to="/math">
                  Measure it
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button onClick={() => setStep((n) => n + 1)}>
                Keep going
                <ArrowRight className="size-4" />
              </Button>
            )}
            <Button asChild variant="ghost">
              <Link to="/print">
                <Printer className="size-4" />
                Print the development
              </Link>
            </Button>
            {current.visual === "fold" ? (
              <Button asChild variant="ghost">
                <Link to="/fold">Name the valley fold</Link>
              </Button>
            ) : null}
          </div>
        </article>
      </div>
      <aside className="order-first flex flex-col gap-4 lg:order-none lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-xl bg-bg-warm p-2 sm:p-3">
          {current.visual === "materials" ? (
            <img
              src={`${import.meta.env.BASE_URL}images/materials.jpg`}
              alt="A sheet of paper, wooden ruler, scissors, tape, and a pencil on a cream desk."
              className="aspect-[16/10] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="mx-auto aspect-[3/4] w-full max-w-[22rem]">
              <StepVisual visual={current.visual} paper={paper} />
            </div>
          )}
        </div>
        <p className="text-center text-sm font-medium text-ink-soft lg:hidden">
          {current.title}
        </p>
        {last ? (
          <div className="graph-paper flex flex-col items-center gap-3 rounded-xl p-5 shadow-card">
            <p className="font-display text-lg font-semibold">You built it.</p>
            <SolidCube size={96} />
            <p className="text-center text-sm text-ink-soft">
              Edge {spec.squareLabel} · 6 faces · 12 edges · 8 vertices.
              Hold it up.
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function OrigamiTrack({
  paper,
  step,
  setStep,
}: {
  paper: PaperId;
  step: number;
  setStep: (n: number | ((s: number) => number)) => void;
}) {
  const spec = PAPERS[paper];
  const current = ORIGAMI_STEPS[step];
  const last = step === ORIGAMI_STEPS.length - 1;
  const o = origamiSquare(spec);
  const squarePhase = step <= 3;
  const read = useReadLevel();
  const easy = read === "easy";

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-6">
        <p className="max-w-2xl text-ink-soft">
          {easy
            ? `No glue. Cut a ${o.edgeLabel} square. Then fold. Then blow.`
            : `No glue. First you cut the ${spec.name} rectangle into a ${o.edgeLabel} square — the move every origami model starts with. Then you fold the waterbomb cube: valleys, mountains, a collapse, and four tucks. Inflate it with a breath.`}
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span
            className={cn(
              "rounded-full px-3 py-1.5",
              squarePhase ? "bg-pine text-pine-fg" : "bg-bg-warm text-muted",
            )}
          >
            1–4 · Cut a square
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1.5",
              !squarePhase ? "bg-pine text-pine-fg" : "bg-bg-warm text-muted",
            )}
          >
            5–9 · Fold the balloon
          </span>
        </div>
        <StepDots
          steps={ORIGAMI_STEPS.map((s) => s.title)}
          step={step}
          onStep={setStep}
        />
        <article className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
          <p className="text-xs font-medium tracking-wide text-muted">
            Step {step + 1} of {ORIGAMI_STEPS.length} · {current.minutes}
            {squarePhase ? " · making the square" : " · folding the cube"}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            {current.title}
          </h2>
          <p className={cn("mt-4 leading-relaxed text-ink-soft", easy ? "text-lg" : "text-base")}>
            {readStepCopy(current, spec, read)}
          </p>
          {current.tip ? (
            <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
              <span className="font-medium text-ink">Tip. </span>
              {readStepTip(current, spec, read)}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => setStep((n) => Math.max(0, n - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {last ? (
              <Button asChild>
                <Link to="/build" search={{ path: "net" }}>
                  Try the glued net
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button onClick={() => setStep((n) => n + 1)}>
                Keep going
                <ArrowRight className="size-4" />
              </Button>
            )}
            <Button asChild variant="ghost">
              <Link to="/fold">Name the six moves</Link>
            </Button>
          </div>
        </article>
      </div>
      <aside className="order-first flex flex-col gap-4 lg:order-none lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-xl bg-bg-warm p-2 sm:p-3">
          <div className="mx-auto aspect-[3/4] w-full max-w-[22rem]">
            {current.visual === "inflate" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <SolidCube size={120} />
                <p className="text-sm font-medium text-ink-soft">Blow. Pinch. Done.</p>
              </div>
            ) : (
              <OrigamiSvg visual={current.visual} paper={paper} />
            )}
          </div>
        </div>
        <p className="text-center text-sm font-medium text-ink-soft lg:hidden">
          {current.title}
        </p>
      </aside>
    </div>
  );
}

function StepDots({
  steps,
  step,
  onStep,
}: {
  steps: string[];
  step: number;
  onStep: (n: number | ((s: number) => number)) => void;
}) {
  return (
    <ol className="flex gap-1 overflow-x-auto pb-1">
      {steps.map((title, i) => (
        <li key={title}>
          <button
            type="button"
            onClick={() => onStep(i)}
            className={cn(
              "flex size-11 items-center justify-center rounded-md text-sm font-medium tabular-nums",
              i === step
                ? "bg-pine text-pine-fg"
                : i < step
                  ? "bg-moss/20 text-pine"
                  : "bg-surface text-muted shadow-card",
            )}
            aria-label={`Step ${i + 1}: ${title}`}
            aria-current={i === step ? "step" : undefined}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ol>
  );
}

function StepVisual({
  visual,
  paper,
}: {
  visual: (typeof BUILD_STEPS)[number]["visual"];
  paper: PaperId;
}) {
  if (visual === "orient") return <BlankSheet paper={paper} />;
  if (visual === "fourths") return <BandsSheet paper={paper} />;
  if (visual === "sides") {
    return <SheetNet paper={paper} showDiscard highlight="grid" />;
  }
  if (visual === "cross") {
    return <SheetNet paper={paper} showDiscard highlight="cross" />;
  }
  if (visual === "tabs" || visual === "cut" || visual === "fold" || visual === "tape") {
    return (
      <DevelopmentSvg
        paper={paper}
        showSheet
        layers={{
          construction: visual === "tabs",
          folds: visual !== "tabs",
          tabs: true,
          labels: true,
          dimensions: visual === "tabs",
          glueMarks: visual === "tabs" || visual === "tape",
          matchMarks: visual === "tabs" || visual === "tape",
        }}
      />
    );
  }
  return <SheetNet paper={paper} />;
}
