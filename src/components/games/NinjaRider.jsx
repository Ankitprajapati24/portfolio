import { useEffect, useRef, useState } from "react";
import { ExternalLink, Keyboard, Maximize, Play, X } from "lucide-react";
import { primaryButton } from "./shared";

// Ninja Rider is its own site; it loads here in an iframe only after a click, so the page stays fast.
const GAME_URL = "https://games.codebread.fun";

const smallButton =
  "inline-flex items-center gap-1.5 rounded-lg border-2 border-ink bg-white px-3 py-1.5 text-sm font-semibold hover:bg-sun transition-colors";

/** Ninja Rider, played inside the page. Phones open it in a new tab to get the whole screen. */
export default function NinjaRider() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frame = useRef(null);
  const canFullscreen = typeof document !== "undefined" && document.fullscreenEnabled;

  useEffect(() => {
    if (playing) frame.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [playing]);

  const start = () => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      window.open(GAME_URL, "_blank", "noopener");
      return;
    }
    setLoaded(false);
    setPlaying(true);
  };

  if (!playing) {
    return (
      <div>
        <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-ink">
          <img src="assets/projects/ninja-rider-cover.jpg" alt="Ninja Rider gameplay" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
            <button onClick={start} className={primaryButton}>
              <Play className="w-5 h-5" />
              Play Ninja Rider
            </button>
          </div>
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm text-slate-600">
          <Keyboard className="w-4 h-4 mt-0.5 shrink-0" />
          W / Shift to ride · A D to steer · Space to jump · F katana · G shuriken. Works with touch too.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-ink bg-ink">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <img src="assets/projects/ninja-rider-cover.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <span className="relative w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin" />
            <span className="relative font-mono text-xs uppercase tracking-[0.2em]">Loading Ninja Rider</span>
          </div>
        )}
        <iframe
          ref={frame}
          src={GAME_URL}
          title="Ninja Rider"
          allow="fullscreen; autoplay; gamepad"
          allowFullScreen
          onLoad={() => {
            setLoaded(true);
            frame.current?.focus();
          }}
          className="relative block h-full w-full border-0"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">Click the game to give it your keyboard.</p>
        <div className="flex flex-wrap gap-2">
          {canFullscreen && (
            <button onClick={() => frame.current?.requestFullscreen()} className={smallButton}>
              <Maximize className="w-4 h-4" />
              Full screen
            </button>
          )}
          <a href={GAME_URL} target="_blank" rel="noopener" className={smallButton}>
            <ExternalLink className="w-4 h-4" />
            New tab
          </a>
          <button onClick={() => setPlaying(false)} className={smallButton}>
            <X className="w-4 h-4" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
