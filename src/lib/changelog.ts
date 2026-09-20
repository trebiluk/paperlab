/** Teacher-facing shop notes. Newest first. */

export type ShopNote = {
  date: string;
  title: string;
  items: string[];
};

export const UPDATES: ShopNote[] = [
  {
    date: "2026-09-20",
    title: "Seven take-home crafts",
    items: [
      "New labs you keep: diamond kite, carry bag, billfold, standing frame, kirigami flower, paper grabber, and whirligig.",
      "Every lab now has a written challenge on the student page — a test, not just a make.",
      "Year path grew: bags and frames in Make, kite in Fly, grabber and whirligig in Move, flower with the flakes.",
      "Shop rules for string toys, grabber tips, and paper lanterns (still no flame).",
    ],
  },
  {
    date: "2026-09-20",
    title: "Period path, step links, shop notes",
    items: [
      "Labs follow the year order: Start the shop → Make → Fly → Hold → Move → Models.",
      "Each step has a URL. Refresh a Chromebook and the class is still on step 3. Left and right arrows move the stepper.",
      "Last step goes to the next lab, not the lesson plan. “We made this” checkmarks stay on the device.",
      "Materials, the challenge, and one shop-safety line sit on the student lab page.",
      "Shop notes (this page) replace the leftover cube-only /teacher link, which now opens the cube plan.",
      "Diagrams on the labs grid no longer share one SVG id, so grain and shadows stay put.",
    ],
  },
  {
    date: "2026-09-18",
    title: "Papercraft Berty and the hanging circle",
    items: [
      "BertyBot is a cube-net foldable: pixel face, box limbs, glue tab, printed head net on the desk.",
      "Cube nets use Minecraft-foldable language: solid cut, dashed fold, triangle tabs.",
      "Brick Beam Challenge uses the shop hanger stick, the hanging picture circle, and the Testing Canyon Cart. The circle must hang free of the second shelf.",
      "Shop drawings in every lab: grain, fold arrows, ISO / TOP / FRONT / SIDE chips.",
      "New share card and X banner — papercraft Berty on cream graph paper.",
    ],
  },
  {
    date: "2026-09-17",
    title: "PaperLab opens",
    items: [
      "31 paper labs with Easy / Class / Stretch reading, ELL, extra help, and helper cards.",
      "NYSED MST Standard 5 keyed on every lab.",
      "Studio still has the net cube, origami balloon, developments, and eleven nets.",
    ],
  },
];

export const LATEST_UPDATE = UPDATES[0];

export function formatShopDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
