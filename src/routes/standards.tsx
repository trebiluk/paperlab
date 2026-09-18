import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { pageTitle } from "@/lib/brand";
import { LABS } from "@/lib/labs";
import { MST5_STATEMENT, MST_KEY_IDEAS, OTHER_MST } from "@/lib/mst";

export const Route = createFileRoute("/standards")({
  component: StandardsPage,
  head: () => ({ meta: [{ title: pageTitle("MST Standard 5") }] }),
});

function StandardsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">
          NYSED · Mathematics, Science, and Technology
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Standard 5 — Technology
        </h1>
        <blockquote className="mt-6 rounded-xl bg-surface p-5 text-[17px] leading-relaxed text-ink shadow-card">
          {MST5_STATEMENT}
        </blockquote>
        <p className="mt-4 text-ink-soft">
          PaperLab is a Standard 5 workshop. Students design, construct, use,
          and evaluate paper products and systems. Computer models (this site)
          stay models. The prototype is the sheet.
        </p>

        <ol className="mt-10 space-y-6">
          {MST_KEY_IDEAS.map((k) => {
            const labs = LABS.filter((l) => l.mst.includes(k.code));
            return (
              <li key={k.code} className="rounded-xl bg-surface p-5 shadow-card">
                <p className="text-xs font-medium tracking-wide text-pine">
                  Key idea {k.code}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">{k.name}</h2>
                <p className="mt-3 text-sm text-ink-soft">{k.key}</p>
                <p className="mt-3 text-sm">
                  <span className="font-medium">Elementary. </span>
                  {k.elementary}
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Intermediate. </span>
                  {k.intermediate}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {labs.map((l) => (
                    <li key={l.id}>
                      <Link
                        to="/labs/$id"
                        params={{ id: l.id }}
                        className="inline-flex h-9 items-center rounded-full bg-bg-warm px-3 text-sm font-medium text-ink"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Also in the MST family</h2>
          <ul className="mt-4 grid gap-3">
            {OTHER_MST.map((o) => (
              <li key={o.code} className="rounded-xl bg-surface p-4 shadow-card">
                <p className="font-medium">
                  {o.code} · {o.name}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{o.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
