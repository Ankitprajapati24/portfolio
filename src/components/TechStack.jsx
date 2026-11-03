import { Code2, Layers, BrainCircuit, Cpu, Terminal } from "lucide-react";
import QuestionBlock from "./QuestionBlock";
import { SKILL_GROUPS } from "../data/content";

const icons = [Code2, Layers, BrainCircuit, Cpu, Terminal];
export default function TechStack() {
  return (
    <QuestionBlock id="stack" title="My tech stack." testid="section-question-tech-stack" flip>
      <div className="centered-items gap-x-10 gap-y-8" data-testid="tech-stack-grid">
        {SKILL_GROUPS.map((group, index) => {
          const Icon = icons[index];
          return <div key={group.title} className="border-t-2 border-ink pt-5" data-testid={`skill-group-${index}`}>
            <h3 className="flex items-center justify-center gap-3 font-display font-bold text-lg"><Icon className="w-5 h-5 text-hot shrink-0" />{group.title}</h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {group.items.map((skill, i) => <li key={skill} data-testid={`skill-${index}-${i}`} className="text-slate-600 text-base hover:text-hot transition-colors">{skill}</li>)}
            </ul>
          </div>;
        })}
      </div>
    </QuestionBlock>
  );
}
