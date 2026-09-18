export type FoldKind =
  | "crease"
  | "valley"
  | "mountain"
  | "unfold"
  | "collapse"
  | "tuck";

export const FOLD_TECHNIQUES: {
  id: FoldKind;
  name: string;
  also: string;
  look: string;
  do: string;
  use: string;
}[] = [
  {
    id: "crease",
    name: "Sharp crease",
    also: "press / bone",
    look: "A lasting line in the paper",
    do: "Fold, then run a fingernail along the edge. Unfold — the line stays. A soft bend is not a crease.",
    use: "Every later fold needs a crease it can find. Soft folds make a floppy cube.",
  },
  {
    id: "valley",
    name: "Valley fold",
    also: "fold toward you",
    look: "Dashed line. The paper makes a V.",
    do: "Bring the paper toward you so the crease sits at the bottom of a valley. On a development, every dashed fold is a valley.",
    use: "Net cube: all five face hinges and the six tab hinges. Origami: the plus of book folds.",
  },
  {
    id: "mountain",
    name: "Mountain fold",
    also: "fold away from you",
    look: "Dash-dot line. The paper makes a peak.",
    do: "Push the crease away so it stands up like a ridge. Flip the paper over and a mountain becomes a valley — same crease, other side.",
    use: "Origami balloon: the two diagonals, folded on the back so they are mountains on the front.",
  },
  {
    id: "unfold",
    name: "Fold and unfold",
    also: "crease as a mark",
    look: "Fold, press, open. The line stays.",
    do: "Use a fold as a ruler. Line an edge up with a crease you already made, then crease again. You never needed numbers.",
    use: "Letter-paper cube grid: fold the 11-inch side in half, then each half in half. Unfold — four 2¾-inch bands.",
  },
  {
    id: "collapse",
    name: "Collapse",
    also: "squash / waterbomb",
    look: "Several creases move at once",
    do: "When a plus of valleys meets an X of mountains, pinch the side midpoints and let the paper fall into a smaller shape. Do not force one crease at a time.",
    use: "The waterbomb base: the square collapses into a two-layer triangle.",
  },
  {
    id: "tuck",
    name: "Tuck",
    also: "into a pocket",
    look: "A flap disappears inside a slit",
    do: "Fold a small pocket. Slide the neighboring flap all the way in before you crease. A flap sitting on top of a pocket will blow open.",
    use: "Origami balloon: four pockets lock the cube so you can inflate it. No glue.",
  },
];

export const FOLD_QUIZ: {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  explain: string;
}[] = [
  {
    id: "q1",
    prompt: "A valley fold means you…",
    options: [
      { id: "toward", label: "Fold the paper toward you" },
      { id: "away", label: "Fold the paper away from you" },
      { id: "cut", label: "Cut along the dashed line" },
    ],
    answer: "toward",
    explain: "Valley = toward you, like a V. Mountain = away from you, like a peak.",
  },
  {
    id: "q2",
    prompt: "You fold a square in half, crease, and open it. That move is…",
    options: [
      { id: "waste", label: "A mistake — you undid the fold" },
      { id: "unfold", label: "Fold and unfold — the crease is a mark" },
      { id: "tuck", label: "A tuck" },
    ],
    answer: "unfold",
    explain: "The crease stays. It is now a ruler on the paper. Origami and the letter-paper cube grid both start this way.",
  },
  {
    id: "q3",
    prompt: "Flip a valley fold over. On the other side it is…",
    options: [
      { id: "same", label: "Still a valley" },
      { id: "mountain", label: "A mountain fold" },
      { id: "gone", label: "Gone — creases only have one side" },
    ],
    answer: "mountain",
    explain: "One crease, two names. That is why the waterbomb diagonals are folded on the back: they become mountains on the front.",
  },
  {
    id: "q4",
    prompt: "The dashed lines on the cube development are…",
    options: [
      { id: "cut", label: "Cut lines" },
      { id: "valley", label: "Valley folds" },
      { id: "glue", label: "Places to put glue" },
    ],
    answer: "valley",
    explain: "Thick continuous = cut. Dashed = valley fold. Glue lives on the tabs, not on the fold.",
  },
];
