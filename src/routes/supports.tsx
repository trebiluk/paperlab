import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { pageTitle } from "@/lib/brand";
import { READ_LEVELS, ROOM_ROLES } from "@/lib/lesson";
import { ELL, HOME_LANG, IEP, SAFETY, SPED, TA, TA_DAY } from "@/lib/supports";

export const Route = createFileRoute("/supports")({
  component: SupportsPage,
  head: () => ({ meta: [{ title: pageTitle("Classroom supports") }] }),
});

function SupportsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-pine">Classroom</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Everyone makes. The spec changes, not the standard.
        </h1>
        <p className="mt-4 text-ink-soft">
          Reading, language, extra help, and helper cards wrap every lab. Use
          the bar at the top of every page. Standard 5 still means design,
          construct, use, and evaluate — a worksheet is not a substitute.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Set <span className="font-medium text-ink">Helper</span> in the bar
          when an aide is sitting with a student. Set{" "}
          <span className="font-medium text-ink">Teacher</span> to see ELL and
          extra-help notes on the lab itself.
        </p>

        <Section title="Reading levels">
          <ul className="grid gap-3">
            {READ_LEVELS.map((l) => (
              <li key={l.id} className="rounded-xl bg-surface p-4 shadow-card">
                <p className="font-medium">
                  {l.name} · grades {l.grades}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{l.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Same diagrams. Same spec. Different sentences. A student may start
            Easy and switch to Class after the first make.
          </p>
        </Section>

        <Section title="Room roles">
          <ul className="grid gap-3">
            {ROOM_ROLES.map((r) => (
              <li key={r.id} className="rounded-xl bg-surface p-4 shadow-card">
                <p className="font-medium">{r.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{r.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="ELL">
          <p>{ELL.why}</p>
          <p className="mt-3">{HOME_LANG.why}</p>
          <p className="mt-4 font-medium text-ink">Moves</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {[...ELL.moves, ...HOME_LANG.moves].filter((m, i, arr) => arr.indexOf(m) === i).map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-ink">Sentence frames</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {ELL.frames.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-ink">Cognates</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {ELL.cognates.map((c) => (
              <li key={c.en} className="rounded-lg bg-surface px-3 py-2 shadow-card">
                <span className="font-medium">{c.en}</span>
                <span className="text-ink-soft"> · {c.es}</span>
                <span className="block text-xs text-muted">{c.say}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Special education">
          <p>{IEP.principle}</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-ink">
                  <th className="py-2 pr-3 font-medium">Need</th>
                  <th className="py-2 pr-3 font-medium">Try</th>
                  <th className="py-2 font-medium">Not this</th>
                </tr>
              </thead>
              <tbody>
                {IEP.rows.map((r) => (
                  <tr key={r.need} className="border-b border-line/70">
                    <td className="py-2 pr-3 font-medium text-ink">{r.need}</td>
                    <td className="py-2 pr-3">{r.try}</td>
                    <td className="py-2">{r.not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Block title="Fine motor" items={SPED.fineMotor} />
          <Block title="Attention" items={SPED.attention} />
          <Block title="Access" items={SPED.access} />
          <Block title="Alternates" items={SPED.alt} />
        </Section>

        <Section title="Teacher assistant">
          <p>{TA.stance}</p>
          <Block title="Day of" items={TA_DAY} />
          <Block title="Do" items={TA.do} />
          <Block title="Say" items={TA.say} />
          <Block title="Never" items={TA.dont} />
          <Block title="Watch" items={TA.watch} />
        </Section>

        <Section title="Safety">
          <ul className="list-disc space-y-2 pl-5">
            {SAFETY.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>

        <p className="mt-10 text-sm text-ink-soft">
          Need the legal language?{" "}
          <Link to="/standards" className="font-medium text-pine">
            MST Standard 5
          </Link>
          .
        </p>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-4 text-base leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium text-ink">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
