// Shared card shape. The actual default (seed) values live per-locale in
// ../i18n.ts (defaultCards); user overrides are stored via store.ts. All values
// are fictional sample data for the demo.

export type Theme = "olive" | "sky";

export type SampleCard = {
  id: string;
  theme: Theme;
  title: string;
  status?: string;
  fields: { label: string; value: string }[];
  name: string[];
  // Text the QR code encodes (used to generate a QR when no image is uploaded).
  qr: string;
  // Optional uploaded QR image as a data URL. When set, it is shown instead of
  // the generated QR.
  qrImage?: string;
  // Optional portrait as a data URL. When absent, a placeholder is shown.
  photo?: string;
};
