import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Clock, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnvelopeStudentPlan } from "@/components/envelope-plan";
import { StudentStepGuide } from "@/components/student-steps";
import { APP_REV, pageTitle } from "@/lib/brand";
import { getLab, isLabId, familyName, gradeSpan } from "@/lib/labs";
import { ELL, IEP, SAFETY, SPED, TA, TA_DAY, CLOSING, HOME_LANG } from "@/lib/supports";
import { MST_KEY_IDEAS, mstName } from "@/lib/mst";
import { unitsFor } from "@/lib/units";

export const Route = createFileRoute("/plans/$id")({
  component: PlanPage,
  head: ({ params }) => ({
    meta: [{ title: pageTitle(`${getLab(params.id)?.name ?? "Plan"} plan`) }],
  }),
});

function PlanPage() {
  const { id } = Route.useParams();
  const lab = getLab(id);

  if (!lab || !isLabId(id)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-ink-soft">No plan for that lab.</p>
        <Button asChild className="mt-4">
          <Link to="/plans">All plans</Link>
        </Button>
      </div>
    );
  }

  const ideas = MST_KEY_IDEAS.filter((k) => lab.mst.includes(k.code));
  const inUnits = unitsFor(lab.id);
  const young = gradeSpan(lab.grades)[0] <= 4;
  const flowMins = lab.steps.length
    ? lab.steps.map((s) => ({
        min: s.minutes.replace(" min", ""),
        title: s.title,
        body: s.body.class,
      }))
    : [
        { min: "5", title: "Hook", body: lab.plan.hook },
        { min: "25", title: "Do this", body: lab.ell },
        {
          min: "8",
          title: "Example",
          body: lab.challenge ?? lab.plan.assessment[0] ?? "Hold the product. Count or fly.",
        },
      ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link to="/plans" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-pine">
        <ArrowLeft className="size-3.5" />
        All plans
      </Link>
      <p className="mt-4 text-sm font-medium tracking-wide text-pine">Lesson plan · {lab.grades}</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{lab.name}</h1>
      <p className="mt-2 text-xs text-muted" data-paperlab-rev={APP_REV}>
        {APP_REV}
      </p>
      {lab.id === "envelope" ? <EnvelopeStudentPlan /> : <StudentStepGuide lab={lab} />}
      <p className="mt-4 text-ink-soft">{lab.teConcept}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Meta label="Time" value={lab.time} />
        <Meta label="Grouping" value="Solo + pair test" />
        <Meta label="MST 5" value={lab.mst.join(" · ")} />
        <Meta label="Family" value={familyName(lab.family)} />
      </dl>

      <div className="no-print mt-6 flex flex-wrap gap-3">
        <Button onClick={() => window.print()}>
          <Printer className="size-4" />
          Print this plan
        </Button>
        <Button asChild variant="secondary">
          <Link to="/labs/$id" params={{ id: lab.id }}>
            Student lab
          </Link>
        </Button>
        {lab.studio ? (
          <Button asChild variant="ghost">
            <Link to={lab.studio.to} search={lab.studio.search}>
              Open studio
            </Link>
          </Button>
        ) : null}
      </div>

      <Section title="Do now">{lab.plan.hook}</Section>

      <Section title="Objectives">
        <ul className="list-disc space-y-2 pl-5">
          {lab.plan.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Section>

      {inUnits.length > 0 ? (
        <Section title="Unit">
          {inUnits.map((u) => (
            <p key={u.id}>
              <span className="font-medium text-ink">{u.name}.</span> {u.days}. {u.body}
            </p>
          ))}
        </Section>
      ) : null}

      <Section title="NYSED MST Standard 5">
        <ul className="space-y-3">
          {ideas.map((k) => (
            <li key={k.code}>
              <span className="font-medium text-ink">{k.code} · {k.name}. </span>
              {young ? k.elementary : k.intermediate}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Materials">
        <ul className="list-disc space-y-1 pl-5">
          {lab.materials.map((m) => (
            <li key={m}>{m}</li>
          ))}
          <li>Classroom: this plan projected, Easy reading for multilingual learners</li>
        </ul>
      </Section>

      <Section title="Lesson flow">
        <ol className="space-y-5">
          {flowMins.map((f) => (
            <li key={f.title} className="grid grid-cols-[3.5rem_1fr] gap-4">
              <span className="flex h-10 items-center gap-1 text-sm font-medium tabular-nums text-pine">
                <Clock className="size-3.5" />
                {f.min}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium text-ink">{f.title}</h3>
                <p className="mt-2">{f.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Vocabulary">
        <ul className="space-y-2">
          {lab.vocab.map((v) => (
            <li key={v.term}>
              <span className="font-medium text-ink">{v.term}</span>
              {" — "}
              {v.meaning}
              <span lang="es" className="text-muted"> · {v.es}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="ELL">
        <p>{lab.ell}</p>
        <p className="mt-3">{HOME_LANG.why}</p>
        <p className="mt-3 font-medium text-ink">Sentence frames</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {ELL.frames.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="mt-3 font-medium text-ink">Cognates (Spanish)</p>
        <p className="mt-2">
          {ELL.cognates.map((c) => `${c.en} / ${c.es}`).join(" · ")}
        </p>
      </Section>

      <Section title="Reading levels">
        Easy (grades 2–4): one action per sentence. Class (4–6): classroom voice.
        Stretch (6–8): constraints, tradeoffs, data. Switch in the bar. Do not
        mix levels in one mouth — pick, then stay.
      </Section>

      <Section title="Special education / IEP / 504">
        <p>{lab.sped}</p>
        <p className="mt-3">{IEP.principle}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {SPED.fineMotor.slice(0, 3).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {SPED.attention.slice(0, 2).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
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
        <p className="mt-3">{SPED.alt[2]}</p>
      </Section>

      <Section title="Teacher assistant">
        <p>{TA.stance}</p>
        <p className="mt-2">{lab.ta}</p>
        <p className="mt-3 font-medium text-ink">Day of</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          {TA_DAY.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-3 font-medium text-ink">Say</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          {TA.say.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-3 font-medium text-ink">Never</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          {TA.dont.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Assessment">
        <ul className="list-disc space-y-2 pl-5">
          {lab.plan.assessment.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      <Section title="Common snags">
        <ul className="list-disc space-y-2 pl-5">
          {lab.plan.snags.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Extend">{lab.plan.extend}</Section>

      <Section title="Closing">
        <ul className="list-disc space-y-2 pl-5">
          {CLOSING.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </Section>

      <Section title="Safety">
        <ul className="list-disc space-y-2 pl-5">
          {SAFETY.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-3 shadow-card">
      <dt className="text-xs tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold capitalize">{value}</dd>
    </div>
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
