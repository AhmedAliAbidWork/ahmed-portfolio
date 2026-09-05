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
import { getProjects, getExperience, getSkillsCategories } from "@/lib/data-service";

// Ensure page always fetches live data from Supabase
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [projects, experience, skillsCategories] = await Promise.all([
    getProjects(),
    getExperience(),
    getSkillsCategories(),
  ]);

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
        <Skills initialCategories={skillsCategories} />

        {/* Selected Projects (Bento Showcase) */}
        <Projects initialProjects={projects} />

        {/* Experience Timeline */}
        <Experience initialExperience={experience} />

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
