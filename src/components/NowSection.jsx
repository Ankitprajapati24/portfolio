import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import QuestionBlock from "./QuestionBlock";
import { TERMINAL_SCRIPT } from "../data/content";

export default function NowSection() {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: false, margin: "-120px" });
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers = [];
    const wait = (ms) => new Promise((res) => timers.push(setTimeout(res, ms)));

    const run = async () => {
      setLines([]); setTyping(""); setCmdIdx(0);
      await wait(500);
      for (let s = 0; s < TERMINAL_SCRIPT.length; s++) {
        if (cancelled) return;
        const step = TERMINAL_SCRIPT[s];
        setCmdIdx(s);
        const cmd = step.cmd;
        for (let c = 1; c <= cmd.length; c++) {
          if (cancelled) return;
          setTyping(cmd.slice(0, c));
          await wait(55 + Math.random() * 60);
        }
        await wait(320);
        if (cancelled) return;
        setTyping("");
        setLines((l) => [...l, { type: "cmd", text: cmd }]);
        for (const out of step.out) {
          await wait(340);
          if (cancelled) return;
          setLines((l) => [...l, { type: "out", text: out }]);
        }
        await wait(850);
      }
      if (cancelled) return;
      await wait(2800);
      if (!cancelled) run();
    };
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView]);

  return (
    <QuestionBlock
      id="now"
      index={3}
      title="On my desk."
      testid="section-question-working-on-now"
    >
      <div ref={wrapRef} data-testid="terminal-window-container" className="max-w-3xl mx-auto rounded-lg border-2 border-ink shadow-[6px_6px_0_#0F172A] overflow-hidden bg-term">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-slate-400">ankit@interview: ~/now</span>
          <span data-testid="terminal-label" className="ml-auto font-mono text-[10px] uppercase tracking-widest text-hot">research log</span>
        </div>
        <div className="dot-grid-dark px-4 sm:px-6 py-5 font-mono text-[13px] sm:text-[15px] leading-relaxed min-h-[280px]">
          {lines.map((l, i) =>
            l.type === "cmd" ? (
              <p key={i} className="text-slate-200">
                <span className="text-hot">➜ ~ </span>{l.text}
              </p>
            ) : (
              <p key={i} className="text-emerald-300/90 whitespace-pre-wrap">{l.text}</p>
            )
          )}
          <p className="text-slate-200">
            <span className="text-hot">➜ ~ </span>
            {typing}
            <span className="term-caret" />
          </p>
        </div>
      </div>
    </QuestionBlock>
  );
}
