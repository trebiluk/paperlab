export type PaperId = "letter" | "legal" | "b" | "a3" | "a4";

export const DEFAULT_PAPER: PaperId = "letter";

export const PAPER_IDS: PaperId[] = ["letter", "legal", "b", "a3", "a4"];

export function isPaperId(value: string): value is PaperId {
  return (PAPER_IDS as string[]).includes(value);
}

export type PaperSpec = {
  id: PaperId;
  name: string;
  shortName: string;
  /** Short edge, in the paper's native unit */
  short: number;
  /** Long edge */
  long: number;
  unit: "in" | "cm";
  unitLabel: string;
  /** Cube face size that fits a 4×3 Latin-cross net */
  square: number;
  squareLabel: string;
  shortLabel: string;
  longLabel: string;
  sheetLabel: string;
  /** How the square is marked */
  foldAxis: "long" | "short";
  foldHint: string;
  gridBody: string;
  gridTip: string;
  sidesBody: string;
  sideMarginLabel: string;
  leftoverLabel: string;
  limitNote: string;
  svgW: number;
  svgH: number;
};

export const PAPERS: Record<PaperId, PaperSpec> = {
  b: {
    id: "b",
    name: "ANSI B",
    shortName: "B",
    short: 11,
    long: 17,
    unit: "in",
    unitLabel: "in",
    square: 3.5,
    squareLabel: "3½ in",
    shortLabel: "11 in",
    longLabel: "17 in",
    sheetLabel: "11 × 17 in",
    foldAxis: "short",
    foldHint:
      "Bring a ruler with quarter-inch marks. The square is 3½ in — the largest quarter-inch size that fits three across the 11-inch side.",
    gridBody:
      "Along the short 11-inch side, mark 3½ in, 7 in, and 10½ in from the left. Leave the leftover ½ in on the right. Then mark 3½ in, 7 in, 10½ in, and 14 in down the long side. You will have 3 in left at the bottom.",
    gridTip:
      "Line the ruler up with the left edge. Quarter-inch ticks are the short marks between the whole inches. Press each pencil mark so it stays.",
    sidesBody:
      "Copy the 3½-inch square three times across (they take 10½ in, leaving ½ in on the right) and four times down. Lightly pencil the grid. You should see twelve squares, with 3 in leftover at the bottom for the title block.",
    sideMarginLabel: "½ in on the right",
    leftoverLabel: "3 in at the bottom",
    limitNote:
      "11 ÷ 3 is a bit more than 3½ in, and 17 ÷ 4 = 4¼ in. We take the smaller one and round down to a quarter inch you can mark, so the face is 3½ in. Three of them take 10½ in across; four take 14 in down.",
    svgW: 1100,
    svgH: 1700,
  },
  letter: {
    id: "letter",
    name: "US Letter",
    shortName: "Letter",
    short: 8.5,
    long: 11,
    unit: "in",
    unitLabel: "in",
    square: 2.75,
    squareLabel: "2¾ in",
    shortLabel: "8½ in",
    longLabel: "11 in",
    sheetLabel: "8½ × 11 in",
    foldAxis: "long",
    foldHint:
      "Fold the 11-inch side in half, then fold each half in half again. Unfold — you have four equal 2¾-inch bands.",
    gridBody:
      "Fold the 11-inch side in half, bringing the top edge to the bottom. Crease, unfold. Fold the top edge to the center crease, and the bottom edge to the center crease. Unfold. You now have four equal 2¾-inch bands running across the page.",
    gridTip:
      "Press creases with a fingernail so they stay visible after you unfold. These creases are your grid. No ruler required.",
    sidesBody:
      "Each band is 2¾ inches tall — that is your square. At the bottom-left, fold the left edge inward so the corner sits on the first horizontal crease and the bottom edge stays lined up with itself. The new vertical crease is 2¾ inches from the left. Unfold. Repeat from the right edge. You now have a 3 × 4 grid of squares, with a ⅛-inch sliver of margin on each side.",
    sideMarginLabel: "⅛ in",
    leftoverLabel: "a ⅛-inch sliver on each long side",
    limitNote:
      "11 ÷ 4 = 2¾ in, and 8½ ÷ 3 is a hair more than 2¾ in. The smaller number wins, so the face is 2¾ in.",
    svgW: 850,
    svgH: 1100,
  },
  legal: {
    id: "legal",
    name: "US Legal",
    shortName: "Legal",
    short: 8.5,
    long: 14,
    unit: "in",
    unitLabel: "in",
    square: 2.75,
    squareLabel: "2¾ in",
    shortLabel: "8½ in",
    longLabel: "14 in",
    sheetLabel: "8½ × 14 in",
    foldAxis: "short",
    foldHint:
      "Bring a ruler with quarter-inch marks. The square is 2¾ in — the same size as on letter paper, and the largest quarter-inch size that fits three across the 8½-inch side.",
    gridBody:
      "Along the short 8½-inch side, mark 2¾ in, 5½ in, and 8¼ in from the left. Leave the leftover ¼ in on the right. Then mark 2¾ in, 5½ in, 8¼ in, and 11 in down the long side. You will have 3 in left at the bottom.",
    gridTip:
      "Line the ruler up with the left edge. Quarter-inch ticks are the short marks between the whole inches. Press each pencil mark so it stays.",
    sidesBody:
      "Copy the 2¾-inch square three times across (they take 8¼ in, leaving ¼ in on the right) and four times down. Lightly pencil the grid. You should see twelve squares, with 3 in leftover at the bottom for the title block.",
    sideMarginLabel: "¼ in on the right",
    leftoverLabel: "3 in at the bottom",
    limitNote:
      "8½ ÷ 3 is a hair more than 2¾ in, and 14 ÷ 4 = 3½ in. We take the smaller one and round down to a quarter inch you can mark, so the face is 2¾ in. Three of them take 8¼ in across; four take 11 in down.",
    svgW: 850,
    svgH: 1400,
  },
  a3: {
    id: "a3",
    name: "A3",
    shortName: "A3",
    short: 29.7,
    long: 42,
    unit: "cm",
    unitLabel: "cm",
    square: 9.9,
    squareLabel: "9.9 cm",
    shortLabel: "29.7 cm",
    longLabel: "42 cm",
    sheetLabel: "297 × 420 mm",
    foldAxis: "short",
    foldHint:
      "The short side is exactly three 9.9 cm squares. Mark 9.9 cm along the short edge, then copy that square four times down the long side.",
    gridBody:
      "Along the short 29.7 cm side, the paper is exactly three 9.9 cm squares. Mark 9.9 cm, 19.8 cm, and 29.7 cm across the top. Then mark 9.9 cm, 19.8 cm, 29.7 cm, and 39.6 cm down the long side. You will have 2.4 cm left at the bottom.",
    gridTip:
      "A3 is twice A4. If you have no long ruler, fold an A4 sheet as a 21 cm gauge and mark 9.9 cm from a 10 cm guess, then check.",
    sidesBody:
      "Copy the 9.9 cm square three times across (they fill the 29.7 cm width exactly) and four times down. Lightly pencil the grid. You should see twelve 9.9 cm squares, with 2.4 cm leftover at the top or bottom.",
    sideMarginLabel: "0",
    leftoverLabel: "2.4 cm at the top or bottom",
    limitNote:
      "29.7 ÷ 3 = 9.9 cm, and 42 ÷ 4 = 10.5 cm. The smaller number wins, so the face is 9.9 cm.",
    svgW: 297,
    svgH: 420,
  },
  a4: {
    id: "a4",
    name: "A4",
    shortName: "A4",
    short: 21,
    long: 29.7,
    unit: "cm",
    unitLabel: "cm",
    square: 7,
    squareLabel: "7 cm",
    shortLabel: "21 cm",
    longLabel: "29.7 cm",
    sheetLabel: "210 × 297 mm",
    foldAxis: "short",
    foldHint:
      "The short side is exactly three 7 cm squares. Mark 7 cm along the short edge, then copy that square four times down the long side.",
    gridBody:
      "Along the short 21 cm side, the paper is exactly three 7 cm squares. Mark 7 cm, 14 cm, and 21 cm across the top. Then mark 7 cm, 14 cm, 21 cm, and 28 cm down the long side. You will have 8.5 mm left at the bottom.",
    gridTip:
      "If you have no ruler, fold a 7 cm gauge: the short side is 21 cm, so folding it in thirds is the same square. Thirds are fiddly — a ruler is kinder on A4.",
    sidesBody:
      "Copy the 7 cm square three times across (they fill the 21 cm width exactly) and four times down. Lightly pencil the grid. You should see twelve 7 cm squares, with a small leftover strip at the top or bottom.",
    sideMarginLabel: "0",
    leftoverLabel: "8.5 mm at the top and bottom",
    limitNote:
      "21 ÷ 3 = 7 cm, and 29.7 ÷ 4 ≈ 7.4 cm. The smaller number wins, so the face is 7 cm.",
    svgW: 210,
    svgH: 297,
  },
};

