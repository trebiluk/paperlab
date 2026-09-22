import { Link } from "@tanstack/react-router";
import { useDoneLabs } from "@/lib/progress";
import { goldXp, xpIntoLevel } from "@/lib/skills";
import { cn } from "@/lib/utils";

export function GoldChip({ compact }: { compact?: boolean }) {
  const done = useDoneLabs();
  const { xp, band } = xpIntoLevel(goldXp(done));
  return (
    <Link
      to="/skills"
      title="Gold XP on this Chromebook. Watch slip on Skills. The 1–4 mark lives in TechWorks."
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink no-underline",
        compact ? "bg-bg-warm" : "bg-surface shadow-card",
      )}
    >
      <span
        className="size-2.5 shrink-0 rounded-full bg-tape"
        aria-hidden
      />
      <span className="tabular-nums">
        {xp} Gold
      </span>
      {compact ? null : <span className="text-muted">{band}</span>}
    </Link>
  );
}
