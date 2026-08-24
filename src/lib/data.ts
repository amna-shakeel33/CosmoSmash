export type ChaosLevel = { name: string; min: number };

export const CHAOS_LEVELS: ChaosLevel[] = [
  { name: "Stardust rookie", min: 0 },
  { name: "Tiny twinkle", min: 25 },
  { name: "Comet starter", min: 75 },
  { name: "Planet popper", min: 150 },
  { name: "Rocket ranger", min: 300 },
  { name: "Supernova legend", min: 500 },
];

export function getChaos(keys: number) {
  let idx = 0;
  for (let i = 0; i < CHAOS_LEVELS.length; i++) {
    if (keys >= CHAOS_LEVELS[i].min) idx = i;
  }
  const level = CHAOS_LEVELS[idx];
  const next = CHAOS_LEVELS[idx + 1] ?? null;
  const pct = next
    ? Math.min(1, (keys - level.min) / (next.min - level.min))
    : 1;
  return { level, next, pct, idx };
}

export const THEMES = [
  {
    name: "Classic Cosmos",
    colors: ["#FFD166", "#FF8E72", "#63E6C8", "#7FB5FF", "#F4F7FF"],
  },
  {
    name: "Solar Peach",
    colors: ["#FFC46B", "#FF9E7D", "#FFE08A", "#FFD9A0", "#FFF3E0"],
  },
  {
    name: "Mint Aurora",
    colors: ["#63E6C8", "#8BE8A9", "#A5F3FC", "#FFE08A", "#EAF7FF"],
  },
];

export type ToySettings = { sound: boolean; motion: boolean; theme: number };

export const POP_WORDS = [
  "POP!",
  "ZOOM!",
  "WHEEE!",
  "BOOP!",
  "SPARK!",
  "YAY!",
  "WHOOSH!",
  "TWINKLE!",
];

export type GalaxyCard = {
  img: string;
  code: string;
  name: string;
  author: string;
  keys: number;
  chaos: string;
  tilt: string;
};

export const GALAXIES: GalaxyCard[] = [
  {
    img: "https://image.qwenlm.ai/generated-images/6de15d69-fcae-4d4a-be5a-c3d92c7faea7/_result.png",
    code: "TRANSMISSION 042",
    name: "The Great Slobber Nebula",
    author: "Mia · 22 months",
    keys: 1204,
    chaos: "Supernova legend",
    tilt: "-rotate-2",
  },
  {
    img: "https://image.qwenlm.ai/generated-images/dfdaff71-4631-4096-a44b-9c5b3d62c3eb/_result.png",
    code: "TRANSMISSION 051",
    name: "Blobbert's Big Bang",
    author: "Theo · 18 months",
    keys: 486,
    chaos: "Rocket ranger",
    tilt: "rotate-1",
  },
  {
    img: "https://image.qwenlm.ai/generated-images/a88f44f7-e244-480c-a42d-941e95a3f56f/_result.png",
    code: "TRANSMISSION 063",
    name: "The Ringy-Thingy System",
    author: "June · 2 years",
    keys: 733,
    chaos: "Supernova legend",
    tilt: "-rotate-1",
  },
  {
    img: "https://image.qwenlm.ai/generated-images/81e43c03-9818-46c1-96d3-87ba35c10ffa/_result.png",
    code: "TRANSMISSION 077",
    name: "Comet Nap-Time",
    author: "Ravi · 15 months",
    keys: 312,
    chaos: "Planet popper",
    tilt: "rotate-2",
  },
];

export type ViralPost = {
  img: string;
  platform: string;
  accent: string;
  caption: string;
  handle: string;
  views: string;
  shares: string;
};

export const POSTS: ViralPost[] = [
  {
    img: "https://image.qwenlm.ai/generated-images/8abea529-b4e0-4843-a028-0500ccb98b33/_result.png",
    platform: "TikTok",
    accent: "#63E6C8",
    caption: "He discovered the spacebar and we have never been more productive.",
    handle: "@naptime.commander",
    views: "4.2M views",
    shares: "88K shares",
  },
  {
    img: "https://image.qwenlm.ai/generated-images/962d5d33-6622-4805-b00f-6d3fbfe3e14c/_result.png",
    platform: "Instagram",
    accent: "#FF8E72",
    caption: "POV: the dog has a spaceship now. She pressed 200 keys.",
    handle: "@cosmic.toddler.mom",
    views: "1.8M views",
    shares: "41K shares",
  },
  {
    img: "https://image.qwenlm.ai/generated-images/962d6e1f-97ed-4501-b536-4a33c0d3d46b/_result.png",
    platform: "YouTube",
    accent: "#FFD166",
    caption: "Twins vs. the galaxy — 45 glorious minutes of silence.",
    handle: "@OrbitDad",
    views: "960K views",
    shares: "22K shares",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Is it actually safe for my baby?",
    a: "Yes. The toy has no ads, no chat, no outbound links and no purchases inside the play area. Every key is swallowed by the galaxy, and leaving fullscreen requires a grown-up gesture — holding the top-left corner for two seconds or typing “parent”.",
  },
  {
    q: "How does fullscreen mode work?",
    a: "Tap “Launch fullscreen” and the browser hides everything except the galaxy. Your toddler can smash keyboard, touchpad or screen freely. To come back, hold the top-left corner for 2 seconds, type “parent”, or press Escape yourself when they're not looking.",
  },
  {
    q: "What does each key actually do?",
    a: "Every key bursts into stardust where you'd least expect it. Number keys pop planets with rings, the spacebar detonates a shockwave ring in the middle of the sky, Enter launches a rocket, and keeping an 8-key combo streak going fires even more rockets. Cross a milestone and the whole sky goes supernova.",
  },
  {
    q: "Is there sound?",
    a: "Gentle synth blips in a pentatonic scale — every key plays a note, rockets whoosh, supernovas boom. Nothing plays until the first smash (browsers require it), and you can mute everything from Mission Control.",
  },
  {
    q: "Does it work on a phone or tablet?",
    a: "Yes — touch counts as a smash. On a touchscreen your toddler taps and drags to spray comets of stardust. It's particularly good at neutralising the back-seat passenger on long drives.",
  },
  {
    q: "How does CosmoSmash make money?",
    a: "The toy itself is free and ad-free, always. The site around it is supported by a single sponsored slot in the video wall and an optional “name a star” tip jar. No banners ever appear inside the play area, because a toddler will absolutely click them.",
  },
];

export const SITE_URL = "https://cosmosmash.space";

export function parentMessage(stars: number): string {
  return [
    "If you work from home with a toddler, you need this.",
    "CosmoSmash turns keyboard smashing into a galaxy — every key ignites a star, combos launch rockets, milestones go supernova.",
    `My tiny astronaut just ignited ${stars.toLocaleString()} stars 🚀`,
    SITE_URL,
  ].join("\n");
}

export function reportText(
  keys: number,
  duration: string,
  bestCombo: number,
  chaos: string
): string {
  return [
    "🚀 CosmoSmash Voyage Report",
    `★ Stars ignited: ${keys.toLocaleString()}`,
    `⏱ Voyage time: ${duration}`,
    `🔥 Best combo: x${bestCombo}`,
    `🌌 Chaos level: ${chaos}`,
    "Verdict: basically an astronaut now.",
    SITE_URL,
  ].join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export function formatDuration(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")} min`;
}
