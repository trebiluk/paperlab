import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Copy, ExternalLink, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import { useRole } from "@/lib/lesson";
import { useDoneLabs } from "@/lib/progress";
import { TECHWORKS_NAME, TECHWORKS_TAGLINE, TECHWORKS_URL } from "@/lib/room";
import {
  LEVEL_BANDS,
  LEVEL_MAX,
  SKILL_MARKS,
  labsForSkill,
  skillSnapshot,
  watchSentence,
  type SkillId,
} from "@/lib/skills";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  component: SkillsPage,
  head: () => ({ meta: [{ title: pageTitle("Skills · Gold XP") }] }),
});

function SkillsPage() {
  const done = useDoneLabs();
  const role = useRole();
  const snap = skillSnapshot(done);
  const teacher = role !== "student";
  const sentence = watchSentence(done);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <style>{`@media print { .screen-only { display: none !important; } .watch-slip { box-shadow: none !important; border-radius: 0 !important; background: white !important; } }`}</style>
        <div className="screen-only">
          <p className="text-sm font-medium tracking-wide text-pine">
            {TECHWORKS_NAME} · Gold XP
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Getting better at the craft.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Mark a lab made and it counts here — on this Chromebook, no names.
            Gold XP is practice. The 1–4 mark and the grade live in{" "}
            {TECHWORKS_NAME}.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-xl bg-surface p-5 shadow-card sm:p-7">
              <p className="text-xs font-medium tracking-wide text-pine">Gold XP</p>
              <p className="mt-2 font-display text-5xl font-semibold tabular-nums tracking-tight">
                {snap.xp}
              </p>
              <p className="mt-1 text-lg text-ink-soft">
                {snap.band}
                <span className="text-muted"> · level {snap.level} of {LEVEL_MAX}</span>
              </p>
              <div
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-bg-warm"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={snap.need}
                aria-valuenow={snap.into}
                aria-valuetext={`${snap.into} of ${snap.need} toward the next band`}
                aria-label="XP into this band"
              >
                <div
                  className="h-full origin-left bg-tape transition-transform duration-200"
                  style={{ transform: `scaleX(${snap.need ? snap.into / snap.need : 0})` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted">
                {snap.next
                  ? `${snap.untilNext} more to ${snap.next}. Same bands as the desk.`
                  : "Legend. Keep making — XP still counts."}
              </p>
              <ol className="mt-5 flex flex-wrap gap-1.5">
                {LEVEL_BANDS.map((b) => (
                  <li
                    key={b.label}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      snap.band === b.label
                        ? "bg-tape/50 text-ink"
                        : snap.xp >= b.minXp
                          ? "bg-bg-warm text-ink-soft"
                          : "bg-bg-warm text-faint",
                    )}
                  >
                    {b.label}
                    <span className="ml-1 tabular-nums text-muted">{b.minXp}</span>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="flex flex-col justify-between rounded-xl bg-surface p-5 shadow-card sm:p-7">
              <div>
                <p className="text-xs font-medium tracking-wide text-pine">
                  {TECHWORKS_NAME}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {TECHWORKS_TAGLINE}
                </h2>
                <p className="mt-3 text-sm text-ink-soft">
                  Crew. Skills. Gold. Cash is a perk game — not the grade, not on
                  the family sheet. Watch stores the sentence on the desk.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={TECHWORKS_URL} target="_blank" rel="noreferrer">
                    Open {TECHWORKS_NAME}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/labs" search={{ family: undefined, step: undefined, grade: undefined }}>
                    Year path
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>

          {teacher ? (
            <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
              <span className="font-medium text-ink">Teacher. </span>
              This board is device-local practice. Do not copy it into a grade.
              Show the Watch slip, then tap the 1–4 on the {TECHWORKS_NAME} desk.
            </p>
          ) : null}
        </div>

        <WatchSlip
          xp={snap.xp}
          band={snap.band}
          level={snap.level}
          made={snap.made.map((lab) => lab.name)}
          skills={snap.skills}
          sentence={sentence}
        />

        <section className="screen-only mt-10">
          <h2 className="font-display text-2xl font-semibold">Eight shop skills</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Same list as the family sheet. Safety, measure, draw, model, tools,
            finish, present, team. A lab trains two to four of them.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {snap.skills.map((s) => (
              <li key={s.id} className="rounded-xl bg-surface p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-pine">
                      {s.name.toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{s.name}</h3>
                  </div>
                  <p
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                      s.mark >= 3
                        ? "bg-ok/15 text-ok"
                        : s.mark > 0
                          ? "bg-tape/40 text-ink"
                          : "bg-bg-warm text-muted",
                    )}
                  >
                    {s.mark > 0 ? `${s.mark} · ${s.markName}` : s.markName}
                  </p>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{s.paper}</p>
                {s.stem ? (
                  <p className="mt-2 text-sm text-ink">
                    <span className="font-medium">Watch. </span>
                    {s.stem}
                  </p>
                ) : null}
                <div
                  className="mt-3 h-1 overflow-hidden rounded-full bg-bg-warm"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={7}
                  aria-valuenow={Math.min(s.count, 7)}
                  aria-label={`${s.name} practice`}
                >
                  <div
                    className="h-full origin-left bg-pine transition-transform duration-200"
                    style={{ transform: `scaleX(${Math.min(s.count, 7) / 7})` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  {s.count} lab{s.count === 1 ? "" : "s"} on this Chromebook
                  {teacher ? " · practice, not the posted 1–4" : ""}
                </p>
                <SkillLabs id={s.id} done={done} />
              </li>
            ))}
          </ul>
        </section>

        <section className="screen-only mt-10">
          <h2 className="font-display text-2xl font-semibold">How the 1–4 reads</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_MARKS.map((m) => (
              <li key={m.n} className="rounded-xl bg-surface p-4 shadow-card">
                <p className="text-xs font-medium tracking-wide text-pine">
                  {m.n}
                </p>
                <p className="mt-1 font-display text-lg font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{m.why}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Cash stays in {TECHWORKS_NAME}. Helping extra can earn a perk — not
            XP. Watch uses the same sentence the desk will store.
          </p>
        </section>
      </div>
    </AppShell>
  );
}

function WatchSlip({
  xp,
  band,
  level,
  made,
  skills,
  sentence,
}: {
  xp: number;
  band: string;
  level: number;
  made: string[];
  skills: { id: string; name: string; mark: number; markName: string; stem: string }[];
  sentence: string;
}) {
  const seen = skills.filter((s) => s.mark > 0);
  return (
    <section
      id="watch-slip"
      className="watch-slip mt-8 rounded-xl bg-surface p-5 shadow-card sm:p-7"
    >
      <p className="text-xs font-medium tracking-wide text-pine">Watch slip</p>
      <h2 className="mt-1 font-display text-2xl font-semibold">
        Show this at the desk.
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        This Chromebook. No name. Practice, not the posted 1–4.
      </p>
      <p className="mt-4 font-display text-3xl font-semibold tabular-nums tracking-tight">
        {xp} Gold
        <span className="ml-2 text-xl font-medium text-ink-soft">
          {band}
          <span className="text-muted"> · level {level} of {LEVEL_MAX}</span>
        </span>
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        {made.length
          ? `Seen in ${made.slice(0, 6).join(", ")}${made.length > 6 ? ` +${made.length - 6}` : ""}.`
          : "No labs marked made yet."}
      </p>
      {seen.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {seen.map((s) => (
            <li key={s.id} className="rounded-lg bg-bg-warm px-4 py-3">
              <p className="text-xs font-medium tracking-wide text-pine">
                {s.name.toUpperCase()} · {s.mark} {s.markName}
              </p>
              <p className="mt-1 text-sm text-ink">{s.stem}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-lg bg-bg-warm px-4 py-3 text-sm text-ink-soft">
          Mark a lab made. The Watch sentence appears here — same words the desk
          will store.
        </p>
      )}
      <p className="mt-4 text-sm text-ink-soft">{sentence}</p>
      <div className="no-print mt-5 flex flex-wrap gap-3">
        <CopyWatch text={sentence} />
        <Button variant="secondary" onClick={() => window.print()}>
          <Printer className="size-4" />
          Print this slip
        </Button>
      </div>
    </section>
  );
}

function CopyWatch({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="secondary"
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard can be blocked on a locked Chromebook */
        }
      }}
    >
      <Copy className="size-4" />
      {copied ? "Copied" : "Copy Watch sentence"}
    </Button>
  );
}

function SkillLabs({ id, done }: { id: SkillId; done: Set<string> }) {
  const labs = labsForSkill(id);
  const shown = labs.slice(0, 8);
  const extra = labs.length - shown.length;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {shown.map((lab) => (
        <li key={lab.id}>
          <Link
            to="/labs/$id"
            params={{ id: lab.id }}
            search={{ step: 1 }}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-xs font-medium",
              done.has(lab.id) ? "bg-ok/15 text-ok" : "bg-bg-warm text-ink-soft",
            )}
          >
            {done.has(lab.id) ? <Check className="size-3" aria-hidden /> : null}
            {lab.name}
          </Link>
        </li>
      ))}
      {extra > 0 ? (
        <li className="inline-flex h-8 items-center px-1 text-xs text-muted">
          +{extra} more
        </li>
      ) : null}
    </ul>
  );
}
