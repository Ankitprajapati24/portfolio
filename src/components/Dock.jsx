import { AnimatePresence, motion } from "framer-motion";
import { House, FolderGit2, Briefcase, Trophy, Mic, MessageCircle, Pause, Play, X, Music, VolumeX } from "lucide-react";
import { scrollToSection } from "../lib/ui";
import { pauseStory, resumeStory, stopStory, useStory } from "../lib/story";
import { toggleMusic, useMusic } from "../lib/music";
import { closeAsk, openAsk, useAsk } from "../lib/ask";

const NAV = [
  { id: "hero", label: "Home", icon: House },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "achievements", label: "Achievements", icon: Trophy },
];

/** Shows what is being said during "Know about me", with pause and stop. */
function Captions() {
  const { status, caption } = useStory();
  return (
    <AnimatePresence>
      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="mb-3 w-[min(92vw,640px)] rounded-2xl bg-dock/95 border border-white/15 text-white px-4 py-3 flex items-center gap-3 shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-sun animate-pulse" aria-hidden />
          <p className="flex-1 min-w-0 text-sm sm:text-base leading-snug">{caption || "…"}</p>
          <button
            onClick={status === "playing" ? pauseStory : resumeStory}
            aria-label={status === "playing" ? "Pause" : "Resume"}
            className="w-9 h-9 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            {status === "playing" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={stopStory} aria-label="Stop" className="w-9 h-9 shrink-0 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Dock() {
  const { on: musicOn } = useMusic();
  const { open: askOpen } = useAsk();
  const go = (id) => { stopStory(); scrollToSection(id); };
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
      <Captions />
      <nav aria-label="Sections" className="flex items-center gap-0.5 rounded-full bg-dock border border-white/15 px-2 py-2 shadow-2xl">
        {NAV.map((it) => (
          <button
            key={it.id}
            onClick={() => go(it.id)}
            title={it.label}
            aria-label={it.label}
            className="flex items-center gap-2 rounded-full px-2.5 sm:px-3 lg:px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <it.icon className="w-[18px] h-[18px]" />
            <span className="hidden lg:inline text-sm font-medium">{it.label}</span>
          </button>
        ))}

        <button
          type="button"
          data-music-toggle
          onClick={toggleMusic}
          title={musicOn ? "Turn music off" : "Turn music on"}
          aria-label={musicOn ? "Turn music off" : "Turn music on"}
          aria-pressed={musicOn}
          className={`flex items-center rounded-full px-2.5 sm:px-3 py-2.5 hover:bg-white/10 transition-colors ${musicOn ? "text-sun" : "text-slate-500"}`}
        >
          {musicOn ? <Music className="w-[18px] h-[18px]" /> : <VolumeX className="w-[18px] h-[18px]" />}
        </button>

        <button
          type="button"
          onClick={askOpen ? closeAsk : openAsk}
          title="Ask me anything"
          aria-label="Ask me anything"
          aria-expanded={askOpen}
          className={`flex items-center gap-2 rounded-full px-2.5 sm:px-3 py-2.5 transition-colors ${askOpen ? "bg-accent text-white" : "text-accent hover:bg-white/10"}`}
        >
          <Mic className="w-[18px] h-[18px]" />
        </button>

        <span className="hidden sm:block w-px h-6 bg-white/15 mx-1" aria-hidden />

        <button
          onClick={() => go("contact")}
          aria-label="Let's talk"
          className="flex items-center gap-2 rounded-full bg-accent hover:bg-accentdark text-white text-sm font-semibold px-3 sm:px-4 py-2.5 transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Let's talk</span>
        </button>
      </nav>
    </div>
  );
}
