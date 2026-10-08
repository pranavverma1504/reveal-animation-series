import { useEffect, useRef, useState } from "react";

const IMAGES = ["/flowers.jpg", "/horses.jpg", "/sheep.jpg", "/landscape-hero.jpg"];
const HERO = "/landscape-hero.jpg";
const STEP = 600;

type Phase = "open" | "white" | "word" | "gap" | "expand" | "hero";

export function Reveal() {
  const [phase, setPhase] = useState<Phase>("open");
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [grown, setGrown] = useState(false);
  const gapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    IMAGES.forEach((src) => (new Image().src = src));
    const t: number[] = [];
    const at = (ms: number, fn: () => void) => t.push(window.setTimeout(fn, ms));
    at(400, () => setPhase("white"));
    at(1200, () => setPhase("word"));
    at(2000, () => setPhase("gap"));
    IMAGES.forEach((_, i) => i && at(2000 + 700 + i * STEP, () => setIdx(i)));
    const end = 2000 + 700 + (IMAGES.length - 1) * STEP + 700;
    at(end, () => {
      if (gapRef.current) setRect(gapRef.current.getBoundingClientRect());
      setPhase("expand");
      requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    });
    at(end + 1200, () => setPhase("hero"));
    return () => t.forEach(clearTimeout);
  }, []);

  const after = (p: Phase) => {
    const order: Phase[] = ["open", "white", "word", "gap", "expand", "hero"];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  return (
    <main className="stage">
      {/* Opening is a blank white screen; the word rises in from there. */}
      <div className={`layer sheet ${after("white") ? "sheet--in" : ""}`}>
        <div aria-hidden="true" className={`word word--center ${after("expand") ? "word--split" : ""}`}>
          <span className="mask">
            <span className={`rise ${after("word") ? "rise--in" : ""}`}>mar</span>
          </span>
          <span ref={gapRef} className={`gap ${after("gap") ? "gap--open" : ""}`}>
            {IMAGES.map((src, i) => (
              <img key={src} src={src} alt="" className={`cover swap ${i === idx ? "swap--on" : ""}`} />
            ))}
          </span>
          <span className="mask">
            <span className={`rise ${after("word") ? "rise--in" : ""}`}>tion</span>
          </span>
        </div>
      </div>

      {/* Final image grows from the gap to fill the viewport */}
      {rect && (
        <div
          className="grow"
          style={
            grown
              ? { top: 0, left: 0, width: "100vw", height: "100vh" }
              : { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
          }
        >
          <img src={HERO} alt="Rolling green hills with wildflowers beneath a cloudy sky" className="cover" />
          <div className={`hero-copy ${phase === "hero" ? "hero-copy--in" : ""}`} aria-hidden={phase !== "hero"}>
            <p className="hero-caption">Surely, without a doubt<br />It shall pass, someday</p>
            <h1 className="hero-title">martion</h1>
          </div>
        </div>
      )}
    </main>
  );
}
