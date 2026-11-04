import Socials from "./Socials";

function Marquee({ text, reverse, className }) {
  const strip = Array(8).fill(text).join(" | ") + " | ";
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`inline-flex ${reverse ? "marquee-right" : "marquee-left"}`}>
        <span className={className}>{strip}</span>
        <span className={className} aria-hidden>{strip}</span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-14 pb-32 overflow-hidden">
      <p className="text-center text-sm text-slate-600">Connect with me on:</p>
      <Socials className="mt-4 justify-center gap-7" size="w-6 h-6" />
      <p className="mt-6 text-center text-sm">
        <a href="/blog" className="font-semibold underline underline-offset-4 decoration-accent decoration-2 hover:text-accent">Read my blog & vlogs →</a>
      </p>
      <div className="mt-12 space-y-2 select-none">
        <Marquee text="Thanks for visiting my portfolio!" className="font-display font-extrabold text-2xl sm:text-3xl text-slate-400 pr-2" />
        <Marquee text="Code & Crafted with 🧡 by Ankit Prajapati" reverse className="font-display font-extrabold text-2xl sm:text-3xl text-slate-400 pr-2" />
      </div>
    </footer>
  );
}
