import Section from "./Section";
import { SKILL_GROUPS, STACK } from "../data/content";

const CHIP = ["hover:bg-accent hover:text-white", "hover:bg-sun", "hover:bg-ink hover:text-white"];

export default function TechStack() {
  return (
    <Section id="stack" data={STACK}>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {SKILL_GROUPS.map((g, gi) => (
          <div key={g.title} className="border-t-[3px] border-ink pt-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {g.items.map((s) => (
                <li key={s} className={`rounded-full border-2 border-ink bg-white px-4 py-1.5 font-semibold transition-colors ${CHIP[gi % 3]}`}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
