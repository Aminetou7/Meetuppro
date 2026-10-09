import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";
import { NAV_LINKS, EDITIONS } from "../../data/content.js";
import Button from "../Button/Button.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function MobileMenu({ open, onClose, onOpenChoose, onOpenPartner }) {
  const go = (fn) => () => { onClose(); fn && fn(); };
  return (
    <div className={cx(styles.mobileMenu, open && styles.open)} id="mobile-menu" aria-hidden={!open}>
      <nav className={styles.nav} aria-label="Mobile navigation">
        <Link to="/#about" onClick={onClose}>About</Link>
        <Link to="/#experience" onClick={onClose}>Experience</Link>
        <span className={styles.label}>Editions</span>
        {EDITIONS.map((ed) => (
          <Link key={ed.label} to={ed.href} className={styles.editionSub} onClick={onClose}>{ed.label}</Link>
        ))}
        {NAV_LINKS.slice(2).map((l) => (
          <Link key={l.href} to={"/" + l.href} onClick={onClose}>{l.label}</Link>
        ))}
        <Link to="/#faq" onClick={onClose}>FAQ</Link>
      </nav>
      <div className={styles.cta}>
        <Button variant="primary" onClick={go(onOpenChoose)}>Register</Button>
        <Button variant="ghost" onClick={go(onOpenPartner)}>Exhibit at MeetUp Pro</Button>
      </div>
    </div>
  );
}
