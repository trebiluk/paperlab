import { useId } from "react";
import { netBounds, type Hexomino } from "@/lib/nets";
import { PAPERS, sheetLayout, type PaperId } from "@/lib/paper";
import { cn } from "@/lib/utils";
import { DimBadge, DrawingDefs, grainUrl, shadowUrl, svgMeasure } from "@/components/drawing-marks";

const FILLS = [
  "var(--color-face-front)",
  "var(--color-face-top)",
  "var(--color-face-left)",
  "var(--color-face-right)",
  "var(--color-face-bottom)",
  "var(--color-face-back)",
];

export function NetSvg({
  net,
  colored = true,
  className,
  stroke = "var(--color-ink)",
}: {
  net: Hexomino;
  colored?: boolean;
  className?: string;
  stroke?: string;
}) {
  const uid = "net";
  const { minX, minY, cols, rows } = netBounds(net.cells);
  const gap = 0.07;
  const pad = 0.22;
  const vbW = cols + pad * 2;
  const vbH = rows + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${net.name} cube net`}
    >
      <DrawingDefs uid={uid} s={1} />
      {net.cells.map(([x, y], i) => {
        const px = x - minX + pad;
        const py = y - minY + pad;
        return (
          <g key={`${x}-${y}`} filter={shadowUrl(uid)}>
            <rect
              x={px + gap / 2}
              y={py + gap / 2}
              width={1 - gap}
              height={1 - gap}
              rx={0.07}
              fill={colored ? FILLS[i % FILLS.length] : "var(--color-paper)"}
              stroke={stroke}
              strokeWidth={0.04}
              strokeLinejoin="round"
            />
            <rect
              x={px + gap / 2}
              y={py + gap / 2}
              width={1 - gap}
              height={1 - gap}
              rx={0.07}
              fill={grainUrl(uid)}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function BlankSheet({ paper = "letter" }: { paper?: PaperId }) {
  const uid = useId().replace(/:/g, "");
  const spec = PAPERS[paper];
  const { W, H, title, hair } = sheetLayout(spec);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={`${spec.name} sheet of paper`}
    >
      <DrawingDefs uid={uid} s={W / 10} />
      <rect
        x={hair * 2}
        y={hair * 2}
        width={W - hair * 4}
        height={H - hair * 4}
        fill="var(--color-surface-2)"
        stroke="var(--color-line)"
        strokeWidth={hair * 2}
        filter={shadowUrl(uid)}
      />
      <text
        x={W / 2}
        y={H / 2}
        textAnchor="middle"
        fontSize={title * 0.85}
        fill="var(--color-faint)"
        fontFamily="Figtree, sans-serif"
        fontWeight={600}
      >
        {spec.sheetLabel}
      </text>
    </svg>
  );
}

export function BandsSheet({ paper = "letter" }: { paper?: PaperId }) {
  const uid = useId().replace(/:/g, "");
  const spec = PAPERS[paper];
  const { W, H, s, originX, originY, foldWidth, dash, font, hair } = sheetLayout(spec);
  const columns = spec.foldAxis === "short";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={
        columns
          ? `Paper marked into three ${spec.squareLabel} columns`
          : "Paper folded into four equal bands"
      }
    >
      <DrawingDefs uid={uid} s={s} />
      <rect
        x={hair * 2}
        y={hair * 2}
        width={W - hair * 4}
        height={H - hair * 4}
        fill="var(--color-surface-2)"
        stroke="var(--color-line)"
        strokeWidth={hair * 2}
        filter={shadowUrl(uid)}
      />
      {columns
        ? [1, 2, 3].map((i) => (
            <line
              key={i}
              x1={originX + i * s}
              y1={originY}
              x2={originX + i * s}
              y2={originY + 4 * s}
              stroke="var(--color-pine)"
              strokeWidth={foldWidth * 1.6}
              strokeDasharray={dash}
              strokeLinecap="round"
            />
          ))
        : [1, 2, 3].map((i) => (
            <line
              key={i}
              x1={0}
              y1={originY + i * s}
              x2={W}
              y2={originY + i * s}
              stroke="var(--color-pine)"
              strokeWidth={foldWidth * 1.6}
              strokeDasharray={dash}
              strokeLinecap="round"
            />
          ))}
      <DimBadge
        x={columns ? originX + s / 2 : W / 2}
        y={originY + s / 2}
        text={svgMeasure(spec.squareLabel)}
        fontSize={font * 0.72}
      />
    </svg>
  );
}

/** Latin-cross net on a full sheet, used in build steps and print. */
export function SheetNet({
  paper = "letter",
  showDiscard = true,
  highlight,
}: {
  paper?: PaperId;
  showDiscard?: boolean;
  highlight?: "grid" | "cross" | "cut";
}) {
  const uid = useId().replace(/:/g, "");
  const spec = PAPERS[paper];
  const { W, H, s, originX: marginX, originY: marginY, font, hair } = sheetLayout(spec);

  const keep = new Set(["1,0", "0,1", "1,1", "2,1", "1,2", "1,3"]);
  const labels: Record<string, string> = {
    "1,0": "Top",
    "0,1": "Left",
    "1,1": "Front",
    "2,1": "Right",
    "1,2": "Bottom",
    "1,3": "Back",
  };
  const fills: Record<string, string> = {
    "1,0": "var(--color-face-top)",
    "0,1": "var(--color-face-left)",
    "1,1": "var(--color-face-front)",
    "2,1": "var(--color-face-right)",
    "1,2": "var(--color-face-bottom)",
    "1,3": "var(--color-face-back)",
  };

  const cells: { c: number; r: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) cells.push({ c, r });
  }

  const showLabels = highlight === "cross" || highlight === "cut" || !showDiscard;
  const pad = s * 0.08;
  const crop = !showDiscard;
  const viewBox = crop
    ? `${marginX - pad} ${marginY - pad} ${3 * s + pad * 2} ${4 * s + pad * 2}`
    : `0 0 ${W} ${H}`;

  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      role="img"
      aria-label="Printer paper with a Latin-cross cube net"
    >
      <DrawingDefs uid={uid} s={s} />
      <rect
        x={crop ? marginX - pad : hair}
        y={crop ? marginY - pad : hair}
        width={crop ? 3 * s + pad * 2 : W - hair * 2}
        height={crop ? 4 * s + pad * 2 : H - hair * 2}
        fill="var(--color-surface-2)"
        stroke="var(--color-line)"
        strokeWidth={hair}
        filter={shadowUrl(uid)}
      />
      {cells.map(({ c, r }) => {
        const key = `${c},${r}`;
        const isKeep = keep.has(key);
        if (!isKeep && !showDiscard) return null;
        const x = marginX + c * s;
        const y = marginY + r * s;
        const faded = highlight === "cut" && !isKeep;
        const gridOnly = highlight === "grid";
        return (
          <g key={key}>
            <rect
              x={x}
              y={y}
              width={s}
              height={s}
              fill={
                isKeep && !gridOnly
                  ? fills[key]
                  : faded
                    ? "transparent"
                    : "color-mix(in oklab, var(--color-bg-warm) 55%, white)"
              }
              stroke={isKeep && !gridOnly ? "var(--color-ink)" : "var(--color-crease)"}
              strokeWidth={isKeep && !gridOnly ? hair * 4 : hair * 2}
              strokeDasharray={isKeep && !gridOnly ? undefined : dashFrom(s)}
              strokeLinejoin="round"
              opacity={faded ? 0.18 : 1}
            />
            {isKeep && showLabels && !gridOnly ? (
              <text
                x={x + s / 2}
                y={y + s / 2 + font * 0.35}
                textAnchor="middle"
                fontSize={font * 0.92}
                fill="var(--color-ink-soft)"
                fontFamily="Figtree, sans-serif"
                fontWeight={600}
              >
                {labels[key]}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function dashFrom(s: number) {
  return `${s * 0.022} ${s * 0.018}`;
}
