import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mic, Send, Square, Volume2, X } from "lucide-react";
import { ASK } from "../data/content";
import { ask, canListen, closeAsk, doneListening, listen, stopAnswer, useAsk } from "../lib/ask";

/** Pulsing rings around the mic while it listens. */
function MicButton({ phase }) {
  const listening = phase === "listening";
  return (
    <button
      onClick={listening ? doneListening : listen}
      aria-label={listening ? "Stop listening and answer" : "Ask with your voice"}
      className={`relative w-20 h-20 shrink-0 rounded-full border-[3px] border-ink flex items-center justify-center transition-colors shadow-[4px_4px_0_#0A0A0A] ${listening ? "bg-accent text-white" : "bg-sun text-ink hover:bg-accent hover:text-white"}`}
    >
      {listening && (
        <>
          <span className="ask-ring absolute inset-0 rounded-full border-2 border-accent" aria-hidden />
          <span className="ask-ring absolute inset-0 rounded-full border-2 border-accent" style={{ animationDelay: "0.6s" }} aria-hidden />
        </>
      )}
      {listening ? <Square className="w-7 h-7" /> : <Mic className="w-8 h-8" />}
    </button>
  );
}

/** "Ask me anything": opens from the dock's mic button. */
export default function AskMe() {
  const { open, phase, heard, answer, error } = useAsk();
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const esc = (e) => { if (e.key === "Escape") closeAsk(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    ask(text);
    setText("");
  };

  const status =
    phase === "listening" ? "Listening… tap the button when you're done" :
    phase === "speaking" ? "Answering" :
    canListen ? "Tap the mic and ask me anything" : "Type a question below";

  return (
    <AnimatePresence>
      {open && (
        // Outer wrapper centres the panel; the animation moves only the inner box.
        <motion.div
          key="ask"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed z-[55] inset-x-0 bottom-24 flex justify-center px-3 pointer-events-none"
        >
        <div
          role="dialog"
          aria-label="Ask me anything"
          data-lenis-prevent
          className="pointer-events-auto w-full max-w-[520px] max-h-[calc(100svh-8rem)] overflow-y-auto rounded-3xl border-[3px] border-ink bg-white shadow-[8px_8px_0_#FFC400]"
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display font-black text-2xl leading-none">Ask me anything</p>
                <p className="mt-1 text-xs text-slate-500">Answers in my voice, about my work.</p>
              </div>
              <button onClick={closeAsk} aria-label="Close" className="w-9 h-9 shrink-0 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-ink">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-5">
              {canListen && <MicButton phase={phase} />}
              <div className="min-w-0 flex-1" aria-live="polite">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{status}</p>
                {heard && <p className="mt-2 text-sm text-slate-500 italic break-words">“{heard}”</p>}
              </div>
            </div>

            {answer && (
              <div className="mt-5 rounded-2xl bg-ink text-white p-4 flex gap-3">
                <Volume2 className={`w-5 h-5 shrink-0 mt-0.5 ${phase === "speaking" ? "text-sun animate-pulse" : "text-slate-400"}`} aria-hidden />
                <p className="flex-1 leading-relaxed">{answer}</p>
                {phase === "speaking" && (
                  <button onClick={stopAnswer} aria-label="Stop speaking" className="w-8 h-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <Square className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {error && <p role="alert" className="mt-4 rounded-xl bg-accentsoft border border-accent px-3 py-2 text-sm text-ink">{error}</p>}

            <div className="mt-5 flex flex-wrap gap-2">
              {ASK.suggestions.map((s) => (
                <button key={s} onClick={() => ask(s)} className="rounded-full border-2 border-ink px-3 py-1.5 text-sm font-semibold hover:bg-sun transition-colors">
                  {s}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-4 flex gap-2">
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={200}
                placeholder="Or type a question…"
                aria-label="Type a question"
                className="flex-1 min-w-0 rounded-xl border-2 border-ink px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit" disabled={!text.trim()} aria-label="Ask" className="w-11 h-11 shrink-0 rounded-xl bg-ink text-white flex items-center justify-center hover:bg-accent disabled:opacity-40 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
            {canListen && <p className="mt-3 text-[11px] text-slate-400">Voice input uses your browser's speech recognition.</p>}
          </div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
