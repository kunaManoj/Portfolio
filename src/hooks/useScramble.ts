import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "#@$%&/<>*+=?_01";

export function useScramble(text: string, startDelay = 0): string {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(() => text.replace(/[^\s]/g, "\u00A0"));

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    let frame = 0;
    const start = performance.now() + startDelay;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame += 1;
      const reveal = Math.floor(frame / 3);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " ") {
          s += " ";
          continue;
        }
        s += i < reveal ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (reveal <= text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, startDelay, reduced]);

  return out;
}

export function useCountUp(target: number, inView: boolean, duration = 1400): number {
  const reduced = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);
  return v;
}
