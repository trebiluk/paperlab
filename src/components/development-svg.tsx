import { useId } from "react";
import {
  CLOSING_SEAM,
  TABS,
  type LineKind,
  type TabId,
} from "@/lib/conventions";
import { PAPERS, sheetLayout, type PaperId } from "@/lib/paper";
import { cn } from "@/lib/utils";
import {
  DimBadge,
  DrawingDefs,
  hatchUrl,
  LetterBadge,
  shadowUrl,
  svgMeasure,
} from "@/components/drawing-marks";

const TAB_TAPER = 0.3;

const FACES = [
  { id: "top", c: 1, r: 0, label: "Top", fill: "var(--color-face-top)" },
  { id: "left", c: 0, r: 1, label: "Left", fill: "var(--color-face-left)" },
  { id: "front", c: 1, r: 1, label: "Front", fill: "var(--color-face-front)" },
  { id: "right", c: 2, r: 1, label: "Right", fill: "var(--color-face-right)" },
  { id: "bottom", c: 1, r: 2, label: "Bottom", fill: "var(--color-face-bottom)" },
  { id: "back", c: 1, r: 3, label: "Back", fill: "var(--color-face-back)" },
] as const;

const FOLDS: [number, number, number, number][] = [
  [1, 1, 2, 1],
  [1, 1, 1, 2],
  [2, 1, 2, 2],
  [1, 2, 2, 2],
  [1, 3, 2, 3],
];

const DEST_CELL = { left: { c: 0, r: 1 }, right: { c: 2, r: 1 } } as const;

function hostCell(host: "top" | "bottom" | "back") {
  if (host === "top") return { c: 1, r: 0 };
  if (host === "bottom") return { c: 1, r: 2 };
  return { c: 1, r: 3 };
}

function tabTrapezoid(
  x: number,
  y: number,
  s: number,
  side: "left" | "right",
  h: number,
  inset: number,
) {
  const f = h * TAB_TAPER;
  if (side === "left") {
    return `${x},${y + inset} ${x - h},${y + inset + f} ${x - h},${y + s - inset - f} ${x},${y + s - inset}`;
  }
  return `${x + s},${y + inset} ${x + s + h},${y + inset + f} ${x + s + h},${y + s - inset - f} ${x + s},${y + s - inset}`;
}

function destGeometry(
  originX: number,
  originY: number,
  s: number,
  tab: (typeof TABS)[number],
) {
  const cell = DEST_CELL[tab.destFace];
  const x = originX + cell.c * s;
  const y = originY + cell.r * s;
  const m = s * 0.16;
  if (tab.destEdge === "north") {
    return { x1: x + s * 0.12, y1: y, x2: x + s * 0.88, y2: y, tx: x + s / 2, ty: y + m };
  }
  if (tab.destEdge === "south") {
    return {
      x1: x + s * 0.12,
      y1: y + s,
      x2: x + s * 0.88,
      y2: y + s,
      tx: x + s / 2,
      ty: y + s - m,
    };
  }
  if (tab.destEdge === "west") {
    return { x1: x, y1: y + s * 0.12, x2: x, y2: y + s * 0.88, tx: x + m, ty: y + s / 2 };
  }
  return {
    x1: x + s,
    y1: y + s * 0.12,
    x2: x + s,
    y2: y + s * 0.88,
    tx: x + s - m,
    ty: y + s / 2,
  };
}

