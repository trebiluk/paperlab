import type { PaperSpec } from "./paper";
import { origamiSquare } from "./paper";

export type BuildStep = {
  id: string;
  title: string;
  minutes: string;
  body: (paper: PaperSpec) => string;
  tip?: (paper: PaperSpec) => string;
  visual: "materials" | "orient" | "fourths" | "sides" | "cross" | "tabs" | "cut" | "fold" | "tape";
};

export const BUILD_STEPS: BuildStep[] = [
  {
    id: "materials",
    title: "Gather materials",
    minutes: "2 min",
    visual: "materials",
    body: (p) =>
      `You need one sheet of ${p.name} paper (${p.sheetLabel}), a pencil, scissors, and a glue stick (or tape). ${p.foldHint}`,
    tip: () =>
      "Work on a clear desk. Put your name in one corner of the paper now, in tiny letters, so it survives on the inside of the cube.",
  },
  {
    id: "orient",
    title: "Orient the sheet",
    minutes: "1 min",
    visual: "orient",
    body: (p) =>
      `Place the paper portrait — short edge ${p.shortLabel} across, long edge ${p.longLabel} up and down. You are going to cut a Latin-cross net of six ${p.squareLabel} squares. That is the biggest cube that fits on one sheet.`,
    tip: (p) =>
      `The leftover is only ${p.leftoverLabel}. Almost the whole sheet becomes the cube.`,
  },
  {
    id: "fourths",
    title: "Mark the square",
    minutes: "4 min",
    visual: "fourths",
    body: (p) => p.gridBody,
    tip: (p) => p.gridTip,
  },
  {
    id: "sides",
    title: "Copy the square to the sides",
    minutes: "4 min",
    visual: "sides",
    body: (p) => p.sidesBody,
    tip: () =>
      "If a crease goes crooked, unfold and try again. A square that is a little off still makes a cube — it just will not sit quite as flat.",
  },
  {
    id: "cross",
    title: "Draw the Latin cross",
    minutes: "3 min",
    visual: "cross",
    body: () =>
      "On your 3 × 4 grid, keep these six squares and put a light X on the ones you will throw away: keep the entire center column (all four squares). Keep the left and right squares of the second row from the top. That is a Latin cross — the net that folds into a cube without any faces overlapping.",
    tip: () =>
      "Color the six keepers now if you want a rainbow cube. Front, back, left, right, top, and bottom each get a face. Do not color the squares you will cut away.",
  },
  {
    id: "tabs",
    title: "Add glue tabs",
    minutes: "4 min",
    visual: "tabs",
    body: () =>
      "A development needs tabs so faces can glue together. Draw six tapered flaps in the leftover squares of the grid: left and right of Top, left and right of Bottom, left and right of Back. Each tab is a trapezoid about one-fifth as deep as a face, narrower at the free end. Letter them A–F, and copy each letter onto the edge it will glue to. Do not put a tab on a fold line — those edges already join two squares.",
    tip: () =>
      "Six tabs cover six glue seams. The seventh seam is Top meeting Back — letter G on both outer edges, a closing joint with no tab, because there is no leftover square there.",
  },
  {
    id: "cut",
    title: "Cut the outline",
    minutes: "4 min",
    visual: "cut",
    body: () =>
      "Cut on the thick continuous outline only — around the six faces and the six tabs. Do not cut dashed fold lines, including the hinge where each tab meets its face. Those dashed lines stay.",
    tip: () =>
      "Turn the paper as you cut rather than turning the scissors. Slow cuts on the inner corners keep the squares truly square.",
  },
  {
    id: "fold",
    title: "Fold every dashed line",
    minutes: "3 min",
    visual: "fold",
    body: () =>
      "Valley-fold (fold toward you) along every dashed line: the five hinges between faces, and the six tab hinges. Crease sharply, then unfold so the development lies flat again. Pre-folding makes the cube snap into shape instead of fighting you. A dashed line on a development is always this valley move.",
    tip: () =>
      "A ruler laid on the line, with the paper folded up against it, gives a cleaner edge than folding in the air.",
  },
  {
    id: "tape",
    title: "Glue the tabs inside",
    minutes: "6 min",
    visual: "tape",
    body: () =>
      "Stand the four-square column so it becomes four walls. Fold the left and right arms in. Put glue on a tab — not on the face — fold the tab inside, and press. Work seam by seam. The last joint is Top to Back: a thin glue line, no tab. Count when you are done: 6 faces, 12 edges, 8 corners.",
    tip: () =>
      "Hold two faces flush before you stick. If you glue everything at the end, corners drift. Wipe stray glue so it does not seal a hinge shut.",
  },
];

export type OrigamiStep = {
  id: string;
  title: string;
  minutes: string;
  body: (paper: PaperSpec) => string;
  tip?: (paper: PaperSpec) => string;
  visual:
    | "orient"
    | "fold-corner"
    | "cut-strip"
    | "square"
    | "books"
    | "diagonals"
    | "base"
    | "pockets"
    | "inflate";
};

