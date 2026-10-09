import styles from "./About.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import Chips from "../Chips/Chips.jsx";
import { Check, CameraIcon } from "../Icons.jsx";
import { SECTORS, ABOUT_CHECKS } from "../../data/content.js";

export default function About() {
  return (
    <section className="section" id="about">
      <div className={`container ${styles.aboutGrid}`}>
        <Reveal className={styles.copy}>
          <span className={styles.eyebrow}>About the event</span>
          <h2 className={styles.title}>The professional meeting point of the Tunisian Sahel.</h2>
          <p>
            MeetUp Pro 2026 brings companies, startups, entrepreneurs, talents, students,
            universities and institutions together in one place — a space designed to
            turn encounters into professional, entrepreneurial and collaborative opportunities.
          </p>
          <p>
            Under the theme “Connecting the Sahel to strengthen the Tunisian entrepreneurial
            ecosystem”, this edition builds on more than three years of engagement in the
            ecosystem: break down the silos, showcase the initiatives of the Sahel and reinforce
            the synergies between all its actors.
          </p>
          <ul className={styles.checkList}>
            {ABOUT_CHECKS.map((c) => (
              <li key={c}><Check />{c}</li>
            ))}
          </ul>
          <Chips items={SECTORS} className={styles.chipsWrap} />
        </Reveal>

        <Reveal className={styles.media}>
          <div className={styles.frame}>
            <div className={styles.placeholder}>
              <CameraIcon />
              <span>Official visuals coming soon</span>
            </div>
          </div>
          <div className={styles.floatCard}>
            <strong>2 passes</strong>
            <span>Professional &amp; Youth</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
