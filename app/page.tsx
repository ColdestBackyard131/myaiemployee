"use client";
import Link from "next/link";
import { Bot, Mic, CheckSquare, BarChart2, Users, ArrowRight, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  const features = [
    { icon: <Bot size={28} />, title: "AI Chat", desc: "Chat with specialized AI employees anytime" },
    { icon: <Mic size={28} />, title: "Voice Assistant", desc: "Speak naturally, get instant AI responses" },
    { icon: <CheckSquare size={28} />, title: "Task Manager", desc: "AI creates and tracks your tasks automatically" },
    { icon: <Users size={28} />, title: "AI Employees", desc: "CEO, Writer, Designer, Programmer & more" },
    { icon: <BarChart2 size={28} />, title: "Dashboard", desc: "See everything at a glance in one place" },
    { icon: <Globe size={28} />, title: "Social Media AI", desc: "Generate content, captions and schedules" },
  ];

  const employees = [
    { emoji: "👨‍💼", name: "CEO", color: "#6c63ff" },
    { emoji: "✍️", name: "Writer", color: "#f59e0b" },
    { emoji: "📱", name: "Social Media", color: "#10b981" },
    { emoji: "🎨", name: "Designer", color: "#ec4899" },
    { emoji: "💻", name: "Programmer", color: "#3b82f6" },
  ];

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={28} color="#6c63ff" />
          <span className="text-xl font-bold gradient-text">My AI Employee</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm px-4 py-2 rounded-lg" style={{ color: "var(--text-secondary)" }}>
            Login
          </Link>
          <Link href="/login" className="text-sm px-4 py-2 rounded-lg font-semibold glow"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm"
          style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#a78bfa" }}>
          <Zap size={14} /> AI-Powered Productivity Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          Your Personal<br />
          <span className="gradient-text">AI Employee Team</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Hire AI employees that work 24/7. Chat, create content, manage tasks, write code, and grow your business — all in one place.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/login" className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg glow transition-all hover:scale-105"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Start Free <ArrowRight size={20} />
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}>
            View Demo
          </Link>
        </div>
      </section>

      {/* AI Employees Preview */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Your AI Team</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {employees.map((e) => (
            <div key={e.name} className="glass rounded-2xl px-8 py-6 flex flex-col items-center gap-3 hover:scale-105 transition-all cursor-pointer"
              style={{ minWidth: 140 }}>
              <span className="text-4xl">{e.emoji}</span>
              <span className="font-semibold" style={{ color: e.color }}>{e.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:scale-105 transition-all cursor-pointer group">
              <div className="mb-4 p-3 rounded-xl inline-block" style={{ background: "rgba(108,99,255,0.15)", color: "#6c63ff" }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="glass rounded-3xl p-12 max-w-3xl mx-auto glow">
          <Shield size={48} className="mx-auto mb-6" color="#6c63ff" />
          <h2 className="text-4xl font-black mb-4">Ready to hire your AI team?</h2>
          <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
            Free to start. No credit card required.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg glow"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8" style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border)" }}>
        <p>© 2025 My AI Employee. Built with ❤️</p>
      </footer>
    </main>
  );
}
