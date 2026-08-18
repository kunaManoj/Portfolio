import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  phase: number;
  speed: number;
  tint: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

const TINTS = ["234,238,251", "234,238,251", "234,238,251", "143,179,255", "252,182,75", "45,212,191"];

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let running = true;
    let scrollY = window.scrollY;
    let px = 0;
    let py = 0;
    let tpx = 0;
    let tpy = 0;
    let lastMeteor = performance.now();

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(240, Math.floor((w * h) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * (h + 400),
        z: 0.25 + Math.random() * 0.75,
        r: 0.4 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
      }));
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onMove = (e: MouseEvent) => {
      tpx = (e.clientX / w - 0.5) * 2;
      tpy = (e.clientY / h - 0.5) * 2;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) loop(performance.now());
      else cancelAnimationFrame(raf);
    };

    const loop = (now: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      px += (tpx - px) * 0.04;
      py += (tpy - py) * 0.04;
      const t = now / 1000;

      for (const s of stars) {
        const tw = reduced ? 0.75 : 0.6 + Math.sin(t * s.speed + s.phase) * 0.35;
        const alpha = Math.max(0.08, Math.min(1, tw)) * (0.35 + s.z * 0.65);
        const sx = (s.x + px * s.z * 26 + w) % w;
        const sy = ((s.y - scrollY * s.z * 0.22) % (h + 400) + h + 400) % (h + 400) - 200;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // shooting stars
      if (!reduced && now - lastMeteor > 3200 + Math.random() * 2600) {
        lastMeteor = now;
        meteors.push({
          x: Math.random() * w * 0.8 + w * 0.2,
          y: -20,
          vx: -(3 + Math.random() * 3),
          vy: 4 + Math.random() * 3,
          life: 0,
          max: 70 + Math.random() * 40,
        });
      }
      meteors = meteors.filter((m) => m.life < m.max);
      for (const m of meteors) {
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const fade = 1 - m.life / m.max;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        grad.addColorStop(0, `rgba(252,182,75,${(0.85 * fade).toFixed(3)})`);
        grad.addColorStop(1, "rgba(252,182,75,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    };

    build();
    window.addEventListener("resize", build);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener("resize", build);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
