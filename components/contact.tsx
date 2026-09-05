"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone,
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData } from "@/data/portfolio";

export function Contact() {
  const { contact, personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a brief message.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory micro-interaction confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#06B6D4", "#38BDF8", "#818CF8", "#34D399"]
        });
      } catch (e) {
        // Fallback gracefully if canvas-confetti is not supported
      }
    } catch (err: any) {
      setSubmitting(false);
      setErrors({ form: err.message || "Failed to send message. Please try again." });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    if (personal.phone) {
      navigator.clipboard.writeText(personal.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
            07 / Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {contact.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F18]/90 border border-white/[0.08] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Direct Channels
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Feel free to send an inquiry directly, or connect via any of my direct channels.
                </p>
              </div>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                <div className="overflow-hidden mr-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-cyan-400" />
                    Primary Email
                  </div>
                  <div className="text-sm font-mono text-cyan-300 truncate">
                    {personal.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-500/30 transition-all shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card with Call / Copy */}
              {personal.phone && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                  <div className="overflow-hidden mr-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-cyan-400" />
                      Direct Phone / WhatsApp
                    </div>
                    <a
                      href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                      className="text-sm font-mono text-cyan-300 hover:underline block truncate"
                    >
                      {personal.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-2.5 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-500/30 transition-all shrink-0"
                    title="Copy phone to clipboard"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Availability Note */}
              <div className="space-y-2 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{contact.responseSpeed}</span>
                </div>
                <div className="text-slate-500">
                  {contact.locationNote}
                </div>
              </div>

              {/* Direct Mailto Button */}
              <div className="pt-2">
                <a
                  href={`mailto:${personal.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400/60 font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Open in Mail Client
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F18]/90 border border-white/[0.08] shadow-2xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been received, and I will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-950/40 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="name" 
                        className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                      >
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jane Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                          errors.name ? "border-rose-500/80" : "border-white/[0.1] focus:border-cyan-500/70"
                        } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="email" 
                        className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                      >
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                          errors.email ? "border-rose-500/80" : "border-white/[0.1] focus:border-cyan-500/70"
                        } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="subject" 
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                    >
                      Subject / Topic
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. New Project Opportunity / Freelance Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] focus:border-cyan-500/70 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="message" 
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                    >
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or scope..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                        errors.message ? "border-rose-500/80" : "border-white/[0.1] focus:border-cyan-500/70"
                      } text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-none`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 font-mono">
                    Protected by client validation. Easy drop-in connection for Resend or Formspree.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
