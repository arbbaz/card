"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { getDict, type Locale } from "../i18n";
import type { SampleCard } from "./data";
import { loadConfig, makeDefaultConfig, PIN_LENGTH, resetConfig, saveConfig, type Config } from "./store";
import s from "../app/admin/admin.module.css";

// Downscale an uploaded image and return a compact JPEG data URL, so portraits
// stay small enough to live in localStorage.
function fileToDataUrl(file: File, max = 480): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load image"));
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Stable no-op subscription: flips false (server) -> true (after hydration)
// without a setState-in-effect, so the browser-only form renders post-mount.
const noopSubscribe = () => () => {};

export function AdminPanel({ locale }: { locale: Locale }) {
  const t = getDict(locale).admin;
  const other = getDict(locale).otherLocale;
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [config, setConfig] = useState<Config>(() => loadConfig(locale));
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  // Immutably update one card by index.
  const patchCard = (i: number, patch: Partial<SampleCard>) =>
    setConfig((c) => ({
      ...c,
      cards: c.cards.map((card, j) => (j === i ? { ...card, ...patch } : card)),
    }));

  const setPasscode = (v: string) =>
    setConfig((c) => ({ ...c, passcode: v.replace(/\D/g, "").slice(0, PIN_LENGTH) }));

  const onPhoto = async (i: number, file: File | undefined) => {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      patchCard(i, { photo: url });
      flash(t.toastPhoto);
    } catch {
      flash(t.toastPhotoErr);
    }
  };

  const onQr = async (i: number, file: File | undefined) => {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file, 600);
      patchCard(i, { qrImage: url });
      flash(t.toastPhoto);
    } catch {
      flash(t.toastPhotoErr);
    }
  };

  const save = () => {
    if (config.passcode !== "" && config.passcode.length !== PIN_LENGTH) {
      flash(t.toastPasscodeLen(PIN_LENGTH));
      return;
    }
    try {
      saveConfig(locale, config);
      flash(t.toastSaved);
    } catch {
      flash(t.toastSaveErr);
    }
  };

  const reset = () => {
    resetConfig(locale);
    setConfig(makeDefaultConfig(locale));
    flash(t.toastReset);
  };

  if (!hydrated) return <main className={s.page} />;

  return (
    <main className={s.page}>
      <header className={s.header}>
        <div>
          <h1 className={s.h1}>{t.title}</h1>
          <p className={s.sub}>{t.sub}</p>
        </div>
        <div className={s.headerLinks}>
          <Link href={other.href("admin")} className={s.langLink}>
            {other.label}
          </Link>
          <Link href={locale === "en" ? "/en" : "/"} className={s.link}>
            {t.back}
          </Link>
        </div>
      </header>

      {/* Passcode */}
      <section className={s.card}>
        <h2 className={s.h2}>{t.passcodeHeading}</h2>
        <p className={s.hint}>{t.passcodeHint(PIN_LENGTH)}</p>
        <input
          className={s.input}
          inputMode="numeric"
          autoComplete="off"
          placeholder={t.passcodePlaceholder(PIN_LENGTH)}
          value={config.passcode}
          onChange={(e) => setPasscode(e.target.value)}
          aria-label={t.passcodeLabel}
        />
      </section>

      {/* Cards */}
      {config.cards.map((card, i) => (
        <section key={card.id} className={s.card}>
          <h2 className={s.h2}>{t.cardN(i + 1)}</h2>

          <div className={s.grid}>
            <label className={s.field}>
              <span>{t.fieldTitle}</span>
              <input
                className={s.input}
                value={card.title}
                onChange={(e) => patchCard(i, { title: e.target.value })}
              />
            </label>

            <label className={s.field}>
              <span>{t.nameLabel}</span>
              <textarea
                className={s.input}
                rows={3}
                value={card.name.join("\n")}
                onChange={(e) =>
                  patchCard(i, { name: e.target.value.split("\n").map((l) => l.trim()) })
                }
              />
            </label>
          </div>

          {/* Portrait */}
          <div className={s.photoRow}>
            <div className={s.preview}>
              {card.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL preview
                <img src={card.photo} alt="" />
              ) : (
                <span className={s.previewEmpty}>{t.noPhoto}</span>
              )}
            </div>
            <div className={s.photoActions}>
              <label className={s.fileBtn}>
                {t.upload}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onPhoto(i, e.target.files?.[0])}
                />
              </label>
              {card.photo && (
                <button className={s.ghost} onClick={() => patchCard(i, { photo: undefined })}>
                  {t.remove}
                </button>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className={s.fieldsBlock}>
            <div className={s.fieldsHead}>
              <span>{t.detailFields}</span>
            </div>
            {card.fields.map((f, fi) => (
              <div key={fi} className={s.fieldRow}>
                <input
                  className={s.input}
                  value={f.label}
                  placeholder={t.labelPlaceholder}
                  onChange={(e) =>
                    patchCard(i, {
                      fields: card.fields.map((x, j) =>
                        j === fi ? { ...x, label: e.target.value } : x,
                      ),
                    })
                  }
                />
                <input
                  className={s.input}
                  value={f.value}
                  placeholder={t.valuePlaceholder}
                  onChange={(e) =>
                    patchCard(i, {
                      fields: card.fields.map((x, j) =>
                        j === fi ? { ...x, value: e.target.value } : x,
                      ),
                    })
                  }
                />
                <button
                  className={s.remove}
                  aria-label={t.removeField}
                  onClick={() =>
                    patchCard(i, { fields: card.fields.filter((_, j) => j !== fi) })
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* QR */}
          <label className={s.field}>
            <span>{t.qrContents}</span>
            <textarea
              className={s.input}
              rows={2}
              value={card.qr}
              onChange={(e) => patchCard(i, { qr: e.target.value })}
            />
          </label>

          {/* Upload a QR image (shown instead of the generated one) */}
          <div className={s.photoRow}>
            <div className={s.preview}>
              {card.qrImage ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL preview
                <img src={card.qrImage} alt="" />
              ) : (
                <span className={s.previewEmpty}>{t.noQr}</span>
              )}
            </div>
            <div className={s.photoActions}>
              <label className={s.fileBtn}>
                {t.uploadQr}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onQr(i, e.target.files?.[0])}
                />
              </label>
              {card.qrImage && (
                <button className={s.ghost} onClick={() => patchCard(i, { qrImage: undefined })}>
                  {t.remove}
                </button>
              )}
            </div>
          </div>
        </section>
      ))}

      <div className={s.actions}>
        <button className={s.primary} onClick={save}>
          {t.save}
        </button>
        <button className={s.ghost} onClick={reset}>
          {t.reset}
        </button>
      </div>

      {toast && (
        <div className={s.toast} role="status">
          {toast}
        </div>
      )}
    </main>
  );
}
