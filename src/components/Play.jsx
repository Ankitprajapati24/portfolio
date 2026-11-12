import { useState } from "react";
import { Bug, Languages, LayoutGrid, Swords } from "lucide-react";
import Section from "./Section";
import { PLAY } from "../data/content";
import { useBest } from "./games/shared";
import BugSquash from "./games/BugSquash";
import StackMatch from "./games/StackMatch";
import ScriptQuiz from "./games/ScriptQuiz";
import NinjaRider from "./games/NinjaRider";

const GAMES = {
  ninja: { Game: NinjaRider, Icon: Swords, color: "bg-ink text-sun" },
  bugs: { Game: BugSquash, Icon: Bug, color: "bg-accent text-white" },
  match: { Game: StackMatch, Icon: LayoutGrid, color: "bg-sun text-ink" },
  scripts: { Game: ScriptQuiz, Icon: Languages, color: "bg-ink text-white" },
};

function Best({ id }) {
  const [best] = useBest(id);
  if (!best) return null;
  const text = { bugs: `Best ${best}`, match: `Best ${best} moves`, scripts: `Best ${best}/6` }[id];
  return <span className="font-mono text-[11px] text-slate-500">{text}</span>;
}

/** A few small games to play between projects. */
export default function Play() {
  const [active, setActive] = useState(PLAY.games[0].id);
  const { Game } = GAMES[active];

  return (
    <Section id="play" data={PLAY} dotted>
      <p className="max-w-2xl text-lg text-slate-700 -mt-4 mb-10">{PLAY.intro}</p>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <div role="tablist" aria-label="Games" className="min-w-0 grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {PLAY.games.map((g) => {
            const { Icon, color } = GAMES[g.id];
            const selected = g.id === active;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(g.id)}
                className={`text-left flex items-start gap-3 rounded-2xl border-[3px] border-ink p-4 transition-all ${
                  selected ? "bg-white shadow-[5px_5px_0_#FF6B00] -translate-x-[2px] -translate-y-[2px]" : "bg-white/70 hover:bg-white"
                }`}
              >
                <span className={`w-11 h-11 shrink-0 rounded-xl border-2 border-ink flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-extrabold text-lg leading-tight">{g.name}</span>
                  <span className="block mt-0.5 text-sm text-slate-600 leading-snug">{g.blurb}</span>
                  <Best id={g.id} />
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="min-w-0 rounded-3xl border-[3px] border-ink bg-white p-4 sm:p-7 shadow-[8px_8px_0_#FFC400] min-h-[420px]">
          <Game key={active} />
        </div>
      </div>
    </Section>
  );
}
