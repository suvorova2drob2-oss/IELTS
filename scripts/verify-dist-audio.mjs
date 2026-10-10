import fs from "node:fs";
import path from "node:path";

const distAudio = path.join("dist", "audio", "expert");
const required = [
  "module-2/Expert IELTS_Cbk_7_5 Track 02_02.mp3",
  "module-3/Expert IELTS_Cbk_7_5 Track 03_04.mp3",
  "module-3/Expert IELTS_Cbk_7_5 Track 03_06.mp3",
];

const missing = required.filter((rel) => !fs.existsSync(path.join(distAudio, rel)));

if (missing.length) {
  console.error("Build is missing coursebook audio in dist/ (public/ was not copied):");
  for (const m of missing) console.error("  -", m);
  console.error("Run npm run build again. If this persists, check public/audio/expert/.");
  process.exit(1);
}

console.log("dist/audio OK (" + required.length + " spot-check files present).");
