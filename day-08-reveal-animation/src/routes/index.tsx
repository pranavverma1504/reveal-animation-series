import { createFileRoute } from "@tanstack/react-router";
import { MartionLoader } from "@/components/MartionLoader";
import { MartionHero } from "@/components/MartionHero";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "MARTION — Introduction" },
    { name: "description", content: "MARTION — a moving collage of imagery and typography." },
    { property: "og:title", content: "MARTION — Introduction" },
    { property: "og:description", content: "MARTION — a moving collage of imagery and typography." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  return <><MartionHero /><MartionLoader /></>;
}
