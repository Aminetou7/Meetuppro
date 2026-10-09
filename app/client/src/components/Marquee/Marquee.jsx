import { Fragment } from "react";
import styles from "./Marquee.module.css";
import { MARQUEE_ITEMS } from "../../data/content.js";

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {items.map((label, i) => (
          <Fragment key={i}>
            <span>{label}</span>
            <i>&#10022;</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
