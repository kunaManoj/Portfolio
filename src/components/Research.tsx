import { motion } from "framer-motion";
import { RESEARCH, type ResearchItem } from "../data/portfolio";
import { EASE, Reveal, SectionHeading } from "./motion";

const EEG_PATH =
  "M0,60 L24,60 L32,38 L40,84 L48,52 L56,60 L78,60 L86,22 L94,96 L102,44 L110,66 L124,60 L150,60 L158,48 L166,74 L174,30 L182,90 L190,56 L206,60 L232,60 L240,16 L248,104 L256,36 L264,70 L278,60 L304,60 L312,44 L320,78 L328,60 L352,60 L360,26 L368,92 L376,50 L384,64 L400,60 L428,60 L436,40 L444,82 L452,54 L460,60 L486,60 L494,20 L502,98 L510,42 L518,66 L534,60 L560,60 L568,48 L576,72 L584,60 L600,60";

function EegViz() {
  return (
    <div className="relative h-32 rounded-md border border-line-soft bg-[#080b1c] overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      <svg viewBox="0 0 600 120" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
        <path d={EEG_PATH} fill="none" stroke="rgba(45,212,191,0.18)" strokeWidth="1.5" />
        <path
          d={EEG_PATH}
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="1.8"
          strokeDasharray="90 550"
          className="animate-dash-flow"
          style={{ filter: "drop-shadow(0 0 6px rgba(45,212,191,0.7))" }}
        />
      </svg>
      <span className="absolute top-2 left-3 font-mono text-[9px] tracking-[0.25em] uppercase text-nebula/70">
        EEG · ch-19 · live
      </span>
      <span className="absolute bottom-2 right-3 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-dust">
        <span className="w-1.5 h-1.5 rounded-full bg-nebula animate-pulse-soft" /> recording
      </span>
    </div>
  );
}

function RadarViz() {
  return (
    <div className="relative h-32 rounded-md border border-line-soft bg-[#080b1c] overflow-hidden flex items-center justify-center">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full border border-ion/30" aria-hidden="true" />
        <div className="absolute inset-[18%] rounded-full border border-ion/25" aria-hidden="true" />
        <div className="absolute inset-[36%] rounded-full border border-ion/20" aria-hidden="true" />
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 animate-sweep"
            style={{ background: "conic-gradient(from 0deg, rgba(143,179,255,0.5), rgba(143,179,255,0.08) 70deg, transparent 90deg)" }}
            aria-hidden="true"
          />
        </div>
        {[
          { top: "22%", left: "64%", delay: "0s" },
          { top: "58%", left: "30%", delay: "0.9s" },
          { top: "70%", left: "72%", delay: "1.6s" },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-ion animate-blip shadow-[0_0_10px_rgba(143,179,255,0.9)]"
            style={{ top: b.top, left: b.left, animationDelay: b.delay }}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="absolute top-2 left-3 font-mono text-[9px] tracking-[0.25em] uppercase text-ion/70">
        APK scan · sandbox
      </span>
      <span className="absolute bottom-2 right-3 font-mono text-[9px] tracking-[0.2em] uppercase text-dust">
        3 threats flagged
      </span>
    </div>
  );
}

function ResearchCard({ item, delay }: { item: ResearchItem; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className="group relative corner-frame border border-line bg-hull/60 p-6 sm:p-8 transition-all duration-500 hover:border-line hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(2,3,10,0.65)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-dust">{item.period}</p>
        <span className="px-2.5 py-1 rounded-full border border-solar/40 bg-solar/5 font-mono text-[10px] tracking-[0.16em] uppercase text-solar">
          {item.badge}
        </span>
      </div>

      <h3 className="mt-4 font-display font-bold text-lg sm:text-xl leading-snug text-star tracking-tight">
        {item.title}
      </h3>

      <div className="mt-5">{item.viz === "eeg" ? <EegViz /> : <RadarViz />}</div>

      <ul className="mt-5 space-y-3">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-dust">
            <span className="mt-[7px] w-2 h-2 shrink-0 rotate-45 border border-nebula/70" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-3 divide-x divide-line-soft border-t border-line-soft pt-5">
        {item.stats.map((s) => (
          <div key={s.l} className="px-3 first:pl-0">
            <p className="font-display font-bold text-lg sm:text-xl text-star group-hover:text-nebula transition-colors duration-300">
              {s.v}
            </p>
            <p className="mt-1 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase leading-relaxed text-dust">{s.l}</p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function Research() {
  return (
    <section id="research" className="relative z-10 py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 45% 35% at 10% 30%, rgba(45,212,191,0.06), transparent 70%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="03" kicker="Research Lab" title="Signals, spectra & malware" />
          <Reveal delay={0.15} y={16}>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed text-dust">
              Two research tracks — neuroscience-grade deep learning and mobile security — both pushing past
              baseline accuracy.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-7">
          {RESEARCH.map((item, i) => (
            <ResearchCard key={item.title} item={item} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
