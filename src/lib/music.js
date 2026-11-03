// Background music: plays a live radio station. If the station can't be reached,
// it falls back to a lo-fi loop generated in the browser with the Web Audio API.
// Browsers only allow sound after a click or key press, so it starts on the first one.
import { useSyncExternalStore } from "react";
import { MUSIC } from "../data/content";

const NORMAL = 0.6;
const DUCKED = 0.15; // while the voice is talking

export const STATIONS = MUSIC.stations;
const byId = (id) => STATIONS.find((s) => s.id === id);

let state = { on: false, track: STATIONS[0].id, loading: false, fallback: false };
try { const saved = localStorage.getItem("music-track"); if (byId(saved)) state.track = saved; } catch {}
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
export const useMusic = () =>
  useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state);

let ducked = false;
const level = () => (ducked ? DUCKED : NORMAL);

// ── Radio ─────────────────────────────────────────────────────────────────
let audio = null;
let fade = null;
let stallTimer = null;
let attempt = 0;

function fadeTo(target, ms = 600) {
  if (!audio) return;
  clearInterval(fade);
  const start = audio.volume;
  const t0 = performance.now();
  fade = setInterval(() => {
    const p = Math.min(1, (performance.now() - t0) / ms);
    audio.volume = start + (target - start) * p;
    if (p === 1) clearInterval(fade);
  }, 30);
}

function stopRadio() {
  clearTimeout(stallTimer);
  clearInterval(fade);
  if (!audio) return;
  audio.pause();
  audio.removeAttribute("src");
  audio.load(); // stops the download
}

function playRadio(id) {
  if (!audio) {
    audio = new Audio();
    audio.preload = "none";
  }
  const my = ++attempt;
  const failed = () => {
    if (my !== attempt || !state.on) return;
    stopRadio();
    startSynth();
    set({ loading: false, fallback: true });
  };
  stopRadio();
  audio.src = byId(id).url;
  audio.volume = 0;
  audio.onplaying = () => {
    if (my !== attempt) return;
    clearTimeout(stallTimer);
    set({ loading: false, fallback: false });
    fadeTo(level(), 1500);
  };
  audio.onerror = failed;
  stallTimer = setTimeout(failed, 10_000); // station too slow to start
  set({ loading: true, fallback: false });
  audio.play().catch(failed);
}

// ── Generated fallback (soft lo-fi loop) ──────────────────────────────────
const BPM = 72;
const EIGHTH = 60 / BPM / 2;
const CHORDS = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]];
const MELODY = [72, 74, 76, 79, 81, 84];
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
let ctx = null, master, dry, wet, noise, timer = null, step = 0, nextTime = 0, melodyAt = 2;

function buildSynth() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.createDynamicsCompressor()).connect(ctx.destination);
  dry = ctx.createGain();
  dry.connect(master);
  const verb = ctx.createConvolver();
  const len = ctx.sampleRate * 2.5;
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  verb.buffer = ir;
  wet = ctx.createGain();
  wet.gain.value = 0.35;
  wet.connect(verb).connect(master);
  noise = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const n = noise.getChannelData(0);
  for (let i = 0; i < n.length; i++) n[i] = Math.random() * 2 - 1;
}

function env(t, peak, attack, hold, release) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(peak, t + attack);
  g.gain.setValueAtTime(peak, t + attack + hold);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + hold + release);
  return g;
}

function tone(t, freq, type, peak, attack, hold, release, send = 0) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  const lp = ctx.createBiquadFilter();
  lp.frequency.value = 1400;
  const g = env(t, peak, attack, hold, release);
  o.connect(lp).connect(g);
  g.connect(dry);
  if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(wet); }
  o.start(t);
  o.stop(t + attack + hold + release + 0.05);
}

function schedule(s, t) {
  const chord = CHORDS[Math.floor(s / 8) % CHORDS.length];
  const beat = s % 8;
  if (beat === 0) chord.forEach((m) => tone(t, hz(m), "triangle", 0.035, 0.6, EIGHTH * 8 - 0.6, 1.4, 0.6));
  if (beat === 0 || beat === 4) {
    tone(t, hz(chord[0] - 12), "sine", 0.2, 0.01, 0.15, 0.6);
    const k = ctx.createOscillator();
    k.frequency.setValueAtTime(120, t);
    k.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    k.connect(env(t, 0.35, 0.005, 0.02, 0.25)).connect(dry);
    k.start(t);
    k.stop(t + 0.35);
  }
  if (beat % 2 === 1) {
    const h = ctx.createBufferSource();
    h.buffer = noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    h.connect(hp).connect(env(t, 0.03, 0.002, 0.01, 0.05)).connect(dry);
    h.start(t);
    h.stop(t + 0.1);
  }
  if (beat !== 0 && Math.random() < 0.32) {
    melodyAt = Math.max(0, Math.min(MELODY.length - 1, melodyAt + [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]));
    tone(t, hz(MELODY[melodyAt]), "triangle", 0.06, 0.01, 0.05, 0.7, 0.9);
  }
}

function startSynth() {
  if (!ctx) buildSynth();
  ctx.resume();
  step = 0;
  nextTime = ctx.currentTime + 0.1;
  clearInterval(timer);
  timer = setInterval(() => {
    while (nextTime < ctx.currentTime + 0.2) {
      schedule(step, nextTime);
      step++;
      nextTime += EIGHTH * (step % 2 ? 1.08 : 0.92);
    }
  }, 50);
  master.gain.setTargetAtTime(level(), ctx.currentTime, 0.6);
}

function stopSynth() {
  if (!ctx) return;
  clearInterval(timer);
  timer = null;
  master.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
  setTimeout(() => { if (!timer) ctx.suspend(); }, 500);
}

// ── Public controls ───────────────────────────────────────────────────────
export function startMusic() {
  if (state.on) return;
  set({ on: true });
  playRadio(state.track);
}

export function stopMusic() {
  if (!state.on) return;
  attempt++;
  stopRadio();
  stopSynth();
  set({ on: false, loading: false });
}

export function toggleMusic() {
  if (state.on) stopMusic();
  else startMusic();
  try { localStorage.setItem("music", state.on ? "on" : "off"); } catch {}
}

/** Switch station; starts the music if it was off. */
export function setTrack(id) {
  if (!byId(id)) return;
  try { localStorage.setItem("music-track", id); localStorage.setItem("music", "on"); } catch {}
  stopSynth();
  set({ track: id, on: true });
  playRadio(id);
}

export function duckMusic(value) {
  ducked = value;
  if (!state.on) return;
  if (state.fallback && ctx) master.gain.setTargetAtTime(level(), ctx.currentTime, 0.2);
  else fadeTo(level());
}

/** Start the music on the visitor's first click or key press, unless they turned it off before. */
export function startMusicOnFirstGesture() {
  let pref = "on";
  try { pref = localStorage.getItem("music") || "on"; } catch {}
  if (pref === "off") return () => {};
  const go = (e) => {
    remove();
    // Music controls handle their own first click.
    if (e.target?.closest?.("[data-music-toggle]")) return;
    startMusic();
  };
  const remove = () => ["pointerdown", "keydown"].forEach((e) => window.removeEventListener(e, go));
  ["pointerdown", "keydown"].forEach((e) => window.addEventListener(e, go));
  return remove;
}
