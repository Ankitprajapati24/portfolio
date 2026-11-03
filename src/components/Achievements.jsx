import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Medal, Trophy } from "lucide-react";
import Section from "./Section";
import { ACHIEVEMENTS } from "../data/content";

const STYLE = {
  Winner: { Icon: Trophy, badge: "bg-sun text-ink", shadow: "shadow-[6px_6px_0_#FFC400]" },
  "Runner-up": { Icon: Medal, badge: "bg-accent text-white", shadow: "shadow-[6px_6px_0_#FF6B00]" },
  Finalist: { Icon: Award, badge: "bg-ink text-white", shadow: "shadow-[6px_6px_0_#0A0A0A]" },
};

export default function Achievements() {
  const reduced = useReducedMotion();
  return (
    <Section id="achievements" data={ACHIEVEMENTS}>
      <ol className="space-y-5 max-w-4xl">
        {ACHIEVEMENTS.results.map((r, i) => {
          const { Icon, badge, shadow } = STYLE[r.title];
          return (
            <motion.li
              key={r.event}
              initial={reduced ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 rounded-xl border-[3px] border-ink bg-white p-4 sm:p-5 ${shadow}`}
            >
              <span className={`w-14 h-14 shrink-0 rounded-full border-[3px] border-ink flex items-center justify-center ${badge}`}>
                <Icon className="w-6 h-6" />
              </span>
              <div className="flex-1 min-w-[12rem]">
                <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  {r.title} · {r.year}
                </p>
                <p className="mt-1 font-display font-extrabold text-xl sm:text-2xl leading-tight">{r.event}</p>
                {(r.place || r.project) && (
                  <p className="mt-0.5 text-sm text-slate-600">
                    {[r.place, r.project && `with ${r.project}`].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
              {r.href && (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white transition-colors"
                >
                  Certificate
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
