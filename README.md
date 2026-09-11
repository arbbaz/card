# card

A mobile wallet-style card UI built with Next.js. It's a design demo, and every name, date and number in it is fictional sample data.

## Screens

- **Passcode**: a 4-digit keypad with dot indicators, a Face ID button and a delete key. Any 4 digits unlock it, and the physical keyboard works too.
- **Card carousel**: swipeable cards with scroll snapping and pagination dots. The background crossfades between two themes as you swipe:
  - **Sky**: a frosted, translucent card on a gradient background with a black tab bar.
  - **Olive**: a flat card with a brown scrolling strip, an orange action button and a floating pill navigation bar.
- **Action sheet**: opened from the card's action button, with a "Lock app" option that returns to the passcode screen in the current theme.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The layout targets phone width and is centred in a 430px column on desktop.

## Structure

```
src/components/
  App.tsx        lock state + themed backgrounds
  PinScreen.tsx  passcode keypad
  Wallet.tsx     carousel, pager, notifications pill, action sheet
  Card.tsx       card layout + scrolling strip
  BottomNav.tsx  tab bar (pill or solid, per theme)
  data.ts        sample card data
  icons.tsx      inline SVG icons
```
