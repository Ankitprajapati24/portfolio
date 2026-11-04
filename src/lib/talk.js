// Open/close state for the "Let's talk" panel, plus sending the message.
// Messages are emailed straight to Ankit:
//  - through Web3Forms when CONTACT.web3formsKey is set (preferred: no activation step)
//  - otherwise through FormSubmit (needs a one-time activation link in the inbox)
import { useSyncExternalStore } from "react";
import { CONTACT } from "../data/content";

let open = false;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const useTalkOpen = () =>
  useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => open);

export function openTalk() { open = true; emit(); }
export function closeTalk() { open = false; emit(); }

async function post(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== "true") throw new Error(data.message || `Send failed (${res.status})`);
}

/** Email the message to Ankit. Throws if it wasn't accepted. */
export async function sendMessage({ name, email, reason, message, honeypot }) {
  // Bots fill the hidden field; pretend it worked and send nothing.
  if (honeypot) return;
  const topic = reason || "Not specified";
  const subject = `New portfolio message from ${name}${reason ? ` (${reason})` : ""}`;

  if (CONTACT.web3formsKey) {
    // The visitor's email becomes the reply-to, so "Reply" in Gmail answers them.
    return post("https://api.web3forms.com/submit", {
      access_key: CONTACT.web3formsKey,
      subject,
      from_name: "portfolio.codebread.fun",
      name,
      email,
      topic,
      message,
    });
  }

  return post(`https://formsubmit.co/ajax/${CONTACT.email}`, {
    name, email, topic, message, _subject: subject, _template: "table",
  });
}
