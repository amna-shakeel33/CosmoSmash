import { Reveal } from "./Reveal";
import { ShieldIcon, SoundOnIcon, CloseIcon, HeartStarIcon } from "./icons";

const KEYS = ["p", "a", "r", "e", "n", "t"];

export function ParentPanelSection() {
  return (
    <section id="parents" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Reveal>
            <p className="text-xs font-extrabold tracking-[0.28em] text-[#FFD166] uppercase">
              Grown-ups only
            </p>
            <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              Mission Control
              <br />
              for <span className="text-[#FF8E72]">tired parents</span>
            </h2>
            <p className="mt-5 text-[#B9C4E4] font-semibold leading-relaxed max-w-md">
              The toy is a sealed airlock: no ads, no links, no exit button a
              toddler can find. Two grown-up gestures get you back in charge.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8 flex items-center gap-1.5">
              {KEYS.map((k, i) => (
                <span
                  key={i}
                  className="keycap w-11 h-11 grid place-items-center font-display font-extrabold text-lg"
                >
                  {k}
                </span>
              ))}
              <span className="ml-3 text-sm font-bold text-[#93A0C7]">
                type it mid-smash to open the panel
              </span>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: ShieldIcon,
                  accent: "#63E6C8",
                  text: "Hold the top-left corner for 2 seconds — a progress ring fills so you know it's working.",
                },
                {
                  icon: SoundOnIcon,
                  accent: "#FFD166",
                  text: "Toggle sound, switch to gentle motion, or repaint the whole star palette in one tap.",
                },
                {
                  icon: CloseIcon,
                  accent: "#FF8E72",
                  text: "Exit fullscreen cleanly — or just press Esc while tiny fingers are mid-supernova.",
                },
              ].map((b) => (
                <li key={b.text} className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 w-9 h-9 shrink-0 rounded-lg grid place-items-center"
                    style={{ background: `${b.accent}1f`, color: b.accent }}
                  >
                    <b.icon className="w-4.5 h-4.5" />
                  </span>
                  <p className="text-sm font-bold text-[#B9C4E4] leading-relaxed">{b.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* mock panel graphic */}
        <Reveal delay={140}>
          <div className="relative mx-auto max-w-sm">
            <span className="absolute -inset-6 rounded-[2rem] bg-[#FFD166]/10 blur-2xl" aria-hidden />
            <div className="floaty relative rounded-3xl border border-[#2a3568] bg-[#0C1230] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5 text-[#63E6C8]" />
                  <span className="font-display font-extrabold text-lg">Mission Control</span>
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#FF8E72] border border-[#5c2f26] rounded-full px-2 py-0.5">
                  ADULTS
                </span>
              </div>
              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between rounded-xl border border-[#1a2350] px-4 py-3">
                  <span className="text-sm font-extrabold">Sound effects</span>
                  <span className="relative w-12 h-7 rounded-full bg-[#FFD166]">
                    <span className="absolute top-1 left-6 w-5 h-5 rounded-full bg-[#0C1230]" />
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#1a2350] px-4 py-3">
                  <span className="text-sm font-extrabold">Full motion</span>
                  <span className="relative w-12 h-7 rounded-full bg-[#63E6C8]">
                    <span className="absolute top-1 left-6 w-5 h-5 rounded-full bg-[#0C1230]" />
                  </span>
                </div>
                <div className="rounded-xl border border-[#1a2350] px-4 py-3">
                  <span className="text-sm font-extrabold">Star palette</span>
                  <div className="mt-2.5 flex gap-2">
                    {["#FFD166", "#FF8E72", "#63E6C8", "#7FB5FF", "#F4F7FF"].map((c) => (
                      <span
                        key={c}
                        className="w-6 h-6 rounded-full border-2 border-[#0C1230] shadow-[0_0_0_1px_#2a3568]"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-[#FF8E72] text-center py-3 font-display font-extrabold text-[#2b0f08]">
                  Exit fullscreen
                </div>
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#93A0C7]">
                <HeartStarIcon className="w-3.5 h-3.5 text-[#FF8E72]" />
                the galaxy keeps playing behind this panel
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
