import { AmbientBackground } from "@/components/ambient-background";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { GithubSection } from "@/components/github";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#08090E] text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Background Ambience Layer */}
      <AmbientBackground />

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Selected Projects (Bento Showcase) */}
        <Projects />

        {/* Experience Timeline */}
        <Experience />

        {/* Education & Certifications */}
        <Education />

        {/* GitHub / Open Source Activity */}
        <GithubSection />

        {/* Final CTA & Contact Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
