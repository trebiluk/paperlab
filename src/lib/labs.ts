import type { MstCode } from "./mst";
import { MORE_LABS } from "./more-labs";

export type LabFamily = "make" | "fly" | "hold" | "move" | "fold" | "draw";
export type Copy = { easy: string; class: string; stretch: string };
export type LabStep = { title: string; minutes: string; body: Copy; tip?: Copy; visual: string };

export type Lab = {
  id: string;
  name: string;
  family: LabFamily;
  teConcept: string;
  grades: string;
  time: string;
  materials: string[];
  mst: MstCode[];
  blurb: Copy;
  challenge?: string;
  spec?: string;
  studio?: {
    to: "/build" | "/draw" | "/fold" | "/foldables" | "/nets" | "/math" | "/print";
    search?: { path: "net" | "origami" };
  };
  steps: LabStep[];
  vocab: { term: string; meaning: string; es: string }[];
  ell: string;
  sped: string;
  ta: string;
  plan: { hook: string; objectives: string[]; assessment: string[]; snags: string[]; extend: string };
};

export const FAMILIES: { id: LabFamily; name: string; body: string }[] = [
  { id: "make", name: "Make", body: "Manufacturing: a flat sheet becomes a 3-D product." },
  { id: "fly", name: "Fly", body: "Flight: lift, drag, and a test over a taped line." },
  { id: "hold", name: "Hold", body: "Structures: columns, beams, and a load that has to wait." },
  { id: "move", name: "Move", body: "Mechanisms: hinges, levers, and stored energy." },
  { id: "fold", name: "Fold", body: "Processes: the moves that every later lab uses." },
  { id: "draw", name: "Draw", body: "Modeling: developments, line types, and plans with measurements." },
];

const c = (easy: string, classText: string, stretch: string): Copy => ({ easy, class: classText, stretch });

