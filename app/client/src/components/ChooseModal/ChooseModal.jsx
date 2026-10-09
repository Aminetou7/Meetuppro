import Modal from "../Modal/Modal.jsx";
import PassChip from "../PassChip/PassChip.jsx";
import { BriefcaseIcon, CapIcon, ArrowRight } from "../Icons.jsx";
import { YOUTH_LINK } from "../../data/content.js";
import styles from "./ChooseModal.module.css";

export default function ChooseModal({ open, onClose, onChooseProfessional }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="choose-modal-title" closeLabel="Close pass selection">
      <div className={styles.chipWrap}><PassChip>Registration</PassChip></div>
      <h3 className={styles.title} id="choose-modal-title">How will you join MeetUp Pro 2026?</h3>
      <p className={styles.sub}>Pick the pass that matches you — registration takes less than two minutes.</p>
      <div className={styles.grid}>
        <button type="button" className={styles.card} onClick={onChooseProfessional}>
          <span className={styles.icon}><BriefcaseIcon /></span>
          <strong>Professional</strong>
          <span className={styles.desc}>Companies, entrepreneurs, decision-makers &amp; partners.</span>
          <span className={styles.perks}>Panels · Expo · B2B meetings</span>
          <span className={styles.cta}>Register as Professional <ArrowRight /></span>
        </button>
        <a className={styles.card} href={YOUTH_LINK} target="_blank" rel="noopener" onClick={onClose}>
          <span className={styles.icon}><CapIcon /></span>
          <strong>Youth</strong>
          <span className={styles.desc}>Students, graduates &amp; young talents.</span>
          <span className={styles.perks}>Talks · Workshops · Mentoring</span>
          <span className={styles.cta}>Register as Youth <ArrowRight /></span>
        </a>
      </div>
      <p className={styles.note}>Seats are limited — you&rsquo;ll receive your confirmation by e-mail.</p>
    </Modal>
  );
}
