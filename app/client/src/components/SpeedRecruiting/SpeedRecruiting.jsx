import { useState } from "react";
import styles from "./SpeedRecruiting.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import { SPEED_RECRUITING } from "../../data/content.js";

const cx = (...c) => c.filter(Boolean).join(" ");

const applyLink = (email, subject) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    "Bonjour,\n\nJe souhaite candidater à ce poste rencontré lors de MeetUp Pro 2026.\n\nCV et lettre de motivation en pièce jointe.\n\nCordialement,"
  )}`;

const RoleCard = ({ role, email, accent }) => {
  const [open, setOpen] = useState(false);
  const subject = `Candidature – ${role.title}`;

  return (
    <article className={styles.role} style={{ "--accent": accent }}>
      <h4>{role.title}</h4>
      <div className={styles.chips}>
        <span>{role.level}</span>
        <span>{role.experience}</span>
      </div>
      <p className={styles.summary}>{role.summary}</p>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Hide the full brief" : "See the full brief"}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cx(styles.chev, open && styles.chevUp)}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className={styles.detail}>
          <div className={styles.block}>
            <h5>Missions principales</h5>
            <ul>
              {role.missions.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
          <div className={styles.block}>
            <h5>Profil recherché</h5>
            <ul>
              {role.profile.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      )}

      <a className={styles.apply} href={applyLink(email, subject)}>
        Apply for this role
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </a>
    </article>
  );
};

export default function SpeedRecruiting() {
  const { time, intro, companies } = SPEED_RECRUITING;

  return (
    <section className="section" id="speed-recruiting">
      <div className="container">
        <Reveal>
          <SectionHead
            eyebrow="Speed Recruiting"
            title="Recruiters you can interview with"
            sub={intro}
          >
            <span className={styles.timeBadge}>
              <span className={styles.dot}></span>
              {time} &bull; 7-minute 1-on-1 interviews
            </span>
          </SectionHead>
        </Reveal>

        {companies.map((c) => (
          <Reveal key={c.id} delay={60} className={styles.company}>
            <div className={styles.companyHead}>
              <div className={styles.logo}>
                <img src={c.logo} alt={`${c.name} logo`} loading="lazy" />
              </div>
              <div className={styles.companyMeta}>
                <h3>{c.name}</h3>
                <p>{c.hiringNote}</p>
              </div>
              <div className={styles.openings}>
                <span className={styles.count}>{c.roles.length}</span>
                <span className={styles.countLabel}>open roles</span>
              </div>
            </div>

            <div className={styles.roles}>
              {c.roles.map((r) => (
                <RoleCard key={r.id} role={r} email={c.email} accent={c.accent} />
              ))}
            </div>

            <p className={styles.applyNote}>
              {c.applyNote}{" "}
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
