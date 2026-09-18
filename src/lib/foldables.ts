import { PAPERS, formatMeasure, type PaperId, type PaperSpec } from "./paper";

export type FoldableId =
  | "cube"
  | "tetrahedron"
  | "pyramid"
  | "prism"
  | "cylinder"
  | "cone";

export type Foldable = {
  id: FoldableId;
  name: string;
  family: string;
  blurb: string;
  faces: number;
  edges: number;
  vertices: number;
  tabs: number;
  polyhedron: boolean;
  sa: string;
  volume: string;
  steps: { title: string; body: string }[];
  tip: string;
};

export const FOLDABLE_IDS: FoldableId[] = [
  "cube",
  "tetrahedron",
  "pyramid",
  "prism",
  "cylinder",
  "cone",
];

export const FOLDABLES: Record<FoldableId, Foldable> = {
  cube: {
    id: "cube",
    name: "Cube",
    family: "Platonic solid · hexahedron",
    blurb:
      "The main event. Six squares, six tabs, and a cube you can bounce on your desk.",
    faces: 6,
    edges: 12,
    vertices: 8,
    tabs: 6,
    polyhedron: true,
    sa: "6s²",
    volume: "s³",
    steps: [],
    tip: "Use the full Build and Draw lessons for the cube.",
  },
  tetrahedron: {
    id: "tetrahedron",
    name: "Tetrahedron",
    family: "Platonic solid · triangular pyramid",
    blurb:
      "Four equilateral triangles. Fold the three corners up — they meet at a point. Smallest Platonic solid.",
    faces: 4,
    edges: 6,
    vertices: 4,
    tabs: 2,
    polyhedron: true,
    sa: "√3 e²",
    volume: "e³ / (6√2)",
    steps: [
      {
        title: "Draw four triangles",
        body: "Light construction: one large equilateral triangle, then connect the midpoints. You now have four small equilateral triangles — three pointing the same way as the large one, one inverted in the middle.",
      },
      {
        title: "Add two tabs",
        body: "Two glue tabs on two outer edges. The third outer edge is the closing joint (letter C). Fold lines are the three midlines — dashed, do not cut.",
      },
      {
        title: "Cut the outline",
        body: "Thick continuous line around the large triangle and the two tabs. Leave the dashed midlines.",
      },
      {
        title: "Fold and glue",
        body: "Fold the three outer triangles up. Glue tab A, then B. Close C with a thin glue line. Four faces, six edges, four vertices.",
      },
    ],
    tip: "Crease sharply. A floppy tetrahedron is usually an under-creased midline.",
  },
  pyramid: {
    id: "pyramid",
    name: "Square pyramid",
    family: "Johnson solid J1 · equilateral faces",
    blurb:
      "A square floor and four triangular walls. The plus-shaped net stands up into a roof.",
    faces: 5,
    edges: 8,
    vertices: 5,
    tabs: 3,
    polyhedron: true,
    sa: "a² (1 + √3)",
    volume: "a³ / (3√2)",
    steps: [
      {
        title: "Square in the middle",
        body: "Draw the square base. On each side, draw an equilateral triangle. The net looks like a plus.",
      },
      {
        title: "Three tabs",
        body: "Tabs go on three of the four triangle-to-triangle seams. The fourth seam is the closer (letter D). Do not tab a triangle-to-square edge — those are folds.",
      },
      {
        title: "Cut and pre-fold",
        body: "Cut the outline. Valley-fold every dashed line: the four base hinges and the three tab hinges.",
      },
      {
        title: "Stand the roof",
        body: "Bring the four triangles up. Glue A, B, then C. Close D. The apex is one point where four triangles meet.",
      },
    ],
    tip: "Hold the apex pinched while the first tab sets, or the roof twists.",
  },
  prism: {
    id: "prism",
    name: "Triangular prism",
    family: "Prism · equilateral ends",
    blurb:
      "A triangular house. Wrap three equal walls, then cap both ends.",
    faces: 5,
    edges: 9,
    vertices: 6,
    tabs: 4,
    polyhedron: true,
    sa: "√3/2 e² + 3eℓ",
    volume: "√3/4 e² ℓ",
    steps: [
      {
        title: "Three rectangles in a row",
        body: "The walls are three equal rectangles side by side. That strip wraps into a triangular tube.",
      },
      {
        title: "Caps",
        body: "An equilateral triangle on the top of the middle rectangle, and one on the bottom. Those are the two ends.",
      },
      {
        title: "Four tabs",
        body: "One tab closes the tube (the free short edge of the strip). Two tabs on one triangle, one tab on the other. The last triangle edge is closer E. Never tab a fold.",
      },
      {
        title: "Tube first, then caps",
        body: "Glue the wall into a triangular tube. Fold the triangles on as lids. Count: 5 faces, 9 edges, 6 vertices.",
      },
    ],
    tip: "Keep the three wall rectangles the same width or the triangles will not sit flush.",
  },
  cylinder: {
    id: "cylinder",
    name: "Cylinder",
    family: "Solid of revolution · right circular",
    blurb:
      "Roll the rectangle into a tube, then glue on the lids. The circles sit on the long edges.",
    faces: 3,
    edges: 2,
    vertices: 0,
    tabs: 1,
    polyhedron: false,
    sa: "2πr² + 2πrh",
    volume: "πr²h",
    steps: [
      {
        title: "Rectangle first",
        body: "The long side of the rectangle is the circumference (πd). The short side is the height of the cylinder. One tab on a short edge closes the tube.",
      },
      {
        title: "Two circles",
        body: "Each circle has diameter d. They sit fully outside the long edges of the rectangle so the tangent is the fold that joins cap to wall.",
      },
      {
        title: "Cut, roll, cap",
        body: "Cut the outline. Roll the rectangle into a tube and glue the side tab. Glue each circle onto a rim from the inside — no extra tabs on the caps.",
      },
    ],
    tip: "A paper towel tube is a cylinder with no tabs — this one has them so Grade 6 can read the development.",
  },
  cone: {
    id: "cone",
    name: "Cone",
    family: "Solid of revolution · right circular",
    blurb:
      "A slice of pie that becomes a point. Glue the base onto the rim — party hat, then a floor.",
    faces: 2,
    edges: 1,
    vertices: 1,
    tabs: 2,
    polyhedron: false,
    sa: "πr² + πrℓ",
    volume: "⅓ πr²h",
    steps: [
      {
        title: "Sector",
        body: "The slant height ℓ is the sector radius. The arc is 2πr. Sector angle = 360° × (r / ℓ). One tab on a radius closes the cone.",
      },
      {
        title: "Base circle",
        body: "A circle of radius r. Its circumference matches the sector’s arc. A small tab joins it to the rim.",
      },
      {
        title: "Roll, then cap",
        body: "Join the two radii of the sector — that makes the apex. Glue the base onto the rim from inside. One curved edge, one apex.",
      },
    ],
    tip: "If the base will not sit, the sector arc is not equal to 2πr. Recheck the angle.",
  },
};

