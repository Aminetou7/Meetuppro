import Modal from "../Modal/Modal.jsx";
import PassChip from "../PassChip/PassChip.jsx";
import { PhoneIcon, MailIcon } from "../Icons.jsx";
import { CONTACTS } from "../../data/content.js";
import styles from "./PartnerModal.module.css";

export default function PartnerModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="partner-modal-title" closeLabel="Close partnership contacts">
      <div className={styles.chipWrap}><PassChip>Partners &amp; Exhibitors</PassChip></div>
      <h3 className={styles.title} id="partner-modal-title">Partner or exhibit at MeetUp Pro</h3>
      <p className={styles.sub}>Call or write to the organizing team — every partnership or exhibiting request gets an answer within 24 hours.</p>
      <div className={styles.cards}>
        {CONTACTS.map((c) => (
          <div className={styles.card} key={c.email}>
            <img src={c.img} alt={c.name} />
            <div className={styles.info}>
              <strong>{c.name}</strong>
              <span className={styles.role}>{c.role}</span>
              <a href={`tel:${c.tel}`}><PhoneIcon />{c.telLabel}</a>
              <a href={`mailto:${c.email}`}><MailIcon />{c.email}</a>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
