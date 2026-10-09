import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header/Header.jsx";
import MobileMenu from "./components/MobileMenu/MobileMenu.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollManager from "./components/ScrollManager.jsx";
import RegisterModal from "./components/RegisterModal/RegisterModal.jsx";
import PartnerModal from "./components/PartnerModal/PartnerModal.jsx";
import ChooseModal from "./components/ChooseModal/ChooseModal.jsx";
import Home from "./pages/Home.jsx";
import Edition30 from "./pages/Edition30.jsx";
import Edition20 from "./pages/Edition20.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // "register" | "partner" | "choose" | null

  const closeMenu = () => setMenuOpen(false);
  const closeModal = () => setModal(null);
  const openModal = (name) => { closeMenu(); setModal(name); };

  return (
    <>
      <ScrollManager />
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

      <Routes>
        <Route path="/" element={<Home onOpenRegister={() => openModal("register")} onOpenPartner={() => openModal("partner")} />} />
        <Route path="/editions/3.0" element={<Edition30 onOpenRegister={() => openModal("register")} />} />
        <Route path="/editions/2.0" element={<Edition20 onOpenRegister={() => openModal("register")} />} />
        <Route path="*" element={<Home onOpenRegister={() => openModal("register")} onOpenPartner={() => openModal("partner")} />} />
      </Routes>

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
