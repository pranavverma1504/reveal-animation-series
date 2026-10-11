import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState, type CSSProperties } from "react";
import { Preloader } from "@/components/Preloader";
import mountainUrl from "@/assets/mountain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MARTION — Creative Developer" },
      { name: "description", content: "MARTION — a creative developer crafting premium, motion-led digital experiences." },
      { property: "og:title", content: "MARTION — Creative Developer" },
      { property: "og:description", content: "Premium, motion-led digital experiences by MARTION." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO_START = 0.35; // seconds after curtain begins lifting

function Chars({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="line">
      {text.split("").map((c, i) => (
        <span key={i} className="char" style={{ animationDelay: `${delay + i * 0.05}s` } as CSSProperties}>
          {c}
        </span>
      ))}
    </span>
  );
}

const fade = (d: number): CSSProperties => ({ animationDelay: `${HERO_START + d}s` });

function Index() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  return (
    <main className={`relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-background ${ready ? "" : "hero-paused"}`}>
      <Preloader onDone={done} />
      <div className="hero-bg pointer-events-none" style={{ backgroundImage: `url(${mountainUrl})`, animationDelay: `${HERO_START - 0.2}s` }} />


      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] md:px-10">
        <span className="fade-in font-display text-sm font-extrabold normal-case tracking-tight" style={fade(0.9)}>
          martion<span className="text-accent">.</span>
        </span>
        <nav className="fade-in flex gap-6 text-muted-foreground" style={fade(1)}>
          <a href="#" className="transition-colors hover:text-foreground">Work</a>
          <a href="mailto:hello@martion.dev" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
      </header>

      {/* Headline */}
      <section className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <h1 className="headline text-center text-foreground">
          <Chars text="MARTION" delay={HERO_START} />
        </h1>
        <p className="fade-in mt-6 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground md:text-xs" style={fade(0.8)}>
          Creative <span className="text-accent">✦</span> Developer
        </p>
      </section>

      {/* Footer meta */}
      <footer className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-10">
        <span className="fade-in" style={fade(1.1)}>Based online — 2026</span>
        <span className="fade-in" style={fade(1.2)}>Scroll ↓</span>
      </footer>
    </main>
  );
}
