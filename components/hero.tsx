"use client";

import { useState } from "react";
import { 
  ArrowDown, 
  ArrowRight, 
  Mail, 
  Phone,
  Copy, 
  Check, 
  Terminal,
  Sparkles
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { portfolioData } from "@/data/portfolio";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const { personal } = portfolioData;

  const handleCopyContact = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 mb-6 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-300 font-mono tracking-wide">
              {personal.status}
            </span>
          </div>

          {/* Intro & Name Heading */}
          <div className="space-y-3 mb-6">
            <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-cyan-400 font-medium">
              Hi, I'm {personal.name}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Building digital experiences that are{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                fast, beautiful,
              </span>{" "}
              and useful.
            </h1>
          </div>

          {/* Short Bio */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
            {personal.shortBio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] rounded-xl transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Let's Connect
            </a>
          </div>

          {/* Social & Contact Links */}
          <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06] w-full max-w-md">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
              Reach me on:
            </span>
            <div className="flex items-center gap-3">
              <a
                href={personal.socials.find(s => s.icon === "linkedin")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg border border-transparent hover:border-white/[0.1] transition-all"
                aria-label="Ahmed Ali Abid LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg border border-transparent hover:border-white/[0.1] transition-all"
                aria-label="Email Ahmed Ali Abid"
              >
                <Mail className="w-4 h-4" />
              </a>
              {personal.phone && (
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg border border-transparent hover:border-white/[0.1] transition-all"
                  aria-label="Call Ahmed Ali Abid"
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
              <a
                href={personal.socials.find(s => s.icon === "github")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg border border-transparent hover:border-white/[0.1] transition-all"
                aria-label="Ahmed Ali Abid GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Elegant Interactive Terminal / Visual Element */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <div className="w-full max-w-md rounded-2xl bg-[#0D0F18]/90 border border-white/[0.1] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_20px_70px_-15px_rgba(6,182,212,0.15)] group">
            
            {/* Terminal Header Bar */}
            <div className="px-4 py-3 bg-[#131622] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  ahmed_profile.dart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyContact}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/[0.08] rounded border border-white/[0.06] transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Terminal Code Body */}
            <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2">
              <p className="text-slate-500">// Lead Mobile Engineer &amp; Architect</p>
              
              <div className="pl-0">
                <span className="text-indigo-400">final</span>{" "}
                <span className="text-cyan-300">leadEngineer</span> = Developer(
              </div>

              <div className="pl-4 space-y-1">
                <div>
                  <span className="text-slate-400">name:</span>{" "}
                  <span className="text-amber-200">"Ahmed Ali Abid"</span>,
                </div>
                <div>
                  <span className="text-slate-400">role:</span>{" "}
                  <span className="text-emerald-300">"Team Lead &amp; FlutterFlow Specialist"</span>,
                </div>
                <div>
                  <span className="text-slate-400">experience:</span>{" "}
                  <span className="text-cyan-200">"3.9+ Years"</span>,
                </div>
                <div>
                  <span className="text-slate-400">shippedApps:</span>{" "}
                  <span className="text-amber-300">15</span>,
                </div>
                <div>
                  <span className="text-slate-400">teamMentored:</span>{" "}
                  <span className="text-emerald-400">"1 to 18+ Developers"</span>,
                </div>
                <div>
                  <span className="text-slate-400">coreStack:</span> [
                  <span className="text-cyan-300">"Flutter"</span>,{" "}
                  <span className="text-cyan-300">"FlutterFlow"</span>,{" "}
                  <span className="text-cyan-300">"Firebase"</span>,{" "}
                  <span className="text-cyan-300">"Supabase"</span>],
                </div>
                <div>
                  <span className="text-slate-400">location:</span>{" "}
                  <span className="text-slate-300">"Sialkot, Pakistan / Remote"</span>
                </div>
              </div>

              <div>);</div>

              <div className="pt-2 border-t border-white/[0.06] text-slate-400 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-cyan-400/90">
                  <Sparkles className="w-3.5 h-3.5" />
                  FlutterFlow Retail Expert Certified
                </span>
                <span className="text-slate-500 font-mono">Dart 3.x</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
