import { useCallback, useEffect, useRef, useState } from "react";
import { Starfield } from "./components/Starfield";
import { HeroToy } from "./components/HeroToy";
import { Ticker } from "./components/Ticker";
import { HowItWorks } from "./components/HowItWorks";
import { Gallery } from "./components/Gallery";
import { ParentPanelSection } from "./components/ParentPanelSection";
import { ViralWall } from "./components/ViralWall";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Takeover } from "./components/Takeover";
import { SoundEngine } from "./lib/audio";
import { ToySettings } from "./lib/data";

const BASE_STARS = 1_284_507;
const LS_KEY = "cosmosmash-stars";

export default function App() {
  const soundRef = useRef<SoundEngine | null>(null);
  if (!soundRef.current) soundRef.current = new SoundEngine();
  const sound = soundRef.current;

  const [takeoverOpen, setTakeoverOpen] = useState(false);
  const [settings, setSettings] = useState<ToySettings>({
    sound: true,
    motion: true,
    theme: 0,
  });
  const [extra, setExtra] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(LS_KEY)) || 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, String(extra));
    } catch {
      /* private mode — the galaxy forgives */
    }
  }, [extra]);

  useEffect(() => {
    sound.enabled = settings.sound;
  }, [settings.sound, sound]);

  const addLifetime = useCallback((n: number) => setExtra((e) => e + n), []);
  const closeTakeover = useCallback(() => setTakeoverOpen(false), []);

  const lifetime = BASE_STARS + extra;

  return (
    <div className="relative min-h-screen bg-[#070B1E] text-[#EAF0FF] overflow-x-clip">
      <Starfield />
      <div className="noise-layer" aria-hidden />

      <main className="relative">
        <HeroToy
          settings={settings}
          sound={sound}
          takeoverOpen={takeoverOpen}
          onLaunch={() => setTakeoverOpen(true)}
          lifetime={lifetime}
          addLifetime={addLifetime}
        />
        <Ticker lifetime={lifetime} />
        <HowItWorks />
        <Gallery />
        <ParentPanelSection />
        <ViralWall />
        <FAQ />
        <Footer lifetime={lifetime} />
      </main>

      <Takeover
        open={takeoverOpen}
        onClose={closeTakeover}
        settings={settings}
        setSettings={setSettings}
        sound={sound}
        lifetime={lifetime}
        addLifetime={addLifetime}
      />
    </div>
  );
}
