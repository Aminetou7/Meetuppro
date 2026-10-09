import styles from "./Edition.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import Card from "../Card/Card.jsx";
import Chips from "../Chips/Chips.jsx";
import StatsGrid from "../StatsGrid/StatsGrid.jsx";
import Button from "../Button/Button.jsx";
import { EDITION_STATS, EDITION_CARDS, EDITION_PANELS } from "../../data/content.js";

export default function Edition() {
  return (
    <section className="section" id="edition">
      <div className="container">
        <Reveal>
          <SectionHead
            eyebrow="Previous edition"
            title="MeetUp Pro 3.0 — the edition that set the bar"
            sub={<>13 December 2025 · Hotel L&rsquo;Orient Palace, Sousse — co-organized by AIESEC in Sousse and the Polytechnic School of Sousse: the largest B2B networking event in the Sahel region.</>}
          />
        </Reveal>

        <Reveal className={styles.stats}>
          <StatsGrid items={EDITION_STATS} reveal={false} />
        </Reveal>

        <div className={styles.grid}>
          {EDITION_CARDS.map((c, i) => (
            <Card key={c.title} delay={i * 90}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Card>
          ))}
        </div>

        <Reveal className={styles.panels}>
          <h3>On the 3.0 stage</h3>
          <Chips items={EDITION_PANELS} className={styles.panelsChips} />
        </Reveal>

        <Reveal className={styles.link}>
          <Button as="a" variant="ghost" href="https://meetuppro.com/" target="_blank" rel="noopener">
            Relive MeetUp Pro 3.0 on meetuppro.com &rarr;
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
