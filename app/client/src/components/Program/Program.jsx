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
            title="Four panels, one conversation"
            sub="The 2026 discussion panels — from sustainable growth to AI, innovation and the Sahel’s entrepreneurial future."
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
              <div className={styles.topRow}>
                <span className={styles.day}>Panel {p.n}</span>
                <span className={styles.timeBadge}>{p.time}</span>
              </div>
              <h3>{p.title}</h3>
              <div className={styles.tags}>
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>

              {p.speakers && p.speakers.length > 0 && (
                <div className={styles.speakersList}>
                  <span className={styles.speakersTitle}>Confirmed Speakers:</span>
                  <div className={styles.speakerPills}>
                    {p.speakers.map((spk) => (
                      <span key={spk} className={styles.speakerPill}>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        {spk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <span className={styles.note}>{p.time} &bull; Main Stage</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
