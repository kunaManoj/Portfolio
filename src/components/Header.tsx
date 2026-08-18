import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV_ITEMS } from "../data/portfolio";
import { scrollToId } from "../lib/scroll";
import { OrbitLogo } from "./Icons";
import { EASE } from "./motion";
import ResumeModal from "./ResumeModal";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className={`fixed top-0 inset-x-0 z-[70] transition-colors duration-500 border-b ${
          scrolled ? "bg-void/80 backdrop-blur-md border-line-soft" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2.5 group"
            aria-label="Back to top"
          >
            <OrbitLogo className="w-7 h-7 transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-mono font-semibold text-[13px] tracking-[0.18em] text-star whitespace-nowrap">
              KunaManoj
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative px-3.5 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                  active === item.id ? "text-solar" : "text-dust hover:text-star"
                }`}
              >
                <span className="text-solar/60 mr-1.5">0{i + 1}.</span>
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full bg-solar"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-nebula/30 bg-nebula/5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-nebula animate-pulse-soft" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-nebula" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-nebula">Open to work</span>
            </span>
            <button
              onClick={() => setResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-solar/50 bg-solar/5 font-mono text-[10px] tracking-[0.2em] uppercase text-solar hover:bg-solar hover:text-[#0a0d1f] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              Résumé
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] border border-line rounded-md bg-hull/60"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`block w-4 h-[2px] bg-star transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-4 h-[2px] bg-solar transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-[2px] bg-star transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
        <motion.div
          className="h-[2px] bg-gradient-to-r from-solar via-ember to-nebula origin-left"
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[65] md:hidden bg-void/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                  onClick={() => go(item.id)}
                  className="text-left font-display font-bold text-3xl text-star hover:text-solar transition-colors py-2 border-b border-line-soft"
                >
                  <span className="font-mono text-xs text-solar mr-4">0{i + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                onClick={() => {
                  setOpen(false);
                  setResumeOpen(true);
                }}
                className="mt-6 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-md bg-solar text-[#0a0d1f] font-mono text-xs font-semibold tracking-[0.22em] uppercase"
              >
                View Résumé
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
