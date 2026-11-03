import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2, Pause, Play } from "lucide-react";
import { HERO, SURNAME_SCRIPTS } from "../data/content";
import { pauseStory, resumeStory, startStory, useStory } from "../lib/story";
import TopBar from "./TopBar";
import SkillWave from "./SkillWave";

const LANG_CODES = { Hindi: "hi", Kannada: "kn", Bengali: "bn", Telugu: "te", Gujarati: "gu", Tamil: "ta", English: "en" };
// Hovering a letter of the name tilts it and paints it a new colour (never the same twice in a row).
const HOVER_COLORS = ["#FF6B00", "#FFC400", "#E11D48", "#2563EB", "#16A34A", "#7C3AED", "#0891B2"];

function HoverLetter({ char, reduced }) {
  const [color, setColor] = useState(null);
  const pickColor = () =>
    setColor((prev) => {
      const options = HOVER_COLORS.filter((c) => c !== prev);
      return options[Math.floor(Math.random() * options.length)];
    });
  return (
    <motion.span
      className="inline-block cursor-default"
      style={{ color: color || "#0A0A0A", transition: "color 0.2s" }}
      onPointerEnter={pickColor}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setColor(null); }}
      onClick={pickColor}
      animate={color && !reduced ? { rotate: -12, y: -18, scale: 1.08 } : { rotate: 0, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      aria-hidden
    >
      {char}
    </motion.span>
  );
}

const MAX_TILT = 20; // degrees

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [tilt, setTilt] = useState(null);
  const reduced = useReducedMotion();
  const { status } = useStory();

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % SURNAME_SCRIPTS.length), 2000);
    return () => clearInterval(timer);
  }, [reduced]);

  const shown = reduced ? SURNAME_SCRIPTS.length - 1 : idx;
  const surname = SURNAME_SCRIPTS[shown];
  const button =
    status === "playing"
      ? { label: "Pause", Icon: Pause, onClick: pauseStory }
      : status === "paused"
        ? { label: "Resume", Icon: Play, onClick: resumeStory }
        : { label: "Know about me", Icon: Volume2, onClick: () => startStory(0) };

  // 3D tilt: the name leans towards the mouse, like a card in your hand.
  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -y * 2 * MAX_TILT, ry: x * 2 * MAX_TILT });
  };
  const tiltStyle = {
    transform: tilt
      ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.05, 1.05, 1.05)`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
    willChange: "transform",
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] bg-white flex items-center overflow-hidden"
      onPointerMove={onMove}
      onPointerLeave={() => setTilt(null)}
    >
      <TopBar />
      {/* Skills drifting along a faint wave behind the name */}
      <SkillWave className="absolute inset-0 w-full h-full opacity-60" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-32 flex flex-col items-center text-center"
      >
        <div style={tiltStyle} className="w-full flex flex-col items-center">
        <h1 className="hero-name font-display font-black hover:!tracking-wider transition-[letter-spacing] duration-500" aria-label="Ankit Prajapati">
          {"Ankit".split("").map((ch, i) => <HoverLetter key={i} char={ch} reduced={reduced} />)}
        </h1>

        <div className="hero-surname font-script font-extrabold w-full" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.span
              key={surname.text}
              lang={LANG_CODES[surname.lang]}
              initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -28, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-accent"
            >
              {surname.text}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400 h-4">{surname.lang}</p>
        </div>

        <p className="font-mono text-xs sm:text-sm text-slate-500 mt-8">{HERO.tagline}</p>

        <button
          onClick={button.onClick}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink text-white font-semibold text-lg px-8 py-4 shadow-[5px_5px_0_#FFC400] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#FFC400] transition-all"
        >
          <button.Icon className="w-5 h-5" />
          {button.label}
        </button>
        <p className="mt-4 text-xs text-slate-500">Sound on: I'll walk you through it. Or just scroll.</p>
      </motion.div>
    </section>
  );
}
