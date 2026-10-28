import { useState } from "react";
import styles from "./Agenda.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import { AGENDA_THEME, AGENDA_PARALLEL_TRACKS, AGENDA_ITEMS } from "../../data/content.js";

export default function Agenda() {
  const [trackFilter, setTrackFilter] = useState("all"); // "all" | "b2b" | "b2c"
  const [activeTab, setActiveTab] = useState("matrix"); // "matrix" | "timeline"

  // Filter items based on B2B / B2C / All selection
  const filteredItems = AGENDA_ITEMS.filter((item) => {
    if (trackFilter === "b2b") {
      return item.trackType === "b2b" || item.trackType === "both";
    }
    if (trackFilter === "b2c") {
      return item.trackType === "b2c" || item.trackType === "both";
    }
    return true;
  });

  return (
    <section className="section" id="agenda">
      <div className="container">
        <Reveal>
          <SectionHead
            center
            eyebrow="Agenda · MeetUp Pro 2026"
            title="One Day, Fully Packed"
            sub="Explore the complete schedule below, or switch directly between the B2B Corporate track and the B2C Youth & Talent track."
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

        {/* Primary Track Filter: All Agenda vs B2B Agenda vs B2C Agenda */}
        <div className={styles.trackSwitcherWrapper}>
          <span className={styles.trackSwitcherLabel}>Select Agenda Track:</span>
          <div className={styles.trackSwitcher} role="tablist" aria-label="Agenda Track Selection">
            <button
              type="button"
              className={`${styles.trackBtn} ${trackFilter === "all" ? styles.trackBtnActive : ""}`}
              onClick={() => setTrackFilter("all")}
            >
              <span className={styles.trackIcon}>🌟</span>
              <span className={styles.trackBtnText}>
                <strong>All Agenda</strong>
                <small>Full Schedule (8:00 AM – 3:40 PM)</small>
              </span>
            </button>

            <button
              type="button"
              className={`${styles.trackBtn} ${trackFilter === "b2b" ? styles.trackBtnActiveB2B : ""}`}
              onClick={() => setTrackFilter("b2b")}
            >
              <span className={styles.trackIcon}>💼</span>
              <span className={styles.trackBtnText}>
                <strong>B2B Agenda</strong>
                <small>Corporate, SMEs &amp; Business Fair</small>
              </span>
            </button>

            <button
              type="button"
              className={`${styles.trackBtn} ${trackFilter === "b2c" ? styles.trackBtnActiveB2C : ""}`}
              onClick={() => setTrackFilter("b2c")}
            >
              <span className={styles.trackIcon}>🚀</span>
              <span className={styles.trackBtnText}>
                <strong>B2C Agenda</strong>
                <small>Youth, Job Fair &amp; Speed Recruiting</small>
              </span>
            </button>
          </div>
        </div>

        {/* Track Specific Spotlight Banner */}
        {trackFilter === "b2b" && (
          <div className={styles.spotlightBannerB2B}>
            <div className={styles.spotlightIcon}>💼</div>
            <div>
              <h4>B2B Agenda View &bull; Strategic Growth &amp; Corporate Partnering</h4>
              <p>
                Showing morning sessions tailored for CEOs, SME founders, corporate decision-makers, and B2B Pass holders — including Panel 1, Panel 2, and the continuous B2B Business Fair.
              </p>
            </div>
          </div>
        )}

        {trackFilter === "b2c" && (
          <div className={styles.spotlightBannerB2C}>
            <div className={styles.spotlightIcon}>🚀</div>
            <div>
              <h4>B2C Agenda View &bull; Youth Empowerment, Job Fair &amp; Career Acceleration</h4>
              <p>
                Showing afternoon sessions tailored for students, fresh graduates, job seekers, and Youth Pass holders — including Panel 3, Panel 4, JOB FAIR recruiting booths, and SPEED RECRUITING.
              </p>
            </div>
          </div>
        )}

        {/* Secondary Controls: View switch (Grid Matrix vs Timeline) */}
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
            Showing: <strong>{trackFilter === "all" ? "Whole Agenda" : trackFilter === "b2b" ? "B2B Only" : "B2C Only"}</strong> ({filteredItems.length} events)
          </div>
        </div>

        {/* View 1: Agenda Grid (Blueprint View) */}
        {activeTab === "matrix" && (
          <Reveal delay={100}>
            <div className={styles.matrixWrapper}>
              <div className={styles.matrixTable}>
                {/* Header row */}
                <div className={styles.matrixHeaderRow}>
                  <div className={styles.matrixHeadTime}>Time</div>
                  <div className={styles.matrixHeadMain}>Main Stage &amp; Core Program</div>
                  <div className={styles.matrixHeadParallel}>
                    {trackFilter === "b2b"
                      ? "B2B Business Fair"
                      : trackFilter === "b2c"
                      ? "JOB FAIR"
                      : "Parallel Business & Job Fair"}
                  </div>
                  <div className={styles.matrixHeadSide}>
                    {trackFilter === "b2b" ? "Partnering" : "Speed Recruiting"}
                  </div>
                </div>

                {/* 08:00 - 09:00 : Check-In B2B (B2B & All) */}
                {(trackFilter === "all" || trackFilter === "b2b") && (
                  <div className={`${styles.matrixRow} ${styles.rowCheckinB2B}`}>
                    <div className={styles.cellTime}>
                      <span>08:00 AM</span>
                      <span className={styles.timeSep}>&ndash;</span>
                      <span>09:00 AM</span>
                    </div>
                    <div className={`${styles.cellContent} ${styles.spanAllCols}`}>
                      <div className={styles.eventCardCheckin}>
                        <span className={styles.eventPillGold}>B2B Registration</span>
                        <h4>Check-In ( B2B )</h4>
                        <p>Personalized welcome, badge collection, and coffee reception for corporate delegations, partners, and entrepreneurs</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 09:00 - 09:30 : Opening Ceremony (All & B2B) */}
                {(trackFilter === "all" || trackFilter === "b2b") && (
                  <div className={`${styles.matrixRow} ${styles.rowOpening}`}>
                    <div className={styles.cellTime}>
                      <span>09:00 AM</span>
                      <span className={styles.timeSep}>&ndash;</span>
                      <span>09:30 AM</span>
                    </div>
                    <div className={`${styles.cellContent} ${styles.spanAllCols}`}>
                      <div className={styles.eventCardKeynote}>
                        <span className={styles.eventPillBlue}>Opening &amp; Keynotes</span>
                        <h4>Opening Ceremony + Main Partners Keynotes</h4>
                        <p>Official opening of the 2026 edition &bull; Institutional welcome addresses &bull; Visionary keynotes from headline partners</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 09:30 - 11:45 Morning Block: Panels 1 & 2 + Break + B2B Business Fair (B2B & All) */}
                {(trackFilter === "all" || trackFilter === "b2b") && (
                  <div className={styles.matrixRowSplitMorning}>
                    <div className={styles.morningMainColumn}>
                      {/* Panel 1 */}
                      <div className={styles.subRow}>
                        <div className={styles.cellTimeSmall}>
                          <span>09:30 AM</span>
                          <span>10:30 AM</span>
                        </div>
                        <div className={styles.eventCardPanel} style={{ "--accent": "#1DE123" }}>
                          <div className={styles.panelHeader}>
                            <span className={styles.panelBadge}>Panel 1 &bull; B2B Focus</span>
                            <span className={styles.panelDuration}>60 min</span>
                          </div>
                          <h4>Growing Without Losing Yourself: The Keys to Sustainable SME Growth</h4>
                          <div className={styles.panelSpeakerTag}>
                            <strong>Confirmed:</strong> Hamza Fatnassi
                          </div>
                          <div className={styles.tagsMini}>
                            <span>SMEs</span><span>Sustainable Growth</span><span>Leadership</span>
                          </div>
                        </div>
                      </div>

                      {/* Break */}
                      <div className={styles.subRow}>
                        <div className={styles.cellTimeSmall}>
                          <span>10:35 AM</span>
                          <span>10:45 AM</span>
                        </div>
                        <div className={styles.eventCardPause}>
                          <span className={styles.pausePill}>Break &bull; 10 min</span>
                          <p>Coffee break &amp; informal networking</p>
                        </div>
                      </div>

                      {/* Panel 2 */}
                      <div className={styles.subRow}>
                        <div className={styles.cellTimeSmall}>
                          <span>10:45 AM</span>
                          <span>11:45 AM</span>
                        </div>
                        <div className={styles.eventCardPanel} style={{ "--accent": "#1ADBA8" }}>
                          <div className={styles.panelHeader}>
                            <span className={styles.panelBadge}>Panel 2 &bull; B2B Focus</span>
                            <span className={styles.panelDuration}>60 min</span>
                          </div>
                          <h4>Turning Challenges into Opportunities: The Power of Startup &times; Corporate Collaboration</h4>
                          <div className={styles.panelSpeakerTag}>
                            <strong>Confirmed:</strong> Ghassen Dridi &bull; Randa Touati &bull; Nizar Somrani
                          </div>
                          <div className={styles.tagsMini}>
                            <span>Startups</span><span>Corporates</span><span>Open Innovation</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parallel Column: B2B Business Fair */}
                    <div className={styles.morningParallelColumn}>
                      <div className={styles.parallelBoxB2B}>
                        <div className={styles.parallelHeader}>
                          <span className={styles.parallelLive}>Continuous</span>
                          <span className={styles.parallelTime}>09:30 AM &ndash; 11:45 AM</span>
                        </div>
                        <h4 className={styles.parallelTitle}>B2B Business Fair</h4>
                        <p>Exclusive exhibition floor, innovative company showcases, decision-maker networking, and pre-scheduled business meetings.</p>
                        <div className={styles.parallelBadges}>
                          <span>50+ Exhibitors</span>
                          <span>B2B Lounge</span>
                          <span>Strategic Partnerships</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12:00 - 13:00 : Midday Dual Track */}
                <div className={`${styles.matrixRow} ${styles.rowMidday}`}>
                  <div className={styles.cellTime}>
                    <span>12:00 PM</span>
                    <span className={styles.timeSep}>&ndash;</span>
                    <span>01:00 PM</span>
                  </div>
                  <div className={styles.cellSplitMidday}>
                    {(trackFilter === "all" || trackFilter === "b2c") && (
                      <div className={styles.splitBoxYouth}>
                        <span className={styles.eventPillGold}>B2C Youth Track</span>
                        <h4>Check-In Youth</h4>
                        <p>Registration and badge distribution for students, graduates, and young talent</p>
                      </div>
                    )}
                    {(trackFilter === "all" || trackFilter === "b2b") && (
                      <div className={styles.splitBoxBreak}>
                        <span className={styles.eventPillPurple}>Networking</span>
                        <h4>Networking Break &#9749;</h4>
                        <p>Midday lunch break, refreshments, and open business networking</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 12:30 - 12:45 : Opening for youth (B2C & All) */}
                {(trackFilter === "all" || trackFilter === "b2c") && (
                  <div className={`${styles.matrixRow} ${styles.rowYouthOpening}`}>
                    <div className={styles.cellTime}>
                      <span>12:30 PM</span>
                      <span className={styles.timeSep}>&ndash;</span>
                      <span>12:45 PM</span>
                    </div>
                    <div className={`${styles.cellContent} ${styles.spanMainColOnly}`}>
                      <div className={styles.eventCardKeynote}>
                        <span className={styles.eventPillBlue}>Main Stage &bull; B2C</span>
                        <h4>Opening for Youth</h4>
                        <p>Talent welcome session: Job Fair presentation, Speed Recruiting tips, and career ecosystem immersion</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12:45 - 15:15 Afternoon Block: Panel 3, Break, Panel 4 + JOB FAIR + SPEED RECRUITING (B2C & All) */}
                {(trackFilter === "all" || trackFilter === "b2c") && (
                  <div className={styles.matrixRowSplitAfternoon}>
                    <div className={styles.afternoonMainColumn}>
                      {/* Panel 3 */}
                      <div className={styles.subRow}>
                        <div className={styles.cellTimeSmall}>
                          <span>12:45 PM</span>
                          <span>01:45 PM</span>
                        </div>
                        <div className={styles.eventCardPanel} style={{ "--accent": "#0FCDF3" }}>
                          <div className={styles.panelHeader}>
                            <span className={styles.panelBadge}>Panel 3 &bull; B2C Focus</span>
                            <span className={styles.panelDuration}>60 min</span>
                          </div>
                          <h4>Entrepreneurship in the Sahel: From Idea to First Customer</h4>
                          <div className={styles.panelSpeakerTag}>
                            <strong>Confirmed:</strong> Amine Rekhis &bull; A&iuml;da Bouraoui
                          </div>
                          <div className={styles.tagsMini}>
                            <span>Entrepreneurship</span><span>Go-to-market</span><span>Sahel</span>
                          </div>
                        </div>
                      </div>

                      {/* Break */}
                      <div className={styles.subRow}>
                        <div className={styles.cellTimeSmall}>
                          <span>01:45 PM</span>
                          <span>02:15 PM</span>
                        </div>
                        <div className={styles.eventCardPause}>
                          <span className={styles.pausePill}>Break &bull; 30 min</span>
                          <p>Coffee break &amp; ongoing interviews across employer booths</p>
                        </div>
                      </div>

                      {/* Panel 4 */}
                      <div className={styles.subRow}>
                        <div className={styles.cellTimeSmall}>
                          <span>02:15 PM</span>
                          <span>03:15 PM</span>
                        </div>
                        <div className={styles.eventCardPanel} style={{ "--accent": "#1DE123" }}>
                          <div className={styles.panelHeader}>
                            <span className={styles.panelBadge}>Panel 4 &bull; B2C Focus</span>
                            <span className={styles.panelDuration}>60 min</span>
                          </div>
                          <h4>AI and the Future of Work: Threat or Career Accelerator?</h4>
                          <div className={styles.panelSpeakerTag}>
                            <strong>Confirmed:</strong> Marwen Essalah &bull; Manel Ghanmi
                          </div>
                          <div className={styles.tagsMini}>
                            <span>AI</span><span>Future of Work</span><span>Skills</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parallel: JOB FAIR */}
                    <div className={styles.afternoonJobFairColumn}>
                      <div className={styles.parallelBoxJobFair}>
                        <div className={styles.parallelHeader}>
                          <span className={styles.parallelLive}>Live</span>
                          <span className={styles.parallelTime}>12:45 PM &ndash; 03:20 PM</span>
                        </div>
                        <h4 className={styles.parallelTitle}>JOB FAIR</h4>
                        <p>Dedicated recruitment space: meet hiring managers directly, drop off your CV, and explore full-time career opportunities &amp; internships.</p>
                        <div className={styles.parallelBadges}>
                          <span>Top-Tier Employers</span>
                          <span>Internships &amp; Jobs</span>
                        </div>
                      </div>
                    </div>

                    {/* Far right column: SPEED RECRUITING */}
                    <div className={styles.speedRecruitingColumn}>
                      <div className={styles.verticalStrip}>
                        <span className={styles.speedTag}>Speed Interview</span>
                        <h4 className={styles.speedTitle}>SPEED RECRUITING</h4>
                        <span className={styles.speedTime}>12:45 &ndash; 15:20</span>
                        <p className={styles.speedDesc}>Fast-track 7-minute 1-on-1 interview sessions with partner recruiters.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 15:20 - 15:40 : Closing */}
                <div className={`${styles.matrixRow} ${styles.rowClosing}`}>
                  <div className={styles.cellTime}>
                    <span>03:20 PM</span>
                    <span className={styles.timeSep}>&ndash;</span>
                    <span>03:40 PM</span>
                  </div>
                  <div className={`${styles.cellContent} ${styles.spanAllCols}`}>
                    <div className={styles.eventCardClosing}>
                      <span className={styles.eventPillBlue}>Closing</span>
                      <h4>Closing Ceremony</h4>
                      <p>Closing ceremony &bull; Panel synthesis &bull; Special acknowledgments to partners, sponsors, and organizers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* View 2: Timeline View */}
        {activeTab === "timeline" && (
          <div className={styles.timelineList}>
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 40}>
                <article
                  className={`${styles.timelineCard} ${item.type === "panel" ? styles.isPanel : ""}`}
                  style={{ "--item-accent": item.accent }}
                >
                  <div className={styles.timeCol}>
                    <span className={styles.timeSlot}>{item.timeSlot}</span>
                    <span className={styles.trackBadge}>{item.track}</span>
                    <span
                      className={styles.trackTypePill}
                      style={{
                        color: item.trackType === "b2b" ? "#3B82F6" : item.trackType === "b2c" ? "#0FCDF3" : "#F59E0B",
                        borderColor: item.trackType === "b2b" ? "rgba(59, 130, 246, 0.4)" : item.trackType === "b2c" ? "rgba(15, 205, 243, 0.4)" : "rgba(245, 158, 11, 0.4)"
                      }}
                    >
                      {item.trackType === "b2b" ? "💼 B2B Track" : item.trackType === "b2c" ? "🚀 B2C Track" : "🌟 Full Event"}
                    </span>
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
