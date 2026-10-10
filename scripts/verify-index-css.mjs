import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = path.join(root, "src", "index.css");
const minLines = 18_000;
const requiredSnippets = [
  ".read-m3__split",
  ".listen-m3b__panel",
  ".read-m3__lang-tab",
];

const text = fs.readFileSync(cssPath, "utf8");
const lines = text.split(/\r?\n/).length;

if (lines < minLines) {
  console.error(
    `index.css looks truncated (${lines} lines; expected at least ${minLines}). Restore trainer styles from git before building.`,
  );
  process.exit(1);
}

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    console.error(`index.css missing required rule block: ${snippet}`);
    process.exit(1);
  }
}

console.log(`index.css OK (${lines} lines, trainer styles present).`);
