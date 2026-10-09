import { useEffect, useState } from "react";
import Modal from "../Modal/Modal.jsx";
import PassChip from "../PassChip/PassChip.jsx";
import Button from "../Button/Button.jsx";
import { Check } from "../Icons.jsx";
import { SECTOR_OPTIONS, GOAL_OPTIONS } from "../../data/content.js";
import styles from "./RegisterModal.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

const FIELDS = ["name", "email", "phone", "organization", "job", "sector", "goal"];

export default function RegisterModal({ open, onClose }) {
  const [values, setValues] = useState({});
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      setValues({});
      setInvalid({});
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  const setField = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setInvalid((inv) => ({ ...inv, [name]: false }));
  };

  const validate = () => {
    const next = {};
    FIELDS.forEach((f) => {
      const val = (values[f] || "").trim();
      let ok = val !== "";
      if (f === "email" && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      next[f] = !ok;
    });
    setInvalid(next);
    return !Object.values(next).some(Boolean);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="register-modal-title" closeLabel="Close registration form">
      {status === "success" ? (
        <div className={styles.success}>
          <span className={styles.successIcon}><Check /></span>
          <h3>Registration received!</h3>
          <p>Thank you for joining MeetUp Pro 2026. Our team will send your confirmation and badge details by e-mail very soon.</p>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.chipWrap}><PassChip>Professional</PassChip></div>
          <h3 id="register-modal-title">Professional registration</h3>
          <p className={styles.sub}>Takes less than two minutes.</p>

          <div className={styles.field}>
            <label htmlFor="f-name">Full name</label>
            <input id="f-name" name="name" type="text" placeholder="Amina Touati" autoComplete="name"
              className={invalid.name ? styles.invalid : ""} value={values.name || ""} onChange={setField("name")} />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="f-email">Email address</label>
              <input id="f-email" name="email" type="email" placeholder="you@company.com" autoComplete="email"
                className={invalid.email ? styles.invalid : ""} value={values.email || ""} onChange={setField("email")} />
            </div>
            <div className={styles.field}>
              <label htmlFor="f-phone">Phone number</label>
              <input id="f-phone" name="phone" type="tel" placeholder="+216 00 000 000" autoComplete="tel"
                className={invalid.phone ? styles.invalid : ""} value={values.phone || ""} onChange={setField("phone")} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="f-org">Company / Organization</label>
              <input id="f-org" name="organization" type="text" placeholder="Company, startup or institution" autoComplete="organization"
                className={invalid.organization ? styles.invalid : ""} value={values.organization || ""} onChange={setField("organization")} />
            </div>
            <div className={styles.field}>
              <label htmlFor="f-job">Job title</label>
              <input id="f-job" name="job" type="text" placeholder="e.g. Marketing Manager" autoComplete="organization-title"
                className={invalid.job ? styles.invalid : ""} value={values.job || ""} onChange={setField("job")} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="f-sector">Sector</label>
            <select id="f-sector" name="sector" className={invalid.sector ? styles.invalid : ""} value={values.sector || ""} onChange={setField("sector")}>
              <option value="" disabled>Select your sector</option>
              {SECTOR_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="f-goal">Main goal at MeetUp Pro 2026</label>
            <select id="f-goal" name="goal" className={invalid.goal ? styles.invalid : ""} value={values.goal || ""} onChange={setField("goal")}>
              <option value="" disabled>Select your main goal</option>
              {GOAL_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <Button type="submit" variant="primary" block className={styles.submit} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Confirm my registration"}
          </Button>
          {status === "error" && <p className={styles.error}>{errorMsg}</p>}
          <p className={styles.legal}>By registering you agree to be contacted about MeetUp Pro 2026.</p>
        </form>
      )}
    </Modal>
  );
}
