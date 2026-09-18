import { PAPERS, origamiSquare, type PaperId } from "@/lib/paper";
import { cn } from "@/lib/utils";
import type { OrigamiStep } from "@/lib/steps";
import { DimBadge, svgMeasure } from "@/components/drawing-marks";

type Box = { x: number; y: number; w: number; h: number };

function layout(paper: PaperId): Box & { sq: number; strip: number } {
  const spec = PAPERS[paper];
  const pad = 22;
  const maxH = 292;
  const maxW = 196;
  const aspect = spec.short / spec.long;
  let h = maxH;
  let w = h * aspect;
  if (w > maxW) {
    w = maxW;
    h = w / aspect;
  }
  const x = (240 - w) / 2;
  const y = (320 - h) / 2;
  return { x, y, w, h, sq: w, strip: h - w };
}

function Sheet({
  box,
  fill = "var(--color-surface-2)",
}: {
  box: Box;
  fill?: string;
}) {
  return (
    <rect
      x={box.x}
      y={box.y}
      width={box.w}
      height={box.h}
      fill={fill}
      stroke="var(--color-ink)"
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  );
}

function Arrow({
  d,
}: {
  d: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-pine)"
      strokeWidth={2.4}
      strokeLinecap="round"
      markerEnd="url(#ori-arrow)"
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="ori-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-pine)" />
      </marker>
    </defs>
  );
}

