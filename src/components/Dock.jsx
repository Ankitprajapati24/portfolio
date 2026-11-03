import { House, FolderGit2, Briefcase, Mic, MessageCircle } from "lucide-react";
import { scrollToSection } from "../lib/ui";

export default function Dock() {
  const items = [
    { id: "home", label: "Home", icon: House, onClick: () => scrollToSection("hero"), testid: "dock-home-button" },
    { id: "projects", label: "Projects", icon: FolderGit2, onClick: () => scrollToSection("projects"), testid: "dock-projects-button" },
    { id: "experience", label: "Experience", icon: Briefcase, onClick: () => scrollToSection("experience"), testid: "dock-experience-button" },
  ];

  return (
    <nav
      data-testid="floating-dark-dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full bg-dock border border-white/15 px-2.5 py-2 shadow-2xl"
      style={{ backdropFilter: "blur(14px)" }}
    >
      {items.map((it) => (
        <button
          key={it.id}
          data-testid={it.testid}
          onClick={it.onClick}
          title={it.label}
          aria-label={it.label}
          className="flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <it.icon className="w-[18px] h-[18px]" />
          <span className="hidden md:inline text-sm font-medium">{it.label}</span>
        </button>
      ))}

      <button
        data-testid="dock-microphone-button"
        onClick={() => window.dispatchEvent(new CustomEvent("echo:voice"))}
        title="Talk to Echo with your voice"
        aria-label="Microphone"
        className="flex items-center rounded-full px-3.5 sm:px-4 py-2.5 text-hot hover:bg-white/10 transition-colors"
      >
        <Mic className="w-[18px] h-[18px]" />
      </button>

      <span className="w-px h-6 bg-white/15 mx-1" aria-hidden />

      <button
        data-testid="dock-lets-talk-button"
        onClick={() => scrollToSection("contact")}
        className="flex items-center gap-2 rounded-full bg-hot hover:bg-hotdark text-white text-sm font-semibold px-4 sm:px-5 py-2.5 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Let's Talk
      </button>
    </nav>
  );
}