function outlineD(
  originX: number,
  originY: number,
  s: number,
  h: number,
  inset: number,
  tabs: Set<TabId>,
) {
  const X = (c: number) => originX + c * s;
  const Y = (r: number) => originY + r * s;
  const f = h * TAB_TAPER;

  const p: string[] = [];
  p.push(`M ${X(1)},${Y(0)}`);
  p.push(`L ${X(2)},${Y(0)}`);
  if (tabs.has("top-right")) {
    const x = X(1);
    const y = Y(0);
    p.push(
      `L ${x + s},${y + inset} L ${x + s + h},${y + inset + f} L ${x + s + h},${y + s - inset - f} L ${x + s},${y + s - inset}`,
    );
  }
  p.push(`L ${X(2)},${Y(1)}`);
  p.push(`L ${X(3)},${Y(1)}`);
  p.push(`L ${X(3)},${Y(2)}`);
  p.push(`L ${X(2)},${Y(2)}`);
  if (tabs.has("bottom-right")) {
    const x = X(1);
    const y = Y(2);
    p.push(
      `L ${x + s},${y + inset} L ${x + s + h},${y + inset + f} L ${x + s + h},${y + s - inset - f} L ${x + s},${y + s - inset}`,
    );
  }
  p.push(`L ${X(2)},${Y(3)}`);
  if (tabs.has("back-right")) {
    const x = X(1);
    const y = Y(3);
    p.push(
      `L ${x + s},${y + inset} L ${x + s + h},${y + inset + f} L ${x + s + h},${y + s - inset - f} L ${x + s},${y + s - inset}`,
    );
  }
  p.push(`L ${X(2)},${Y(4)}`);
  p.push(`L ${X(1)},${Y(4)}`);
  if (tabs.has("back-left")) {
    const x = X(1);
    const y = Y(3);
    p.push(
      `L ${x},${y + s - inset} L ${x - h},${y + s - inset - f} L ${x - h},${y + inset + f} L ${x},${y + inset}`,
    );
  }
  p.push(`L ${X(1)},${Y(3)}`);
  if (tabs.has("bottom-left")) {
    const x = X(1);
    const y = Y(2);
    p.push(
      `L ${x},${y + s - inset} L ${x - h},${y + s - inset - f} L ${x - h},${y + inset + f} L ${x},${y + inset}`,
    );
  }
  p.push(`L ${X(1)},${Y(2)}`);
  p.push(`L ${X(0)},${Y(2)}`);
  p.push(`L ${X(0)},${Y(1)}`);
  p.push(`L ${X(1)},${Y(1)}`);
  if (tabs.has("top-left")) {
    const x = X(1);
    const y = Y(0);
    p.push(
      `L ${x},${y + s - inset} L ${x - h},${y + s - inset - f} L ${x - h},${y + inset + f} L ${x},${y + inset}`,
    );
  }
  p.push(`L ${X(1)},${Y(0)}`);
  p.push("Z");
  return p.join(" ");
}

export type DevelopmentLayers = {
  construction?: boolean;
  folds?: boolean;
  tabs?: boolean;
  labels?: boolean;
  dimensions?: boolean;
  glueMarks?: boolean;
  matchMarks?: boolean;
};

