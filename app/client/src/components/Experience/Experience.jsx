import styles from "./Experience.module.css";
import SectionHead from "../SectionHead/SectionHead.jsx";
import Reveal from "../Reveal/Reveal.jsx";
import Card from "../Card/Card.jsx";
import { MicIcon, ToolsIcon, BoothIcon, PeopleIcon } from "../Icons.jsx";
import { EXPERIENCE } from "../../data/content.js";

const ICONS = { mic: MicIcon, tools: ToolsIcon, booth: BoothIcon, people: PeopleIcon };

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <SectionHead
            eyebrow="The experience"
            title="Four ways to live MeetUp Pro"
            sub="Every space of the event is designed with one goal: turn encounters into opportunities."
          />
        </Reveal>
        <div className={styles.grid}>
          {EXPERIENCE.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <Card key={c.index} delay={i * 90}>
                <span className={styles.index}>{c.index}</span>
                <span className={styles.icon}><Icon /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
