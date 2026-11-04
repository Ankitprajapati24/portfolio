import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cheer, primaryButton, shuffle, useBest } from "./shared";

const STACK = ["Python", "React", "PyTorch", "Node.js", "OpenCV", "Flask", "Git", "Linux"];
const FACE = ["bg-accent text-white", "bg-sun text-ink", "bg-ink text-white"];
const deal = () => shuffle([...STACK, ...STACK]).map((name, id) => ({ id, name }));

/** Memory game: flip two cards at a time and pair up my tech stack. */
export default function StackMatch() {
  const [deck, setDeck] = useState(deal);
  const [open, setOpen] = useState([]);
  const [found, setFound] = useState([]);
  const [moves, setMoves] = useState(0);
  const [best, saveBest] = useBest("match");
  const busy = useRef(false);
  const won = found.length === STACK.length;

  const restart = () => {
    setDeck(deal());
    live.current = { open: [], found: [], moves: 0 };
    setOpen([]);
    setFound([]);
    setMoves(0);
    busy.current = false;
  };

  // Refs mirror state so two very quick taps both count.
  const live = useRef({ open: [], found: [], moves: 0 });
  live.current = { ...live.current, found, moves };
  const show = (list) => { live.current.open = list; setOpen(list); };

  const flip = (i) => {
    const card = deck[i];
    const { open: current, found: paired } = live.current;
    if (busy.current || current.includes(i) || paired.includes(card.name)) return;
    const next = [...current, i];
    show(next);
    if (next.length < 2) return;

    const turns = live.current.moves + 1;
    live.current.moves = turns;
    setMoves(turns);
    const [a, b] = next.map((j) => deck[j].name);
    if (a === b) {
      const all = [...paired, a];
      live.current.found = all;
      setFound(all);
      show([]);
      if (all.length === STACK.length && (!best || turns < best)) {
        saveBest(turns);
        cheer(`Matched in ${turns} moves! 🧠`);
      }
    } else {
      busy.current = true;
      setTimeout(() => { show([]); busy.current = false; }, 750);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
        <span className="rounded-full bg-ink text-white px-3 py-1">Moves {moves}</span>
        <span className="rounded-full bg-accentsoft px-3 py-1">Pairs {found.length}/{STACK.length}</span>
        <span className="ml-auto text-slate-500">Best {best ? `${best} moves` : "—"}</span>
      </div>

      <div className="relative mt-5 mx-auto max-w-md">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 [perspective:800px]">
          {deck.map((card, i) => {
            const shown = open.includes(i) || found.includes(card.name);
            const matched = found.includes(card.name);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => flip(i)}
                aria-label={shown ? card.name : "Hidden card"}
                className="aspect-[3/4] select-none touch-manipulation"
              >
                <span
                  className="relative block w-full h-full transition-transform duration-300 [transform-style:preserve-3d]"
                  style={{ transform: shown ? "rotateY(180deg)" : "none" }}
                >
                  <span className="absolute inset-0 rounded-xl border-[3px] border-ink bg-ink flex items-center justify-center font-mono font-bold text-sun text-lg [backface-visibility:hidden] hover:bg-slate-800">
                    {"</>"}
                  </span>
                  <span
                    className={`absolute inset-0 rounded-xl border-[3px] border-ink flex items-center justify-center p-1 text-center font-display font-extrabold text-xs sm:text-base leading-tight [backface-visibility:hidden] [transform:rotateY(180deg)] ${FACE[STACK.indexOf(card.name) % 3]} ${matched ? "opacity-60" : ""}`}
                  >
                    {card.name}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {won && (
          <div className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Stack complete</p>
            <p className="mt-1 font-display font-black text-6xl">{moves}</p>
            <p className="mt-1 text-sm text-slate-600">
              moves. {moves <= 12 ? "Photographic memory! 📸" : moves <= 18 ? "Sharp. You'd ace my code reviews." : "All pairs found. Try for fewer moves!"}
            </p>
            <button type="button" onClick={restart} className={`mt-5 ${primaryButton}`}>
              <RotateCcw className="w-4 h-4" /> Shuffle again
            </button>
          </div>
        )}
      </div>

      {!won && (
        <button type="button" onClick={restart} className="mt-5 mx-auto flex items-center gap-1.5 text-sm text-slate-500 hover:text-ink">
          <RotateCcw className="w-3.5 h-3.5" /> Shuffle
        </button>
      )}
    </div>
  );
}