export function OrigamiSvg({
  visual,
  paper = "letter",
  className,
}: {
  visual: OrigamiStep["visual"];
  paper?: PaperId;
  className?: string;
}) {
  const spec = PAPERS[paper];
  const o = origamiSquare(spec);
  const box = layout(paper);
  const { x, y, w, h, sq, strip } = box;
  const sqTop = y + strip;
  const cx = x + w / 2;
  const cy = y + h / 2;

  return (
    <svg
      viewBox="0 0 240 320"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={caption(visual, spec.shortLabel)}
      shapeRendering="geometricPrecision"
    >
      <Defs />
      {visual === "orient" ? (
        <g>
          <Sheet box={box} />
          <DimBadge
            x={cx}
            y={y + h + 14}
            text={svgMeasure(spec.shortLabel)}
            fontSize={11}
          />
          <text
            x={x - 10}
            y={cy}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-ink-soft)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
            transform={`rotate(-90 ${x - 10} ${cy})`}
          >
            {svgMeasure(spec.longLabel)}
          </text>
          <text
            x={120}
            y={18}
            textAnchor="middle"
            fontSize={13}
            fill="var(--color-pine)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            A rectangle
          </text>
        </g>
      ) : null}

      {visual === "fold-corner" ? (
        <g>
          <Sheet box={box} />
          <rect
            x={x}
            y={y}
            width={w}
            height={strip}
            fill="color-mix(in oklab, var(--color-tape) 35%, white)"
          />
          <polygon
            points={`${x},${sqTop} ${x + w},${sqTop} ${x},${y + h}`}
            fill="color-mix(in oklab, var(--color-face-front) 80%, white)"
            stroke="var(--color-ink)"
            strokeWidth={2}
          />
          <line
            x1={x}
            y1={y + h}
            x2={x + w}
            y2={sqTop}
            stroke="var(--color-pine)"
            strokeWidth={1.8}
            strokeDasharray="7 5"
            strokeLinecap="round"
          />
          <Arrow d={`M ${x + w + 10} ${y + h - 8} Q ${x + w + 36} ${sqTop + sq * 0.45} ${x + 16} ${sqTop + 18}`} />
          <text
            x={120}
            y={18}
            textAnchor="middle"
            fontSize={13}
            fill="var(--color-pine)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            Fold short onto long
          </text>
          <text
            x={cx}
            y={y + strip / 2 + 4}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-ink-soft)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            leftover
          </text>
        </g>
      ) : null}

      {visual === "cut-strip" ? (
        <g>
          <Sheet box={box} />
          <rect
            x={x}
            y={y}
            width={w}
            height={strip}
            fill="color-mix(in oklab, var(--color-tape) 40%, white)"
          />
          <polygon
            points={`${x},${sqTop} ${x + w},${sqTop} ${x},${y + h}`}
            fill="color-mix(in oklab, var(--color-face-front) 80%, white)"
          />
          <line
            x1={x}
            y1={sqTop}
            x2={x + w}
            y2={sqTop}
            stroke="var(--color-ink)"
            strokeWidth={3.4}
            strokeLinecap="round"
          />
          <line
            x1={x}
            y1={y + h}
            x2={x + w}
            y2={sqTop}
            stroke="var(--color-pine)"
            strokeWidth={1.6}
            strokeDasharray="7 5"
          />
          <text
            x={120}
            y={18}
            textAnchor="middle"
            fontSize={13}
            fill="var(--color-pine)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            Cut the strip
          </text>
          <DimBadge
            x={cx}
            y={y + strip / 2}
            text={svgMeasure(o.leftoverLabel)}
            fontSize={11}
          />
        </g>
      ) : null}

      {visual === "square" ? (
        <g>
          {(() => {
            const s = Math.min(w, 176);
            const sx = (240 - s) / 2;
            const sy = 48;
            const stripW = 28;
            return (
              <>
                <rect
                  x={sx}
                  y={sy}
                  width={s}
                  height={s}
                  fill="var(--color-face-front)"
                  stroke="var(--color-ink)"
                  strokeWidth={2.2}
                />
                <line
                  x1={sx}
                  y1={sy + s}
                  x2={sx + s}
                  y2={sy}
                  stroke="var(--color-pine)"
                  strokeWidth={1.6}
                  strokeDasharray="7 5"
                />
                <rect
                  x={sx + s + 14}
                  y={sy}
                  width={stripW}
                  height={s * (strip / h) * 1.15}
                  fill="color-mix(in oklab, var(--color-tape) 40%, white)"
                  stroke="var(--color-ink)"
                  strokeWidth={1.6}
                />
                <DimBadge x={sx + s / 2} y={sy + s + 18} text={svgMeasure(o.edgeLabel)} fontSize={12} />
                <text
                  x={sx + s + 14 + stripW / 2}
                  y={sy + s * (strip / h) * 1.15 + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fill="var(--color-ink-soft)"
                  fontFamily="Figtree, sans-serif"
                  fontWeight={600}
                >
                  strip
                </text>
                <text
                  x={120}
                  y={22}
                  textAnchor="middle"
                  fontSize={13}
                  fill="var(--color-pine)"
                  fontFamily="Figtree, sans-serif"
                  fontWeight={600}
                >
                  A square
                </text>
              </>
            );
          })()}
        </g>
      ) : null}

      {visual === "books" ? (
        <SquareCrease
          plus
          title="Valley plus"
        />
      ) : null}

      {visual === "diagonals" ? (
        <SquareCrease
          plus
          diag
          title="Flip, then the X"
        />
      ) : null}

      {visual === "base" ? (
        <g>
          <text
            x={120}
            y={22}
            textAnchor="middle"
            fontSize={13}
            fill="var(--color-pine)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            Waterbomb base
          </text>
          <polygon
            points="120,46 214,250 26,250"
            fill="var(--color-face-front)"
            stroke="var(--color-ink)"
            strokeWidth={2.2}
            strokeLinejoin="round"
          />
          <line
            x1={120}
            y1={46}
            x2={120}
            y2={250}
            stroke="var(--color-pine)"
            strokeWidth={1.7}
            strokeDasharray="7 5"
          />
          <text
            x={120}
            y={290}
            textAnchor="middle"
            fontSize={12}
            fill="var(--color-ink-soft)"
            fontFamily="Figtree, sans-serif"
          >
            Two layers · point up
          </text>
        </g>
      ) : null}

      {visual === "pockets" ? (
        <g>
          <text
            x={120}
            y={22}
            textAnchor="middle"
            fontSize={13}
            fill="var(--color-pine)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            Diamond, then tucks
          </text>
          <polygon
            points="120,44 206,160 120,276 34,160"
            fill="var(--color-face-front)"
            stroke="var(--color-ink)"
            strokeWidth={2.2}
            strokeLinejoin="round"
          />
          <line x1={120} y1={44} x2={120} y2={276} stroke="var(--color-pine)" strokeWidth={1.6} strokeDasharray="6 5" />
          <line x1={77} y1={102} x2={120} y2={160} stroke="var(--color-ink-soft)" strokeWidth={1.4} strokeDasharray="5 4" />
          <line x1={163} y1={102} x2={120} y2={160} stroke="var(--color-ink-soft)" strokeWidth={1.4} strokeDasharray="5 4" />
          <polygon
            points="120,44 148,82 120,118 92,82"
            fill="color-mix(in oklab, var(--color-toy-top) 55%, white)"
            stroke="var(--color-pine)"
            strokeWidth={1.5}
          />
          <text
            x={120}
            y={308}
            textAnchor="middle"
            fontSize={12}
            fill="var(--color-ink-soft)"
            fontFamily="Figtree, sans-serif"
          >
            Flaps tuck into pockets
          </text>
        </g>
      ) : null}

      {visual === "inflate" ? (
        <g>
          <text
            x={120}
            y={28}
            textAnchor="middle"
            fontSize={13}
            fill="var(--color-pine)"
            fontFamily="Figtree, sans-serif"
            fontWeight={600}
          >
            Blow into the hole
          </text>
          <polygon points="120,70 188,110 120,150 52,110" fill="var(--color-toy-top)" stroke="var(--color-ink)" strokeWidth="1.6" />
          <polygon points="52,110 120,150 120,230 52,190" fill="var(--color-toy-left)" stroke="var(--color-ink)" strokeWidth="1.6" />
          <polygon points="120,150 188,110 188,190 120,230" fill="var(--color-pine)" stroke="var(--color-ink)" strokeWidth="1.6" />
          <circle cx={120} cy={150} r={7} fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth={1.4} />
          <Arrow d="M 168 86 Q 200 70 186 118" />
          <text
            x={120}
            y={268}
            textAnchor="middle"
            fontSize={12}
            fill="var(--color-ink-soft)"
            fontFamily="Figtree, sans-serif"
          >
            No glue · pinch the edges
          </text>
        </g>
      ) : null}
    </svg>
  );
}

