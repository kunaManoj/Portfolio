import { motion } from "framer-motion";
import { PROJECTS } from "../data/portfolio";
import { EASE, Reveal, SectionHeading } from "./motion";
import { ArrowUpRight } from "./Icons";

const domain = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 85% 60%, rgba(143,179,255,0.06), transparent 70%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="04" kicker="Cargo Bay" title="Shipped, deployed & flying live" />
          <Reveal delay={0.15} y={16}>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed text-dust">
              Every bay window is a live deployment — click the frame to board the site.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20">
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* media — clickable, opens the live site */}
              <Reveal y={40} className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${p.name} live site`}
                  className="group corner-frame relative block border border-line bg-hull/80 overflow-hidden transition-all duration-500 hover:border-line hover:-translate-y-1.5 hover:shadow-[0_36px_90px_rgba(2,3,10,0.7)]"
                >
                  {/* browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line-soft bg-space/90">
                    <span className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f2695c]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-solar/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-nebula/80" />
                    </span>
                    <span className="flex-1 flex justify-center">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-line-soft bg-void font-mono text-[10px] text-dust transition-colors duration-300 group-hover:text-star group-hover:border-solar/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-nebula animate-pulse-soft" aria-hidden="true" />
                        {domain(p.url)}
                      </span>
                    </span>
                    <span className="text-dust transition-all duration-300 group-hover:text-solar group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* homepage screenshot */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-b from-hull to-space">
                    <img
                      src={p.image}
                      alt={`${p.name} homepage`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-solar/60 bg-void/85 backdrop-blur-sm font-mono text-[10px] tracking-[0.28em] uppercase text-solar">
                        Launch live site
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* copy */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
                className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-dust">
                  <span className="text-solar">{p.index}</span>
                  <span className="mx-3 text-line">//</span>
                  {p.year}
                </p>
                <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl tracking-tight text-star">
                  {p.name}
                </h3>
                <p className="mt-2 text-[15px] text-star/80">{p.tagline}</p>

                <ul className="mt-5 space-y-3">
                  {p.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm leading-relaxed text-dust">
                      <span className="mt-[7px] w-2 h-2 shrink-0 rotate-45 border border-solar/70" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full border border-line bg-space/70 font-mono text-[10px] tracking-wide text-dust">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-solar transition-all duration-300 hover:gap-4"
                >
                  Open live deployment
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
