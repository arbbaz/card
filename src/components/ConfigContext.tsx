"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, type Locale } from "../i18n";
import {
  cloneConfig,
  getConfigSnapshot,
  getServerConfigSnapshot,
  makeDefaultConfig,
  subscribeConfig,
  type Config,
} from "./store";

const ConfigContext = createContext<Config>(makeDefaultConfig(DEFAULT_LOCALE));

// Reads the stored config for the given locale via useSyncExternalStore:
// renders locale defaults on the server and first client paint (matching
// hydration), then the saved config — and stays in sync when /admin saves,
// in this tab or another.
export function ConfigProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const subscribe = useMemo(() => subscribeConfig(locale), [locale]);
  const getSnapshot = useMemo(() => getConfigSnapshot(locale), [locale]);
  const getServerSnapshot = useMemo(() => getServerConfigSnapshot(locale), [locale]);

  const config = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfig(): Config {
  return useContext(ConfigContext);
}

export { cloneConfig };
