import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Martion — Circular Reveal" },
      { name: "description", content: "Martion intro: curved logo marks open a circular reveal into the hero." },
      { property: "og:title", content: "Martion — Circular Reveal" },
      { property: "og:description", content: "Martion intro: curved logo marks open a circular reveal into the hero." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Mark() {
  return (
    <svg viewBox="0 0 40 52" className="mark-svg" aria-hidden="true">
      <path d="M8 8 V30 Q8 44 22 44 H32" />
    </svg>
  );
}

function Index() {
  return (
    <main className="stage">
      <p className="wordmark">martion</p>
      <div className="hero-reveal">
        <img src={hero} alt="Misty modern architecture at dawn" width={1920} height={1088} />
      </div>
      <div className="logo" aria-hidden="true">
        <div className="mark mark-left"><div className="mark-spin"><Mark /></div></div>
        <div className="mark mark-right"><div className="mark-spin"><Mark /></div></div>
      </div>
      <h1 className="hero-title">MARTION</h1>
    </main>
  );
}
