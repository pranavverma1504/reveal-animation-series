import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MARTIONDEV" },
      { name: "description", content: "MARTIONDEV — text reveal hero." },
      { property: "og:title", content: "MARTIONDEV" },
      { property: "og:description", content: "MARTIONDEV — text reveal hero." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORD = "MARTIONDEV";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SCRAMBLE_MS = 1300; // letters lock left-to-right over this window
const TICK_MS = 55;

function Index() {
  const [text, setText] = useState(WORD);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  // Wait for the image before starting so the reveal never shows a blank frame.
  useEffect(() => {
    const img = new Image();
    img.src = hero;
    Promise.all([img.decode().catch(() => {}), document.fonts.ready]).then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    const start = performance.now();
    const id = setInterval(() => {
      const t = performance.now() - start;
      const locked = Math.floor((t / SCRAMBLE_MS) * WORD.length);
      if (locked >= WORD.length) {
        setText(WORD);
        clearInterval(id);
        setTimeout(() => setOpen(true), 250);
        return;
      }
      setText(
        WORD.split("")
          .map((c, i) => (i < locked ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
    }, TICK_MS);
    return () => clearInterval(id);
  }, [ready]);

  return (
    <main className="stage">
      <img src={hero} alt="" className={`hero ${open ? "hero-open" : ""}`} />
      <h1 className="word" aria-label={WORD}>
        {ready ? text : ""}
      </h1>
    </main>
  );
}
