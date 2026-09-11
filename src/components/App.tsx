"use client";

import { useCallback, useState } from "react";
import type { Locale } from "../i18n";
import { ConfigProvider, useConfig } from "./ConfigContext";
import { LocaleProvider } from "./LocaleContext";
import { PinScreen } from "./PinScreen";
import { Wallet } from "./Wallet";

function WalletApp() {
  const { cards, passcode } = useConfig();
  const [locked, setLocked] = useState(true);
  const [index, setIndex] = useState(0);
  // Guard against the stored card list being shorter than the current index.
  const safeIndex = Math.min(index, cards.length - 1);
  const theme = cards[safeIndex].theme;
  const unlock = useCallback(() => setLocked(false), []);

  return (
    <main className="frame">
      {/* Both backgrounds stay mounted so swiping between themes crossfades. */}
      <div className="bg theme-sky" style={{ opacity: theme === "sky" ? 1 : 0 }} />
      <div className="bg theme-olive" style={{ opacity: theme === "olive" ? 1 : 0 }} />

      {locked ? (
        <PinScreen theme={theme} passcode={passcode} onUnlock={unlock} />
      ) : (
        <Wallet onIndexChange={setIndex} onLock={() => setLocked(true)} />
      )}
    </main>
  );
}

export function App({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <ConfigProvider locale={locale}>
        <WalletApp />
      </ConfigProvider>
    </LocaleProvider>
  );
}
