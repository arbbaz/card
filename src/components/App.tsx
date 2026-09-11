"use client";

import { useCallback, useState } from "react";
import { cards } from "./data";
import { PinScreen } from "./PinScreen";
import { Wallet } from "./Wallet";

export function App() {
  const [locked, setLocked] = useState(true);
  const [index, setIndex] = useState(0);
  const theme = cards[index].theme;
  const unlock = useCallback(() => setLocked(false), []);

  return (
    <main className="frame">
      {/* Both backgrounds stay mounted so swiping between themes crossfades. */}
      <div className="bg theme-sky" style={{ opacity: theme === "sky" ? 1 : 0 }} />
      <div className="bg theme-olive" style={{ opacity: theme === "olive" ? 1 : 0 }} />

      {locked ? (
        <PinScreen theme={theme} onUnlock={unlock} />
      ) : (
        <Wallet index={index} onIndexChange={setIndex} onLock={() => setLocked(true)} />
      )}
    </main>
  );
}
