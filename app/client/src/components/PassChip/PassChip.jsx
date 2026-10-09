import styles from "./PassChip.module.css";

export default function PassChip({ children }) {
  return <span className={styles.chip}>{children}</span>;
}
