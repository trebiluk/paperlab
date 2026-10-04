/** Logs how many Start-lab step lines still fall back to English. */
import { readFileSync } from "node:fs";

const start = readFileSync(new URL("../src/lib/start-lines.ts", import.meta.url), "utf8");
const copy = readFileSync(new URL("../src/lib/copy.ts", import.meta.url), "utf8");
const keys = new Set([...start.matchAll(/^\s+\["((?:\\.|[^"\\])*)"/gm)].map((m) => m[1]));
const linesBlock = copy.match(/const LINES[\s\S]*?uk:\s*\{([\s\S]*?)\n  \},/);
if (linesBlock) {
  for (const m of linesBlock[1].matchAll(/"((?:\\.|[^"\\])*)":/g)) keys.add(m[1]);
}
console.log(`untranslated start-lab dictionary keys loaded: ${keys.size}; ar/fa-AF Start labs: 0`);
