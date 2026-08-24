import { Reveal } from "./Reveal";
import { GALAXIES } from "../lib/data";
import { SparkIcon, StarIcon } from "./icons";

export function Gallery() {
  return (
    <section id="galaxies" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-extrabold tracking-[0.28em] text-[#63E6C8] uppercase">
              Deep-sky objects
            </p>
            <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              Fresh from the
              <br />
              <span className="text-[#63E6C8]">galaxy map</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-bold text-[#93A0C7] leading-relaxed">
            Real galaxies charted by real tiny astronauts. Named by their
            discoverers. Verified by absolutely no one.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GALAXIES.map((g, i) => (
          <Reveal key={g.code} delay={i * 90}>
            <figure
              className={`group rounded-2xl border border-[#2a3568] bg-[#0C1230]/85 overflow-hidden transition-all duration-500 ${g.tilt} hover:rotate-0 hover:-translate-y-2 hover:border-[#4a5aa8] hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={g.img}
                  alt={g.name}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 text-[10px] font-extrabold tracking-[0.2em] text-[#0C1230] bg-[#FFD166] rounded-full px-2.5 py-1">
                  {g.code}
                </span>
              </div>
              <figcaption className="p-5">
                <h3 className="font-display font-extrabold text-xl leading-tight group-hover:text-[#FFD166] transition-colors">
                  {g.name}
                </h3>
                <p className="mt-1 text-xs font-extrabold text-[#93A0C7]">
                  charted by {g.author}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs font-extrabold">
                  <span className="flex items-center gap-1.5 text-[#FFD166]">
                    <StarIcon className="w-3.5 h-3.5" />
                    {g.keys.toLocaleString()} keys
                  </span>
                  <span className="flex items-center gap-1.5 text-[#63E6C8]">
                    <SparkIcon className="w-3 h-3" />
                    {g.chaos}
                  </span>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-10 text-center text-sm font-bold text-[#93A0C7]">
          Every galaxy is procedurally grown from the exact keys your toddler
          smashes — no two charts are alike.
        </p>
      </Reveal>
    </section>
  );
}
