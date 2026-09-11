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

// Show a fixed 3-dot pager; screens beyond the app's real pages are decorative.
const PAGER_DOTS = 3;

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
  // Horizontal swipe pages: each card contributes the document screen, then a
  // separate QR screen (a sibling page, not a flip on the card's back).
  const [slideIndex, setSlideIndex] = useState(0);
  const screens = cards.flatMap((c) => [
    { kind: "card" as const, card: c },
    { kind: "qr" as const, card: c },
  ]);
  const theme: Theme = cards[Math.min(Math.floor(slideIndex / 2), cards.length - 1)].theme;

  const onScroll = () => {
    const el = scroller.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    const step = slide.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
    const i = Math.round(el.scrollLeft / step);
    if (i !== slideIndex && i >= 0 && i < screens.length) {
      setSlideIndex(i);
      onIndexChange(Math.floor(i / 2)); // keep the App's card/theme in sync
    }
  };

  const goTo = (i: number) =>
    scroller.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  return (
    <div className={`${s.wallet} ${theme === "olive" ? s.olive : s.sky}`}>
      <div className={s.top}>
        <button className={s.notify}>
          {t.wallet.notifications} <BellIcon />
        </button>
      </div>

      <div className={s.center}>
        <div ref={scroller} className={s.scroller} onScroll={onScroll}>
          {screens.map((sc, i) => (
            <div key={i} className={s.slide}>
              {sc.kind === "card" ? (
                <Card
                  card={sc.card}
                  stamp={stamp}
                  marquee={t.card.marquee}
                  onAction={() => setSheetOpen(true)}
                />
              ) : (
                <QrFace theme={sc.card.theme} payload={sc.card.qr} image={sc.card.qrImage} />
              )}
            </div>
          ))}
        </div>

        {screens.length > 1 && (
          <div className={s.pager} role="tablist" aria-label={t.wallet.cards}>
            {Array.from({ length: PAGER_DOTS }, (_, i) => {
              const sc = screens[i];
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === slideIndex}
                  aria-hidden={sc ? undefined : true}
                  aria-label={sc ? (sc.kind === "qr" ? t.wallet.showQr(sc.card.title) : sc.card.title) : undefined}
                  className={`${s.pip} ${i === slideIndex ? s.pipActive : ""}`}
                  onClick={() => sc && goTo(i)}
                />
              );
            })}
          </div>
        )}
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
