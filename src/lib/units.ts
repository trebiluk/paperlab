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
    days: "5 periods",
    grades: "2–6",
    body: "Valley and mountain on scrap. Then a square, a hat, a cup, and a pinwheel.",
    labs: ["folds", "balloon", "hat", "cup", "pinwheel"],
  },
  {
    id: "package",
    name: "Make and package",
    days: "8 periods",
    grades: "2–8",
    body: "A flat sheet becomes an envelope, a frame, a bag, a wallet, Berty, a box, or a cube. The development drawing waits until the end of the year.",
    labs: ["envelope", "frame", "bag", "wallet", "berty", "box", "cube", "solids"],
  },
  {
    id: "flight",
    name: "Flight tests",
    days: "5 periods",
    grades: "3–8",
    body: "Same sheet, different airframes. A kite, a dart, a taped line, a count, and one documented change.",
    labs: ["dart", "copter", "chute", "kite", "glider"],
  },
  {
    id: "structures",
    name: "Hold a load",
    days: "5 periods",
    grades: "3–8",
    body: "A chain, a boat, a tower, then a bridge. The brick beam is last. Grades 2–4 skip it.",
    labs: ["chain", "boat", "tower", "bridge", "beam"],
  },
  {
    id: "machines",
    name: "Mechanisms",
    days: "6 periods",
    grades: "2–8",
    body: "A frog, a pop-up, a catapult, a whirligig, a ramp, and a grabber. Input, process, output.",
    labs: ["frog", "popup", "catapult", "whirligig", "ramp", "grabber"],
  },
  {
    id: "models",
    name: "Models and instruments",
    days: "10 periods",
    grades: "2–8",
    body: "Weave, a flower, a lantern, a flake, a teller, a balance, a Möbius strip, and nets. The crane and the development drawing are last.",
    labs: ["weave", "flower", "lantern", "flake", "teller", "balance", "mobius", "nets", "crane", "draw"],
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
