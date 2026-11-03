import { ArrowUpRight, ArrowRight, Trophy } from "lucide-react";
import Section from "./Section";
import { FEATURED, PROUD } from "../data/content";

export default function Proud() {
  const p = FEATURED;
  return (
    <Section id="proud" data={PROUD}>
      <article className="grid lg:grid-cols-[1.4fr_1fr] rounded-2xl border-[3px] border-ink bg-ink text-white overflow-hidden shadow-[10px_10px_0_#FF6B00]">
        <div className="p-7 sm:p-12 flex flex-col">
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            {p.award}
          </p>
          <h3 className="mt-6 font-display font-black text-6xl sm:text-8xl leading-none">{p.title}</h3>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">{p.desc}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="font-mono text-xs border border-white/25 rounded-md px-2.5 py-1 text-slate-300">{t}</span>
            ))}
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 self-start inline-flex items-center gap-2 rounded-full bg-white text-ink font-semibold px-6 py-3 hover:bg-accentsoft transition-colors"
          >
            {p.linkLabel}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="dot-grid-dark border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-white/10 p-7 sm:p-12 flex flex-col justify-center gap-10">
          <div>
            <p className="font-display font-black text-7xl sm:text-8xl text-accent leading-none">{PROUD.stat.value}</p>
            <p className="mt-3 font-mono text-sm text-slate-400">{PROUD.stat.label}</p>
          </div>
          <ol className="flex flex-wrap items-center gap-2 font-mono text-sm" aria-label="Pipeline">
            {PROUD.pipeline.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                <span className="rounded-md border border-white/25 bg-white/5 px-3 py-1.5">{stage}</span>
                {i < PROUD.pipeline.length - 1 && <ArrowRight className="w-4 h-4 text-accent" aria-hidden />}
              </li>
            ))}
          </ol>
        </div>
      </article>
    </Section>
  );
}
