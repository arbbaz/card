// Client-side persistence for the demo. Everything the /admin route can edit
// lives here and is stored in the browser (localStorage), keyed per-locale so
// the Ukrainian ("/") and English ("/en") demos keep independent sample data.

import { DEFAULT_LOCALE, defaultCards, type Locale } from "../i18n";
import { type SampleCard } from "./data";

export type Config = {
  // 4-digit wallet passcode. Empty string = any 4 digits unlock (demo default).
  passcode: string;
  cards: SampleCard[];
};

export const PIN_LENGTH = 4;

function storageKey(locale: Locale): string {
  return `pocket-pass:config:v1:${locale}`;
}

export function makeDefaultConfig(locale: Locale): Config {
  return { passcode: "", cards: cloneCards(defaultCards[locale] ?? defaultCards[DEFAULT_LOCALE]) };
}

function cloneCards(cards: SampleCard[]): SampleCard[] {
  return cards.map((card) => ({
    ...card,
    fields: card.fields.map((f) => ({ ...f })),
    name: [...card.name],
  }));
}

// Deep clone so callers can edit freely without touching the defaults.
export function cloneConfig(c: Config): Config {
  return { passcode: c.passcode, cards: cloneCards(c.cards) };
}

function isCard(x: unknown): x is SampleCard {
  if (!x || typeof x !== "object") return false;
  const c = x as Record<string, unknown>;
  return (
    typeof c.id === "string" &&
    (c.theme === "olive" || c.theme === "sky") &&
    typeof c.title === "string" &&
    Array.isArray(c.fields) &&
    Array.isArray(c.name) &&
    typeof c.qr === "string"
  );
}

// Read config from localStorage, falling back to the locale's defaults. Never throws.
export function loadConfig(locale: Locale): Config {
  if (typeof window === "undefined") return makeDefaultConfig(locale);
  try {
    const raw = window.localStorage.getItem(storageKey(locale));
    if (!raw) return makeDefaultConfig(locale);
    const parsed = JSON.parse(raw) as Partial<Config>;
    const cards = Array.isArray(parsed.cards) ? parsed.cards.filter(isCard) : [];
    return {
      passcode: typeof parsed.passcode === "string" ? parsed.passcode : "",
      cards: cards.length ? cards : makeDefaultConfig(locale).cards,
    };
  } catch {
    return makeDefaultConfig(locale);
  }
}

export function saveConfig(locale: Locale, c: Config): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(locale), JSON.stringify(c));
  notify(locale);
}

export function resetConfig(locale: Locale): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(locale));
  notify(locale);
}

// --- External-store interface for useSyncExternalStore ------------------------
// getSnapshot must return a stable reference while the data is unchanged, so we
// cache the parsed config per storage key against the raw string it came from.

const listeners = new Map<Locale, Set<() => void>>();
const cache = new Map<Locale, { raw: string | null; config: Config }>();

function notify(locale: Locale) {
  listeners.get(locale)?.forEach((l) => l());
}

export function subscribeConfig(locale: Locale) {
  return (listener: () => void): (() => void) => {
    let set = listeners.get(locale);
    if (!set) listeners.set(locale, (set = new Set()));
    set.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey(locale) || e.key === null) notify(locale);
    };
    window.addEventListener("storage", onStorage);
    return () => {
      set.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };
}

export function getConfigSnapshot(locale: Locale) {
  return (): Config => {
    const raw =
      typeof window === "undefined" ? null : window.localStorage.getItem(storageKey(locale));
    const cached = cache.get(locale);
    if (cached && cached.raw === raw) return cached.config;
    const config = loadConfig(locale);
    cache.set(locale, { raw, config });
    return config;
  };
}

// Stable server/first-paint snapshot (matches SSR output). Memoized per locale
// so useSyncExternalStore always sees the same reference before hydration.
const serverDefaults = new Map<Locale, Config>();

export function getServerConfigSnapshot(locale: Locale) {
  let config = serverDefaults.get(locale);
  if (!config) serverDefaults.set(locale, (config = makeDefaultConfig(locale)));
  return (): Config => config as Config;
}
