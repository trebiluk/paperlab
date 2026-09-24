import { createContext, useContext, useId } from "react";
import type { FoldKind } from "@/lib/folds";
import { cn } from "@/lib/utils";

const FoldUid = createContext("fold");
function useFoldUid() {
  return useContext(FoldUid);
}

export function TechniqueSvg({
  id,
  className,
}: {
  id: FoldKind;
  className?: string;
}) {
  const free =
    id === "valley"
      ? "valley-fold.jpg"
      : id === "mountain"
        ? "mountain-fold.jpg"
        : id === "unfold"
          ? "fold-and-unfold.svg"
          : null;
  if (free) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}images/plans/folds/${free}`}
        alt={label(id)}
        className={cn("h-full w-full bg-white object-contain", className)}
      />
    );
  }
  const uid = useId().replace(/:/g, "");
  const marker = `${uid}-arrow`;
  return (
    <svg
      viewBox="0 0 240 180"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={label(id)}
      shapeRendering="geometricPrecision"
    >
      <FoldUid.Provider value={uid}>
        <defs>
          <pattern id={`${uid}-grain`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="2.2" r="0.4" fill="var(--color-ink)" opacity="0.07" />
            <circle cx="4.8" cy="5" r="0.3" fill="var(--color-ink)" opacity="0.05" />
          </pattern>
          <filter id={`${uid}-shadow`} x="-10%" y="-8%" width="120%" height="130%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="rgb(28 25 21)" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect width="240" height="180" fill="var(--color-bg-warm)" />
        <ArrowDef id={marker} />
        {id === "crease" ? <Crease /> : null}
        {id === "valley" ? <Valley marker={marker} /> : null}
        {id === "mountain" ? <Mountain marker={marker} /> : null}
        {id === "unfold" ? <Unfold /> : null}
        {id === "collapse" ? <Collapse marker={marker} /> : null}
        {id === "tuck" ? <Tuck marker={marker} /> : null}
      </FoldUid.Provider>
    </svg>
  );
}

export function TechniqueSample({ id }: { id: FoldKind }) {
  return (
    <svg viewBox="0 0 160 36" className="h-8 w-full" aria-hidden>
      {id === "valley" ? (
        <line
          x1="12"
          y1="18"
          x2="148"
          y2="18"
          stroke="var(--color-ink-soft)"
          strokeWidth="1.8"
          strokeDasharray="10 7"
          strokeLinecap="round"
        />
      ) : null}
      {id === "mountain" ? (
        <line
          x1="12"
          y1="18"
          x2="148"
          y2="18"
          stroke="var(--color-ink-soft)"
          strokeWidth="1.8"
          strokeDasharray="16 5 3 5"
          strokeLinecap="round"
        />
      ) : null}
      {id === "crease" ? (
        <line
          x1="12"
          y1="18"
          x2="148"
          y2="18"
          stroke="var(--color-ink)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ) : null}
      {id === "unfold" ? (
        <>
          <line x1="12" y1="18" x2="148" y2="18" stroke="var(--color-crease)" strokeWidth="1.4" />
          <circle cx="80" cy="18" r="3" fill="var(--color-pine)" />
        </>
      ) : null}
      {id === "collapse" ? (
        <>
          <line x1="80" y1="6" x2="80" y2="30" stroke="var(--color-pine)" strokeWidth="1.5" strokeDasharray="5 4" />
          <line x1="50" y1="18" x2="110" y2="18" stroke="var(--color-pine)" strokeWidth="1.5" strokeDasharray="5 4" />
          <line x1="58" y1="8" x2="102" y2="28" stroke="var(--color-ink-soft)" strokeWidth="1.2" strokeDasharray="8 3 2 3" />
          <line x1="102" y1="8" x2="58" y2="28" stroke="var(--color-ink-soft)" strokeWidth="1.2" strokeDasharray="8 3 2 3" />
        </>
      ) : null}
      {id === "tuck" ? (
        <>
          <polygon
            points="36,10 118,12 118,28 36,30"
            fill="color-mix(in oklab, var(--color-face-front) 70%, white)"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="118" y1="12" x2="118" y2="28" stroke="var(--color-pine)" strokeWidth="2" />
          <path d="M 128 20 L 112 20" fill="none" stroke="var(--color-pine)" strokeWidth="1.8" strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  );
}

function Paper({
  points,
  fill = "var(--color-face-front)",
}: {
  points: string;
  fill?: string;
}) {
  const uid = useFoldUid();
  return (
    <g filter={`url(#${uid}-shadow)`}>
      <polygon
        points={points}
        fill={fill}
        stroke="var(--color-ink)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <polygon points={points} fill={`url(#${uid}-grain)`} />
    </g>
  );
}

function Crease() {
  return (
    <g>
      <Paper points="36,40 118,40 118,150 36,150" fill="var(--color-surface-2)" />
      <Paper points="118,40 204,58 204,132 118,150" fill="var(--color-face-front)" />
      <line x1="118" y1="40" x2="118" y2="150" stroke="var(--color-ink)" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M 128 78 Q 148 96 128 114" fill="none" stroke="var(--color-pine)" strokeWidth={2.2} strokeLinecap="round" />
      <circle cx="148" cy="96" r="7" fill="var(--color-pine)" />
      <Caption y={172}>Press until it stays</Caption>
    </g>
  );
}

