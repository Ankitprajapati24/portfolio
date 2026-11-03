import { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";
import { registerLenis } from "./lib/ui";
import { stopStory } from "./lib/story";
import { startMusicOnFirstGesture } from "./lib/music";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import NowSection from "./components/NowSection";
import Proud from "./components/Proud";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Experience from "./components/Experience";
import HowBuilt from "./components/HowBuilt";
import Contact from "./components/Contact";
import Dock from "./components/Dock";
import Pet from "./components/Pet";
import Footer from "./components/Footer";
import ClickSpark from "./components/ClickSpark";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 });
    registerLenis(lenis);
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Stop talking if the visitor leaves the tab.
    const removeMusicStarter = startMusicOnFirstGesture();
    const onHide = () => { if (document.hidden) stopStory(); };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      registerLenis(null);
      document.removeEventListener("visibilitychange", onHide);
      removeMusicStarter();
      stopStory();
    };
  }, []);

  return (
    <main className="bg-white text-ink font-body overflow-x-clip">
      <Hero />
      <About />
      <TechStack />
      <NowSection />
      <Proud />
      <Projects />
      <Achievements />
      <Experience />
      <HowBuilt />
      <Contact />
      <Footer />
      <Dock />
      <Pet />
      <ClickSpark />
    </main>
  );
}