export function isFoldableId(value: string): value is FoldableId {
  return (FOLDABLE_IDS as string[]).includes(value);
}

export const SHAPE_IDS = FOLDABLE_IDS.filter(
  (id): id is Exclude<FoldableId, "cube"> => id !== "cube",
);

export function foldableNeighbors(id: FoldableId) {
  const i = SHAPE_IDS.indexOf(id as (typeof SHAPE_IDS)[number]);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: SHAPE_IDS[(i + SHAPE_IDS.length - 1) % SHAPE_IDS.length],
    next: SHAPE_IDS[(i + 1) % SHAPE_IDS.length],
  };
}

export function formatLen(n: number, spec: PaperSpec) {
  return formatMeasure(n, spec.unit);
}

/** Designed sizes so the development, with tabs, fits the selected sheet. */
export function foldableSize(id: FoldableId, paper: PaperId) {
  const spec = PAPERS[paper];
  const S = spec.short;
  const L = spec.long;
  const SQRT3 = Math.sqrt(3);

  if (id === "cube") {
    return {
      primary: spec.square,
      primaryLabel: spec.squareLabel,
      secondary: spec.square,
      secondaryLabel: spec.squareLabel,
      notes: `Face ${spec.squareLabel}`,
    };
  }
  if (id === "tetrahedron") {
    const e = Math.min(S / 2.42, L / 2.05);
    return {
      primary: e,
      primaryLabel: formatLen(e, spec),
      secondary: e,
      secondaryLabel: formatLen(e, spec),
      notes: `Edge ${formatLen(e, spec)}`,
    };
  }
  if (id === "pyramid") {
    const a = Math.min(S, L) / 3.05;
    return {
      primary: a,
      primaryLabel: formatLen(a, spec),
      secondary: a,
      secondaryLabel: formatLen(a, spec),
      notes: `Base edge ${formatLen(a, spec)}`,
    };
  }
  if (id === "prism") {
    const e = (S * 0.9) / 3.25;
    const len = L - e * SQRT3 - S * 0.12;
    return {
      primary: e,
      primaryLabel: formatLen(e, spec),
      secondary: len,
      secondaryLabel: formatLen(len, spec),
      notes: `End ${formatLen(e, spec)} · length ${formatLen(len, spec)}`,
    };
  }
  if (id === "cylinder") {
    const d = (S * 0.86) / Math.PI;
    const h = L - 2 * d - S * 0.1;
    return {
      primary: d,
      primaryLabel: formatLen(d, spec),
      secondary: h,
      secondaryLabel: formatLen(h, spec),
      notes: `Diameter ${formatLen(d, spec)} · height ${formatLen(h, spec)}`,
    };
  }
  const slant = Math.min(S * 0.48, L * 0.42);
  const r = slant * 0.4;
  return {
    primary: r,
    primaryLabel: formatLen(r, spec),
    secondary: slant,
    secondaryLabel: formatLen(slant, spec),
    notes: `Base radius ${formatLen(r, spec)} · slant ${formatLen(slant, spec)}`,
  };
}
