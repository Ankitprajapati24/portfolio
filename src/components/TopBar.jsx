import { useEffect, useRef, useState } from "react";
import { Coffee, Loader2, Music, Piano, Radio } from "lucide-react";
import Socials from "./Socials";
import { STATIONS, setTrack, stopMusic, toggleMusic, useMusic } from "../lib/music";
import { mountSpotify, onSpotifyPlay, pauseSpotify, showInSpotify, useSpotify } from "../lib/spotify";
import { MUSIC } from "../data/content";

const STATION_ICONS = { lofi: Coffee, jazz: Piano };
const PLAYER_HEIGHT = 152; // Spotify's compact player: cover, song list, skip and play

/** Three bars that bounce while music plays. */
function Equalizer({ on }) {
  return (
    <span className="flex items-end gap-[3px] h-[18px] w-[18px] justify-center" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`w-[3px] rounded-full bg-ink ${on ? "eq-bar" : ""}`} style={{ height: on ? undefined : 6, animationDelay: `${i * 0.18}s` }} />
      ))}
    </span>
  );
}

const SpotifyLogo = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.78-2.13-9.96-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.57 11.23 1.33.37.22.48.7.25 1.07Zm.1-2.84C14.7 8.93 9.38 8.75 6.3 9.69a.94.94 0 1 1-.54-1.8c3.53-1.07 9.4-.86 13.11 1.34a.94.94 0 0 1-.96 1.61Z" /></svg>
);

/** Spotify player with a tab per playlist; visitors pick and skip songs inside it. */
function SpotifyPlayer({ items }) {
  const [pick, setPick] = useState(0);
  const { ready } = useSpotify();
  const slot = useRef(null);
  useEffect(() => { mountSpotify(slot.current, items[0].url, PLAYER_HEIGHT); }, [items]);
  const choose = (i) => { setPick(i); showInSpotify(items[i].url); };
  // Tab name: the item's label, else the last part of its title
  const label = (it, i) => it.label || it.title?.split(" - ").pop() || `List ${i + 1}`;
  return (
    <div className="mt-4 border-t border-slate-200 pt-3">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-xs text-slate-500">
          <SpotifyLogo className="w-4 h-4 fill-[#1DB954]" />
          Top on Spotify
        </p>
        {items.length > 1 && (
          <div className="flex rounded-full border border-slate-200 p-0.5" role="tablist">
            {items.map((it, i) => (
              <button
                key={it.url}
                role="tab"
                aria-selected={pick === i}
                onClick={() => choose(i)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${pick === i ? "bg-ink text-white" : "text-slate-500 hover:text-ink"}`}
              >
                {label(it, i)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 rounded-xl overflow-hidden bg-slate-100 relative" style={{ height: PLAYER_HEIGHT }}>
        {!ready && <Loader2 className="absolute inset-0 m-auto w-6 h-6 animate-spin text-slate-400" />}
        <div ref={slot} />
      </div>
    </div>
  );
}

function MusicMenu() {
  const { on, track, loading, fallback } = useMusic();
  const spotify = useSpotify();
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const ref = useRef(null);
  const current = STATIONS.find((s) => s.id === track);

  // Only one thing plays at a time: Spotify stops the radio, and the radio stops Spotify.
  useEffect(() => { onSpotifyPlay(() => stopMusic()); }, []);
  useEffect(() => { if (on) pauseSpotify(); }, [on, track]);

  useEffect(() => {
    if (!open) return;
    setEverOpened(true);
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  const status = !on
    ? (spotify.playing ? "Playing from Spotify" : "Radio paused")
    : loading ? "Tuning in…" : fallback ? "Station offline · playing built-in music" : `Live · ${current.station}`;

  return (
    <div ref={ref} className="relative" data-music-toggle>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Music"
        aria-expanded={open}
        title="Music"
        className="flex items-center hover:text-accent transition-colors"
      >
        {on || spotify.playing ? <Equalizer on={!loading} /> : <Music className="w-[18px] h-[18px]" />}
      </button>
      {/* Stays mounted once opened, so a Spotify song keeps playing when the popup closes. */}
      {everOpened && (
        <div
          className={`absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border-2 border-ink bg-white p-4 shadow-[5px_5px_0_#FFC400] z-50 transition-[opacity,transform] duration-150 ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-1.5 invisible pointer-events-none"}`}
          aria-hidden={!open}
        >
          <div className="flex items-center gap-3">
            <Radio className="w-6 h-6" />
            <p className="font-semibold">Change track</p>
          </div>
          <div className="mt-3 flex gap-4">
            {STATIONS.map((s) => {
              const Icon = STATION_ICONS[s.id];
              const active = on && track === s.id;
              return (
                <button key={s.id} onClick={() => setTrack(s.id)} aria-pressed={active} title={s.station} className="flex flex-col items-center gap-1 group">
                  <span className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors ${active ? "border-ink bg-sun" : "border-slate-200 group-hover:border-ink"}`}>
                    {active && loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : Icon ? (
                      <Icon className="w-5 h-5" />
                    ) : (
                      <span className={`font-mono text-xs font-bold ${active ? "text-ink" : "text-accent"}`}>{s.badge}</span>
                    )}
                  </span>
                  <span className={`text-[11px] ${active ? "font-bold" : "text-slate-500"}`}>{s.name}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 min-w-0" role="status">
              {on && !loading && !fallback && <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-red-500 animate-pulse" />}
              <span className="truncate">{status}</span>
            </p>
            <button onClick={toggleMusic} className="shrink-0 rounded-full border-2 border-ink text-xs font-semibold px-3 py-1 hover:bg-ink hover:text-white transition-colors">
              {on ? "Pause" : "Play radio"}
            </button>
          </div>
          {MUSIC.spotify?.length > 0 && <SpotifyPlayer items={MUSIC.spotify} />}
        </div>
      )}
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  const h = now.getHours();
  const time = `${String(h % 12 || 12).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const date = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return (
    <div className="flex items-center gap-1.5" aria-label={`Local time ${time} ${h < 12 ? "am" : "pm"}, ${date}`}>
      <span className="font-body text-3xl sm:text-4xl font-medium tabular-nums leading-none">{time}</span>
      <span className="flex flex-col text-[10px] leading-tight text-slate-600">
        <span>{h < 12 ? "am" : "pm"}</span>
        <span className="whitespace-nowrap">{date}</span>
      </span>
    </div>
  );
}

/** Top of the first screen: Hello on the left; music, links and a clock on the right. */
export default function TopBar() {
  return (
    <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-5">
      <p className="flex items-center gap-2 font-display font-extrabold text-xl sm:text-2xl text-accent">
        <span className="wave-hand text-3xl" role="img" aria-label="waving hand">👋</span>
        Hello!
      </p>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <a href="/blog" className="rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold hover:bg-sun transition-colors">Blog</a>
          <MusicMenu />
          <Socials className="hidden sm:flex gap-4" />
        </div>
        <Clock />
      </div>
    </header>
  );
}
