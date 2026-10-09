import Reveal from "../Reveal/Reveal.jsx";
import styles from "./Card.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Card({ className, delay, children, ...rest }) {
  return (
    <Reveal as="article" className={cx(styles.card, className)} delay={delay} {...rest}>
      {children}
    </Reveal>
  );
}
