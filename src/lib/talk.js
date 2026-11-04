// Open/close state for the "Let's talk" panel, plus sending the message.
// Messages are emailed straight to Ankit through FormSubmit (formsubmit.co):
// no account or key needed, only a one-time activation link sent to the inbox.
import { useSyncExternalStore } from "react";
import { CONTACT } from "../data/content";

let open = false;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const useTalkOpen = () =>
  useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => open);

export function openTalk() { open = true; emit(); }
export function closeTalk() { open = false; emit(); }

const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

/** Email the message to Ankit. Throws if it wasn't accepted. */
export async function sendMessage({ name, email, reason, message, honeypot }) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email, // FormSubmit sets this as the reply-to, so "Reply" in Gmail answers the visitor
      topic: reason || "Not specified",
      message,
      _subject: `New portfolio message from ${name}${reason ? ` (${reason})` : ""}`,
      _template: "table",
      _honey: honeypot || "", // filled only by bots; FormSubmit drops those
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== "true") throw new Error(data.message || `Send failed (${res.status})`);
}
