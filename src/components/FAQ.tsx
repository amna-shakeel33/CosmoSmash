import { useState } from "react";
import { Reveal } from "./Reveal";
import { FAQS } from "../lib/data";
import { PlusIcon } from "./icons";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <Reveal>
        <p className="text-xs font-extrabold tracking-[0.28em] text-[#FF8E72] uppercase text-center">
          Ground control queries
        </p>
        <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-center leading-[1.02]">
          Questions from <span className="text-[#FF8E72]">orbit</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3.5">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 50}>
              <div
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-[#FFD166]/50 bg-[#0C1230]"
                    : "border-[#2a3568] bg-[#0C1230]/60 hover:border-[#4a5aa8]"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-lg sm:text-xl">{f.q}</span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border grid place-items-center transition-all duration-300 ${
                      isOpen
                        ? "border-[#FFD166] text-[#FFD166] rotate-45"
                        : "border-[#2a3568] text-[#93A0C7]"
                    }`}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm sm:text-base font-semibold text-[#B9C4E4] leading-relaxed max-w-xl">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
