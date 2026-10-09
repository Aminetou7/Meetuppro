import styles from "./MobileMenu.module.css";
import { NAV_LINKS, EDITIONS } from "../../data/content.js";
import Button from "../Button/Button.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function MobileMenu({ open, onClose, onOpenChoose, onOpenPartner }) {
  const go = (fn) => () => { onClose(); fn && fn(); };
  return (
    <div className={cx(styles.mobileMenu, open && styles.open)} id="mobile-menu" aria-hidden={!open}>
      <nav className={styles.nav} aria-label="Mobile navigation">
        <a href="#about" onClick={onClose}>About</a>
        <a href="#experience" onClick={onClose}>Experience</a>
        <span className={styles.label}>Editions</span>
        {EDITIONS.map((ed) => (
          <a key={ed.label} href={ed.href} className={styles.editionSub} onClick={onClose}>{ed.label}</a>
        ))}
        {NAV_LINKS.slice(2).map((l) => (
          <a key={l.href} href={l.href} onClick={onClose}>{l.label}</a>
        ))}
        <a href="#faq" onClick={onClose}>FAQ</a>
      </nav>
      <div className={styles.cta}>
        <Button variant="primary" onClick={go(onOpenChoose)}>Register</Button>
        <Button variant="ghost" onClick={go(onOpenPartner)}>Exhibit at MeetUp Pro</Button>
      </div>
    </div>
  );
}
