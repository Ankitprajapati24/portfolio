// Shared by the site and the voice script, so both split the narration the same way.

// Split after . ! ? followed by a space, so "B.Tech" and "79.6" stay whole.
export const sentences = (text) => text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);

// Short, stable id for a line of narration (FNV-1a hash). Edited text gets a new id.
export function lineId(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}
