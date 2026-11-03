import QuestionBlock from "./QuestionBlock";
import { BUILD_SPECS, CONTACT } from "../data/content";
import { Download, Github, Linkedin, Mail, Phone, Wrench } from "lucide-react";

export default function Contact() {
  const linkClass = "inline-flex items-center justify-center gap-3 border-2 border-ink rounded-lg px-5 py-4 font-semibold hover:bg-ink hover:text-white transition-colors min-w-0";
  return (
    <QuestionBlock id="contact" title="Get in touch." testid="section-question-reach-me">
      <div className="max-w-2xl mx-auto flex flex-col gap-8 pb-16">
        <div>
          <p data-testid="contact-intro" className="text-lg sm:text-xl leading-relaxed text-slate-700 font-medium max-w-xl mx-auto">From an idea to a working product — that's the part I love. I'm open to research, collaborations, and interesting opportunities.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-slate-500 self-center mr-1"><Wrench className="w-3.5 h-3.5" />Built with</span>
            {BUILD_SPECS.map((s, i) => <span key={s} data-testid={`build-spec-${i}`} className="rounded-full border border-slate-300 px-3.5 py-1.5 font-mono text-xs text-slate-600">{s}</span>)}
          </div>
          <a href={CONTACT.resume} download="Ankit_Prajapati_Resume.pdf" data-testid="download-resume-button" className="mt-8 inline-flex items-center gap-3 border-2 border-ink rounded-lg px-6 py-4 font-semibold hover:bg-ink hover:text-white transition-colors"><Download className="w-5 h-5" />Download résumé<span className="font-mono text-xs opacity-60">PDF</span></a>
        </div>
        <div className="flex flex-col gap-4 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href={CONTACT.github.href} target="_blank" rel="noopener noreferrer" data-testid="contact-github-link" className={linkClass}><Github className="w-5 h-5 shrink-0" />GitHub</a>
            <a href={CONTACT.linkedin.href} target="_blank" rel="noopener noreferrer" data-testid="contact-linkedin-link" className={linkClass}><Linkedin className="w-5 h-5 shrink-0" />LinkedIn</a>
            <a href={`mailto:${CONTACT.email}`} data-testid="contact-email-value" className={`${linkClass} sm:col-span-2 font-mono text-sm`}><Mail className="w-5 h-5 text-hot shrink-0" /><span className="break-all">{CONTACT.email}</span></a>
            <a href={`tel:${CONTACT.phoneHref}`} data-testid="contact-phone-value" className={`${linkClass} sm:col-span-2 font-mono text-sm`}><Phone className="w-5 h-5 text-hot shrink-0" />{CONTACT.phone}</a>
          </div>
        </div>
      </div>
    </QuestionBlock>
  );
}
