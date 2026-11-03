import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { EXPERIENCE, STORY, TIMELINE } from "../data/content";
import { useStory } from "../lib/story";
import { SectionLabel } from "./Section";

const CARD = {
  current: { dot: "bg-accent", tag: "Now", box: "border-ink shadow-[8px_8px_0_#FF6B00]" },
  past: { dot: "bg-ink", tag: null, box: "border-ink shadow-[8px_8px_0_#0A0A0A]" },
  future: { dot: "bg-sun", tag: "Coming up", box: "border-dashed border-ink shadow-[8px_8px_0_#FFC400]" },
};

/** Pinned section: scrolling down slides the timeline sideways (latest first). */
export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [travel, setTravel] = useState(0);
  const [height, setHeight] = useState("200vh");
  const { index, status } = useStory();
  const speaking = status !== "idle" && STORY[index]?.id === "experience";
  const number = STORY.findIndex((s) => s.id === "experience");

  useLayoutEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      const distance = Math.max(0, t.scrollWidth - window.innerWidth);
      setTravel(distance);
      // 1px down = 1px sideways, plus room to read the last card.
      setHeight(`${window.innerHeight + distance + window.innerHeight * 0.5}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 0.85], [0, -travel], { clamp: true });

  return (
    <section id="experience" ref={sectionRef} data-scrub className={`relative border-t border-slate-200 dot-grid ${speaking ? "speaking-now" : ""}`} style={{ height }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        <div className="max-w-6xl w-full mx-auto px-5 sm:px-8">
          <SectionLabel number={number} label={EXPERIENCE.label} />
          <h2 className="section-heading font-display font-black text-ink leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-8xl">
            {EXPERIENCE.title}
          </h2>
        </div>

        <motion.ol ref={trackRef} style={{ x }} className="relative mt-12 flex gap-8 sm:gap-12 w-max px-5 sm:px-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-[20vw]">
          <span className="absolute left-0 right-0 top-[11px] h-[3px] bg-ink" aria-hidden />
          {TIMELINE.map((item) => {
            const kind = item.current ? CARD.current : item.future ? CARD.future : CARD.past;
            return (
              <li key={item.org} className="relative pt-12 w-[78vw] max-w-[460px]">
                <span className={`absolute left-0 top-0 w-[25px] h-[25px] rounded-full border-[3px] border-ink ${kind.dot}`} aria-hidden />
                <p className="flex items-center gap-2 font-mono text-sm font-bold text-ink">
                  {item.period}
                  {kind.tag && <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${item.current ? "bg-accent text-white" : "bg-sun text-ink"}`}>{kind.tag}</span>}
                </p>
                <div className={`mt-3 rounded-xl border-[3px] p-6 sm:p-7 bg-white ${kind.box}`}>
                  <h3 className="font-display font-black text-3xl sm:text-4xl leading-none">{item.org}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-accent">{item.role}</p>
                  <p className="mt-4 text-slate-600 leading-relaxed">{item.note}</p>
                </div>
              </li>
            );
          })}
        </motion.ol>

        {travel > 0 && (
          <p className="mt-8 max-w-6xl w-full mx-auto px-5 sm:px-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
            Keep scrolling <ChevronsRight className="w-4 h-4 text-accent" />
          </p>
        )}
      </div>
    </section>
  );
}
