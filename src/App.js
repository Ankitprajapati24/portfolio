import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "./App.css";
import { registerLenis } from "./lib/ui";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import TechStack from "./components/TechStack";
import NowSection from "./components/NowSection";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Dock from "./components/Dock";
import EchoPet from "./components/EchoPet";

export default function App() {
  useEffect(() => {
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 });
    registerLenis(instance);
    let raf;
    const loop = (time) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      registerLenis(null);
    };
  }, []);

  return (
    <main className="bg-white text-ink font-body overflow-x-clip">
      <Hero />
      <Marquee />
      <About />
      <TechStack />
      <NowSection />
      <Projects />
      <Experience />
      <Contact />
      <Dock />
      <EchoPet />
      <Toaster position="top-center" richColors toastOptions={{ style: { fontFamily: "Outfit" } }} />
    </main>
  );
}
