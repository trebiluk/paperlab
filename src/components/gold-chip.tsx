import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { goldFromRecords } from "@/lib/hub-record";
import { useDoneLabs } from "@/lib/progress";
import { goldXp, xpIntoLevel } from "@/lib/skills";
import { useCopy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function GoldChip({ compact }: { compact?: boolean }) {
  const done = useDoneLabs();
  const local = xpIntoLevel(goldXp(done));
  const [fromRecords, setFromRecords] = useState<number | null>(null);

  useEffect(() => {
    const read = () => setFromRecords(goldFromRecords());
    read();
    window.addEventListener("pl-gold", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("pl-gold", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const xp = fromRecords ?? local.xp;
  const band = fromRecords == null ? local.band : xpIntoLevel(fromRecords).band;
  const copy = useCopy();
  return (
    <Link
      to="/skills"
      id="pl-gold"
      title="Gold XP on this Chromebook. Watch slip on Skills. The 1–4 mark lives in TechWorks."
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-ink no-underline",
        compact ? "bg-bg-warm" : "bg-surface shadow-card",
      )}
    >
      <span
        className="size-2.5 shrink-0 rounded-full bg-tape"
        aria-hidden
      />
      <span className="tabular-nums">
        {xp} {copy("gold")}
      </span>
      {compact ? null : <span className="text-muted">{band}</span>}
    </Link>
  );
}
