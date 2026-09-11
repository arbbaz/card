"use client";

import { useRef, useState } from "react";
import { BottomNav } from "./BottomNav";
import { Card } from "./Card";
import { cards, type Theme } from "./data";
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
  const scroller = useRef<HTMLDivElement>(null);
  const [stamp] = useState(() => formatStamp(new Date()));
  const [sheetOpen, setSheetOpen] = useState(false);
  // Tapping a card flips it to its QR view; only one card shows QR at a time.
  const [qrFor, setQrFor] = useState<string | null>(null);
  const theme: Theme = cards[index].theme;

  const onScroll = () => {
    const el = scroller.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    const step = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const i = Math.round(el.scrollLeft / step);
    if (i !== index && i >= 0 && i < cards.length) onIndexChange(i);
  };

  const goTo = (i: number) =>
    scroller.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  return (
    <div className={`${s.wallet} ${theme === "olive" ? s.olive : s.sky}`}>
      <div className={s.top}>
        <button className={s.notify}>
          Notifications <BellIcon />
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
                aria-label={showQr ? `Back to ${c.title}` : `Show ${c.title} QR code`}
                onClick={toggle}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
              >
                {showQr ? (
                  <QrFace theme={c.theme} />
                ) : (
                  <Card card={c} stamp={stamp} onAction={() => setSheetOpen(true)} />
                )}
              </div>
            );
          })}
        </div>

        <div className={s.pager} role="tablist" aria-label="Cards">
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
      </div>

      <BottomNav theme={theme} />

      {sheetOpen && (
        <div className={s.backdrop} onClick={() => setSheetOpen(false)}>
          <div className={s.sheet} onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Card actions">
            <p className={s.sheetNote}>This is a design demo. All card data is fictional sample data.</p>
            <button className={s.sheetBtn} onClick={onLock}>
              Lock app
            </button>
            <button className={s.sheetBtn} onClick={() => setSheetOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
