/** Teacher-facing shop notes. Newest first. */

export type ShopNote = {
  date: string;
  title: string;
  items: string[];
};

export const UPDATES: ShopNote[] = [
  {
    date: "2026-09-22",
    title: "Labs open in a side sheet",
    items: [
      "Every plan except the locking envelope now uses a real fold diagram image on each step. You need, numbered steps, and Done when stay.",
      "The make page is one lab. Top bar is the title and Back to hub.",
      "Labs opens a left side sheet: Start, Make, Fly, Hold, Move, Fold, Draw, plus Easy, Class, Stretch, skills, helper, and search.",
      "The diagram bar stays. The envelope plan is unchanged: diagram 5 is still the shake test.",
    ],
  },
  {
    date: "2026-09-22",
    title: "Every plan has kid steps",
    items: [
      "Each plan opens with You need, a diagram, and one action per line — the same bar as the locking envelope.",
      "Studio labs (cube, balloon, folds, drawing, nets, solids) have their own pictures. No “Missing” caption.",
      "Done when, Stuck, and Words sit on the student make. Labels use an alias, not a legal name.",
      "The locking envelope plan is unchanged: diagram 5 is still the shake test.",
    ],
  },
  {
    date: "2026-09-22",
    title: "Envelope plan shows the folds",
    items: [
      "The locking envelope plan leads with five diagrams and twenty short steps.",
      "Diagram 5 is the ten-shake test. A finished picture is only a bonus look.",
      "Done when, Stuck, and Words sit on the same page.",
      "Other plans lead with Easy steps, a picture, and Done when.",
    ],
  },
  {
    date: "2026-09-22",
    title: "Watch slip, same sentences as the desk",
    items: [
      "Skills prints a Watch slip: Gold, the eight practice marks, and the evidence sentence — no name.",
      "Copy the sentence or print the slip. Tap 1–4 on the TechWorks desk; that is the grade.",
      "Same stems as TechWorks: Beginning through Distinguished, observable in the room.",
    ],
  },
  {
    date: "2026-09-22",
    title: "Gold XP, eight skills, a door to TechWorks",
    items: [
      "Mark a lab made and it counts as Gold XP on this Chromebook — Cub through Legend, same bands as the desk.",
      "Eight shop skills: Safety, Measure, Draw, Model, Tools, Finish, Present, Team. Practice, not the posted 1–4.",
      "Skills lives in the bar. The grade and the evidence sentence still live in TechWorks.",
      "A shop card of the eight skills, two-up, for a desk or a plan book.",
    ],
  },
  {
    date: "2026-09-22",
    title: "Looks stay on the Tech Room door",
    items: [
      "Figtree and Fraunces load from this lab, not Google Fonts — Chromebooks keep the type even when outside fonts are blocked.",
      "Labs, Plans, and Studio links stay under /paperlab/ on apps.kulibert.net.",
    ],
  },
  {
    date: "2026-09-21",
    title: "Easy shows Spanish; keyboard and the design loop",
    items: [
      "Easy reading keeps Spanish vocab and sentence frames. Specs and MST codes stay on Class and Stretch.",
      "The design loop marks the step you are on: Ask, Plan, Make, Test, or Improve.",
      "Plans for grades 2–4 use the elementary MST wording. Helper cards include what to watch.",
      "Skip to content, focus rings, and filter chips read as navigation. Diagrams on lab cards stay quiet for a screen reader.",
    ],
  },
  {
    date: "2026-09-21",
    title: "Print true-size, Easy in the studio, grade bands",
    items: [
      "Print the cube net at 1:1 — the face on the page is the face in the hand. Same for the other solids.",
      "Easy reading now covers the net cube and origami balloon, not only the period labs.",
      "Filter the year path by grade band: 2–4, 5–6, or 7–8.",
      "Pinwheel axle, pinwheel spin, and ramp steep each have their own shop drawing.",
      "Grain, fold arrows, and net diagrams no longer share one SVG id, so a grid of drawings stays put.",
    ],
  },
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
