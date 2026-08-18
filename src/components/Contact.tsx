import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EMAIL, PHONE, PHONE_HREF, SOCIALS } from "../data/portfolio";
import { EASE, Reveal, SectionHeading } from "./motion";
import { ArrowUpRight, GithubIcon, LeetCodeIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./Icons";

interface Toast {
  id: number;
  text: string;
  tone: "ok" | "err";
}

let toastSeq = 0;

function SocialIcon({ id, className }: { id: string; className?: string }) {
  if (id === "github") return <GithubIcon className={className} />;
  if (id === "linkedin") return <LinkedInIcon className={className} />;
  return <LeetCodeIcon className={className} />;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (text: string, tone: "ok" | "err" = "ok") => {
    const id = ++toastSeq;
    setToasts((t) => [...t, { id, text, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      pushToast("Email copied to clipboard ✓");
    } catch {
      pushToast("Couldn't copy — select it manually", "err");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      pushToast("All fields are required before launch", "err");
      return;
    }
    const subject = encodeURIComponent(`[Portfolio] ${name} — reaching out`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    pushToast("Opening your mail client… see you in orbit ✦");
  };

  const inputCls =
    "w-full px-4 py-3 rounded-md border border-line bg-space/80 text-star text-sm placeholder:text-dust/50 outline-none transition-all duration-300 focus:border-solar/70 focus:shadow-[0_0_0_3px_rgba(252,182,75,0.12)]";

  return (
    <section id="contact" className="relative z-10 py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(252,182,75,0.07), transparent 70%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20">
        {/* left */}
        <div>
          <SectionHeading index="05" kicker="Comms Channel" title="Let's build something stellar" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-dust text-[15px] leading-relaxed">
              Computer Science graduate from PDPM IIITDM Jabalpur, now open to <span className="text-star">full-time software development and AI/ML roles</span>.
              Whether it's a product to ship, research to continue — my channel is open.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 space-y-3">
              <button
                onClick={copyEmail}
                className="group w-full sm:w-[340px] flex items-center gap-4 px-5 py-4 rounded-md border border-line bg-hull/70 hover:border-solar/50 transition-all duration-300 text-left"
                data-cursor
              >
                <MailIcon className="w-5 h-5 text-solar" />
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-dust">Email · click to copy</span>
                  <span className="block mt-0.5 font-mono text-sm text-star group-hover:text-solar transition-colors">{EMAIL}</span>
                </span>
              </button>
              <a
                href={PHONE_HREF}
                className="group w-full sm:w-[340px] flex items-center gap-4 px-5 py-4 rounded-md border border-line bg-hull/70 hover:border-nebula/50 transition-all duration-300"
              >
                <PhoneIcon className="w-5 h-5 text-nebula" />
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-dust">Phone</span>
                  <span className="block mt-0.5 font-mono text-sm text-star group-hover:text-nebula transition-colors">{PHONE}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-9 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-md border border-line bg-space/70 hover:-translate-y-1 hover:border-ion/50 hover:shadow-[0_16px_36px_rgba(2,3,10,0.5)] transition-all duration-300"
                >
                  <span className="text-dust group-hover:text-ion transition-colors">
                    <SocialIcon id={s.id} className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-star">{s.label}</span>
                    <span className="block font-mono text-[10px] text-dust">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-dust group-hover:text-ion transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right — form */}
        <Reveal delay={0.2} y={40}>
          <form
            onSubmit={onSubmit}
            className="relative corner-frame border border-line bg-hull/70 backdrop-blur-sm p-7 sm:p-9"
            noValidate
          >
            <div className="absolute top-5 right-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-dust">
              <span className="w-1.5 h-1.5 rounded-full bg-nebula animate-pulse-soft" />
              channel open
            </div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-solar">Transmission form</p>

            <div className="mt-7 space-y-5">
              <div>
                <label htmlFor="c-name" className="block mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-dust">
                  01 · Your name
                </label>
                <input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="block mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-dust">
                  02 · Return address
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@analytical.engine"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="block mb-2 font-mono text-[10px] tracking-[0.25em] uppercase text-dust">
                  03 · Message
                </label>
                <textarea
                  id="c-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="We have a mission for you…"
                  rows={5}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-7 w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-md bg-solar text-[#0a0d1f] font-mono font-semibold text-xs tracking-[0.22em] uppercase shadow-[0_10px_34px_rgba(252,182,75,0.28)] hover:bg-[#ffc76b] hover:shadow-[0_10px_46px_rgba(252,182,75,0.45)] transition-all duration-300"
            >
              Launch transmission
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
            </motion.button>
            <p className="mt-4 text-center font-mono text-[10px] text-dust">
              Opens your mail client — no data leaves this page.
            </p>
          </form>
        </Reveal>
      </div>

      {/* toasts */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[85] flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`px-5 py-3 rounded-md border font-mono text-xs tracking-wide shadow-[0_18px_50px_rgba(2,3,10,0.7)] ${
                t.tone === "ok" ? "border-nebula/50 bg-hull text-nebula" : "border-[#f2695c]/50 bg-hull text-[#f9918a]"
              }`}
            >
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
