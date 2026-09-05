"use client";

import Image from "next/image";
import { ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { portfolioData } from "@/data/portfolio";
import { ProjectItem } from "@/types/portfolio";

interface ProjectsProps {
  initialProjects?: ProjectItem[];
}

export function Projects({ initialProjects }: ProjectsProps = {}) {
  const { projects } = portfolioData;
  const items = initialProjects && initialProjects.length > 0 ? initialProjects : projects.items;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
              03 / Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {projects.title}
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            {projects.subtitle}
          </p>
        </div>

        {/* Bento Grid Container */}
        {/* On desktop: 12-column asymmetric bento layout; on mobile: 1-column stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {items.map((project: ProjectItem, index: number) => {
            // Asymmetric layout span for any number of projects dynamically
            let colSpanClass = "lg:col-span-6";
            if (project.bentoSpan === "large") {
              colSpanClass = "lg:col-span-7";
            } else if (project.bentoSpan === "tall") {
              colSpanClass = "lg:col-span-4";
            } else if (project.bentoSpan === "medium") {
              colSpanClass = "lg:col-span-5";
            } else {
              // Alternating rhythm fallback (7+5, 5+7)
              const posInFour = index % 4;
              colSpanClass = posInFour === 0 || posInFour === 3 ? "lg:col-span-7" : "lg:col-span-5";
            }

            // If it's a single trailing odd item, let it span 12 columns gracefully
            if (index === items.length - 1 && items.length % 2 !== 0 && items.length > 1) {
              colSpanClass = "lg:col-span-12";
            }

            return (
              <article
                key={project.id || `project-${index}`}
                className={`${colSpanClass} group relative flex flex-col rounded-3xl bg-[#0D0F18]/90 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] hover:-translate-y-1`}
              >
                {/* Project Image Preview Container */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#07080D] border-b border-white/[0.06]">
                  {(() => {
                    const isValid = project.image && (project.image.startsWith("/") || project.image.startsWith("http"));
                    const src = isValid ? project.image : "/projects/evo-signal.svg";
                    return (
                      <Image
                        src={src}
                        alt={`${project.title} interface preview`}
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        priority={index < 2}
                        unoptimized
                      />
                    );
                  })()}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F18] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Featured Case Study
                      </span>
                    )}
                    {project.metrics && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/60 border border-white/10 text-emerald-300 backdrop-blur-md ml-auto">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {project.metrics}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Project Tagline */}
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      {project.tagline}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Problem Solved highlight */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                      <span className="text-cyan-400 font-semibold mr-1 font-mono">Impact:</span>
                      {project.problemSolved}
                    </div>
                  </div>

                  {/* Tech Stack and Links Footer */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.06] rounded-md group-hover:border-cyan-500/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        aria-label={`Live Demo of ${project.title}`}
                      >
                        Live Demo
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                        aria-label={`GitHub source code for ${project.title}`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* GitHub Work Callout */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            Looking for more experiments, CLI utilities, and open-source packages?{" "}
            <a
              href="#github"
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 decoration-cyan-400/40"
            >
              Explore my GitHub repositories below
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
