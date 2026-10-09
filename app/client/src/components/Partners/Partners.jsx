import styles from "./Partners.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import { PARTNERS, MEDIA_PARTNERS } from "../../data/partners.js";

const Group = ({ title, items }) => (
  <Reveal className={styles.group}>
    <h3>{title}</h3>
    <div className={styles.grid}>
      {items.map((p) => (
        <div className={styles.tile} key={p.src}>
          <img src={`/img/partners/${p.src}`} alt={p.alt} loading="lazy" />
        </div>
      ))}
    </div>
  </Reveal>
);

export default function Partners({ onOpenPartner }) {
  return (
    <section className="section" id="partners">
      <div className="container">
        <Reveal>
          <SectionHead
            eyebrow="Partners"
            title="They make MeetUp Pro possible"
            sub={<button type="button" className={styles.inlineLink} onClick={onOpenPartner}>Become a partner &rarr;</button>}
          />
        </Reveal>
        <Group title="Partners" items={PARTNERS} />
        <Group title="Media partners" items={MEDIA_PARTNERS} />
      </div>
    </section>
  );
}
