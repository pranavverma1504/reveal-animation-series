# MARTIONDEV

A single-page intro: `MARTIONDEV` scrambles and resolves, then the hero image opens from a thin slit through the word's centerline and expands up and down to full screen.

Built with React 19, TanStack Start and Vite. Requires Node.js 20+.

Install dependencies:

```bash
npm install
```

Run locally (http://localhost:3000):

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

- Animation: `src/routes/index.tsx` (scramble) and `src/styles.css` (reveal).
- Hero image: `src/assets/hero.jpg`.
- Font: `public/fonts/anton.woff2` (Anton, SIL OFL).
