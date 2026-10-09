import styles from "./SectionHead.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function SectionHead({ eyebrow, title, sub, center, className, children }) {
  return (
    <div className={cx(styles.head, center && styles.center, className)}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {title && <h2 className={styles.title}>{title}</h2>}
      {sub && <div className={styles.sub}>{sub}</div>}
      {children}
    </div>
  );
}
