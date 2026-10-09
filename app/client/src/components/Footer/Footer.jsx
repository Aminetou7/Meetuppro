import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { CONTACTS, YOUTH_LINK } from "../../data/content.js";
import { LinkedInIcon, InstagramIcon, XIcon, YouTubeIcon } from "../Icons.jsx";

const SOCIALS = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "X (Twitter)", Icon: XIcon },
  { label: "YouTube", Icon: YouTubeIcon },
];

export default function Footer({ onOpenRegister }) {
  return (
    <footer className={styles.siteFooter} id="footer">
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <img src="/img/logo.png" alt="MeetUp Pro 2026" className={styles.footerLogo} />
          <p>The professional meeting point of the Tunisian Sahel. Connecting minds, shaping futures.</p>
          <div className={styles.socials}>
            {SOCIALS.map(({ label, Icon }) => (
              <a key={label} href="#" aria-label={label}><Icon /></a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#experience">Experience</Link></li>
            <li><Link to="/editions/3.0">Edition 3.0</Link></li>
            <li><Link to="/#program">Program</Link></li>
            <li><Link to="/#agenda">Agenda</Link></li>
            <li><Link to="/#speakers">Speakers</Link></li>
            <li><Link to="/#partners">Partners</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Register</h4>
          <ul>
            <li><button type="button" className={styles.linkBtn} onClick={onOpenRegister}>Professional Pass</button></li>
            <li><a href={YOUTH_LINK} target="_blank" rel="noopener">Youth Pass</a></li>
            <li><Link to="/#faq">FAQ</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <ul className={styles.contacts}>
            {CONTACTS.map((c) => (
              <li key={c.email}>
                <strong>{c.name}</strong>
                <span>{c.role}</span>
                <a href={`tel:${c.tel}`}>{c.telLabel}</a>
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </li>
            ))}
          </ul>
          <p className={styles.venue}>31 Oct 2026 — Mouradi Club Kantaoui, Sousse</p>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <span>&copy; {new Date().getFullYear()} MeetUp Pro. All rights reserved.</span>
        <span className={styles.tag}>Connecting minds, shaping futures</span>
      </div>
    </footer>
  );
}
