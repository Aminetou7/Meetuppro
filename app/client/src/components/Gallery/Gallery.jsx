import { useState } from "react";
import styles from "./Gallery.module.css";
import Reveal from "../Reveal/Reveal.jsx";

const IMAGES = [
  { src: "/img/gallery/DSC05168.jpeg",       alt: "MeetUp Pro 2025 — moment 1" },
  { src: "/img/gallery/DSC05208 (1).jpeg",   alt: "MeetUp Pro 2025 — moment 2" },
  { src: "/img/gallery/DSC05360.jpeg",       alt: "MeetUp Pro 2025 — moment 3" },
  { src: "/img/gallery/DSC05600.jpeg",       alt: "MeetUp Pro 2025 — moment 4" },
  { src: "/img/gallery/DSC05640.jpeg",       alt: "MeetUp Pro 2025 — moment 5" },
  { src: "/img/gallery/DSC05753.jpeg",       alt: "MeetUp Pro 2025 — moment 6" },
  { src: "/img/gallery/DSC05803.jpeg",       alt: "MeetUp Pro 2025 — moment 7" },
  { src: "/img/gallery/DSC05805.jpeg",       alt: "MeetUp Pro 2025 — moment 8" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index of open image

  const open  = (i) => { setLightbox(i); document.body.style.overflow = "hidden"; };
  const close = ()  => { setLightbox(null); document.body.style.overflow = ""; };
  const prev  = (e) => { e.stopPropagation(); setLightbox((lightbox - 1 + IMAGES.length) % IMAGES.length); };
  const next  = (e) => { e.stopPropagation(); setLightbox((lightbox + 1) % IMAGES.length); };

  return (
    <>
      <section className="section" id="gallery">
        <div className="container">
          <Reveal className={styles.head}>
            <span className={styles.eyebrow}>Gallery</span>
            <h2 className={styles.title}>Moments from MeetUp Pro 2025</h2>
            <p className={styles.sub}>A glimpse of what happened on stage, in the expo hall and across every networking corner.</p>
          </Reveal>

          <div className={styles.grid}>
            {IMAGES.map((img, i) => (
              <Reveal
                key={img.src}
                as="button"
                className={styles.item}
                delay={i * 60}
                onClick={() => open(i)}
                aria-label={`Open photo ${i + 1}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <span className={styles.overlay} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className={styles.lbClose} onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className={styles.lbImgWrap} onClick={(e) => e.stopPropagation()}>
            <img src={IMAGES[lightbox].src} alt={IMAGES[lightbox].alt} className={styles.lbImg} />
          </div>
          <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <span className={styles.lbCounter}>{lightbox + 1} / {IMAGES.length}</span>
        </div>
      )}
    </>
  );
}
