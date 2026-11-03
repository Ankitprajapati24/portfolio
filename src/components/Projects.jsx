import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import QuestionBlock from "./QuestionBlock";
import { PROJECTS, HACKATHON_BADGES } from "../data/content";

export default function Projects() {
  return (
    <QuestionBlock id="projects" title="Things I've built." testid="section-question-built-projects" flip>
      <div className="centered-items gap-5">
        {PROJECTS.map((p, i) => <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group border-2 border-ink rounded-lg bg-white p-6 flex flex-col hover:shadow-[5px_5px_0_#FF4F00] transition-shadow" data-testid={`project-card-${p.id}`}>
          <h3 className="font-display font-extrabold text-2xl mt-3" data-testid={`project-title-${p.id}`}>{p.title}</h3>
          {p.award && <p className="mt-2 text-xs font-semibold text-hot" data-testid={`project-award-${p.id}`}>{p.award}</p>}
          <p className="text-slate-600 mt-3 leading-relaxed" data-testid={`project-description-${p.id}`}>{p.desc}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-5 mb-6">{p.tags.map((tag, n) => <span key={tag} data-testid={`project-${p.id}-tag-${n}`} className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-1 rounded">{tag}</span>)}</div>
          {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer" data-testid={`project-link-${p.id}`} className="mt-auto inline-flex items-center gap-2 font-semibold hover:text-hot transition-colors">{p.linkLabel}<ArrowUpRight className="w-4 h-4" /></a> : <a href="mailto:ankitp2412@gmail.com?subject=Tell%20me%20about%20EduVote" data-testid={`project-enquiry-${p.id}`} className="mt-auto inline-flex items-center gap-2 font-semibold hover:text-hot transition-colors">Ask about this project<ArrowUpRight className="w-4 h-4" /></a>}
        </motion.article>)}
      </div>
      <div className="mt-12 border-t-2 border-ink pt-6">
        <h3 className="font-display font-bold text-lg flex items-center justify-center gap-3" data-testid="hackathon-heading"><Trophy className="w-5 h-5 text-hot shrink-0" />Recognised along the way.</h3>
        <div className="centered-items gap-x-8 gap-y-7 mt-6">
          {HACKATHON_BADGES.map((b, i) => <div key={b.sub} data-testid={`hackathon-${i}`} className="border-b border-slate-200 pb-5">
            <p className="font-display font-bold text-xl">{b.title}</p><p className="text-sm text-slate-600 mt-1">{b.sub}</p>
            {b.href && <a href={b.href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold mt-2 inline-flex items-center gap-1 hover:text-hot transition-colors" data-testid={`certificate-link-${i}`}>View certificate<ArrowUpRight className="w-3 h-3" /></a>}
          </div>)}
        </div>
      </div>
    </QuestionBlock>
  );
}
