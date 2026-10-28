import { useState } from "react";
import styles from "./Agenda.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import { AGENDA_THEME, AGENDA_PARALLEL_TRACKS, AGENDA_ITEMS } from "../../data/content.js";

const COLS = "120px minmax(0, 1.6fr) minmax(0, 0.7fr) minmax(0, 0.9fr) 110px";

const cell = (column, row) => ({ gridColumn: column, gridRow: row });

export default function Agenda() {
  const [activeTab, setActiveTab] = useState("matrix"); // "matrix" | "timeline"

  return (
    <section className="section" id="agenda">
      <div className="container">
        <Reveal>
          <SectionHead
            center
            eyebrow="Agenda · MeetUp Pro 2026"
            title="One Day, Fully Packed"
            sub="Explore the complete schedule below, or switch to a linear timeline of the day."
          />
        </Reveal>

        {/* General Theme Card */}
        <Reveal delay={80}>
          <div className={styles.themeCard}>
            <div className={styles.themeHeader}>
              <span className={styles.themeBadge}>
                <span className={styles.pulseDot}></span>
                {AGENDA_THEME.eyebrow}
              </span>
              <span className={styles.themeDate}>Saturday, October 31, 2026</span>
            </div>
            <h3 className={styles.themeTitle}>&ldquo;{AGENDA_THEME.title}&rdquo;</h3>
            <p className={styles.themeSub}>{AGENDA_THEME.subtitle}</p>

            <div className={styles.tracksPills}>
              {AGENDA_PARALLEL_TRACKS.map((track) => (
                <div key={track.id} className={styles.trackPill} style={{ "--accent": track.accent }}>
                  <span className={styles.trackPillDot}></span>
                  <strong>{track.title}</strong>
                  <span className={styles.trackPillTime}>{track.timeSlot}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* View switch (Grid Matrix vs Timeline) */}
        <div className={styles.controlsBar}>
          <div className={styles.viewToggle} role="tablist" aria-label="Agenda view">
            <button
              type="button"
              className={`${styles.viewBtn} ${activeTab === "matrix" ? styles.viewBtnActive : ""}`}
              onClick={() => setActiveTab("matrix")}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              Grid View
            </button>
            <button
              type="button"
              className={`${styles.viewBtn} ${activeTab === "timeline" ? styles.viewBtnActive : ""}`}
              onClick={() => setActiveTab("timeline")}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Timeline View
            </button>
          </div>

          <div className={styles.activeFilterPill}>
            Showing: <strong>Whole Agenda</strong> ({AGENDA_ITEMS.length} events)
          </div>
        </div>

        {/* View 1: Agenda Grid (draft replica) */}
        {activeTab === "matrix" && (
          <Reveal delay={100}>
            <div className={styles.draftGrid} style={{ gridTemplateColumns: COLS }}>
              {/* Header */}
              <div className={`${styles.dCell} ${styles.dHead}`} style={cell("1 / 2", "1 / 2")}>Time</div>
              <div className={`${styles.dCell} ${styles.dHead}`} style={cell("2 / 3", "1 / 2")}>
                Main Stage &amp; Core Program
              </div>
              <div className={`${styles.dCell} ${styles.dHead}`} style={cell("3 / 6", "1 / 2")}>
                Parallel Tracks
              </div>

              {/* 08:30 – 09:15 · Check-In (B2B) */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "2 / 3")}>
                <span>08:30 AM</span><span>09:15 AM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dGold}`} style={cell("2 / 6", "2 / 3")}>
                <span className={styles.dPill}>Check-In</span>
                <h4>Check-In ( B2B )</h4>
                <span className={styles.dSub}>Badge collection &amp; welcome coffee for corporate delegations</span>
              </div>

              {/* 09:15 – 09:50 · Opening Ceremony */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "3 / 4")}>
                <span>09:15 AM</span><span>09:50 AM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dBlue}`} style={cell("2 / 6", "3 / 4")}>
                <span className={styles.dPill}>Opening</span>
                <h4>Opening Ceremony + Main Partners Keynotes</h4>
                <span className={styles.dSub}>Institutional welcome addresses &amp; headline partner keynotes</span>
              </div>

              {/* 09:55 – 10:55 · Panel 1  |  B2B Business Fair (09:55 – 12:10) */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "4 / 5")}>
                <span>09:55 AM</span><span>10:55 AM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dBlue}`} style={cell("2 / 3", "4 / 5")}>
                <span className={styles.dPill}>Panel 1</span>
                <h4>Growing Without Losing Your Way &mdash; The Keys to Sustainable SME Growth</h4>
                <span className={styles.dSub}>Hamza Fatnassi</span>
              </div>
              <div className={`${styles.dCell} ${styles.dParallel} ${styles.dFair}`} style={cell("3 / 6", "4 / 7")}>
                <span className={styles.dPill}>Exhibition</span>
                <h4>B2B Business Fair</h4>
                <span className={styles.dSub}>09:55 AM &ndash; 12:10 PM</span>
              </div>

              {/* 10:55 – 11:05 · Pause */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "5 / 6")}>
                <span>10:55 AM</span><span>11:05 AM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dGreen}`} style={cell("2 / 3", "5 / 6")}>
                <span className={styles.dPill}>Break</span>
                <h4>Pause</h4>
                <span className={styles.dSub}>Coffee &amp; informal networking</span>
              </div>

              {/* 11:10 – 12:10 · Panel 2 */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "6 / 7")}>
                <span>11:10 AM</span><span>12:10 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dBlue}`} style={cell("2 / 3", "6 / 7")}>
                <span className={styles.dPill}>Panel 2</span>
                <h4>Turning Challenges into Opportunities &mdash; Startup &times; Corporate Collaboration</h4>
                <span className={styles.dSub}>Ghassen Dridi &bull; Randa Touati &bull; Nizar Somrani</span>
              </div>

              {/* 12:15 – 13:00 · Check-In Youth | Networking Break */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "7 / 8")}>
                <span>12:15 PM</span><span>01:00 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dGold}`} style={cell("2 / 3", "7 / 8")}>
                <span className={styles.dPill}>Check-In</span>
                <h4>Check-In Youth</h4>
                <span className={styles.dSub}>Students, graduates &amp; young talent</span>
              </div>
              <div className={`${styles.dCell} ${styles.dParallel} ${styles.dNetworking}`} style={cell("3 / 6", "7 / 8")}>
                <span className={styles.dPill}>Networking</span>
                <h4>Networking Break &#9749;</h4>
                <span className={styles.dSub}>Midday lunch &amp; open business networking</span>
              </div>

              {/* 13:00 – 13:30 · Opening for Youth | Workshop / JOB FAIR / SPEED RECRUITING begin */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "8 / 9")}>
                <span>01:00 PM</span><span>01:30 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dBlue}`} style={cell("2 / 3", "8 / 9")}>
                <span className={styles.dPill}>Opening</span>
                <h4>Opening for Youth</h4>
                <span className={styles.dSub}>Job Fair &amp; Speed Recruiting introduction</span>
              </div>
              <div className={`${styles.dCell} ${styles.dParallel} ${styles.dWorkshop}`} style={cell("3 / 4", "8 / 12")}>
                <span className={styles.dPill}>Hands-On</span>
                <h4>Workshop</h4>
                <span className={styles.dSub}>01:00 &ndash; 04:00</span>
              </div>
              <div className={`${styles.dCell} ${styles.dParallel} ${styles.dJobFair}`} style={cell("4 / 5", "8 / 12")}>
                <span className={styles.dPill}>Recruitment</span>
                <h4>JOB FAIR</h4>
                <span className={styles.dSub}>01:00 &ndash; 04:00</span>
              </div>
              <div className={`${styles.dCell} ${styles.dParallel} ${styles.dSpeed}`} style={cell("5 / 6", "8 / 12")}>
                <h4>SPEED RECRUITING</h4>
                <span className={styles.dSub}>01:00 &ndash; 04:30</span>
              </div>

              {/* 13:40 – 14:40 · Panel 3 */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "9 / 10")}>
                <span>01:40 PM</span><span>02:40 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dBlue}`} style={cell("2 / 3", "9 / 10")}>
                <span className={styles.dPill}>Panel 3</span>
                <h4>Entrepreneurship in the Sahel &mdash; From Idea to First Customer</h4>
                <span className={styles.dSub}>Amine Rekhis &bull; A&iuml;da Bouraoui</span>
              </div>

              {/* 14:45 – 15:00 · Pause */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "10 / 11")}>
                <span>02:45 PM</span><span>03:00 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dGreen}`} style={cell("2 / 3", "10 / 11")}>
                <span className={styles.dPill}>Break</span>
                <h4>Pause</h4>
                <span className={styles.dSub}>Coffee &amp; ongoing booth interviews</span>
              </div>

              {/* 15:00 – 16:00 · Panel 4 */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "11 / 12")}>
                <span>03:00 PM</span><span>04:00 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dBlue}`} style={cell("2 / 3", "11 / 12")}>
                <span className={styles.dPill}>Panel 4</span>
                <h4>AI and the Future of Work &mdash; Threat or Career Accelerator?</h4>
                <span className={styles.dSub}>Marwen Essalah &bull; Manel Ghanmi</span>
              </div>

              {/* 16:10 – 16:30 · Closing */}
              <div className={`${styles.dCell} ${styles.dTime}`} style={cell("1 / 2", "12 / 13")}>
                <span>04:10 PM</span><span>04:30 PM</span>
              </div>
              <div className={`${styles.dCell} ${styles.dCard} ${styles.dDark}`} style={cell("2 / 6", "12 / 13")}>
                <span className={styles.dPill}>Closing</span>
                <h4>Closing</h4>
                <span className={styles.dSub}>Panel synthesis &amp; partner acknowledgments</span>
              </div>
            </div>
          </Reveal>
        )}

        {/* View 2: Timeline View */}
        {activeTab === "timeline" && (
          <div className={styles.timelineList}>
            {AGENDA_ITEMS.map((item, index) => (
              <Reveal key={item.id} delay={index * 40}>
                <article
                  className={`${styles.timelineCard} ${item.type === "panel" ? styles.isPanel : ""}`}
                  style={{ "--item-accent": item.accent }}
                >
                  <div className={styles.timeCol}>
                    <span className={styles.timeSlot}>{item.timeSlot}</span>
                    <span className={styles.trackBadge}>{item.track}</span>
                  </div>

                  <div className={styles.detailsCol}>
                    <div className={styles.itemMeta}>
                      <span className={styles.typeBadge} style={{ borderColor: item.accent, color: item.accent }}>
                        {item.typeLabel}
                      </span>
                      {item.parallel && (
                        <span className={styles.parallelBanner}>
                          <span className={styles.lightning}>&#9889;</span>
                          Concurrent Track: <strong>{item.parallel.name}</strong> ({item.parallel.time})
                        </span>
                      )}
                    </div>

                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.description}</p>

                    {item.speakers && item.speakers.length > 0 && (
                      <div className={styles.timelineSpeakers}>
                        <strong>Confirmed Speakers:</strong> {item.speakers.join(" · ")}
                      </div>
                    )}

                    {item.splitColumns && (
                      <div className={styles.splitList}>
                        {item.splitColumns.map((col, idx) => (
                          <div key={idx} className={styles.splitSubCard} style={{ borderColor: col.accent }}>
                            <div className={styles.splitSubHead}>
                              <span className={styles.splitSubBadge} style={{ color: col.accent }}>{col.badge}</span>
                              <span className={styles.splitSubTime}>{col.time}</span>
                            </div>
                            <h5>{col.title}</h5>
                            <p>{col.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.tags && (
                      <div className={styles.itemTags}>
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
