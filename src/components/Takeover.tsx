import { useEffect, useRef, useState } from "react";
import { ToyCanvas } from "./ToyCanvas";
import { SoundEngine } from "../lib/audio";
import {
  THEMES,
  ToySettings,
  copyText,
  formatDuration,
  getChaos,
  reportText,
} from "../lib/data";
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ReportIcon,
  ShieldIcon,
  SoundOffIcon,
  SoundOnIcon,
  StarIcon,
} from "./icons";

type Props = {
  open: boolean;
  onClose: () => void;
  settings: ToySettings;
  setSettings: (s: ToySettings) => void;
  sound: SoundEngine;
  lifetime: number;
  addLifetime: (n: number) => void;
};

const HOLD_MS = 1600;

export function Takeover({
  open,
  onClose,
  settings,
  setSettings,
  sound,
  lifetime,
  addLifetime,
}: Props) {
  const [keys, setKeys] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [panel, setPanel] = useState(false);
  const [report, setReport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hold, setHold] = useState(0);
  const startRef = useRef(Date.now());
  const holdTimer = useRef<number | null>(null);

  // reset session each launch
  useEffect(() => {
    if (open) {
      setKeys(0);
      setBestCombo(0);
      setPanel(false);
      setReport(false);
      startRef.current = Date.now();
    }
  }, [open]);

  // real fullscreen + scroll lock
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    document.documentElement.requestFullscreen?.().catch(() => {});
    const onFsChange = () => {
      if (!document.fullscreenElement) onClose();
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("fullscreenchange", onFsChange);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, [open, onClose]);

  useEffect(() => {
    sound.enabled = settings.sound;
  }, [settings.sound, sound]);

  if (!open) return null;

  const chaos = getChaos(keys);
  const duration = formatDuration(Date.now() - startRef.current);

  const startHold = () => {
    const t0 = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / HOLD_MS);
      setHold(p);
      if (p >= 1) {
        setHold(0);
        setPanel(true);
        return;
      }
      holdTimer.current = requestAnimationFrame(tick);
    };
    holdTimer.current = requestAnimationFrame(tick);
  };
  const cancelHold = () => {
    if (holdTimer.current) cancelAnimationFrame(holdTimer.current);
    setHold(0);
  };

  const doCopyReport = async () => {
    const ok = await copyText(
      reportText(keys, duration, bestCombo, chaos.level.name)
    );
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const circ = 2 * Math.PI * 22;

  return (
    <div className="fixed inset-0 z-[100] bg-[#05081a]">
      <ToyCanvas
        settings={settings}
        sound={sound}
        listenKeys
        onSmash={(combo) => {
          setKeys((k) => k + 1);
          setBestCombo((b) => Math.max(b, combo));
          addLifetime(1);
        }}
        onSecret={() => setPanel(true)}
        onEscape={onClose}
      />

      {/* HUD */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 pointer-events-none">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#FFD166] text-[#241a05] rotate-6">
            <StarIcon className="w-4.5 h-4.5" />
          </span>
          <div>
            <p className="font-display font-extrabold leading-none text-sm tracking-wide">
              COSMO<span className="text-[#FFD166]">SMASH</span>
            </p>
            <p key={keys} className="pop-in text-[11px] font-extrabold text-[#93A0C7] mt-0.5">
              {keys.toLocaleString()} stars ignited · combo x{bestCombo}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setSettings({ ...settings, sound: !settings.sound })}
            aria-label="Toggle sound"
            className="w-10 h-10 grid place-items-center rounded-xl border border-[#2a3568] bg-[#0C1230]/80 text-[#B9C4E4] hover:text-[#FFD166] hover:border-[#4a5aa8] transition-colors"
          >
            {settings.sound ? <SoundOnIcon /> : <SoundOffIcon />}
          </button>
          <button
            onClick={() => setReport(true)}
            aria-label="Voyage report"
            className="w-10 h-10 grid place-items-center rounded-xl border border-[#2a3568] bg-[#0C1230]/80 text-[#B9C4E4] hover:text-[#FFD166] hover:border-[#4a5aa8] transition-colors"
          >
            <ReportIcon />
          </button>
          <button
            onClick={onClose}
            aria-label="Exit"
            className="w-10 h-10 grid place-items-center rounded-xl border border-[#5c2f26] bg-[#2a130e]/80 text-[#FF8E72] hover:bg-[#3c1a12] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* bottom prompt */}
      {keys === 0 && !panel && (
        <div className="absolute inset-x-0 bottom-8 z-10 text-center pointer-events-none">
          <p className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F7FF] drop-shadow-[0_0_30px_rgba(255,209,102,0.3)]">
            TINY ASTRONAUT MODE: ON
          </p>
          <p className="mt-2 text-xs sm:text-sm font-bold text-[#93A0C7]">
            smash away · grown-ups: hold the corner ◉ for 2s, or type{" "}
            <span className="keycap px-1.5 py-0.5 text-[11px] font-display">parent</span>
          </p>
        </div>
      )}

      {/* chaos chip */}
      {keys > 0 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#63E6C8] border border-[#1e4a41] bg-[#07211c]/80 rounded-full px-4 py-1.5">
            {chaos.level.name}
          </span>
        </div>
      )}

      {/* corner hold hotspot */}
      <button
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        aria-label="Hold for parent controls"
        className="absolute top-0 left-0 z-30 w-24 h-24 grid place-items-start p-3 cursor-pointer group"
      >
        <span className="relative w-11 h-11 grid place-items-center">
          <svg viewBox="0 0 52 52" className="absolute inset-0 -rotate-90">
            <circle cx="26" cy="26" r="22" fill="none" stroke="#2a3568" strokeWidth="3" />
            <circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - hold)}
            />
          </svg>
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              hold > 0 ? "bg-[#FFD166] scale-150" : "bg-[#4a5aa8] group-hover:bg-[#FFD166]"
            }`}
          />
        </span>
        <span className="absolute top-12 left-2 text-[10px] font-extrabold text-[#93A0C7] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          hold 2s · parents
        </span>
      </button>

      {/* parent panel */}
      <div
        className={`absolute top-0 right-0 z-40 h-full w-[300px] sm:w-[340px] bg-[#0C1230] border-l border-[#2a3568] p-6 flex flex-col gap-5 transition-transform duration-300 ${
          panel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-[#63E6C8]" />
            <h2 className="font-display font-extrabold text-xl">Mission Control</h2>
          </div>
          <button
            onClick={() => setPanel(false)}
            aria-label="Close panel"
            className="w-8 h-8 grid place-items-center rounded-lg border border-[#2a3568] text-[#93A0C7] hover:text-[#F4F7FF] transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs font-bold text-[#93A0C7] leading-relaxed -mt-2">
          For grown-ups only. The galaxy stays live behind this panel — nothing
          here is toddler-tappable by accident.
        </p>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="font-extrabold text-sm">Sound effects</span>
          <button
            onClick={() => setSettings({ ...settings, sound: !settings.sound })}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              settings.sound ? "bg-[#FFD166]" : "bg-[#2a3568]"
            }`}
            aria-pressed={settings.sound}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-[#0C1230] transition-all ${
                settings.sound ? "left-6" : "left-1"
              }`}
            />
          </button>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <p className="font-extrabold text-sm">Full motion</p>
            <p className="text-[11px] font-bold text-[#93A0C7]">off = gentle mode</p>
          </div>
          <button
            onClick={() => setSettings({ ...settings, motion: !settings.motion })}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              settings.motion ? "bg-[#63E6C8]" : "bg-[#2a3568]"
            }`}
            aria-pressed={settings.motion}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-[#0C1230] transition-all ${
                settings.motion ? "left-6" : "left-1"
              }`}
            />
          </button>
        </label>

        <div>
          <p className="font-extrabold text-sm mb-2">Star palette</p>
          <div className="flex gap-2">
            {THEMES.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setSettings({ ...settings, theme: i })}
                className={`flex-1 rounded-xl p-2 border transition-all ${
                  settings.theme === i
                    ? "border-[#FFD166] bg-[#1a1607]"
                    : "border-[#2a3568] hover:border-[#4a5aa8]"
                }`}
              >
                <span className="flex justify-center gap-1">
                  {t.colors.slice(0, 4).map((c) => (
                    <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </span>
                <span className="block text-center text-[10px] font-extrabold text-[#93A0C7] mt-1.5">
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2.5">
          <button
            onClick={onClose}
            className="w-full bg-[#FF8E72] hover:bg-[#ffa38c] text-[#2b0f08] font-display font-extrabold py-3 rounded-xl transition-colors"
          >
            Exit fullscreen
          </button>
          <p className="text-[11px] font-bold text-[#93A0C7] text-center">
            or press <span className="keycap px-1.5 py-0.5 text-[10px] font-display">esc</span>{" "}
            while they look away
          </p>
        </div>
      </div>

      {/* voyage report */}
      {report && (
        <div className="absolute inset-0 z-50 grid place-items-center p-5 bg-[#05081a]/80">
          <div className="pop-in w-full max-w-sm rounded-3xl border border-[#2a3568] bg-[#0C1230] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-2xl">🚀 Voyage report</h3>
              <button
                onClick={() => setReport(false)}
                aria-label="Close report"
                className="w-8 h-8 grid place-items-center rounded-lg border border-[#2a3568] text-[#93A0C7] hover:text-[#F4F7FF]"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <dl className="mt-5 space-y-3">
              {[
                ["Stars ignited", keys.toLocaleString()],
                ["Voyage time", duration],
                ["Best combo", `x${bestCombo}`],
                ["Chaos level", chaos.level.name],
                ["Career total", lifetime.toLocaleString()],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-[#1a2350] pb-2.5">
                  <dt className="text-sm font-bold text-[#93A0C7]">{k}</dt>
                  <dd className="font-display font-extrabold text-lg text-[#FFD166]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-2.5">
              <button
                onClick={doCopyReport}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FFD166] hover:bg-[#ffe08a] text-[#241a05] font-display font-extrabold py-3 rounded-xl transition-colors"
              >
                {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy report"}
              </button>
              <button
                onClick={() => setReport(false)}
                className="px-4 font-extrabold text-sm text-[#B9C4E4] border border-[#2a3568] rounded-xl hover:border-[#4a5aa8] transition-colors"
              >
                Keep smashing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
