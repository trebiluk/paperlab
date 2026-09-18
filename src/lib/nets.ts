/** The 11 free hexominoes that fold into a cube, plus decoys for the quiz. */

export type NetId = string;

export type Hexomino = {
  id: NetId;
  name: string;
  cells: [number, number][];
  valid: boolean;
  note: string;
};

export const CUBE_NETS: Hexomino[] = [
  {
    id: "cross",
    name: "Latin cross",
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
      [1, 3],
    ],
    valid: true,
    note: "The classroom classic — four in a column, arms on the second square. This is the net you build.",
  },
  {
    id: "t4",
    name: "T-bar",
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [1, 1],
      [1, 2],
    ],
    valid: true,
    note: "A bar of four with a stem of two hanging from the second square.",
  },
  {
    id: "t3",
    name: "Wide T",
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    valid: true,
    note: "A bar of three with a stem of three from the middle square.",
  },
  {
    id: "ell",
    name: "Long L",
    cells: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 3],
      [2, 3],
    ],
    valid: true,
    note: "Four in a column, then two more turning the corner at the end.",
  },
  {
    id: "z14",
    name: "Z skew",
    cells: [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
    ],
    valid: true,
    note: "Tabs on opposite ends of a four-strip, on opposite sides.",
  },
  {
    id: "s23",
    name: "S skew",
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [2, 2],
    ],
    valid: true,
    note: "Tabs on the two middle squares of a four-strip, on opposite sides.",
  },
  {
    id: "z24",
    name: "Offset Z",
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
    ],
    valid: true,
    note: "One tab on the second square, one on the far end, opposite sides.",
  },
  {
    id: "skew12",
    name: "Short skew",
    cells: [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
    ],
    valid: true,
    note: "Tabs on the first and second squares, opposite sides of the strip.",
  },
  {
    id: "stair",
    name: "Staircase",
    cells: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2],
      [3, 2],
    ],
    valid: true,
    note: "Three pairs of squares, each pair shifted by one. No four-in-a-row.",
  },
  {
    id: "spairs",
    name: "Stepped L",
    cells: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    valid: true,
    note: "An L whose corner is offset — a two-square step, then a three-stem.",
  },
  {
    id: "branch",
    name: "Branch",
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
      [3, 2],
    ],
    valid: true,
    note: "A three-bar with one square above the middle and two stepping off the end.",
  },
];

export const INVALID_NETS: Hexomino[] = [
  {
    id: "six-row",
    name: "Six in a row",
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
    valid: false,
    note: "Five or six squares in a line cannot wrap a cube — the last faces pile onto the first.",
  },
  {
    id: "rect",
    name: "2 × 3 rectangle",
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    valid: false,
    note: "A solid rectangle looks promising, but the end faces collide when you fold them up.",
  },
  {
    id: "block",
    name: "2 × 2 block",
    cells: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
      [1, 2],
    ],
    valid: false,
    note: "A 2 × 2 block of squares never appears in a cube net — those four faces cannot meet that way.",
  },
  {
    id: "wide-u",
    name: "Wide U",
    cells: [
      [0, 0],
      [3, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    valid: false,
    note: "The two end tabs fold onto the same face of the cube.",
  },
];

export const QUIZ: Hexomino[] = [
  CUBE_NETS[0],
  INVALID_NETS[0],
  CUBE_NETS[1],
  INVALID_NETS[1],
  CUBE_NETS[8],
  INVALID_NETS[2],
];

export function netBounds(cells: [number, number][]) {
  const xs = cells.map((c) => c[0]);
  const ys = cells.map((c) => c[1]);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    cols: Math.max(...xs) - Math.min(...xs) + 1,
    rows: Math.max(...ys) - Math.min(...ys) + 1,
  };
}

export const FACE_META = [
  { id: "top", label: "Top", fill: "var(--color-face-top)" },
  { id: "left", label: "Left", fill: "var(--color-face-left)" },
  { id: "front", label: "Front", fill: "var(--color-face-front)" },
  { id: "right", label: "Right", fill: "var(--color-face-right)" },
  { id: "bottom", label: "Bottom", fill: "var(--color-face-bottom)" },
  { id: "back", label: "Back", fill: "var(--color-face-back)" },
] as const;
