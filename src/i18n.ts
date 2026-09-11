// Internationalization for the demo. Ukrainian ("uk") is the default and lives
// at the unprefixed routes ("/", "/admin"); English ("en") lives under "/en".
// All copy here is UI chrome plus the fictional default card data.

import type { SampleCard } from "./components/data";

export type Locale = "uk" | "en";
export const LOCALES: Locale[] = ["uk", "en"];
export const DEFAULT_LOCALE: Locale = "uk";

export type Dict = {
  htmlLang: string;
  // The other locale, for the in-app language switch.
  otherLocale: { code: Locale; label: string; href: (path: "wallet" | "admin") => string };

  pin: {
    title: string;
    forgot: string;
    faceId: string;
    del: string;
    wrong: string;
    digits: (n: number, total: number) => string;
  };
  wallet: {
    notifications: string;
    cards: string;
    sheetNote: string;
    lock: string;
    close: string;
    actions: string;
    showQr: (title: string) => string;
    backTo: (title: string) => string;
  };
  card: {
    marquee: (stamp: string) => string;
  };
  qr: {
    oliveCaption: string;
    refresh: (countdown: string) => string;
    qr: string;
    barcode: string;
    barcodeAlt: string;
  };
  nav: { olive: string[]; sky: string[] };
  admin: {
    title: string;
    sub: string;
    back: string;
    passcodeHeading: string;
    passcodeHint: (len: number) => string;
    passcodePlaceholder: (len: number) => string;
    passcodeLabel: string;
    cardN: (n: number) => string;
    fieldTitle: string;
    theme: string;
    themeSky: string;
    themeOlive: string;
    statusOptional: string;
    statusPlaceholder: string;
    nameLabel: string;
    noPhoto: string;
    upload: string;
    remove: string;
    detailFields: string;
    addField: string;
    labelPlaceholder: string;
    valuePlaceholder: string;
    removeField: string;
    qrContents: string;
    save: string;
    reset: string;
    toastSaved: string;
    toastReset: string;
    toastPhoto: string;
    toastPhotoErr: string;
    toastSaveErr: string;
    toastPasscodeLen: (len: number) => string;
  };
};

