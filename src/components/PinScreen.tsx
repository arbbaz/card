"use client";

import { useEffect, useState } from "react";
import type { Theme } from "./data";
import { useT } from "./LocaleContext";
import { PIN_LENGTH } from "./store";
import { DeleteIcon, FaceIdIcon } from "./icons";
import s from "./PinScreen.module.css";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function PinScreen({
  theme,
  passcode,
  onUnlock,
}: {
  theme: Theme;
  passcode: string;
  onUnlock: () => void;
}) {
  const t = useT();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  // When 4 digits are entered: unlock if it matches the configured passcode
  // (an empty passcode accepts any 4 digits — the demo default). Otherwise
  // shake and clear. A short beat lets the last dot register first.
  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return;
    if (passcode === "" || pin === passcode) {
      const t = setTimeout(onUnlock, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setError(true);
      setPin("");
    }, 250);
    return () => clearTimeout(t);
  }, [pin, passcode, onUnlock]);

  // Adding a digit also clears any previous wrong-passcode state.
  const addDigit = (d: string) => {
    setError(false);
    setPin((p) => (p.length < PIN_LENGTH ? p + d : p));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) addDigit(e.key);
      if (e.key === "Backspace") setPin((p) => p.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const press = (d: string) => addDigit(d);

  return (
    <div className={`${s.screen} ${theme === "sky" ? `theme-sky-soft ${s.sky}` : `theme-olive ${s.olive}`}`}>
      <h1 className={s.title}>{t.pin.title}</h1>

      <div
        className={`${s.dots} ${error ? s.shake : ""}`}
        aria-label={error ? t.pin.wrong : t.pin.digits(pin.length, PIN_LENGTH)}
      >
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
        <button className={s.icon} onClick={onUnlock} aria-label={t.pin.faceId}>
          <FaceIdIcon width={theme === "sky" ? 58 : 66} height={theme === "sky" ? 58 : 66} />
        </button>
        <button className={s.key} onClick={() => press("0")}>
          0
        </button>
        <button className={s.icon} onClick={() => setPin((p) => p.slice(0, -1))} aria-label={t.pin.del}>
          <DeleteIcon filled={theme === "olive"} />
        </button>
      </div>

      <button className={s.forgot}>{t.pin.forgot}</button>
    </div>
  );
}
