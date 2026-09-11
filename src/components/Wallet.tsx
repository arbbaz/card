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
  index,
  onIndexChange,
  onLock,
}: {
  index: number;
  onIndexChange: (i: number) => void;
  onLock: () => void;
}) {
  const { cards } = useConfig();
  const t = useT();
  const scroller = useRef<HTMLDivElement>(null);
  const [stamp] = useState(() => formatStamp(new Date()));
  const [sheetOpen, setSheetOpen] = useState(false);
  // Tapping a card opens its QR on a separate screen (not a card-back flip).
  const [qrFor, setQrFor] = useState<string | null>(null);
  const theme: Theme = cards[index].theme;
  const openCard = qrFor ? cards.find((c) => c.id === qrFor) ?? null : null;

  const onScroll = () => {
    const el = scroller.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    // Each slide is a full-width page (column gap may be "normal"/NaN now).
    const step = slide.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
    const i = Math.round(el.scrollLeft / step);
    if (i !== index && i >= 0 && i < cards.length) onIndexChange(i);
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
        {openCard ? (
          // Separate QR screen — replaces the card view, not a flip on its back.
          <div
            className={s.qrScreen}
            role="button"
            tabIndex={0}
            aria-label={t.wallet.backTo(openCard.title)}
            onClick={() => setQrFor(null)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setQrFor(null))}
          >
            <QrFace theme={openCard.theme} payload={openCard.qr} />
          </div>
        ) : (
          <>
            <div ref={scroller} className={s.scroller} onScroll={onScroll}>
              {cards.map((c) => (
                <div
                  key={c.id}
                  className={s.slide}
                  role="button"
                  tabIndex={0}
                  aria-label={t.wallet.showQr(c.title)}
                  onClick={() => setQrFor(c.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setQrFor(c.id))}
                >
                  <Card card={c} stamp={stamp} marquee={t.card.marquee} onAction={() => setSheetOpen(true)} />
                </div>
              ))}
            </div>

            {cards.length > 1 && (
              <div className={s.pager} role="tablist" aria-label={t.wallet.cards}>
                {cards.map((c, i) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={c.title}
                    className={`${s.pip} ${i === index ? s.pipActive : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </>
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
