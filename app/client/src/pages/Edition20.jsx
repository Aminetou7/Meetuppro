import styles from "./Edition20.module.css";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal/Reveal.jsx";
import Button from "../components/Button/Button.jsx";
import { ArrowRight } from "../components/Icons.jsx";

export default function Edition20({ onOpenRegister }) {
  return (
    <main id="main">
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true"></div>
        <div className={styles.heroGrid} aria-hidden="true"></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>Previous edition</span>
          <p className={styles.script}>MeetUp Pro</p>
          <h1 className={styles.themeTitle}><span>2.0</span></h1>
          <p className={styles.tagline}>
            The second edition of the Sahel&rsquo;s professional meeting point — where the community
            that keeps growing every year first came together.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.body}`}>
          <Reveal>
            <div className={styles.card}>
              <h2>Building the momentum</h2>
              <p>
                MeetUp Pro 2.0 laid the foundations for what the event is today: companies, startups,
                talents and institutions meeting in one place to create real professional and
                entrepreneurial opportunities in the Tunisian Sahel.
              </p>
              <p className={styles.note}>
                A full recap of this edition is being prepared. Meanwhile, explore MeetUp Pro 3.0 —
                the edition that set the bar — or reserve your seat for 2026.
              </p>
              <div className={styles.cta}>
                <Button as={Link} to="/editions/3.0" variant="ghost">See MeetUp Pro 3.0 <ArrowRight /></Button>
                <Button variant="primary" onClick={onOpenRegister}>Register for 2026 <ArrowRight /></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