export const dictionaries: Record<Locale, Dict> = {
  uk: {
    htmlLang: "uk",
    otherLocale: {
      code: "en",
      label: "EN",
      href: (path) => (path === "admin" ? "/en/admin" : "/en"),
    },
    pin: {
      title: "Код для входу",
      forgot: "Не пам'ятаю код для входу",
      faceId: "Розблокувати за допомогою Face ID (демо)",
      del: "Видалити цифру",
      wrong: "Невірний код",
      digits: (n, total) => `Введено ${n} з ${total} цифр`,
    },
    wallet: {
      notifications: "Сповіщення",
      cards: "Картки",
      sheetNote: "Це демонстрація дизайну. Усі дані карток — вигаданий зразок.",
      lock: "Заблокувати застосунок",
      close: "Закрити",
      actions: "Дії з карткою",
      showQr: (title) => `Показати QR-код: ${title}`,
      backTo: (title) => `Назад до ${title}`,
    },
    card: {
      marquee: (stamp) => `Документ оновлено о ${stamp}`,
    },
    qr: {
      oliveCaption: "QR-код дійсний до 10 вересня 2027",
      refresh: (countdown) => `Код діятиме ще ${countdown} хв`,
      qr: "QR-код",
      barcode: "Штрихкод",
      barcodeAlt: "Штрихкод",
    },
    nav: {
      olive: ["Резерв ID", "Сервіси", "Вакансії", "Меню"],
      sky: ["Стрічка", "Документи", "Дія.AI", "Сервіси", "Меню"],
    },
    admin: {
      title: "Адмін",
      sub: "Зміни зберігаються лише в цьому браузері. Дані вигадані.",
      back: "← Назад до гаманця",
      passcodeHeading: "Пароль гаманця",
      passcodeHint: (len) =>
        `${len} цифри. Залиште порожнім, щоб будь-які ${len} цифри розблоковували (типово для демо).`,
      passcodePlaceholder: (len) => `Будь-які ${len} цифри`,
      passcodeLabel: "Пароль гаманця",
      cardN: (n) => `Картка ${n}`,
      fieldTitle: "Назва",
      theme: "Тема",
      themeSky: "Небо",
      themeOlive: "Оливка",
      statusOptional: "Статус (необов'язково)",
      statusPlaceholder: "напр. Активний учасник",
      nameLabel: "Ім'я (по рядку)",
      noPhoto: "Немає фото",
      upload: "Завантажити фото",
      remove: "Видалити",
      detailFields: "Поля деталей",
      addField: "+ Додати поле",
      labelPlaceholder: "Мітка",
      valuePlaceholder: "Значення",
      removeField: "Видалити поле",
      qrContents: "Вміст QR-коду",
      save: "Зберегти зміни",
      reset: "Скинути до типових",
      toastSaved: "Збережено ✓",
      toastReset: "Скинуто до типових",
      toastPhoto: "Фото оновлено — не забудьте зберегти",
      toastPhotoErr: "Не вдалося обробити це зображення",
      toastSaveErr: "Помилка збереження — зображення може бути завеликим",
      toastPasscodeLen: (len) => `Пароль має містити ${len} цифри (або бути порожнім)`,
    },
  },
  en: {
    htmlLang: "en",
    otherLocale: {
      code: "uk",
      label: "УК",
      href: (path) => (path === "admin" ? "/admin" : "/"),
    },
    pin: {
      title: "Access code",
      forgot: "I don't remember my code",
      faceId: "Unlock with Face ID (demo)",
      del: "Delete digit",
      wrong: "Wrong code",
      digits: (n, total) => `${n} of ${total} digits entered`,
    },
    wallet: {
      notifications: "Notifications",
      cards: "Cards",
      sheetNote: "This is a design demo. All card data is fictional sample data.",
      lock: "Lock app",
      close: "Close",
      actions: "Card actions",
      showQr: (title) => `Show ${title} QR code`,
      backTo: (title) => `Back to ${title}`,
    },
    card: {
      marquee: (stamp) => `Document updated at ${stamp}`,
    },
    qr: {
      oliveCaption: "QR code valid until 10 September 2027",
      refresh: (countdown) => `Code valid for another ${countdown} min`,
      qr: "QR code",
      barcode: "Barcode",
      barcodeAlt: "Barcode",
    },
    nav: {
      olive: ["Reserve ID", "Services", "Jobs", "Menu"],
      sky: ["Feed", "Documents", "Diia.AI", "Services", "Menu"],
    },
    admin: {
      title: "Admin",
      sub: "Changes are stored in this browser only. Demo data is fictional.",
      back: "← Back to wallet",
      passcodeHeading: "Wallet passcode",
      passcodeHint: (len) =>
        `${len} digits. Leave empty to let any ${len} digits unlock (demo default).`,
      passcodePlaceholder: (len) => `Any ${len} digits`,
      passcodeLabel: "Wallet passcode",
      cardN: (n) => `Card ${n}`,
      fieldTitle: "Title",
      theme: "Theme",
      themeSky: "Sky",
      themeOlive: "Olive",
      statusOptional: "Status (optional)",
      statusPlaceholder: "e.g. Active member",
      nameLabel: "Name (one line each)",
      noPhoto: "No photo",
      upload: "Upload picture",
      remove: "Remove",
      detailFields: "Detail fields",
      addField: "+ Add field",
      labelPlaceholder: "Label",
      valuePlaceholder: "Value",
      removeField: "Remove field",
      qrContents: "QR code contents",
      save: "Save changes",
      reset: "Reset to defaults",
      toastSaved: "Saved ✓",
      toastReset: "Reset to defaults",
      toastPhoto: "Picture updated — remember to Save",
      toastPhotoErr: "Could not process that image",
      toastSaveErr: "Save failed — image may be too large",
      toastPasscodeLen: (len) => `Passcode must be ${len} digits (or empty)`,
    },
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

// Localized default (seed) card data. Users can override this via /admin; the
// override is stored per-locale.
export const defaultCards: Record<Locale, SampleCard[]> = {
  uk: [
    {
      id: "member",
      theme: "sky",
      title: "Паспорт громадянина України",
      fields: [
        { label: "Дата народження:", value: "21.07.1999" },
        { label: "Номер:", value: "011733144" },
      ],
      name: ["ТАМЛІАНІ", "ДМИТРО", "ГЕОРГІЙОВИЧ"],
      qr: "ДЕМО - Зразок даних. Не є документом і не дійсний для перевірки.",
    },
    {
      id: "pass",
      theme: "olive",
      title: "Резерв ID",
      status: "Військовозобов'язаний",
      fields: [{ label: "Дата народження:", value: "21.07.1999" }],
      name: ["ТАМЛІАНІ", "ДМИТРО", "ГЕОРГІЙОВИЧ"],
      qr: "ДЕМО - Зразок даних. Не є документом і не дійсний для перевірки.",
    },
  ],
  en: [
    {
      id: "member",
      theme: "sky",
      title: "Passport of a citizen of Ukraine",
      fields: [
        { label: "Date of birth:", value: "21.07.1999" },
        { label: "Number:", value: "011733144" },
      ],
      name: ["TAMLIANI", "DMYTRO", "HEORHIIOVYCH"],
      qr: "DEMO - Sample data. Not a document and not valid for any verification.",
    },
    {
      id: "pass",
      theme: "olive",
      title: "Reserve ID",
      status: "Liable for military service",
      fields: [{ label: "Date of birth:", value: "21.07.1999" }],
      name: ["TAMLIANI", "DMYTRO", "HEORHIIOVYCH"],
      qr: "DEMO - Sample data. Not a document and not valid for any verification.",
    },
  ],
};
