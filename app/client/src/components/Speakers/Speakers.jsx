import { useEffect, useRef } from "react";
import styles from "./Speakers.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import { SPEAKERS } from "../../data/content.js";

export default function Speakers() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Duplicate cards so the loop is seamless
    const originals = Array.from(track.children);
    originals.forEach((card) => track.appendChild(card.cloneNode(true)));
  }, []);

  return (
    <section className="section" id="speakers">
      <div className="container">
        <Reveal className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Speakers</span>
            <h2 className={styles.title}>Voices worth crossing the city for</h2>
            <p className={styles.sub}>35+ speakers will take the stage — line-up reveal coming soon.</p>
          </div>
        </Reveal>
      </div>

      {/* Full-width auto-scroll strip — no container so it bleeds edge-to-edge */}
      <div className={styles.scrollWrapper}>
        <div className={styles.track} ref={trackRef}>
          {SPEAKERS.map((s, i) => (
            <article className={styles.card} key={i}>
              <div className={styles.avatar} style={{ "--a": s.a, "--b": s.b }}>
                {/* person silhouette icon */}
                <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="14" r="7" fill="rgba(255,255,255,0.25)" />
                  <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="rgba(255,255,255,0.18)" />
                </svg>
              </div>
              <h3 className={styles.comingSoonLabel}>Coming Soon</h3>
              <p className={styles.comingSoonSub}>Speaker TBA</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
