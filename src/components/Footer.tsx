import { useState } from "react";
import { Reveal } from "./Reveal";
import { copyText, parentMessage, SITE_URL } from "../lib/data";
import { CheckIcon, CopyIcon, HeartStarIcon, StarIcon } from "./icons";

export function Footer({ lifetime }: { lifetime: number }) {
  const [copied, setCopied] = useState<string | null>(null);

  const doCopy = async (key: string, text: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(key);
      window.setTimeout(() => setCopied(null), 2000);
    }
  };

  const waText = encodeURIComponent(parentMessage(lifetime));

  return (
    <footer className="relative z-10">
      {/* share band */}
      <section id="share" className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#2a3568] bg-[#0C1230] px-6 sm:px-12 py-12 sm:py-16">
            <span className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FFD166]/10 blur-3xl" aria-hidden />
            <span className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#63E6C8]/10 blur-3xl" aria-hidden />
            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
              <div>
                <p className="text-xs font-extrabold tracking-[0.28em] text-[#63E6C8] uppercase">
                  Rescue transmission
                </p>
                <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-5xl leading-[1.02]">
                  Know a tired parent?
                  <br />
                  <span className="text-[#FFD166]">Be the hero.</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base font-bold text-[#B9C4E4] max-w-md leading-relaxed">
                  One message and you've just donated 20 minutes of silence to a
                  household near you. Copy the pitch, or fire it straight down
                  the WhatsApp airlock.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => doCopy("msg", parentMessage(lifetime))}
                  className="flex items-center justify-center gap-2.5 bg-[#FFD166] hover:bg-[#ffe08a] text-[#241a05] font-display font-extrabold text-lg px-6 py-4 rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0.5 shadow-[0_10px_30px_rgba(255,209,102,0.3)]"
                >
                  {copied === "msg" ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                  {copied === "msg" ? "Copied — go save a parent" : "Copy message for a parent"}
                </button>
                <a
                  href={`https://wa.me/?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#12352c] hover:bg-[#17453a] text-[#63E6C8] font-display font-extrabold text-lg px-6 py-4 rounded-2xl border border-[#1e4a41] transition-all hover:-translate-y-0.5 active:translate-y-0.5"
                >
                  Share on WhatsApp
                </a>
                <button
                  onClick={() => doCopy("link", SITE_URL)}
                  className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#93A0C7] hover:text-[#F4F7FF] px-6 py-3 rounded-2xl border border-[#2a3568] hover:border-[#4a5aa8] transition-all"
                >
                  {copied === "link" ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                  {copied === "link" ? "Link copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* footer proper */}
      <div className="border-t border-[#1a2350] bg-[#070B1E]/90">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <a href="#toy" className="flex items-center gap-2.5 group">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#FFD166] text-[#241a05] rotate-6 group-hover:rotate-12 transition-transform">
                <StarIcon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-display font-extrabold text-xl leading-none">
                  COSMO<span className="text-[#FFD166]">SMASH</span>
                </span>
                <span className="block text-[11px] font-bold text-[#93A0C7] mt-1">
                  the fullscreen galaxy toy for tiny astronauts
                </span>
              </span>
            </a>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-extrabold text-[#93A0C7]">
              <a href="#how" className="hover:text-[#FFD166] transition-colors">How it works</a>
              <a href="#galaxies" className="hover:text-[#FFD166] transition-colors">Galaxy map</a>
              <a href="#parents" className="hover:text-[#FFD166] transition-colors">Mission Control</a>
              <a href="#videos" className="hover:text-[#FFD166] transition-colors">Videos</a>
              <a href="#faq" className="hover:text-[#FFD166] transition-colors">FAQ</a>
            </nav>
            <p className="flex items-center gap-1.5 text-xs font-bold text-[#93A0C7]">
              made with <HeartStarIcon className="w-3.5 h-3.5 text-[#FF8E72]" /> for tiny astronauts
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#1a2350] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-bold text-[#5d6a94]">
            <p>© 2026 CosmoSmash Flight Corp. Not affiliated with any real space agency. Yet.</p>
            <p>No ads inside the toy · no chat · no exits for tiny fingers · {lifetime.toLocaleString()} stars and counting</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
