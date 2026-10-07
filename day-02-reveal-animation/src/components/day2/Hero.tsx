import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import type { Insets } from "./geometry";

const ease = [0.76, 0, 0.24, 1] as const;

export function Hero({ revealed, frame }: { revealed: boolean; frame: Insets }) {
  const [t, r, b, l] = frame;
  const up = (delay: number) => ({
    initial: { y: "110%" },
    animate: { y: revealed ? "0%" : "110%" },
    transition: { duration: 0.9, ease, delay },
  });
  const fade = (delay: number, y = 16) => ({
    initial: { opacity: 0, y },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-background">
      <motion.nav
        {...fade(0.2, -16)}
        className="absolute inset-x-0 top-0 flex items-center justify-between px-[4%] py-5"
      >
        <span className="font-display text-2xl tracking-wide text-brand">MARTION.</span>
        <ul className="hidden gap-8 text-xs font-medium tracking-[0.2em] md:flex">
          {["WORK", "STUDIO", "JOURNAL", "CONTACT"].map((i) => (
            <li key={i}>
              <a href="#" className="transition-colors hover:text-brand">{i}</a>
            </li>
          ))}
        </ul>
        <a href="#" className="border border-brand px-4 py-2 text-xs font-medium tracking-[0.2em] text-brand transition-colors hover:bg-brand hover:text-brand-foreground">
          LET'S TALK
        </a>
      </motion.nav>

      <div className="absolute overflow-hidden" style={{ top: `${t}%`, right: `${r}%`, bottom: `${b}%`, left: `${l}%` }}>
        <motion.img
          src={heroImg}
          alt="Figure in a red jacket crossing a sunlit studio"
          width={1600}
          height={912}
          className="h-full w-full object-cover"
          initial={{ scale: 1.25 }}
          animate={{ scale: revealed ? 1 : 1.25 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 md:p-10">
          <div className="overflow-hidden">
            <motion.h1 {...up(0.35)} className="font-display text-[clamp(4.5rem,16vw,14rem)] leading-[0.85] text-brand-foreground">
              MARTION
            </motion.h1>
          </div>
          <div className="mt-3 overflow-hidden md:mt-4">
            <motion.p {...up(0.5)} className="max-w-md text-sm text-brand-foreground/85 md:text-base">
              Small ideas, carried further. A studio for brands that move.
            </motion.p>
          </div>
        </div>
        <motion.div {...fade(0.7)} className="absolute right-5 bottom-5 hidden text-right text-[10px] leading-tight tracking-[0.2em] text-brand-foreground/80 md:block">
          EVERY VOICE<br />DESERVES<br />TO BE HEARD
        </motion.div>
      </div>

      <motion.div
        {...fade(0.6)}
        className="absolute inset-x-[4%] flex flex-col gap-3 md:hidden"
        style={{ top: `${100 - b + 3}%` }}
      >
        <a href="#" className="bg-brand py-4 text-center text-xs font-medium tracking-[0.2em] text-brand-foreground">
          SEE THE WORK
        </a>
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground">CREATE. INSPIRE. REPEAT.</p>
      </motion.div>

      <motion.div
        {...fade(0.6)}
        className="absolute inset-x-[4%] bottom-0 hidden items-center justify-between md:flex"
        style={{ height: `${b}%` }}
      >
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground">CREATE. INSPIRE. REPEAT.</p>
        <a href="#" className="text-xs font-medium tracking-[0.2em] text-brand hover:underline">SEE THE WORK →</a>
      </motion.div>
    </section>
  );
}
