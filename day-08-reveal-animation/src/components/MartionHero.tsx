const heroImage = { url: "/images/hero/hero-sky.jpg" };
import styles from "./MartionHero.module.css";

export function MartionHero() {
  return (
    <main className={styles["hero"]} data-martion-layer="hero">
      <img
        className={styles["image"]}
        src={heroImage.url}
        alt="Golden clouds and a crescent moon framed by pink flowering bushes"
      />
      <div
        className={styles["titleDestination"]}
        data-hero-title-destination
        role="heading"
        aria-level={1}
        aria-label="MARTION"
      />
    </main>
  );
}
