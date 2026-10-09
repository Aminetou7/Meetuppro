import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { NAV_LINKS, EDITIONS } from "../../data/content.js";
import { ChevronDown } from "../Icons.jsx";
import Button from "../Button/Button.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Header({ menuOpen, onToggleMenu, onOpenPartner, onOpenChoose }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [active, setActive] = useState("");
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for active nav link
  useEffect(() => {
    const links = [...NAV_LINKS.map((l) => l.href), ...EDITIONS.map((e) => e.href)];
    const ids = [...new Set(links.map((h) => h.slice(1)))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropOpen) return;
    const onDocClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setDropOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [dropOpen]);

  return (
    <header className={cx(styles.siteHeader, scrolled && styles.scrolled)} id="header">
      <div className={cx("container", styles.headerInner)}>
        <a href="#home" className={styles.brand} aria-label="MeetUp Pro 2026 — home">
          <img src="/img/logo.png" alt="MeetUp Pro 2026 — Connecting minds, shaping futures" className={styles.brandLogo} />
        </a>

        <nav className={styles.mainNav} aria-label="Main navigation">
          <ul>
            <li><a href="#about" className={active === "#about" ? styles.active : ""}>About</a></li>
            <li><a href="#experience" className={active === "#experience" ? styles.active : ""}>Experience</a></li>
            <li className={cx(styles.navDrop, dropOpen && styles.open)} ref={dropRef}>
              <button
                type="button"
                className={styles.navDropTrigger}
                aria-haspopup="true"
                aria-expanded={dropOpen}
                aria-controls="editions-menu"
                onClick={(e) => { e.stopPropagation(); setDropOpen((o) => !o); }}
              >
                Editions <ChevronDown />
              </button>
              <ul className={styles.navDropMenu} id="editions-menu">
                {EDITIONS.map((ed) => (
                  <li key={ed.label}><a href={ed.href} onClick={() => setDropOpen(false)}>{ed.label}</a></li>
                ))}
              </ul>
            </li>
            {NAV_LINKS.slice(2).map((l) => (
              <li key={l.href}><a href={l.href} className={active === l.href ? styles.active : ""}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <Button as="button" variant="ghost" size="sm" className={styles.headerBtn} onClick={onOpenPartner}>Exhibit at MeetUp Pro</Button>
          <Button as="button" variant="primary" size="sm" className={styles.headerBtn} onClick={onOpenChoose}>Register</Button>
          <button
            className={cx(styles.burger, menuOpen && styles.burgerOpen)}
            id="burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={onToggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
