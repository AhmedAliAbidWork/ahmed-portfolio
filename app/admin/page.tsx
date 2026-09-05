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
  ArrowUpRight,
  Pencil,
  X,
  MailCheck,
  MailOpen,
  Copy,
  Check,
  Inbox
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

  // Inquiries filter & copy states
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "read">("all");
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  // Edit states
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingExperience, setEditingExperience] = useState<any | null>(null);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);

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

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFeedback({ type: "success", text: "Project updated successfully!" });
      setEditingProject(null);
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to update project." });
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

  const handleUpdateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    try {
      const res = await fetch("/api/admin/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExperience),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFeedback({ type: "success", text: "Experience record updated!" });
      setEditingExperience(null);
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to update experience." });
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

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    try {
      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSkill),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFeedback({ type: "success", text: "Skill updated successfully!" });
      setEditingSkill(null);
      loadData();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to update skill." });
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

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: !currentRead }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !currentRead } : m))
      );
      setFeedback({
        type: "success",
        text: !currentRead ? "Inquiry marked as read." : "Inquiry marked as unread.",
      });
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleCopySenderEmail = (id: string, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmailId(id);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const filteredMessages = messages.filter((m) => {
    if (inquiryFilter === "unread") return !m.is_read;
    if (inquiryFilter === "read") return Boolean(m.is_read);
    return true;
  });

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
            <span>Inquiries ({messages.length})</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold">
                {unreadCount} new
              </span>
            )}
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
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white font-mono">{messages.length}</div>
                  {unreadCount > 0 && (
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      ({unreadCount} unread)
                    </span>
                  )}
                </div>
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
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingProject({
                                ...proj,
                                technologies: Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies || ""
                              })}
                              className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg transition-colors"
                              title="Edit project"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(proj.id, proj.slug)}
                              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingExperience({
                        ...exp,
                        description: Array.isArray(exp.description) ? exp.description.join("\n") : exp.description || "",
                        technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : exp.technologies || ""
                      })}
                      className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg transition-colors"
                      title="Edit role"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                      title="Delete role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setEditingSkill({ ...skill })}
                      className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-colors"
                      title="Edit skill"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: MESSAGES ===================== */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Client &amp; Recruiter Inquiries</span>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {unreadCount} unread
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400">
                  Direct messages submitted through your portfolio contact form
                </p>
              </div>

              {/* Inquiries Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setInquiryFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    inquiryFilter === "all"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  All ({messages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter("unread")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    inquiryFilter === "unread"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter("read")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    inquiryFilter === "read"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Read ({messages.length - unreadCount})
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#0D0F18] border border-white/[0.08] text-slate-400 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-500">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-white">No inquiries found</h3>
                  <p className="text-xs font-mono text-slate-500 max-w-sm mx-auto">
                    {inquiryFilter === "unread"
                      ? "You have caught up on all inquiries! No unread messages."
                      : inquiryFilter === "read"
                      ? "No read messages yet."
                      : "Submissions from your portfolio contact form will appear here in real time."}
                  </p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                      !msg.is_read
                        ? "bg-[#0E1220] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
                        : "bg-[#0D0F18] border-white/[0.08]"
                    } space-y-4`}
                  >
                    {/* Top Row: Sender Info & Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base font-bold text-white">{msg.name}</span>
                          {!msg.is_read ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              NEW
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-500 bg-white/[0.03] border border-white/[0.06]">
                              Read
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono">
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-cyan-400 hover:underline hover:text-cyan-300"
                          >
                            {msg.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopySenderEmail(msg.id, msg.email)}
                            className="p-1 text-slate-400 hover:text-cyan-300 rounded transition-colors"
                            title="Copy email"
                          >
                            {copiedEmailId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Time & Actions */}
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <span className="text-xs font-mono text-slate-500 mr-1">
                          {new Date(msg.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          •{" "}
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {/* Mark Read/Unread Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleRead(msg.id, Boolean(msg.is_read))}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-colors ${
                            !msg.is_read
                              ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-slate-300 hover:text-white"
                              : "bg-cyan-950/30 hover:bg-cyan-950/50 border-cyan-500/30 text-cyan-300"
                          }`}
                          title={!msg.is_read ? "Mark as read" : "Mark as unread"}
                        >
                          {!msg.is_read ? (
                            <>
                              <MailOpen className="w-3.5 h-3.5 text-slate-400" />
                              <span>Mark Read</span>
                            </>
                          ) : (
                            <>
                              <MailCheck className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Mark Unread</span>
                            </>
                          )}
                        </button>

                        {/* Reply Button */}
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                            msg.subject || "Portfolio Inquiry"
                          )}&body=Hi ${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-colors"
                        >
                          <span>Reply</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subject */}
                    {msg.subject && (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Subject:
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-200 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                          {msg.subject}
                        </span>
                      </div>
                    )}

                    {/* Message Body */}
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ===================== EDIT PROJECT MODAL ===================== */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#0D0F18] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Edit Project</h3>
                    <p className="text-xs text-slate-400 font-mono">Updating: {editingProject.title}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingProject.tagline || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.description || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Problem Solved / Impact Highlight</label>
                  <input
                    type="text"
                    value={editingProject.problem_solved || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, problem_solved: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.technologies || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Metrics Highlight Badge</label>
                    <input
                      type="text"
                      value={editingProject.metrics || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, metrics: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      value={editingProject.live_url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={editingProject.github_url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={editingProject.image_url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Bento Grid Span</label>
                    <select
                      value={editingProject.bento_span || "medium"}
                      onChange={(e) => setEditingProject({ ...editingProject, bento_span: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-white/10 text-white text-sm"
                    >
                      <option value="large">Large (7 cols / spotlight)</option>
                      <option value="medium">Medium (5 cols)</option>
                      <option value="tall">Tall (4 cols)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.featured)}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      className="rounded bg-black/40 border-white/20 text-cyan-400 focus:ring-0"
                    />
                    Featured Case Study
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== EDIT EXPERIENCE MODAL ===================== */}
        {editingExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#0D0F18] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Edit Experience Role</h3>
                    <p className="text-xs text-slate-400 font-mono">Updating: {editingExperience.position} @ {editingExperience.company}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingExperience(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateExperience} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={editingExperience.company || ""}
                      onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Position / Title</label>
                    <input
                      type="text"
                      required
                      value={editingExperience.position || ""}
                      onChange={(e) => setEditingExperience({ ...editingExperience, position: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Period</label>
                    <input
                      type="text"
                      required
                      value={editingExperience.period || ""}
                      onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                      placeholder="e.g. 12/2023 — Present"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingExperience.location || ""}
                      onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Key Responsibilities / Bullets (one per line)</label>
                  <textarea
                    rows={4}
                    value={editingExperience.description || ""}
                    onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editingExperience.technologies || ""}
                    onChange={(e) => setEditingExperience({ ...editingExperience, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingExperience.is_current)}
                      onChange={(e) => setEditingExperience({ ...editingExperience, is_current: e.target.checked })}
                      className="rounded bg-black/40 border-white/20 text-cyan-400 focus:ring-0"
                    />
                    Current Active Role
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingExperience(null)}
                      className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== EDIT SKILL MODAL ===================== */}
        {editingSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-[#0D0F18] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Edit Skill</h3>
                    <p className="text-xs text-slate-400 font-mono">{editingSkill.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateSkill} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={editingSkill.category || "App Development"}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-white/10 text-white text-sm"
                  >
                    <option value="App Development">App Development</option>
                    <option value="Backend & Database">Backend &amp; Database</option>
                    <option value="APIs & Security">APIs &amp; Security</option>
                    <option value="Tools & Leadership">Tools &amp; Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={editingSkill.name || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Proficiency Level</label>
                    <select
                      value={editingSkill.level || "Expert"}
                      onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-white/10 text-white text-sm"
                    >
                      <option value="Expert">Expert</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Icon Name</label>
                    <select
                      value={editingSkill.icon_name || "Code2"}
                      onChange={(e) => setEditingSkill({ ...editingSkill, icon_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-white/10 text-white text-sm"
                    >
                      <option value="Code2">Code</option>
                      <option value="Flame">Flame (Firebase/FF)</option>
                      <option value="Atom">Atom (Flutter)</option>
                      <option value="Database">Database</option>
                      <option value="Server">Server</option>
                      <option value="Globe">Globe</option>
                      <option value="ShieldCheck">Shield</option>
                      <option value="Sparkles">Sparkles</option>
                      <option value="GitBranch">Git</option>
                      <option value="Layout">Layout</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingSkill.featured)}
                      onChange={(e) => setEditingSkill({ ...editingSkill, featured: e.target.checked })}
                      className="rounded bg-black/40 border-white/20 text-cyan-400 focus:ring-0"
                    />
                    Featured
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingSkill(null)}
                      className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
