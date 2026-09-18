import { createFileRoute } from "@tanstack/react-router";
import { Clock, Printer, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import { PAPERS, origamiSquare } from "@/lib/paper";
import { usePaper } from "@/lib/lesson";

export const Route = createFileRoute("/teacher")({
  component: TeacherPage,
  head: () => ({
    meta: [{ title: pageTitle("Cube plan") }],
  }),
});

function TeacherPage() {
  const paper = usePaper();
  const spec = PAPERS[paper];
  const ori = origamiSquare(spec);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">
          Teacher plan · cube · PaperLab
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          One sheet, six faces.
        </h1>
        <p className="mt-4 text-ink-soft">
          A one-period geometry and drawing lab. Students draw a cube
          development with Grade 6 line conventions and glue tabs, then build
          it from a single sheet of {spec.name} paper.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Meta label="Grades" value="3–8" />
          <Meta label="Time" value="45–60 min" />
          <Meta label="Grouping" value="Solo + pair talk" />
          <Meta label="Face size" value={spec.squareLabel} />
        </dl>

        <div className="no-print mt-6 flex flex-wrap gap-3">
          <Button onClick={() => window.print()}>
            <Printer className="size-4" />
            Print this plan
          </Button>
          <Button asChild variant="secondary">
            <a href="/print">Printable development</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="/plans">All PaperLab plans</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="/fold">Folding techniques</a>
          </Button>
        </div>

        <Section title="Objectives">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Identify a cube by its 6 square faces, 12 edges, and 8 vertices.
            </li>
            <li>
              Distinguish a geometry net from a technical{" "}
              <span className="font-medium text-ink">development</span> — a
              true-size unfolding drawn with agreed line types.
            </li>
            <li>
              Use Grade 6 drawing conventions: thick outline (cut), dashed fold
              line, construction grid, dimension, glue tabs, and match letters
              A–G.
            </li>
            <li>
              Name the six folding moves — crease, valley, mountain,
              fold-and-unfold, collapse, tuck — and match dashed development
              lines to valley folds.
            </li>
            <li>
              Place one tapered tab per glue seam, never on a fold line, and
              assemble the cube with glue on the tabs.
            </li>
            <li>
              Grades 6–8: compute surface area (6s²) and volume (s³) of the cube
              they built.
            </li>
          </ul>
        </Section>

        <Section title="Standards">
          <ul className="space-y-2">
            <li>
              <span className="font-medium">1.G.A.2 / 2.G.A.1</span> — Compose
              and recognize cubes (younger adaptation: print the net, skip
              measurement).
            </li>
            <li>
              <span className="font-medium">6.G.A.4</span> — Represent 3-D
              figures using nets and use the nets to find surface area.
            </li>
            <li>
              <span className="font-medium">Drawing conventions (Grade 6)</span>{" "}
              — outline, fold, construction, and dimension lines on a working
              drawing; development of a cube with glue tabs and match letters.
            </li>
            <li>
              <span className="font-medium">6.G.A.2</span> — Find the volume of
              a right rectangular prism (here, a cube) by packing and by formula.
            </li>
            <li>
              <span className="font-medium">7.G.B.6</span> — Solve real-world
              problems involving surface area and volume of 3-D objects.
            </li>
          </ul>
        </Section>

        <Section title="Materials, per student">
          <ul className="list-disc space-y-2 pl-5">
            <li>1 sheet of {spec.name} printer paper</li>
            <li>Pencil, scissors, glue stick (tabs) or tape</li>
            <li>Optional: ruler, crayons or markers for faces</li>
            <li>Classroom: this lesson projected, or printed nets for support</li>
          </ul>
        </Section>

        <Section title="Lesson flow">
          <ol className="space-y-5">
            <Flow
              min="5"
              title="Hook"
              body="Show the unfolding cube. Ask: can one flat sheet become this, without leftover faces taped on? Collect guesses about the largest cube that fits on printer paper."
            />
            <Flow
              min="8"
              title="Drawing conventions"
              body="Open the development page. Name each line type. Rule: thick = cut, dashed = valley fold (toward you), tabs = glue, letters match the edges they join. Students sketch one tab in a leftover square of the grid and letter it."
            />
            <Flow
              min="6"
              title="Folding techniques"
              body="Scrap paper. Name valley (toward you), mountain (away), crease, and fold-and-unfold. Dashed on the development is a valley. Older students add collapse and tuck before origami."
            />
            <Flow
              min="8"
              title="Net lab"
              body="Pairs try the fold-or-fail quiz. Name the rule they used. Introduce the words net, development, face, edge, vertex. Reveal that only 11 of 35 hexominoes work."
            />
            <Flow
              min="16"
              title="Build"
              body={`Walk the nine-step build, including glue tabs. On ${spec.shortName}, the designed face is ${spec.squareLabel}. Print the development for support; students with a ruler can draw the net freehand.`}
            />
            <Flow
              min="10"
              title="Math"
              body="Measure one edge of the finished cube. Compute 6s² and s³. Compare to the designed size. Optional: how many of these cubes pack into a 1-foot (or 30 cm) box?"
            />
            <Flow
              min="5"
              title="Reflect"
              body="Hold up two cubes. What stayed the same (6, 12, 8)? What changed (edge length, volume)? Exit ticket: sketch a net that is not the Latin cross."
            />
          </ol>
        </Section>

        <Section title="Vocabulary">
          <p>
            Face, edge, vertex, net, development, outline, fold line,
            valley fold, mountain fold, crease, fold-and-unfold, collapse,
            tuck, waterbomb base, construction line, dimension, glue tab,
            match letter, hexomino, tetrahedron, pyramid, prism, cylinder,
            cone, surface area, volume, polyhedron.
          </p>
        </Section>

        <Section title="Other foldables">
          <p>
            After the cube, print a tetrahedron, square pyramid, triangular
            prism, cylinder, or cone on the same paper size. Same line types
            and tab rules. Cylinder and cone introduce a curved edge — they
            are not polyhedra, so Euler’s F − E + V = 2 does not apply the
            same way.
          </p>
        </Section>

        <Section title="Origami balloon">
          <p>
            Early finishers, or a second period: the waterbomb cube. Same{" "}
            {spec.name} sheet, no glue. First teach the square — every origami
            model starts there. Fold a short edge ({spec.shortLabel}) onto a
            long edge, cut the leftover {ori.leftoverLabel} strip, unfold. You
            now have a {spec.shortLabel} square. Valley book folds, flip for
            mountain diagonals, collapse the waterbomb base, tuck the pockets,
            inflate. Name those six moves on Folding techniques before the
            square if the class has not folded before.
          </p>
          <p className="mt-3">
            The leftover strip is a bookmark. The balloon is puffy on purpose —
            it is not the same size as the glued net cube, and that comparison
            is the math talk.
          </p>
          <div className="no-print mt-4 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href="/build?path=origami">Open the origami steps</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="/fold">Six folding moves</a>
            </Button>
          </div>
        </Section>

        <Section title="Differentiation">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-medium">Support.</span> Print the
              development at actual size. Tabs and fold lines are already
              drawn. Pair a confident cutter with a student who holds and glues.
            </li>
            <li>
              <span className="font-medium">On-level.</span> Fold-to-mark on
              {` ${spec.shortName}`}, then draw six tapered tabs in the leftover squares.
              Complete the conventions quiz.
            </li>
            <li>
              <span className="font-medium">Extend.</span> Title block and
              full dimensioning. Prove why a tab on a fold line is illegal.
              Then origami: teach cutting a square first — fold a short edge
              onto a long edge, cut the leftover {ori.leftoverLabel} strip,
              unfold. The waterbomb balloon cube uses no glue. After that, a
              tetrahedron, square pyramid, triangular prism, cylinder, or cone
              from Foldables.
            </li>
          </ul>
        </Section>

        <Section title="Assessment">
          <ul className="list-disc space-y-2 pl-5">
            <li>Product: a closed cube assembled from a development with tabs.</li>
            <li>Drawing: correct line types, six legal tabs, and match letters A–G on a Latin-cross development.</li>
            <li>Conventions quiz: 3 of 4 correct.</li>
            <li>Folding techniques quiz: 3 of 4 correct.</li>
            <li>Oral: count faces, edges, vertices on their own model.</li>
            <li>Grades 6–8: correct SA and volume for the measured edge.</li>
          </ul>
        </Section>

        <Section title="Common snags">
          <ul className="list-disc space-y-2 pl-5">
            <li>Cutting the dashed fold lines — the development falls into strips.</li>
            <li>Putting a tab on a shared edge (a fold), so two thicknesses fight the hinge.</li>
            <li>Gluing the outside of a face instead of the tab.</li>
            <li>Two tabs on the same seam — they stack. One tab per glue joint.</li>
            <li>
              Folding the waterbomb diagonals on the same side as the plus —
              the collapse will not fall in. Flip first so diagonals are
              mountains.
            </li>
          </ul>
        </Section>

        <Section title="Safety">
          <p className="flex gap-2">
            <Users className="mt-0.5 size-4 shrink-0 text-pine" />
            Scissors stay on the desk, blades closed when passing. No running
            with a cube in progress.
          </p>
        </Section>
      </div>
    </AppShell>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-4 text-[15px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

function Flow({
  min,
  title,
  body,
}: {
  min: string;
  title: string;
  body: string;
}) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] gap-4">
      <span className="flex h-10 items-center gap-1 text-sm font-medium tabular-nums text-pine">
        <Clock className="size-3.5" />
        {min}
      </span>
      <div>
        <h3 className="font-medium text-ink">{title}</h3>
        <p className="mt-1">{body}</p>
      </div>
    </li>
  );
}
