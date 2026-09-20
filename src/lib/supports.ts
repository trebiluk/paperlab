/** Classroom supports that wrap every lab. Lab-specific notes live on the lab. */

export const ELL = {
  language: "Spanish first, then frames that work in any home language",
  why: "New York classrooms often have Spanish-speaking multilingual learners. Picture-first steps and sentence frames help every ELL, not only Spanish speakers.",
  frames: [
    "I need to ___ because ___.",
    "A constraint (límite) is ___.",
    "My input is ___. The process is ___. The output is ___.",
    "I will change ___ and then test ___.",
    "This worked because ___. This failed because ___.",
    "A tradeoff (compromiso) is ___ for ___.",
  ],
  cognates: [
    { en: "paper", es: "papel", say: "pah-PEL" },
    { en: "fold", es: "doblar", say: "do-BLAR" },
    { en: "cut", es: "cortar", say: "cor-TAR" },
    { en: "glue", es: "pegar", say: "peh-GAR" },
    { en: "edge", es: "borde", say: "BOR-deh" },
    { en: "measure", es: "medir", say: "meh-DEER" },
    { en: "design", es: "diseño", say: "dee-SEH-nyo" },
    { en: "model", es: "modelo", say: "mo-DEH-lo" },
    { en: "system", es: "sistema", say: "sees-TEH-mah" },
    { en: "structure", es: "estructura", say: "es-truc-TOO-rah" },
    { en: "force", es: "fuerza", say: "FWER-sah" },
    { en: "test", es: "probar", say: "pro-BAR" },
    { en: "material", es: "material", say: "mah-teh-ree-AL" },
    { en: "process", es: "proceso", say: "pro-SEH-so" },
    { en: "product", es: "producto", say: "pro-DUC-to" },
    { en: "constraint", es: "límite / restricción", say: "LEE-mee-teh" },
  ],
  moves: [
    "Point to the diagram, then say the word, then have the student say it.",
    "Partner talk before whole-class: 20 seconds in home language is allowed, then one sentence in English.",
    "Keep one action per step. Do not stack fold-and-cut in the same sentence on Easy.",
    "Cognates first: design/diseño, system/sistema, material/material.",
    "A picture of the finished model stays on the desk the whole period.",
  ],
};

export const SPED = {
  fineMotor: [
    "Pre-crease with a ruler edge for students who cannot press hard.",
    "Offer pre-cut nets and bigger tabs (½ in) — the thinking is the fold, not the scissor skill.",
    "Loop scissors, left-handed scissors, and a rolling cutter (teacher-only) as tools, not prizes.",
    "Tape instead of glue for students who mash glue sticks. Tape is a valid joining process.",
    "Larger paper (B or A3) for the same net — same math, bigger target.",
  ],
  attention: [
    "One step card visible. Cover the rest with a sheet.",
    "Timer per step (2–4 min). A helper checks in at the beep, not over the shoulder the whole time.",
    "Stand-up test (fly, load, measure) as a movement break.",
    "Reduced-step path: skip decoration and dimensioning; keep design, make, test.",
  ],
  access: [
    "Print the development at 1:1. Thick cut line, dashed fold, no extra notes.",
    "Read-aloud of each step. Easy reading level is the default for this student unless they ask up.",
    "Scribe for the data table. The student still flies the plane / loads the bridge.",
    "Noise: paper tests can be a hallway or a taped line on the floor, not a shouting gym.",
    "If a student cannot cut, they still fold, test, and record. Roles are interchangeable, not ranked.",
  ],
  alt: [
    "Alternate product: a printed net they fold, or a digital drag-to-fold on the cube slider, plus one physical fold on scrap.",
    "Alternate assessment: oral — name input, process, output, and one change they would try.",
    "Do not replace the make with a worksheet. A worksheet is not Standard 5.",
  ],
};

export const TA = {
  stance:
    "A helper keeps the student doing the thinking. Hands stay off the student’s paper unless safety is at risk.",
  do: [
    "Read the step aloud once. Point to the matching diagram.",
    "Hold the sheet while they crease, if they ask. They line the edges up.",
    "Ask: “What does the picture show next?” before showing.",
    "Record numbers they say. Do not decide the next design change.",
    "Watch scissors: blades closed when walking, two hands on the sheet when cutting.",
  ],
  say: [
    "“Line the edges up first. Then press.”",
    "“Show me the dashed line. We fold that. We do not cut it.”",
    "“Change one thing. If you change two, we will not know why it worked.”",
    "“That crease is soft. Run a fingernail along it.”",
    "“You try, then I check.”",
  ],
  dont: [
    "Do not finish the model “so they have one.” A half-folded plane they tested beats a perfect one you made.",
    "Do not skip the test. The test is the standard.",
    "Do not translate the whole period into doing it for them. Translate the word, then wait.",
    "Do not compare speed. Craftsmanship is the spec, not first-done.",
  ],
  watch: [
    "Frustration at a collapse or a tear — offer scrap, not a takeover.",
    "Glue on a hinge (fold line) — wipe and re-fold. Hinges must move.",
    "Cutting a dashed line — stop, tape the cut, start a new sheet if needed.",
    "A student done 10 minutes early — they become a tester or they iterate, not a phone.",
  ],
};

