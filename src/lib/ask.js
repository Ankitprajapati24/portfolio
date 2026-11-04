// "Ask me anything": listen to a spoken (or typed) question, pick the best answer from
// ASK in content.js, and speak it in Ankit's recorded voice. No server, no AI service:
// answers are written in advance, so it can only ever say true things.
import { useSyncExternalStore } from "react";
import { ASK } from "../data/content";
import { duckMusic } from "./music";
import { sentences } from "./sentences";
import { pauseSpotify } from "./spotify";
import { stopStory } from "./story";
import { scrollToSection } from "./ui";
import { loadRecordings, say, silence } from "./voice";

// phase: idle | listening | speaking
let state = { open: false, phase: "idle", heard: "", answer: "", topic: null, error: "" };
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
export const useAsk = () =>
  useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state);

// ── Matching ──────────────────────────────────────────────────────────────
const clean = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim()} `;

/** Best topic for a question, or null. Longer phrases count for more than single words. */
export function matchTopic(question) {
  const q = clean(question);
  let best = null;
  let bestScore = 0;
  for (const topic of ASK.topics) {
    let score = 0;
    for (const key of topic.keys) {
      // Whole words only, so "about you" doesn't match "about your".
      if (q.includes(` ${key} `)) score += key.split(" ").length * 2 + 1;
    }
    if (score > bestScore) { best = topic; bestScore = score; }
  }
  return best;
}

// ── Answering ─────────────────────────────────────────────────────────────
let token = 0;

export async function ask(question) {
  const text = question.trim();
  if (!text) return;
  const my = ++token;
  stopStory();
  pauseSpotify();
  stopListening();
  const topic = matchTopic(text);
  const answer = topic ? topic.answer : ASK.fallback;
  set({ heard: text, answer, topic: topic?.id || null, phase: "speaking", error: "" });
  if (topic?.section) scrollToSection(topic.section);
  duckMusic(true);
  await loadRecordings();
  for (const line of sentences(answer)) {
    if (my !== token) return;
    await say(line);
  }
  if (my !== token) return;
  duckMusic(false);
  set({ phase: "idle" });
}

export function stopAnswer() {
  token++;
  silence();
  duckMusic(false);
  if (state.phase === "speaking") set({ phase: "idle" });
}

// ── Listening (browser speech recognition: Chrome, Edge, Safari) ──────────
const Recognition = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : undefined;
export const canListen = Boolean(Recognition);
let rec = null;

export function listen() {
  if (!Recognition) {
    set({ error: "Voice input isn't supported in this browser. Type your question instead." });
    return;
  }
  stopAnswer();
  stopStory();
  stopListening();
  let finalText = "";
  rec = new Recognition();
  rec.lang = "en-IN";
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  rec.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) finalText += r[0].transcript;
      else interim += r[0].transcript;
    }
    set({ heard: (finalText + " " + interim).trim() });
  };
  rec.onerror = (e) => {
    const messages = {
      "not-allowed": "Microphone access is blocked. Allow it in the browser, or type your question.",
      "service-not-allowed": "Microphone access is blocked. Allow it in the browser, or type your question.",
      "no-speech": "I didn't catch that. Tap the mic and try again.",
      "audio-capture": "No microphone found. Type your question instead.",
      network: "Voice input needs an internet connection. Type your question instead.",
    };
    set({ phase: "idle", error: messages[e.error] || "Voice input stopped. Try again, or type your question." });
  };
  rec.onend = () => {
    rec = null;
    if (finalText.trim()) ask(finalText);
    else if (state.phase === "listening") set({ phase: "idle" });
  };
  set({ phase: "listening", heard: "", answer: "", topic: null, error: "" });
  try { rec.start(); } catch { set({ phase: "idle", error: "Couldn't start the microphone. Try again." }); }
}

export function stopListening() {
  if (!rec) return;
  const r = rec;
  rec = null;
  r.onend = null;
  r.onresult = null;
  r.onerror = null;
  try { r.abort(); } catch {}
  if (state.phase === "listening") set({ phase: "idle" });
}

/** Finish listening now and answer what was heard so far. */
export function doneListening() {
  try { rec?.stop(); } catch {}
}

// ── Panel ─────────────────────────────────────────────────────────────────
export const openAsk = () => set({ open: true });
export function closeAsk() {
  stopListening();
  stopAnswer();
  set({ open: false, error: "" });
}

// "Know about me" takes over the voice, so the Q&A steps aside.
if (typeof window !== "undefined") {
  window.addEventListener("story:start", () => {
    token++;
    stopListening();
    set({ phase: "idle", open: false });
  });
}
