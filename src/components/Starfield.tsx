import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Star = { x: number; y: number; z: number; r: number; tw: number; ph: number };
type Shot = { x: number; y: number; vx: number; vy: number; life: number };

/** Ambient deep-space backdrop: twinkling parallax stars, drifting nebulae, shooting stars. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stars: Star[] = [];
    const shots: Shot[] = [];
    let mouse = { x: 0, y: 0 };
    let scrollY = window.scrollY;
    let nextShot = performance.now() + 2500;

    const seed = () => {
      stars.length = 0;
      const n = Math.min(260, Math.floor((w * h) / 6500));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: 0.25 + Math.random() * 0.75,
          r: 0.5 + Math.random() * 1.5,
          tw: 0.5 + Math.random() * 2,
          ph: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onScroll = () => (scrollY = window.scrollY);
    const onMouse = (e: MouseEvent) =>
      (mouse = { x: e.clientX / w - 0.5, y: e.clientY / h - 0.5 });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    const nebula = (
      cx: number,
      cy: number,
      r: number,
      color: string,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = alpha;
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;

      // drifting nebulae
      const drift = reduced ? 0 : 1;
      nebula(
        w * 0.18 + Math.sin(t * 0.05) * 40 * drift,
        h * 0.24 + Math.cos(t * 0.04) * 30 * drift - scrollY * 0.06,
        Math.max(w, h) * 0.42,
        "rgba(255,142,114,0.16)",
        0.5
      );
      nebula(
        w * 0.85 + Math.cos(t * 0.045) * 50 * drift,
        h * 0.6 + Math.sin(t * 0.05) * 36 * drift - scrollY * 0.04,
        Math.max(w, h) * 0.4,
        "rgba(99,230,200,0.13)",
        0.5
      );
      nebula(
        w * 0.5 + Math.sin(t * 0.035) * 60 * drift,
        h * 0.9 - scrollY * 0.08,
        Math.max(w, h) * 0.36,
        "rgba(127,181,255,0.14)",
        0.5
      );

      // stars with parallax + twinkle
      for (const s of stars) {
        const py =
          ((s.y - scrollY * 0.12 * s.z) % (h + 40) + h + 40) % (h + 40) - 20;
        const px = s.x - mouse.x * 22 * s.z;
        const a = reduced
          ? 0.55
          : 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph));
        ctx.globalAlpha = a * s.z;
        ctx.fillStyle = s.z > 0.75 ? "#F4F7FF" : s.z > 0.5 ? "#FFD166" : "#93A0C7";
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // shooting stars
      if (!reduced) {
        if (now > nextShot && shots.length < 2) {
          shots.push({
            x: Math.random() * w * 0.8 + w * 0.1,
            y: Math.random() * h * 0.35,
            vx: 380 + Math.random() * 260,
            vy: 140 + Math.random() * 120,
            life: 0,
          });
          nextShot = now + 2800 + Math.random() * 3600;
        }
        for (let i = shots.length - 1; i >= 0; i--) {
          const sh = shots[i];
          sh.life += 0.016;
          sh.x += sh.vx * 0.016;
          sh.y += sh.vy * 0.016;
          const fade = Math.max(0, 1 - sh.life / 0.9);
          const grad = ctx.createLinearGradient(
            sh.x,
            sh.y,
            sh.x - sh.vx * 0.22,
            sh.y - sh.vy * 0.22
          );
          grad.addColorStop(0, `rgba(255,244,214,${0.9 * fade})`);
          grad.addColorStop(1, "rgba(255,244,214,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(sh.x - sh.vx * 0.22, sh.y - sh.vy * 0.22);
          ctx.stroke();
          if (fade <= 0 || sh.x > w + 60 || sh.y > h + 60) shots.splice(i, 1);
        }
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
