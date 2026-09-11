"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import type { Theme } from "./data";
import { BarcodeIcon, QrIcon } from "./icons";
import s from "./QrFace.module.css";

// The QR codes only ever encode this fixed demo text.
const DEMO_PAYLOAD: Record<Theme, string> = {
  olive: "DEMO - Pocket Pass sample QR. Fictional test data. Not a document and not valid for any verification.",
  sky: "DEMO - Sample Card code. Not a document.",
};

const CODE_TTL = 180; // seconds, sky countdown

function useQrSvg(text: string) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    QRCode.toString(text, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#000", light: "#0000" } }).then(setSvg);
  }, [text]);
  return svg;
}

function useCountdown(ttl: number) {
  const [left, setLeft] = useState(ttl);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => (l <= 1 ? ttl : l - 1)), 1000);
    return () => clearInterval(t);
  }, [ttl]);
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
}

// Decorative bars from a fixed pattern — not an encoded barcode.
const BARS = Array.from({ length: 46 }, (_, i) => 1 + ((i * 7 + 3) % 4)).reduce<{ x: number; w: number }[]>(
  (acc, w) => {
    const prev = acc.at(-1);
    return [...acc, { x: prev ? prev.x + prev.w + 0.6 : 0, w }];
  },
  [],
);

const BARS_WIDTH = BARS[BARS.length - 1].x + BARS[BARS.length - 1].w;

function Barcode() {
  return (
    <svg viewBox={`0 0 ${BARS_WIDTH} 70`} className={s.barcode} role="img" aria-label="Demo barcode">
      {BARS.map(({ x, w }, i) => (i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={56} /> : null))}
      <text x={BARS_WIDTH / 2} y="68" textAnchor="middle" fontSize="9" fontFamily="system-ui, sans-serif">
        DEMO 0000 0000
      </text>
    </svg>
  );
}

export function QrFace({ theme }: { theme: Theme }) {
  const svg = useQrSvg(DEMO_PAYLOAD[theme]);
  const countdown = useCountdown(CODE_TTL);
  const [mode, setMode] = useState<"qr" | "bar">("qr");

  if (theme === "olive") {
    return (
      <div className={`${s.face} ${s.olive}`}>
        <p className={s.caption}>Demo QR · sample data only</p>
        <div className={s.qr} dangerouslySetInnerHTML={{ __html: svg }} />
        <p className={s.stamp}>PROTOTYPE</p>
      </div>
    );
  }

  return (
    <div className={`${s.face} ${s.sky}`}>
      <p className={s.caption}>Demo code refreshes in {countdown}</p>
      <div className={s.codeArea}>
        {mode === "qr" ? <div className={s.qr} dangerouslySetInnerHTML={{ __html: svg }} /> : <Barcode />}
      </div>
      <div className={s.switch} onClick={(e) => e.stopPropagation()}>
        <button className={s.mode} aria-pressed={mode === "qr"} onClick={() => setMode("qr")}>
          <span className={s.modeIcon}>
            <QrIcon />
          </span>
          QR code
        </button>
        <button className={s.mode} aria-pressed={mode === "bar"} onClick={() => setMode("bar")}>
          <span className={s.modeIcon}>
            <BarcodeIcon />
          </span>
          Barcode
        </button>
      </div>
    </div>
  );
}
