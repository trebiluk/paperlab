import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FoldableThumb } from "@/components/foldable-svg";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import { FOLDABLE_IDS, FOLDABLES } from "@/lib/foldables";
import { PAPERS } from "@/lib/paper";
import { usePaper } from "@/lib/lesson";

export const Route = createFileRoute("/foldables/")({
  component: FoldablesPage,
  head: () => ({
    meta: [{ title: pageTitle("Other foldables") }],
  }),
});

function FoldablesPage() {
  const paper = usePaper();
  const spec = PAPERS[paper];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium tracking-wide text-pine">
        Grade 6 · Developments · {spec.name}
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Don’t stop at cubes.
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Same paper. Same rules: thick = cut, dashed = fold, tabs = glue.
        The cube is the main lesson. These five are the next solids Grade 6
        actually gets to build.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOLDABLE_IDS.map((id) => {
          const f = FOLDABLES[id];
          const className =
            "card-lift group fold-ear flex h-full flex-col gap-3 rounded-xl bg-surface p-4 text-ink shadow-card";
          const body = (
            <>
              <div className="transition-transform duration-200 group-hover:rotate-1 group-hover:scale-[1.03]">
                <FoldableThumb id={id} />
              </div>
              <p className="text-xs font-medium tracking-wide text-pine">
                {f.family}
              </p>
              <h2 className="font-display text-xl font-semibold">{f.name}</h2>
              <p className="text-sm text-ink-soft">{f.blurb}</p>
              <p className="font-mono text-xs tabular-nums text-muted">
                F {f.faces} · E {f.edges} · V {f.vertices} · tabs {f.tabs}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-pine">
                {id === "cube" ? "Open the cube lesson" : "Fold this one"}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </>
          );
          return (
            <li key={id}>
              {id === "cube" ? (
                <Link to="/build" className={className}>
                  {body}
                </Link>
              ) : (
                <Link
                  to="/foldables/$id"
                  params={{ id }}
                  className={className}
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-10 max-w-2xl text-sm text-ink-soft">
        Euler’s formula still holds for the polyhedra: F − E + V = 2. The
        cylinder and cone are not polyhedra — they have curved faces, so
        vertices and edges are counted as the seams of the development, not
        as a Platonic skeleton.
      </p>

      <div className="mt-8">
        <Button asChild variant="secondary">
          <Link to="/draw">Review line types first</Link>
        </Button>
      </div>
    </div>
  );
}
