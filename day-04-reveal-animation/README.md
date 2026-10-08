# martion — Reveal

A minimal React + Vite app containing only the reveal animation and the final hero section.

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/Reveal.tsx` — the full animation timeline (blank white open → "martion" rises → image sequence inside the word → last image expands to full-screen hero).
- `src/styles.css` — all styling and transitions.
- `public/` — the four photos used in the sequence (`flowers`, `horses`, `sheep`, `landscape-hero`).

Timing lives in the `useEffect` in `Reveal.tsx`; image order is the `IMAGES` array at the top of the file.
