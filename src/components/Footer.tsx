import { scrollToId } from "../lib/scroll";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line-soft bg-space/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[10px] text-dust">
          © 2026 Kuna Manoj. All rights reserved.
        </p>

        <button
          onClick={() => scrollToId("home")}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-md border border-line bg-hull/60 font-mono text-[10px] tracking-[0.25em] uppercase text-dust hover:text-solar hover:border-solar/50 transition-all duration-300"
          aria-label="Back to top"
        >
          Re-enter atmosphere
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
