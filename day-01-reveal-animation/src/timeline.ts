// Reveal timeline (seconds): band opens -> title settles -> words clear away
// -> the center star expands beyond the viewport -> the content is revealed.
export const EASE = [0.65, 0, 0.2, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const T = {
  band: 0.2,
  smallStar: 0.75,
  word1: 0.95,
  word2: 1.35,
  clearTitle: 2.65,
  starZoom: 3.05,
  starCovered: 4.75,
  reveal: 4.9,
  person: 4.95,
  name: 5.15,
  kana: 5.45,
  details: 5.75,
  done: 6.3,
} as const;

export const STAR_PATH =
  "M50 2l14.7 30.6 33.3 4.4-24.4 23.2 6.1 33L50 77.2 20.3 93.2l6.1-33L2 37l33.3-4.4z";
export const STAR_CLIP =
  "polygon(50% 2%, 64.7% 32.6%, 98% 37%, 73.6% 60.2%, 79.7% 93.2%, 50% 77.2%, 20.3% 93.2%, 26.4% 60.2%, 2% 37%, 35.3% 32.6%)";

export const STORAGE_KEY = "intro-played";
