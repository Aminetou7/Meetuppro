import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "../Icons.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Modal({ open, onClose, labelledBy, closeLabel = "Close", children }) {
  const cardRef = useRef(null);
  const lastFocus = useRef(null);

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.classList.add("locked");
    else document.body.classList.remove("locked");
    return () => document.body.classList.remove("locked");
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      const t = setTimeout(() => {
        const focusable = cardRef.current?.querySelector(
          "input, select, textarea, button:not([aria-label='Close']), a[href]"
        );
        (focusable || cardRef.current)?.focus?.();
      }, 260);
      return () => clearTimeout(t);
    } else if (lastFocus.current) {
      lastFocus.current.focus?.();
      lastFocus.current = null;
    }
  }, [open]);

  // Escape to close + Tab focus trap
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    const onTab = (e) => {
      if (e.key !== "Tab") return;
      const nodes = cardRef.current?.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onEsc);
    document.addEventListener("keydown", onTab);
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.removeEventListener("keydown", onTab);
    };
  }, [open, onClose]);

  return (
    <div
      className={cx(styles.modal, open && styles.open)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
    >
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.card} ref={cardRef} tabIndex={-1}>
        <button className={styles.close} onClick={onClose} aria-label={closeLabel}><CloseIcon /></button>
        {children}
      </div>
    </div>
  );
}
