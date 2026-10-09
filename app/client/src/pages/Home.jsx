import Hero from "../components/Hero/Hero.jsx";
import Marquee from "../components/Marquee/Marquee.jsx";
import Stats from "../components/Stats/Stats.jsx";
import About from "../components/About/About.jsx";
import Experience from "../components/Experience/Experience.jsx";
import Program from "../components/Program/Program.jsx";
import Agenda from "../components/Agenda/Agenda.jsx";
import Speakers from "../components/Speakers/Speakers.jsx";
import Partners from "../components/Partners/Partners.jsx";
import Faq from "../components/FAQ/FAQ.jsx";
import FinalCTA from "../components/FinalCTA/FinalCTA.jsx";

export default function Home({ onOpenRegister, onOpenPartner }) {
  return (
    <main id="main">
      <Hero onOpenRegister={onOpenRegister} />
      <Marquee />
      <Stats />
      <About />
      <Experience />
      <Program />
      <Agenda />
      <Speakers />
      <Partners onOpenPartner={onOpenPartner} />
      <Faq />
      <FinalCTA onOpenRegister={onOpenRegister} />
    </main>
  );
}
