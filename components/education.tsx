import { GraduationCap, Award, ExternalLink, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
            05 / Background
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {education.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Degrees Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Academic Degrees
            </h3>

            {education.degrees.map((deg) => (
              <div
                key={deg.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-base font-bold text-white leading-snug">
                    {deg.degree}
                  </h4>
                  <span className="text-xs font-mono text-slate-400 shrink-0">
                    {deg.period}
                  </span>
                </div>

                <p className="text-sm font-medium text-cyan-400 mb-2">
                  {deg.institution}
                </p>

                {deg.honors && (
                  <p className="text-xs font-mono text-emerald-300/90 mb-3">
                    {deg.honors}
                  </p>
                )}

                {deg.highlights && deg.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs text-slate-400">
                    {deg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              Certifications &amp; Training
            </h3>

            <div className="space-y-3">
              {education.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/30 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {cert.issuer} • {cert.issueDate}
                    </p>
                  </div>
                  {cert.credentialUrl && cert.credentialUrl !== "#" && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                      aria-label={`View ${cert.title} credential`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
