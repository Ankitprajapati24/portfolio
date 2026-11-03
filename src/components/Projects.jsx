import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Hand, HeartPulse, Mail, Package, Server, Sparkles, Trophy, Vote, Workflow, X, Zap } from "lucide-react";
import Section from "./Section";
import { BUILT, CONTACT, OTHER_PROJECTS } from "../data/content";
import { lockScroll, unlockScroll } from "../lib/ui";

const ICONS = { workflow: Workflow, server: Server, zap: Zap, vote: Vote, "heart-pulse": HeartPulse, hand: Hand };
const TONES = {
  ink: { bg: "bg-ink", fg: "text-white", sub: "text-slate-400", dots: "dot-grid-dark" },
  sun: { bg: "bg-sun", fg: "text-ink", sub: "text-ink/70", dots: "dot-grid" },
  accent: { bg: "bg-accent", fg: "text-white", sub: "text-white/80", dots: "dot-grid-dark" },
};

/** "https://github.com/Ankitprajapati24/SignEcho" → "github.com/Ankitprajapati24" */
const hostOf = (href) => {
  if (!href) return "Private project";
  const u = new URL(href);
  const host = u.host.replace(/^www\./, "");
  return host === "github.com" ? `${host}/${u.pathname.split("/")[1]}` : host;
};

function AppIcon({ project, size = "w-16 h-16", icon = "w-8 h-8" }) {
  const Icon = ICONS[project.app.icon];
  const t = TONES[project.app.tone];
  return (
    <span className={`${size} shrink-0 rounded-2xl border-[3px] border-ink ${t.bg} ${t.fg} flex items-center justify-center shadow-[3px_3px_0_#0A0A0A]`}>
      <Icon className={icon} strokeWidth={2.2} />
    </span>
  );
}

/** Stand-in "screenshot" for projects without a live site. */
function Cover({ project }) {
  const Icon = ICONS[project.app.icon];
  const t = TONES[project.app.tone];
  return (
    <div className={`h-full w-full ${t.bg} ${t.dots} flex flex-col items-center justify-center gap-4 p-6`}>
      <span className="w-20 h-20 rounded-3xl border-[3px] border-ink bg-white flex items-center justify-center shadow-[5px_5px_0_#0A0A0A] -rotate-6">
        <Icon className="w-10 h-10 text-ink" strokeWidth={2.2} />
      </span>
      <p className={`font-mono text-xs uppercase tracking-[0.2em] text-center ${t.fg}`}>{project.app.line}</p>
    </div>
  );
}

/** Horizontal, swipeable row of screenshots with arrow buttons. */
function Screenshots({ project }) {
  const row = useRef(null);
  const shots = project.images?.length ? project.images : [null];
  const many = shots.length > 1;
  const nudge = (dir) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="relative">
      <div ref={row} className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {shots.map((src, i) => (
          <div
            key={src || i}
            className={`snap-start shrink-0 aspect-[16/10] rounded-xl border-2 border-ink overflow-hidden bg-slate-100 ${many ? "w-[85%]" : "w-full"}`}
          >
            {src ? <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="h-full w-full object-cover object-top" /> : <Cover project={project} />}
          </div>
        ))}
      </div>
      {many && (
        <>
          <button onClick={() => nudge(-1)} aria-label="Previous screenshot" className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-md hover:bg-sun">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => nudge(1)} aria-label="Next screenshot" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-md hover:bg-sun">
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}

/** Slide-up panel with a project's details, like an app-store listing. */
function ProjectSheet({ project, onClose }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);
  useEffect(() => {
    lockScroll();
    closeRef.current?.focus();
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); unlockScroll(); };
  }, [onClose]);

  const p = project;
  const github = p.href?.includes("github.com");
  const action = p.href
    ? { href: p.href, label: github ? "View source" : "Visit", Icon: github ? Github : ArrowUpRight, external: true }
    : { href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(`About ${p.title}`)}`, label: "Ask me about it", Icon: Mail };

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        data-lenis-prevent
        initial={reduced ? false : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full sm:max-w-xl max-h-[90svh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-[3px] border-ink bg-white shadow-[8px_8px_0_#FFC400]"
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" aria-hidden />
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <Package className="w-5 h-5" />
              Ankit's Project Store
            </p>
            <button ref={closeRef} onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-ink">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <AppIcon project={p} />
            <div className="min-w-0">
              <h3 className="font-display font-black text-3xl leading-none">{p.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 truncate">{hostOf(p.href)}</p>
            </div>
          </div>

          {(p.latest || p.award) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.latest && (
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase">
                  <Sparkles className="w-3 h-3" /> Latest
                </span>
              )}
              {p.award && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accentsoft border border-accent px-2.5 py-0.5 font-mono text-[11px] text-accentdark">
                  <Trophy className="w-3 h-3" /> {p.award}
                </span>
              )}
            </div>
          )}

          <div className="mt-5"><Screenshots project={p} /></div>

          <p className="mt-5 text-slate-600 leading-relaxed">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="font-mono text-[11px] bg-slate-100 rounded px-2 py-1 text-slate-700">{t}</span>
            ))}
          </div>

          <a
            href={action.href}
            {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-ink text-white font-semibold py-3.5 hover:bg-accent transition-colors"
          >
            <action.Icon className="w-4 h-4" />
            {action.label}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Section id="projects" data={BUILT} dotted>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OTHER_PROJECTS.map((p, i) => (
          <motion.li
            key={p.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <button
              onClick={() => setOpen(p)}
              className={`group relative w-full h-full text-left flex items-center gap-4 rounded-2xl border-[3px] border-ink bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 ${p.latest ? "shadow-[6px_6px_0_#FF6B00] hover:shadow-[10px_10px_0_#FF6B00]" : "shadow-[6px_6px_0_#0A0A0A] hover:shadow-[10px_10px_0_#0A0A0A]"}`}
            >
              <AppIcon project={p} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-xl leading-tight">{p.title}</span>
                  {p.latest && <span className="rounded-full bg-sun border border-ink px-1.5 py-px font-mono text-[9px] font-bold uppercase">New</span>}
                  {p.award && <Trophy className="w-4 h-4 text-accent shrink-0" aria-label="Award winner" />}
                </span>
                <span className="mt-1 block text-sm text-accentdark truncate">{hostOf(p.href)}</span>
              </span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-ink transition-colors shrink-0" />
            </button>
          </motion.li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-slate-500">Tap a project to see screenshots and details.</p>

      {/* Rendered at the top of the page so it always covers the whole screen. */}
      {createPortal(<AnimatePresence>{open && <ProjectSheet key={open.id} project={open} onClose={close} />}</AnimatePresence>, document.body)}
    </Section>
  );
}
