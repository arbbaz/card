"use client";

import { useEffect, useState } from "react";
import type { Theme } from "./data";
import { DeleteIcon, FaceIdIcon } from "./icons";
import s from "./PinScreen.module.css";

const PIN_LENGTH = 4;
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function PinScreen({ theme, onUnlock }: { theme: Theme; onUnlock: () => void }) {
  const [pin, setPin] = useState("");

  // Demo: any 4 digits unlock after a short beat so the last dot is seen.
  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return;
    const t = setTimeout(onUnlock, 250);
    return () => clearTimeout(t);
  }, [pin, onUnlock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) setPin((p) => (p.length < PIN_LENGTH ? p + e.key : p));
      if (e.key === "Backspace") setPin((p) => p.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const press = (d: string) => setPin((p) => (p.length < PIN_LENGTH ? p + d : p));

  return (
    <div className={`${s.screen} ${theme === "sky" ? `theme-sky-soft ${s.sky}` : `theme-olive ${s.olive}`}`}>
      <h1 className={s.title}>Enter passcode</h1>

      <div className={s.dots} aria-label={`${pin.length} of ${PIN_LENGTH} digits entered`}>
        {Array.from({ length: PIN_LENGTH }, (_, i) => (
          <span key={i} className={`${s.dot} ${i < pin.length ? s.filled : ""}`} />
        ))}
      </div>

      <div className={s.pad}>
        {KEYS.map((k) => (
          <button key={k} className={s.key} onClick={() => press(k)}>
            {k}
          </button>
        ))}
        <button className={s.icon} onClick={onUnlock} aria-label="Unlock with Face ID (demo)">
          <FaceIdIcon width={theme === "sky" ? 58 : 66} height={theme === "sky" ? 58 : 66} />
        </button>
        <button className={s.key} onClick={() => press("0")}>
          0
        </button>
        <button className={s.icon} onClick={() => setPin((p) => p.slice(0, -1))} aria-label="Delete digit">
          <DeleteIcon filled={theme === "olive"} />
        </button>
      </div>

      <button className={s.forgot}>Forgot passcode</button>
    </div>
  );
}
