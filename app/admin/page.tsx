"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Layers, 
  Briefcase, 
  Code2, 
  Mail, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Sparkles, 
  RefreshCw,
  Eye,
  Star,
  Database,
  ArrowUpRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "experience" | "skills" | "messages">("overview");
  
  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [dbSource, setDbSource] = useState<string>("fallback");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states for modals/drawers
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    tagline: "",
    description: "",
    problem_solved: "",
    technologies: "",
    metrics: "",
    github_url: "",
    live_url: "",
    image_url: "/projects/evo-signal.svg",
    featured: false,
    bento_span: "medium",
    sort_order: 1,
  });

  const [showAddExperience, setShowAddExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    period: "",
    location: "Sialkot, Pakistan",
    type: "Full-Time",
    description: "",
    technologies: "",
    is_current: false,
    sort_order: 1,
  });

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: "App Development",
    name: "",
    level: "Expert",
    icon_name: "Code2",
    featured: true,
    sort_order: 1,
  });

  // Load dashboard data
  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, expRes, skillRes, msgRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/experience"),
        fetch("/api/admin/skills"),
        fetch("/api/admin/messages"),
      ]);

      if (projRes.status === 401) {
        router.push("/login");
        return;
      }

      const [projData, expData, skillData, msgData] = await Promise.all([
        projRes.json(),
        expRes.json(),
        skillRes.json(),
        msgRes.json(),
      ]);

      setProjects(projData.data || []);
      setDbSource(projData.source || "fallback");
      setExperience(expData.data || []);
      setSkills(skillData.data || []);
      setMessages(msgData.data || []);
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setFeedback({ type: "error", text: "Failed to load dashboard data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFeedback({ type: "success", text: "Project added successfully!" });
      setShowAddProject(false);
      setNewProject({
        title: "",
        tagline: "",
        description: "",
        problem_solved: "",
        technologies: "",
        metrics: "",
        github_url: "",
        live_url: "",
        image_url: "/projects/evo-signal.svg",
        featured: false,
        bento_span: "medium",
        sort_order: projects.length + 1,
      });
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to add project." });
    }
  };

  const handleDeleteProject = async (id: string, slug?: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}&slug=${slug || ""}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setFeedback({ type: "success", text: "Project deleted." });
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleCreateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExperience),
      });
      if (!res.ok) throw new Error("Failed to add experience");

      setFeedback({ type: "success", text: "Experience record added!" });
      setShowAddExperience(false);
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setFeedback({ type: "success", text: "Experience deleted." });
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });
      if (!res.ok) throw new Error("Failed to add skill");

      setFeedback({ type: "success", text: "Skill added successfully!" });
      setShowAddSkill(false);
      setNewSkill({ ...newSkill, name: "" });
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setFeedback({ type: "success", text: "Skill deleted." });
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setFeedback({ type: "success", text: "Message removed." });
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0C14] px-4 sm:px-8 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-mono text-sm font-bold">
              AA
            </span>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Ahmed Ali Abid
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Admin Dashboard</span>
                <span>•</span>
                <span className={`inline-flex items-center gap-1 ${
                  dbSource === "database" ? "text-emerald-400" : "text-amber-400"
                }`}>
                  <Database className="w-3 h-3" />
                  {dbSource === "database" ? "Supabase Live" : "Local Fallback"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              View Live Site
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/20 text-xs font-mono text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        
        {/* Alerts / Feedback */}
        {feedback && (
          <div className={`p-4 rounded-xl border mb-6 text-sm flex items-center justify-between ${
            feedback.type === "success" 
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/40 border-rose-500/40 text-rose-300"
          }`}>
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.text}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setFeedback(null)} 
              className="text-xs font-mono underline hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "projects"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Projects ({projects.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "experience"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Experience ({experience.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "skills"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Skills ({skills.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "messages"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Inquiries ({messages.length})
          </button>

          <button
            type="button"
            onClick={loadData}
            className="ml-auto p-2 text-slate-400 hover:text-cyan-400 rounded-lg bg-white/[0.02] border border-white/[0.06]"
            title="Refresh dashboard data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>

        {/* ===================== TAB: OVERVIEW ===================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-[#0D0F18] border border-white/[0.08]">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Projects</span>
                  <Layers className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{projects.length}</div>
                <p className="text-xs text-slate-500 mt-1">Featured showcases</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D0F18] border border-white/[0.08]">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Experience</span>
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{experience.length}</div>
                <p className="text-xs text-slate-500 mt-1">Timeline milestones</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D0F18] border border-white/[0.08]">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Skills</span>
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{skills.length}</div>
                <p className="text-xs text-slate-500 mt-1">Technologies logged</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0D0F18] border border-white/[0.08]">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Inquiries</span>
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{messages.length}</div>
                <p className="text-xs text-slate-500 mt-1">Contact form messages</p>
              </div>
            </div>

            {/* Supabase Connection Setup Guide Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F18] border border-white/[0.08]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Supabase PostgreSQL Cloud Backend
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                    Your portfolio is architected with a resilient dual-mode data layer. When Supabase keys are configured in your Vercel Project Settings or <code className="text-cyan-300 font-mono">.env.local</code>, it syncs live changes across PostgreSQL. When keys are empty, it runs flawlessly from local seed files.
                  </p>
                  
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
                      Schema: <code className="text-cyan-300">supabase-schema.sql</code> included
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
                      Hosting: 100% Free on Vercel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: PROJECTS ===================== */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Selected Work &amp; Projects</h2>
                <p className="text-xs text-slate-400">Add, edit, or remove showcase applications</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddProject(!showAddProject)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                {showAddProject ? "Cancel" : "Add Project"}
              </button>
            </div>

            {/* Add Project Form Drawer */}
            {showAddProject && (
              <form onSubmit={handleCreateProject} className="p-6 rounded-2xl bg-[#0E111C] border border-cyan-500/30 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold">New Project Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. CryptoTrack Pro"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={newProject.tagline}
                      onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                      placeholder="e.g. Real-time Crypto Analytics &amp; Wallet Sync"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe what this app does..."
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Problem Solved / Impact</label>
                  <input
                    type="text"
                    value={newProject.problem_solved}
                    onChange={(e) => setNewProject({ ...newProject, problem_solved: e.target.value })}
                    placeholder="Key impact or problem solved..."
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      placeholder="Flutter, Firebase, Dart, Stripe"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Metrics (badge text)</label>
                    <input
                      type="text"
                      value={newProject.metrics}
                      onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                      placeholder="e.g. 10k+ MAU • 99.9% Uptime"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Image URL / SVG Path</label>
                    <input
                      type="text"
                      value={newProject.image_url}
                      onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                      placeholder="/projects/evo-signal.svg"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={newProject.github_url}
                      onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Live Demo / App Store URL</label>
                    <input
                      type="text"
                      value={newProject.live_url}
                      onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                      placeholder="https://apps.apple.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                      className="rounded bg-black/40 border-white/20 text-cyan-400 focus:ring-0"
                    />
                    Featured Project
                  </label>

                  <button
                    type="submit"
                    className="ml-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* Projects Table */}
            <div className="rounded-2xl bg-[#0D0F18] border border-white/[0.08] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-[#121522] text-xs font-mono uppercase text-slate-400 border-b border-white/[0.08]">
                    <tr>
                      <th className="px-6 py-4">Title &amp; Tagline</th>
                      <th className="px-6 py-4">Technologies</th>
                      <th className="px-6 py-4">Metrics</th>
                      <th className="px-6 py-4">Featured</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {projects.map((proj) => (
                      <tr key={proj.id || proj.slug} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{proj.title}</div>
                          <div className="text-xs text-slate-400 font-mono truncate max-w-xs">{proj.tagline}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {(proj.technologies || []).slice(0, 3).map((t: string) => (
                              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300">
                                {t}
                              </span>
                            ))}
                            {(proj.technologies || []).length > 3 && (
                              <span className="text-[10px] text-slate-500 font-mono">+{(proj.technologies || []).length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-emerald-300">
                          {proj.metrics || "—"}
                        </td>
                        <td className="px-6 py-4">
                          {proj.featured ? (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-mono">
                              <Star className="w-3.5 h-3.5 fill-amber-400" /> Yes
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 font-mono">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj.id, proj.slug)}
                            className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: EXPERIENCE ===================== */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Career Timeline &amp; Experience</h2>
                <p className="text-xs text-slate-400">Manage companies, roles, and achievements</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddExperience(!showAddExperience)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                {showAddExperience ? "Cancel" : "Add Experience"}
              </button>
            </div>

            {/* Add Experience Form */}
            {showAddExperience && (
              <form onSubmit={handleCreateExperience} className="p-6 rounded-2xl bg-[#0E111C] border border-cyan-500/30 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold">New Experience Role</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      placeholder="e.g. Patronecs"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Position / Role</label>
                    <input
                      type="text"
                      required
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                      placeholder="e.g. Senior Mobile Lead"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Period (Date duration)</label>
                    <input
                      type="text"
                      required
                      value={newExperience.period}
                      onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                      placeholder="e.g. 2024 — Present"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Achievements / Responsibilities (one per line)</label>
                  <textarea
                    rows={4}
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    placeholder="Led architecture redesign...&#10;Scaled mobile engineering team..."
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Technologies Used (comma separated)</label>
                    <input
                      type="text"
                      value={newExperience.technologies}
                      onChange={(e) => setNewExperience({ ...newExperience, technologies: e.target.value })}
                      placeholder="Flutter, Dart, Firebase, Supabase"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newExperience.is_current}
                        onChange={(e) => setNewExperience({ ...newExperience, is_current: e.target.checked })}
                        className="rounded bg-black/40 border-white/20 text-cyan-400"
                      />
                      Current Active Role
                    </label>

                    <button
                      type="submit"
                      className="ml-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider"
                    >
                      Save Role
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Experience List */}
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 rounded-2xl bg-[#0D0F18] border border-white/[0.08] flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-white">{exp.position}</h3>
                      <span className="text-xs font-mono text-cyan-400">@{exp.company}</span>
                      {exp.is_current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-slate-400">{exp.period} • {exp.location}</div>
                    <ul className="space-y-1 text-xs text-slate-300 pt-2">
                      {(exp.description || []).map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg shrink-0"
                    title="Delete role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: SKILLS ===================== */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Skills &amp; Technologies</h2>
                <p className="text-xs text-slate-400">Manage technical proficiencies and categories</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                {showAddSkill ? "Cancel" : "Add Skill"}
              </button>
            </div>

            {/* Add Skill Form */}
            {showAddSkill && (
              <form onSubmit={handleCreateSkill} className="p-6 rounded-2xl bg-[#0E111C] border border-cyan-500/30 flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  >
                    <option value="App Development">App Development</option>
                    <option value="Backend &amp; Database">Backend &amp; Database</option>
                    <option value="APIs &amp; Security">APIs &amp; Security</option>
                    <option value="Tools &amp; Leadership">Tools &amp; Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="e.g. WebSockets"
                    className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Proficiency Level</label>
                  <select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Save Skill
                </button>
              </form>
            )}

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div key={skill.id || skill.name} className="p-4 rounded-xl bg-[#0D0F18] border border-white/[0.08] flex items-center justify-between group">
                  <div>
                    <div className="text-sm font-semibold text-white">{skill.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{skill.category} • {skill.level}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-rose-400 hover:text-rose-300 transition-opacity"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: MESSAGES ===================== */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Client &amp; Recruiter Inquiries</h2>
              <p className="text-xs text-slate-400">Messages received through your portfolio contact form</p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#0D0F18] border border-white/[0.08] text-slate-500 font-mono text-xs">
                  No inquiries received yet. Submissions from the contact form will appear here live.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="p-6 rounded-2xl bg-[#0D0F18] border border-white/[0.08] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                      <div>
                        <div className="text-base font-bold text-white">{msg.name}</div>
                        <a href={`mailto:${msg.email}`} className="text-xs font-mono text-cyan-400 hover:underline">
                          {msg.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-500">
                          {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                          className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono inline-flex items-center gap-1 hover:bg-cyan-900/50"
                        >
                          Reply <ArrowUpRight className="w-3 h-3" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {msg.subject && (
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Subject: {msg.subject}
                      </div>
                    )}

                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
