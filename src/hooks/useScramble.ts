import { useEffect, useRef, useState } from "react";

const GLYPHS = "✦✧★·+*×◦";

/** Decode-scramble a string once `start` becomes true. */
export function useScramble(text: string, start: boolean, speed = 28) {
  const [out, setOut] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      done.current = true;
      setOut(text);
      return;
    }
    done.current = true;
    let frame = 0;
    const total = text.length;
    const id = window.setInterval(() => {
      frame++;
      const settled = Math.floor((frame / 2.2) * 1.4);
      let s = "";
      for (let i = 0; i < total; i++) {
        const ch = text[i];
        if (ch === " " || ch === "\n") {
          s += ch;
        } else if (i < settled) {
          s += ch;
        } else {
          s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setOut(s);
      if (settled >= total) {
        window.clearInterval(id);
        setOut(text);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [start, text, speed]);

  return out;
}
