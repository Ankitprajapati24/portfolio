import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import { ABOUT } from "../data/content";

function Sticker() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % ABOUT.stickerWords.length), 1800);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <div className="inline-flex items-center gap-2 -rotate-3 rounded-full border-2 border-ink bg-accentsoft px-4 py-2 font-mono text-sm shadow-[3px_3px_0_#0A0A0A]">
      <span className="text-slate-600">I work on</span>
      <span className="relative inline-block min-w-[8.5rem] text-left font-bold text-accentdark">
        <AnimatePresence mode="wait">
          <motion.span
            key={ABOUT.stickerWords[i]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {ABOUT.stickerWords[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" data={ABOUT}>
      <div className="max-w-3xl">
        <Sticker />
        <div className="mt-8 space-y-6">
          {ABOUT.answer.map((para, i) => (
            <p key={i} className={`leading-relaxed ${i === 0 ? "text-2xl sm:text-3xl font-semibold text-ink" : "text-lg sm:text-xl text-slate-600"}`}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
