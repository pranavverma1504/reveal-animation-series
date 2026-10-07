import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hero } from "@/components/day2/Hero";
import { Reveal } from "@/components/day2/Reveal";
import { geometry } from "@/components/day2/geometry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Martion — A Story in Motion" },
      { name: "description", content: "Martion is a studio for brands that move. Create. Inspire. Repeat." },
      { property: "og:title", content: "Martion — A Story in Motion" },
      { property: "og:description", content: "Martion is a studio for brands that move." },
    ],
  }),
  component: Index,
});

// phase: -1 idle, 0 grid, 1 words, 2 panel, 3 expand, 4 hand-off to hero, 5 done
const TIMELINE = [100, 700, 1300, 2500, 3600, 4700];

function Index() {
  const [phase, setPhase] = useState(-1);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    const timers = TIMELINE.map((ms, i) => setTimeout(() => setPhase(i), ms));
    return () => {
      mq.removeEventListener("change", set);
      timers.forEach(clearTimeout);
    };
  }, []);

  const g = mobile ? geometry.mobile : geometry.desktop;

  return (
    <main>
      <Hero revealed={phase >= 4} frame={g.frame} />
      {phase < 5 && <Reveal phase={phase} closed={g.closed} frame={g.frame} />}
    </main>
  );
}
