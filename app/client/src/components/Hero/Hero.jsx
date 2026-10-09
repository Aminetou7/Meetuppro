import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import Button from "../Button/Button.jsx";
import { ArrowRight } from "../Icons.jsx";
import { YOUTH_LINK } from "../../data/content.js";

export default function Hero({ onOpenRegister }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section className={styles.hero} id="home">
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay muted loop playsInline preload="metadata"
        poster="/img/hero-poster.jpg"
        disablePictureInPicture tabIndex="-1" aria-hidden="true"
      >
        <source src="/video/aftermovie-web.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} aria-hidden="true"></div>
      <div className={styles.grid} aria-hidden="true"></div>

      <div className={`container ${styles.content}`}>
        <Reveal as="span" className={styles.badge}>31 October 2026 · Mouradi Club Kantaoui, Sousse · Registration open</Reveal>
        <Reveal as="img" delay={90} src="/img/logo.png" alt="MeetUp Pro 2026 — Connecting minds, shaping futures" className={styles.logo} />
        <Reveal as="p" delay={180} className={styles.lead}>
          Connecting the Sahel to strengthen the Tunisian entrepreneurial ecosystem —
          one day where companies, startups, talents, universities and institutions meet
          to create real opportunities.
        </Reveal>
        <Reveal className={styles.cta} delay={270}>
          <Button variant="primary" size="lg" onClick={onOpenRegister}>
            Register as Professional <ArrowRight />
          </Button>
          <Button as="a" variant="ghost" size="lg" href={YOUTH_LINK} target="_blank" rel="noopener">
            Register as Youth <ArrowRight />
          </Button>
        </Reveal>
        <Reveal as="p" delay={360} className={styles.note}>Seats are limited — reserve yours now.</Reveal>
      </div>

      <a href="#stats" className={styles.scrollCue} aria-label="Scroll to content">
        <span className={styles.mouse}><span className={styles.wheel}></span></span>
      </a>
    </section>
  );
}
