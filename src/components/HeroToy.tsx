import { useState } from "react";
import { ToyCanvas } from "./ToyCanvas";
import { SoundEngine } from "../lib/audio";
import { ToySettings, getChaos } from "../lib/data";
import { useScramble } from "../hooks/useScramble";
import { ExpandIcon, SparkIcon, StarIcon } from "./icons";

type Props = {
  settings: ToySettings;
  sound: SoundEngine;
  takeoverOpen: boolean;
  onLaunch: () => void;
  lifetime: number;
  addLifetime: (n: number) => void;
};

export function HeroToy({
  settings,
  sound,
  takeoverOpen,
  onLaunch,
  lifetime,
  addLifetime,
}: Props) {
  const [session, setSession] = useState(0);
  const title = useScramble("EVERY KEY IGNITES A STAR", true, 26);
  const chaos = getChaos(session);

  return (
    <section id="toy" className="relative h-[100svh] min-h-[600px] overflow-hidden">
      <ToyCanvas
        settings={settings}
        sound={sound}
        listenKeys={!takeoverOpen}
        ambient
        onSmash={() => {
          setSession((s) => s + 1);
          addLifetime(1);
        }}
      />

      {/* top HUD bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <a href="#toy" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#FFD166] text-[#241a05] rotate-6 group-hover:rotate-12 transition-transform shadow-[0_0_24px_rgba(255,209,102,0.45)]">
            <StarIcon className="w-5 h-5" />
          </span>
          <span className="font-display font-extrabold text-xl tracking-wide">
            COSMO<span className="text-[#FFD166]">SMASH</span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#93A0C7] border border-[#2a3568] rounded-full px-3 py-1.5 bg-[#0C1230]/70">
            <span className="w-2 h-2 rounded-full bg-[#63E6C8] blink-soft" />
            412 tiny astronauts aboard
          </span>
          <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#FFD166] border border-[#4a3f1d] rounded-full px-3 py-1.5 bg-[#1a1607]/80">
            <SparkIcon className="w-3.5 h-3.5" />
            {lifetime.toLocaleString()} stars all-time
          </span>
        </div>
      </div>

      {/* first-smash prompt */}
      {session === 0 && (
        <div className="absolute inset-0 z-10 grid place-items-center pointer-events-none">
          <div className="relative text-center px-6">
            <span className="absolute inset-0 -m-8 rounded-full border-2 border-[#FFD166]/40 ring-pulse" />
            <p className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-wide text-[#F4F7FF] drop-shadow-[0_0_30px_rgba(255,209,102,0.35)]">
              SMASH ANY KEY
            </p>
            <p className="mt-3 text-sm sm:text-base font-bold text-[#93A0C7]">
              keyboard · spacebar · screen — everything counts
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              {["Q", "W", "E", "R", "T", "Y"].map((k, i) => (
                <span
                  key={k}
                  className="keycap keycap-tap w-10 h-10 sm:w-12 sm:h-12 grid place-items-center font-display font-bold text-lg"
                  style={{ animationDelay: `${i * 0.16}s` }}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* bottom-left manifesto */}
      <div className="absolute bottom-0 left-0 z-10 p-5 sm:p-8 max-w-2xl pointer-events-none">
        <p className="text-[11px] sm:text-xs font-extrabold tracking-[0.28em] text-[#63E6C8] uppercase mb-3">
          The fullscreen galaxy toy · for ages 0–4
        </p>
        <h1 className="font-display font-extrabold leading-[0.95] text-4xl sm:text-6xl md:text-7xl text-[#F4F7FF] [text-shadow:0_4px_30px_rgba(7,11,30,0.9)]">
          {title}
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-[#B9C4E4] font-semibold max-w-md [text-shadow:0_2px_12px_rgba(7,11,30,0.95)]">
          CosmoSmash turns keyboard chaos into a cosmos — stardust bursts, ringed
          planets, combo rockets and full-blown supernovas. No ads inside. No way out for tiny fingers.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 pointer-events-auto">
          <button
            onClick={onLaunch}
            className="group flex items-center gap-2.5 bg-[#FFD166] hover:bg-[#ffe08a] text-[#241a05] font-display font-extrabold text-lg px-6 py-3.5 rounded-2xl rotate-[-1deg] hover:rotate-0 transition-all shadow-[0_10px_30px_rgba(255,209,102,0.35)] hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <ExpandIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Launch fullscreen
          </button>
          <a
            href="#how"
            className="flex items-center gap-2 text-[#B9C4E4] hover:text-[#F4F7FF] font-extrabold text-sm px-4 py-3 rounded-2xl border border-[#2a3568] hover:border-[#4a5aa8] bg-[#0C1230]/60 transition-all hover:-translate-y-0.5"
          >
            How the magic works
            <span className="text-[#FFD166]">↓</span>
          </a>
        </div>
      </div>

      {/* bottom-right chaos meter */}
      <div className="absolute bottom-0 right-0 z-10 p-5 sm:p-8 hidden md:block pointer-events-none">
        <div className="w-64 rounded-2xl border border-[#2a3568] bg-[#0C1230]/85 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#93A0C7] uppercase">
              Chaos level
            </span>
            <span key={session} className="pop-in font-display font-extrabold text-[#FFD166] text-lg leading-none">
              {session.toLocaleString()} ★
            </span>
          </div>
          <p className="mt-1 font-display font-bold text-xl text-[#F4F7FF]">
            {chaos.level.name}
          </p>
          <div className="mt-2 h-2 rounded-full bg-[#1a2350] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#63E6C8] via-[#FFD166] to-[#FF8E72] transition-all duration-300"
              style={{ width: `${Math.round(chaos.pct * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-bold text-[#93A0C7]">
            {chaos.next
              ? `${chaos.next.min - session} keys to “${chaos.next.name}”`
              : "Maximum chaos achieved. The galaxy fears you."}
          </p>
        </div>
      </div>
    </section>
  );
}
