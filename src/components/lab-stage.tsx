import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { READ_LEVELS, setReadLevel, useReadLevel, type ReadLevel } from "@/lib/lesson";
import { LABS, getLab, type Lab } from "@/lib/labs";
import { TECH_ROOM_URL } from "@/lib/room";
import { SHOP_SKILLS, skillsOfLab, type SkillId } from "@/lib/skills";
import { TA } from "@/lib/supports";
import { cn } from "@/lib/utils";

const UNITS: { id: string; label: string }[] = [
  { id: "start", label: "Start" },
  { id: "make", label: "Make" },
  { id: "fly", label: "Fly" },
  { id: "hold", label: "Hold" },
  { id: "move", label: "Move" },
  { id: "fold", label: "Fold" },
  { id: "draw", label: "Draw" },
];

const START_IDS = ["folds", "crane", "draw", "balloon"];

function unitFor(lab: Lab) {
  if (START_IDS.includes(lab.id)) return "start";
  if (UNITS.some((u) => u.id === lab.family)) return lab.family;
  return "make";
}

function labsInUnit(id: string) {
  if (id === "start") {
    return START_IDS.map((item) => getLab(item)).filter((item): item is Lab => Boolean(item));
  }
  return LABS.filter((item) => item.family === id);
}

function Chip({
  on,
  children,
  onClick,
  pressed,
}: {
  on?: boolean;
  children: string;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed ?? on}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium",
        on ? "bg-pine text-pine-fg" : "bg-surface text-ink shadow-card",
      )}
    >
      {children}
    </button>
  );
}

function PaneBody({
  lab,
  unit,
  setUnit,
  query,
  setQuery,
  skill,
  setSkill,
  helper,
  setHelper,
  onPick,
}: {
  lab: Lab;
  unit: string;
  setUnit: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  skill: SkillId | null;
  setSkill: (id: SkillId | null) => void;
  helper: boolean;
  setHelper: (on: boolean) => void;
  onPick: () => void;
}) {
  const read = useReadLevel();
  const q = query.trim().toLowerCase();
  let list = q
    ? LABS.filter((item) => item.name.toLowerCase().includes(q) || item.id.includes(q))
    : labsInUnit(unit);
  if (skill) list = list.filter((item) => skillsOfLab(item).includes(skill));

  return (
    <div className="flex flex-col gap-5 p-3" data-lab-pane>
      <label className="block">
        <span className="text-sm font-semibold text-ink">Search</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a lab"
          className="mt-2 min-h-11 w-full rounded-md border border-line bg-surface px-3 text-base text-ink"
        />
      </label>

      <div>
        <p className="text-sm font-semibold text-ink">Units</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {UNITS.map((item) => (
            <Chip key={item.id} on={unit === item.id && !q} onClick={() => { setQuery(""); setUnit(item.id); }}>
              {item.label}
            </Chip>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-1" aria-label="Labs in this unit">
        {list.map((item) => (
          <li key={item.id}>
            <Link
              to="/labs/$id"
              params={{ id: item.id }}
              search={{ step: 1 }}
              aria-current={item.id === lab.id ? "page" : undefined}
              onClick={onPick}
              className={cn(
                "flex min-h-11 items-center rounded-md px-3 text-sm font-medium",
                item.id === lab.id ? "bg-pine text-pine-fg" : "text-ink hover:bg-bg-warm",
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
        {list.length === 0 ? <li className="px-3 py-2 text-sm text-muted">No lab matches.</li> : null}
      </ul>

      <div>
        <p className="text-sm font-semibold text-ink">Filters</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Reading level">
          {READ_LEVELS.map((level) => (
            <Chip
              key={level.id}
              on={read === level.id}
              onClick={() => setReadLevel(level.id as ReadLevel)}
            >
              {level.name}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">Skills</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SHOP_SKILLS.map((item) => (
            <Chip
              key={item.id}
              on={skill === item.id}
              onClick={() => setSkill(skill === item.id ? null : item.id)}
            >
              {item.name}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">Helper</p>
        <div className="mt-2">
          <Chip on={helper} onClick={() => setHelper(!helper)}>
            Helper
          </Chip>
        </div>
        {helper ? (
          <div className="mt-3 rounded-md bg-surface p-3 text-sm text-ink shadow-card">
            <p>{TA.stance}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {TA.do.slice(0, 3).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function LabStage({ lab, children }: { lab: Lab; children: ReactNode }) {
  const [unit, setUnit] = useState(() => unitFor(lab));
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState<SkillId | null>(null);
  const [helper, setHelper] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUnit(unitFor(lab));
    setQuery("");
    setOpen(false);
  }, [lab.id]);

  const pane = (
    <PaneBody
      lab={lab}
      unit={unit}
      setUnit={setUnit}
      query={query}
      setQuery={setQuery}
      skill={skill}
      setSkill={setSkill}
      helper={helper}
      setHelper={setHelper}
      onPick={() => setOpen(false)}
    />
  );

  return (
    <div className="flex h-dvh flex-col" data-make-stage={lab.id}>
      <header className="sheet-bar no-print flex shrink-0 items-center gap-2 px-3 py-2">
        <a
          href={TECH_ROOM_URL}
          className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-sm font-medium text-pine"
        >
          Back to hub
        </a>
        <h1 className="min-w-0 flex-1 truncate font-display text-xl font-semibold text-ink sm:text-2xl">
          {lab.name}
        </h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex min-h-11 items-center rounded-md bg-surface px-3 text-sm font-medium text-ink shadow-card">
            Labs
          </SheetTrigger>
          <SheetContent side="left" className="w-80 gap-0 overflow-y-auto p-0">
            <SheetHeader className="border-b border-line pr-14">
              <SheetTitle>Labs</SheetTitle>
              <SheetDescription>Units, filters, skills, helper, and search.</SheetDescription>
            </SheetHeader>
            {pane}
          </SheetContent>
        </Sheet>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
}
