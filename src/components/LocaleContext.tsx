"use client";

import { createContext, useContext, useEffect } from "react";
import { DEFAULT_LOCALE, getDict, type Dict, type Locale } from "../i18n";

type LocaleValue = { locale: Locale; t: Dict };

const LocaleContext = createContext<LocaleValue>({
  locale: DEFAULT_LOCALE,
  t: getDict(DEFAULT_LOCALE),
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // Keep the document language attribute in sync (a DOM side effect, not state).
  useEffect(() => {
    document.documentElement.lang = getDict(locale).htmlLang;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t: getDict(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleValue {
  return useContext(LocaleContext);
}

// Convenience: just the dictionary.
export function useT(): Dict {
  return useContext(LocaleContext).t;
}
