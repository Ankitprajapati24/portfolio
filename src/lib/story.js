// "Know about me": scrolls to each section and reads it aloud in first person.
// Uses Sarvam AI recordings from public/voice/ (made by `npm run voice`); any line
// without a recording falls back to the browser's built-in voice.
import { useSyncExternalStore } from "react";
import { STORY } from "../data/content";
import { scrollToSection, scrollToY, sectionTop } from "./ui";
import { duckMusic } from "./music";
import { lineId, sentences } from "./sentences";
import { pauseSpotify } from "./spotify";

const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;

let state = { status: "idle", index: -1, caption: "" };
const listeners = new Set();
const set = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

export function useStory() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
  );
}

// ── Sarvam recordings ─────────────────────────────────────────────────────
let recordings = null; // { lineId: "voice/abc.mp3" }
const loadRecordings = () =>
  recordings
    ? Promise.resolve(recordings)
    : fetch("voice/manifest.json")
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({}))
        .then((m) => (recordings = m.lines || {}));
let current = null; // the <audio> playing now

// ── Browser voice (fallback) ──────────────────────────────────────────────
let voice = null;
function pickVoice() {
  if (!synth) return;
  const all = synth.getVoices().filter((v) => v.lang?.toLowerCase().startsWith("en"));
  const score = (v) => {
    const s = `${v.name} ${v.lang}`;
    return (/en[-_]IN/i.test(s) ? 5 : 0) + (/prabhat|ravi|david|mark|guy|male/i.test(s) ? 3 : 0) + (/natural|online|google/i.test(s) ? 3 : 0);
  };
  voice = [...all].sort((a, b) => score(b) - score(a))[0] || null;
}
if (synth) {
  pickVoice();
  synth.addEventListener?.("voiceschanged", pickVoice);
}

function speakWithBrowser(text, resolve) {
  if (!synth) {
    setTimeout(resolve, Math.max(1600, text.split(/\s+/).length * 380));
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  if (voice) { u.voice = voice; u.lang = voice.lang; }
  u.rate = 0.98;
  u.onend = resolve;
  u.onerror = resolve;
  synth.speak(u);
}

function say(text) {
  return new Promise((resolve) => {
    const file = recordings?.[lineId(text)];
    if (!file) { speakWithBrowser(text, resolve); return; }
    const a = new Audio(file);
    current = a;
    let done = false;
    const end = (fallback) => {
      if (done) return;
      done = true;
      current = null;
      if (fallback) speakWithBrowser(text, resolve);
      else resolve();
    };
    a.onended = () => end(false);
    a.onerror = () => end(true);
    a.play().catch(() => end(true));
  });
}

function silence() {
  synth?.cancel();
  if (current) {
    current.onended = null;
    current.onerror = null;
    current.pause();
    current = null;
  }
}

// ── Story ─────────────────────────────────────────────────────────────────
// Every run gets a token; callbacks from a stopped run are ignored.
let token = 0;
let position = { index: 0, line: 0 };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Sections marked data-scrub (the sideways timeline) move along with the sentences. */
function follow(id, line, count) {
  const el = document.getElementById(id);
  if (!el?.hasAttribute("data-scrub") || count < 2) return;
  const travel = el.offsetHeight - window.innerHeight;
  scrollToY(sectionTop(id) + travel * (line / (count - 1)), 1.1);
}

async function run(my, from) {
  duckMusic(true);
  pauseSpotify(); // the voice shouldn't talk over a Spotify song
  await loadRecordings();
  if (my !== token) return;
  for (let i = from.index; i < STORY.length; i++) {
    const step = STORY[i];
    const lines = sentences(step.speak);
    const startLine = i === from.index ? from.line : 0;
    set({ index: i });
    if (startLine === 0) {
      await scrollToSection(step.id);
      if (my !== token) return;
    }
    for (let l = startLine; l < lines.length; l++) {
      position = { index: i, line: l };
      set({ caption: lines[l] });
      follow(step.id, l, lines.length);
      await say(lines[l]);
      if (my !== token) return;
      await wait(150);
      if (my !== token) return;
    }
    await wait(500);
    if (my !== token) return;
  }
  position = { index: 0, line: 0 };
  duckMusic(false);
  set({ status: "idle", index: -1, caption: "" });
}

export function startStory(fromIndex = 0) {
  silence();
  const my = ++token;
  set({ status: "playing" });
  run(my, { index: fromIndex, line: 0 });
}

export function pauseStory() {
  token++;
  silence();
  duckMusic(false);
  set({ status: "paused" });
}

export function resumeStory() {
  const my = ++token;
  set({ status: "playing" });
  run(my, position);
}

export function stopStory() {
  token++;
  silence();
  duckMusic(false);
  position = { index: 0, line: 0 };
  set({ status: "idle", index: -1, caption: "" });
}
