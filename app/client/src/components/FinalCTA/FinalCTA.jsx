import styles from "./FinalCTA.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import Button from "../Button/Button.jsx";
import { YOUTH_LINK, PROFESSIONAL_LINK } from "../../data/content.js";

export default function FinalCTA({ onOpenRegister }) {
  return (
    <section className={styles.cta} id="join">
      <Reveal className={`container ${styles.inner}`}>
        <h2>Ready to join the movement?</h2>
        <p>Seats are limited. Join us on 31 October 2026 at Orient Palace, Sousse.</p>
        <div className={styles.actions}>
          <Button as="a" variant="primary" size="lg" href={PROFESSIONAL_LINK} target="_blank" rel="noopener">Register as Professional</Button>
          <Button as="a" variant="ghost" size="lg" href={YOUTH_LINK} target="_blank" rel="noopener">Register as Youth</Button>
        </div>
      </Reveal>
    </section>
  );
}
