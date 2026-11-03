import Section from "./Section";
import { HOW } from "../data/content";

export default function HowBuilt() {
  return (
    <Section id="how" data={HOW}>
      <div className="max-w-3xl">
        <p className="text-2xl sm:text-3xl font-semibold leading-snug text-ink">{HOW.answer}</p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {HOW.specs.map((s) => (
            <li key={s} className="rounded-full border-2 border-ink px-4 py-2 font-mono text-sm bg-white">{s}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
