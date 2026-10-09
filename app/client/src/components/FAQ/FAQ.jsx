import { useState } from "react";
import styles from "./FAQ.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import Button from "../Button/Button.jsx";
import { PlusIcon } from "../Icons.jsx";
import { FAQ } from "../../data/content.js";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section" id="faq">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.intro}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.title}>Good questions, clear answers</h2>
          <p className={styles.sub}>Anything else? Write to us and we&rsquo;ll get back to you quickly.</p>
          <Button as="a" variant="ghost" className={styles.contactBtn} href="mailto:aminetouati@aiesec.net">Contact us</Button>
        </Reveal>

        <Reveal className={styles.accordion}>
          {FAQ.map((item, i) => (
            <div className={cx(styles.item, open === i && styles.open)} key={item.q}>
              <button
                className={styles.trigger}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {item.q}<PlusIcon />
              </button>
              <div className={styles.panel}><p>{item.a}</p></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
