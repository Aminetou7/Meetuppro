import styles from "./Program.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import { PANELS } from "../../data/content.js";

export default function Program() {
  return (
    <section className="section" id="program">
      <div className="container">
        <Reveal>
          <SectionHead
            eyebrow="Program"
            title="Five panels, one conversation"
            sub="The 2026 discussion panels — from sustainable growth to AI, careers and the Sahel’s entrepreneurial future."
          />
        </Reveal>
        <div className={styles.panels}>
          {PANELS.map((p, i) => (
            <Reveal
              as="article"
              key={p.n}
              className={styles.panel}
              delay={i * 90}
              style={{ "--accent": p.accent }}
            >
              <span className={styles.day}>Panel {p.n}</span>
              <h3>{p.title}</h3>
              <div className={styles.tags}>
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <span className={styles.note}>Speakers &amp; time slot coming soon</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
