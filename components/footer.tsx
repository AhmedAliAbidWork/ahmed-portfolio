"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#06070B] pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-white font-bold text-lg tracking-tight"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
                AC
              </span>
              {personal.name}
            </a>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {personal.headline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personal.socials.find(s => s.icon === "github")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-cyan-400 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.06] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.find(s => s.icon === "linkedin")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-cyan-400 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.06] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.find(s => s.icon === "twitter")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-cyan-400 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.06] transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="p-2 text-slate-400 hover:text-cyan-400 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.06] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">
                  Skills &amp; Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">
                  Career Experience
                </a>
              </li>
              <li>
                <a href="#github" className="hover:text-cyan-400 transition-colors">
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Colophon / Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Status
              </h4>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open for roles
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Tech Stack Mention */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {personal.name.replace("[PLACEHOLDER] ", "")}. All rights reserved.</span>
            <span>•</span>
            <a href="/login" className="text-slate-600 hover:text-cyan-400 transition-colors" title="Admin Portal">
              Admin
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            Designed &amp; engineered with Next.js &amp; Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
}
