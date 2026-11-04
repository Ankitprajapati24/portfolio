// "Know about me": scrolls to each section and reads it aloud in first person,
// with captions. The voice itself lives in voice.js.
import { useSyncExternalStore } from "react";
import { STORY } from "../data/content";
import { scrollToSection, scrollToY, sectionTop } from "./ui";
import { duckMusic } from "./music";
import { sentences } from "./sentences";
import { pauseSpotify } from "./spotify";
import { loadRecordings, say, silence } from "./voice";

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
  const my = ++token;
  silence();
  window.dispatchEvent(new Event("story:start"));
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
  if (state.status === "idle") return;
  token++;
  silence();
  duckMusic(false);
  position = { index: 0, line: 0 };
  set({ status: "idle", index: -1, caption: "" });
}
