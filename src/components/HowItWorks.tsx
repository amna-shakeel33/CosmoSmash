import { Reveal } from "./Reveal";
import { KeyboardIcon, PlanetIcon, RocketIcon, ReportIcon } from "./icons";

const STEPS = [
  {
    icon: KeyboardIcon,
    accent: "#FFD166",
    title: "Smash anything",
    body: "Every key, spacebar and screen tap detonates a burst of stardust somewhere unexpected. Letters scatter sparks, numbers pop ringed planets, spacebar sends a shockwave through the middle of the sky.",
  },
  {
    icon: RocketIcon,
    accent: "#FF8E72",
    title: "Chain a combo",
    body: "Keep the rhythm going and the combo counter climbs. Every 8-key streak launches a rocket from the bottom of the galaxy with a full exhaust trail and a very satisfying whoosh.",
  },
  {
    icon: PlanetIcon,
    accent: "#63E6C8",
    title: "Grow the galaxy",
    body: "Cross a milestone — 100 keys, 200, 350 — and the whole sky goes supernova: screen flash, expanding rings, a rain of stars. Chaos levels rise from Stardust Rookie to Supernova Legend.",
  },
  {
    icon: ReportIcon,
    accent: "#7FB5FF",
    title: "Get the voyage report",
    body: "One tap produces a copyable brag card: stars ignited, voyage time, best combo, chaos level. Paste it into the family group chat and accept the applause.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20">
        {/* sticky left */}
        <div className="lg:sticky lg:top-16 lg:self-start">
          <Reveal>
            <p className="text-xs font-extrabold tracking-[0.28em] text-[#FF8E72] uppercase">
              Flight manual
            </p>
            <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              How the
              <br />
              <span className="text-[#FFD166]">magic</span> works
            </h2>
            <p className="mt-5 text-[#B9C4E4] font-semibold max-w-sm leading-relaxed">
              One rule: press keys. Everything else — planets, rockets,
              supernovas — the galaxy handles on its own. Built for hands that
              haven't learned what keys are for yet.
            </p>
          </Reveal>

          {/* orbit diagram */}
          <Reveal delay={120}>
            <svg viewBox="0 0 220 220" className="mt-10 w-56 h-56 sm:w-64 sm:h-64" aria-hidden>
              <circle cx="110" cy="110" r="58" fill="none" stroke="#2a3568" strokeDasharray="3 7" />
              <circle cx="110" cy="110" r="90" fill="none" stroke="#1a2350" strokeDasharray="3 7" />
              <circle cx="110" cy="110" r="16" fill="#FFD166" />
              <circle cx="110" cy="110" r="24" fill="none" stroke="#FFD166" opacity="0.35" strokeWidth="5" />
              <g className="orbit-slow">
                <circle cx="168" cy="110" r="9" fill="#63E6C8" />
                <ellipse cx="168" cy="110" rx="15" ry="4.5" fill="none" stroke="#63E6C8" opacity="0.7" strokeWidth="1.6" />
              </g>
              <g className="orbit-slower">
                <circle cx="110" cy="20" r="6" fill="#FF8E72" />
              </g>
            </svg>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-display font-extrabold text-3xl text-[#F4F7FF]">0.2s</p>
                <p className="text-xs font-bold text-[#93A0C7]">key to stardust</p>
              </div>
              <span className="w-px h-10 bg-[#2a3568]" />
              <div>
                <p className="font-display font-extrabold text-3xl text-[#F4F7FF]">8</p>
                <p className="text-xs font-bold text-[#93A0C7]">keys per rocket</p>
              </div>
              <span className="w-px h-10 bg-[#2a3568]" />
              <div>
                <p className="font-display font-extrabold text-3xl text-[#F4F7FF]">6</p>
                <p className="text-xs font-bold text-[#93A0C7]">chaos levels</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* scrolling steps */}
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article
                className="group relative rounded-2xl border border-[#2a3568] bg-[#0C1230]/80 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#4a5aa8] overflow-hidden"
                style={{ borderLeftWidth: 3, borderLeftColor: s.accent }}
              >
                <span
                  className="absolute -top-6 -right-3 font-display font-extrabold text-[110px] leading-none text-outline opacity-60 select-none"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="relative w-12 h-12 rounded-xl grid place-items-center mb-5 transition-transform group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: `${s.accent}1f`, color: s.accent }}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="relative font-display font-extrabold text-2xl">{s.title}</h3>
                <p className="relative mt-2.5 text-[#B9C4E4] font-semibold leading-relaxed max-w-md">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
