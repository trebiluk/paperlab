import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LabCard } from "@/components/lab-card";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import { FAMILIES, LABS, getLab, type LabFamily } from "@/lib/labs";
import { useReadLevel } from "@/lib/lesson";
import { countDone, nextUndoneId, useDoneLabs } from "@/lib/progress";
import { PERIOD_PATH, UNITS } from "@/lib/units";
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
  const doneSet = useDoneLabs();
  const list = family ? LABS.filter((l) => l.family === family) : null;
  const made = countDone(PERIOD_PATH, doneSet);
  const nextId = nextUndoneId(PERIOD_PATH, doneSet);
  const next = getLab(nextId);

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
            aria-label="Labs made on this device"
          >
            <div
              className="h-full origin-left bg-pine"
              style={{ transform: `scaleX(${PERIOD_PATH.length ? made / PERIOD_PATH.length : 0})` }}
            />
          </div>
        </div>
        {next && made < PERIOD_PATH.length ? (
          <Button asChild variant="secondary">
            <Link to="/labs/$id" params={{ id: next.id }} search={{ step: 1 }}>
              {made === 0 ? "Start here" : "Continue"}
              <span className="font-normal text-ink-soft">· {next.name}</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/labs"
          search={{ family: undefined, step: undefined }}
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
            search={{ family: f.id, step: undefined }}
            className={cn(
              "flex h-11 items-center rounded-full px-4 text-sm font-medium",
              family === f.id ? "bg-pine text-pine-fg" : "bg-surface text-ink-soft shadow-card",
            )}
          >
            {f.name}
          </Link>
        ))}
      </div>

      {list ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((lab) => (
            <li key={lab.id}>
              <LabCard lab={lab} read={read} done={doneSet.has(lab.id)} />
            </li>
          ))}
        </ul>
      ) : (
        UNITS.map((u) => (
          <section key={u.id} className="mt-10">
            <p className="text-xs font-medium tracking-wide text-pine">
              {u.days} · grades {u.grades}
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{u.name}</h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-soft">{u.body}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {u.labs.map((id) => {
                const lab = getLab(id);
                if (!lab) return null;
                return (
                  <li key={id}>
                    <LabCard lab={lab} read={read} done={doneSet.has(id)} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
