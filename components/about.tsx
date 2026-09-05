import { portfolioData } from "@/data/portfolio";
import { Zap, Sparkles, Layers, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";

const iconMap = {
  zap: Zap,
  sparkles: Sparkles,
  layers: Layers,
  "shield-check": ShieldCheck
};

export function About() {
  const { about, stats, personal } = portfolioData;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
            01 / Introduction
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {about.title}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-slate-400 leading-normal">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Narrative & Principles Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Engineering with purpose, precision, and passion.
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-base">
              {about.intro}
            </p>

            <p className="text-slate-400 leading-relaxed text-base">
              {about.whatIBuild}
            </p>

            {personal.extendedBio && personal.extendedBio.length > 0 && (
              <div className="space-y-4 pt-2">
                {personal.extendedBio.map((paragraph, i) => (
                  <p key={i} className="text-slate-400 leading-relaxed text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Currently Learning / Exploring */}
            <div className="p-5 rounded-xl bg-[#0D0F18] border border-white/[0.08] mt-6">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <BookOpen className="w-4 h-4" />
                What I'm Currently Exploring
              </div>
              <ul className="space-y-2">
                {about.currentlyLearning.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: What I Care About / Principles */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
                What I Value &amp; Prioritize
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.whatICareAbout.map((item, idx) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Link to Projects */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Want to see these principles in practice?
              </span>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
              >
                Explore selected work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
