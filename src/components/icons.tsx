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

/* Neutral placeholder emblem — a simple monogram badge, not a state symbol. */
export const BadgeIcon = (p: P) => (
  <svg width={34} height={38} viewBox="0 0 34 38" {...p}>
    <path d="M3 3h28v17c0 8-6.5 13.5-14 15C9.5 33.5 3 28 3 20z" fill="#111" />
    <text x="17" y="23" textAnchor="middle" fontSize="13" fontWeight="800" fill="#d6d5c0" fontFamily="system-ui, sans-serif">
      PP
    </text>
  </svg>
);

/* Olive nav */
export const PassIcon = (p: P) => (
  <svg width={28} height={28} viewBox="0 0 28 28" fill="currentColor" {...p}>
    <rect x="4" y="2" width="20" height="24" rx="2.5" />
    <rect x="7" y="17" width="14" height="2" fill="#e4e4e0" />
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
