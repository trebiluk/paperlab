/** Shared shop-drawing kit for lab diagrams: grain, grid, folds, views. */

import { createContext, useContext, type ReactNode } from "react";

const FONT = "Figtree, sans-serif";

const GfxUidContext = createContext("lab");

export function GfxProvider({ uid, children }: { uid: string; children: ReactNode }) {
  return <GfxUidContext.Provider value={uid}>{children}</GfxUidContext.Provider>;
}

export function useGfxUid() {
  return useContext(GfxUidContext);
}

/** Pattern / marker urls for this diagram. Call only under GfxProvider. */
export function useGrain() {
  return `url(#${useGfxUid()}-grain)`;
}
export function useArrow() {
  return `url(#${useGfxUid()}-arrow)`;
}
export function useShadow() {
  return `url(#${useGfxUid()}-shadow)`;
}

export function LabDefs({ uid = "lab" }: { uid?: string }) {
  return (
    <defs>
      <pattern id={`${uid}-grid`} width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M 12 0 L 0 0 0 12" fill="none" stroke="var(--color-line)" strokeWidth="0.55" />
      </pattern>
      <pattern id={`${uid}-grain`} width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="1.1" cy="2.2" r="0.42" fill="var(--color-ink)" opacity="0.08" />
        <circle cx="4.8" cy="1" r="0.32" fill="var(--color-ink)" opacity="0.05" />
        <circle cx="3.4" cy="5.4" r="0.38" fill="var(--color-ink)" opacity="0.06" />
        <circle cx="6.2" cy="3.7" r="0.28" fill="var(--color-ink)" opacity="0.05" />
      </pattern>
      <linearGradient id={`${uid}-desk`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--color-surface-2)" />
        <stop offset="100%" stopColor="var(--color-bg-warm)" />
      </linearGradient>
      <filter id={`${uid}-shadow`} x="-15%" y="-12%" width="130%" height="140%">
        <feDropShadow dx="0" dy="1.8" stdDeviation="1.4" floodColor="rgb(28 25 21)" floodOpacity="0.2" />
      </filter>
      <marker
        id={`${uid}-arrow`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-pine)" />
      </marker>
    </defs>
  );
}

export function LabBackdrop({ uid }: { uid?: string }) {
  const ctx = useGfxUid();
  const id = uid ?? ctx;
  return (
    <g aria-hidden>
      <rect width="240" height="180" fill={`url(#${id}-desk)`} />
      <rect width="240" height="180" fill={`url(#${id}-grid)`} opacity="0.5" />
      <rect
        x="4"
        y="12"
        width="30"
        height="8"
        rx="1"
        fill="var(--color-tape)"
        opacity="0.88"
        transform="rotate(-16 19 16)"
      />
      <rect
        x="206"
        y="156"
        width="30"
        height="8"
        rx="1"
        fill="var(--color-tape)"
        opacity="0.88"
        transform="rotate(14 221 160)"
      />
    </g>
  );
}

export function Caption({ children, y = 170 }: { children: string; y?: number }) {
  return (
    <text
      x="120"
      y={y}
      textAnchor="middle"
      fontSize="11.5"
      fill="var(--color-ink-soft)"
      fontFamily={FONT}
      fontWeight={600}
    >
      {children}
    </text>
  );
}

export function ViewChip({
  label,
  x = 10,
  y = 12,
}: {
  label: "ISO" | "TOP" | "FRONT" | "SIDE" | "NET" | "DEV";
  x?: number;
  y?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width="34" height="13" rx="2" fill="var(--color-pine)" />
      <text
        x={x + 17}
        y={y + 10}
        textAnchor="middle"
        fontSize="8"
        fontWeight={700}
        fill="var(--color-pine-fg)"
        fontFamily={FONT}
        letterSpacing="0.4"
      >
        {label}
      </text>
    </g>
  );
}

export function PaperSheet({
  x,
  y,
  w,
  h,
  fill = "var(--color-face-front)",
  uid,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  uid?: string;
}) {
  const ctx = useGfxUid();
  const id = uid ?? ctx;
  return (
    <g filter={`url(#${id}-shadow)`}>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="var(--color-ink)" strokeWidth={2} strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-grain)`} />
    </g>
  );
}

export function PaperPoly({
  points,
  fill = "var(--color-face-front)",
  strokeWidth = 2,
  uid,
}: {
  points: string;
  fill?: string;
  strokeWidth?: number;
  uid?: string;
}) {
  const ctx = useGfxUid();
  const id = uid ?? ctx;
  return (
    <g filter={`url(#${id}-shadow)`}>
      <polygon points={points} fill={fill} stroke="var(--color-ink)" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points={points} fill={`url(#${id}-grain)`} />
    </g>
  );
}

export function Valley({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--color-pine)"
      strokeWidth={1.9}
      strokeDasharray="8 5"
      strokeLinecap="round"
    />
  );
}

export function Mountain({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--color-ink-soft)"
      strokeWidth={1.9}
      strokeDasharray="14 4 2.5 4"
      strokeLinecap="round"
    />
  );
}

export function Cut({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--color-danger)"
      strokeWidth={2.4}
      strokeLinecap="round"
    />
  );
}

export function FoldArrow({
  d,
  uid,
}: {
  d: string;
  uid?: string;
}) {
  const ctx = useGfxUid();
  const id = uid ?? ctx;
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-pine)"
      strokeWidth={2.2}
      strokeLinecap="round"
      markerEnd={`url(#${id}-arrow)`}
    />
  );
}

export function Desk({ y = 148 }: { y?: number }) {
  return (
    <g aria-hidden>
      <rect x="18" y={y} width="204" height="8" rx="1" fill="var(--color-face-right)" stroke="var(--color-ink)" strokeWidth={1.2} />
      <rect x="24" y={y + 8} width="8" height="14" fill="var(--color-toy-right)" />
      <rect x="208" y={y + 8} width="8" height="14" fill="var(--color-toy-right)" />
    </g>
  );
}

export function CrewPerson({
  cx,
  leader = false,
}: {
  cx: number;
  leader?: boolean;
}) {
  const fill = leader ? "var(--color-pine)" : "var(--color-toy-top)";
  const body = leader ? "var(--color-moss)" : "var(--color-face-front)";
  return (
    <g>
      <ellipse cx={cx} cy="132" rx="16" ry="5" fill="var(--color-ink)" opacity="0.12" />
      <circle cx={cx} cy="62" r="16" fill={fill} stroke="var(--color-ink)" strokeWidth={1.8} />
      <circle cx={cx - 5} cy="60" r="2.2" fill="var(--color-ink)" />
      <circle cx={cx + 5} cy="60" r="2.2" fill="var(--color-ink)" />
      <path d={`M${cx - 6} 68 Q${cx} 72 ${cx + 6} 68`} fill="none" stroke="var(--color-ink)" strokeWidth={1.4} />
      <rect x={cx - 18} y="80" width="36" height="42" rx="10" fill={body} stroke="var(--color-ink)" strokeWidth={1.8} />
      {leader ? (
        <g>
          <rect x={cx - 8} y="90" width="16" height="11" rx="2" fill="var(--color-pine)" />
          <text
            x={cx}
            y="99"
            textAnchor="middle"
            fontSize="8"
            fontWeight={700}
            fill="var(--color-pine-fg)"
            fontFamily={FONT}
          >
            L
          </text>
        </g>
      ) : null}
    </g>
  );
}
