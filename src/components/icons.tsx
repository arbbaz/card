import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const FaceIdIcon = (p: P) => (
  <svg {...base} viewBox="0 0 64 64" width={64} height={64} strokeWidth={3.4} {...p}>
    <path d="M6 18V12a6 6 0 0 1 6-6h6M46 6h6a6 6 0 0 1 6 6v6M58 46v6a6 6 0 0 1-6 6h-6M18 58h-6a6 6 0 0 1-6-6v-6" />
    <path d="M21 24v4M43 24v4M32 24v11a2 2 0 0 1-2 2h-1M23 44c5 5 13 5 18 0" />
  </svg>
);

export const DeleteIcon = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base} viewBox="0 0 40 30" width={40} height={30} strokeWidth={2.4} {...p}>
    <path
      d="M12 3h23a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H12L2 15z"
      fill={filled ? "#fff" : "none"}
      stroke={filled ? "none" : "currentColor"}
    />
    <path d="M18 10l10 10M28 10L18 20" />
  </svg>
);

export const BellIcon = (p: P) => (
  <svg {...base} width={20} height={20} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
    <path d="M12 2a6 6 0 0 0-6 6v4.2L4.3 15.6A1 1 0 0 0 5.2 17h13.6a1 1 0 0 0 .9-1.4L18 12.2V8a6 6 0 0 0-6-6zM9.5 19a2.5 2.5 0 0 0 5 0z" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} width={22} height={22} viewBox="0 0 24 24" strokeWidth={3.2} {...p}>
    <path d="M12 3v18M3 12h18" />
  </svg>
);

export const DotsIcon = (p: P) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

/* Decorative handwritten-style signature squiggle (not a real signature). */
export const SignatureMark = (p: P) => (
  <svg viewBox="0 0 140 44" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 30c10-22 17-24 19-10s-5 20 1 20c9 0 12-24 20-24 6 0 3 17 11 17 9 0 13-21 24-10 8 8 5 17 16 12 7-3 10-9 21-6" />
    <path d="M40 39h92" strokeWidth={1.2} opacity={0.45} />
  </svg>
);

/* Emblem badge shown on the olive card: a shield with the trident cut out
   (inline vector, ported from the reference app). */
export const BadgeIcon = () => (
  <svg width={44} height={48} viewBox="150 110 220 270" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <mask id="cutout-maincard-trident">
        <rect width="500" height="500" fill="white" />
        <path
          d="M 185.73 152.581 L 187.247 294.574 L 243.073 294.877 C 236.88 293.116 258.149 326.866 258.547 326.431 C 263.181 326.314 282.524 292.07 278.268 294.27 L 332.274 294.27 L 332.881 153.492 C 288.549 165.834 299.596 252.913 305.271 262.413 L 276.144 263.323 C 271.258 246.621 296.539 151.643 259.761 128.006 C 224.936 151.839 247.1 235.167 243.984 261.806 L 215.767 262.413 C 223.188 225.833 223.104 160.43 185.73 152.581 Z"
          fill="black"
        />
      </mask>
    </defs>
    <path
      d="M 150.232 111.669 C 138.152 279.436 165.736 328.354 259.154 368.348 C 344.099 328.358 385.598 279.144 368.986 111.669 L 150.232 111.669 Z"
      fill="#111"
      mask="url(#cutout-maincard-trident)"
    />
  </svg>
);

export const QrIcon = (p: P) => (
  <svg {...base} width={22} height={22} viewBox="0 0 24 24" strokeWidth={2} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <path d="M14 14h3v3h-3zM18 18h3v3h-3zM18 14h3M14 18v3" strokeWidth={1.6} />
  </svg>
);

export const BarcodeIcon = (p: P) => (
  <svg {...base} width={22} height={22} viewBox="0 0 24 24" strokeWidth={2} {...p}>
    <path d="M5 6v12M9.5 6v12M14 6v12M18.5 6v12" />
  </svg>
);

/* Olive nav */
export const PassIcon = (p: P) => (
  <svg width={30} height={30} viewBox="0 0 64 64" fill="currentColor" {...p}>
    <rect x="12" y="8" width="40" height="48" rx="3" ry="3" />
    <rect x="16" y="36" width="32" height="4" fill="#fff" />
    <rect x="16" y="44" width="32" height="4" fill="#fff" />
  </svg>
);
export const GridIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="9" height="9" rx="1.8" />
    <rect x="16" y="3" width="9" height="9" rx="1.8" />
    <rect x="3" y="16" width="9" height="9" rx="1.8" />
    <rect x="16" y="16" width="9" height="9" rx="1.8" />
  </svg>
);
export const JobsIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="2.5" width="20" height="23" rx="2" />
    <path d="M14 9l5 5-5 5-5-5z" fill="currentColor" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base} strokeWidth={2.6} {...p}>
    <path d="M4 7h20M4 14h20M4 21h20" />
  </svg>
);

/* Sky nav */
export const FeedIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="17" height="16" rx="2.5" />
    <path d="M7 8h9M7 12h9M20 11h3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-2" />
  </svg>
);
export const DocsIcon = (p: P) => (
  <svg width={28} height={28} viewBox="0 0 28 28" {...p}>
    <rect x="3" y="3" width="22" height="22" rx="4" fill="currentColor" />
    <path d="M9 9h5M9 13h5M9 18h10" stroke="#000" strokeWidth={2.2} strokeLinecap="round" />
    <rect x="16" y="8" width="3" height="6" rx="1" fill="#000" />
  </svg>
);
export const SparkIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="22" height="22" rx="5" />
    <path d="M14 7c.6 3.8 3.2 6.4 7 7-3.8.6-6.4 3.2-7 7-.6-3.8-3.2-6.4-7-7 3.8-.6 6.4-3.2 7-7z" fill="currentColor" stroke="none" />
  </svg>
);
export const BoltIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="22" height="22" rx="5" />
    <path d="M15.5 6.5 9.5 15h5l-2 6.5 6-8.5h-5z" fill="currentColor" stroke="none" />
  </svg>
);
export const UserIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="14" cy="14" r="11.5" />
    <circle cx="14" cy="11" r="4" />
    <path d="M6.5 22.5c1.8-3 4.4-4.5 7.5-4.5s5.7 1.5 7.5 4.5" />
  </svg>
);