export const SAFETY = [
  "Scissors stay on the desk. Pass them closed, handle first.",
  "No running with a model in progress. Test flights go one direction, marked on the floor.",
  "Glue sticks only unless the teacher names white glue. Caps on.",
  "Origami inflate: one slow breath. No sharing a balloon mouth-to-mouth — each student has their own.",
  "Pinwheels and copters: pencil points away from eyes. No throwing at people.",
  "Allergies: leftover food is not a bridge load. Use an eraser, glue stick, or coins.",
  "Water labs (boat, cup): trays on every desk, towels ready, no walking with a wet model.",
  "Catapult: eraser payload only. Downrange is a wall or empty floor — never a face.",
  "Brick Beam: bricks sit on the hanging picture circle only. The circle must hang free — nobody reaches under it during the count. Crew Leader says GO. If it fails, step back, then pick up bricks. Closed-toe shoes at the cart.",
  "Chair-height drops (chute, copter): the teacher stands on the chair, or use a marked shelf. Students count.",
  "Paper lanterns are models. No candles, no lighters. An electric tea-light only if the teacher says so.",
  "String toys (whirligig, kite bridle): string stays on the desk until the test. Loops on fingers. Never around a neck.",
  "Paper grabber: tips away from eyes and faces. Carry an eraser, not a pencil point.",
];

export const DESIGN_LOOP = [
  { id: "ask", name: "Ask", body: "What is the need? Who is it for?" },
  { id: "imagine", name: "Imagine", body: "More than one idea. No judging yet." },
  { id: "plan", name: "Plan", body: "A drawing with measurements. A materials list." },
  { id: "make", name: "Make", body: "Build the prototype. Craftsmanship counts." },
  { id: "test", name: "Test", body: "Run it against the spec. Write the number down." },
  { id: "improve", name: "Improve", body: "Change one thing. Test again. Name the tradeoff." },
];

export const IEP = {
  principle:
    "The standard stays: design, construct, use, and evaluate. The spec, the tools, the time, and the grouping change. A worksheet is not an alternate product.",
  rows: [
    {
      need: "Fine motor / OT",
      try: "Pre-cut nets, ½-inch tabs, tape, B or A3 paper, loop scissors",
      not: "Taking the make away so they color a picture of a cube",
    },
    {
      need: "Attention / ADHD",
      try: "One step card, 3-minute timer, stand-up test as a break",
      not: "Removing scissors as a punishment mid-lab",
    },
    {
      need: "Reading / dyslexia",
      try: "Easy reading, read-aloud, scribe for the data table",
      not: "Stretch text “for more English practice”",
    },
    {
      need: "Autism / sensory",
      try: "Predictable steps, quiet test zone, mascot as the hat user",
      not: "Surprise water, loud launches at the desk, forced headwear",
    },
    {
      need: "Multilingual learner",
      try: "Easy + diagram, Spanish cognates, one verb per step",
      not: "A paragraph reflection as the only assessment",
    },
    {
      need: "504 fatigue / reduced load",
      try: "Reduced-step path: design, make, test — skip decoration",
      not: "A helper finishing the model so they “have one”",
    },
  ],
};

export const HOME_LANG = {
  why: "New York classrooms often include Spanish, Chinese, Arabic, Bengali, Haitian Creole, and more. Spanish cognates are printed because they are the most common. For every other home language, the diagram and Easy reading are the access tools.",
  moves: [
    "Easy reading plus the picture on the desk is the default for any home language.",
    "Twenty seconds of partner talk in home language, then one English sentence frame.",
    "A bilingual staff member or a picture card beats a bad machine translation of the whole lab.",
    "Oral input-process-output is a valid product. Do not require a written paragraph on Easy.",
    "Cognates first when they exist: design/diseño, system/sistema, material/material.",
  ],
};

export const TA_DAY = [
  "Read the helper card on today’s lab before students sit. Set Room to Helper in the bar.",
  "Know the spec in one sentence (“pass the tape, 2 of 3”).",
  "Scrap paper, tape, and a towel within reach so a tear is not the end.",
  "You record numbers they say. They pick the one change.",
  "Hands off the student’s paper unless a blade or an eye is at risk.",
];

export const CLOSING = [
  "What was the input, the process, and the output?",
  "What number did you write down?",
  "If you had one more period, which one thing would you change?",
];
