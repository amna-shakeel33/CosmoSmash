import { SparkIcon } from "./icons";

export function Ticker({ lifetime }: { lifetime: number }) {
  const items = [
    `${lifetime.toLocaleString()} stars ignited all-time`,
    "412 tiny astronauts aboard right now",
    "96 comets launched this hour",
    "best combo today: x24 — Luna, age 2",
    "3 supernovas in the last hour",
    "0 ads inside the toy, forever",
    "spacebar = shockwave · enter = rocket",
  ];
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((it) => (
        <span
          key={key + it}
          className="flex items-center gap-3 pr-3 text-sm font-extrabold tracking-wide text-[#B9C4E4] whitespace-nowrap"
        >
          <SparkIcon className="w-3.5 h-3.5 text-[#FFD166]" />
          {it}
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee relative z-10 border-y border-[#1a2350] bg-[#0A0F2A]/90 py-3.5 overflow-hidden">
      <div className="marquee-track flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
