/** Same observable 1–4 sentences TechWorks Watch stores. Family-sheet skills only. */

type Ladder = [string, string, string, string];

const LADDER: Record<string, Ladder> = {
  safety: [
    "Needs a reminder for glasses or stance.",
    "Puts PPE on after a check-in.",
    "PPE on, stance set, asks before a new tool.",
    "Stops a crewmate who skipped PPE.",
  ],
  measure: [
    "Mark is a guess. Needs a demo.",
    "Mark is close with a check-in.",
    "Mark is true within a blade width.",
    "Catches a bad mark before the cut.",
  ],
  draw: [
    "No sketch, or it cannot be followed.",
    "Sketch exists with a check-in.",
    "A drawing someone else can follow.",
    "Drawing has sizes another crew could build.",
  ],
  model: [
    "Part does not match the idea.",
    "Part stands with help.",
    "Prototype stands and matches the plan.",
    "Tests, then revises without being told.",
  ],
  tools: [
    "Wrong tool, or cannot name the risk.",
    "Right tool after a check-in.",
    "Sets the tool, names the risk, puts it back.",
    "Coaches a crewmate on setup.",
  ],
  finish: [
    "Skips grit or leaves runs.",
    "Sand or paint with a check-in.",
    "Surface is even. No runs.",
    "Can teach grit order or a clean coat.",
  ],
  present: [
    "Cannot say what they built.",
    "Needs prompts for what and why.",
    "A 30-second share: what and why.",
    "Answers a how-it-works question.",
  ],
  team: [
    "Solo job. Others idle.",
    "Helps when asked.",
    "Jobs split. Crew finishes a step together.",
    "Names the next job without you.",
  ],
};

export function stemOf(id: string, n: number): string {
  if (n <= 0) return "";
  const i = Math.min(4, Math.max(1, Math.round(n))) - 1;
  return LADDER[id]?.[i] ?? "";
}

export function stemsOf(id: string): { n: 1 | 2 | 3 | 4; text: string }[] {
  return ([1, 2, 3, 4] as const).map((n) => ({ n, text: stemOf(id, n) }));
}
