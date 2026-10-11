import { useEffect, useRef } from "react";
import styles from "./Edition2025.module.css";
import Reveal from "../components/Reveal/Reveal.jsx";
import Card from "../components/Card/Card.jsx";
import StatsGrid from "../components/StatsGrid/StatsGrid.jsx";
import Button from "../components/Button/Button.jsx";
import Gallery from "../components/Gallery/Gallery.jsx";
import { BoothIcon, PeopleIcon, MicIcon, BriefcaseIcon, LinkedInIcon, ArrowRight } from "../components/Icons.jsx";
import { EDITION2025 } from "../data/edition2025.js";

const ICONS = { booth: BoothIcon, people: PeopleIcon, mic: MicIcon, briefcase: BriefcaseIcon };
const cx = (...c) => c.filter(Boolean).join(" ");

export default function Edition2025({ onOpenRegister }) {
  const { theme, stats, categories, panels, date, venue, tagline } = EDITION2025;
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <main id="main">
      {/* Theme hero with video background */}
      <section className={styles.hero}>
        <video
          ref={videoRef}
          className={styles.heroBg}
          autoPlay muted loop playsInline preload="metadata"
          poster="/img/hero-poster.jpg"
          disablePictureInPicture tabIndex="-1" aria-hidden="true"
        >
          <source src="/video/aftermovie-web.mp4?v=2" type="video/mp4" />
        </video>
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
              <p className={styles.sub}>Every space of MeetUp Pro 2025 was built to turn encounters into opportunities.</p>
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
              <span className={styles.eyebrow}>On the 2025 stage</span>
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
        </div>
      </section>

      {/* Gallery */}
      <Gallery />
    </main>
  );
}
