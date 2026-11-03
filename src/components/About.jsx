import QuestionBlock from "./QuestionBlock";
import { ABOUT } from "../data/content";

export default function About() {
  return (
    <QuestionBlock
      id="about"
      index={1}
      title="A little about me."
      testid="section-question-tell-me-about-yourself"
    >
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-block mb-8 -rotate-2 border-2 border-ink bg-white font-mono text-[11px] sm:text-xs uppercase px-3.5 py-2 shadow-[4px_4px_0_#FF4F00]" data-testid="about-sticker">
          {ABOUT.sticker}
        </div>
        <div className="space-y-5">
          {ABOUT.answer.map((para, i) => (
            <p key={i} data-testid={`about-paragraph-${i}`} className="text-lg sm:text-xl leading-relaxed text-slate-700 font-medium">
              {para}
            </p>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {["Vision (AI/CV)", "Devices (IoT / Edge)", "Backend (Distributed)"].map((b) => (
            <span key={b} className="rounded-full border-2 border-ink px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink bg-white">
              {b}
            </span>
          ))}
        </div>
      </div>
    </QuestionBlock>
  );
}
