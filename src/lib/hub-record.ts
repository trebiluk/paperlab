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

type WhoApi = {
  record?: (row: MakeRecord) => unknown;
  mark?: (appId: string, line: string) => unknown;
};

function who(): WhoApi | undefined {
  if (typeof window === "undefined") return undefined;
  const kw = (window as Window & { KulibertWho?: WhoApi }).KulibertWho;
  return kw;
}

/** One finish. Prefer the v2 record. Fall back to a short mark if record is missing. */
export function recordMake(input: { level: string; score: number; max: number; stars: number; xp: number; ms: number }) {
  const kw = who();
  if (!kw) return;
  const stars = Math.min(3, Math.max(0, Math.round(input.stars)));
  if (typeof kw.record === "function") {
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
  } else if (typeof kw.mark === "function") {
    const line = `${input.level} ${input.score}/${input.max}`.slice(0, 32);
    kw.mark("paperlab", line);
  }
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
