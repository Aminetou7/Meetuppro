import styles from "./Agenda.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";

export default function Agenda() {
  return (
    <section className="section" id="agenda">
      <div className="container">
        <Reveal>
          <SectionHead center eyebrow="Agenda" title="One day, fully packed">
            <div className={styles.soon}>
              <span className={styles.status}><span className={styles.dot}></span>Under construction</span>
              <p className={styles.text}>The full agenda will be shared soon.</p>
            </div>
          </SectionHead>
        </Reveal>
      </div>
    </section>
  );
}
