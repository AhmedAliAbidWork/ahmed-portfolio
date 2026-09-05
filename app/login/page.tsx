"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ArrowLeft, ShieldAlert, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect admin password");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Portfolio
        </Link>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#0D0F18]/90 border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Ahmed Ali Abid • Portfolio Control Center
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 mb-6">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300"
              >
                Access Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] focus:border-cyan-500/80 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Enter Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
            <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400/70" />
              Password set via <code className="text-slate-400">ADMIN_ACCESS_PASSWORD</code>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