const CORE_LABS: Lab[] = [
  {
    id: "cube",
    name: "Net cube",
    family: "make",
    teConcept: "Manufacturing a product from a development (flat pattern) with glue tabs",
    grades: "3–8",
    time: "45–60 min",
    materials: ["1 sheet", "pencil", "scissors", "glue stick"],
    mst: ["ED", "TR", "CT", "HT"],
    blurb: c(
      "Fold a cube from one sheet of paper. Cut, fold, glue. You can hold it.",
      "Draw a Latin-cross development with glue tabs, cut it, and assemble a cube — the largest that fits on the sheet.",
      "A development is a true-size unfolding. Tabs are joining processes. Optimize face size under the constraint of one sheet.",
    ),
    studio: { to: "/build", search: { path: "net" } },
    steps: [],
    vocab: [
      { term: "development", meaning: "A true-size unfolding of a solid, ready to cut", es: "desarrollo" },
      { term: "tab", meaning: "A flap that glues one face to another", es: "solapa" },
      { term: "net", meaning: "The geometry name for a development", es: "red / desarrollo" },
    ],
    ell: "Keep, cut, fold, glue — four verbs. Point to the dashed line: fold, do not cut.",
    sped: "Print the development. Bigger tabs. Tape instead of glue. Pair a cutter with a folder.",
    ta: "Do not cut dashed lines for them. Ask “cut or fold?” on every line they touch.",
    plan: {
      hook: "Can one flat sheet become a cube with no leftover faces taped on?",
      objectives: [
        "Construct a cube from a development with legal glue tabs.",
        "Use Grade 6 line types: thick = cut, dashed = valley fold.",
        "Count 6 faces, 12 edges, 8 vertices on the product they made.",
      ],
      assessment: ["Closed cube from a tabbed development.", "Conventions quiz 3/4.", "Oral count of F, E, V."],
      snags: ["Cutting fold lines.", "Tab on a hinge.", "Glue on a face instead of a tab."],
      extend: "Title block, full dimensioning, then origami balloon for a no-glue comparison.",
    },
  },
  {
    id: "balloon",
    name: "Origami balloon",
    family: "fold",
    teConcept: "Process without fasteners: cut a square, then valleys, mountains, collapse, and tucks",
    grades: "3–8",
    time: "25–40 min",
    materials: ["1 sheet", "scissors"],
    mst: ["TR", "TS", "ED"],
    blurb: c(
      "Cut a square from the rectangle. Fold a puffy cube. Blow once. No glue.",
      "Every origami model starts with a square. Fold a short edge onto a long edge, cut the leftover strip, then fold the waterbomb cube and inflate it.",
      "Squaring is a process that wastes a known leftover. The lock is four tucks — a fastener-free joining system.",
    ),
    studio: { to: "/build", search: { path: "origami" } },
    steps: [],
    vocab: [
      { term: "square", meaning: "Four equal sides, four right angles", es: "cuadrado" },
      { term: "collapse", meaning: "Several creases moving at once", es: "colapsar" },
      { term: "tuck", meaning: "Slide a flap into a pocket so it locks", es: "meter" },
    ],
    ell: "Square first. Then plus. Then X. Then pinch. Then pockets.",
    sped: "Pre-cut the square. Partner pinches the collapse. Slow breath to inflate.",
    ta: "If the collapse will not fall in, the diagonals were folded on the same side as the plus.",
    plan: {
      hook: "Can a cube lock with no glue?",
      objectives: ["Turn a rectangle into a square.", "Name valley, mountain, collapse, tuck.", "Inflate a closed cube."],
      assessment: ["A square of matching sides.", "Inflated balloon.", "Name of one move on request."],
      snags: ["Diagonals on the same side as the plus.", "Flap sitting on a pocket."],
      extend: "Measure both cubes. Why is the balloon smaller?",
    },
  },
  {
    id: "folds",
    name: "Folding techniques",
    family: "fold",
    teConcept: "Process vocabulary: crease, valley, mountain, fold-and-unfold, collapse, tuck",
    grades: "3–8",
    time: "20–30 min",
    materials: ["scrap paper"],
    mst: ["TR", "CT"],
    blurb: c(
      "Six moves. Tap one. Try it on scrap. Then the cube is not a trick.",
      "Drawing has line types. Folding has moves. Dashed on a development is a valley.",
      "A crease is a permanent line in the sheet. Valley and mountain are the same crease from opposite sides.",
    ),
    studio: { to: "/fold" },
    steps: [],
    vocab: [
      { term: "valley fold", meaning: "Fold toward you, like a V", es: "pliegue en valle" },
      { term: "mountain fold", meaning: "Fold away from you, like a peak", es: "pliegue en montaña" },
      { term: "crease", meaning: "A fold pressed until it stays", es: "pliegue" },
    ],
    ell: "Toward you = valley. Away = mountain. Open it = the line stays.",
    sped: "Scrap only. No cube yet. Large paper. Helper holds, student presses.",
    ta: "Wait for the scrap try-it before they touch the good sheet.",
    plan: {
      hook: "A dashed line on a drawing is a move with a name.",
      objectives: ["Name six folding moves.", "Match dashed = valley.", "Try each move on scrap."],
      assessment: ["Fold quiz 3/4.", "A scrap showing valley and mountain on two sides of one crease."],
      snags: ["Calling every fold a “fold.”", "Pressing while still hunting the line."],
      extend: "Same moves on the balloon and the net cube.",
    },
  },
  {
    id: "draw",
    name: "Development drawing",
    family: "draw",
    teConcept: "Technical drawing conventions: line types, tabs, match letters, title block",
    grades: "6–8",
    time: "25–40 min",
    materials: ["pencil", "paper or printed net"],
    mst: ["ED", "CT", "MT"],
    blurb: c(
      "Thick line = cut. Dashed line = fold. Tabs = glue. Letters match.",
      "In geometry it is a net. In technical drawing it is a development — true size, agreed line types.",
      "A working drawing is a communication system. Craftsmanship on the drawing predicts the product.",
    ),
    studio: { to: "/draw" },
    steps: [],
    vocab: [
      { term: "outline", meaning: "Thick continuous cut line", es: "contorno" },
      { term: "dimension", meaning: "A measured size on the drawing", es: "cota" },
    ],
    ell: "Four line jobs: cut, fold, light grid, size arrow.",
    sped: "Trace a printed development. Letter the tabs. Skip freehand grid.",
    ta: "Drawing first is the spec. If they start cutting, switch to the print net.",
    plan: {
      hook: "Could another class cut your drawing and get your cube?",
      objectives: ["Identify five line types.", "Place six legal tabs.", "Add match letters A–G."],
      assessment: ["Conventions quiz 3/4.", "A development with correct tabs."],
      snags: ["Tab on a fold.", "Dimension off the sheet."],
      extend: "Title block and scale 1:1.",
    },
  },
  {
    id: "nets",
    name: "Net detective",
    family: "draw",
    teConcept: "Which hexominoes fold to a cube — valid nets vs. overlapping faces",
    grades: "4–8",
    time: "15–25 min",
    materials: ["none, or printed hexominoes"],
    mst: ["ED", "CT"],
    blurb: c(
      "Eleven cube nets work. The rest cheat. Find the cheats.",
      "Only 11 of 35 hexominoes fold into a cube. Faces that stack in space fail.",
      "A net is a spanning tree of faces. Overlap is a geometric constraint, not a taste.",
    ),
    studio: { to: "/nets" },
    steps: [],
    vocab: [
      { term: "hexomino", meaning: "Six squares joined edge to edge", es: "hexominó" },
      { term: "valid net", meaning: "Folds with no faces on top of each other", es: "red válida" },
    ],
    ell: "Does a square land on a square? Then it fails.",
    sped: "Physical cut-outs to fold. Skip the in-your-head items.",
    ta: "Let them fold a wrong one. The overlap is the lesson.",
    plan: {
      hook: "Not every row of six squares becomes a cube.",
      objectives: ["Identify valid vs. invalid cube nets.", "State the no-overlap rule."],
      assessment: ["Fold-or-fail quiz.", "One valid net sketched that is not the Latin cross."],
      snags: ["Assuming a zigzag always works."],
      extend: "Count all 11. Why not 12?",
    },
  },
  {
    id: "solids",
    name: "More foldables",
    family: "make",
    teConcept: "Tetrahedron, pyramid, prism, cylinder, cone — polyhedra vs. solids with curves",
    grades: "4–8",
    time: "20–40 min",
    materials: ["1 sheet", "scissors", "glue"],
    mst: ["TR", "TS", "ED"],
    blurb: c(
      "After the cube: triangle solid, pyramid, prism, tube, cone. Same sheet.",
      "Five more developments on the same paper size. Cylinder and cone add a curved edge — Euler’s formula does not apply the same way.",
      "Curved developments introduce circumference = πd. Tabs still follow one per glue seam, never on a fold.",
    ),
    studio: { to: "/foldables" },
    steps: [],
    vocab: [
      { term: "polyhedron", meaning: "A solid with only flat faces", es: "poliedro" },
      { term: "cylinder", meaning: "Two circles and a wrap", es: "cilindro" },
    ],
    ell: "Flat faces = polyhedron. A wrap = not a polyhedron.",
    sped: "Pick one extra solid, not five. Tetrahedron is the smallest cut.",
    ta: "Same tab rules as the cube.",
    plan: {
      hook: "The cube is one product family. The sheet can make five more.",
      objectives: ["Build one non-cube development.", "Say whether Euler applies."],
      assessment: ["Finished solid.", "F, E, V or “curved” named correctly."],
      snags: ["Cylinder tape along the wrong edge."],
      extend: "Compare leftover paper across solids — waste as a process cost.",
    },
  },
  {
    id: "dart",
    name: "Dart plane",
    family: "fly",
    teConcept: "Iterative design under constraints: one sheet, a distance spec, change one variable",
    grades: "3–8",
    time: "35–45 min",
    materials: ["1 sheet", "pencil", "tape line on the floor"],
    mst: ["ED", "TS", "MT", "IT"],
    blurb: c(
      "Fold a dart. Fly it three times. Change one thing. Fly again.",
      "A classic dart is a fast prototype. The spec is a distance on the floor. After three flights, change one input and test again.",
      "Variables: mass distribution, dihedral, angle of attack, launch. Change one. A data table beats a story about “it flew better.”",
    ),
    challenge: "One sheet. Spec: pass a taped line 4 m away, 2 of 3 flights.",
    spec: "2 of 3 flights pass the 4 m line after one documented change.",
    steps: [
      {
        title: "Name the spec",
        minutes: "3 min",
        visual: "spec-line",
        body: c(
          "The plane must fly past the tape on the floor. Three tries, then one change, then three more.",
          "Write the spec: one sheet, no required cuts, pass the 4 m line in 2 of 3 flights. A spec is the test, not a hope.",
          "Constraints: one sheet, one period. Spec: 2/3 flights beyond 4 m after a single documented change.",
        ),
      },
      {
        title: "Center crease",
        minutes: "3 min",
        visual: "dart-1",
        body: c(
          "Short edge at the bottom. Fold in half the long way. Open it. The middle line stays.",
          "Portrait. Fold in half lengthwise, edge to edge. Unfold. That valley is the fuselage centerline.",
          "A centerline crease is a datum. Later folds reference it like a construction grid.",
        ),
        tip: c("Line the edges up before you press.", "Sharp crease. Soft folds make a floppy nose.", "If the edges miss, the dart is biased. Unfold and recrase."),
      },
      {
        title: "Nose folds",
        minutes: "6 min",
        visual: "dart-2",
        body: c(
          "Fold the two top corners in to the middle line. Then fold those new edges in to the middle again. Sharp point.",
          "Fold the top corners to the centerline. Crease. Fold the new long edges to the centerline again. The nose is a dart.",
          "Two successive 45-degree folds pack mass into the nose. Nose-heavy darts fly farther; tail-heavy darts stall.",
        ),
      },
      {
        title: "Wings",
        minutes: "5 min",
        visual: "dart-3",
        body: c(
          "Fold the plane in half so the point stays pointy. Fold one wing down. Flip. Fold the other so both match.",
          "Fold in half along the centerline. Fold each wing down so the top edge meets the bottom of the body. Match left and right.",
          "Matching wings is quality control. A little dihedral (tips up) adds roll stability.",
        ),
      },
      {
        title: "Test 1",
        minutes: "8 min",
        visual: "fly-test",
        body: c(
          "Stand on the start line. Throw gentle, straight. Mark where it lands. Three times. Write the numbers.",
          "Three flights, same throw. Partner marks landings. Record distance. Circle the best and the worst.",
          "Hold launch height constant. Record three distances. Use the median — do not let one lucky throw write the story.",
        ),
        tip: c("Gentle is better than hard.", "Hard throws stall.", "If it always dives, try a tiny up-tilt at the back of the wings."),
      },
      {
        title: "Change one thing",
        minutes: "10 min",
        visual: "iterate",
        body: c(
          "Pick one change: wing tips up, a tiny fold on the back of the wings, or a slower throw. Fly three more times.",
          "Choose one input: dihedral, a 2 mm elevator fold, or launch. Label the plane v2. Three more flights. Compare.",
          "Document the independent variable. A tradeoff: more stability can cost distance. Name it.",
        ),
      },
    ],
    vocab: [
      { term: "spec", meaning: "The test the product must pass", es: "especificación" },
      { term: "prototype", meaning: "A first version you expect to change", es: "prototipo" },
      { term: "iterate", meaning: "Change, test, change again", es: "iterar" },
      { term: "dihedral", meaning: "Wing tips tilted up, like a shallow V", es: "diedro" },
    ],
    ell: "Fly. Mark. Write the number. Change one thing. Fly again.",
    sped: "Pre-folded dart they finish the last wing on. Partner records. Shorter line (2 m) as an accessible spec.",
    ta: "Do not throw for them. Count 1-2-3 together, they release. You mark the landing.",
    plan: {
      hook: "A crumpled wad and a dart. Same sheet. Different process.",
      objectives: ["Fold a dart from one sheet.", "Test against a written spec.", "Change one variable and retest."],
      assessment: ["Data table with 6 flights.", "A labeled v2 change.", "Oral: input, process, output."],
      snags: ["Changing everything at once.", "Hard throws.", "No numbers."],
      extend: "Glider lab next — same spec, different airframe.",
    },
  },
  {
    id: "glider",
    name: "Paper glider",
    family: "fly",
    teConcept: "Alternative airframe: wide wings for lift vs. the dart’s mass-forward fuselage",
    grades: "4–8",
    time: "35–45 min",
    materials: ["1 sheet", "scissors optional", "tape line"],
    mst: ["ED", "TS", "TR"],
    blurb: c(
      "A glider has wide wings. It stays up longer than a dart. Fold, fly, compare.",
      "Wide wings increase lift and drag. Compare to the dart — same sheet, different system.",
      "Lift scales with wing area; drag does too. The dart optimized speed. The glider trades speed for hang time.",
    ),
    challenge: "Same 4 m line, or hang-time: stay up past a slow count of 3, 2 of 3 flights.",
    spec: "Beat your dart’s median distance or hit a 3-count hang, 2 of 3.",
    steps: [
      {
        title: "Pick the spec",
        minutes: "3 min",
        visual: "spec-line",
        body: c(
          "Today we want the plane to stay up. Count 1-2-3 while it flies. Or use the same floor tape as the dart.",
          "Choose distance or hang time. Write it. If you have dart data, this is a comparison test.",
          "Name the performance metric. You cannot optimize two at once without a tradeoff. Pick one primary spec.",
        ),
      },
      {
        title: "Wide body",
        minutes: "6 min",
        visual: "glider-1",
        body: c(
          "Fold the top down about two fingers. Fold that strip down again. This makes a heavy front.",
          "Landscape. Fold a 2–3 cm leading-edge strip down, twice, so the nose has several layers.",
          "Leading-edge mass keeps the center of gravity ahead of the center of lift. Too far forward dives; too far back stalls.",
        ),
      },
      {
        title: "Wings and tail",
        minutes: "8 min",
        visual: "glider-2",
        body: c(
          "Fold in half. Fold the wings out wide — much wider than a dart. Pinch a small tail at the back.",
          "Fold in half, then fold each wing out so the span is wide and the body is a thin spine. Add a small fin at the back.",
          "Aspect ratio (span / chord) is higher than the dart. Vertical tail is a yaw stabilizer.",
        ),
      },
      {
        title: "Trim",
        minutes: "5 min",
        visual: "glider-3",
        body: c(
          "If it dives, bend the back of the wings up a tiny bit. If it climbs and falls, bend them down a tiny bit.",
          "Elevator trim: a 1–2 mm upward fold on the trailing edge for a dive; downward for a stall. Match left and right.",
          "Trim is closed-loop control: sense the flight, decide, change a surface. Tiny folds. Big folds are a new plane.",
        ),
      },
      {
        title: "Test and compare",
        minutes: "10 min",
        visual: "fly-test",
        body: c(
          "Three gentle throws. Write the count or the distance. Compare to your dart if you have one.",
          "Three flights. Record. Next to dart data if you have it. Which system won the spec — and what did you give up?",
          "Same launch protocol as the dart. Name one confounding variable you could not hold.",
        ),
      },
      {
        title: "One change",
        minutes: "8 min",
        visual: "iterate",
        body: c(
          "Make the wings a little wider, or add a tiny up-bend. Fly three more times.",
          "One change: span, trim, or nose mass. Label v2. Three flights.",
          "If you add mass to the nose you also add drag. Predict the direction of change before you throw.",
        ),
      },
    ],
    vocab: [
      { term: "lift", meaning: "The upward push of air on a wing", es: "sustentación" },
      { term: "drag", meaning: "The air slowing the plane down", es: "arrastre" },
      { term: "trim", meaning: "Tiny bends that steer the flight", es: "ajuste" },
    ],
    ell: "Wide wings. Gentle throw. Count. Bend a tiny bit. Try again.",
    sped: "Teacher pre-folds the leading-edge ballast. Student folds wings and tests. Sit-down launches over a table if throwing is hard.",
    ta: "Gentle throw only. If they wind up like a dart throw: “push it, do not whip it.”",
    plan: {
      hook: "Same paper as the dart. Different process. Which spec does each win?",
      objectives: ["Build a wide-wing glider.", "Trim from observed flight.", "Compare two airframes on one spec."],
      assessment: ["Labeled v1/v2.", "A comparison sentence with a number.", "Name lift or drag."],
      snags: ["Throwing a glider like a dart.", "Giant elevator folds."],
      extend: "Graph dart vs. glider for the class.",
    },
  },
  {
    id: "tower",
    name: "One-sheet tower",
    family: "hold",
    teConcept: "Structures under a height spec: columns beat flat folds; iteration under a time constraint",
    grades: "3–8",
    time: "30–40 min",
    materials: ["1 sheet", "scissors", "tape optional (one strip)", "meter stick"],
    mst: ["ED", "TS", "TR", "MT"],
    blurb: c(
      "Build the tallest tower that stands by itself from one sheet. It must stand while we count to ten.",
      "Constraint: one sheet, 20 minutes of making, free-standing for 10 seconds. Columns usually beat a folded accordion.",
      "Buckling, base width, slenderness. A tube is a column; a crease is a perforation waiting to fail. Tape is a scarce resource.",
    ),
    challenge: "Tallest free-standing tower from one sheet. Must stand 10 seconds. Optional: one tape strip.",
    spec: "Free-standing 10 s. Height in cm is the score. Ties: smaller base wins.",
    steps: [
      {
        title: "Constraints",
        minutes: "4 min",
        visual: "tower-spec",
        body: c(
          "One paper. The tower must stand alone. We count to ten. Tallest wins.",
          "Write constraints: 1 sheet, free-standing, 10 s, 20 min make time. Optional: one tape strip. Sketch two ideas first.",
          "Constraints vs. criteria: constraints are musts. Criteria are how we judge (height, then footprint).",
        ),
      },
      {
        title: "Two ideas",
        minutes: "5 min",
        visual: "tower-ideas",
        body: c(
          "Idea A: roll a tube. Idea B: fold a zigzag. Draw both. Circle the one you will try first.",
          "Sketch a tube column, a folded beam, or a tripod of rolled legs. Pick one and say why in one sentence.",
          "Generate then evaluate. A tripod resists tipping; a single tube needs a wide base or it is a slenderness problem.",
        ),
      },
      {
        title: "Make v1",
        minutes: "10 min",
        visual: "tower-make",
        body: c(
          "Build your first idea. Roll tight if it is a tube. Stand it up as soon as you can.",
          "Craftsmanship: even rolls, sharp locks. A soft roll buckles. Stand early — a tower that only works in your hands is not free-standing.",
          "Quality control: circular tubes, even overlaps. If you use tape, it is a joint, not a sculpture wrap.",
        ),
      },
      {
        title: "Test",
        minutes: "4 min",
        visual: "tower-test",
        body: c(
          "Hands off. Count to ten. If it falls, that is data. Measure how tall it was.",
          "Hands off, 10 s. Measure height in cm. Record fail mode: tip, buckle, unwind.",
          "Fail mode is the lesson. Tipping = base too small. Buckling = wall too thin. Unwinding = joint failure.",
        ),
      },
      {
        title: "Improve",
        minutes: "8 min",
        visual: "iterate",
        body: c(
          "Change one thing: a wider bottom, a tighter roll, or a second small tube. Test again. Measure.",
          "One change aimed at the fail mode. Retest 10 s. Did you trade height for a wider base?",
          "Optimization: height vs. stability. A shorter wider tower may score less and still be the better structure.",
        ),
      },
    ],
    vocab: [
      { term: "constraint", meaning: "A rule you must keep (one sheet, stand alone)", es: "límite" },
      { term: "column", meaning: "A tall part that holds weight, like a tube", es: "columna" },
      { term: "buckle", meaning: "A wall folding in on itself", es: "combarse" },
    ],
    ell: "Stand alone. Count ten. Measure. Change one thing.",
    sped: "Pre-rolled tube they cut and stand. Measure with a partner. Desk standing is an accessible spec.",
    ta: "Do not hold the tower during the count. If it falls: “What happened first — tip or squash?”",
    plan: {
      hook: "Hold a flat sheet on edge. It fails. Same sheet as a tube. Why?",
      objectives: ["Design under written constraints.", "Build and test a free-standing tower.", "Use fail mode to choose one improvement."],
      assessment: ["Two sketches.", "Height recorded twice.", "Fail mode named."],
      snags: ["Using half a roll of tape.", "Building until the bell with no test."],
      extend: "No tape day. Interlocking slots only.",
    },
  },
  {
    id: "bridge",
    name: "Paper bridge",
    family: "hold",
    teConcept: "Beams and trusses: span a gap, hold a load, compare folded beams to a flat sheet",
    grades: "4–8",
    time: "40–50 min",
    materials: ["1–2 sheets", "scissors", "two books", "glue stick as load"],
    mst: ["ED", "TS", "TR"],
    blurb: c(
      "Span a gap between two books. Hold a glue stick. A folded beam is stronger than a flat sheet.",
      "Abutments about 20 cm apart. The bridge may only touch the two books. Load is a glue stick at midspan.",
      "Bending stiffness scales with geometry, not just material. A folded beam increases depth. Truss triangles move load to tension and compression.",
    ),
    challenge: "Span 20 cm. Hold a glue-stick load at the middle for 10 seconds. Do not tape the bridge to the books.",
    spec: "10 s with load at midspan. Stretch: stack a second load, or widen the span.",
    steps: [
      {
        title: "The gap",
        minutes: "4 min",
        visual: "bridge-gap",
        body: c(
          "Two books, a gap as wide as two hands. The paper may sit only on the two books.",
          "Set abutments 20 cm apart. Do not tape the paper to the books — that would be a different support.",
          "Simply supported span. Taping to books makes a moment connection and cheats the spec.",
        ),
      },
      {
        title: "Flat control",
        minutes: "3 min",
        visual: "bridge-flat",
        body: c(
          "Lay one sheet flat across. Put the glue stick in the middle. What happens? That is the before.",
          "Control test: a flat sheet. Record the fail. Every later beam has to beat this.",
          "A control is data. Write “flat: fail.” Without it, a folded beam “feeling strong” is not evidence.",
        ),
      },
      {
        title: "Fold a beam",
        minutes: "10 min",
        visual: "bridge-beam",
        body: c(
          "Fold the long edge over and over into a thick strip, or fold a zigzag. You are making a beam.",
          "Accordion-fold a beam, or fold an I (a strip with two side flanges). Length must still span 20 cm plus a sit-on each book.",
          "An I-section or corrugated section raises stiffness. Depth is cheaper than more layers.",
        ),
      },
      {
        title: "Load test",
        minutes: "6 min",
        visual: "bridge-load",
        body: c(
          "Place the beam. Glue stick in the middle. Hands off. Count ten. Did it hold?",
          "Midspan load, 10 s. Pass/fail. If it holds, add a second load as a stretch criterion.",
          "Note deflection even if it does not collapse. Sag of 4 cm vs. 4 mm is different data.",
        ),
      },
      {
        title: "Improve the shape",
        minutes: "12 min",
        visual: "iterate",
        body: c(
          "If it bent, fold a taller zigzag. If it rolled over, make it wider. Test again.",
          "Fail mode: sag (need more depth), twist (need a wider top), end slip (need more sit-on). One change, retest.",
          "A 2 cm tall accordion will beat a 5 mm thick packet of the same paper. Predict, then test.",
        ),
      },
    ],
    vocab: [
      { term: "span", meaning: "The empty distance the bridge must cross", es: "tramo" },
      { term: "beam", meaning: "A long piece that resists bending", es: "viga" },
      { term: "load", meaning: "The weight you put on it", es: "carga" },
      { term: "abutment", meaning: "The supports at each end (the books)", es: "estribo" },
    ],
    ell: "Two books. A gap. Paper on top. Weight in the middle. Count ten.",
    sped: "Shorter span (10 cm) as the accessible spec. Pre-folded accordion they place and load.",
    ta: "Do not hold the load “to help.” If it fails, catch the glue stick — then they rebuild.",
    plan: {
      hook: "Flat sheet fails in 1 second. Same mass of paper, folded, holds. Geometry is the technology.",
      objectives: ["Run a control test.", "Fold a beam and hold a specified load.", "Connect fail mode to a geometry change."],
      assessment: ["Pass/fail plus span.", "A sentence naming beam or triangle.", "Control recorded."],
      snags: ["Taping to the books.", "Load at the end, not midspan."],
      extend: "Triangles (truss) from strips.",
    },
  },
  {
    id: "popup",
    name: "Pop-up hinge",
    family: "move",
    teConcept: "Mechanisms: a folded card as a system; parallel-fold converts rotation to lift",
    grades: "3–8",
    time: "30–40 min",
    materials: ["1 sheet folded as a card", "scissors", "glue stick"],
    mst: ["TS", "ED", "TR"],
    blurb: c(
      "Open the card. A shape stands up. That is a hinge doing a job.",
      "A pop-up is a mechanism. Closing the card stores the motion; opening it outputs lift.",
      "Input: rotation of the card. Process: a folded hinge. Output: a face that rises.",
    ),
    steps: [
      {
        title: "The card",
        minutes: "2 min",
        visual: "popup-card",
        body: c("Fold the paper in half like a book. The fold is a hinge.", "Valley-fold a booklet. The spine is a hinge — a joint that rotates.", "The card is the ground link. Pop-up mechanisms attach to both sides so opening drives the motion."),
      },
      {
        title: "Two cuts",
        minutes: "6 min",
        visual: "popup-cut",
        body: c("From the folded edge, cut two short lines, a little apart. Do not cut to the open edge.", "On the folded spine, cut two parallel slits about 3–4 cm deep and 2–3 cm apart.", "If you cut through, the mechanism falls out — a failed joint."),
        tip: c("Short cuts.", "If the cuts meet the open edge, start a new card.", "Symmetric cuts make a symmetric lift."),
      },
      {
        title: "Push the step",
        minutes: "5 min",
        visual: "popup-v",
        body: c("Open the card a little. Push the middle piece through so it pops the other way. A step stands up.", "Invert the strip between the cuts so it folds the opposite way from the spine. Open: the step rises.", "You reversed mountain/valley on that strip. The card’s rotation now forces the step up."),
      },
      {
        title: "Add a face",
        minutes: "8 min",
        visual: "popup-face",
        body: c("Cut a small square from scrap. Glue it only on the step, not on the card walls.", "Glue a cut-out to the vertical face of the step only. Glue on the walls locks the hinge. Test open-close ten times.", "Attaching to both card and step over-constrains the mechanism. Ten cycles is a quality test."),
      },
      {
        title: "Name the system",
        minutes: "5 min",
        visual: "system",
        body: c("Input: you open the card. Output: the picture stands. The hinge is the process.", "Input (open), process (hinge), output (lift). If it does not lift, which part failed?", "Open to 90°, the pop-up should be about 90°. Cut depth is the parameter to iterate."),
      },
    ],
    vocab: [
      { term: "hinge", meaning: "A joint that rotates", es: "bisagra" },
      { term: "mechanism", meaning: "Parts that move in a planned way", es: "mecanismo" },
      { term: "input / output", meaning: "What you do, and what the system does back", es: "entrada / salida" },
    ],
    ell: "Fold a book. Two cuts. Push through. Glue on the step only.",
    sped: "Teacher makes the two cuts. Student inverts the step and glues the face.",
    ta: "If they glue the character onto the card wall, the pop-up is dead. “Only on the step.”",
    plan: {
      hook: "A birthday card that moves is a machine made of paper.",
      objectives: ["Build a working parallel-fold pop-up.", "Name input, process, output.", "Keep glue off the hinge."],
      assessment: ["Ten open-close cycles.", "Oral IPO.", "A glued face that still moves."],
      snags: ["Cuts through the card.", "Glue on the walls."],
      extend: "V-fold as a second mechanism. Compare lift.",
    },
  },
  {
    id: "pinwheel",
    name: "Pinwheel",
    family: "move",
    teConcept: "Energy and rotary systems: wind as input, a shaft, vanes as process, spin as output",
    grades: "2–6",
    time: "25–35 min",
    materials: ["1 square", "scissors", "pencil with eraser", "pushpin or paper fastener"],
    mst: ["TS", "TR", "IT", "HT"],
    blurb: c(
      "Cut a square, cut toward the middle, fold every other point in, pin it on a pencil. Blow. It spins.",
      "A pinwheel is a rotary system. Wind is the input. Vanes catch it. A shaft holds the center. Too tight a pin = too much friction.",
      "Convert airflow to rotation. Friction at the axle is a loss. History: windmills. Impact: a toy, and a model of a turbine.",
    ),
    steps: [
      {
        title: "Cut a square",
        minutes: "5 min",
        visual: "square-cut",
        body: c("Fold a short edge onto a long edge. Cut the leftover strip. Open. Square.", "Same square-cutting process as origami. The leftover is a bookmark, not trash.", "A rectangle pinwheel is an unbalanced rotor. Square first."),
      },
      {
        title: "Cuts to the center",
        minutes: "5 min",
        visual: "pinwheel-cut",
        body: c("Draw two light lines corner to corner. Cut along each, but stop before the middle.", "Cut from each corner along the diagonal, stopping 1–1.5 cm from the center. Four vanes, still one piece.", "Too close to center and the hub tears. Too far and the vanes will not overlap."),
      },
      {
        title: "Every other point",
        minutes: "6 min",
        visual: "pinwheel-fold",
        body: c("Take every other corner point to the middle. Four points stacked. Hold them.", "Bring every other cut point to the center. Do not crease hard — a soft curve makes a better vane.", "Four vanes, same swirl. Mixing left and right cancels torque."),
      },
      {
        title: "Axle",
        minutes: "5 min",
        visual: "pinwheel-axle",
        body: c("A pushpin through the stack into the pencil eraser. Not tight. The wheel must wiggle a little.", "Pin through the four points and the hub into the eraser. Leave a paper-thickness of play. Tight = no spin.", "The pin is a shaft. The eraser is a bearing. Paper fastener through a straw if pins are not allowed."),
        tip: c("Points away from eyes.", "Teacher can set the pin for younger grades.", "Count pins in and out."),
      },
      {
        title: "Test the system",
        minutes: "6 min",
        visual: "pinwheel-spin",
        body: c("Blow straight at it. If it does not spin, the pin is too tight. Loosen.", "Input: breath. Output: rotation. Diagnose: friction, vanes not overlapping, or blowing from the edge.", "Energy chain: moving air → force on vanes → torque on shaft → rotation."),
      },
    ],
    vocab: [
      { term: "vane", meaning: "A blade that catches air", es: "aspa" },
      { term: "shaft", meaning: "The stick it spins on", es: "eje" },
      { term: "friction", meaning: "Rubbing that steals the spin", es: "fricción" },
    ],
    ell: "Square. Cut toward middle. Stop. Every other point in. Pin. Blow.",
    sped: "Pre-cut square and diagonals. Student folds points and tests. Straw + fastener if pins are not allowed.",
    ta: "You may push the pin. They aim the vanes. If it will not spin: “Is it tight or loose?”",
    plan: {
      hook: "A windmill on a pencil. Same idea as a farm mill, different scale.",
      objectives: ["Build a rotary pinwheel.", "Diagnose friction vs. vane errors.", "Name input, process, output."],
      assessment: ["Spins from a breath.", "Oral IPO.", "Leftover strip reused or labeled as waste."],
      snags: ["Cutting through the hub.", "Pin cinched down."],
      extend: "Two pinwheels, different vane sizes. Which starts easier?",
    },
  },
  {
    id: "box",
    name: "Masu gift box",
    family: "make",
    teConcept: "Packaging: a square blank becomes a container; lids, volume, and wasted strip",
    grades: "4–8",
    time: "30–40 min",
    materials: ["1 sheet (cut to square)", "scissors"],
    mst: ["TR", "ED", "HT", "IT"],
    blurb: c(
      "Cut a square. Fold a box. Put something small in it. No glue if the folds lock.",
      "The masu is a traditional measuring box. Cut a square, then fold a container. A slightly larger square makes the lid.",
      "Packaging is a product family: a net with self-locking joints. Volume is a function of fold-in depth. The leftover strip is process waste — or a sleeve.",
    ),
    steps: [
      {
        title: "Square the blank",
        minutes: "4 min",
        visual: "square-cut",
        body: c("Short edge onto long edge. Cut the strip. Square.", "Keep the strip for a lid strap or a name band.", "Two boxes (base + lid) need two squares. Lid square is about 5 mm larger."),
      },
      {
        title: "Both diagonals, both books",
        minutes: "5 min",
        visual: "box-star",
        body: c("Fold corner to corner both ways. Open. Fold edge to edge both ways. Open. A star of lines.", "Fold-and-unfold both diagonals and both book folds. Locators for the next folds.", "These are construction creases. You are locating midpoints without a ruler."),
      },
      {
        title: "Corners to center",
        minutes: "4 min",
        visual: "box-blintz",
        body: c("Fold every corner in to the middle point. You have a smaller square.", "Blintz fold: all four corners to the center. Crease sharply.", "Wall height will be about a quarter of the square’s edge."),
      },
      {
        title: "Side walls",
        minutes: "8 min",
        visual: "box-walls",
        body: c("Fold two opposite sides in, open, then the other two. Lift two sides. Pinch the corners so they become triangles that tuck in.", "Open two walls. Extra paper at the ends becomes triangular locks you fold in along the walls. Repeat. A box appears.", "The lock is a tuck — no adhesive. If a wall slumps, the lock is not seated."),
      },
      {
        title: "Fit a product",
        minutes: "6 min",
        visual: "box-fill",
        body: c("Put an eraser or a folded note in the box. Does it fit?", "The box is packaging. A product that does not fit is a failed spec. Measure the inside.", "Clearance is a tolerance. Too tight scuffs; too loose rattles. Name who the package is for."),
      },
    ],
    vocab: [
      { term: "blank", meaning: "The starting piece of material", es: "hoja" },
      { term: "package", meaning: "A container that holds and protects a product", es: "empaque" },
      { term: "lock", meaning: "A fold that holds without glue", es: "cierre" },
    ],
    ell: "Square. Star of folds. Corners in. Lift walls. Tuck corners. Put something in.",
    sped: "Pre-cut square. Helper on the wall-tuck. Tape a corner only if the lock will not seat — then label tape as a process change.",
    ta: "Hold two walls up; they pinch the triangle in. Do not fold the whole box and hand it back.",
    plan: {
      hook: "Stores still ship take-out in folded card. You are doing that process.",
      objectives: ["Cut a square blank.", "Fold a locking box.", "Test fit a product and talk waste."],
      assessment: ["Box stands empty.", "An object fits.", "Leftover strip accounted for."],
      snags: ["Skipping the star creases.", "Glue as a first resort."],
      extend: "Lid from a second square. Volume estimate: floor × wall height.",
    },
  },
  {
    id: "frog",
    name: "Hopper frog",
    family: "move",
    teConcept: "Stored energy: a folded spring converts a press into a jump; test distance",
    grades: "3–7",
    time: "30–40 min",
    materials: ["1 sheet or index card", "scissors optional"],
    mst: ["TS", "ED", "TR"],
    blurb: c(
      "Fold a frog. Press the back. It hops. Measure the hop. Fold the spring sharper. Measure again.",
      "The hopper is a stored-energy system. Your finger is the input. The folded back legs are a spring. Output is a jump.",
      "A sharper reverse-fold on the legs stores more. A data table of three presses beats “it hops.”",
    ),
    spec: "Three hops recorded. After one crease improvement, median hop increases or the frog lands upright more often.",
    steps: [
      {
        title: "Start rectangle",
        minutes: "3 min",
        visual: "frog-rect",
        body: c("A half-sheet or an index card works better than a long full sheet.", "A 3×5 card or a half letter sheet is the right blank. A full long sheet makes a floppy frog.", "Material thickness and aspect ratio matter. Copy paper is the constraint we have."),
      },
      {
        title: "Head and legs",
        minutes: "12 min",
        visual: "frog-fold",
        body: c("Fold in half both ways and open. Fold two corners in for a pointy head. Fold the sides in. Fold the bottom up, then fold that part in half back — that is the spring.", "Book folds as locators. Top corners in. Sides to center. Bottom up, then reverse-fold that flap into an accordion spring. Splay the bottom corners as feet.", "The reverse fold on the rear is the energy store. An accordion (two creases) is a better spring than a single bend."),
        tip: c("Watch a neighbor’s spring if you get lost.", "Pause at the spring and check a sample.", "If it is lopsided, the center book fold was missed."),
      },
      {
        title: "Press test",
        minutes: "8 min",
        visual: "frog-hop",
        body: c("Set it on a table. Press the back and slide your finger off. Mark the landing. Three hops.", "Same surface, three presses. Record distance and whether it landed on its feet.", "Hold press location constant (the spring, not the head)."),
      },
      {
        title: "Sharpen the spring",
        minutes: "7 min",
        visual: "iterate",
        body: c("Press the back-leg folds harder. Try three more hops. Did the number go up?", "Improve the spring crease only. Retest n=3. Did median distance rise? Did upright landings fall?", "You changed stiffness. Predict: more energy, maybe less stability. Confirm with numbers."),
      },
    ],
    vocab: [
      { term: "spring", meaning: "A part that stores a press and gives it back", es: "resorte" },
      { term: "energy", meaning: "What you put in that can make a hop", es: "energía" },
    ],
    ell: "Fold the frog. Press the back. It hops. Mark. Press the folds harder. Hop again.",
    sped: "Teacher completes through the head; student folds the spring and tests.",
    ta: "Do not hop it for them first. Their first hop is the data.",
    plan: {
      hook: "A press, then a wait, then a jump — the wait is stored energy.",
      objectives: ["Fold a hopper.", "Record three hops.", "Improve the spring and retest."],
      assessment: ["Six numbers.", "Upright vs. not noted.", "Spring named as the process."],
      snags: ["Pressing the head.", "Floppy full-sheet blank."],
      extend: "Card stock vs. copy paper as a materials test.",
    },
  },
  {
    id: "lantern",
    name: "Kirigami lantern",
    family: "make",
    teConcept: "Cutting as a process: parallel slits in a wrap become a 3-D lantern; cylinder geometry",
    grades: "3–8",
    time: "25–35 min",
    materials: ["1 sheet", "scissors", "glue or tape", "optional string"],
    mst: ["TR", "TS", "HT"],
    blurb: c(
      "Cut many slits, roll into a tube, push the ends. A lantern grows. No flame — this is a model.",
      "Kirigami (cut + fold) turns a rectangle into a cylindrical lantern. Parallel slits expand when the tube is compressed. Electric tea-lights only, never a flame.",
      "A slit pattern is a compliant mechanism: material removed so remaining ribs buckle out on purpose. Fire safety is a constraint.",
    ),
    steps: [
      {
        title: "Safety spec",
        minutes: "2 min",
        visual: "lantern-safe",
        body: c("This lantern is paper. No candles.", "Constraint: no open flame. The product is a model of a lighting system, not a lamp.", "Impacts of technology: a beautiful process with a real fire history. We constrain the design on purpose."),
      },
      {
        title: "Fold to cut many",
        minutes: "6 min",
        visual: "lantern-slits",
        body: c("Fold in half the long way. Cut slits from the fold toward the open edges, stopping before the edge. Many, even spaces. Open.", "From the fold, cut slits about 1 cm apart, stopping 1.5 cm from the open edges. Unfold: parallel slits, two uncut rails.", "Slit spacing is a parameter: too close and ribs tear; too far and it does not expand."),
      },
      {
        title: "Roll the tube",
        minutes: "6 min",
        visual: "lantern-roll",
        body: c("Roll into a tube so the slits run around. Glue or tape the long edge.", "Join the long edges into a cylinder. Rails at the two ends. Overlap about 1 cm.", "Circumference is the short edge. Diameter ≈ C/π. Predict the ring size before you roll."),
      },
      {
        title: "Expand",
        minutes: "4 min",
        visual: "lantern-expand",
        body: c("Push the two ends toward each other. The slits open into diamonds.", "Compress axially. The ribs buckle outward — a planned buckle, unlike the tower’s fail.", "The same buckle you fought in the tower is now the product. Geometry decides whether buckle is fail or feature."),
      },
      {
        title: "Handle",
        minutes: "5 min",
        visual: "lantern-handle",
        body: c("A leftover strip becomes a handle. Tape it to both rings. Still no flame.", "Add a handle from the leftover strip. The lantern is a system: body + handle + (pretend) light.", "Name the subsystems. Who is it for? That is the need."),
      },
    ],
    vocab: [
      { term: "kirigami", meaning: "Paper cutting plus folding", es: "kirigami" },
      { term: "cylinder", meaning: "A tube with two round ends", es: "cilindro" },
      { term: "slit", meaning: "A cut that does not come out the other side", es: "ranura" },
    ],
    ell: "Many cuts. Stop before the edge. Roll. Push ends. Diamonds open. No fire.",
    sped: "Fewer, wider slits (teacher marks stop-line). Pre-glued tube they expand.",
    ta: "If they cut the rail, tape a new rail from scrap rather than taking over the slits.",
    plan: {
      hook: "A cut can be a design, not a mistake. These cuts are supposed to open.",
      objectives: ["Cut a controlled slit pattern.", "Form a cylinder and expand it.", "State a no-flame constraint and why."],
      assessment: ["Expanded lantern that hangs.", "Oral: why no candle.", "A named subsystem."],
      snags: ["Cutting the rail.", "Slits too close.", "Open flame as a joke — shut it down."],
      extend: "Cone lantern (tapered wrap). Compare expansion.",
    },
  },
  {
    id: "teller",
    name: "Fortune teller",
    family: "fold",
    teConcept: "A folded mechanism as an information system: layers, pockets, and a user interface",
    grades: "2–6",
    time: "20–30 min",
    materials: ["1 square"],
    mst: ["TS", "TR", "CT"],
    blurb: c(
      "Fold a chatterbox. Write facts on the inside. A friend picks. The paper is a machine for a question.",
      "The fortune teller is a four-pocket mechanism and an interface. Fill it with lab vocab, not fortunes.",
      "An information system in paper. Layers hide data until a sequence of choices reveals it — a menu, different material.",
    ),
    steps: [
      {
        title: "Square and blintz",
        minutes: "5 min",
        visual: "teller-1",
        body: c("Make a square. Fold all four corners to the middle. Flip. Fold all four corners to the middle again.", "Square. Corners to center. Flip. Corners to center again. Eight triangular flaps.", "Two blintz passes create nested pockets. The second pass is on the back."),
      },
      {
        title: "The mouth",
        minutes: "4 min",
        visual: "teller-2",
        body: c("Fold in half both ways, open. Slide fingers under the four flaps. Open and close both ways.", "Open into the four-finger puppet. Practice both axes: left-right and up-down.", "Two degrees of freedom. A user who only opens one axis never reaches half the data."),
      },
      {
        title: "Load the data",
        minutes: "8 min",
        visual: "teller-3",
        body: c("Outside: four colors. Inside flaps: numbers. Under the flaps: tech words and their meanings.", "Interface: 4 colors, 8 numbers, 8 definitions. Content is MST vocab from this week, not magic.", "You are encoding a lookup table in a mechanical UI."),
      },
      {
        title: "Run the system",
        minutes: "6 min",
        visual: "teller-use",
        body: c("A partner picks a color. Spell it while you open and close. Pick a number. Count. Open the flap. Read.", "Partner is the user. You are the operator. They use a sentence frame: “A ___ is ___.”", "Usability test: can a new user run it with no extra talk?"),
      },
    ],
    vocab: [
      { term: "interface", meaning: "How a person talks to a system (colors, numbers)", es: "interfaz" },
      { term: "data", meaning: "The words hidden under the flaps", es: "datos" },
    ],
    ell: "Four colors. Numbers. Words under. Partner picks. You open. Read.",
    sped: "Pre-folded teller they only write on. Fewer words. Pictures under flaps instead of sentences.",
    ta: "Content is class words, not teasing fortunes about people.",
    plan: {
      hook: "A paper computer: input a choice, output a fact.",
      objectives: ["Fold a working four-pocket teller.", "Load it with lab vocabulary.", "Run it as a user-operator pair."],
      assessment: ["Opens on both axes.", "Accurate vocab items.", "One partner-run with no teacher talk."],
      snags: ["Only one axis works.", "Mean fortunes."],
      extend: "A second teller as a quiz: questions on top, answers under.",
    },
  },
  {
    id: "weave",
    name: "Strip weave",
    family: "make",
    teConcept: "Materials process: over-under weaving turns strips into a stronger sheet",
    grades: "2–6",
    time: "30–40 min",
    materials: ["1–2 sheets", "scissors", "glue stick for ends"],
    mst: ["TR", "TS", "HT"],
    blurb: c(
      "Cut strips. Go over, under, over, under. The mat is stronger than one strip. That is weaving.",
      "Weaving makes a new material from strips. Warp (the downs) and weft (the across) lock by friction.",
      "A composite of paper and air: the pattern is the structure. History: baskets and cloth.",
    ),
    steps: [
      {
        title: "Cut strips",
        minutes: "8 min",
        visual: "weave-cut",
        body: c("Cut even strips the long way, about two fingers wide. You need at least six.", "Cut 8–10 strips about 3 cm wide. Fold the sheet in quarters as a cutting guide so they match.", "Strip width is a parameter. Narrower = tighter cloth, harder fine-motor."),
      },
      {
        title: "Lay the warp",
        minutes: "4 min",
        visual: "weave-warp",
        body: c("Lay half the strips side by side, like a raft. Tape the top ends to the desk if they slide.", "Warp = the set that stays. Tape across the top on the desk is a loom. Not cheating — a fixture.", "A loom is a tool that holds a process. Tools are allowed; they are Standard 5."),
      },
      {
        title: "Weft over-under",
        minutes: "10 min",
        visual: "weave-weft",
        body: c("Take one strip across. Over, under, over, under. The next strip starts the other way. Push them tight.", "Plain weave: each weft row flips the pattern. Beat the row snug before the next.", "A missed over-under is a defect. The pattern should checkerboard. Repair now."),
      },
      {
        title: "Finish",
        minutes: "6 min",
        visual: "weave-mat",
        body: c("Fold the loose ends over and glue. Try to tear a strip vs. the mat. Which wins?", "Hem the edges. Tear test: one free strip vs. the mat. The process added strength.", "Name a real product that weaves for strength (basket, chair cane, carbon cloth)."),
      },
    ],
    vocab: [
      { term: "weave", meaning: "Over-under locking of strips", es: "tejer" },
      { term: "warp", meaning: "The strips that stay put", es: "urdido" },
      { term: "weft", meaning: "The strips you weave across", es: "trama" },
    ],
    ell: "Cut strips. Tape the top. Over, under. Next row: under, over. Push tight. Glue ends.",
    sped: "Wider strips (5 cm), fewer of them. Pre-cut. Tape loom already on the desk.",
    ta: "Get row 1 right. Do not re-cut a whole set because row 4 is loose — beat it snug.",
    plan: {
      hook: "Cloth is a technology. Paper lets us see the over-under in a period.",
      objectives: ["Cut consistent strips.", "Complete a plain weave.", "Compare tear strength to a single strip."],
      assessment: ["A hemmed mat.", "Pattern is a checkerboard.", "Oral: warp vs. weft."],
      snags: ["Two rows in a row with the same over-under.", "Strips of mixed width."],
      extend: "Twills (over-two under-one) or a woven box wall.",
    },
  },
  {
    id: "copter",
    name: "Seed copter",
    family: "fly",
    teConcept: "Autorotation: a falling paper rotor converts drop into spin; test from a height",
    grades: "3–8",
    time: "25–35 min",
    materials: ["1 sheet makes several", "scissors", "paperclip optional"],
    mst: ["TS", "ED", "HT"],
    blurb: c(
      "Cut a maple-seed flyer. Drop it. It spins down. Add a paperclip. Does it spin faster or fall faster?",
      "A paper helicopter autorotates. Drop from a measured height. Change blade length or nose mass and time the fall.",
      "Autorotation: airflow up through the rotors produces rotation and some lift. History: maple seeds. Mass vs. blade area is the tradeoff.",
    ),
    spec: "Three drops from the same height. After one change, say whether hang time went up or down — with numbers.",
    steps: [
      {
        title: "Cut the blank",
        minutes: "6 min",
        visual: "copter-cut",
        body: c("Cut a strip about three fingers wide and as long as the page. Cut a slit down the middle of the top half — two blades. Fold the bottom into a stem.", "From a long strip: slit down from the top (two rotors). Two small side cuts at mid-length, fold those shoulders in. Fold the bottom third up as a fuselage.", "Rotor length, rotor width, and fuselage mass are your three easy parameters. Cut two copters so v2 is ready."),
      },
      {
        title: "Set the rotors",
        minutes: "3 min",
        visual: "copter-blades",
        body: c("Fold one top blade toward you, the other away. They should look like a T from the top.", "Opposite rotors: one valley, one mountain. Same-side blades cancel and it flutters.", "If both blades are valleys, you built a dart, not a rotor."),
      },
      {
        title: "Drop test",
        minutes: "8 min",
        visual: "copter-drop",
        body: c("Hold it by the stem, blades up. Drop. Watch. Three times. Count how long it stays in the air.", "Same height. Three drops. Partner counts. Record hang time and whether it spun or fluttered.", "Release with zero spin if you can — the air should start the rotor. A flicked copter is a different test."),
      },
      {
        title: "Change mass or blades",
        minutes: "8 min",
        visual: "iterate",
        body: c("Add a paperclip to the stem, or cut the blades shorter on the second copter. Three more drops.", "One variable: a paperclip (mass) or shorter blades. Predict hang time up or down, then test n=3.", "More mass → more speed → more rotor rpm, but also more weight. The net hang time is an empirical question."),
      },
    ],
    vocab: [
      { term: "rotor", meaning: "A blade that spins", es: "rotor" },
      { term: "drop test", meaning: "Let it fall from the same height every time", es: "prueba de caída" },
    ],
    ell: "Two blades, one each way. Drop. Count. Add a clip or cut blades. Drop again.",
    sped: "Pre-cut copter. Student only sets opposite blades and drops. Count out loud together.",
    ta: "Same height every drop — pick a tile on the wall. Do not help it spin as it leaves the hand.",
    plan: {
      hook: "A maple seed is a technology living things already shipped. We copy it in paper.",
      objectives: ["Build an autorotating copter.", "Run a controlled drop test.", "Change one parameter and report the direction of change."],
      assessment: ["Six hang times.", "Spin vs. flutter noted.", "A prediction written before v2."],
      snags: ["Both blades the same way.", "Throwing instead of dropping."],
      extend: "Class scatter plot: paperclips vs. hang time.",
    },
  },
];

export const LABS: Lab[] = [...CORE_LABS, ...MORE_LABS];

export const LAB_IDS = LABS.map((l) => l.id);

export function isLabId(id: string): boolean {
  return LAB_IDS.includes(id);
}

export function getLab(id: string) {
  return LABS.find((l) => l.id === id);
}

export function labThumb(lab: Lab) {
  if (lab.steps[0]) return lab.steps[0].visual;
  if (lab.id === "cube" || lab.id === "solids" || lab.id === "box") return "box-walls";
  if (lab.id === "balloon") return "square-cut";
  if (lab.id === "draw" || lab.id === "nets") return "system";
  return "iterate";
}

export function labNeighbors(id: string) {
  const i = LAB_IDS.indexOf(id);
  return {
    prev: LABS[(i - 1 + LABS.length) % LABS.length],
    next: LABS[(i + 1) % LABS.length],
  };
}
