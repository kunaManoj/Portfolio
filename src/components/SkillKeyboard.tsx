import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CATEGORY_META,
  COURSEWORK,
  KEY_ROWS,
  QWERTY_ROWS,
  SKILLS,
  SOFT_SKILLS,
  type Category,
  type Skill,
} from "../data/portfolio";
import { EASE, Reveal, SectionHeading } from "./motion";

const SPACE_SKILL: Skill = {
  id: "space",
  code: "SPACE",
  label: "Full-Stack",
  category: "framework",
  blurb:
    "The bar that holds the deck together — requirement gathering to deployment: APIs, auth, payments, CI/CD and everything that ships a product end-to-end.",
};

const ROW_OFFSETS = ["ml-0", "ml-[4.5%]", "ml-[8%]"];

export default function SkillKeyboard() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string>("react");
  const [pressed, setPressed] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ rx: 16, ry: -9 });
  const deckRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const activeId = hovered ?? pinned;
  const active = activeId === "space" ? SPACE_SKILL : SKILLS[activeId] ?? SPACE_SKILL;
  const meta = CATEGORY_META[active.category];

  const keyMap = useMemo(() => {
    const m: Record<string, string> = {};
    QWERTY_ROWS.forEach((row, r) =>
      row.forEach((k, i) => {
        if (KEY_ROWS[r]?.[i]) m[k] = KEY_ROWS[r][i];
      })
    );
    m[" "] = "space";
    return m;
  }, []);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const id = keyMap[e.key.toLowerCase()];
      if (id) {
        e.preventDefault();
        setPinned(id);
        setPressed(id);
      }
    };
    const onUp = () => setPressed(null);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [keyMap]);

  const onDeckMove = (e: React.MouseEvent) => {
    const el = deckRef.current;
    if (!el) return;
    const key = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-key-id]");
    setHovered(key?.dataset.keyId ?? null);
    if (reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: 16 - (py - 0.5) * 12, ry: (px - 0.5) * 16 });
  };

  const skillsByCat = useMemo(() => {
    const groups: Record<Category, Skill[]> = { language: [], framework: [], stack: [] };
    Object.values(SKILLS).forEach((s) => groups[s.category].push(s));
    return groups;
  }, []);

  const renderKey = (id: string, qi: string | null) => {
    const s = SKILLS[id];
    const color = CATEGORY_META[s.category].color;
    const isActive = activeId === id;
    const isPressed = pressed === id;
    return (
      <button
        key={id}
        data-key-id={id}
        onMouseEnter={() => setHovered(id)}
        onMouseMove={() => setHovered(id)}
        onPointerEnter={() => setHovered(id)}
        onFocus={() => setHovered(id)}
        onBlur={() => setHovered(null)}
        onClick={() => setPinned(id)}
        aria-pressed={pinned === id}
        aria-label={`${s.label} — ${s.blurb}`}
        className={`keycap relative flex-1 max-w-[64px] h-12 sm:h-14 rounded-md flex items-center justify-center ${
          isActive ? "is-active" : ""
        } ${isPressed ? "is-pressed" : ""}`}
        style={{ ["--cap-color" as string]: color }}
      >
        <span
          className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-40"
          }`}
          style={{ background: color, boxShadow: isActive ? `0 0 8px ${color}` : "none" }}
          aria-hidden="true"
        />
        {qi && (
          <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-dust/60" aria-hidden="true">
            {qi}
          </span>
        )}
        <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.08em] text-star/90">
          {s.code}
        </span>
      </button>
    );
  };

  return (
    <section id="skills" className="relative z-10 py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 15%, rgba(252,182,75,0.06), transparent 70%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="01" kicker="The Skill Deck" title="Every key is a tool I ship with" />
          <Reveal delay={0.15} y={16}>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed text-dust">
              Hover to inspect a key, click to lock it — and yes, your physical keyboard maps 1:1 onto the deck.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid lg:grid-cols-[7fr_4fr] gap-10 lg:gap-12 items-start">
          {/* ------- the deck ------- */}
          <Reveal y={36}>
            <div
              style={{ perspective: "1400px" }}
              onMouseMove={onDeckMove}
              onMouseLeave={() => {
                setTilt({ rx: 16, ry: -9 });
                setHovered(null);
              }}
            >
              <div
                ref={deckRef}
                className="relative rounded-xl border border-line bg-gradient-to-b from-hull to-space p-5 sm:p-7 shadow-[0_50px_110px_rgba(2,3,10,0.7)] transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: reduced ? "none" : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* deck chrome */}
                <div className="flex items-center justify-between mb-5 px-1">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-[#f2695c]" />
                    <span className="w-2 h-2 rounded-full bg-solar" />
                    <span className="w-2 h-2 rounded-full bg-nebula" />
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full transition-colors duration-300`}
                    style={{ background: meta.color, boxShadow: `0 0 10px ${meta.color}` }}
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  {KEY_ROWS.map((row, r) => (
                    <div key={r} className={`flex gap-1.5 sm:gap-2 justify-start ${ROW_OFFSETS[r]}`}>
                      {row.map((id, i) => renderKey(id, QWERTY_ROWS[r]?.[i] ?? null))}
                    </div>
                  ))}
                  {/* spacebar */}
                  <div className="flex justify-center pt-1.5">
                    <button
                      data-key-id="space"
                      onMouseEnter={() => setHovered("space")}
                      onMouseMove={() => setHovered("space")}
                      onPointerEnter={() => setHovered("space")}
                      onFocus={() => setHovered("space")}
                      onBlur={() => setHovered(null)}
                      onClick={() => setPinned("space")}
                      aria-pressed={pinned === "space"}
                      className={`keycap relative w-[52%] max-w-[320px] h-11 sm:h-12 rounded-md flex items-center justify-center gap-2.5 ${
                        activeId === "space" ? "is-active" : ""
                      } ${pressed === "space" ? "is-pressed" : ""}`}
                      style={{ ["--cap-color" as string]: "#fcb64b" }}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-opacity ${activeId === "space" ? "opacity-100" : "opacity-40"}`}
                        style={{ background: "#fcb64b", boxShadow: activeId === "space" ? "0 0 8px #fcb64b" : "none" }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.4em] uppercase text-star/90">
                        Full-Stack
                      </span>
                    </button>
                  </div>
                </div>

                <p className="mt-5 text-center font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-dust">
                  hover — inspect · click — lock · qwerty drives the deck
                </p>
              </div>
            </div>
          </Reveal>

          {/* ------- inspector ------- */}
          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.12} y={30}>
              <div className="relative corner-frame border border-line bg-hull/70 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-dust">Key inspector</p>
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full animate-pulse-soft" style={{ background: meta.color }} />
                    <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: meta.color }} />
                  </span>
                </div>

                <div key={active.id} className="mt-5">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-star"
                  >
                    {active.code}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
                    className="mt-3 flex items-center gap-3"
                  >
                    <span
                      className="px-2.5 py-1 rounded-full border font-mono text-[10px] tracking-[0.18em] uppercase"
                      style={{ borderColor: `${meta.color}66`, color: meta.color, background: `${meta.color}0f` }}
                    >
                      {meta.label}
                    </span>
                    <span className="text-sm font-semibold text-star/90">{active.label}</span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                    className="mt-4 text-sm leading-relaxed text-dust"
                  >
                    {active.blurb}
                  </motion.p>
                </div>

                <div className="mt-6 pt-5 border-t border-line-soft space-y-2.5">
                  {(Object.keys(CATEGORY_META) as Category[]).map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_META[c].color, boxShadow: `0 0 8px ${CATEGORY_META[c].color}55` }} aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-dust">{CATEGORY_META[c].label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ------- full cargo manifest ------- */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-star tracking-tight">
                Full cargo manifest
              </h3>
              <p className="font-mono text-[11px] text-dust">the complete inventory — straight from the résumé</p>
            </div>
          </Reveal>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {(Object.keys(CATEGORY_META) as Category[]).map((cat, gi) => (
              <Reveal key={cat} delay={gi * 0.08} y={24}>
                <div className="h-full border border-line bg-hull/50 p-5 hover:border-line hover:bg-hull/80 transition-colors duration-300">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_META[cat].color }} aria-hidden="true" />
                    <h4 className="font-mono text-[11px] tracking-[0.25em] uppercase text-star">{CATEGORY_META[cat].label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCat[cat].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setPinned(s.id);
                          scrollToDeck();
                        }}
                        onMouseEnter={() => setHovered(s.id)}
                        onMouseLeave={() => setHovered(null)}
                        onPointerEnter={() => setHovered(s.id)}
                        onPointerLeave={() => setHovered(null)}
                        className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-space/70 font-mono text-[11px] text-dust transition-all duration-300 hover:-translate-y-0.5"
                        style={{ ["--chip" as string]: CATEGORY_META[cat].color }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${CATEGORY_META[cat].color}88`;
                          (e.currentTarget as HTMLElement).style.color = "#eaeefb";
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "";
                          (e.currentTarget as HTMLElement).style.color = "";
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100" style={{ background: CATEGORY_META[cat].color }} aria-hidden="true" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24} y={24}>
              <div className="h-full border border-line bg-hull/50 p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-ember" aria-hidden="true" />
                  <h4 className="font-mono text-[11px] tracking-[0.25em] uppercase text-star">Practices & Soft Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SOFT_SKILLS.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full border border-line bg-space/70 font-mono text-[11px] text-dust">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5 mt-6 mb-4">
                  <span className="w-2 h-2 rounded-full bg-ion" aria-hidden="true" />
                  <h4 className="font-mono text-[11px] tracking-[0.25em] uppercase text-star">Relevant Coursework</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full border border-line bg-space/70 font-mono text-[11px] text-dust">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function scrollToDeck() {
  const el = document.getElementById("skills");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
