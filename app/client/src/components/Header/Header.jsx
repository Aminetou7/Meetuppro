import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const progressRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll-spy for active section link (home page only)
  useEffect(() => {
    if (!isHome) { setActive(""); return; }
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
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
  }, [isHome]);

  // Close dropdown on outside click / route change
  useEffect(() => { setDropOpen(false); }, [pathname]);
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
      <span className={styles.progress} ref={progressRef} aria-hidden="true"></span>
      <div className={cx("container", styles.headerInner)}>
        <Link to="/" className={styles.brand} aria-label="MeetUp Pro 2026 — home">
          <img src="/img/logo.png" alt="MeetUp Pro 2026 — Connecting minds, shaping futures" className={styles.brandLogo} />
        </Link>

        <nav className={styles.mainNav} aria-label="Main navigation">
          <ul>
            <li><Link to="/#about" className={isHome && active === "#about" ? styles.active : ""}>About</Link></li>
            <li><Link to="/#experience" className={isHome && active === "#experience" ? styles.active : ""}>Experience</Link></li>
            <li className={cx(styles.navDrop, dropOpen && styles.open)} ref={dropRef}>
              <button
                type="button"
                className={cx(styles.navDropTrigger, !isHome && EDITIONS.some((e) => e.href === pathname) && styles.active)}
                aria-haspopup="true"
                aria-expanded={dropOpen}
                aria-controls="editions-menu"
                onClick={(e) => { e.stopPropagation(); setDropOpen((o) => !o); }}
              >
                Editions <ChevronDown />
              </button>
              <ul className={styles.navDropMenu} id="editions-menu">
                {EDITIONS.map((ed) => (
                  <li key={ed.label}>
                    <Link to={ed.href} className={pathname === ed.href ? styles.active : ""} onClick={() => setDropOpen(false)}>
                      {ed.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {NAV_LINKS.slice(2).map((l) => (
              <li key={l.href}><Link to={"/" + l.href} className={isHome && active === l.href ? styles.active : ""}>{l.label}</Link></li>
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
