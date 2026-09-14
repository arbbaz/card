"use client";

import { useRef, useState } from "react";
import { BottomNav } from "./BottomNav";
import { Card } from "./Card";
import { useConfig } from "./ConfigContext";
import { type Theme } from "./data";
import { useT } from "./LocaleContext";
import { BellIcon } from "./icons";
import { QrFace } from "./QrFace";
import s from "./Wallet.module.css";

function formatStamp(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())} | ${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export function Wallet({
  onIndexChange,
  onLock,
}: {
  onIndexChange: (i: number) => void;
  onLock: () => void;
}) {
  const { cards } = useConfig();
  const t = useT();
  const scroller = useRef<HTMLDivElement>(null);
  const [stamp] = useState(() => formatStamp(new Date()));
  const [sheetOpen, setSheetOpen] = useState(false);
  const [index, setIndex] = useState(0);
  // Tapping a card shows its QR in place (a flip), tapping again returns.
  const [qrFor, setQrFor] = useState<string | null>(null);
  const theme: Theme = cards[Math.min(index, cards.length - 1)].theme;

  const onScroll = () => {
    const el = scroller.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    const step = slide.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
    const i = Math.round(el.scrollLeft / step);
    if (i !== index && i >= 0 && i < cards.length) {
      setIndex(i);
      onIndexChange(i);
    }
  };

  return (
    <div className={`${s.wallet} ${theme === "olive" ? s.olive : s.sky}`}>
      <div className={s.top}>
        <button className={s.notify}>
          {t.wallet.notifications} <BellIcon />
        </button>
      </div>

      <div className={s.center}>
        <div ref={scroller} className={s.scroller} onScroll={onScroll}>
          {cards.map((c) => {
            const showQr = qrFor === c.id;
            const toggle = () => setQrFor(showQr ? null : c.id);
            return (
              <div
                key={c.id}
                className={s.slide}
                role="button"
                tabIndex={0}
                aria-label={showQr ? t.wallet.backTo(c.title) : t.wallet.showQr(c.title)}
                onClick={toggle}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
              >
                {showQr ? (
                  <QrFace theme={c.theme} payload={c.qr} image={c.qrImage} />
                ) : (
                  <Card card={c} stamp={stamp} marquee={t.card.marquee} onAction={() => setSheetOpen(true)} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav theme={theme} />

      {sheetOpen && (
        <div className={s.backdrop} onClick={() => setSheetOpen(false)}>
          <div className={s.sheet} onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t.wallet.actions}>
            <p className={s.sheetNote}>{t.wallet.sheetNote}</p>
            <button className={s.sheetBtn} onClick={onLock}>
              {t.wallet.lock}
            </button>
            <button className={s.sheetBtn} onClick={() => setSheetOpen(false)}>
              {t.wallet.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
