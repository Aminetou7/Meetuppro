import Modal from "../Modal/Modal.jsx";
import { BriefcaseIcon, CapIcon } from "../Icons.jsx";
import { YOUTH_LINK, PROFESSIONAL_LINK } from "../../data/content.js";
import styles from "./ChooseModal.module.css";

export default function ChooseModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="choose-modal-title" closeLabel="Close">
      <h3 className={styles.title} id="choose-modal-title">Register for MeetUp Pro</h3>
      <div className={styles.simpleGrid}>
        <a
          className={styles.simpleBtn}
          href={PROFESSIONAL_LINK}
          target="_blank"
          rel="noopener"
          onClick={onClose}
        >
          <BriefcaseIcon />
          Register as Professional
        </a>
        <a
          className={`${styles.simpleBtn} ${styles.simpleBtnYouth}`}
          href={YOUTH_LINK}
          target="_blank"
          rel="noopener"
          onClick={onClose}
        >
          <CapIcon />
          Register as Youth
        </a>
      </div>
    </Modal>
  );
}
