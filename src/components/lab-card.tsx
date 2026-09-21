import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LabSvg } from "@/components/lab-svg";
import { familyName, labThumb, type Lab } from "@/lib/labs";
import { pickRead, type ReadLevel } from "@/lib/lesson";
import { mstName } from "@/lib/mst";
import { cn } from "@/lib/utils";

export function LabCard({
  lab,
  read,
  done,
  compact,
  titleAs,
}: {
  lab: Lab;
  read: ReadLevel;
  done?: boolean;
  compact?: boolean;
  titleAs?: "h2" | "h3";
}) {
  const Title = titleAs ?? (compact ? "h3" : "h2");
  return (
    <Link
      to="/labs/$id"
      params={{ id: lab.id }}
      search={{ step: 1 }}
      className="card-lift fold-ear flex h-full flex-col rounded-xl bg-surface text-ink shadow-card"
    >
      <div className="lab-frame aspect-[4/3] p-2">
        <LabSvg visual={labThumb(lab)} decorative />
      </div>
      <div className={cn("flex flex-1 flex-col p-4 pt-0", compact ? "gap-1" : "gap-2")}>
        <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted">
          <span>
            {familyName(lab.family)} · {compact ? lab.time : `${lab.grades} · ${lab.time}`}
          </span>
          {done ? (
            <span className="ml-auto inline-flex items-center gap-1 text-ok">
              <Check className="size-3.5" aria-hidden />
              Made
            </span>
          ) : null}
        </p>
        <Title className={cn("font-display font-semibold", compact ? "text-lg" : "text-xl")}>
          {lab.name}
        </Title>
        <p className="text-sm text-ink-soft">{pickRead(read, lab.blurb)}</p>
        {compact ? null : (
          <p className="mt-auto pt-2 text-xs text-muted">{lab.mst.map(mstName).join(" · ")}</p>
        )}
      </div>
    </Link>
  );
}
