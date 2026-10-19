import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { EASE, EASE_OUT, STAR_CLIP, STAR_PATH, STORAGE_KEY, T } from "./timeline";

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <path fill="currentColor" d={STAR_PATH} />
  </svg>
);

/** Text that slides out of an overflow-hidden mask. */
function Mask({ children, delay, from = "110%", axis = "y", className = "", animate }: {
  children: ReactNode; delay: number; from?: string; axis?: "x" | "y"; className?: string; animate: boolean;
}) {
  return (
    <span className={`sr-mask ${className}`}>
      <motion.span
        initial={animate ? { [axis]: from } : false}
        animate={{ [axis]: "0%" }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const KANA = "プラナフ・ヴェルマ";

const clear = (dir: 1 | -1) => ({
  animate: { x: [0, 0, `${dir * 30}vw`], opacity: [1, 1, 0], filter: ["blur(0px)", "blur(0px)", "blur(8px)"] },
  transition: { duration: 1.05, times: [0, 0.15, 1], ease: EASE, delay: T.clearTitle },
});

/** The finished hero, revealed by the star wipe. */
function HeroContent({ a }: { a: boolean }) {
  return (
    <section
      className="flex h-svh flex-col items-center justify-center gap-[3vh] overflow-hidden bg-blaze px-4"
      aria-label="Pranav Verma — video editor"
    >
      <div className="pointer-events-none flex flex-col items-center text-center">
        <h1 className="font-display text-[clamp(4rem,23vw,16rem)] leading-[0.82] tracking-[-0.02em] text-sun">
          <Mask animate={a} delay={T.name} axis="x" from="100%">PRANAV</Mask>
        </h1>
        <p className="mt-[1.6vh] font-jp text-[clamp(0.9rem,2.2vw,1.5rem)] tracking-[0.35em] text-foreground">
          {KANA.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={a ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT, delay: a ? T.kana + i * 0.05 : 0 }}
            >
              {c}
            </motion.span>
          ))}
        </p>
      </div>
      <motion.div
        className="w-[min(58vw,36vh)] shrink-0 text-sun"
        initial={a ? { scale: 1.08, rotate: -8, opacity: 0 } : false}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: a ? T.reveal : 0 }}
      >
        <Star className="h-full w-full" />
      </motion.div>
    </section>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  // Decide once on mount: play on first visit this session, unless reduced motion.
  const [play, setPlay] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    const p = !seen && !reduced;
    setPlay(p);
    if (!p) return;
    const root = document.documentElement;
    root.classList.add("sr-lock");
    const id = window.setTimeout(() => {
      root.classList.remove("sr-lock");
      setPlay(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, T.done * 1000);
    return () => { window.clearTimeout(id); root.classList.remove("sr-lock"); };
  }, [reduced]);

  const span = T.starCovered - T.smallStar;

  return (
    <div className="sr-root">
      {/* Before mount decides, show only the ink screen (no flash of final state). */}
      {play !== null && (
        <motion.div
          className="sr-content"
          initial={play ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: play ? T.starCovered : 0 }}
        >
          <HeroContent a={play} />
        </motion.div>
      )}

      {play && (
        <motion.div
          className="sr-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: T.starCovered }}
        >
          <span className="sr-sr-only">PRANAV VERMA {KANA}</span>
          <motion.div
            className="sr-band"
            aria-hidden
            initial={{ height: 0 }}
            animate={{ height: "46vh" }}
            transition={{ duration: 1.05, ease: EASE_OUT, delay: T.band }}
          >
            <div className="sr-title">
              <motion.span {...clear(-1)}>
                <Mask animate delay={T.word1} className="sr-pad">PRANAV</Mask>
              </motion.span>
              <motion.span {...clear(1)}>
                <Mask animate delay={T.word2} from="-110%" className="sr-pad">VERMA</Mask>
              </motion.span>
            </div>
          </motion.div>

          {/* Small star pops in, then the same shape grows past the viewport edges. */}
          <div className="sr-star-wrap" aria-hidden>
            <motion.div
              className="sr-star"
              style={{ clipPath: STAR_CLIP }}
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: [0, 0.07, 0.07, 3.5, 3.5], rotate: [-120, 0, 0, 24, 24] }}
              transition={{
                duration: span,
                delay: T.smallStar,
                times: [0, 0.8 / span, (T.starZoom - T.smallStar) / span, 0.9, 1],
                ease: [EASE_OUT, "linear", EASE, "linear"],
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
