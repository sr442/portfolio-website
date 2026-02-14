import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ForecastDemo from "@/components/ForecastDemo";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24">
      <Navbar />
      <div id="hero" className="w-full">
        <Hero />
      </div>
      <div id="skills" className="w-full">
        <Skills />
      </div>
      <div id="projects" className="w-full">
        <Projects />
      </div>
      <div id="demo" className="w-full">
        <ForecastDemo />
      </div>
      <div id="experience" className="w-full">
        <Experience />
      </div>
      <div id="contact" className="w-full">
        <Contact />
      </div>
    </main>
  );
}
