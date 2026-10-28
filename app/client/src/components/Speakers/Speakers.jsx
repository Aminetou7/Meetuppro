import { useState, useRef, useEffect } from "react";
import styles from "./Speakers.module.css";
import Reveal from "../Reveal/Reveal.jsx";
import { SPEAKERS } from "../../data/content.js";

const FILTER_OPTIONS = [
  { id: "all", label: "All Speakers" },
  { id: "01", label: "Panel 1" },
  { id: "02", label: "Panel 2" },
  { id: "03", label: "Panel 3" },
  { id: "04", label: "Panel 4" },
  { id: "mod", label: "Moderators" },
];

export default function Speakers() {
  const [filter, setFilter] = useState("all");
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  const filtered = SPEAKERS.filter((s) => {
    if (filter === "all") return true;
    return s.panelId === filter;
  });

  // Ensure sufficient items for a truly seamless, infinite continuous scroll across all screen widths and filters
  const repeatCount = Math.max(2, Math.ceil(8 / (filtered.length || 1)));
  const singleCycle = Array.from({ length: repeatCount }, () => filtered).flat();
  const displaySpeakers = [...singleCycle, ...singleCycle];

  return (
    <section className="section" id="speakers">
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.headContent}>
            <div>
              <span className={styles.eyebrow}>Speakers &amp; Experts</span>
              <h2 className={styles.title}>Voices Worth Crossing the City For</h2>
              <p className={styles.sub}>
                Meet the founders, executives, strategists, and moderators driving the future of the Sahel at MeetUp Pro 2026. Continuous live stream of speakers.
              </p>
            </div>
            <div className={styles.autoScrollIndicator}>
              <span className={`${styles.statusDot} ${!isPaused ? styles.dotActive : ""}`}></span>
              <span>{isPaused ? "Paused" : "Auto-scrolling"}</span>
              <button
                type="button"
                className={styles.pauseToggleBtn}
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              >
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`${styles.filterBtn} ${filter === opt.id ? styles.filterBtnActive : ""}`}
              onClick={() => setFilter(opt.id)}
            >
              {opt.label}
              <span className={styles.countBadge}>
                {opt.id === "all"
                  ? SPEAKERS.length
                  : SPEAKERS.filter((s) => s.panelId === opt.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-width Continuous Scrolling Strip - keeps scrolling like home page marquee */}
      <div className={styles.scrollWrapper}>
        <div
          ref={trackRef}
          className={`${styles.track} ${isPaused ? styles.trackPaused : ""}`}
          style={{ "--item-count": displaySpeakers.length }}
        >
          {displaySpeakers.map((s, idx) => (
            <article
              key={`${s.id}-${idx}`}
              className={styles.card}
              style={{ "--card-accent": s.accent }}
            >
              <div className={styles.cardTop}>
                <span
                  className={styles.panelTag}
                  style={{ borderColor: s.accent, color: s.accent }}
                >
                  {s.panel}
                </span>

                {s.linkedin && (
                  <a
                    href={s.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinBtn}
                    aria-label={`${s.name}'s LinkedIn Profile`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                )}
              </div>

              <div className={styles.avatarWrapper}>
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className={styles.avatarImg}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = "flex";
                      }
                    }}
                  />
                ) : null}
                <div
                  className={styles.avatarInitials}
                  style={{
                    display: s.image ? "none" : "flex",
                    background: `linear-gradient(135deg, ${s.accent}, #0FCDF3)`,
                  }}
                >
                  {s.initials}
                </div>
              </div>

              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.role}>{s.role}</p>
              <p className={styles.company}>{s.company}</p>

              <p className={styles.bio}>{s.bio}</p>

              <div className={styles.panelFooter}>
                <span className={styles.panelFooterLabel}>Contribution:</span>
                <span className={styles.panelFooterTitle}>{s.panelTitle}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
