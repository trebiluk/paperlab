export type LineKind = "cut" | "fold" | "construction" | "tab" | "dimension";

export const LINE_TYPES: {
  id: LineKind;
  name: string;
  alsoCalled: string;
  look: string;
  use: string;
}[] = [
  {
    id: "cut",
    name: "Outline",
    alsoCalled: "cutting line",
    look: "Thick, continuous",
    use: "The edge of the development. Cut along this line with scissors.",
  },
  {
    id: "fold",
    name: "Fold line",
    alsoCalled: "crease / bend",
    look: "Thin, dashed",
    use: "A shared edge. Valley-fold toward you. Do not cut. Dash-dot would be a mountain (away from you).",
  },
  {
    id: "construction",
    name: "Construction line",
    alsoCalled: "layout line",
    look: "Thin, faint, continuous",
    use: "Used to mark the grid while you draw. Erase or ignore it when you cut.",
  },
  {
    id: "tab",
    name: "Glue tab",
    alsoCalled: "lap / flap",
    look: "Tapered outline, lettered, labeled GLUE",
    use: "A flap that tucks inside a matching face. Glue the tab, not the face.",
  },
  {
    id: "dimension",
    name: "Dimension line",
    alsoCalled: "size line",
    look: "Thin line with arrows and a measurement",
    use: "True size of an edge. On this cube every edge is the same length.",
  },
];

export const OTHER_CONVENTIONS = [
  {
    name: "Hidden detail",
    look: "Thin, dashed",
    use: "An edge you cannot see on a 3-D view. A development is already unfolded, so it has none.",
  },
  {
    name: "Centre line",
    look: "Chain — long dash, short dash, long dash",
    use: "Marks an axis of symmetry. A cube development is not a 3-D view, so skip it here.",
  },
];

export type TabId =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "back-left"
  | "back-right";

export type DestEdge = "north" | "south" | "west" | "east";

export const TABS: {
  id: TabId;
  mark: string;
  host: "top" | "bottom" | "back";
  side: "left" | "right";
  gluesTo: string;
  destFace: "left" | "right";
  destEdge: DestEdge;
  why: string;
}[] = [
  {
    id: "top-left",
    mark: "A",
    host: "top",
    side: "left",
    gluesTo: "Left face, top edge",
    destFace: "left",
    destEdge: "north",
    why: "Top and Left do not share an edge on the net.",
  },
  {
    id: "top-right",
    mark: "B",
    host: "top",
    side: "right",
    gluesTo: "Right face, top edge",
    destFace: "right",
    destEdge: "north",
    why: "Top and Right meet only after folding.",
  },
  {
    id: "bottom-left",
    mark: "C",
    host: "bottom",
    side: "left",
    gluesTo: "Left face, bottom edge",
    destFace: "left",
    destEdge: "south",
    why: "The left arm of the cross does not reach Bottom.",
  },
  {
    id: "bottom-right",
    mark: "D",
    host: "bottom",
    side: "right",
    gluesTo: "Right face, bottom edge",
    destFace: "right",
    destEdge: "south",
    why: "Same idea on the other side.",
  },
  {
    id: "back-left",
    mark: "E",
    host: "back",
    side: "left",
    gluesTo: "Left face, back edge",
    destFace: "left",
    destEdge: "west",
    why: "Back is on the stem; Left is on an arm.",
  },
  {
    id: "back-right",
    mark: "F",
    host: "back",
    side: "right",
    gluesTo: "Right face, back edge",
    destFace: "right",
    destEdge: "east",
    why: "Closes the last side wall.",
  },
];

export const CLOSING_SEAM = {
  mark: "G",
  a: "Top, outer edge",
  b: "Back, outer edge",
  note: "A cube has 12 edges. The Latin cross already joins 5. Six tabs cover six more. The last seam — Top meeting Back — has no leftover square, so it is a closing glue line with matching letter G and no tab.",
};

export const TAB_RULES = [
  {
    title: "One tab per glue seam",
    body: "A cube has 12 edges. The Latin cross already joins 5. That leaves 7 seams. We draw 6 tabs in the leftover squares of the 3 × 4 grid. The last seam — Top meeting Back — is the closing joint: letter G, no tab.",
  },
  {
    title: "Letter the matches",
    body: "Each tab gets a letter (A–F). The same letter sits on the edge it will glue to. After you cut, the letters tell you which flap tucks where.",
  },
  {
    title: "Never on a fold line",
    body: "If two squares already share an edge, that edge is a fold, not a glue seam. A tab there would stack two thicknesses on a hinge.",
  },
  {
    title: "Taper the sides",
    body: "Each tab is a trapezoid, narrower at the free end, so it tucks inside the matching face without peeking out the corners. Glue the tab, fold it in.",
  },
];

export const CONVENTION_QUIZ: {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  explain: string;
}[] = [
  {
    id: "q1",
    prompt: "The thick continuous line around the development is the…",
    options: [
      { id: "cut", label: "Cutting / outline" },
      { id: "fold", label: "Fold line" },
      { id: "dim", label: "Dimension line" },
    ],
    answer: "cut",
    explain: "Thick continuous = cut. Scissors stay on this line and nowhere else.",
  },
  {
    id: "q2",
    prompt: "Dashed lines between two squares mean…",
    options: [
      { id: "cut", label: "Cut them apart" },
      { id: "fold", label: "Fold, do not cut" },
      { id: "glue", label: "Put glue on the line" },
    ],
    answer: "fold",
    explain: "A dashed interior edge is a fold. Cutting it turns the development into separate squares.",
  },
  {
    id: "q3",
    prompt: "Where do you put glue?",
    options: [
      { id: "face", label: "On the outside of each face" },
      { id: "tab", label: "On the glue tab, then fold it inside" },
      { id: "fold", label: "Along every dashed fold line" },
    ],
    answer: "tab",
    explain: "Glue lives on the tab. The tab tucks inside so the outside of the cube stays unmarked.",
  },
  {
    id: "q4",
    prompt: "A tab drawn on the shared edge of Front and Top is…",
    options: [
      { id: "ok", label: "Correct — extra glue helps" },
      { id: "bad", label: "Wrong — that edge is already a fold" },
      { id: "dim", label: "A dimension line" },
    ],
    answer: "bad",
    explain: "Front and Top already share an edge on the net. That is a fold line. Tabs go only on free edges.",
  },
];
