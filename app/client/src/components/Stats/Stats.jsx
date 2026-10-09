import styles from "./Stats.module.css";
import StatsGrid from "../StatsGrid/StatsGrid.jsx";
import { STATS } from "../../data/content.js";

export default function Stats() {
  return (
    <section className={styles.stats} id="stats">
      <div className={`container`}>
        <StatsGrid items={STATS} />
      </div>
    </section>
  );
}
