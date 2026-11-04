// Open/close state for the "Let's talk" panel, plus sending the message.
// Messages go to Netlify Forms (form name "contact"); they show up in the
// Netlify dashboard under Forms, and can be emailed on from there.
import { useSyncExternalStore } from "react";

let open = false;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const useTalkOpen = () =>
  useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => open);

export function openTalk() { open = true; emit(); }
export function closeTalk() { open = false; emit(); }

/** Post the form the way Netlify Forms expects: url-encoded, to "/", with form-name. */
export async function sendMessage(fields) {
  const body = new URLSearchParams({ "form-name": "contact", ...fields }).toString();
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Send failed (${res.status})`);
}
