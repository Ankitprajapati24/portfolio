import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import { SURNAME_SCRIPTS } from "../../data/content";
import { cheer, primaryButton, shuffle, useBest } from "./shared";

const SCRIPTS = SURNAME_SCRIPTS.filter((s) => s.lang !== "English");
const LANGS = SCRIPTS.map((s) => s.lang);

const makeRounds = () =>
  shuffle(SCRIPTS).map((s) => ({
    ...s,
    options: shuffle([s.lang, ...shuffle(LANGS.filter((l) => l !== s.lang)).slice(0, 3)]),
  }));

/** "Prajapati" written in six Indian scripts: guess which one you're looking at. */
export default function ScriptQuiz() {
  const [rounds, setRounds] = useState(makeRounds);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [best, saveBest] = useBest("scripts");
  const done = index >= rounds.length;
  const round = rounds[index];

  const pick = (lang) => {
    if (picked) return;
    setPicked(lang);
    const right = lang === round.lang;
    const total = score + (right ? 1 : 0);
    if (right) setScore(total);
    setTimeout(() => {
      setPicked(null);
      setIndex((i) => i + 1);
      if (index + 1 === rounds.length && total > best) {
        saveBest(total);
        cheer(total === rounds.length ? "Perfect score! 🇮🇳" : `New best: ${total}/${rounds.length}!`);
      }
    }, 1100);
  };

  const restart = () => {
    setRounds(makeRounds());
    setIndex(0);
    setScore(0);
    setPicked(null);
  };

  if (done) {
    return (
      <div className="min-h-[340px] flex flex-col items-center justify-center text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Your score</p>
        <p className="mt-1 font-display font-black text-6xl">{score}/{rounds.length}</p>
        <p className="mt-2 text-sm text-slate-600 max-w-xs">
          {score === rounds.length ? "Every script, spot on. Bahut badhiya! 🎉" : score >= 4 ? "Nice eye! India has 22 official languages, and many scripts." : "Tricky, right? India writes in many beautiful scripts."}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {SCRIPTS.map((s) => (
            <span key={s.lang} className="rounded-full border-2 border-ink px-3 py-1 text-sm">
              <span className="font-script font-bold">{s.text}</span> · {s.lang}
            </span>
          ))}
        </div>
        <button type="button" onClick={restart} className={`mt-6 ${primaryButton}`}>
          <RotateCcw className="w-4 h-4" /> Play again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
        <span className="rounded-full bg-ink text-white px-3 py-1">Round {index + 1}/{rounds.length}</span>
        <span className="rounded-full bg-accentsoft px-3 py-1">Score {score}</span>
        <span className="ml-auto text-slate-500">Best {best}/{rounds.length}</span>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600">This is my surname, "Prajapati". Which script is it written in?</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={round.lang}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="mt-4 text-center font-script font-black text-5xl sm:text-7xl break-words text-accent leading-tight py-2"
        >
          {round.text}
        </motion.p>
      </AnimatePresence>

      <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto">
        {round.options.map((lang) => {
          const isAnswer = lang === round.lang;
          const state = !picked ? "idle" : isAnswer ? "right" : lang === picked ? "wrong" : "dim";
          const look = {
            idle: "bg-white hover:bg-sun",
            right: "bg-sun",
            wrong: "bg-red-100 border-red-600 text-red-700",
            dim: "bg-white opacity-50",
          }[state];
          return (
            <button
              key={lang}
              type="button"
              onClick={() => pick(lang)}
              disabled={!!picked}
              className={`flex items-center justify-center gap-2 rounded-xl border-[3px] border-ink px-3 py-3 font-semibold transition-colors ${look}`}
            >
              {state === "right" && <Check className="w-4 h-4" strokeWidth={3} />}
              {state === "wrong" && <X className="w-4 h-4" strokeWidth={3} />}
              {lang}
            </button>
          );
        })}
      </div>
    </div>
  );
}
