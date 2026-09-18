import { Link, createFileRoute } from "@tanstack/react-router";
import { LabSvg } from "@/components/lab-svg";
import { pageTitle } from "@/lib/brand";
import { FAMILIES, LABS, type LabFamily, labThumb } from "@/lib/labs";
import { pickRead, useReadLevel } from "@/lib/lesson";
import { mstName } from "@/lib/mst";
import { cn } from "@/lib/utils";

const FAM_IDS = FAMILIES.map((f) => f.id);

export const Route = createFileRoute("/labs/")({
  validateSearch: (s: Record<string, unknown>): { family?: LabFamily } => {
    if (typeof s.family === "string" && FAM_IDS.includes(s.family as LabFamily)) {
      return { family: s.family as LabFamily };
    }
    return {};
  },
  component: LabsIndex,
  head: () => ({ meta: [{ title: pageTitle("Labs") }] }),
});

function LabsIndex() {
  const read = useReadLevel();
  const { family } = Route.useSearch();
  const list = family ? LABS.filter((l) => l.family === family) : LABS;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium tracking-wide text-pine">
        {LABS.length} paper labs · MST Standard 5
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Pick a make.
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Every lab is one sheet (or a square cut from one), a written spec, and a
        test. Switch Easy / Class / Stretch in the bar. Helpers see extra notes
        on the lab page.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/labs"
          className={cn(
            "flex h-11 items-center rounded-full px-4 text-sm font-medium",
            !family ? "bg-pine text-pine-fg" : "bg-surface text-ink-soft shadow-card",
          )}
        >
          All
        </Link>
        {FAMILIES.map((f) => (
          <Link
            key={f.id}
            to="/labs"
            search={{ family: f.id }}
            className={cn(
              "flex h-11 items-center rounded-full px-4 text-sm font-medium",
              family === f.id ? "bg-pine text-pine-fg" : "bg-surface text-ink-soft shadow-card",
            )}
          >
            {f.name}
          </Link>
        ))}
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((lab) => (
          <li key={lab.id}>
            <Link
              to="/labs/$id"
              params={{ id: lab.id }}
              className="card-lift fold-ear flex h-full flex-col rounded-xl bg-surface text-ink shadow-card"
            >
              <div className="lab-frame aspect-[4/3] p-2">
                <LabSvg visual={labThumb(lab)} />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4 pt-0">
                <p className="text-xs font-medium tracking-wide text-muted">
                  {lab.grades} · {lab.time}
                </p>
                <h2 className="font-display text-xl font-semibold">{lab.name}</h2>
                <p className="text-sm text-ink-soft">{pickRead(read, lab.blurb)}</p>
                <p className="mt-auto pt-2 text-xs text-muted">
                  {lab.mst.map(mstName).join(" · ")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
