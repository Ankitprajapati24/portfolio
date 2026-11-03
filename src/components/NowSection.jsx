import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Section from "./Section";
import { NOW } from "../data/content";

/** Types each command, then prints its output. Runs once when scrolled into view. */
export default function NowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduced = useReducedMotion();
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setLines(NOW.script.flatMap((s) => [{ type: "cmd", text: s.cmd }, ...s.out.map((text) => ({ type: "out", text }))]));
      setDone(true);
      return;
    }
    let cancelled = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      await wait(400);
      for (const step of NOW.script) {
        for (let c = 1; c <= step.cmd.length; c++) {
          if (cancelled) return;
          setTyping(step.cmd.slice(0, c));
          await wait(70 + Math.random() * 60);
        }
        await wait(300);
        if (cancelled) return;
        setTyping("");
        setLines((l) => [...l, { type: "cmd", text: step.cmd }]);
        for (const out of step.out) {
          await wait(260);
          if (cancelled) return;
          setLines((l) => [...l, { type: "out", text: out }]);
        }
        await wait(700);
      }
      if (!cancelled) setDone(true);
    })();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView, reduced]);

  const prompt = <span className="text-accent">ankit@portfolio:~$ </span>;

  return (
    <Section id="now" data={NOW} dotted>
      <div ref={ref} className="max-w-4xl rounded-xl border-2 border-ink bg-term shadow-[8px_8px_0_#0A0A0A] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#161B22]">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-slate-400">ankit — zsh</span>
        </div>
        <div className="p-5 sm:p-7 font-mono text-sm sm:text-base leading-relaxed text-slate-200 min-h-[300px]" aria-live="polite">
          {lines.map((l, i) =>
            l.type === "cmd" ? (
              <p key={i} className={i > 0 ? "mt-4" : ""}>{prompt}<span className="text-white">{l.text}</span></p>
            ) : (
              <p key={i} className="text-slate-300 whitespace-pre-wrap break-words">{l.text}</p>
            ),
          )}
          {!done && (
            <p className={lines.length ? "mt-4" : ""}>{prompt}<span className="text-white">{typing}</span><span className="term-caret" /></p>
          )}
          {done && <p className="mt-4">{prompt}<span className="term-caret" /></p>}
        </div>
      </div>
    </Section>
  );
}
