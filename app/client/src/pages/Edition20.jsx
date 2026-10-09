import styles from "./Edition20.module.css";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal/Reveal.jsx";
import StatsGrid from "../components/StatsGrid/StatsGrid.jsx";
import Button from "../components/Button/Button.jsx";
import { ArrowRight } from "../components/Icons.jsx";
import { EDITION20, initialsOf } from "../data/edition20.js";

export default function Edition20({ onOpenRegister }) {
  const { stats, about, agenda, speakers, testimonials } = EDITION20;

  return (
    <main id="main">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true"></div>
        <div className={styles.heroGrid} aria-hidden="true"></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>Previous edition</span>
          <p className={styles.script}>MeetUp Pro</p>
          <h1 className={styles.themeTitle}><span>2.0</span></h1>
          <p className={styles.tagline}>
            A groundbreaking day that brought together the brightest minds in business and
            technology &mdash; and set new standards for B2B networking in the Sahel region.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <StatsGrid items={stats} />
        </div>
      </section>

      {/* About */}
      <section className="section" id="about-20">
        <div className={`container ${styles.aboutWrap}`}>
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>About the edition</span>
              <h2 className={styles.title}>About MeetUp Pro 2.0</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.aboutCopy}>
              {about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Agenda */}
      <section className="section" id="agenda-20">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>The day</span>
              <h2 className={styles.title}>Event agenda</h2>
            </div>
          </Reveal>
          <ol className={styles.timeline}>
            {agenda.map((item, i) => (
              <Reveal as="li" key={item.time + item.title} className={styles.tlItem} delay={i * 50}>
                <span className={styles.tlTime}>{item.time}</span>
                <span className={styles.tlDot} aria-hidden="true"></span>
                <div className={styles.tlBody}>
                  <h3>{item.title}</h3>
                  {item.desc && <p>{item.desc}</p>}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Speakers */}
      <section className="section" id="speakers-20">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>On stage</span>
              <h2 className={styles.title}>Our speakers</h2>
            </div>
          </Reveal>
          <div className={styles.speakerGrid}>
            {speakers.map((s, i) => (
              <Reveal key={s.name} className={styles.speakerCard} delay={i * 70}>
                <span className={styles.avatar} style={{ "--a": s.a, "--b": s.b }}>{initialsOf(s.name)}</span>
                <h3>{s.name}</h3>
                <p className={styles.speakerRole}>{s.role}</p>
                <p className={styles.speakerOrg}>{s.org}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials-20">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>What people said</span>
              <h2 className={styles.title}>In their words</h2>
            </div>
          </Reveal>
          <div className={styles.quoteGrid}>
            {testimonials.map((t, i) => (
              <Reveal as="figure" key={t.name} className={styles.quote} delay={i * 80}>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaCard}`}>
          <Reveal>
            <h2>Ready for what came next?</h2>
            <p>
              Building on the success of 2.0, MeetUp Pro 3.0 raised the bar &mdash; and 2026 goes
              even further. Relive 3.0 or reserve your seat for the next edition.
            </p>
            <div className={styles.cta}>
              <Button as={Link} to="/editions/3.0" variant="ghost">See MeetUp Pro 3.0 <ArrowRight /></Button>
              <Button variant="primary" onClick={onOpenRegister}>Register for 2026 <ArrowRight /></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
