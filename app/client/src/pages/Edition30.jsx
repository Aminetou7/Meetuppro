import styles from "./Edition30.module.css";
import Reveal from "../components/Reveal/Reveal.jsx";
import Card from "../components/Card/Card.jsx";
import StatsGrid from "../components/StatsGrid/StatsGrid.jsx";
import Button from "../components/Button/Button.jsx";
import { BoothIcon, PeopleIcon, MicIcon, BriefcaseIcon, LinkedInIcon, ArrowRight } from "../components/Icons.jsx";
import { EDITION30 } from "../data/edition30.js";

const ICONS = { booth: BoothIcon, people: PeopleIcon, mic: MicIcon, briefcase: BriefcaseIcon };

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Edition30({ onOpenRegister }) {
  const { theme, stats, categories, panels, date, venue, tagline } = EDITION30;

  return (
    <main id="main">
      {/* Theme hero — matches the 3.0 key visual */}
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true"></div>
        <div className={styles.heroGrid} aria-hidden="true"></div>
        <div className={cx("container", styles.heroContent)}>
          <span className={styles.badge}>Previous edition · {date}</span>
          <p className={styles.script}>{theme.script}</p>
          <h1 className={styles.themeTitle}>
            {theme.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.venue}>{venue}</p>
          <p className={styles.tagline}>{tagline}</p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <StatsGrid items={stats} />
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>What happened</span>
              <h2 className={styles.title}>Four pillars of the edition</h2>
              <p className={styles.sub}>Every space of MeetUp Pro 3.0 was built to turn encounters into opportunities.</p>
            </div>
          </Reveal>
          <div className={styles.catGrid}>
            {categories.map((c, i) => {
              const Icon = ICONS[c.icon];
              return (
                <Card key={c.title} delay={i * 90}>
                  <span className={styles.catIcon}><Icon /></span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Panels + speakers */}
      <section className="section" id="panels">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>On the 3.0 stage</span>
              <h2 className={styles.title}>The discussion panels</h2>
              <p className={styles.sub}>Four panels bringing together founders, investors, corporates and creators around the region’s real challenges.</p>
            </div>
          </Reveal>

          <div className={styles.panelList}>
            {panels.map((p, i) => (
              <Reveal key={p.n} as="article" className={styles.panel} delay={i * 70} style={{ "--accent": p.accent }}>
                <div className={styles.panelTop}>
                  <span className={styles.panelNum}>Panel {p.n}</span>
                  <h3 className={styles.panelTitle}>{p.title}</h3>
                  <p className={styles.panelText}>{p.text}</p>
                </div>
                <ul className={styles.speakers}>
                  {p.speakers.map((s) => (
                    <li key={s.name + s.role} className={styles.speaker}>
                      <span className={styles.speakerRole}>{s.role}</span>
                      <span className={styles.speakerName}>
                        {s.link ? (
                          <a href={s.link} target="_blank" rel="noopener noreferrer">
                            {s.name}
                            <LinkedInIcon className={styles.speakerLink} />
                          </a>
                        ) : (
                          s.name
                        )}
                      </span>
                      <span className={styles.speakerTitle}>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.linkRow}>
            <Button as="a" variant="ghost" href="https://meetuppro.com/" target="_blank" rel="noopener">
              Relive MeetUp Pro 3.0 on meetuppro.com <ArrowRight />
            </Button>
            <Button variant="primary" onClick={onOpenRegister}>
              Register for 2026 <ArrowRight />
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
