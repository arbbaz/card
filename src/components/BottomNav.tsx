"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import type { Theme } from "./data";
import {
  BoltIcon,
  DocsIcon,
  FeedIcon,
  GridIcon,
  JobsIcon,
  MenuIcon,
  PassIcon,
  SparkIcon,
  UserIcon,
} from "./icons";
import s from "./BottomNav.module.css";

type Tab = { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; badge?: boolean };

const TABS: Record<Theme, Tab[]> = {
  olive: [
    { label: "My Pass", Icon: PassIcon },
    { label: "Services", Icon: GridIcon },
    { label: "Jobs", Icon: JobsIcon },
    { label: "Menu", Icon: MenuIcon },
  ],
  sky: [
    { label: "Feed", Icon: FeedIcon },
    { label: "Documents", Icon: DocsIcon },
    { label: "Assistant", Icon: SparkIcon },
    { label: "Services", Icon: BoltIcon },
    { label: "Menu", Icon: UserIcon, badge: true },
  ],
};

// The "home" tab each nav starts on — the card tab.
const HOME: Record<Theme, number> = { olive: 0, sky: 1 };

export function BottomNav({ theme }: { theme: Theme }) {
  const [active, setActive] = useState<Record<Theme, number>>(HOME);

  return (
    <nav className={`${s.nav} ${theme === "olive" ? s.olive : s.sky}`}>
      {TABS[theme].map(({ label, Icon, badge }, i) => (
        <button
          key={label}
          className={`${s.tab} ${active[theme] === i ? s.active : ""}`}
          aria-current={active[theme] === i ? "page" : undefined}
          onClick={() => setActive((a) => ({ ...a, [theme]: i }))}
        >
          <span className={s.iconWrap}>
            <Icon />
            {badge && <i className={s.badge} />}
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}