function Valley({ marker }: { marker: string }) {
  return (
    <g>
      <Paper points="28,58 120,42 120,138 28,154" fill="var(--color-toy-left)" />
      <Paper points="120,42 212,58 212,154 120,138" fill="var(--color-face-front)" />
      <line
        x1="120"
        y1="42"
        x2="120"
        y2="138"
        stroke="var(--color-ink-soft)"
        strokeWidth={2.2}
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      <path
        d="M 52 28 Q 120 8 188 28"
        fill="none"
        stroke="var(--color-pine)"
        strokeWidth={2}
        strokeLinecap="round"
        markerEnd={`url(#${marker})`}
      />
      <Caption y={172}>Toward you · a valley</Caption>
    </g>
  );
}

function Mountain({ marker }: { marker: string }) {
  return (
    <g>
      <Paper points="40,70 120,38 120,122 40,154" fill="var(--color-toy-left)" />
      <Paper points="120,38 200,70 200,154 120,122" fill="var(--color-pine)" />
      <line
        x1="120"
        y1="38"
        x2="120"
        y2="122"
        stroke="var(--color-ink-soft)"
        strokeWidth={2.2}
        strokeDasharray="14 5 3 5"
        strokeLinecap="round"
      />
      <path
        d="M 58 168 Q 120 148 182 168"
        fill="none"
        stroke="var(--color-pine)"
        strokeWidth={2}
        strokeLinecap="round"
        markerEnd={`url(#${marker})`}
      />
      <Caption y={24}>Away from you · a peak</Caption>
    </g>
  );
}

function Unfold() {
  return (
    <g>
      <rect
        x="42"
        y="22"
        width="156"
        height="136"
        fill="var(--color-face-front)"
        stroke="var(--color-ink)"
        strokeWidth={2}
      />
      <line
        x1="120"
        y1="22"
        x2="120"
        y2="158"
        stroke="var(--color-pine)"
        strokeWidth={2}
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="90"
        x2="198"
        y2="90"
        stroke="var(--color-pine)"
        strokeWidth={2}
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      <circle cx="120" cy="90" r="5" fill="var(--color-pine)" />
      <Caption y={172}>Open it. The lines stay.</Caption>
    </g>
  );
}

function Collapse({ marker }: { marker: string }) {
  return (
    <g>
      <rect
        x="42"
        y="18"
        width="156"
        height="148"
        fill="var(--color-face-front)"
        stroke="var(--color-ink)"
        strokeWidth={2}
      />
      <line x1="120" y1="18" x2="120" y2="166" stroke="var(--color-pine)" strokeWidth={1.8} strokeDasharray="7 5" />
      <line x1="42" y1="92" x2="198" y2="92" stroke="var(--color-pine)" strokeWidth={1.8} strokeDasharray="7 5" />
      <line
        x1="42"
        y1="18"
        x2="198"
        y2="166"
        stroke="var(--color-ink-soft)"
        strokeWidth={1.6}
        strokeDasharray="12 4 3 4"
      />
      <line
        x1="198"
        y1="18"
        x2="42"
        y2="166"
        stroke="var(--color-ink-soft)"
        strokeWidth={1.6}
        strokeDasharray="12 4 3 4"
      />
      <circle cx="120" cy="92" r="6" fill="var(--color-pine)" />
      <path
        d="M 58 40 L 104 84"
        stroke="var(--color-pine)"
        strokeWidth={1.8}
        markerEnd={`url(#${marker})`}
      />
      <path
        d="M 182 40 L 136 84"
        stroke="var(--color-pine)"
        strokeWidth={1.8}
        markerEnd={`url(#${marker})`}
      />
      <Caption y={176}>Pinch. The paper falls in.</Caption>
    </g>
  );
}

function Tuck({ marker }: { marker: string }) {
  return (
    <g>
      <polygon
        points="120,16 200,90 120,164 40,90"
        fill="var(--color-face-front)"
        stroke="var(--color-ink)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <polygon
        points="120,16 154,50 120,90 86,50"
        fill="color-mix(in oklab, var(--color-toy-top) 60%, white)"
        stroke="var(--color-pine)"
        strokeWidth={1.7}
      />
      <line
        x1="86"
        y1="50"
        x2="154"
        y2="50"
        stroke="var(--color-ink-soft)"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path
        d="M 120 8 L 120 46"
        stroke="var(--color-pine)"
        strokeWidth={2.2}
        markerEnd={`url(#${marker})`}
      />
      <Caption y={176}>Flap goes inside the pocket</Caption>
    </g>
  );
}

function Caption({ y, children }: { y: number; children: string }) {
  return (
    <text
      x="120"
      y={y}
      textAnchor="middle"
      fontSize="12"
      fill="var(--color-ink-soft)"
      fontFamily="Figtree, sans-serif"
      fontWeight={600}
    >
      {children}
    </text>
  );
}

function ArrowDef({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-pine)" />
      </marker>
    </defs>
  );
}

function label(id: FoldKind) {
  if (id === "crease") return "Pressing a sharp crease";
  if (id === "valley") return "Valley fold, paper folding toward you";
  if (id === "mountain") return "Mountain fold, paper folding away";
  if (id === "unfold") return "Fold and unfold, creases left as marks";
  if (id === "collapse") return "Collapse: valley plus and mountain X";
  return "Tuck a flap into a pocket";
}
