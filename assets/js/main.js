(function () {
  "use strict";

  /* ---------- Header ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");
  const setMenu = (open) => {
    burger.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("locked", open);
  };
  burger.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Editions dropdown ---------- */
  const navDrop = document.querySelector(".nav-drop");
  const navDropTrigger = navDrop.querySelector(".nav-drop-trigger");
  const setDrop = (open) => {
    navDrop.classList.toggle("open", open);
    navDropTrigger.setAttribute("aria-expanded", String(open));
  };
  navDropTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    setDrop(!navDrop.classList.contains("open"));
  });
  navDrop.querySelectorAll(".nav-drop-menu a").forEach((a) => a.addEventListener("click", () => setDrop(false)));
  document.addEventListener("click", (e) => {
    if (navDrop.classList.contains("open") && !navDrop.contains(e.target)) setDrop(false);
  });

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Reveal on scroll (with stagger inside groups) ---------- */
  document.querySelectorAll(".reveal").forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    if (siblings.length > 1) el.style.transitionDelay = siblings.indexOf(el) * 90 + "ms";
  });
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterObserver.unobserve(el);
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-US");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Speakers rail ---------- */
  const rail = document.getElementById("speaker-rail");
  const step = () => rail.querySelector(".speaker-card").offsetWidth + 20;
  document.getElementById("rail-prev").addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));
  document.getElementById("rail-next").addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".acc-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".acc-item.open").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Modals ---------- */
  const modal = document.getElementById("register-modal");
  const partnerModal = document.getElementById("partner-modal");
  const chooseModal = document.getElementById("choose-modal");
  const form = document.getElementById("register-form");
  const success = document.getElementById("modal-success");
  let lastFocus = null;

  const anyModalOpen = () => [modal, partnerModal, chooseModal].some((m) => m.classList.contains("open"));
  const showModal = (m) => {
    m.classList.add("open");
    m.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
  };
  const hideModal = (m) => {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
    if (!anyModalOpen()) document.body.classList.remove("locked");
  };

  const openModal = () => {
    lastFocus = document.activeElement;
    form.hidden = false;
    success.hidden = true;
    form.querySelectorAll(".invalid").forEach((i) => i.classList.remove("invalid"));
    showModal(modal);
    setTimeout(() => document.getElementById("f-name").focus(), 260);
  };
  const closeModal = () => {
    hideModal(modal);
    if (lastFocus) lastFocus.focus();
  };
  const openPartnerModal = () => {
    lastFocus = document.activeElement;
    showModal(partnerModal);
  };
  const closePartnerModal = () => {
    hideModal(partnerModal);
    if (lastFocus) lastFocus.focus();
  };
  const openChooseModal = () => {
    lastFocus = document.activeElement;
    showModal(chooseModal);
  };
  const closeChooseModal = () => {
    hideModal(chooseModal);
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll("[data-open-modal]").forEach((btn) =>
    btn.addEventListener("click", () => {
      setMenu(false);
      openModal();
    })
  );
  document.querySelectorAll("[data-open-partner]").forEach((btn) =>
    btn.addEventListener("click", () => {
      setMenu(false);
      openPartnerModal();
    })
  );
  document.querySelectorAll("[data-open-choose]").forEach((btn) =>
    btn.addEventListener("click", () => {
      setMenu(false);
      openChooseModal();
    })
  );
  modal.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  partnerModal.querySelectorAll("[data-close-partner]").forEach((el) => el.addEventListener("click", closePartnerModal));
  chooseModal.querySelectorAll("[data-close-choose]").forEach((el) => el.addEventListener("click", closeChooseModal));
  chooseModal.querySelector('[data-choose="professional"]').addEventListener("click", () => {
    closeChooseModal();
    openModal();
  });
  chooseModal.querySelector('[data-choose="youth"]').addEventListener("click", () => closeChooseModal());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal.classList.contains("open")) closeModal();
      else if (partnerModal.classList.contains("open")) closePartnerModal();
      else if (chooseModal.classList.contains("open")) closeChooseModal();
      else if (mobileMenu.classList.contains("open")) setMenu(false);
      else if (navDrop.classList.contains("open")) setDrop(false);
    }
  });

  /* Simple front-end validation; wire your real form / endpoint here later */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("input[required], select[required]").forEach((input) => {
      const ok = input.value.trim() !== "" && input.checkValidity();
      input.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;
    form.hidden = true;
    success.hidden = false;
  });
  form.querySelectorAll("input, select").forEach((input) => {
    const evt = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(evt, () => input.classList.remove("invalid"));
  });

  /* ---------- Hero video ---------- */
  const video = document.querySelector(".hero-video");
  if (video) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