export function DevelopmentSvg({
  paper = "letter",
  layers = {
    construction: true,
    folds: true,
    tabs: true,
    labels: true,
    dimensions: false,
    glueMarks: true,
    matchMarks: true,
  },
  highlight,
  activeTabs,
  selectedTab,
  onSelectTab,
  showSheet = true,
  crop = "net",
  className,
}: {
  paper?: PaperId;
  layers?: DevelopmentLayers;
  highlight?: LineKind | null;
  activeTabs?: TabId[];
  selectedTab?: TabId | null;
  onSelectTab?: (id: TabId) => void;
  showSheet?: boolean;
  crop?: "net" | "sheet";
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const spec = PAPERS[paper];
  const {
    W,
    H,
    s,
    originX,
    originY,
    cutWidth,
    foldWidth,
    gridWidth,
    hair,
    dash,
    font,
    small,
    mark: markSize,
  } = sheetLayout(spec);
  const tabH = s * 0.2;
  const inset = s * 0.12;
  const tabs = new Set(activeTabs ?? TABS.map((t) => t.id));
  const dim = highlight;
  const badgeR = markSize * 0.92;

  const fade = (kind: LineKind) => {
    if (!dim) return 1;
    return dim === kind ? 1 : 0.18;
  };

  const visibleTabs = TABS.filter((t) => tabs.has(t.id));

  const pad = s * 0.1;
  const dimPad = layers.dimensions ? s * 0.32 : s * 0.06;
  const viewBox =
    crop === "sheet"
      ? `0 0 ${W} ${H}`
      : `${originX - pad} ${originY - pad} ${3 * s + pad * 2} ${4 * s + pad + dimPad}`;
  const dimBelow = crop !== "sheet" || originY + 4 * s + s * 0.3 < H;
  const dimY = dimBelow ? originY + 4 * s + s * 0.14 : originY + 2 * s - s * 0.18;

  return (
    <svg
      viewBox={viewBox}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Cube development drawing with glue tabs"
      shapeRendering="geometricPrecision"
    >
      <DrawingDefs uid={uid} s={s} />
      {showSheet ? (
        <rect
          x={crop === "sheet" ? 0 : originX - pad}
          y={crop === "sheet" ? 0 : originY - pad}
          width={crop === "sheet" ? W : 3 * s + pad * 2}
          height={crop === "sheet" ? H : 4 * s + pad + dimPad}
          fill="var(--color-surface-2)"
          filter={shadowUrl(uid)}
        />
      ) : null}

      {layers.construction ? (
        <g opacity={fade("construction")}>
          {Array.from({ length: 5 }).map((_, r) => (
            <line
              key={`h${r}`}
              x1={originX}
              y1={originY + r * s}
              x2={originX + 3 * s}
              y2={originY + r * s}
              stroke="var(--color-crease)"
              strokeWidth={gridWidth}
            />
          ))}
          {Array.from({ length: 4 }).map((_, c) => (
            <line
              key={`v${c}`}
              x1={originX + c * s}
              y1={originY}
              x2={originX + c * s}
              y2={originY + 4 * s}
              stroke="var(--color-crease)"
              strokeWidth={gridWidth}
            />
          ))}
        </g>
      ) : null}

      {FACES.map((face) => (
        <rect
          key={face.id}
          x={originX + face.c * s}
          y={originY + face.r * s}
          width={s}
          height={s}
          fill={layers.labels ? face.fill : "var(--color-paper)"}
        />
      ))}

      {layers.tabs
        ? visibleTabs.map((t) => {
            const cell = hostCell(t.host);
            const x = originX + cell.c * s;
            const y = originY + cell.r * s;
            const pts = tabTrapezoid(x, y, s, t.side, tabH, inset);
            const selected = selectedTab === t.id;
            return (
              <g key={t.id} opacity={fade("tab")}>
                <polygon
                  points={pts}
                  fill="color-mix(in oklab, var(--color-face-front) 55%, white)"
                  stroke={selected ? "var(--color-pine)" : "none"}
                  strokeWidth={selected ? cutWidth : 0}
                  className={onSelectTab ? "cursor-pointer" : undefined}
                  onClick={() => onSelectTab?.(t.id)}
                />
                {layers.glueMarks ? (
                  <polygon
                    points={pts}
                    fill={hatchUrl(uid)}
                    opacity={0.85}
                    pointerEvents="none"
                  />
                ) : null}
              </g>
            );
          })
        : null}

      {layers.folds ? (
        <g opacity={fade("fold")}>
          {FOLDS.map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={originX + x1 * s}
              y1={originY + y1 * s}
              x2={originX + x2 * s}
              y2={originY + y2 * s}
              stroke="var(--color-ink-soft)"
              strokeWidth={foldWidth * 1.25}
              strokeDasharray={dash}
              strokeLinecap="round"
            />
          ))}
          {layers.tabs
            ? visibleTabs.map((t) => {
                const cell = hostCell(t.host);
                const x = originX + cell.c * s;
                const y = originY + cell.r * s;
                const x1 = t.side === "left" ? x : x + s;
                return (
                  <line
                    key={`tf-${t.id}`}
                    x1={x1}
                    y1={y + inset}
                    x2={x1}
                    y2={y + s - inset}
                    stroke="var(--color-ink-soft)"
                    strokeWidth={foldWidth * 1.25}
                    strokeDasharray={dash}
                    strokeLinecap="round"
                  />
                );
              })
            : null}
        </g>
      ) : null}

      <path
        d={outlineD(originX, originY, s, tabH, inset, layers.tabs ? tabs : new Set())}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={cutWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={fade("cut")}
      />

      {layers.labels
        ? FACES.map((face) => (
            <text
              key={`l-${face.id}`}
              x={originX + face.c * s + s / 2}
              y={
                originY +
                face.r * s +
                s / 2 +
                font * 0.35 +
                (face.id === "front" && layers.dimensions && !dimBelow ? -font * 0.7 : 0)
              }
              textAnchor="middle"
              fontSize={font * 0.92}
              fill="var(--color-ink-soft)"
              fontFamily="Figtree, sans-serif"
              fontWeight={600}
            >
              {face.label}
            </text>
          ))
        : null}

      {layers.tabs && layers.matchMarks
        ? visibleTabs.map((t) => {
            const geo = destGeometry(originX, originY, s, t);
            const selected = selectedTab === t.id;
            const cell = hostCell(t.host);
            const x = originX + cell.c * s;
            const y = originY + cell.r * s;
            const mx = t.side === "left" ? x - tabH * 0.5 : x + s + tabH * 0.5;
            const my = y + s * 0.22;
            return (
              <g key={`mk-${t.id}`} opacity={fade("tab")}>
                {selected ? (
                  <line
                    x1={geo.x1}
                    y1={geo.y1}
                    x2={geo.x2}
                    y2={geo.y2}
                    stroke="var(--color-pine)"
                    strokeWidth={cutWidth}
                    strokeLinecap="round"
                  />
                ) : null}
                <LetterBadge x={geo.tx} y={geo.ty} r={badgeR} letter={t.mark} tone="dest" />
                <LetterBadge x={mx} y={my} r={badgeR} letter={t.mark} tone="tab" />
              </g>
            );
          })
        : null}

      {layers.matchMarks ? (
        <g opacity={highlight && highlight !== "tab" ? 0.18 : 1}>
          <LetterBadge
            x={originX + 1.5 * s}
            y={originY + s * 0.16}
            r={badgeR}
            letter={CLOSING_SEAM.mark}
            tone="close"
          />
          <LetterBadge
            x={originX + 1.5 * s}
            y={originY + 4 * s - s * 0.16}
            r={badgeR}
            letter={CLOSING_SEAM.mark}
            tone="close"
          />
        </g>
      ) : null}

      {layers.dimensions ? (
        <g opacity={fade("dimension")}>
          <line
            x1={originX + s + s * 0.08}
            y1={dimY}
            x2={originX + 2 * s - s * 0.08}
            y2={dimY}
            stroke="var(--color-ink)"
            strokeWidth={foldWidth * 1.1}
            strokeLinecap="butt"
          />
          <polygon
            points={`${originX + s + s * 0.08},${dimY} ${originX + s + s * 0.08 + small * 0.7},${dimY - small * 0.38} ${originX + s + s * 0.08 + small * 0.7},${dimY + small * 0.38}`}
            fill="var(--color-ink)"
          />
          <polygon
            points={`${originX + 2 * s - s * 0.08},${dimY} ${originX + 2 * s - s * 0.08 - small * 0.7},${dimY - small * 0.38} ${originX + 2 * s - s * 0.08 - small * 0.7},${dimY + small * 0.38}`}
            fill="var(--color-ink)"
          />
          <DimBadge
            x={originX + 1.5 * s}
            y={dimY}
            text={svgMeasure(spec.squareLabel)}
            fontSize={small * 1.15}
          />
        </g>
      ) : null}

      {onSelectTab
        ? TABS.map((t) => {
            const cell = hostCell(t.host);
            const x = originX + cell.c * s;
            const y = originY + cell.r * s;
            return (
              <rect
                key={`hit-${t.id}`}
                x={t.side === "left" ? x - tabH - 4 : x + s - 4}
                y={y}
                width={tabH + 8}
                height={s}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onSelectTab(t.id)}
              >
                <title>
                  Tab {t.mark}: {t.gluesTo}
                </title>
              </rect>
            );
          })
        : null}
    </svg>
  );
}

