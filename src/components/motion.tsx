import { type ReactNode, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useInView,
  type Transition,
} from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Line-mask reveal for display headings */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: reduced ? 0 : "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal y={16}>
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-dust">
          <span className="text-solar">{index}</span>
          <span className="mx-3 text-line">//</span>
          {kicker}
        </p>
      </Reveal>
      <h2 className="mt-4 font-display font-bold text-[clamp(1.7rem,4.5vw,3.1rem)] leading-[1.08] tracking-tight text-star">
        <MaskReveal delay={0.08}>{title}</MaskReveal>
      </h2>
    </div>
  );
}

/** Magnetic hover button wrapper */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  onClick,
  href,
  external,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "div";
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className ?? ""}`}
    >
      <Tag
        {...(href
          ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}), onClick }
          : { onClick })}
        className="block"
      >
        {children}
      </Tag>
    </motion.div>
  );
}

/** Animated underline link for nav */
export function useHoverSwap() {
  const [hovered, setHovered] = useState(false);
  return { hovered, onHover: () => setHovered(true), onLeave: () => setHovered(false) };
}

export const fadeUp: Transition = { duration: 0.8, ease: EASE };

export function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}
