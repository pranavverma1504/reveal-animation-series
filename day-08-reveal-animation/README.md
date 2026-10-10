# MARTION

Requires Node.js 22.12+ (or Node.js 24 LTS) and npm.

```sh
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

Production:
```sh
npm run build
npm start
```
The production server normally runs at http://localhost:3000.

The supplied GSAP animation is preserved: nine tiles, seven alternating vertical reels spelling MARTION, original shutters, clip paths, easing, timings, and wordmark handoff. The title destination lives in MartionHero. Reload to replay; reduced-motion preferences skip the introduction.

This is TanStack Start + React + TypeScript, not Next.js: the editing workspace requires TanStack routing. Next image/font helpers were replaced by native image delivery and the same locally bundled Bebas Neue font. No credentials, hosted image service, or environment variables are required.

All eight supplied replacement images are included in public/images/loader. Bebas Neue is included in public/fonts; its SIL Open Font License accompanies it. Image rights remain with their respective owners.

The wordmark uses seven columns and 7.07ch instead of five and 5.05ch. Loader font sizes are scaled by 5/7 to keep the seven letters inside the original center tile. The original 0.05/0.065-second reel staggers remain; two additional reels extend the reel cascade by two stagger intervals without changing any master-timeline cue or the six-second finish.
