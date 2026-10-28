import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import Button from "../Button/Button.jsx";
import styles from "./Venue.module.css";

const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const HomeIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const CalendarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const CrowdIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const INFO = [
  { Icon: HomeIcon, strong: "Orient Palace Hotel", span: "Avenue Habib Bourguiba, Sousse" },
  { Icon: CalendarIcon, strong: "Saturday, 31 October 2026", span: "08:00 AM – 03:40 PM" },
  { Icon: CrowdIcon, strong: "1,500+ Attendees Expected", span: "Professionals, Entrepreneurs & Youth" },
  { Icon: ClockIcon, strong: "4 Panels • Expo • Job Fair", span: "B2B Meetings • Speed Recruiting" },
];

export default function Venue() {
  return (
    <section className={`section ${styles.venue}`} id="venue">
      <div className="container">
        <SectionHead
          center
          eyebrow="Venue"
          title="Orient Palace — Sousse"
          sub="A prestigious landmark on the Mediterranean coast, Orient Palace sets the perfect stage for MeetUp Pro 2026."
        />
        <Reveal className={styles.grid}>
          <div className={styles.imageWrap}>
            <img
              src="/img/orient_palace.jpg"
              alt="Orient Palace Hotel Sousse — venue of MeetUp Pro 2026"
              className={styles.mainImg}
              loading="lazy"
            />
            <div className={styles.badge}>
              <PinIcon />
              Sousse, Tunisia
            </div>
          </div>
          <div className={styles.details}>
            {INFO.map(({ Icon, strong, span }) => (
              <div className={styles.infoCard} key={strong}>
                <div className={styles.infoIcon}>
                  <Icon />
                </div>
                <div>
                  <strong>{strong}</strong>
                  <span>{span}</span>
                </div>
              </div>
            ))}
            <Button
              as="a"
              variant="ghost"
              href="https://maps.google.com/?q=Orient+Palace+Hotel+Sousse+Tunisia"
              target="_blank"
              rel="noopener"
              className={styles.mapBtn}
            >
              <PinIcon />
              View on Google Maps
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
