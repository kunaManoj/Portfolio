import { motion, useReducedMotion } from "framer-motion";
import { useScramble } from "../hooks/useScramble";
import { EASE, Magnetic } from "./motion";
import { scrollToId } from "../lib/scroll";

const OUTER_ORBIT_CHIPS = [
  { label: "REACT", angle: 8 },
  { label: "TS", angle: 53 },
  { label: "GO", angle: 98 },
  { label: "PY", angle: 143 },
  { label: "SQL", angle: 188 },
  { label: "NEXT", angle: 233 },
  { label: "DOCKER", angle: 278 },
  { label: "AI/ML", angle: 323 },
];

const INNER_ORBIT_CHIPS = [
  { label: "NODE", angle: 28 },
  { label: "gRPC", angle: 88 },
  { label: "EEG", angle: 148 },
  { label: "ML", angle: 208 },
  { label: "MONGO", angle: 268 },
  { label: "GIT", angle: 328 },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const line1 = useScramble("KUNA", 250);
  const line2 = useScramble("MANOJ", 650);

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-overlay" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 45% 40% at 75% 35%, rgba(45,212,191,0.07), transparent 70%)" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[6fr_5fr] gap-14 lg:gap-10 items-center">
        {/* ------- left: identity ------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-md border border-line bg-space/80 font-mono text-[11px] text-dust"
          >
            <span className="text-nebula">➜</span>
            <span className="text-ion">~</span>
            <span>whoami --verbose</span>
            <span className="text-solar animate-blink">▌</span>
          </motion.div>

          <h1
            className="mt-7 font-display font-bold text-[clamp(2.9rem,8vw,5.6rem)] leading-[0.98] tracking-tight text-star"
            aria-label="Kuna Manoj"
          >
            <span className="block whitespace-pre">{line1}</span>
            <span className="block whitespace-pre text-solar">{line2}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-dust"
          >
          I’m a Computer Science graduate and Software Developer with hands-on experience building full-stack applications using React, TypeScript, Node.js, Go, Django, and modern databases. I’ve worked on production software, scalable web platforms, and research projects involving deep learning, cybersecurity, and AI. I enjoy turning real-world problems into reliable, user-focused solutions and continuously exploring emerging technologies in AI and software engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("projects")}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-md bg-solar text-[#0a0d1f] font-mono text-xs font-semibold tracking-[0.22em] uppercase shadow-[0_14px_40px_rgba(252,182,75,0.3)] hover:bg-[#ffc76b] hover:shadow-[0_14px_52px_rgba(252,182,75,0.45)] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5V4.5A1.5 1.5 0 0 1 5.5 3h13A1.5 1.5 0 0 1 20 4.5v15A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5Z" />
                  <path d="M8 7h8M8 11h8M8 15h5" />
                </svg>
                Web Developer
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToId("research")}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-md border border-line text-star font-mono text-xs tracking-[0.22em] uppercase hover:border-nebula/70 hover:text-nebula transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
                  <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
                </svg>
                AI/ML Enthusiast
              </button>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-7 font-mono text-[10px] tracking-[0.25em] uppercase text-dust"
          >
            <span className="text-nebula">●</span> Computer Science graduate · IIITDM Jabalpur
          </motion.p>
        </div>

        {/* ------- right: orbital viewport ------- */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
          className="relative w-full max-w-[500px] aspect-square mx-auto"
        >
          <div
            className="absolute inset-0 rounded-full"
            aria-hidden="true"
            style={{ background: "radial-gradient(circle, rgba(252,182,75,0.10) 0%, rgba(45,212,191,0.05) 45%, transparent 70%)" }}
          />
          <div className="absolute inset-0 rounded-full border border-dashed border-line animate-spin-slow" aria-hidden="true" />
          <div className="absolute inset-[11%] rounded-full border border-line-soft animate-spin-rev" aria-hidden="true" />

          {OUTER_ORBIT_CHIPS.map((chip) => {
            const rad = (chip.angle * Math.PI) / 180;
            const x = 50 + 49 * Math.cos(rad);
            const y = 50 + 49 * Math.sin(rad);
            return (
              <span
                key={`outer-${chip.label}`}
                className="absolute px-2.5 py-1 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-space font-mono text-[9px] tracking-[0.2em] text-dust animate-spin-rev"
                style={{ left: `${x}%`, top: `${y}%`, animationDuration: "26s" }}
                aria-hidden="true"
              >
                {chip.label}
              </span>
            );
          })}

          {INNER_ORBIT_CHIPS.map((chip) => {
            const rad = (chip.angle * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            return (
              <span
                key={`inner-${chip.label}`}
                className="absolute px-2 py-1 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-soft bg-void/80 font-mono text-[8px] tracking-[0.18em] text-ion animate-spin-slow"
                style={{ left: `${x}%`, top: `${y}%`, animationDuration: "30s" }}
                aria-hidden="true"
              >
                {chip.label}
              </span>
            );
          })}

          <div className="absolute inset-[19%] rounded-full overflow-hidden border border-line shadow-[0_0_80px_rgba(45,212,191,0.15),inset_0_0_60px_rgba(2,3,10,0.8)] bg-gradient-to-b from-hull to-void animate-floaty">
            <img
              src="/laptop-hero.png"
              alt="A futuristic 3D laptop showing a glowing code editor"
              className="absolute inset-0 w-full h-full object-contain mix-blend-screen"
              style={{ transform: "scaleX(-1) scale(0.96)" }}
              loading="eager"
            />
            <svg viewBox="0 0 420 320" className="hidden" aria-hidden="true">
              <defs>
                <linearGradient id="laptop-shell" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#34416f" />
                  <stop offset="0.55" stopColor="#1b2549" />
                  <stop offset="1" stopColor="#0c1229" />
                </linearGradient>
                <linearGradient id="laptop-screen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#101a3a" />
                  <stop offset="1" stopColor="#050812" />
                </linearGradient>
                <linearGradient id="laptop-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2c3761" />
                  <stop offset="1" stopColor="#111936" />
                </linearGradient>
                <filter id="laptop-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <ellipse cx="210" cy="270" rx="150" ry="18" fill="#02040d" opacity="0.7" filter="url(#laptop-glow)" />
              <g transform="translate(25 18)">
                <path d="M70 34Q70 20 84 16h244q14 4 16 18l20 164H49L70 34Z" fill="url(#laptop-shell)" stroke="#52618e" strokeWidth="2" />
                <path d="M87 39q0-8 9-10h220q9 2 10 10l16 151H69L87 39Z" fill="url(#laptop-screen)" stroke="#2dd4bf" strokeOpacity="0.45" strokeWidth="1.5" />
                <circle cx="204" cy="30" r="2.5" fill="#8fb3ff" />

                <g opacity="0.95">
                  <rect x="86" y="52" width="236" height="18" rx="4" fill="#151f42" />
                  <circle cx="97" cy="61" r="3" fill="#f2695c" />
                  <circle cx="108" cy="61" r="3" fill="#fcb64b" />
                  <circle cx="119" cy="61" r="3" fill="#2dd4bf" />
                  <rect x="136" y="58" width="92" height="5" rx="2.5" fill="#34416f" />
                  <rect x="96" y="86" width="48" height="5" rx="2.5" fill="#2dd4bf" opacity="0.8" />
                  <rect x="96" y="101" width="91" height="5" rx="2.5" fill="#8fb3ff" opacity="0.72" />
                  <rect x="96" y="116" width="67" height="5" rx="2.5" fill="#fcb64b" opacity="0.82" />
                  <rect x="96" y="131" width="108" height="5" rx="2.5" fill="#34416f" />
                  <path d="m229 144 19-28 12 17 18-39 23 49" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="281" cy="94" r="4" fill="#fcb64b" />
                  <rect x="96" y="158" width="82" height="5" rx="2.5" fill="#52618e" />
                  <rect x="184" y="158" width="55" height="5" rx="2.5" fill="#2dd4bf" opacity="0.7" />
                </g>

                <path d="M49 198h291l54 36q8 6-8 9H20q-16-3-8-9l37-36Z" fill="url(#laptop-base)" stroke="#52618e" strokeWidth="2" />
                <path d="M71 205h247l27 20H45l26-20Z" fill="#101936" stroke="#2c3761" />
                <g fill="#6678ab" opacity="0.55">
                  {Array.from({ length: 7 }, (_, row) =>
                    Array.from({ length: 12 }, (_, col) => (
                      <rect key={`${row}-${col}`} x={82 + col * 18 + (row % 2) * 4} y={209 + row * 3.2} width="11" height="1.8" rx="0.9" />
                    ))
                  )}
                </g>
                <path d="M168 229h80q5 0 2 4l-7 7h-70l-8-7q-3-4 3-4Z" fill="#1a2549" stroke="#52618e" strokeWidth="1" />
                <path d="M33 245h323" stroke="#2dd4bf" strokeOpacity="0.65" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* telemetry card */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1 }}
            className="absolute -bottom-3 -left-2 sm:left-0 border border-line bg-space/90 backdrop-blur-sm rounded-md px-4 py-3 font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-dust shadow-[0_20px_50px_rgba(2,3,10,0.6)]"
          >
            <p className="flex items-center gap-2 text-nebula">
              <span className="w-1.5 h-1.5 rounded-full bg-nebula animate-pulse-soft" /> status — open to work
            </p>
            <p className="mt-1">Signal source — Kuna Manoj</p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToId("skills")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dust hover:text-solar transition-colors"
        aria-label="Scroll to skills"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-solar to-transparent" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
