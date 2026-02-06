import { useRef } from "react";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Lightning from "./Lightning";

export default function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const eduRef = useRef(null);
  const skillsRef = useRef(null);
  const projectRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden w-full">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Lightning
          hue={260}
          xOffset={0}
          speed={1}
          intensity={1}
          size={1}
        />
      </div>

      <Navbar
        scrollTo={scrollTo}
        refs={{ homeRef, aboutRef, eduRef, skillsRef, projectRef, contactRef }}
      />

      <div>
        <div ref={homeRef}><Home scrollToProjects={() => scrollTo(projectRef)} scrollToContact={() => scrollTo(contactRef)}/></div>
        <div ref={aboutRef}><About scrollToContact={() => scrollTo(contactRef)} /></div>
        <div ref={eduRef}><Education /></div>
        <div ref={skillsRef}><Skills /></div>
        <div ref={projectRef}><Projects /></div>
        <div ref={contactRef}><Contact /></div>
      </div>
    </div>
  );
}
