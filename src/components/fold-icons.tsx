import { cn } from "@/lib/utils";

export const FOLD_SYMBOLS = [
  "valley",
  "mountain",
  "cut",
  "fold-unfold",
  "turn-over",
  "push",
  "repeat",
  "do-not-cut",
] as const;

export type FoldSymbol = (typeof FOLD_SYMBOLS)[number];

const COPY_KEY: Record<FoldSymbol, string> = {
  valley: "valley",
  mountain: "mountain",
  cut: "cutName",
  "fold-unfold": "foldUnfold",
  "turn-over": "turnOver",
  push: "push",
  repeat: "repeat",
  "do-not-cut": "doNot",
};

export function symbolCopyKey(id: FoldSymbol) {
  return COPY_KEY[id];
}

export function symbolsFor(visual: string): FoldSymbol[] {
  const id = visual.toLowerCase();
  const out: FoldSymbol[] = [];
  const add = (s: FoldSymbol) => {
    if (!out.includes(s)) out.push(s);
  };
  if (/valley|scrap-flat|dashed|diag|books|box-plus|box-star|square-cut|hat-half|cup-triangle/.test(id)) add("valley");
  if (/mountain|away|narrow|neck|tail|head|collapse/.test(id)) add("mountain");
  if (/cut|scissor|square-cut|pinwheel-cut|petal/.test(id) && !/do-not/.test(id)) add("cut");
  if (/unfold|fold-unfold|open|diag|kite-marks/.test(id)) add("fold-unfold");
  if (/turn|over|back|petal-back|books/.test(id)) add("turn-over");
  if (/push|sink|pinch|tuck|puff|pocket|balloon-up|collapse|neck|head|tail/.test(id)) add("push");
  if (/repeat|other|both|wings|pinwheel-fold|iterate/.test(id)) add("repeat");
  if (/dashed|do-not|stop|quiz|match/.test(id)) add("do-not-cut");
  if (out.length === 0) add("valley");
  return out.slice(0, 4);
}

export function FoldIcon({ id, className }: { id: FoldSymbol; className?: string }) {
  const common = { fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      {id === "valley" ? (
        <path d="M4 22 L16 10 L28 22" stroke="var(--step-accent, #0f766e)" strokeWidth="2.4" strokeDasharray="5 3" {...common} />
      ) : null}
      {id === "mountain" ? (
        <path d="M4 12 L16 24 L28 12" stroke="var(--step-accent, #0e7490)" strokeWidth="2.4" strokeDasharray="7 2 1.5 2" {...common} />
      ) : null}
      {id === "cut" ? (
        <g {...common}>
          <path d="M4 16 H22" stroke="#1c1915" strokeWidth="3" />
          <path d="M20 8 L28 16 L20 24" stroke="#1c1915" strokeWidth="2" />
        </g>
      ) : null}
      {id === "fold-unfold" ? (
        <path d="M6 16 H20 M20 16 L15 11 M20 16 L15 21 M26 10 V22 M26 10 L22 14 M26 10 L30 14" stroke="var(--step-accent, #0f766e)" strokeWidth="2.2" {...common} />
      ) : null}
      {id === "turn-over" ? (
        <path d="M8 20 A10 10 0 1 1 24 12 M24 12 L20 8 M24 12 L28 8" stroke="var(--step-accent, #0e7490)" strokeWidth="2.2" {...common} />
      ) : null}
      {id === "push" ? (
        <path d="M6 16 H22 M22 16 L16 10 M22 16 L16 22" stroke="#1c1915" strokeWidth="2.2" {...common} />
      ) : null}
      {id === "repeat" ? (
        <path d="M10 10 H22 V16 M22 10 L18 6 M22 10 L26 6 M22 22 H10 V16 M10 22 L14 26 M10 22 L6 26" stroke="var(--step-accent, #c2410c)" strokeWidth="2.2" {...common} />
      ) : null}
      {id === "do-not-cut" ? (
        <g {...common}>
          <path d="M6 20 H26" stroke="#1c1915" strokeWidth="2.4" strokeDasharray="4 3" />
          <path d="M8 8 L24 24" stroke="#8f3d32" strokeWidth="2.4" />
        </g>
      ) : null}
    </svg>
  );
}

export function SymbolStrip({
  symbols,
  labelFor,
  onOpen,
}: {
  symbols: FoldSymbol[];
  labelFor: (id: FoldSymbol) => string;
  onOpen: (id: FoldSymbol) => void;
}) {
  return (
    <div className="flex max-h-14 gap-1 overflow-x-auto" data-symbol-strip>
      {symbols.map((id) => (
        <button
          key={id}
          type="button"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center gap-1 px-1 text-sm font-medium text-ink"
          onClick={() => onOpen(id)}
        >
          <FoldIcon id={id} />
          <span className="whitespace-nowrap">{labelFor(id)}</span>
        </button>
      ))}
    </div>
  );
}
