import { useRef } from "react";
import styles from "./Speakers.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import { ChevronLeft, ChevronRight } from "../Icons.jsx";
import { SPEAKERS } from "../../data/content.js";

export default function Speakers() {
  const railRef = useRef(null);
  const step = () => {
    const card = railRef.current?.querySelector("article");
    return card ? card.offsetWidth + 20 : 270;
  };
  const scrollBy = (dir) => railRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  return (
    <section className="section" id="speakers">
      <div className="container">
        <Reveal className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Speakers</span>
            <h2 className={styles.title}>Voices worth crossing the city for</h2>
            <p className={styles.sub}>35+ speakers will take the stage — line-up reveal coming soon.</p>
          </div>
          <div className={styles.controls}>
            <button className={styles.btn} aria-label="Previous speakers" onClick={() => scrollBy(-1)}><ChevronLeft /></button>
            <button className={styles.btn} aria-label="Next speakers" onClick={() => scrollBy(1)}><ChevronRight /></button>
          </div>
        </Reveal>
      </div>
      <div className="container">
        <div className={styles.rail} ref={railRef}>
          {SPEAKERS.map((s, i) => (
            <article className={styles.card} key={i}>
              <div className={styles.avatar} style={{ "--a": s.a, "--b": s.b }}>{s.initials}</div>
              <h3>Speaker Name</h3>
              <p>Role — Company</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
