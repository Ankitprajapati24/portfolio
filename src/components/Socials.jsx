import { Github, Linkedin, Mail } from "lucide-react";
import { CONTACT } from "../data/content";

const WhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M9.2 8.6c.3-.6 1-.6 1.2 0l.5 1.2c.1.3 0 .6-.2.8l-.4.4a5 5 0 0 0 2.7 2.7l.4-.4c.2-.2.5-.3.8-.2l1.2.5c.6.2.6.9 0 1.2-1 .6-2.3.6-3.5 0a7 7 0 0 1-3.1-3.1c-.6-1.2-.6-2.5.4-3.1Z" />
  </svg>
);

export const SOCIALS = [
  { label: "GitHub", href: CONTACT.github, Icon: Github },
  { label: "LinkedIn", href: CONTACT.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${CONTACT.email}`, Icon: Mail },
  { label: "WhatsApp", href: `https://wa.me/${CONTACT.phoneHref.replace("+", "")}`, Icon: WhatsApp },
];

export default function Socials({ size = "w-[18px] h-[18px]", className = "", linkClass = "" }) {
  return (
    <ul className={`flex items-center ${className}`}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={label}
            title={label}
            className={`block text-ink hover:text-accent transition-colors ${linkClass}`}
          >
            <Icon className={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
