import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Printer } from "lucide-react";
import { FoldableSvg } from "@/components/foldable-svg";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import {
  FOLDABLES,
  foldableNeighbors,
  foldableSize,
  isFoldableId,
} from "@/lib/foldables";
import { PAPERS, sheetPhysical } from "@/lib/paper";
import { usePaper } from "@/lib/lesson";

export const Route = createFileRoute("/foldables/$id")({
  beforeLoad: ({ params }) => {
    if (params.id === "cube") {
      throw redirect({ to: "/build" });
    }
  },
  component: FoldableDetail,
  head: ({ params }) => ({
    meta: [
      {
        title: isFoldableId(params.id)
          ? pageTitle(FOLDABLES[params.id].name)
          : pageTitle("Foldables"),
      },
    ],
  }),
});

function FoldableDetail() {
  const { id } = Route.useParams();
  const paper = usePaper();
  const spec = PAPERS[paper];

  if (!isFoldableId(id) || id === "cube") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-ink-soft">That development is not on the list.</p>
        <Button asChild className="mt-4">
          <Link to="/foldables">All foldables</Link>
        </Button>
      </div>
    );
  }
  const f = FOLDABLES[id];
  const size = foldableSize(id, paper);
  const euler = f.faces - f.edges + f.vertices;
  const { prev, next } = foldableNeighbors(id);
  const phys = sheetPhysical(spec);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <style>{phys.css}</style>
      <Link
        to="/foldables"
        className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-pine"
      >
        <ArrowLeft className="size-3.5" />
        All foldables
      </Link>
      <p className="mt-4 text-sm font-medium tracking-wide text-pine">
        {f.family} · {spec.name}
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {f.name}
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{f.blurb}</p>
      <p className="mt-2 font-mono text-sm tabular-nums text-muted">
        {size.notes}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Meta label="Faces" value={String(f.faces)} />
        <Meta label="Glue tabs" value={String(f.tabs)} />
        <Meta
          label={f.polyhedron ? "Euler F − E + V" : "Euler"}
          value={
            f.polyhedron
              ? `${f.faces} − ${f.edges} + ${f.vertices} = ${euler}`
              : "Curved — not a polyhedron"
          }
        />
      </dl>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        <li className="flex items-center gap-2">
          <span className="inline-block h-[3px] w-7 rounded-full bg-ink" />
          Thick = cut
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-7 border-t-2 border-dashed border-ink-soft" />
          Dashed = fold
        </li>
        <li className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-pine">A</span>
          Letter = glue tab
        </li>
      </ul>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="print-net rounded-xl bg-surface shadow-card print:rounded-none print:shadow-none">
          <FoldableSvg id={id} paper={paper} />
        </div>
        <aside className="flex flex-col gap-4 no-print">
          <div className="rounded-xl bg-surface p-4 shadow-card">
            <p className="text-sm font-medium">Formulas</p>
            <p className="mt-2 text-sm text-ink-soft">
              Surface area {f.sa}
            </p>
            <p className="mt-1 text-sm text-ink-soft">Volume {f.volume}</p>
            <p className="mt-3 text-xs text-muted">
              Print on {spec.sheetLabel} at 100% scale — do not fit to page.
            </p>
            {!f.polyhedron ? (
              <p className="mt-3 text-xs text-ink-soft">
                Faces here are the pieces of the development. A cylinder
                and a cone have a curved face, so they are not polyhedra
                and Euler’s formula does not apply the same way.
              </p>
            ) : null}
          </div>
          <Button onClick={() => window.print()}>
            <Printer className="size-4" />
            Print this development
          </Button>
          <Button asChild variant="secondary">
            <Link to="/draw">Line types</Link>
          </Button>
        </aside>
      </div>

      <section className="no-print mt-12">
        <h2 className="font-display text-2xl font-semibold">Fold it</h2>
        <ol className="mt-5 grid gap-3">
          {f.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl bg-surface p-5 shadow-card">
              <p className="inline-flex size-8 items-center justify-center rounded-md bg-toy-top/50 text-sm font-medium tabular-nums text-pine">
                {i + 1}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
          <span className="font-medium text-ink">Tip. </span>
          {f.tip}
        </p>
      </section>

      {prev && next ? (
        <nav className="no-print mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <Link
            to="/foldables/$id"
            params={{ id: prev }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-pine"
          >
            <ArrowLeft className="size-3.5" />
            {FOLDABLES[prev].name}
          </Link>
          <Link
            to="/foldables/$id"
            params={{ id: next }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-pine"
          >
            {FOLDABLES[next].name}
            <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      ) : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-3 shadow-card">
      <dt className="text-xs tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold">{value}</dd>
    </div>
  );
}
