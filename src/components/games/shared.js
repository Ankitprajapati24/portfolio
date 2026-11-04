import { useEffect, useState } from "react";

export const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Best score for a game, kept in this browser. */
export function useBest(key) {
  const storageKey = `play:${key}`;
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem(storageKey)) || 0; } catch { return 0; }
  });
  // Keep every place that shows this score in sync.
  useEffect(() => {
    const sync = (e) => { if (e.detail.key === key) setBest(e.detail.value); };
    window.addEventListener("play:best", sync);
    return () => window.removeEventListener("play:best", sync);
  }, [key]);
  const save = (value) => {
    try { localStorage.setItem(storageKey, String(value)); } catch { /* private mode */ }
    window.dispatchEvent(new CustomEvent("play:best", { detail: { key, value } }));
  };
  return [best, save];
}

/** Ask Echo the cat to say something. */
export const cheer = (text) => window.dispatchEvent(new CustomEvent("pet:cheer", { detail: text }));

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-semibold px-6 py-3 border-[3px] border-ink shadow-[4px_4px_0_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0A0A0A] transition-all";
