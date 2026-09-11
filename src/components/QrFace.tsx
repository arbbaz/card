"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import type { Theme } from "./data";
import { useT } from "./LocaleContext";
import { BarcodeIcon, QrIcon } from "./icons";
import s from "./QrFace.module.css";

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

function Barcode({ label }: { label: string }) {
  return (
    <svg viewBox={`0 0 ${BARS_WIDTH} 70`} className={s.barcode} role="img" aria-label={label}>
      {BARS.map(({ x, w }, i) => (i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={56} /> : null))}
      <text x={BARS_WIDTH / 2} y="68" textAnchor="middle" fontSize="9" fontFamily="system-ui, sans-serif">
        DEMO 0000 0000
      </text>
    </svg>
  );
}

export function QrFace({ theme, payload, image }: { theme: Theme; payload: string; image?: string }) {
  const t = useT();
  const svg = useQrSvg(payload);
  const countdown = useCountdown(CODE_TTL);
  const [mode, setMode] = useState<"qr" | "bar">("qr");

  // Uploaded QR image takes precedence over the one generated from the text.
  const qr = image ? (
    // eslint-disable-next-line @next/next/no-img-element -- local data URL from admin
    <img src={image} alt="" className={s.qr} style={{ objectFit: "contain" }} />
  ) : (
    <div className={s.qr} dangerouslySetInnerHTML={{ __html: svg }} />
  );

  if (theme === "olive") {
    return (
      <div className={`${s.face} ${s.olive}`}>
        <p className={s.caption}>{t.qr.oliveCaption}</p>
        {qr}
      </div>
    );
  }

  return (
    <div className={`${s.face} ${s.sky}`}>
      <p className={s.caption}>{t.qr.refresh(countdown)}</p>
      <div className={s.codeArea}>{mode === "qr" ? qr : <Barcode label={t.qr.barcodeAlt} />}</div>
      <div className={s.switch} onClick={(e) => e.stopPropagation()}>
        <button className={s.mode} aria-pressed={mode === "qr"} onClick={() => setMode("qr")}>
          <span className={s.modeIcon}>
            <QrIcon />
          </span>
          {t.qr.qr}
        </button>
        <button className={s.mode} aria-pressed={mode === "bar"} onClick={() => setMode("bar")}>
          <span className={s.modeIcon}>
            <BarcodeIcon />
          </span>
          {t.qr.barcode}
        </button>
      </div>
    </div>
  );
}
