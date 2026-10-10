import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import styles from "./MartionLoader.module.css";


const image1 = { url: "/images/loader/grid-01-updated.jpg" };
const image2 = { url: "/images/loader/grid-02.jpg" };
const image3 = { url: "/images/loader/grid-03.jpg" };
const image4 = { url: "/images/loader/grid-04.jpg" };
const image5 = { url: "/images/loader/grid-05-updated.jpg" };
const image6 = { url: "/images/loader/grid-06-new.jpg" };
const image7 = { url: "/images/loader/grid-07.jpg" };
const image8 = { url: "/images/loader/grid-08.jpg" };

type GridTile = {
  id: string;
  image: string;
  position: string;
  fit: "cover" | "contain";
  mediaScale: number;
  background: string;
  title?: true;
};

const GRID_TILES: GridTile[] = [
  { id: "upper-left", image: image1.url, position: "50% 34%", fit: "contain", mediaScale: 1.18, background: "var(--martion-tile-1)" },
  { id: "upper-center", image: image2.url, position: "50% 54%", fit: "cover", mediaScale: 1, background: "var(--martion-tile-2)" },
  { id: "upper-right", image: image3.url, position: "50% 46%", fit: "contain", mediaScale: 1.16, background: "var(--martion-tile-3)" },
  { id: "middle-left", image: image4.url, position: "50% 44%", fit: "cover", mediaScale: 1, background: "var(--martion-tile-4)" },
  { id: "center", image: "", position: "50% 50%", fit: "cover", mediaScale: 1, background: "var(--martion-red)", title: true },
  { id: "middle-right", image: image5.url, position: "50% 32%", fit: "cover", mediaScale: 1, background: "var(--martion-tile-5)" },
  { id: "lower-left", image: image6.url, position: "50% 42%", fit: "contain", mediaScale: 1.18, background: "var(--martion-tile-6)" },
  { id: "lower-center", image: image7.url, position: "50% 58%", fit: "cover", mediaScale: 1, background: "var(--martion-tile-7)" },
  { id: "lower-right", image: image8.url, position: "50% 50%", fit: "cover", mediaScale: 1, background: "var(--martion-tile-8)" },
];

const TILE = {
  TL: 0,
  TC: 1,
  TR: 2,
  ML: 3,
  C: 4,
  MR: 5,
  BL: 6,
  BC: 7,
  BR: 8,
} as const;

const PERIMETER_REVEAL_STAGES = [
  { tiles: [TILE.BL], at: 0.65, exitClip: "inset(0 100% 0 0)" },
  { tiles: [TILE.TL, TILE.ML], at: 0.78, exitClip: "inset(0 100% 0 0)" },
  { tiles: [TILE.TC], at: 0.91, exitClip: "inset(100% 0 0 0)" },
  { tiles: [TILE.TR], at: 1.04, exitClip: "inset(100% 0 0 0)" },
  { tiles: [TILE.MR], at: 1.17, exitClip: "inset(0 0 0 100%)" },
  { tiles: [TILE.BR], at: 1.3, exitClip: "inset(0 0 100% 0)" },
  { tiles: [TILE.BC], at: 1.43, exitClip: "inset(0 0 100% 0)" },
] as const;

const RED_CROSS = [TILE.TC, TILE.ML, TILE.MR, TILE.BC] as const;
const CORNER_CLOSE_ORDER = [TILE.BR, TILE.TR, TILE.TL, TILE.BL] as const;
const OUTER_CLEAR_STAGES = [
  [TILE.TL, TILE.TR, TILE.BL, TILE.BR],
  [TILE.TC, TILE.ML, TILE.MR, TILE.BC],
] as const;
const MARTION_REELS = [
  { direction: "down", glyphs: ["M", "K", "F", "T", "J"] },
  { direction: "up", glyphs: ["M", "E", "R", "P", "A"] },
  { direction: "down", glyphs: ["R", "Q", "X", "S", "V"] },
  { direction: "up", glyphs: ["H", "U", "D", "L", "T"] },
  { direction: "down", glyphs: ["I", "C", "Y", "G", "B"] },
  { direction: "up", glyphs: ["H", "U", "D", "L", "O"] },
  { direction: "down", glyphs: ["N", "K", "F", "T", "J"] },
] as const;
const REVEAL_CLIPS = [
  "inset(0 100% 0 0)",
  "inset(100% 0 0 0)",
  "inset(0 0 100% 0)",
  "inset(0 0 0 100%)",
  "inset(50% 50% 50% 50%)",
  "inset(0 100% 0 0)",
  "inset(100% 0 0 0)",
  "inset(0 0 100% 0)",
  "inset(0 0 0 100%)",
];
const CLEAR_OFFSETS = [
  [-20, -18],
  [0, -24],
  [22, -16],
  [-24, 0],
  [0, 0],
  [24, 0],
  [-18, 20],
  [0, 24],
  [20, 18],
] as const;