export function LineSample({ kind }: { kind: LineKind | "hidden" | "centre" }) {
  const w = 160;
  const h = 36;
  if (kind === "cut") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
        <line
          x1="8"
          y1="18"
          x2="152"
          y2="18"
          stroke="var(--color-ink)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "fold") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
        <line
          x1="8"
          y1="18"
          x2="152"
          y2="18"
          stroke="var(--color-ink-soft)"
          strokeWidth="1.8"
          strokeDasharray="10 7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "construction") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
        <line x1="8" y1="18" x2="152" y2="18" stroke="var(--color-crease)" strokeWidth="1" />
      </svg>
    );
  }
  if (kind === "tab") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
        <defs>
          <pattern id="sample-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(42)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-moss)" strokeWidth="1.2" />
          </pattern>
        </defs>
        <polygon
          points="20,6 140,10 140,26 20,30"
          fill="color-mix(in oklab, var(--color-face-front) 55%, white)"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <polygon points="20,6 140,10 140,26 20,30" fill="url(#sample-hatch)" opacity="0.85" />
      </svg>
    );
  }
  if (kind === "hidden") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
        <line
          x1="8"
          y1="18"
          x2="152"
          y2="18"
          stroke="var(--color-ink-soft)"
          strokeWidth="1.4"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "centre") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
        <line
          x1="8"
          y1="18"
          x2="152"
          y2="18"
          stroke="var(--color-ink-soft)"
          strokeWidth="1.3"
          strokeDasharray="18 5 4 5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
      <line x1="16" y1="18" x2="144" y2="18" stroke="var(--color-ink)" strokeWidth="1.2" />
      <polygon points="16,18 24,14 24,22" fill="var(--color-ink)" />
      <polygon points="144,18 136,14 136,22" fill="var(--color-ink)" />
      <rect x="58" y="8" width="44" height="20" rx="6" fill="var(--color-surface-2)" stroke="var(--color-line)" />
      <text x="80" y="22" textAnchor="middle" fontSize="11" fill="var(--color-ink)" fontFamily="Figtree, sans-serif" fontWeight={600}>
        2 3/4
      </text>
    </svg>
  );
}
