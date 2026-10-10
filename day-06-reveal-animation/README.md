# Martion — Circular Reveal

A single-page intro animation: a blue screen with "martion", two curved marks that slide in, turn once, and fly out diagonally while a circle grows to reveal the hero image, ending on a bold "MARTION" title.

Built with React 19, TanStack Start and Vite. The animation is pure CSS (`src/styles.css`).

## Requirements
Node.js 20+ and npm.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build
```bash
npm run build
npm run preview  # preview the production build
```

## Structure
- `src/routes/index.tsx` — page markup and logo marks (inline SVG)
- `src/routes/__root.tsx` — HTML shell, fonts
- `src/styles.css` — all animation styles
- `src/assets/hero.jpg` — hero image
