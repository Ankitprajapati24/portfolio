import { useEffect, useRef } from "react";
import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { SKILLS } from "../data/content";

// One long sine wave from x=-2400 to x=4000 (the visible area is 0–1600).
const WAVE = (() => {
  const y = 400;
  let d = `M-2400 ${y} Q-2150 ${y - 260} -1900 ${y}`;
  for (let x = -1400; x <= 4000; x += 500) d += ` T${x} ${y}`;
  return d;
})();

/** Skill names drifting along a big faint wave. Loops seamlessly by shifting exactly one repeat. */
export default function SkillWave({ className = "" }) {
  const reduced = useReducedMotion();
  const textPath = useRef(null);
  const firstRepeat = useRef(null);
  const repeatWidth = useRef(0);
  const repeat = SKILLS.join(" — ") + " — ";

  useEffect(() => {
    const measure = () => { repeatWidth.current = firstRepeat.current?.getComputedTextLength() || 0; };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  useAnimationFrame((t) => {
    const w = repeatWidth.current;
    if (reduced || !w || !textPath.current) return;
    textPath.current.setAttribute("startOffset", String(-(((t / 1000) * 28) % w)));
  });

  return (
    <svg viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path id="skill-wave" d={WAVE} fill="none" />
      <text fill="#94A3B8" fontSize="22" className="font-body" fontWeight="500">
        <textPath ref={textPath} href="#skill-wave" startOffset="0">
          <tspan ref={firstRepeat}>{repeat}</tspan>
          {Array(4).fill(repeat).join("")}
        </textPath>
      </text>
    </svg>
  );
}
