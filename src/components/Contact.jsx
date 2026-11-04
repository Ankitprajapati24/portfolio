import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import Section from "./Section";
import { CONTACT } from "../data/content";
import { openTalk } from "../lib/talk";

export default function Contact() {
  const link = "inline-flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-5 py-4 font-semibold hover:bg-ink hover:text-white transition-colors min-w-0";
  return (
    <Section id="contact" data={CONTACT} dotted>
      <div className="pb-8">
        <p className="max-w-2xl text-2xl sm:text-3xl font-semibold leading-snug">{CONTACT.answer}</p>

        <button
          type="button"
          onClick={openTalk}
          className="group mt-12 inline-flex items-center gap-4 rounded-full bg-accent text-white font-display font-black text-4xl sm:text-6xl px-10 sm:px-14 py-6 sm:py-8 border-[3px] border-ink shadow-[8px_8px_0_#0A0A0A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#0A0A0A] transition-all"
        >
          Let's talk
          <ArrowUpRight className="w-10 h-10 sm:w-14 sm:h-14 group-hover:rotate-45 transition-transform" />
        </button>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <a href={`mailto:${CONTACT.email}`} className={`${link} sm:col-span-2 lg:col-span-1 font-mono text-sm`}>
            <Mail className="w-5 h-5 text-accent shrink-0" /><span className="break-all">{CONTACT.email}</span>
          </a>
          <a href={`tel:${CONTACT.phoneHref}`} className={`${link} font-mono text-sm`}>
            <Phone className="w-5 h-5 text-accent shrink-0" />{CONTACT.phone}
          </a>
          <a href={CONTACT.resume} download="Ankit_Prajapati_Resume.pdf" className={link}>
            <Download className="w-5 h-5 text-accent shrink-0" />Résumé (PDF)
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={link}>
            <Github className="w-5 h-5 shrink-0" />GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
            <Linkedin className="w-5 h-5 shrink-0" />LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
