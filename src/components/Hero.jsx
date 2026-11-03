import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2 } from "lucide-react";
import Logo from "./Logo";
import { HeroWave } from "./HeroWave";
import { openEchoChat } from "../lib/ui";
import { SURNAME_SCRIPTS } from "../data/content";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % SURNAME_SCRIPTS.length), 2000);
    return () => clearInterval(timer);
  }, [reduced]);
  return <section id="hero" data-testid="hero-section" className="relative min-h-[min(760px,95svh)] dot-grid flex flex-col text-center overflow-hidden">
    <HeroWave />
    <header className="relative z-10 w-full px-5 pt-7 flex flex-col items-center gap-2">
      <Logo size={32} />
      <span data-testid="portfolio-brand" className="font-mono text-[10px] uppercase text-slate-500">Ankit Prajapati</span>
    </header>
    <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20">
      <p data-testid="hero-greeting" className="flex items-center justify-center gap-3 text-hot font-semibold text-lg mb-6"><span className="wave-hand text-3xl" role="img" aria-label="waving hand">👋</span>Hello, I'm</p>
      <h1 data-testid="hero-name-heading" className="font-display font-black leading-none">ANKIT</h1>
      <div data-testid="hero-script-surname" className="font-display font-black text-hot w-full" aria-label="Prajapati">
        <AnimatePresence mode="wait"><motion.span key={SURNAME_SCRIPTS[idx].text} initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -16 }} transition={{ duration: 0.3 }} className="inline-block">{SURNAME_SCRIPTS[idx].text}</motion.span></AnimatePresence>
      </div>
      <p data-testid="hero-specialties" className="font-mono text-xs sm:text-sm text-slate-500 mt-2">AI & machine learning · Connected devices · Full-stack</p>
      <button data-testid="talk-to-echo-button" onClick={openEchoChat} className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-white border-2 border-ink text-ink font-semibold text-base px-7 py-3.5 hover:bg-ink hover:text-white transition-colors"><Volume2 className="w-4 h-4" />Talk to Echo</button>
      <span data-testid="availability-status" className="mt-5 inline-flex items-center gap-2 text-xs text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-hot" />Open to opportunities</span>
    </motion.div>
  </section>;
}
