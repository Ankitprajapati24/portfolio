// Spotify's official embedded player, controlled through its iFrame API.
// https://developer.spotify.com/documentation/embeds/references/iframe-api
import { useSyncExternalStore } from "react";

let state = { ready: false, playing: false };
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
export const useSpotify = () =>
  useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state);

let controller = null;
let apiPromise = null;
let onPlay = () => {};

/** Called when Spotify starts playing, so other audio can stop. */
export function onSpotifyPlay(fn) { onPlay = fn; }

/** "https://open.spotify.com/playlist/ID" → "spotify:playlist:ID" */
export const toUri = (url) => {
  const m = url.match(/open\.spotify\.com\/(track|playlist|album)\/([A-Za-z0-9]+)/);
  return m ? `spotify:${m[1]}:${m[2]}` : url;
};

function loadApi() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    document.body.appendChild(s);
  });
  return apiPromise;
}

/** Turn `element` into a Spotify player showing `url`. Safe to call more than once. */
export async function mountSpotify(element, url, height) {
  if (controller || !element) return;
  const api = await loadApi();
  if (controller) return;
  api.createController(element, { uri: toUri(url), width: "100%", height }, (c) => {
    controller = c;
    c.addListener("ready", () => set({ ready: true }));
    c.addListener("playback_update", (e) => {
      const playing = !e.data.isPaused && !e.data.isBuffering;
      if (playing && !state.playing) onPlay();
      if (playing !== state.playing) set({ playing });
    });
  });
}

export function showInSpotify(url) {
  controller?.loadUri(toUri(url));
}

export function pauseSpotify() {
  if (state.playing) controller?.pause();
}
