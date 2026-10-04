import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images/plans");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const files = await walk(root);
let stripped = 0;
for (const file of files) {
  if (file.endsWith(".jpg")) {
    await unlink(file);
    stripped += 1;
    continue;
  }
  if (!file.endsWith(".svg")) continue;
  const raw = await readFile(file, "utf8");
  const next = raw.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, "");
  if (next !== raw) {
    await writeFile(file, next);
    stripped += 1;
  }
}
console.log(`stripped plan text from ${stripped} files`);
