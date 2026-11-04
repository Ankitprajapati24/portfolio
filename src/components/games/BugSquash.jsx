import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bug, Coffee, Play, RotateCcw, Timer } from "lucide-react";
import { cheer, primaryButton, useBest } from "./shared";

const ROUND_SECONDS = 20;
const HOLES = 9;
const POINTS = { bug: 1, gold: 3, coffee: -2 };
const empty = () => Array(HOLES).fill(null);

function Critter({ hole }) {
  if (hole.kind === "hit") {
    return <span className={`font-display font-black text-2xl ${hole.points > 0 ? "text-accent" : "text-red-600"}`}>{hole.points > 0 ? `+${hole.points}` : hole.points}</span>;
  }
  const look = {
    bug: "bg-accent text-white",
    gold: "bg-sun text-ink ring-4 ring-sun/40",
    coffee: "bg-white text-ink",
  }[hole.kind];
  const Icon = hole.kind === "coffee" ? Coffee : Bug;
  return (
    <span className={`w-[70%] aspect-square rounded-full border-[3px] border-ink flex items-center justify-center ${look}`}>
      <Icon className="w-1/2 h-1/2" strokeWidth={2.5} />
    </span>
  );
}

/** Whack-a-mole with code bugs. Golden bugs are worth 3, the coffee costs 2. */
export default function BugSquash() {
  const [phase, setPhase] = useState("idle"); // idle | playing | over
  const [holes, setHoles] = useState(empty);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(ROUND_SECONDS);
  const [best, saveBest] = useBest("bugs");
  const [newBest, setNewBest] = useState(false);
  const startedAt = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const tick = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - startedAt.current) / 1000;
      const remaining = ROUND_SECONDS - elapsed;
      setLeft(Math.max(0, Math.ceil(remaining)));
      if (remaining <= 0) {
        setHoles(empty());
        setPhase("over");
        return;
      }
      // Bugs appear more often and hide faster as the round goes on.
      const pace = 1 - (elapsed / ROUND_SECONDS) * 0.45;
      setHoles((prev) => {
        const next = prev.map((h) => (h && h.until > now ? h : null));
        const free = next.flatMap((h, i) => (h ? [] : [i]));
        if (free.length && HOLES - free.length < 3 && Math.random() < 0.4) {
          const i = free[Math.floor(Math.random() * free.length)];
          const r = Math.random();
          const kind = r < 0.12 ? "gold" : r < 0.28 ? "coffee" : "bug";
          next[i] = { kind, id: `${now}-${i}`, until: now + (850 + Math.random() * 500) * pace };
        }
        return next;
      });
    }, 100);
    return () => clearInterval(tick);
  }, [phase]);

  useEffect(() => {
    if (phase !== "over") return;
    const final = scoreRef.current;
    const beat = final > best;
    setNewBest(beat);
    if (beat) {
      saveBest(final);
      cheer(`New best: ${final}! 🐛💥`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const start = () => {
    scoreRef.current = 0;
    setScore(0);
    setLeft(ROUND_SECONDS);
    setHoles(empty());
    setNewBest(false);
    startedAt.current = performance.now();
    setPhase("playing");
  };

  const whack = (i) => {
    const hole = holes[i];
    if (phase !== "playing" || !hole || hole.kind === "hit") return;
    const points = POINTS[hole.kind];
    scoreRef.current = Math.max(0, scoreRef.current + points);
    setScore(scoreRef.current);
    setHoles((prev) => prev.map((h, j) => (j === i ? { kind: "hit", points, id: `hit-${h.id}`, until: performance.now() + 350 } : h)));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
        <span className="rounded-full bg-ink text-white px-3 py-1">Score {score}</span>
        <span className={`rounded-full px-3 py-1 inline-flex items-center gap-1.5 ${left <= 5 && phase === "playing" ? "bg-accent text-white" : "bg-accentsoft"}`}>
          <Timer className="w-3.5 h-3.5" /> {left}s
        </span>
        <span className="ml-auto text-slate-500">Best {best}</span>
      </div>

      <div className="relative mt-5 mx-auto max-w-sm">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {holes.map((hole, i) => (
            <button
              key={i}
              type="button"
              onPointerDown={() => whack(i)}
              aria-label={hole ? (hole.kind === "coffee" ? "Coffee, don't hit it" : "Bug") : "Empty"}
              className="aspect-square rounded-2xl border-[3px] border-ink bg-accentsoft flex items-center justify-center overflow-hidden select-none touch-manipulation"
            >
              <AnimatePresence>
                {hole && (
                  <motion.span
                    key={hole.id}
                    initial={{ y: "70%", scale: 0.6, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: "70%", scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Critter hole={hole} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        {phase !== "playing" && (
          <div className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-6">
            {phase === "idle" ? (
              <>
                <p className="font-display font-black text-3xl">Squash the bugs!</p>
                <p className="mt-2 text-sm text-slate-600">
                  {ROUND_SECONDS} seconds before the deploy. Golden bugs are worth 3.
                  <br />Don't touch my coffee ☕ (−2).
                </p>
                <button type="button" onClick={start} className={`mt-5 ${primaryButton}`}>
                  <Play className="w-4 h-4" /> Start
                </button>
              </>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-slate-500">{newBest ? "New best score!" : "Deployed!"}</p>
                <p className="mt-1 font-display font-black text-6xl">{score}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {score >= 25 ? "Senior engineer energy. 🔥" : score >= 15 ? "Clean build. Nice!" : "A few bugs made it to production 😅"}
                </p>
                <button type="button" onClick={start} className={`mt-5 ${primaryButton}`}>
                  <RotateCcw className="w-4 h-4" /> Play again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
