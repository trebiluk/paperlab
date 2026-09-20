export const UNITS: {
  id: string;
  name: string;
  days: string;
  grades: string;
  body: string;
  labs: string[];
}[] = [
  {
    id: "start",
    name: "Start the shop",
    days: "2–3 periods",
    grades: "2–8",
    body: "Process words first: crease, valley, mountain, square a rectangle. Then a first sitting product.",
    labs: ["folds", "crane", "draw", "balloon"],
  },
  {
    id: "package",
    name: "Make and package",
    days: "4–5 periods",
    grades: "3–8",
    body: "A flat blank becomes a container, a wallet, a frame, or a solid. Tabs, locks, handles, and leftover strip as waste or a part.",
    labs: ["cube", "box", "envelope", "cup", "hat", "solids", "bag", "wallet", "frame"],
  },
  {
    id: "flight",
    name: "Flight tests",
    days: "3–4 periods",
    grades: "3–8",
    body: "Same sheet, different airframes. A kite, a dart, a taped line, a count, and one documented change.",
    labs: ["dart", "glider", "copter", "chute", "kite"],
  },
  {
    id: "structures",
    name: "Hold a load",
    days: "3–4 periods",
    grades: "3–8",
    body: "Columns, beams, hulls, and tension links. Fail mode is the lesson.",
    labs: ["beam", "tower", "bridge", "chain", "boat"],
  },
  {
    id: "machines",
    name: "Mechanisms",
    days: "4–5 periods",
    grades: "2–8",
    body: "Hinges, rotors, springs, levers, a grabber, a whirligig, and a ramp. Input, process, output.",
    labs: ["popup", "pinwheel", "frog", "catapult", "ramp", "grabber", "whirligig"],
  },
  {
    id: "models",
    name: "Models and instruments",
    days: "3–4 periods",
    grades: "2–8",
    body: "Nets, a paper balance, a Möbius investigation, a vocabulary teller, a lantern, a standing flower.",
    labs: ["nets", "balance", "mobius", "teller", "lantern", "flake", "weave", "flower"],
  },
];

export function unitsFor(labId: string) {
  return UNITS.filter((u) => u.labs.includes(labId));
}

/** Year order: walk this list, not the data-file order. */
export const PERIOD_PATH = UNITS.flatMap((u) => u.labs);

export function unitForLab(labId: string) {
  return UNITS.find((u) => u.labs.includes(labId));
}

export function pathIndex(labId: string) {
  return PERIOD_PATH.indexOf(labId);
}
