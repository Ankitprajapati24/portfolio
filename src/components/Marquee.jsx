import { MARQUEE_ITEMS } from "../data/content";

export default function Marquee() {
  const strip = (hidden) => (
    <div aria-hidden={hidden} className="flex items-center shrink-0">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-display font-extrabold uppercase tracking-tight text-2xl sm:text-4xl text-ink whitespace-nowrap px-6">
            {item}
          </span>
          <span className="w-3 h-3 rounded-full bg-hot shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div data-testid="editorial-marquee" className="border-y-2 border-ink bg-white py-5 sm:py-7 overflow-hidden">
      <div className="marquee-track">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
