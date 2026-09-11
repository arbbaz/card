"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import type { Theme } from "./data";
import { useT } from "./LocaleContext";
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

type Tab = { Icon: ComponentType<SVGProps<SVGSVGElement>>; badge?: boolean };

// Icons per theme; labels come from the active locale's dictionary (t.nav),
// which is kept in the same order.
const TABS: Record<Theme, Tab[]> = {
  olive: [{ Icon: PassIcon }, { Icon: GridIcon }, { Icon: JobsIcon }, { Icon: MenuIcon }],
  sky: [
    { Icon: FeedIcon },
    { Icon: DocsIcon },
    { Icon: SparkIcon },
    { Icon: BoltIcon },
    { Icon: UserIcon, badge: true },
  ],
};

// The "home" tab each nav starts on — the card tab.
const HOME: Record<Theme, number> = { olive: 0, sky: 1 };

export function BottomNav({ theme }: { theme: Theme }) {
  const t = useT();
  const [active, setActive] = useState<Record<Theme, number>>(HOME);
  const labels = t.nav[theme];

  return (
    <nav className={`${s.nav} ${theme === "olive" ? s.olive : s.sky}`}>
      {TABS[theme].map(({ Icon, badge }, i) => (
        <button
          key={i}
          className={`${s.tab} ${active[theme] === i ? s.active : ""}`}
          aria-current={active[theme] === i ? "page" : undefined}
          onClick={() => setActive((a) => ({ ...a, [theme]: i }))}
        >
          <span className={s.iconWrap}>
            <Icon />
            {badge && <i className={s.badge} />}
          </span>
          {labels[i]}
        </button>
      ))}
    </nav>
  );
}
