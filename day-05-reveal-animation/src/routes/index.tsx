import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MARTION" },
      { name: "description", content: "MARTION — a journey through the window." },
      { property: "og:title", content: "MARTION" },
      { property: "og:description", content: "MARTION — a journey through the window." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LOAD_MS = 3200;

function Index() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"load" | "fade" | "expand" | "reveal" | "done">("load");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / LOAD_MS);
      const eased = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setPhase("fade"), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const next = { fade: ["expand", 350], expand: ["reveal", 1000], reveal: ["done", 900] } as const;
    if (!(phase in next)) return;
    const [to, ms] = next[phase as keyof typeof next];
    const id = setTimeout(() => setPhase(to), ms);
    return () => clearTimeout(id);
  }, [phase]);

  const expanded = phase !== "load" && phase !== "fade";

  return (
    <main className="stage">
      <div
        className={`loader ${phase !== "load" ? "is-faded" : ""} ${expanded ? "is-expanded" : ""}`}
        style={expanded ? undefined : { width: `max(9rem, ${pct}%)` }}
      >
        <span>LOADING</span>
        <span>{pct}%</span>
      </div>
      <div className={`hero ${phase === "reveal" || phase === "done" ? "is-revealed" : ""}`}>
        <img src="/hero.jpg" alt="Mountains seen through a vintage train window" />
        {phase === "done" && <h1 className="title">MARTION</h1>}
      </div>
    </main>
  );
}