function SquareCrease({
  plus,
  diag,
  title,
}: {
  plus?: boolean;
  diag?: boolean;
  title: string;
}) {
  const s = 176;
  const x = (240 - s) / 2;
  const y = 52;
  return (
    <g>
      <text
        x={120}
        y={24}
        textAnchor="middle"
        fontSize={13}
        fill="var(--color-pine)"
        fontFamily="Figtree, sans-serif"
        fontWeight={600}
      >
        {title}
      </text>
      <rect
        x={x}
        y={y}
        width={s}
        height={s}
        fill="var(--color-face-front)"
        stroke="var(--color-ink)"
        strokeWidth={2.2}
      />
      {plus ? (
        <>
          <line x1={x + s / 2} y1={y} x2={x + s / 2} y2={y + s} stroke="var(--color-pine)" strokeWidth={1.8} strokeDasharray="8 6" />
          <line x1={x} y1={y + s / 2} x2={x + s} y2={y + s / 2} stroke="var(--color-pine)" strokeWidth={1.8} strokeDasharray="8 6" />
        </>
      ) : null}
      {diag ? (
        <>
          <line x1={x} y1={y} x2={x + s} y2={y + s} stroke="var(--color-ink-soft)" strokeWidth={1.6} strokeDasharray="4 5 12 5" />
          <line x1={x + s} y1={y} x2={x} y2={y + s} stroke="var(--color-ink-soft)" strokeWidth={1.6} strokeDasharray="4 5 12 5" />
        </>
      ) : null}
    </g>
  );
}

function caption(visual: OrigamiStep["visual"], edge: string) {
  if (visual === "orient") return "Portrait rectangle of printer paper";
  if (visual === "fold-corner") return "Fold the short edge onto the long edge";
  if (visual === "cut-strip") return "Cut off the leftover rectangle";
  if (visual === "square") return `Unfolded ${edge} square`;
  if (visual === "books") return "Square with book-fold plus creases";
  if (visual === "diagonals") return "Square with plus and diagonal creases";
  if (visual === "base") return "Waterbomb base, a two-layer triangle";
  if (visual === "pockets") return "Diamond with flaps tucked into pockets";
  return "Inflated origami balloon cube";
}
