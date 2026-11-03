import { SKILLS } from "../data/content";

export const HeroWave = () => (
  <div className="hero-wave pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" data-testid="hero-background-wave">
    <svg viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <path id="hero-wave-top" d="M-1800 130 Q-1400 -60 -1000 130 T-200 130 T600 130 T1400 130 T2200 130 T3000 130 T3800 130" />
        <path id="hero-wave-bottom" d="M-1800 640 Q-1400 860 -1000 640 T-200 640 T600 640 T1400 640 T2200 640 T3000 640 T3800 640" />
      </defs>
      {["top", "bottom"].map((row, i) => <text key={row} fill={i ? "#FF4F00" : "#0F172A"} className="font-display font-bold" fontSize="36" opacity={i ? "0.13" : "0.09"}>
        <textPath href={`#hero-wave-${row}`} startOffset="0%">
          <animate attributeName="startOffset" from="0%" to="-35%" dur={i ? "85s" : "100s"} repeatCount="indefinite" />
          {Array(5).fill(SKILLS.join(" — ")).join(" — ")}
        </textPath>
      </text>)}
    </svg>
  </div>
);
