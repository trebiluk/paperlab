import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Scissors } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ShopStillLife } from "@/components/berty";
import { LabCard } from "@/components/lab-card";
import { Button } from "@/components/ui/button";
import { LabSvg } from "@/components/lab-svg";
import { APP_NAME, APP_TAGLINE } from "@/lib/brand";
import { LATEST_UPDATE } from "@/lib/changelog";
import { FAMILIES, GRADE_BANDS, LABS, getLab, pathFor } from "@/lib/labs";
import { MST5_STATEMENT } from "@/lib/mst";
import { setGradeBand, useGradeBand, useReadLevel, useRole } from "@/lib/lesson";
import { countDone, nextUndoneId, useDoneLabs } from "@/lib/progress";
import { UNITS } from "@/lib/units";
import { goldXp, xpIntoLevel } from "@/lib/skills";
import { TECHWORKS_NAME, TECHWORKS_URL } from "@/lib/room";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: APP_NAME }],
  }),
});

const FEATURED = ["kite", "bag", "flower", "grabber", "wallet", "frame", "beam", "whirligig"];

function Home() {
  const readLevel = useReadLevel();
  const role = useRole();
  const student = role === "student";
  const read = student ? "easy" : readLevel;
  const grade = useGradeBand();
  const path = pathFor(grade);
  const doneSet = useDoneLabs();
  const made = countDone(path, doneSet);
  const next = getLab(nextUndoneId(path, doneSet));
  const allMade = made === path.length && made > 0;
  const gold = xpIntoLevel(goldXp(doneSet));

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 overflow-x-clip px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div className="hero-copy flex flex-col gap-6">
          <p className="text-sm font-medium tracking-wide text-pine">
            {student ? "One sheet. One period." : "Technology education · Grades 2–8 · NYSED MST Standard 5"}
          </p>
          <h1 className="font-display text-[2.4rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl">
            {student ? "Make something with one sheet." : "Paper is the material. You are the factory."}
          </h1>
          <p className="max-w-xl text-lg text-ink-soft">
            {student
              ? "Tap Start here. Fold the scrap so it matches the picture."
              : `${APP_TAGLINE} ${LABS.length} paper labs — kites, bags, frames, grabbers, darts, boats — with a written challenge on every make, Easy / Class / Stretch reading, ELL frames, extra-help notes, and helper cards for a teaching assistant.`}
          </p>
          <ul className="flex flex-wrap gap-2">
            {["One sheet", "Scissors", "Glue", "A period"].map((chip) => (
              <li
                key={chip}
                className="rounded-md bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft shadow-card"
              >
                {chip}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            {allMade ? (
              <Button asChild size="lg">
                <Link to="/labs">
                  Year path
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/labs/$id" params={{ id: next?.id ?? "folds" }} search={{ step: 1 }}>
                  {made === 0 ? "Start here" : "Continue"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
            {student ? null : (
              <>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/plans">Teacher plans</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/skills">Skills · Gold</Link>
                </Button>
              </>
            )}
          </div>
          <p className="text-sm text-muted">
            {student && made === 0
              ? "Do every step. Check the test. Then tap We made this."
              : made === 0
              ? "Start the shop with folding techniques — valley and mountain on scrap."
              : allMade
                ? `All ${path.length} made on this Chromebook.`
                : `${made} of ${path.length} made on this Chromebook · next is ${next?.name ?? "the labs"}.`}
            {student || gold.xp === 0 ? "" : ` · ${gold.xp} Gold · ${gold.band}`}
            {!student && gold.xp === 0 ? " Gold XP starts when you mark a lab made." : ""}
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Grade band for this Chromebook">
            {GRADE_BANDS.map((b) => {
              const id = b.id === "all" ? undefined : b.id;
              const on = grade === id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setGradeBand(id)}
                  className={`flex h-11 items-center rounded-md px-3 text-sm font-medium ${on ? "bg-pine text-pine-fg" : "bg-surface text-ink-soft shadow-card"}`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-bg-warm p-2 shadow-card sm:p-3">
          <div className="aspect-square w-full sm:aspect-[5/4]">
            <ShopStillLife />
          </div>
          <p className="mt-1 pb-1 text-center text-sm text-muted">
            <Link to="/labs/$id" params={{ id: "berty" }} search={{ step: 1 }} className="font-medium text-pine">
              BertyBot · cut, fold, glue
            </Link>
          </p>
        </div>
      </section>

      {student ? null : (
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <blockquote className="rounded-xl bg-surface p-5 text-base leading-relaxed text-ink-soft shadow-card sm:p-7">
          <p className="text-xs font-medium tracking-wide text-pine">MST Standard 5 · Technology</p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">{MST5_STATEMENT}</p>
          <Link to="/standards" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-pine">
            Seven key ideas
            <ArrowRight className="size-3.5" />
          </Link>
        </blockquote>
      </section>
      )}

      {student ? null : (
      <>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="rounded-xl bg-surface p-5 shadow-card sm:flex sm:items-start sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-pine">
              {TECHWORKS_NAME} · Gold XP
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold">
              Eight skills. Practice here. The 1–4 on the desk.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Safety, measure, draw, model, tools, finish, present, team. Mark a
              lab made on this Chromebook and it counts as Gold. Print a Watch
              slip — same sentence the desk will store. The grade still lives
              in {TECHWORKS_NAME}.
            </p>
          </div>
          <div className="mt-4 flex shrink-0 flex-col items-start gap-2 sm:mt-0">
            <Link
              to="/skills"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-pine"
            >
              Skills board
              <ArrowRight className="size-3.5" />
            </Link>
            <a
              href={TECHWORKS_URL}
              className="inline-flex min-h-11 items-center text-sm font-medium text-pine"
              target="_blank"
              rel="noreferrer"
            >
              Open {TECHWORKS_NAME}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <p className="text-base text-ink">
          <Link to="/updates" className="font-medium text-pine">
            What’s new.
          </Link>{" "}
          {LATEST_UPDATE.items[0]}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILIES.map((f) => (
          <Link
            key={f.id}
            to="/labs"
            search={{ family: f.id }}
            className="card-lift rounded-xl bg-surface p-5 text-ink shadow-card"
          >
            <p className="text-xs font-medium tracking-wide text-pine">{f.name}</p>
            <p className="mt-2 text-sm text-ink-soft">{f.body}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">A year on a sheet</p>
        <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          Six units. {LABS.length} labs.
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((u) => (
            <li key={u.id}>
              <Link
                to="/labs"
                className="card-lift flex h-full flex-col rounded-xl bg-surface p-5 text-ink shadow-card"
              >
                <p className="text-xs font-medium tracking-wide text-pine">
                  {u.days} · {u.grades}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">{u.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{u.body}</p>
                <p className="mt-3 text-xs text-muted">{u.labs.length} labs</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium tracking-wide text-pine">{LABS.length} labs</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              Make, fly, hold, move.
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/labs">All labs</Link>
          </Button>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((id) => {
            const lab = LABS.find((l) => l.id === id);
            if (!lab) return null;
            return (
              <li key={id}>
                <LabCard lab={lab} read={read} done={doneSet.has(id)} compact />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-xl bg-surface p-5 shadow-card sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-medium tracking-wide text-pine">Studio</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              The cube is still here. It is one product line.
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Nine-step net cube, origami balloon, folding techniques, Grade 6
              developments, eleven nets, and the math lab. Same paper. Now it
              sits next to flight, structures, and mechanisms.
            </p>
            <Button asChild className="mt-6">
              <Link to="/studio">
                Open the studio
                <Scissors className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="lab-frame mx-auto aspect-[4/3] w-full max-w-sm p-2">
            <LabSvg visual="box-walls" />
          </div>
        </div>
      </section>
      </>
      )}
    </AppShell>
  );
}
