import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "./lib/scroll";
import Starfield from "./components/Starfield";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SkillKeyboard from "./components/SkillKeyboard";
import Experience from "./components/Experience";
import Research from "./components/Research";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-star font-body">
      <Starfield />
      <Cursor />
      <Header />
      <main className="relative">
        <Hero />
        <Marquee />
        <SkillKeyboard />
        <Experience />
        <Research />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
