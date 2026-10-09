import styles from "./Chips.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Chips({ items, className }) {
  return (
    <div className={cx(styles.chips, className)}>
      {items.map((t) => <span key={t}>{t}</span>)}
    </div>
  );
}
