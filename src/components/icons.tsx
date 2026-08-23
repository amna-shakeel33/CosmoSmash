type P = { className?: string };

export const StarIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.5l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.3l-5.6 3.3 1.4-6.3L3 9l6.4-.6L12 2.5z" />
  </svg>
);

export const SparkIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2c.6 4.9 2.4 7.6 10 10-7.6 2.4-9.4 5.1-10 10-.6-4.9-2.4-7.6-10-10 7.6-2.4 9.4-5.1 10-10z" />
  </svg>
);

export const PlanetIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <circle cx="12" cy="12" r="6.2" />
    <path d="M3.2 14.6c-1-.8-1.5-1.6-1.2-2.3.5-1.4 4-1.8 8.4-1.2 4.9.7 9.2 2.5 9.5 4.2.2 1-1 1.8-3 2.2" strokeLinecap="round" />
    <path d="M8.4 9.4c1-.8 2.3-1.3 3.6-1.3" strokeLinecap="round" opacity=".6" />
  </svg>
);

export const RocketIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M14.5 3.5c3.4.4 5.6 2.6 6 6-2.5 4.3-6.3 7.3-10.5 8.5l-3.5-3.5C7.7 10.3 10.2 6 14.5 3.5z" strokeLinejoin="round" />
    <circle cx="14.4" cy="9.6" r="1.7" />
    <path d="M6.5 14.5L4 17m3.5.5L6 20.5M9 17l-2.5 2.5" strokeLinecap="round" />
  </svg>
);

export const KeyboardIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
    <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M6 14h.01M17.9 14h.01M9 14h6" strokeLinecap="round" />
  </svg>
);

export const CometIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <circle cx="16.5" cy="7.5" r="3.6" />
    <path d="M13.6 10.4L3 21m11.5-7.5L7 21m9.5-9.5L12 16" strokeLinecap="round" />
  </svg>
);

export const SoundOnIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" strokeLinejoin="round" />
    <path d="M15.5 9a4.3 4.3 0 010 6M18 6.7a8 8 0 010 10.6" strokeLinecap="round" />
  </svg>
);

export const SoundOffIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" strokeLinejoin="round" />
    <path d="M16 9.5l5 5m0-5l-5 5" strokeLinecap="round" />
  </svg>
);

export const ShieldIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M12 3l7.5 2.8v5.4c0 4.6-3 8.1-7.5 9.8-4.5-1.7-7.5-5.2-7.5-9.8V5.8L12 3z" strokeLinejoin="round" />
    <path d="M9 12l2.2 2.2L15.5 9.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CopyIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M15.5 8.5v-3a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h3" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden>
    <path d="M4.5 12.5l5 5L19.5 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

export const PlusIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

export const ArrowIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
    <path d="M7 17L17 7m0 0H9m8 0v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ExpandIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlayIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M8 5.5v13l11-6.5-11-6.5z" />
  </svg>
);

export const ReportIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M6 3.5h9l3.5 3.5v13.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-16a1 1 0 011-1z" strokeLinejoin="round" />
    <path d="M14.5 3.5V7.5H18.5M8.5 12h7m-7 3.5h7m-7 3.5h4.5" strokeLinecap="round" />
  </svg>
);

export const HeartStarIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 21s-8-4.9-8-11a4.6 4.6 0 018-3.1A4.6 4.6 0 0120 10c0 6.1-8 11-8 11z" />
  </svg>
);
