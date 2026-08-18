import { MARQUEE_ITEMS } from "../data/portfolio";

export default function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative z-10 border-y border-line-soft bg-space/60 backdrop-blur-sm overflow-hidden py-4 group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center shrink-0">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-dust px-5">{item}</span>
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-solar/70" fill="currentColor" aria-hidden="true">
              <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4L6 0z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
