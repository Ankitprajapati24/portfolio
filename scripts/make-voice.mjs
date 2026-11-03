// Generates the "Know about me" narration with Sarvam AI text-to-speech.
// Run:  npm run voice            (all lines)
//       npm run voice -- --limit 2   (just the first 2 lines, to hear the voice)
//
// Needs a .env file next to package.json with:  SARVAM_API_KEY=your_key
// Optional in .env:  SARVAM_SPEAKER=shubh   SARVAM_MODEL=bulbul:v3   SARVAM_PACE=1
//
// Audio goes to public/voice/. Lines that already have audio are skipped,
// so after editing content.js only the changed lines are re-generated.
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { STORY } from "../src/data/content.js";
import { lineId, sentences } from "../src/lib/sentences.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "voice");

// Read .env without extra packages.
const envFile = join(root, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const key = process.env.SARVAM_API_KEY;
if (!key) {
  console.error("Missing SARVAM_API_KEY. Create a .env file next to package.json containing:\nSARVAM_API_KEY=your_key");
  process.exit(1);
}
const model = process.env.SARVAM_MODEL || "bulbul:v3";
const speaker = process.env.SARVAM_SPEAKER || "shubh";
const pace = Number(process.env.SARVAM_PACE || 1);
const limitArg = process.argv.indexOf("--limit");
const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) : Infinity;

mkdirSync(outDir, { recursive: true });
const manifestPath = join(outDir, "manifest.json");
const old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { lines: {} };
// A different voice or model means everything must be re-made.
const sameVoice = old.speaker === speaker && old.model === model && old.pace === pace;
const lines = sameVoice ? { ...old.lines } : {};

const all = STORY.flatMap((s) => sentences(s.speak)).slice(0, limit);
const wanted = new Set(all.map(lineId));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let made = 0;
for (const text of all) {
  const id = lineId(text);
  if (lines[id] && existsSync(join(root, "public", lines[id]))) continue;
  const res = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: { "api-subscription-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({ text, language_code: "en-IN", model, speaker, pace, speech_sample_rate: 24000, output_audio_codec: "mp3" }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sarvam error ${res.status}: ${body.slice(0, 300)}`);
    process.exit(1);
  }
  const data = await res.json();
  const bytes = Buffer.from(data.audios.join(""), "base64");
  // Use the real format of what came back.
  const ext = bytes.subarray(0, 4).toString("ascii") === "RIFF" ? "wav" : "mp3";
  const file = `voice/${id}.${ext}`;
  writeFileSync(join(root, "public", file), bytes);
  lines[id] = file;
  made++;
  console.log(`✓ ${text.slice(0, 70)}${text.length > 70 ? "…" : ""}`);
  await sleep(1100); // stay under 60 requests a minute
}

// Remove audio for lines that no longer exist (only on a full run).
if (limit === Infinity) {
  for (const [id, file] of Object.entries(lines)) if (!wanted.has(id)) delete lines[id];
  const keep = new Set(Object.values(lines).map((f) => f.split("/")[1]));
  for (const f of readdirSync(outDir)) if (f !== "manifest.json" && !keep.has(f)) unlinkSync(join(outDir, f));
}

writeFileSync(manifestPath, JSON.stringify({ model, speaker, pace, lines }, null, 2));
console.log(`Done. ${made} new line(s), ${Object.keys(lines).length} total, voice "${speaker}" (${model}).`);
