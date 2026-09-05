import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { ExperienceItem } from "@/types/portfolio";

interface ExperienceProps {
  initialExperience?: ExperienceItem[];
}

export function Experience({ initialExperience }: ExperienceProps = {}) {
  const { experience } = portfolioData;
  const items = initialExperience && initialExperience.length > 0 ? initialExperience : experience.items;

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
            04 / Career
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {experience.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {experience.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-12">
          {items.map((item: ExperienceItem, idx: number) => {
            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline Node Bullet */}
                <div 
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                    item.current
                      ? "bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                      : "bg-[#08090E] border-white/30 group-hover:border-cyan-400 group-hover:bg-cyan-950"
                  }`}
                />

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300">
                  
                  {/* Top Bar: Role, Company, Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.position}
                      </h3>
                      <div className="text-base font-medium text-cyan-400">
                        {item.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-6 text-sm text-slate-300 leading-relaxed">
                    {item.description.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2.5">
                        <span className="text-cyan-400 mt-1 shrink-0 text-xs">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
