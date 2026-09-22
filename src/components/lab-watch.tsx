import { Link } from "@tanstack/react-router";
import { useDoneLabs } from "@/lib/progress";
import { watchOfLab } from "@/lib/skills";

export function LabWatch({ labId }: { labId: string }) {
  const done = useDoneLabs();
  const rows = watchOfLab(labId, done);
  return (
    <div className="mt-4 rounded-xl bg-surface p-4 shadow-card sm:p-5">
      <p className="text-xs font-medium tracking-wide text-pine">Watch · practice</p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {rows.map((s) => (
          <li key={s.id}>
            <p className="text-sm font-medium text-ink">
              {s.name}
              {s.mark > 0 ? ` · ${s.mark} ${s.markName}` : " · not seen"}
            </p>
            {s.stem ? <p className="mt-0.5 text-sm text-ink-soft">{s.stem}</p> : null}
          </li>
        ))}
      </ul>
      <Link
        to="/skills"
        hash="watch-slip"
        className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-pine"
      >
        Watch slip · show this at the desk
      </Link>
    </div>
  );
}