export function sheetLayout(spec: PaperSpec) {
  const W = spec.svgW;
  const H = spec.svgH;
  const s = spec.square * (W / spec.short);
  // Ruler papers start at the left edge so ticks are easy to mark.
  // Letter is folded from both long sides, so the grid sits in the middle.
  const originX = spec.foldAxis === "long" ? (W - 3 * s) / 2 : 0;
  const originY = 0;
  return {
    W,
    H,
    s,
    originX,
    originY,
    cutWidth: s * 0.012,
    foldWidth: s * 0.006,
    gridWidth: s * 0.0036,
    hair: s * 0.0044,
    dash: `${s * 0.044} ${s * 0.029}`,
    font: s * 0.095,
    small: s * 0.058,
    mark: s * 0.073,
    title: s * 0.15,
  };
}

export function surfaceArea(square: number) {
  return 6 * square * square;
}

export function volume(square: number) {
  return square * square * square;
}

const INCH_FRAC: [number, string][] = [
  [0, ""],
  [0.125, "⅛"],
  [0.25, "¼"],
  [0.375, "⅜"],
  [0.5, "½"],
  [0.625, "⅝"],
  [0.75, "¾"],
  [0.875, "⅞"],
];

/** Format an inch length with Grade-6 fractions (quarters and eighths). */
export function formatInch(n: number) {
  for (let whole = 0; whole <= 20; whole++) {
    for (const [frac, glyph] of INCH_FRAC) {
      if (Math.abs(n - whole - frac) < 0.001) {
        if (frac === 0) return `${whole} in`;
        if (whole === 0) return `${glyph} in`;
        return `${whole}${glyph} in`;
      }
    }
  }
  return `${Number(n.toFixed(2))} in`;
}

export function formatMeasure(n: number, unit: "in" | "cm", digits = 2) {
  if (unit === "in") return formatInch(n);
  return `${Number(n.toFixed(digits))} cm`;
}

export function formatArea(n: number, unit: "in" | "cm") {
  return `${n.toFixed(1)} ${unit}²`;
}

export function formatVolume(n: number, unit: "in" | "cm") {
  return `${n.toFixed(1)} ${unit}³`;
}

/** Square cut from a rectangle: short edge becomes the side. */
export function origamiSquare(spec: PaperSpec) {
  const leftover = spec.long - spec.short;
  return {
    edge: spec.short,
    leftover,
    edgeLabel: spec.shortLabel,
    leftoverLabel: formatMeasure(leftover, spec.unit),
  };
}
