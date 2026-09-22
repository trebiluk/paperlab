/** TechWorks shop skills + Gold XP. Practice on this Chromebook; the 1–4 mark lives on the desk. */

import type { Lab } from "./labs";
import { LABS, getLab } from "./labs";
import { stemOf } from "./stems";

export type SkillId =
  | "safety"
  | "measure"
  | "draw"
  | "model"
  | "tools"
  | "finish"
  | "present"
  | "team";

export const SKILL_MAX = 4;
export const XP_PER_LAB = 1;
export const XP_PER_LEVEL = 6;
export const LEVEL_MAX = 8;

export const SKILL_MARKS = [
  { n: 1, name: "Beginning", why: "Needs a demo. Not independent yet." },
  { n: 2, name: "Developing", why: "Can do it with a check-in." },
  { n: 3, name: "Proficient", why: "Independent. Meets the standard." },
  { n: 4, name: "Distinguished", why: "Can teach a crewmate. Exceeds." },
] as const;

export type LevelBand = { minXp: number; label: string };

/** Same bands as TechWorks desk. Cub at 0, Legend at 42. */
export const LEVEL_BANDS: LevelBand[] = [
  { minXp: 0, label: "Cub" },
  { minXp: 6, label: "Rookie" },
  { minXp: 12, label: "Scout" },
  { minXp: 18, label: "Builder" },
  { minXp: 24, label: "Crafter" },
  { minXp: 30, label: "Lead" },
  { minXp: 36, label: "Ace" },
  { minXp: 42, label: "Legend" },
];

export type SkillDef = {
  id: SkillId;
  name: string;
  does: string;
  why: string;
  paper: string;
};

export const SHOP_SKILLS: SkillDef[] = [
  {
    id: "safety",
    name: "Safety",
    does: "Goggles, stance, ask before a tool.",
    why: "No work until this is solid.",
    paper: "Blades closed walking. Two hands on the sheet.",
  },
  {
    id: "measure",
    name: "Measure",
    does: "Rule, square, mark once.",
    why: "Cuts start with a true mark.",
    paper: "Square a rectangle. Mark once. Same height every drop.",
  },
  {
    id: "draw",
    name: "Draw",
    does: "Sketch the part before a cut.",
    why: "They think before they cut.",
    paper: "Thick = cut. Dashed = fold. A drawing someone else can follow.",
  },
  {
    id: "model",
    name: "Model",
    does: "Build the idea to size.",
    why: "The idea becomes a part.",
    paper: "The net becomes a product. Test the spec.",
  },
  {
    id: "tools",
    name: "Tools",
    does: "The right tool, set, used, put back.",
    why: "The machine does not think for them.",
    paper: "Scissors, glue, ruler — used, then put back.",
  },
  {
    id: "finish",
    name: "Finish",
    does: "Sand, paint, stain — the last 10%.",
    why: "The last 10% is the product.",
    paper: "Sharp creases. Square corners. Tabs glued, not mashed.",
  },
  {
    id: "present",
    name: "Present",
    does: "Say what they built and why.",
    why: "They can explain the work.",
    paper: "Name input, process, output. A 30-second share.",
  },
  {
    id: "team",
    name: "Team",
    does: "Jobs split, no one idle.",
    why: "A crew is not four solo jobs.",
    paper: "Pair a cutter with a folder. No one idle.",
  },
];

export const SKILL_IDS = SHOP_SKILLS.map((s) => s.id);

const FAMILY_SKILLS: Record<string, SkillId[]> = {
  fold: ["safety", "tools", "finish"],
  draw: ["safety", "draw", "measure"],
  make: ["safety", "model", "tools", "finish"],
  fly: ["safety", "measure", "model", "present"],
  hold: ["safety", "model", "measure", "team"],
  move: ["safety", "tools", "model", "measure"],
  hang: ["safety", "finish", "present", "team"],
};

const LAB_SKILLS: Partial<Record<string, SkillId[]>> = {
  cube: ["safety", "draw", "model", "tools"],
  solids: ["safety", "draw", "model", "measure"],
  box: ["safety", "draw", "model", "tools"],
  nets: ["safety", "draw", "model"],
  draw: ["safety", "draw", "measure"],
  folds: ["safety", "tools", "measure"],
  balloon: ["safety", "tools", "model", "finish"],
  balance: ["safety", "measure", "model", "present"],
  teller: ["safety", "tools", "present", "team"],
  kite: ["safety", "measure", "model", "tools"],
  bag: ["safety", "model", "tools", "finish"],
  wallet: ["safety", "model", "tools", "finish"],
  frame: ["safety", "model", "tools", "finish"],
};

