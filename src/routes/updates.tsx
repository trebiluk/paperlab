import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { pageTitle } from "@/lib/brand";
import { UPDATES, formatShopDate } from "@/lib/changelog";

export const Route = createFileRoute("/updates")({
  component: UpdatesPage,
  head: () => ({ meta: [{ title: pageTitle("Shop notes") }] }),
});

function UpdatesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">Shop notes</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          What changed.
        </h1>
        <p className="mt-4 text-ink-soft">
          Newest first. Written for the room, not a changelog dump. Labs stay
          on the year path; a refresh should not dump the class back to step 1.
        </p>

        <ol className="mt-10 grid gap-8">
          {UPDATES.map((note) => (
            <li key={note.date} className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
              <p className="text-xs font-medium tracking-wide text-pine">
                {formatShopDate(note.date)}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold">{note.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
                {note.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-muted">
          <Link to="/labs" className="font-medium text-pine">
            Back to the labs
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
