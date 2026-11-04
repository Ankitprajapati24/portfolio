// Speaks a line in Ankit's recorded voice (Sarvam AI files in public/voice/, made by
// `npm run voice`). A line with no recording falls back to the browser's built-in voice.
// Only one line plays at a time, shared by "Know about me" and "Ask me anything".
import { lineId } from "./sentences";

const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;

// ── Recordings ────────────────────────────────────────────────────────────
let recordings = null; // { lineId: "voice/abc.mp3" }
export const loadRecordings = () =>
  recordings
    ? Promise.resolve(recordings)
    : fetch("voice/manifest.json")
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({}))
        .then((m) => (recordings = m.lines || {}));

// ── Browser voice (fallback) ──────────────────────────────────────────────
let browserVoice = null;
function pickVoice() {
  if (!synth) return;
  const all = synth.getVoices().filter((v) => v.lang?.toLowerCase().startsWith("en"));
  const score = (v) => {
    const s = `${v.name} ${v.lang}`;
    return (/en[-_]IN/i.test(s) ? 5 : 0) + (/prabhat|ravi|david|mark|guy|male/i.test(s) ? 3 : 0) + (/natural|online|google/i.test(s) ? 3 : 0);
  };
  browserVoice = [...all].sort((a, b) => score(b) - score(a))[0] || null;
}
if (synth) {
  pickVoice();
  synth.addEventListener?.("voiceschanged", pickVoice);
}

function speakWithBrowser(text, done) {
  if (!synth) {
    setTimeout(done, Math.max(1600, text.split(/\s+/).length * 380));
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  if (browserVoice) { u.voice = browserVoice; u.lang = browserVoice.lang; }
  u.rate = 0.98;
  u.onend = done;
  u.onerror = done;
  synth.speak(u);
}

// ── Playback ──────────────────────────────────────────────────────────────
let current = null; // the <audio> playing now
let finishCurrent = null; // resolves the line in progress

/** Speak one line. Resolves when it ends or is silenced. */
export function say(text) {
  silence();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (finishCurrent === finish) finishCurrent = null;
      current = null;
      resolve();
    };
    finishCurrent = finish;
    const file = recordings?.[lineId(text)];
    if (!file) { speakWithBrowser(text, finish); return; }
    const a = new Audio(file);
    current = a;
    const fallback = () => { if (!done && current === a) { current = null; speakWithBrowser(text, finish); } };
    a.onended = finish;
    a.onerror = fallback;
    a.play().catch(fallback);
  });
}

/** Stop whatever is being said right now. */
export function silence() {
  synth?.cancel();
  if (current) {
    current.onended = null;
    current.onerror = null;
    current.pause();
    current = null;
  }
  finishCurrent?.();
}