export const ORIGAMI_STEPS: OrigamiStep[] = [
  {
    id: "orient",
    title: "Start with a rectangle",
    minutes: "1 min",
    visual: "orient",
    body: (p) =>
      `Origami wants a square. Printer paper is a rectangle — ${p.sheetLabel}. Place it portrait: short edge ${p.shortLabel} across the bottom, long edge ${p.longLabel} up. You are going to turn this into a ${p.shortLabel} square by folding, then cutting one leftover strip.`,
    tip: () =>
      "This is the same move for every origami model, not just the cube. Once you can cut a square, you can fold cranes, boats, and balloons.",
  },
  {
    id: "fold-corner",
    title: "Fold a short edge onto a long edge",
    minutes: "3 min",
    visual: "fold-corner",
    body: (p) =>
      `Take the bottom-right corner and fold it up so the bottom short edge (${p.shortLabel}) lies exactly along the left long edge. The fold is a 45-degree crease. Press it hard. You now have a right triangle of two layers, and a leftover rectangle at the top.`,
    tip: () =>
      "Line the edges up before you crease. If they miss, unfold and try again — a square with a crooked crease will fight you later.",
  },
  {
    id: "cut-strip",
    title: "Cut the leftover strip",
    minutes: "2 min",
    visual: "cut-strip",
    body: (p) => {
      const o = origamiSquare(p);
      return `Keep the triangle folded. The leftover strip at the top is ${o.leftoverLabel} wide. Cut along the folded edge — the raw edge of the triangle — so the strip comes off as one piece. Do not cut the crease that is the triangle’s hypotenuse.`;
    },
    tip: (p) => {
      const o = origamiSquare(p);
      return `Save the leftover ${o.leftoverLabel} strip. It makes a bookmark, a name tag, or a ruler mark. The square you keep is ${o.edgeLabel} on every side.`;
    },
  },
  {
    id: "square",
    title: "Unfold — you have a square",
    minutes: "1 min",
    visual: "square",
    body: (p) => {
      const o = origamiSquare(p);
      return `Unfold the triangle. You are holding a ${o.edgeLabel} square with one diagonal crease. Check: all four sides match. If one side is a hair long, trim it. This square is the only paper the rest of the model uses.`;
    },
    tip: () =>
      "Put the leftover strip aside. From here on, every fold is on this square. No tape. No glue.",
  },
  {
    id: "books",
    title: "Valley book folds",
    minutes: "2 min",
    visual: "books",
    body: () =>
      "Valley-fold the square in half, edge to edge (fold toward you). Unfold. Valley-fold in half the other way. Unfold. You have a plus through the center — two valley creases that cross.",
    tip: () =>
      "Crease with a fingernail so the plus stays visible. These are the walls of the cube.",
  },
  {
    id: "diagonals",
    title: "Flip, then mountain diagonals",
    minutes: "2 min",
    visual: "diagonals",
    body: () =>
      "Turn the paper over. Mountain-fold both diagonals, corner to corner, and unfold (fold away from you). The crease pattern is a star: a plus of valleys on one side and an X of mountains on the other. That mix is what makes the next collapse work.",
    tip: () =>
      "If you fold the diagonals on the same side as the plus, the waterbomb will not collapse. Flip first.",
  },
  {
    id: "base",
    title: "Collapse the waterbomb base",
    minutes: "3 min",
    visual: "base",
    body: () =>
      "Collapse: pinch the midpoints of the four sides and let the paper fall into a triangle — two layers, a point at the top, a raw edge at the bottom. This is the waterbomb base. Flatten it. Do not force one crease at a time.",
    tip: () =>
      "Pinch the two side corners and push toward the center. The paper should fall into the triangle on its own if the creases are sharp.",
  },
  {
    id: "pockets",
    title: "Corners up, then tuck the pockets",
    minutes: "6 min",
    visual: "pockets",
    body: () =>
      "On the front, fold the left and right corners of the triangle up to the top point. You now have a diamond. Flip over and repeat. Next, fold the left and right points of the diamond into the center line. Fold the top triangular flaps down and tuck them into the little pockets you just made. Flip, repeat.",
    tip: () =>
      "The tuck is the lock. If a flap sits on top of a pocket instead of inside it, the cube will blow open. Peek in the pocket before you crease.",
  },
  {
    id: "inflate",
    title: "Inflate the cube",
    minutes: "2 min",
    visual: "inflate",
    body: (p) => {
      const o = origamiSquare(p);
      return `Find the small hole at one end. Blow steadily. The model puffs into a cube about ${o.edgeLabel} on an edge — a little smaller once the layers puff. Pinch the twelve edges to square it up. No tape. That puffy cube is the origami balloon, also called the waterbomb.`;
    },
    tip: () =>
      "If it will not inflate, a pocket is not fully tucked. Flatten, retuck, try again. A slow breath works better than a hard puff.",
  },
];
