import { useEffect, useRef, useState } from "react";

const M = "M20 82 V22 L50 58 L80 22 V82";
const DRAW = 800; // outline draw
const FILL = 1500; // counter + fill
const HOLD = 250;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"load" | "exit" | "gone">("load");
  const rectRef = useRef<SVGRectElement>(null);
  const crestRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      onDone();
      return;
    }
    let raf = 0;
    const start = performance.now() + DRAW;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / FILL, 0), 1);
      const p = ease(t);
      setPct(Math.round(p * 100));
      const y = 100 - p * 100;
      rectRef.current?.setAttribute("y", String(y));
      crestRef.current?.setAttribute("y1", String(y));
      crestRef.current?.setAttribute("y2", String(y));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setPhase("exit");
          onDone();
          setTimeout(() => setPhase("gone"), 1000);
        }, HOLD);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div className={`preloader ${phase === "exit" ? "is-exit" : ""} ${pct === 100 ? "is-full" : ""}`} aria-hidden>
      <div className="preloader-inner flex flex-col items-center gap-10">
        <svg className="pl-mark" viewBox="0 0 100 100">
          <defs>
            <clipPath id="pl-clip">
              <rect ref={rectRef} x="0" y="100" width="100" height="100" />
            </clipPath>
            <linearGradient id="pl-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--accent-deep)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <path className="pl-outline" d={M} pathLength={1} />
          <g clipPath="url(#pl-clip)">
            <path className="pl-fill" d={M} />
            <line ref={crestRef} className="pl-crest" x1="0" x2="100" y1="100" y2="100" />
          </g>
        </svg>
        <div className="pl-meta flex w-40 items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Loading</span>
          <span className="tabular-nums text-foreground">{String(pct).padStart(2, "0")}%</span>
        </div>
        <div className="pl-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
      </div>
    </div>
  );
}
