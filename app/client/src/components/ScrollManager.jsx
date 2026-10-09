import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    const id = hash.slice(1);
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // Element may not be mounted yet on cross-page anchor navigation.
    go();
    const t = setTimeout(go, 80);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
