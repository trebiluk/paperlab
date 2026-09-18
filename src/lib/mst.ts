/** NYSED Mathematics, Science, and Technology — Standard 5 (Technology). */

export type MstCode = "ED" | "TR" | "CT" | "TS" | "HT" | "IT" | "MT";

export const MST5_STATEMENT =
  "Students will apply technological knowledge and skills to design, construct, use, and evaluate products and systems to satisfy human and environmental needs.";

export const MST_KEY_IDEAS: {
  code: MstCode;
  name: string;
  key: string;
  elementary: string;
  intermediate: string;
}[] = [
  {
    code: "ED",
    name: "Engineering design",
    key: "Engineering design is an iterative process involving modeling and optimization used to develop technological solutions to problems within given constraints.",
    elementary: "Describe, sketch, and build a model of a solution. Test it. Change one thing and test again.",
    intermediate: "Name the need, list constraints, generate more than one idea, draw a plan with measurements, construct with craftsmanship, test against specs, and discuss tradeoffs.",
  },
  {
    code: "TR",
    name: "Tools, resources, and processes",
    key: "Technological tools, materials, and other resources should be selected on the basis of safety, cost, availability, appropriateness, and environmental impact; technological processes change energy, information, and material resources into more useful forms.",
    elementary: "Choose paper, scissors, and glue for the job. Folding, cutting, and joining are processes that change a sheet into a product.",
    intermediate: "Compare materials (copy paper vs. card stock) and processes (valley fold vs. cut) for safety, cost, waste, and how well they fit the spec.",
  },
  {
    code: "CT",
    name: "Computer technology",
    key: "Computers, as tools for design, modeling, information processing, communication, and system control, have greatly increased human productivity and knowledge.",
    elementary: "Use this lab to see a model of the fold before you cut. A picture on a screen is a model, not the product.",
    intermediate: "Treat on-screen developments and crease diagrams as computer models. The paper in your hands is the prototype.",
  },
  {
    code: "TS",
    name: "Technological systems",
    key: "Technological systems are designed to achieve specific results and produce outputs, such as products, structures, services, energy, or other systems.",
    elementary: "Name the parts. What goes in (input), what you do (process), what comes out (output).",
    intermediate: "Describe subsystems (wings, fuselage, hinge) and how they interact. Control means sensing a result and changing an input.",
  },
  {
    code: "HT",
    name: "History and evolution of technology",
    key: "Technology has been the driving force in the evolution of society from an agricultural to an industrial to an information base.",
    elementary: "People folded paper, hides, and leaves long before printers. Packaging, kites, and maps are old paper technologies.",
    intermediate: "Paper folding (origami), kirigami, and sheet-metal developments are the same idea: a flat stock becomes a 3-D product. Factories still unfold boxes this way.",
  },
  {
    code: "IT",
    name: "Impacts of technology",
    key: "Technology can have positive and negative impacts on individuals, society, and the environment, and humans have the capability and responsibility to constrain or promote technological development.",
    elementary: "One sheet, no kit. That is a small-waste prototype. Scissors can still hurt. Glue on clothes is a cost.",
    intermediate: "Paper prototypes are cheap and recyclable, but a class set is still a forest product. Choose reuse (the leftover strip) and name who is helped or left out by a design.",
  },
  {
    code: "MT",
    name: "Management of technology",
    key: "Project management, resource management, and quality control are used to plan, organize, and control technological processes.",
    elementary: "Watch the clock. Share scissors. Check your work against the picture before the next step.",
    intermediate: "Plan the period: materials out, roles (cutter, folder, tester, recorder), a quality check (square corners, sharp creases), and clean-up as part of the process.",
  },
];

export const OTHER_MST = [
  {
    code: "MST 1",
    name: "Analysis, inquiry, and design",
    body: "Pose a question or need, seek answers, and develop a solution — by math, science, or engineering design.",
  },
  {
    code: "MST 6",
    name: "Interconnectedness",
    body: "Systems, models, magnitude, and optimization connect math, science, and technology. A paper bridge is all three.",
  },
  {
    code: "MST 7",
    name: "Interdisciplinary problem solving",
    body: "Use MST thinking on a real constraint — one sheet, one period, a load that has to hold.",
  },
];

export function mstName(code: MstCode) {
  return MST_KEY_IDEAS.find((k) => k.code === code)?.name ?? code;
}
