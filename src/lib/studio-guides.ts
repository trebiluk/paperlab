/** Kid steps for studio labs that have no period stepper. One action per line. */

export type GuidePhase = { visual: string; title: string; lines: string[] };

export const STUDIO_GUIDES: Record<string, GuidePhase[]> = {
  cube: [
    {
      visual: "studio-cube-grid",
      title: "Mark the cross",
      lines: [
        "Get one sheet, a pencil, scissors, and glue",
        "Turn the paper tall",
        "Mark six equal squares in a cross",
      ],
    },
    {
      visual: "studio-cube-lines",
      title: "Line types",
      lines: [
        "Draw a thick line where you will cut",
        "Draw a dashed line where you will fold",
        "Add a tab on each edge that glues",
      ],
    },
    {
      visual: "studio-cube-cut",
      title: "Cut",
      lines: [
        "Cut the thick outline",
        "Do not cut a dashed line",
        "Ask “cut or fold?” before the scissors move",
      ],
    },
    {
      visual: "studio-cube-close",
      title: "Fold and glue",
      lines: [
        "Fold every dashed line",
        "Glue each tab inside the cube",
        "Count 6 faces. It should close",
      ],
    },
  ],
  balloon: [
    {
      visual: "square-cut",
      title: "Make a square",
      lines: [
        "Fold a short edge onto a long edge",
        "Cut the leftover strip",
        "Open it. You have a square",
      ],
    },
    {
      visual: "box-star",
      title: "Plus and X",
      lines: [
        "Fold edge to edge. Open. That is the plus",
        "Fold corner to corner both ways. Open. That is the X",
      ],
    },
    {
      visual: "studio-balloon-pinch",
      title: "Collapse",
      lines: [
        "Pinch the middle",
        "Let the creases fall into a small square",
        "If it will not fall, the X is on the wrong side. Unfold. Flip those folds",
      ],
    },
    {
      visual: "studio-balloon-puff",
      title: "Blow",
      lines: [
        "Tuck four flaps into the pockets",
        "Blow once, slow",
        "No glue. It should puff into a cube",
      ],
    },
  ],
  folds: [
    {
      visual: "scrap-flat",
      title: "Scrap flat",
      lines: [
        "Put one scrap flat on the desk",
        "Point to the left edge",
        "Point to the right edge",
      ],
    },
    {
      visual: "valley-toward",
      title: "Valley toward you",
      lines: [
        "Fold the paper toward you, the way the picture shows",
        "Stop when the paper makes a V",
        "Press the crease with a fingernail",
        "Leave it folded",
        "Say valley",
      ],
    },
    {
      visual: "mountain-away",
      title: "Mountain away",
      lines: [
        "Open the scrap",
        "Turn the paper over",
        "Fold it away from you, the way the picture shows",
        "Press the crease",
        "Say mountain",
        "Same crease. Valley on one side. Mountain on the other",
      ],
    },
    {
      visual: "fold-unfold-tuck",
      title: "Fold and unfold",
      lines: [
        "Take a new scrap",
        "Fold one edge to the opposite edge",
        "Press with a fingernail",
        "Open it. The line stays. That is fold-and-unfold",
      ],
    },
    {
      visual: "dashed-valley-match",
      title: "Dashed means valley",
      lines: [
        "Point to the dashed line in the picture",
        "Say: dashed means valley",
        "Open Fold quiz. Pass is 3 out of 4",
      ],
    },
  ],
  draw: [
    {
      visual: "studio-draw-cut",
      title: "Cut line",
      lines: ["Draw a thick line", "That line means cut"],
    },
    {
      visual: "studio-draw-fold",
      title: "Fold line",
      lines: ["Draw a dashed line", "That line means fold", "Do not cut it"],
    },
    {
      visual: "studio-draw-size",
      title: "Size",
      lines: ["Draw a light arrow for one size", "Write the number next to it"],
    },
    {
      visual: "studio-draw-cut",
      title: "Check",
      lines: ["Show the drawing to a partner", "They should know what to cut without you talking"],
    },
  ],
  nets: [
    {
      visual: "studio-nets-cross",
      title: "Count",
      lines: ["Look at the net", "Count the squares. A cube needs 6"],
    },
    {
      visual: "studio-nets-overlap",
      title: "Overlap test",
      lines: ["Fold it in your mind", "If two squares land on the same spot, it fails"],
    },
    {
      visual: "studio-nets-pass",
      title: "Pass",
      lines: ["If every face has its own spot, it can be a cube", "Say pass or fail out loud"],
    },
    {
      visual: "studio-nets-overlap",
      title: "Point",
      lines: ["If it fails, point to the square that collides", "Do not guess. Point"],
    },
  ],
  solids: [
    {
      visual: "studio-solids-flat",
      title: "Flat faces",
      lines: ["Point to a flat face", "A solid with flat faces is a polyhedron"],
    },
    {
      visual: "studio-solids-wrap",
      title: "Not this",
      lines: ["A smooth wrap with no corners is not a polyhedron", "Say which one you are holding"],
    },
    {
      visual: "studio-cube-close",
      title: "Count",
      lines: ["Count the faces", "Count the edges", "Count the corners"],
    },
    {
      visual: "studio-solids-flat",
      title: "Name it",
      lines: ["Name the solid: cube, box, or prism", "Point to the face you counted first"],
    },
  ],
};
