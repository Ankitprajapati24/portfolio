import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Download, Linkedin, Loader2, Mail, MessageCircle, Send, X } from "lucide-react";
import { CONTACT } from "../data/content";
import { closeTalk, sendMessage, useTalkOpen } from "../lib/talk";
import { lockScroll, unlockScroll } from "../lib/ui";

const REASONS = ["Internship", "Full-time role", "Collaboration", "Freelance project", "Just saying hi"];
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const whatsapp = `https://wa.me/${CONTACT.phoneHref.replace("+", "")}?text=${encodeURIComponent("Hi Ankit! I saw your portfolio and wanted to connect.")}`;

function QuickActions() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };
  const chip = "flex items-center justify-center gap-2 rounded-xl border-2 border-ink px-3 py-2.5 text-sm font-semibold hover:bg-sun transition-colors";
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <button type="button" onClick={copy} className={chip}>
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        {copied ? "Email copied!" : "Copy my email"}
      </button>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={chip}>
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
      <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={chip}>
        <Linkedin className="w-4 h-4" /> LinkedIn
      </a>
      <a href={CONTACT.resume} download="Ankit_Prajapati_Resume.pdf" className={chip}>
        <Download className="w-4 h-4" /> Résumé
      </a>
    </div>
  );
}

function Sent({ name, onClose }) {
  const reduced = useReducedMotion();
  return (
    <div className="py-6 text-center">
      <motion.div
        initial={reduced ? false : { scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="mx-auto w-20 h-20 rounded-full bg-sun border-[3px] border-ink flex items-center justify-center shadow-[4px_4px_0_#0A0A0A]"
      >
        <Check className="w-10 h-10" strokeWidth={3} />
      </motion.div>
      <p className="mt-6 font-display font-black text-3xl">Message sent!</p>
      <p className="mt-2 text-slate-600">Thanks{name ? `, ${name.split(" ")[0]}` : ""}. I read every message and I'll get back to you soon.</p>
      <button onClick={onClose} className="mt-6 rounded-xl bg-ink text-white font-semibold px-6 py-3 hover:bg-accent transition-colors">
        Back to the portfolio
      </button>
    </div>
  );
}

function Panel() {
  const reduced = useReducedMotion();
  const firstField = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "", "bot-field": "" });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    lockScroll();
    const t = setTimeout(() => firstField.current?.focus(), 250);
    const esc = (e) => { if (e.key === "Escape") closeTalk(); };
    window.addEventListener("keydown", esc);
    return () => { clearTimeout(t); window.removeEventListener("keydown", esc); unlockScroll(); };
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const errors = {
    name: !form.name.trim() && "Please add your name.",
    email: !EMAIL_OK.test(form.email.trim()) && "Please add a valid email so I can reply.",
    message: form.message.trim().length < 10 && "A few more words, please (10+ characters).",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        reason: form.reason,
        message: form.message.trim(),
        honeypot: form["bot-field"],
      });
      setStatus("sent");
      window.dispatchEvent(new Event("talk:sent"));
    } catch {
      setStatus("error");
    }
  };

  const input = "w-full rounded-xl border-2 border-ink px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent";
  const errorText = (k) => touched && errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>;

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" onClick={closeTalk} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Let's talk"
        data-lenis-prevent
        initial={reduced ? false : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full sm:max-w-lg max-h-[92svh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-[3px] border-ink bg-white shadow-[8px_8px_0_#FF6B00]"
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" aria-hidden />
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display font-black text-3xl leading-none">Let's talk 👋</p>
              <p className="mt-2 text-sm text-slate-600">{CONTACT.answer}</p>
            </div>
            <button onClick={closeTalk} aria-label="Close" className="w-9 h-9 shrink-0 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-ink">
              <X className="w-4 h-4" />
            </button>
          </div>

          {status === "sent" ? (
            <Sent name={form.name} onClose={closeTalk} />
          ) : (
            <>
              <div className="mt-5"><QuickActions /></div>

              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400 font-mono">
                <span className="h-px flex-1 bg-slate-200" /> or send a message <span className="h-px flex-1 bg-slate-200" />
              </div>

              <form name="contact" onSubmit={submit} noValidate className="space-y-4">
                {/* Hidden from people; bots that fill it get dropped. */}
                <p className="hidden"><label>Leave this empty <input name="bot-field" value={form["bot-field"]} onChange={set("bot-field")} tabIndex={-1} autoComplete="off" /></label></p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold">Your name</span>
                    <input ref={firstField} name="name" value={form.name} onChange={set("name")} autoComplete="name" maxLength={80} className={`mt-1 ${input}`} />
                    {errorText("name")}
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold">Your email</span>
                    <input name="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" maxLength={120} className={`mt-1 ${input}`} />
                    {errorText("email")}
                  </label>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold">What's it about?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {REASONS.map((r) => (
                      <button
                        type="button"
                        key={r}
                        aria-pressed={form.reason === r}
                        onClick={() => setForm((f) => ({ ...f, reason: f.reason === r ? "" : r }))}
                        className={`rounded-full border-2 border-ink px-3 py-1.5 text-sm font-semibold transition-colors ${form.reason === r ? "bg-ink text-white" : "hover:bg-sun"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="text-sm font-semibold">Message</span>
                  <textarea name="message" value={form.message} onChange={set("message")} rows={4} maxLength={2000} placeholder="Tell me a bit about it…" className={`mt-1 resize-y ${input}`} />
                  {errorText("message")}
                </label>

                {status === "error" && (
                  <p role="alert" className="rounded-xl bg-accentsoft border border-accent px-3 py-2 text-sm">
                    That didn't go through. Please try again, or email me at{" "}
                    <a href={`mailto:${CONTACT.email}`} className="font-semibold underline">{CONTACT.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-semibold py-3.5 border-[3px] border-ink shadow-[4px_4px_0_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0A0A0A] transition-all disabled:opacity-70"
                >
                  {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Mail className="w-3.5 h-3.5" /> Goes straight to me. Your email is only used to reply.
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** "Let's talk" panel, opened from the dock or the contact section. */
export default function TalkModal() {
  const open = useTalkOpen();
  return createPortal(<AnimatePresence>{open && <Panel key="talk" />}</AnimatePresence>, document.body);
}
