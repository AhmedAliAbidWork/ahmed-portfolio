"use client";

import { useMemo } from "react";
import { Star, GitFork, ExternalLink, Activity, Flame, Award } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { portfolioData } from "@/data/portfolio";

export function GithubSection() {
  const { github } = portfolioData;

  // Generate simulated GitHub contribution matrix (26 columns x 7 days)
  const heatmapData = useMemo(() => {
    const weeks = 24;
    const days = 7;
    const matrix: number[][] = [];

    // Seed pseudo-random reproducible pattern for high-fidelity look
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < days; d++) {
        const val = ((w * 17 + d * 31 + 7) % 100);
        if (val < 25) week.push(0);
        else if (val < 55) week.push(1);
        else if (val < 80) week.push(2);
        else if (val < 92) week.push(3);
        else week.push(4);
      }
      matrix.push(week);
    }
    return matrix;
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-cyan-950 border-cyan-900";
      case 2:
        return "bg-cyan-800 border-cyan-700";
      case 3:
        return "bg-cyan-600 border-cyan-500";
      case 4:
        return "bg-cyan-400 border-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]";
      default:
        return "bg-[#10121D] border-white/[0.04]";
    }
  };

  return (
    <section id="github" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
              06 / Open Source
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Building in Public
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Consistent open source contributions, developer utilities, and architecture experiments.
            </p>
          </div>

          <a
            href={github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-all w-fit group"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            @{github.username}
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Contribution Activity Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F18]/90 border border-white/[0.08] mb-12 shadow-xl">
          
          {/* Top Activity Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 mb-6 border-b border-white/[0.06]">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Contributions (12m)
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {github.stats.contributionsPastYear.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Longest Streak
              </div>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                {github.stats.longestStreak}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-cyan-400" />
                Total Stars
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {github.stats.totalStars}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                Pull Requests
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                {github.stats.totalPullRequests}
              </div>
            </div>
          </div>

          {/* Activity Heatmap Grid Visualization */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[620px]">
              <div className="flex gap-1.5 justify-between">
                {heatmapData.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((level, dIdx) => (
                      <div
                        key={dIdx}
                        className={`w-3.5 h-3.5 rounded-sm border ${getCellColor(level)} transition-transform hover:scale-125 cursor-pointer`}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level > 0 ? `${level * 2} commits` : "No commits"}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between mt-4 text-xs font-mono text-slate-500">
                <span>Learn more about open source activity</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#10121D] border border-white/[0.04]" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-950 border border-cyan-900" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-800 border border-cyan-700" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-600 border border-cyan-500" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 border border-cyan-300" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Selected Repositories Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
            Selected Repositories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {github.repositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <div>
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.05] rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Repo Metrics Footer */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-white">
                        <Star className="w-3 h-3 text-amber-400" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 hover:text-white">
                        <GitFork className="w-3 h-3 text-cyan-400" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
