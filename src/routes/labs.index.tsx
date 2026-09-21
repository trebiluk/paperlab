import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LabCard } from "@/components/lab-card";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import { FAMILIES, GRADE_BANDS, LABS, getLab, labFitsBand, parseGradeBand, type GradeBandId, type LabFamily } from "@/lib/labs";
import { useReadLevel } from "@/lib/lesson";
import { countDone, nextUndoneId, useDoneLabs } from "@/lib/progress";
import { PERIOD_PATH, UNITS } from "@/lib/units";
import { cn } from "@/lib/utils";

const FAM_IDS = FAMILIES.map((f) => f.id);

export const Route = createFileRoute("/labs/")({
  validateSearch: (s: Record<string, unknown>): { family?: LabFamily; grade?: GradeBandId } => {
    const out: { family?: LabFamily; grade?: GradeBandId } = {};
    if (typeof s.family === "string" && FAM_IDS.includes(s.family as LabFamily)) {
      out.family = s.family as LabFamily;
    }
    const grade = parseGradeBand(s.grade);
    if (grade) out.grade = grade;
    return out;
  },
  component: LabsIndex,
  head: () => ({ meta: [{ title: pageTitle("Labs") }] }),
});

function LabsIndex() {
  const read = useReadLevel();
  const { family, grade } = Route.useSearch();
  const doneSet = useDoneLabs();
  const list = family
    ? LABS.filter((l) => l.family === family && labFitsBand(l, grade))
    : null;
  const made = countDone(PERIOD_PATH, doneSet);
  const nextId = nextUndoneId(PERIOD_PATH, doneSet);
  const next = getLab(nextId);
  const allMade = made === PERIOD_PATH.length && made > 0;

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

      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-[12rem] flex-1">
          <p className="text-sm text-ink-soft">
            <span className="font-medium text-ink tabular-nums">
              {made} of {PERIOD_PATH.length}
            </span>{" "}
            made on this Chromebook
          </p>
          <div
            className="mt-2 h-1 max-w-sm overflow-hidden rounded-full bg-bg-warm"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={PERIOD_PATH.length}
            aria-valuenow={made}
            aria-valuetext={`${made} of ${PERIOD_PATH.length} labs made`}
            aria-label="Labs made on this device"
          >
            <div
              className="h-full origin-left bg-pine"
              style={{ transform: `scaleX(${PERIOD_PATH.length ? made / PERIOD_PATH.length : 0})` }}
            />
          </div>
        </div>
        {next && !allMade ? (
          <Button asChild variant="secondary">
            <Link to="/labs/$id" params={{ id: next.id }} search={{ step: 1 }}>
              {made === 0 ? "Start here" : "Continue"}
              <span className="font-normal text-ink-soft">· {next.name}</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : allMade ? (
          <p className="text-sm font-medium text-ok">All {PERIOD_PATH.length} made on this Chromebook.</p>
        ) : null}
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Lab family">
        <Link
          to="/labs"
          search={{ family: undefined, step: undefined, grade }}
          aria-current={!family ? "page" : undefined}
          className={cn(
            "flex h-11 items-center rounded-full px-4 text-sm font-medium",
            !family ? "bg-pine text-pine-fg" : "bg-surface text-ink-soft shadow-card",
          )}
        >
          Year path
        </Link>
        {FAMILIES.map((f) => (
          <Link
            key={f.id}
            to="/labs"
            search={{ family: f.id, step: undefined, grade }}
            aria-current={family === f.id ? "page" : undefined}
            className={cn(
              "flex h-11 items-center rounded-full px-4 text-sm font-medium",
              family === f.id ? "bg-pine text-pine-fg" : "bg-surface text-ink-soft shadow-card",
            )}
          >
            {f.name}
          </Link>
        ))}
      </nav>

      <nav className="mt-3 flex flex-wrap gap-2" aria-label="Grade band">
        {GRADE_BANDS.map((b) => {
          const on = b.id === "all" ? !grade : grade === b.id;
          return (
            <Link
              key={b.id}
              to="/labs"
              search={{ family, step: undefined, grade: b.id === "all" ? undefined : b.id }}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex h-11 items-center rounded-full px-3 text-sm font-medium",
                on ? "bg-bg-warm text-ink" : "text-muted hover:text-ink",
              )}
            >
              {b.name}
            </Link>
          );
        })}
      </nav>

      {list ? (
        list.length === 0 ? (
          <p className="mt-8 text-ink-soft">No labs in this family for that grade band. Try All grades.</p>
        ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((lab) => (
            <li key={lab.id}>
              <LabCard lab={lab} read={read} done={doneSet.has(lab.id)} />
            </li>
          ))}
        </ul>
        )
      ) : (
        UNITS.map((u) => {
          const labs = u.labs
            .map((id) => getLab(id))
            .filter((lab): lab is NonNullable<typeof lab> => lab != null && labFitsBand(lab, grade));
          if (labs.length === 0) return null;
          return (
          <section key={u.id} className="mt-10">
            <p className="text-xs font-medium tracking-wide text-pine">
              {u.days} · grades {u.grades}
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{u.name}</h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-soft">{u.body}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {labs.map((lab) => (
                  <li key={lab.id}>
                    <LabCard lab={lab} read={read} done={doneSet.has(lab.id)} titleAs="h3" />
                  </li>
              ))}
            </ul>
          </section>
          );
        })
      )}
    </div>
  );
}
