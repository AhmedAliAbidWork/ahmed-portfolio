"use client";

import { useState } from "react";
import { 
  Code2, 
  Server, 
  Wrench, 
  Sparkles,
  Layers,
  Database,
  Cpu,
  Globe,
  Terminal,
  Palette,
  Box,
  GitBranch,
  Flame,
  Layout,
  FileCode2,
  Binary,
  HardDrive,
  ArrowLeftRight
} from "lucide-react";
import { GithubIcon, FigmaIcon } from "@/components/icons";
import { portfolioData } from "@/data/portfolio";
import { SkillItem } from "@/types/portfolio";

// Map icon names from portfolioData to Lucide components
const skillIconMap: Record<string, any> = {
  Atom: Sparkles,
  Globe: Globe,
  FileCode2: FileCode2,
  Code2: Code2,
  Palette: Palette,
  Layout: Layout,
  Flame: Flame,
  Sparkles: Sparkles,
  Server: Server,
  Cpu: Cpu,
  ArrowLeftRight: ArrowLeftRight,
  Database: Database,
  HardDrive: HardDrive,
  Binary: Binary,
  GitBranch: GitBranch,
  Github: GithubIcon,
  Box: Box,
  Figma: FigmaIcon,
  Terminal: Terminal
};

export function Skills() {
  const { skills } = portfolioData;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const activeCategory = skills.categories[selectedCategoryIndex];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
              02 / Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {skills.title}
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            {skills.subtitle}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0D0F18] border border-white/[0.08] mb-10 w-fit">
          {skills.categories.map((category, idx) => {
            const isSelected = selectedCategoryIndex === idx;
            return (
              <button
                key={category.title}
                type="button"
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Active Category Overview */}
        <div className="mb-8">
          <p className="text-slate-300 text-sm font-medium">
            {activeCategory.description}
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeCategory.skills.map((skill: SkillItem, idx: number) => {
            const IconComponent = skillIconMap[skill.iconName] || Code2;
            return (
              <div
                key={skill.name}
                className="group relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/35 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#111420] border border-white/[0.08] group-hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 transition-colors">
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    {skill.level && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                        {skill.level}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h4>
                </div>

                {skill.featured && (
                  <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-cyan-400/80 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    Primary Stack
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* All Categories Quick Overview Summary Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0D0F18]/80 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-mono text-slate-300">
              Zero bloat. High focus on type-safety, maintainability, and clean architecture.
            </span>
          </div>
          <a
            href="#projects"
            className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0"
          >
            See how these are applied ▹
          </a>
        </div>

      </div>
    </section>
  );
}
