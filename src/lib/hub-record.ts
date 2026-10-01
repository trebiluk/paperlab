import { APP_VERSION } from "@/lib/brand";

export type MakeRecord = {
  v: 2;
  app: "paperlab";
  version: string;
  event: "make";
  level: string;
  score: number;
  max: number;
  stars: number;
  xp: number;
  skill: "paper-engineering";
  ms: number;
};

type WhoRecord = {
  record?: (row: MakeRecord) => void;
};

function who(): WhoRecord | undefined {
  if (typeof window === "undefined") return undefined;
  const kw = (window as Window & { KulibertWho?: WhoRecord }).KulibertWho;
  return kw;
}

/** Hub owns the row. No call unless KulibertWho.record exists. */
export function recordMake(input: { level: string; score: number; max: number; stars: number; xp: number; ms: number }) {
  const kw = who();
  if (!kw || typeof kw.record !== "function") return;
  const stars = Math.min(3, Math.max(1, input.stars));
  kw.record({
    v: 2,
    app: "paperlab",
    version: APP_VERSION,
    event: "make",
    level: input.level,
    score: input.score,
    max: input.max,
    stars,
    xp: input.xp,
    skill: "paper-engineering",
    ms: Math.max(0, input.ms),
  });
  window.dispatchEvent(new Event("pl-gold"));
}

/** Gold from hub rows when they exist. Null means use the Chromebook cache. */
export function goldFromRecords(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = JSON.parse(window.localStorage.getItem("kw-records-v1") || "null") as unknown;
    const rows = Array.isArray(raw)
      ? raw
      : raw && typeof raw === "object" && Array.isArray((raw as { rows?: unknown }).rows)
        ? (raw as { rows: unknown[] }).rows
        : [];
    const byLevel = new Map<string, number>();
    for (const row of rows) {
      if (!row || typeof row !== "object") continue;
      const rec = row as Partial<MakeRecord>;
      if (rec.v !== 2 || rec.app !== "paperlab" || rec.event !== "make") continue;
      if (typeof rec.level !== "string") continue;
      byLevel.set(rec.level, Number(rec.xp) || 0);
    }
    if (byLevel.size === 0) return null;
    let total = 0;
    for (const xp of byLevel.values()) total += xp;
    return total;
  } catch {
    return null;
  }
}
