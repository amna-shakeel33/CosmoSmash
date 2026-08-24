import { useEffect, useRef } from "react";
import { SoundEngine } from "../lib/audio";
import { POP_WORDS, THEMES, ToySettings } from "../lib/data";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Particle = {
  kind: "spark" | "star" | "planet" | "rocket" | "ring" | "word";
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rot: number;
  vr: number;
  text?: string;
  hasRing?: boolean;
};

type Props = {
  settings: ToySettings;
  sound: SoundEngine;
  listenKeys: boolean;
  ambient?: boolean;
  className?: string;
  onSmash?: (combo: number) => void;
  onSecret?: () => void;
  onEscape?: () => void;
};

const MILESTONES = [40, 100, 200, 350, 500, 750, 1000, 1500, 2000];
const MAX_PARTICLES = 460;

function hash(s: string): number {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** The galaxy particle engine. Every key / tap ignites stardust. */
export function ToyCanvas({
  settings,
  sound,
  listenKeys,
  ambient = false,
  className = "",
  onSmash,
  onSecret,
  onEscape,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const listenRef = useRef(listenKeys);
  listenRef.current = listenKeys;
  const cbRef = useRef({ onSmash, onSecret, onEscape });
  cbRef.current = { onSmash, onSecret, onEscape };
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];
    const combo = { count: 0, last: 0 };
    let total = 0;
    const hitMilestones = new Set<number>();
    let shake = 0;
    let flash = 0;
    let lastInput = performance.now();
    let lastAmbient = performance.now();
    let buffer = "";
    let last = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const colors = () => THEMES[settingsRef.current.theme % THEMES.length].colors;
    const pick = () => {
      const c = colors();
      return c[Math.floor(Math.random() * c.length)];
    };
    const motionScale = () => (settingsRef.current.motion && !reducedRef.current ? 1 : 0.45);

    const push = (p: Particle) => {
      if (particles.length >= MAX_PARTICLES) particles.splice(0, 20);
      particles.push(p);
    };

    const spawnBurst = (x: number, y: number, opts?: { planet?: boolean; big?: boolean; silent?: boolean }) => {
      const scale = motionScale();
      const n = Math.round((opts?.big ? 26 : 14) * scale) + 4;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (60 + Math.random() * 240) * (opts?.big ? 1.4 : 1);
        push({
          kind: "spark",
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 30,
          life: 0,
          maxLife: 0.6 + Math.random() * 0.5,
          size: 1.6 + Math.random() * 3.2,
          color: pick(),
          rot: 0,
          vr: 0,
        });
      }
      // a couple of star glyphs
      const stars = Math.round(2 * scale) + 1;
      for (let i = 0; i < stars; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 50 + Math.random() * 160;
        push({
          kind: "star",
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 40,
          life: 0,
          maxLife: 0.8 + Math.random() * 0.4,
          size: 6 + Math.random() * 9,
          color: pick(),
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 6,
        });
      }
      push({
        kind: "ring",
        x,
        y,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 0.55,
        size: opts?.big ? 150 : 85,
        color: pick(),
        rot: 0,
        vr: 0,
      });
      if (opts?.planet || Math.random() < 0.16) {
        push({
          kind: "planet",
          x: x + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 26,
          vy: -14 - Math.random() * 22,
          life: 0,
          maxLife: 2.4 + Math.random(),
          size: 16 + Math.random() * 26,
          color: pick(),
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 1.2,
          hasRing: Math.random() < 0.5,
        });
        if (!opts?.silent) sound.pop();
      }
      if (!opts?.silent && Math.random() < 0.2) {
        push({
          kind: "word",
          x,
          y: y - 14,
          vx: (Math.random() - 0.5) * 20,
          vy: -52,
          life: 0,
          maxLife: 0.9,
          size: 20 + Math.random() * 16,
          color: pick(),
          rot: (Math.random() - 0.5) * 0.4,
          vr: 0,
          text: POP_WORDS[Math.floor(Math.random() * POP_WORDS.length)],
        });
      }
    };

    const spawnRocket = (x: number) => {
      push({
        kind: "rocket",
        x: Math.max(40, Math.min(w - 40, x)),
        y: h + 24,
        vx: 0,
        vy: -(h * 0.85) / 1.35,
        life: 0,
        maxLife: 1.4,
        size: 22 + Math.random() * 10,
        color: pick(),
        rot: 0,
        vr: 0,
      });
      sound.whoosh();
    };

    const supernova = (x: number, y: number) => {
      flash = 1;
      if (!reducedRef.current) shake = 13;
      const scale = motionScale();
      const n = Math.round(55 * scale) + 10;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const sp = 140 + Math.random() * 380;
        push({
          kind: i % 5 === 0 ? "star" : "spark",
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          maxLife: 0.9 + Math.random() * 0.7,
          size: 2 + Math.random() * 4.5,
          color: pick(),
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 8,
        });
      }
      for (let i = 0; i < 3; i++) {
        push({
          kind: "ring",
          x,
          y,
          vx: 0,
          vy: 0,
          life: -i * 0.09,
          maxLife: 0.7,
          size: 220 + i * 60,
          color: pick(),
          rot: 0,
          vr: 0,
        });
      }
      push({
        kind: "word",
        x,
        y: y - 40,
        vx: 0,
        vy: -30,
        life: 0,
        maxLife: 1.4,
        size: 40,
        color: "#FFD166",
        rot: 0,
        vr: 0,
        text: "SUPERNOVA!",
      });
      sound.boom();
    };

    const handleInput = (x: number, y: number, seed: number) => {
      const now = performance.now();
      lastInput = now;
      combo.count = now - combo.last < 850 ? combo.count + 1 : 1;
      combo.last = now;
      total++;

      for (const m of MILESTONES) {
        if (total === m && !hitMilestones.has(m)) {
          hitMilestones.add(m);
          supernova(w / 2, h * 0.42);
        }
      }

      spawnBurst(x, y);
      if (combo.count > 1 && combo.count % 8 === 0) spawnRocket(x);
      sound.blip(seed);
      cbRef.current.onSmash?.(combo.count);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!listenRef.current) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;

      if (k === "Escape") {
        cbRef.current.onEscape?.();
        return;
      }

      if (/^[a-zA-Z]$/.test(k)) {
        buffer = (buffer + k.toLowerCase()).slice(-8);
        if (buffer.endsWith("parent")) {
          buffer = "";
          cbRef.current.onSecret?.();
          return;
        }
      }
      if (k.length !== 1 && k !== " " && k !== "Enter" && k !== "Backspace") return;

      e.preventDefault();
      const seed = hash(k);
      if (k === " ") {
        // spacebar: shockwave ring mid-sky
        spawnBurst(w / 2, h / 2, { big: true });
        sound.whoosh();
        cbRef.current.onSmash?.(1);
        lastInput = performance.now();
        return;
      }
      if (k === "Enter") {
        spawnRocket(Math.random() * w * 0.6 + w * 0.2);
        cbRef.current.onSmash?.(1);
        lastInput = performance.now();
        return;
      }
      if (/^[0-9]$/.test(k)) {
        const x = ((seed % 100) / 100) * w * 0.8 + w * 0.1;
        const y = ((hash(k + "y") % 70) / 100 + 0.12) * h;
        spawnBurst(x, y, { planet: true });
        sound.blip(seed);
        cbRef.current.onSmash?.(1);
        lastInput = performance.now();
        return;
      }
      const x = ((seed % 100) / 100) * w * 0.84 + w * 0.08;
      const y = (((seed >> 3) % 62) / 100 + 0.14) * h;
      handleInput(x, y, seed);
    };

    const onPointer = (e: PointerEvent) => {
      if (!listenRef.current) return;
      const r = canvas.getBoundingClientRect();
      handleInput(e.clientX - r.left, e.clientY - r.top, hash(String(e.pointerId) + e.timeStamp));
    };

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);

    const drawStar = (x: number, y: number, r: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const rr = i % 2 === 0 ? r : r * 0.45;
        const a = rot + (i * Math.PI) / 5;
        const px = x + Math.cos(a) * rr;
        const py = y + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      // ambient idle twinkles so the toy feels alive
      if (
        ambient &&
        now - lastInput > 4200 &&
        now - lastAmbient > 2600 &&
        Math.random() < 0.35
      ) {
        lastAmbient = now;
        const x = Math.random() * w * 0.8 + w * 0.1;
        const y = Math.random() * h * 0.7 + h * 0.1;
        spawnBurst(x, y, { silent: true });
      }

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      if (shake > 0.3) {
        ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
        shake *= 0.86;
      }

      if (flash > 0.02) {
        ctx.fillStyle = `rgba(255, 240, 205, ${flash * 0.4})`;
        ctx.fillRect(-20, -20, w + 40, h + 40);
        flash *= 0.88;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life < 0) continue; // delayed rings
        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }

        if (p.kind === "spark") {
          p.vy += 120 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = 1 - t;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - t * 0.7), 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "star") {
          p.vy += 60 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.vr * dt;
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = 1 - t;
          ctx.fillStyle = p.color;
          drawStar(p.x, p.y, p.size * (1 - t * 0.5), p.rot);
        } else if (p.kind === "ring") {
          const ease = 1 - Math.pow(1 - t, 3);
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = (1 - t) * 0.85;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 3 * (1 - t) + 0.8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6 + p.size * ease, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.kind === "planet") {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.vr * dt;
          const pop = Math.min(1, p.life / 0.18);
          const s = p.size * (1 - Math.pow(1 - pop, 3)) * (1 + 0.25 * Math.sin(pop * Math.PI));
          const fade = t > 0.72 ? 1 - (t - 0.72) / 0.28 : 1;
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = fade;
          const g = ctx.createRadialGradient(
            p.x - s * 0.35,
            p.y - s * 0.35,
            s * 0.1,
            p.x,
            p.y,
            s
          );
          g.addColorStop(0, "#FFFFFF");
          g.addColorStop(0.25, p.color);
          g.addColorStop(1, "rgba(10,14,38,0.9)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fill();
          if (p.hasRing) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * 0.4);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = fade * 0.75;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.ellipse(0, 0, s * 1.7, s * 0.5, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        } else if (p.kind === "rocket") {
          p.y += p.vy * dt;
          p.x += Math.sin(p.life * 9) * 0.8;
          // exhaust trail
          for (let e2 = 0; e2 < 2; e2++) {
            push({
              kind: "spark",
              x: p.x + (Math.random() - 0.5) * 8,
              y: p.y + p.size * 1.1,
              vx: (Math.random() - 0.5) * 60,
              vy: 120 + Math.random() * 90,
              life: 0,
              maxLife: 0.4 + Math.random() * 0.25,
              size: 2 + Math.random() * 3,
              color: Math.random() < 0.5 ? "#FFD166" : "#FF8E72",
              rot: 0,
              vr: 0,
            });
          }
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1;
          const s = p.size;
          // flame
          const fl = s * (0.9 + Math.random() * 0.5);
          const fg = ctx.createLinearGradient(p.x, p.y + s, p.x, p.y + s + fl);
          fg.addColorStop(0, "rgba(255,209,102,0.95)");
          fg.addColorStop(1, "rgba(255,142,114,0)");
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.moveTo(p.x - s * 0.3, p.y + s * 0.95);
          ctx.lineTo(p.x, p.y + s * 0.95 + fl);
          ctx.lineTo(p.x + s * 0.3, p.y + s * 0.95);
          ctx.closePath();
          ctx.fill();
          // body
          ctx.fillStyle = "#F4F7FF";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.quadraticCurveTo(p.x + s * 0.62, p.y - s * 0.2, p.x + s * 0.42, p.y + s * 0.9);
          ctx.lineTo(p.x - s * 0.42, p.y + s * 0.9);
          ctx.quadraticCurveTo(p.x - s * 0.62, p.y - s * 0.2, p.x, p.y - s);
          ctx.closePath();
          ctx.fill();
          // nose + window + fins
          ctx.fillStyle = "#FF8E72";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.quadraticCurveTo(p.x + s * 0.36, p.y - s * 0.62, p.x + s * 0.4, p.y - s * 0.3);
          ctx.lineTo(p.x - s * 0.4, p.y - s * 0.3);
          ctx.quadraticCurveTo(p.x - s * 0.36, p.y - s * 0.62, p.x, p.y - s);
          ctx.fill();
          ctx.fillStyle = "#7FB5FF";
          ctx.beginPath();
          ctx.arc(p.x, p.y + s * 0.12, s * 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFD166";
          ctx.beginPath();
          ctx.moveTo(p.x - s * 0.42, p.y + s * 0.5);
          ctx.lineTo(p.x - s * 0.85, p.y + s * 1.05);
          ctx.lineTo(p.x - s * 0.38, p.y + s * 0.92);
          ctx.closePath();
          ctx.moveTo(p.x + s * 0.42, p.y + s * 0.5);
          ctx.lineTo(p.x + s * 0.85, p.y + s * 1.05);
          ctx.lineTo(p.x + s * 0.38, p.y + s * 0.92);
          ctx.closePath();
          ctx.fill();
        } else if (p.kind === "word") {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1 - t;
          ctx.font = `800 ${p.size}px "Baloo 2", sans-serif`;
          ctx.textAlign = "center";
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * Math.sin(p.life * 6));
          ctx.fillStyle = "rgba(7,11,30,0.55)";
          ctx.fillText(p.text ?? "", 2, 3);
          ctx.fillStyle = p.color;
          ctx.fillText(p.text ?? "", 0, 0);
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
}
