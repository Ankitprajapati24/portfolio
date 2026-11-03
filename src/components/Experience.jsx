import QuestionBlock from "./QuestionBlock";
import { EXPERIENCE, EDUCATION } from "../data/content";

export default function Experience() {
  return (
    <QuestionBlock
      id="experience"
      index={5}
      title="Where I've contributed."
      testid="section-question-experience"
    >
      <div className="relative">
      <div className="flex flex-wrap justify-center gap-5 pb-2">
        {EXPERIENCE.map((job, i) => (
          <article
            key={i}
            data-testid={`experience-card-${i}`}
            className={`w-full sm:w-[340px] min-h-[260px] rounded-lg border-2 border-ink p-6 flex flex-col justify-between ${
              i % 2 === 0 ? "bg-ink text-white shadow-[6px_6px_0_#FF4F00]" : "bg-white text-ink shadow-[6px_6px_0_#0F172A]"
            }`}
          >
            <div className="flex items-start justify-center">
              <span className={`font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-md border ${i % 2 === 0 ? "border-white/25 text-slate-300" : "border-slate-300 text-slate-500"}`}>
                {job.period}
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-display font-extrabold text-2xl leading-tight">{job.org}</h3>
              <p className={`font-mono text-xs uppercase tracking-wider mt-1.5 ${i % 2 === 0 ? "text-hot" : "text-hot"}`}>
                {job.role}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${i % 2 === 0 ? "text-slate-300" : "text-slate-600"}`}>
                {job.note}
              </p>
            </div>
          </article>
        ))}
      </div>
      </div>
      <div className="mt-10 border-t border-slate-300 pt-6">
        <h3 className="font-display font-bold text-lg" data-testid="education-heading">The foundations.</h3>
        <div className="mt-5 grid md:grid-cols-3 gap-6">
          {EDUCATION.map((item, i) => <div key={item.org} data-testid={`education-${i}`}>
            <p className="font-semibold">{item.org}</p><p className="text-sm text-slate-600 mt-1">{item.degree}</p><p className="font-mono text-xs text-hot mt-2">{item.period}</p>
          </div>)}
        </div>
      </div>
    </QuestionBlock>
  );
}
