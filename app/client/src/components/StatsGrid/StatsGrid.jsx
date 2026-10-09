import styles from "./StatsGrid.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import Counter from "../Counter.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function StatsGrid({ items, className, reveal = true }) {
  return (
    <div className={cx(styles.grid, className)}>
      {items.map((s, i) => {
        const inner = (
          <>
            <span className={styles.number}><Counter to={s.count} />{s.suffix}</span>
            <span className={styles.label}>{s.label}</span>
          </>
        );
        return reveal ? (
          <Reveal key={s.label} className={styles.stat} delay={i * 90}>{inner}</Reveal>
        ) : (
          <div key={s.label} className={styles.stat}>{inner}</div>
        );
      })}
    </div>
  );
}
