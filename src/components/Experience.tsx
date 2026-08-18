import { motion } from "framer-motion";
import { EXPERIENCE } from "../data/portfolio";
import { EASE, Reveal, SectionHeading } from "./motion";
import { ArrowUpRight, CapIcon, GithubIcon } from "./Icons";

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 85% 20%, rgba(252,182,75,0.05), transparent 70%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20">
        {/* sticky rail */}
        <div className="lg:sticky lg:top-28 self-start">
          <SectionHeading index="02" kicker="Trajectory" title="Mission log & education" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-dust text-[15px] leading-relaxed">
              From campus ERP systems to InsurTech microservices — every stop taught me to ship software that
              survives contact with real users.
            </p>
          </Reveal>

          {/* education card */}
          <Reveal delay={0.25} y={24}>
            <div className="relative corner-frame mt-10 p-6 border border-line bg-hull/70">
              <div className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-md border border-solar/40 bg-solar/10 text-solar">
                  <CapIcon className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-solar">Education</p>
                  <h3 className="mt-2 font-display font-semibold text-lg leading-snug text-star">
                    PDPM Indian Institute of Information Technology, Design & Manufacturing
                  </h3>
                  <p className="mt-1.5 text-sm text-dust">Bachelor of Technology — Computer Science & Engineering</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Jabalpur, M.P.", "2022 — 2026", "CSE Core"].map((chip) => (
                      <span key={chip} className="px-2.5 py-1 rounded-full border border-line font-mono text-[10px] tracking-[0.14em] uppercase text-dust">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <a
              href="https://github.com/kunaManoj"
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-dust hover:text-solar transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              More on GitHub
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        {/* timeline */}
        <div className="relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-solar/60 via-line to-transparent" aria-hidden="true" />
          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((item, i) => (
              <motion.article
                key={item.company}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
                className="relative pl-10 group"
              >
                <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-solar bg-void transition-all duration-300 group-hover:bg-solar group-hover:shadow-[0_0_18px_rgba(252,182,75,0.6)]" aria-hidden="true" />
                <div className="p-6 sm:p-7 rounded-lg border border-line-soft bg-space/70 transition-all duration-500 group-hover:border-line group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_rgba(2,3,10,0.6)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-dust">{item.period}</p>
                    <span className="px-2.5 py-1 rounded-full border border-nebula/30 bg-nebula/5 font-mono text-[10px] tracking-[0.16em] uppercase text-nebula">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl text-star tracking-tight">
                    {item.role}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-solar">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
                        {item.company}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      item.company
                    )}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm leading-relaxed text-dust">
                        <span className="mt-[7px] w-2 h-2 shrink-0 rotate-45 border border-solar/70" aria-hidden="true" />
                        <span>
                          {b.split(/(\*\*[^*]+\*\*)/).map((part, pi) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={pi} className="text-star font-semibold">{part.slice(2, -2)}</strong>
                            ) : (
                              <span key={pi}>{part}</span>
                            )
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
