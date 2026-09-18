import { Link, createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/brand";
import { LABS } from "@/lib/labs";
import { mstName } from "@/lib/mst";
import { UNITS } from "@/lib/units";

export const Route = createFileRoute("/plans/")({
  component: PlansIndex,
  head: () => ({ meta: [{ title: pageTitle("Lesson plans") }] }),
});

function PlansIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium tracking-wide text-pine">Teacher</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Full lesson plans
      </h1>
      <p className="mt-4 text-ink-soft">
        One plan per lab: hook, objectives, MST Standard 5, flow, ELL, extra
        help, helper moves, IEP/504 notes, assessment, and snags. Print from
        the plan page. Six suggested units below if you want a year-long shop.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Units</h2>
      <ul className="mt-4 grid gap-3">
        {UNITS.map((u) => (
          <li key={u.id} className="rounded-xl bg-surface p-5 shadow-card">
            <p className="text-xs font-medium tracking-wide text-pine">
              {u.days} · grades {u.grades}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold">{u.name}</h3>
            <p className="mt-2 text-sm text-ink-soft">{u.body}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {u.labs.map((id) => {
                const lab = LABS.find((l) => l.id === id);
                if (!lab) return null;
                return (
                  <li key={id}>
                    <Link
                      to="/plans/$id"
                      params={{ id }}
                      className="inline-flex h-9 items-center rounded-full bg-bg-warm px-3 text-sm font-medium text-ink"
                    >
                      {lab.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold">Every plan</h2>
      <ul className="mt-4 grid gap-3">
        {LABS.map((lab) => (
          <li key={lab.id}>
            <Link
              to="/plans/$id"
              params={{ id: lab.id }}
              className="card-lift flex flex-col gap-1 rounded-xl bg-surface p-5 text-ink shadow-card"
            >
              <p className="text-xs font-medium tracking-wide text-muted">
                {lab.grades} · {lab.time} · {lab.mst.map(mstName).join(" · ")}
              </p>
              <h2 className="font-display text-xl font-semibold">{lab.name}</h2>
              <p className="text-sm text-ink-soft">{lab.plan.hook}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