export function MartionLoader() {
  const loaderRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const artworkRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shutterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const reelTrackRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const centerBackdropRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const grid = gridRef.current;
    const tiles = tileRefs.current.filter(
      (tile): tile is HTMLDivElement => tile !== null,
    );
    const shutters = shutterRefs.current.filter(
      (shutter): shutter is HTMLDivElement => shutter !== null,
    );
    const wordmark = wordmarkRef.current;
    const centerBackdrop = centerBackdropRef.current;
    const heroTitleDestination = document.querySelector<HTMLElement>(
      "[data-hero-title-destination]",
    );
    const reelTracks = reelTrackRefs.current.filter(
      (track): track is HTMLSpanElement => track !== null,
    );
    const artworkTiles = artworkRefs.current.filter(
      (artwork): artwork is HTMLDivElement => artwork !== null,
    );

    if (
      !loader ||
      !grid ||
      !wordmark ||
      !centerBackdrop ||
      !heroTitleDestination ||
      reelTracks.length !== MARTION_REELS.length ||
      tiles.length !== GRID_TILES.length ||
      shutters.length !== GRID_TILES.length ||
      artworkTiles.length !== GRID_TILES.length - 1
    ) {
      return;
    }

    const centerShutter = shutterRefs.current[TILE.C];
    const centerTile = tiles[TILE.C];
    if (!centerShutter || !centerTile) return;

    const wordmarkParent = wordmark.parentElement;

    const shuttersFor = (indices: readonly number[]) =>
      indices
        .map((index) => shutterRefs.current[index])
        .filter((shutter): shutter is HTMLDivElement => shutter !== null);

    const placeWordmarkInHero = () => {
      heroTitleDestination.appendChild(wordmark);
      gsap.set(wordmark, { clearProps: "all" });
      gsap.set(reelTracks, {
        autoAlpha: 1,
        yPercent: (index) =>
          MARTION_REELS[index]?.direction === "down" ? 0 : -80,
      });
    };

    const prepareTitleHandoff = () => {
      const sourceBounds = wordmark.getBoundingClientRect();
      const sourceColor = window.getComputedStyle(wordmark).color;

      heroTitleDestination.appendChild(wordmark);

      const targetBounds = wordmark.getBoundingClientRect();
      const sourceCenterX = sourceBounds.left + sourceBounds.width / 2;
      const sourceCenterY = sourceBounds.top + sourceBounds.height / 2;
      const targetCenterX = targetBounds.left + targetBounds.width / 2;
      const targetCenterY = targetBounds.top + targetBounds.height / 2;

      gsap.set(wordmark, {
        color: sourceColor,
        transformOrigin: "50% 50%",
        x: sourceCenterX - targetCenterX,
        y: sourceCenterY - targetCenterY,
        scaleX: sourceBounds.width / targetBounds.width,
        scaleY: sourceBounds.height / targetBounds.height,
        willChange: "transform",
      });
    };

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        placeWordmarkInHero();
        gsap.set(loader, { autoAlpha: 0, pointerEvents: "none" });
        return;
      }

      const masterTimeline = gsap.timeline({
        onComplete: () => {
          gsap.set(loader, { autoAlpha: 0, pointerEvents: "none" });
          gsap.set(tiles, { willChange: "auto" });
        },
      });

      masterTimeline
        .set(loader, { autoAlpha: 1, pointerEvents: "auto" })
        .set(tiles, { willChange: "transform, clip-path, opacity" })
        .set(artworkTiles, {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          xPercent: 0,
          yPercent: 0,
        })
        .set(shutters, { clipPath: "inset(0% 0% 0% 0%)" })
        .set(centerBackdrop, { clipPath: "inset(0% 100% 0% 0%)" })
        .set(wordmark, {
          scaleX: 1,
          scaleY: 1,
        })
        .set(reelTracks, {
          autoAlpha: 0,
          yPercent: (index) =>
            MARTION_REELS[index]?.direction === "down" ? -80 : 0,
        });

      PERIMETER_REVEAL_STAGES.forEach((stage) => {
        masterTimeline.to(
          shuttersFor(stage.tiles),
          {
            clipPath: stage.exitClip,
            duration: 0.52,
            ease: "power2.inOut",
          },
          stage.at,
        );
      });

      masterTimeline
        .to(
          centerBackdrop,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          1.96,
        )
        .to(
          centerShutter,
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          1.96,
        )
        .to(
          reelTracks,
          {
            autoAlpha: 1,
            duration: 0.16,
            ease: "power2.inOut",
            stagger: 0.05,
          },
          2.05,
        )
        .to(
          reelTracks,
          {
            yPercent: (index) =>
              MARTION_REELS[index]?.direction === "down" ? 0 : -80,
            duration: 1.02,
            ease: "power3.out",
            stagger: 0.065,
          },
          2.08,
        );

      masterTimeline.to(
        shuttersFor(RED_CROSS),
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.44,
          ease: "power2.inOut",
        },
        3.86,
      );

      CORNER_CLOSE_ORDER.forEach((tileIndex, orderIndex) => {
        const shutter = shutterRefs.current[tileIndex];

        if (!shutter) {
          return;
        }

        masterTimeline.to(
          shutter,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.34,
            ease: "power2.inOut",
          },
          4.22 + orderIndex * 0.12,
        );
      });

      masterTimeline.set([loader, grid], { backgroundColor: "transparent" }, 4.92);

      OUTER_CLEAR_STAGES.forEach((stage, stageIndex) => {
        stage.forEach((tileIndex, tileOrder) => {
          const tile = tileRefs.current[tileIndex];
          const exitClip = REVEAL_CLIPS[tileIndex];
          if (!exitClip) return;
          const offset = CLEAR_OFFSETS[tileIndex];
          if (!offset) return;
          const [xPercent, yPercent] = offset;

          if (!tile) {
            return;
          }

          masterTimeline.to(
            tile,
            {
              autoAlpha: 0,
              clipPath: exitClip,
              duration: 0.72,
              ease: "power3.inOut",
              scale: 0.96,
              xPercent,
              yPercent,
            },
            4.94 + stageIndex * 0.12 + tileOrder * 0.025,
          );
        });
      });

      masterTimeline
        .add(prepareTitleHandoff, 4.94)
        .to(
          centerTile,
          {
            autoAlpha: 0,
            clipPath: "inset(50% 50% 50% 50%)",
            duration: 0.7,
            ease: "power3.inOut",
            scale: 0.97,
          },
          5,
        )
        .to(
          wordmark,
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            color: "var(--martion-paper)",
            duration: 1.02,
            ease: "power3.inOut",
          },
          4.94,
        )
        .add(placeWordmarkInHero, 5.96);

      masterTimeline.set(
        loader,
        { autoAlpha: 0, pointerEvents: "none" },
        6,
      );
    }, loader);

    return () => {
      context.revert();
      // Restore React-owned DOM before unmount or effect replay.
      wordmarkParent?.appendChild(wordmark);
    };
  }, []);

  return (
    <section
      aria-label="MARTION introduction"
      className={styles["loader"]}
      data-martion-layer="loader"
      ref={loaderRef}
    >
      <div className={styles["grid"]} data-martion-loader-grid ref={gridRef}>
        {GRID_TILES.map((tile, index) => (
          <div
            className={`${styles["tile"]} ${tile.title ? styles["centerTile"] : ""}`}
            data-grid-tile={tile.id}
            key={tile.id}
            ref={(node) => {
              tileRefs.current[index] = node;
            }}
          >
            {tile.title ? (
              <>
                <div
                  aria-hidden="true"
                  className={styles["centerBackdrop"]}
                  ref={centerBackdropRef}
                />
                <p
                  aria-label="MARTION"
                  className={styles["wordmark"]}
                  data-martion-wordmark
                  ref={wordmarkRef}
                >
                  {MARTION_REELS.map((reel, reelIndex) => (
                    <span
                      aria-hidden="true"
                      className={styles["reelColumn"]}
                      key={`${reel.direction}-${reelIndex}`}
                    >
                      <span
                        className={styles["reelTrack"]}
                        ref={(node) => {
                          reelTrackRefs.current[reelIndex] = node;
                        }}
                      >
                        {reel.glyphs.map((glyph, glyphIndex) => (
                          <span
                            className={styles["reelGlyph"]}
                            key={`${glyph}-${glyphIndex}`}
                          >
                            {glyph}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                </p>
              </>
            ) : (
              <div
                className={styles["artwork"]}
                ref={(node) => {
                  artworkRefs.current[index] = node;
                }}
                style={{ backgroundColor: tile.background }}
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className={styles["tileImage"]}
                  loading="eager"
                  sizes="34vw"
                  src={tile.image}
                  style={{
                    objectFit: tile.fit,
                    objectPosition: tile.position,
                    transform: `translate3d(0, 0, 0) scale(${tile.mediaScale})`,
                  }}
                />
              </div>
            )}
            <div
              aria-hidden="true"
              className={styles["shutter"]}
              ref={(node) => {
                shutterRefs.current[index] = node;
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