export function skillOf(id: SkillId) {
  return SHOP_SKILLS.find((s) => s.id === id);
}

export function skillsOfLab(lab: Lab | string): SkillId[] {
  const id = typeof lab === "string" ? lab : lab.id;
  const override = LAB_SKILLS[id];
  if (override) return override;
  const row = typeof lab === "string" ? getLab(lab) : lab;
  if (!row) return ["safety"];
  return FAMILY_SKILLS[row.family] ?? ["safety"];
}

export function labsForSkill(id: SkillId) {
  return LABS.filter((lab) => skillsOfLab(lab).includes(id));
}

export function goldXp(done: Set<string>) {
  let n = 0;
  for (const id of done) if (getLab(id)) n += XP_PER_LAB;
  return n;
}

export function bandAt(xp: number) {
  return LEVEL_BANDS.filter((b) => xp >= b.minXp).at(-1) ?? LEVEL_BANDS[0];
}

export function nextBand(xp: number) {
  return LEVEL_BANDS.find((b) => b.minXp > xp) ?? null;
}

export function workerLevel(xp: number) {
  return Math.min(LEVEL_MAX, 1 + Math.floor(xp / XP_PER_LEVEL));
}

export function xpIntoLevel(xp: number) {
  const level = workerLevel(xp);
  const into = xp % XP_PER_LEVEL;
  const band = bandAt(xp);
  const next = nextBand(xp);
  return { xp, level, into, need: XP_PER_LEVEL, band: band.label, next: next?.label ?? null, untilNext: next ? next.minXp - xp : 0 };
}

/** Practice count → 1–4. Not the grade — Watch stores the sentence on the desk. */
export function practiceMark(n: number): 0 | 1 | 2 | 3 | 4 {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n <= 3) return 2;
  if (n <= 6) return 3;
  return 4;
}

export function markName(n: number) {
  if (n <= 0) return "Not seen";
  return SKILL_MARKS.find((m) => m.n === n)?.name ?? "Not seen";
}

export function skillPractice(id: SkillId, done: Set<string>) {
  let n = 0;
  for (const lab of labsForSkill(id)) if (done.has(lab.id)) n += 1;
  return n;
}

export type SkillSnap = SkillDef & {
  count: number;
  mark: 0 | 1 | 2 | 3 | 4;
  markName: string;
  stem: string;
};

export function skillSnapshot(done: Set<string>) {
  const xp = goldXp(done);
  return {
    ...xpIntoLevel(xp),
    made: madeLabs(done),
    skills: SHOP_SKILLS.map((s) => {
      const count = skillPractice(s.id, done);
      const mark = practiceMark(count);
      return {
        ...s,
        count,
        mark,
        markName: markName(mark),
        stem: stemOf(s.id, mark),
      } satisfies SkillSnap;
    }),
  };
}

export function madeLabs(done: Set<string>) {
  return LABS.filter((lab) => done.has(lab.id));
}

export function watchLines(done: Set<string>) {
  return skillSnapshot(done).skills.filter((s) => s.mark > 0);
}

/** One paragraph a teacher can paste into Watch. No name. */
export function watchSentence(done: Set<string>) {
  const snap = skillSnapshot(done);
  const seen = snap.made.map((lab) => lab.name);
  const seenLine = seen.length
    ? `Seen in ${seen.slice(0, 4).join(", ")}${seen.length > 4 ? ` +${seen.length - 4}` : ""}.`
    : "No labs marked made on this Chromebook.";
  const skillLine = snap.skills
    .filter((s) => s.mark > 0)
    .map((s) => `${s.name} ${s.markName}: ${s.stem}`)
    .join(" ");
  const body = skillLine || "No shop skill practiced yet.";
  return `PaperLab practice. ${snap.xp} Gold · ${snap.band}. ${seenLine} ${body} Practice, not the posted 1–4.`;
}

export function watchOfLab(lab: Lab | string, done: Set<string>) {
  const ids = new Set(skillsOfLab(lab));
  return skillSnapshot(done).skills.filter((s) => ids.has(s.id));
}

export { stemOf };
