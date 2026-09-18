/** Shared marks for development drawings: hatch, badges, dimension pills. */

export function DrawingDefs({
  uid,
  s,
}: {
  uid: string;
  s: number;
}) {
  const pitch = Math.max(s * 0.05, 4);
  return (
    <defs>
      <pattern
        id={`${uid}-hatch`}
        width={pitch}
        height={pitch}
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(42)"
      >
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={pitch}
          stroke="var(--color-moss)"
          strokeWidth={Math.max(s * 0.007, 0.7)}
        />
      </pattern>
      <filter
        id={`${uid}-shadow`}
        x="-8%"
        y="-8%"
        width="116%"
        height="116%"
      >
        <feDropShadow
          dx={0}
          dy={s * 0.014}
          stdDeviation={s * 0.02}
          floodColor="rgb(28 25 21)"
          floodOpacity={0.16}
        />
      </filter>
    </defs>
  );
}

export function hatchUrl(uid: string) {
  return `url(#${uid}-hatch)`;
}

export function shadowUrl(uid: string) {
  return `url(#${uid}-shadow)`;
}

export function LetterBadge({
  x,
  y,
  r,
  letter,
  tone = "tab",
}: {
  x: number;
  y: number;
  r: number;
  letter: string;
  tone?: "tab" | "dest" | "close";
}) {
  const filled = tone === "tab";
  const square = tone === "close";
  return (
    <g>
      {square ? (
        <rect
          x={x - r}
          y={y - r}
          width={r * 2}
          height={r * 2}
          rx={r * 0.28}
          fill="var(--color-surface)"
          stroke="var(--color-ink)"
          strokeWidth={r * 0.14}
        />
      ) : (
        <circle
          cx={x}
          cy={y}
          r={r}
          fill={filled ? "var(--color-pine)" : "var(--color-surface)"}
          stroke={filled ? "var(--color-pine)" : "var(--color-ink)"}
          strokeWidth={r * 0.14}
        />
      )}
      <text
        x={x}
        y={y + r * 0.38}
        textAnchor="middle"
        fontSize={r * 1.15}
        fill={filled ? "var(--color-pine-fg)" : "var(--color-ink)"}
        fontFamily="Figtree, sans-serif"
        fontWeight={700}
      >
        {letter}
      </text>
    </g>
  );
}

export function DimBadge({
  x,
  y,
  text,
  fontSize,
}: {
  x: number;
  y: number;
  text: string;
  fontSize: number;
}) {
  const w = Math.max(text.length * fontSize * 0.62, fontSize * 4.2);
  const h = fontSize * 1.65;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h * 0.72}
        width={w}
        height={h}
        rx={h * 0.28}
        fill="var(--color-surface-2)"
        stroke="var(--color-line)"
        strokeWidth={fontSize * 0.06}
      />
      <text
        x={x}
        y={y + fontSize * 0.32}
        textAnchor="middle"
        fontSize={fontSize}
        fill="var(--color-ink)"
        fontFamily="Figtree, sans-serif"
        fontWeight={600}
      >
        {text}
      </text>
    </g>
  );
}

/** Unicode fractions become ASCII so they stay readable at small SVG sizes. */
export function svgMeasure(label: string) {
  return label
    .replaceAll("⅛", " 1/8")
    .replaceAll("¼", " 1/4")
    .replaceAll("⅜", " 3/8")
    .replaceAll("½", " 1/2")
    .replaceAll("⅝", " 5/8")
    .replaceAll("¾", " 3/4")
    .replaceAll("⅞", " 7/8")
    .replace(/\s+/g, " ")
    .trim();
}
