import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardList, Layers, Ruler, Scissors } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ShopStillLife } from "@/components/berty";
import { LabCard } from "@/components/lab-card";
import { Button } from "@/components/ui/button";
import { LabSvg } from "@/components/lab-svg";
import { APP_NAME, APP_TAGLINE } from "@/lib/brand";
import { LATEST_UPDATE, formatShopDate } from "@/lib/changelog";
import { FAMILIES, LABS, getLab } from "@/lib/labs";
import { MST5_STATEMENT } from "@/lib/mst";
import { useReadLevel } from "@/lib/lesson";
import { countDone, nextUndoneId, useDoneLabs } from "@/lib/progress";
import { PERIOD_PATH, UNITS } from "@/lib/units";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: APP_NAME }],
  }),
});

const FEATURED = ["beam", "dart", "boat", "catapult", "cube", "tower", "crane", "hat"];

function Home() {
  const read = useReadLevel();
  const doneSet = useDoneLabs();
  const made = countDone(PERIOD_PATH, doneSet);
  const next = getLab(nextUndoneId(PERIOD_PATH, doneSet));

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 overflow-x-clip px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div className="hero-copy flex flex-col gap-6">
          <p className="text-sm font-medium tracking-wide text-pine">
            Technology education · Grades 2–8 · NYSED MST Standard 5
          </p>
          <h1 className="font-display text-[2.4rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl">
            Paper is the material. You are the factory.
          </h1>
          <p className="max-w-xl text-lg text-ink-soft">
            {APP_TAGLINE} {LABS.length} paper labs — darts, boats, catapults,
            cranes, bridges, hats — with full lesson plans, Easy / Class /
            Stretch reading, ELL frames, extra-help notes, and helper cards
            for a teaching assistant.
          </p>
          <ul className="flex flex-wrap gap-2">
            {["One sheet", "Scissors", "Glue", "A period"].map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft shadow-card"
              >
                {chip}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/labs/$id" params={{ id: next?.id ?? "folds" }} search={{ step: 1 }}>
                {made === 0 ? "Start here" : "Continue"}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/plans">Teacher plans</Link>
            </Button>
          </div>
          <p className="text-sm text-muted">
            {made === 0
              ? "Start the shop with folding techniques — six moves on scrap."
              : `${made} of ${PERIOD_PATH.length} made on this Chromebook · next is ${next?.name ?? "the labs"}.`}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-bg-warm p-2 shadow-card sm:p-3">
          <div className="aspect-square w-full sm:aspect-[5/4]">
            <ShopStillLife />
          </div>
          <p className="mt-1 pb-1 text-center text-sm text-muted">BertyBot · cut, fold, glue</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <blockquote className="rounded-xl bg-surface p-5 text-[15px] leading-relaxed text-ink-soft shadow-card sm:p-7">
          <p className="text-xs font-medium tracking-wide text-pine">MST Standard 5 · Technology</p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">{MST5_STATEMENT}</p>
          <Link to="/standards" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-pine">
            Seven key ideas
            <ArrowRight className="size-3.5" />
          </Link>
        </blockquote>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="rounded-xl bg-surface p-5 shadow-card sm:flex sm:items-start sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-pine">What’s new · {formatShopDate(LATEST_UPDATE.date)}</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{LATEST_UPDATE.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">{LATEST_UPDATE.items[0]}</p>
          </div>
          <Link
            to="/updates"
            className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-pine sm:mt-0 sm:shrink-0"
          >
            Shop notes
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
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

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <HelpCard to="/supports" icon={<BookOpen className="size-5" />} title="Reading levels" body="Easy, Class, and Stretch. Same lab, three voices. Switch any time." />
        <HelpCard to="/supports" icon={<Layers className="size-5" />} title="ELL" body="Spanish cognates, sentence frames, picture-first steps." />
        <HelpCard to="/supports" icon={<ClipboardList className="size-5" />} title="Extra help" body="Fine-motor, attention, printed nets, tape instead of glue." />
        <HelpCard to="/supports" icon={<Ruler className="size-5" />} title="Helper cards" body="What a TA says, what they never do, what to watch." />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
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
    </AppShell>
  );
}

function HelpCard({
  to,
  icon,
  title,
  body,
}: {
  to: "/supports";
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link to={to} className="card-lift flex flex-col gap-3 rounded-xl bg-surface p-5 text-ink shadow-card">
      <span className="flex size-10 items-center justify-center rounded-md bg-toy-top/55 text-pine">
        {icon}
      </span>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="text-sm text-ink-soft">{body}</p>
    </Link>
  );
}
