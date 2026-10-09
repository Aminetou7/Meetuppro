import { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header.jsx";
import MobileMenu from "./components/MobileMenu/MobileMenu.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import Stats from "./components/Stats/Stats.jsx";
import About from "./components/About/About.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Edition from "./components/Edition/Edition.jsx";
import Program from "./components/Program/Program.jsx";
import Agenda from "./components/Agenda/Agenda.jsx";
import Speakers from "./components/Speakers/Speakers.jsx";
import Partners from "./components/Partners/Partners.jsx";
import Faq from "./components/FAQ/FAQ.jsx";
import FinalCTA from "./components/FinalCTA/FinalCTA.jsx";
import Footer from "./components/Footer/Footer.jsx";
import RegisterModal from "./components/RegisterModal/RegisterModal.jsx";
import PartnerModal from "./components/PartnerModal/PartnerModal.jsx";
import ChooseModal from "./components/ChooseModal/ChooseModal.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // "register" | "partner" | "choose" | null

  const closeMenu = () => setMenuOpen(false);
  const closeModal = () => setModal(null);
  const openModal = (name) => { closeMenu(); setModal(name); };

  return (
    <>
      <a className={styles.skipLink} href="#main">Skip to content</a>

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onOpenPartner={() => openModal("partner")}
        onOpenChoose={() => openModal("choose")}
      />

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        onOpenChoose={() => openModal("choose")}
        onOpenPartner={() => openModal("partner")}
      />

      <main id="main">
        <Hero onOpenRegister={() => openModal("register")} />
        <Marquee />
        <Stats />
        <About />
        <Experience />
        <Edition />
        <Program />
        <Agenda />
        <Speakers />
        <Partners onOpenPartner={() => openModal("partner")} />
        <Faq />
        <FinalCTA onOpenRegister={() => openModal("register")} />
      </main>

      <Footer onOpenRegister={() => openModal("register")} />

      <RegisterModal open={modal === "register"} onClose={closeModal} />
      <PartnerModal open={modal === "partner"} onClose={closeModal} />
      <ChooseModal
        open={modal === "choose"}
        onClose={closeModal}
        onChooseProfessional={() => setModal("register")}
      />
    </>
  );
}
