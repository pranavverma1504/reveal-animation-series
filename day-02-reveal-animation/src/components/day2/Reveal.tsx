import { motion } from "framer-motion";
import type { Insets } from "./geometry";

const ease = [0.76, 0, 0.24, 1] as const;

type Props = { phase: number; closed: Insets; frame: Insets };

/** Choreographed intro: grid → words → red panel → expand → hand-off to hero frame. */
export function Reveal({ phase, closed, frame }: Props) {
  const g = phase >= 3 ? frame : closed;
  const [t, r, b, l] = g;
  const move = { duration: 1.1, ease };
  const lineFade = phase >= 4 ? 0 : 1;

  const hLine = (top: number, delay: number) => (
    <motion.div
      className="absolute left-0 right-0 h-px origin-left bg-grid"
      initial={{ scaleX: 0, top: `${top}%` }}
      animate={{ scaleX: phase >= 0 ? 1 : 0, top: `${top}%`, opacity: lineFade }}
      transition={{ scaleX: { duration: 0.9, ease, delay }, top: move, opacity: { duration: 0.5 } }}
    />
  );
  const vLine = (left: number, delay: number) => (
    <motion.div
      className="absolute top-0 bottom-0 w-px origin-top bg-grid"
      initial={{ scaleY: 0, left: `${left}%` }}
      animate={{ scaleY: phase >= 0 ? 1 : 0, left: `${left}%`, opacity: lineFade }}
      transition={{ scaleY: { duration: 0.9, ease, delay }, left: move, opacity: { duration: 0.5 } }}
    />
  );

  const word = (text: string, cls: string, delay: number, out: { x?: number; y?: number }) => (
    <motion.div
      className={`absolute overflow-hidden ${cls}`}
      animate={phase >= 3 ? { opacity: 0, ...out } : { opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: phase >= 1 ? "0%" : "110%" }}
        transition={{ duration: 0.8, ease, delay: phase >= 1 ? delay : 0 }}
      >
        {text}
      </motion.span>
    </motion.div>
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-background"
        animate={{ opacity: phase >= 4 ? 0 : 1 }}
        transition={{ duration: 0.01 }}
      />
      {hLine(t, 0)}
      {hLine(100 - b, 0.12)}
      {vLine(l, 0.06)}
      {vLine(100 - r, 0.18)}

      <motion.div
        className="absolute"
        initial={{ top: `${t}%`, right: `${r}%`, bottom: `${b}%`, left: `${l}%` }}
        animate={{ top: `${t}%`, right: `${r}%`, bottom: `${b}%`, left: `${l}%` }}
        transition={move}
      >
        {/* surrounding typography */}
        {word("CREATE.", "bottom-full right-full mb-1 mr-1 font-display text-lg md:text-2xl text-brand leading-none", 0, { x: -60 })}
        {word("INSPIRE.", "bottom-full left-full mb-1 ml-1 font-display text-lg md:text-2xl text-brand leading-none", 0.08, { x: 60 })}
        {word("THIS IS WHERE IT BEGINS", "top-full right-full mt-1 mr-1 w-16 text-right text-[9px] md:text-[10px] leading-tight tracking-wide text-muted-foreground", 0.2, { y: 30 })}
        {word("A STORY IN MOTION", "top-full left-full mt-1 ml-1 w-16 text-[9px] md:text-[10px] leading-tight tracking-wide text-muted-foreground", 0.28, { y: 30 })}

        {/* central red panel */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-brand"
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={{
            clipPath:
              phase >= 4 ? "inset(0 0 100% 0)" : phase >= 2 ? "inset(0 0% 0 0%)" : "inset(0 50% 0 50%)",
          }}
          transition={{ duration: phase >= 4 ? 0.9 : 0.8, ease }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-display leading-none text-brand-foreground"
              initial={{ y: "110%", fontSize: "clamp(2rem,5vw,3.5rem)" }}
              animate={{
                y: phase >= 2 ? "0%" : "110%",
                fontSize: phase >= 3 ? "clamp(5rem,18vw,16rem)" : "clamp(2rem,5vw,3.5rem)",
              }}
              transition={{ y: { duration: 0.8, ease, delay: 0.25 }, fontSize: move }}
            >
              MARTION
            </motion.h1>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
