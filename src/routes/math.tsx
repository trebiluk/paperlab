import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { pageTitle } from "@/lib/brand";
import { PAPERS, formatArea, formatMeasure, formatVolume, surfaceArea, volume } from "@/lib/paper";
import { usePaper } from "@/lib/lesson";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/math")({
  component: MathPage,
  head: () => ({
    meta: [{ title: pageTitle("Math lab") }],
  }),
});

function MathPage() {
  const paper = usePaper();
  const spec = PAPERS[paper];
  const [edge, setEdge] = useState(spec.square);
  useEffect(() => {
    setEdge(spec.square);
  }, [spec.square]);
  const sa = useMemo(() => surfaceArea(edge), [edge]);
  const vol = useMemo(() => volume(edge), [edge]);
  const sheetArea = spec.short * spec.long;
  const waste = sheetArea - sa;
  const wastePct = (waste / sheetArea) * 100;

  const resetEdge = spec.square !== edge;

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">Math lab</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          How big is the cube in your hands?
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          A cube is the only Platonic solid whose faces are squares. Once you
          know one edge, you know everything. Drag the edge to match what you
          measured — or leave it at the designed size for {spec.name}.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
            <label className="flex flex-col gap-3">
              <span className="flex items-center justify-between text-sm font-medium">
                <span>Edge length</span>
                <span className="tabular-nums text-pine">
                  {formatMeasure(edge, spec.unit)}
                </span>
              </span>
              <input
                type="range"
                min={spec.unit === "in" ? 1 : 3}
                max={spec.unit === "in" ? 5 : 12}
                step={spec.unit === "in" ? 0.25 : 0.1}
                value={edge}
                onChange={(e) => setEdge(Number(e.target.value))}
                className="h-11 w-full accent-pine"
              />
            </label>
            {resetEdge ? (
              <button
                type="button"
                className="mt-3 text-sm font-medium text-pine"
                onClick={() => setEdge(spec.square)}
              >
                Reset to {spec.squareLabel}
              </button>
            ) : null}

            <dl className="mt-8 grid grid-cols-2 gap-3">
              <BigStat
                label="Surface area · 6s²"
                value={formatArea(sa, spec.unit)}
              />
              <BigStat
                label="Volume · s³"
                value={formatVolume(vol, spec.unit)}
              />
              <BigStat
                label={`${spec.name} sheet`}
                value={formatArea(sheetArea, spec.unit)}
              />
              <BigStat
                label="Paper left over"
                value={`${wastePct.toFixed(1)}%`}
              />
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <article className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
              <h2 className="font-display text-xl font-semibold">
                Why this is the biggest cube
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                A cube net is a hexomino — six squares that must sit on the
                sheet without overlapping. The most compact nets fit in a 4 × 3
                grid of squares. On {spec.name} that grid is limited by{" "}
                {spec.limitNote}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Could you use the leftover scraps as extra faces? Not without
                taping squares together, which is no longer a single net. The
                whole sheet has enough area for a larger cube in theory —{" "}
                {formatArea(sheetArea / 6, spec.unit)} per face, an edge of about{" "}
                {Math.sqrt(sheetArea / 6).toFixed(2)} {spec.unitLabel} —{" "}
                but six squares that big cannot be packed onto the rectangle.
              </p>
            </article>
            <article className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
              <h2 className="font-display text-xl font-semibold">
                Count the skeleton
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>6 faces — all squares, all the same size.</li>
                <li>12 edges — four around the top, four around the bottom, four upright.</li>
                <li>8 vertices — every corner of the cube is a meeting of three squares.</li>
                <li>Euler: F − E + V = 6 − 12 + 8 = 2, the number for every convex polyhedron.</li>
              </ul>
            </article>
          </div>
        </div>

        <Problems unit={spec.unit} square={spec.square} />
      </div>
    </AppShell>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-bg-warm px-4 py-4">
      <dt className="text-xs tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
        {value}
      </dd>
    </div>
  );
}

function Problems({ unit, square }: { unit: "in" | "cm"; square: number }) {
  const sa = 6 * square * square;
  const vol = square * square * square;
  const box = unit === "in" ? 12 : 30;
  const fit = Math.floor(box / square) ** 3;
  const edge = formatMeasure(square, unit);

  const items = [
    {
      q: `If each edge is ${edge}, what is the surface area?`,
      a: `${sa.toFixed(2)} ${unit}²  (6 × ${square} × ${square})`,
    },
    {
      q: `What is the volume?`,
      a: `${vol.toFixed(2)} ${unit}³  (${square}³)`,
    },
    {
      q: `How many of these cubes pack along one edge of a ${box} ${unit} box?`,
      a: `${Math.floor(box / square)}  (then ${Math.floor(box / square)}³ = ${fit} fill the box, with leftover space)`,
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold">Try these</h2>
      <ol className="mt-5 grid gap-3">
        {items.map((item, i) => (
          <li key={item.q} className="rounded-xl bg-surface p-5 shadow-card">
            <p className="font-medium">
              {i + 1}. {item.q}
            </p>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className={cn(
                "mt-3 text-sm font-medium text-pine",
                "h-11",
              )}
            >
              {open === i ? "Hide answer" : "Show answer"}
            </button>
            {open === i ? (
              <p className="mt-1 font-mono text-sm text-ink-soft">{item.a}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
