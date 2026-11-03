import { motion, useReducedMotion } from "framer-motion";
import { STORY } from "../data/content";
import { useStory } from "../lib/story";

// Label colours rotate orange → yellow → black, like a set of brand colours.
const LABEL_COLORS = ["bg-accent text-white", "bg-sun text-ink", "bg-ink text-white"];

/** One portfolio section: a small numbered label, a big first-person heading, then the content. */
export default function Section({ id, data, children, dotted = false, wide = false }) {
  const reduced = useReducedMotion();
  const { index, status } = useStory();
  const number = STORY.findIndex((s) => s.id === id);
  const speaking = status !== "idle" && STORY[index]?.id === id;
  const rise = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 48 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id={id} className={`relative border-t border-slate-200 ${dotted ? "dot-grid" : "bg-white"} ${speaking ? "speaking-now" : ""}`}>
      <div className={`${wide ? "max-w-7xl" : "max-w-6xl"} mx-auto px-5 sm:px-8 py-24 sm:py-32`}>
        <motion.div {...rise()}>
          <SectionLabel number={number} label={data.label} />
          <h2 className="section-heading font-display font-black text-ink leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-8xl max-w-5xl">
            {data.title}
          </h2>
        </motion.div>
        <motion.div {...rise(0.15)} className="mt-12 sm:mt-16">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionLabel({ number, label }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 font-mono text-xs uppercase tracking-[0.18em] ${LABEL_COLORS[number % 3]}`}>
      <span className="opacity-70">{String(number).padStart(2, "0")}</span>
      {label}
    </p>
  );
}
