import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ForecastDemo from "@/components/ForecastDemo";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Projects />
      <ForecastDemo />
      <Experience />
      <Contact />
    </main>
  );
}
