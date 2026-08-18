import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [hidden, setHidden] = useState(true);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dotX = useSpring(mx, { stiffness: 900, damping: 55, mass: 0.4 });
  const dotY = useSpring(my, { stiffness: 900, damping: 55, mass: 0.4 });
  const ringX = useSpring(mx, { stiffness: 190, damping: 22, mass: 0.7 });
  const ringY = useSpring(my, { stiffness: 190, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement | null;
      setHot(!!target?.closest?.("a, button, [role='button'], input, textarea, .keycap, [data-cursor]"));
    };
    const onLeaveDoc = () => setHidden(true);
    const onEnterDoc = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onEnterDoc);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onEnterDoc);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[95] pointer-events-none"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-solar"
          animate={{ scale: hidden ? 0 : hot ? 0.4 : 1, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[94] pointer-events-none mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="w-9 h-9 rounded-full border border-star/60"
          animate={{ scale: hidden ? 0 : hot ? 1.7 : 1, opacity: hidden ? 0 : 0.9 }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
    </>
  );
}
