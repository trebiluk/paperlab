import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { LabSvg } from "@/components/lab-svg";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
  head: () => ({ meta: [{ title: pageTitle("Studio") }] }),
});

const TOOLS: {
  to: "/build" | "/draw" | "/fold" | "/foldables" | "/nets" | "/math" | "/print";
  search?: { path: "net" | "origami" };
  title: string;
  body: string;
  visual: string;
}[] = [
  { to: "/build", search: { path: "net" }, title: "Net cube", body: "Nine steps from a blank sheet to a glued cube.", visual: "box-walls" },
  { to: "/build", search: { path: "origami" }, title: "Origami balloon", body: "Cut a square, then a no-glue waterbomb cube.", visual: "square-cut" },
  { to: "/fold", title: "Folding techniques", body: "Valley, mountain, crease, collapse, tuck.", visual: "iterate" },
  { to: "/draw", title: "Development drawing", body: "Grade 6 line types, tabs, match letters.", visual: "system" },
  { to: "/nets", title: "Net detective", body: "Eleven cube nets and a fold-or-fail quiz.", visual: "iterate" },
  { to: "/foldables", title: "More solids", body: "Tetrahedron, pyramid, prism, cylinder, cone.", visual: "box-walls" },
  { to: "/math", title: "Size it up", body: "Surface area, volume, largest cube on the sheet.", visual: "tower-test" },
  { to: "/print", title: "Print the net", body: "1:1 development for support cutters.", visual: "box-star" },
];

function StudioPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">Studio</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          The original make, still sharp.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Developments, glue tabs, origami, and the math of one sheet. Paper
          size lives in the bar — Letter is the default.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t) => (
            <li key={t.title}>
              <Link
                to={t.to}
                search={t.search}
                className="card-lift flex h-full flex-col rounded-xl bg-surface text-ink shadow-card"
              >
                <div className="aspect-[4/3] p-2">
                  <LabSvg visual={t.visual} />
                </div>
                <div className="p-4 pt-0">
                  <h2 className="font-display text-lg font-semibold">{t.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{t.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
