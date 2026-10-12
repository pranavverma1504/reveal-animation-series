import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import img1 from "@/assets/seq-1.jpg";
import img2 from "@/assets/seq-2.jpg";
import img3 from "@/assets/seq-3.jpg";
import img4 from "@/assets/seq-4.jpg";
import img5 from "@/assets/seq-5.jpg";

const IMAGES = [img1, img2, img3, img4, img5];
const STEP_MS = 420; // per-image hold, matches reference pacing

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MARTION — Creative Developer" },
      { name: "description", content: "MARTION — editorial creative development and digital craft." },
      { property: "og:title", content: "MARTION — Creative Developer" },
      { property: "og:description", content: "Editorial creative development and digital craft." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Phase = "loading" | "sequence" | "reveal";

function Index() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [index, setIndex] = useState(0);

  // Preload every image before starting to avoid blank frames.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      IMAGES.map(
        (src) =>
          new Promise<void>((res) => {
            const i = new Image();
            i.onload = i.onerror = () => res();
            i.src = src;
          }),
      ),
    ).then(() => !cancelled && setPhase("sequence"));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "sequence") return;
    const id = window.setTimeout(() => {
      if (index < IMAGES.length - 1) setIndex(index + 1);
      else setPhase("reveal");
    }, index === 0 ? 700 : STEP_MS);
    return () => window.clearTimeout(id);
  }, [phase, index]);

  // Percentage tracks elapsed sequence time; hits 100 exactly when the reveal begins.
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    if (phase === "reveal") return setPercent(100);
    if (phase !== "sequence") return;
    const total = 700 + STEP_MS * (IMAGES.length - 1);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(99, Math.floor(((now - start) / total) * 100));
      setPercent(p);
      if (p < 99) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <main className="stage" data-phase={phase}>
      <header className="topbar">
        <span className="mark">M—N</span>
        <span className="meta">MENU</span>
      </header>

      <figure className="preview" aria-hidden={phase === "reveal"}>
        <figcaption className="preview-meta">
          <span>MARTION</span>
          <span>{percent}%</span>
        </figcaption>
        <div className="preview-frame">
          {IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              width={768}
              height={960}
              className={i === index ? "is-active" : i < index ? "is-past" : ""}
            />
          ))}
        </div>
      </figure>

      <h1 className="wordmark" aria-label="MARTION">
        <span className="wordmark-line">
          <span className="wordmark-inner">MARTION</span>
        </span>
      </h1>

      <p className="descriptor">CREATIVE DEVELOPER — EST. 2026</p>
    </main>
  );
}
