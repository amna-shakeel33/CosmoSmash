import { Reveal } from "./Reveal";
import { POSTS } from "../lib/data";
import { ArrowIcon, PlayIcon, StarIcon } from "./icons";

export function ViralWall() {
  return (
    <section id="videos" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-extrabold tracking-[0.28em] text-[#7FB5FF] uppercase">
              Transmission log
            </p>
            <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              Seen across
              <br />
              the <span className="text-[#7FB5FF]">galaxy</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-bold text-[#93A0C7] leading-relaxed">
            Parents keep posting the aftermath. Tag{" "}
            <span className="text-[#FFD166]">#CosmoSmash</span> and your tiny
            astronaut could chart the next transmission.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {POSTS.map((p, i) => (
          <Reveal key={p.handle} delay={i * 90}>
            <a
              href="#videos"
              className="group block rounded-2xl border border-[#2a3568] bg-[#0C1230]/85 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4a5aa8] hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.caption}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="w-12 h-12 rounded-full bg-[#070B1E]/75 border border-[#4a5aa8] grid place-items-center text-[#F4F7FF] group-hover:scale-110 group-hover:bg-[#FFD166] group-hover:text-[#241a05] transition-all">
                    <PlayIcon className="w-5 h-5 translate-x-0.5" />
                  </span>
                </span>
                <span
                  className="absolute top-3 left-3 text-[10px] font-extrabold tracking-wider text-[#0C1230] rounded-full px-2.5 py-1"
                  style={{ background: p.accent }}
                >
                  {p.platform}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display font-bold text-lg leading-snug group-hover:text-[#FFD166] transition-colors">
                  {p.caption}
                </p>
                <p className="mt-2 text-xs font-extrabold text-[#93A0C7]">{p.handle}</p>
                <p className="mt-2.5 text-xs font-extrabold text-[#63E6C8]">
                  {p.views} · {p.shares}
                </p>
              </div>
            </a>
          </Reveal>
        ))}

        {/* feature slot */}
        <Reveal delay={270}>
          <a
            href="#share"
            className="group h-full min-h-[320px] flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-[#2a3568] hover:border-[#FFD166] bg-[#0C1230]/40 p-6 transition-all duration-300 hover:-translate-y-1.5"
          >
            <span className="w-14 h-14 rounded-2xl bg-[#1a1607] border border-[#4a3f1d] grid place-items-center text-[#FFD166] group-hover:rotate-12 transition-transform">
              <StarIcon className="w-6 h-6" />
            </span>
            <p className="mt-4 font-display font-extrabold text-2xl">Your toddler here</p>
            <p className="mt-2 text-xs font-bold text-[#93A0C7] leading-relaxed max-w-[200px]">
              tag <span className="text-[#FFD166]">@cosmosmash</span> or{" "}
              <span className="text-[#FFD166]">#CosmoSmash</span> — best
              transmissions get featured weekly
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-extrabold text-[#FFD166] group-hover:gap-2.5 transition-all">
              send yours <ArrowIcon className="w-3.5 h-3.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
