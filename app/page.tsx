"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, CheckSquare, Mic, Share2, BarChart2, Users, Zap, Star } from "lucide-react";

export default function Home() {
  const features = [
    { icon: <Bot size={20} />, title: "AI Chat", desc: "Chat with specialized AI employees anytime, 24/7", color: "#7c6fff" },
    { icon: <Mic size={20} />, title: "Voice Assistant", desc: "Speak naturally, get instant AI voice responses", color: "#c084fc" },
    { icon: <CheckSquare size={20} />, title: "Task Manager", desc: "AI creates and tracks your tasks automatically", color: "#34d399" },
    { icon: <Users size={20} />, title: "AI Employees", desc: "CEO, Writer, Designer, Programmer & more", color: "#f59e0b" },
    { icon: <BarChart2 size={20} />, title: "Dashboard", desc: "See everything at a glance in one place", color: "#60a5fa" },
    { icon: <Share2 size={20} />, title: "Social Media AI", desc: "Generate content, captions and schedules", color: "#f472b6" },
  ];

  const employees = [
    { emoji: "👨💼", name: "CEO", color: "#7c6fff" },
    { emoji: "✍️", name: "Writer", color: "#f59e0b" },
    { emoji: "📱", name: "Social Media", color: "#34d399" },
    { emoji: "🎨", name: "Designer", color: "#f472b6" },
    { emoji: "💻", name: "Programmer", color: "#60a5fa" },
  ];

  return (
    <main style={{ background: "#0f0f13", minHeight: "100vh", color: "#fff" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(15,15,19,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1a1a28",
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/images/logo.jpeg" alt="Logo" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>My AI Employee</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{ padding: "8px 16px", fontSize: 13, fontWeight: 500, color: "#8a8aaa", textDecoration: "none", borderRadius: 8 }}>
            Login
          </Link>
          <Link href="/login" style={{
            padding: "8px 18px", fontSize: 13, fontWeight: 600, color: "#fff",
            background: "linear-gradient(135deg, #7c6fff, #9d6fff)",
            borderRadius: 8, textDecoration: "none", display: "flex", alignItems: "center", gap: 6
          }}>
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", maxWidth: 800, margin: "0 auto", padding: "140px 24px 80px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#1a1a28", border: "1px solid #2a2a3e",
          borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#7c6fff",
          marginBottom: 28, fontWeight: 500
        }}>
          <Zap size={12} /> AI-Powered Productivity Platform
        </div>

        <h1 style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.1, letterSpacing: -2, marginBottom: 20 }}>
          Your Personal<br />
          <span className="gradient-text">AI Employee Team</span>
        </h1>

        <p style={{ fontSize: 17, color: "#6a6a8a", lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
          Hire AI employees that work 24/7. Chat, create content, manage tasks, write code, and grow your business — all in one place.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/login" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15,
            background: "linear-gradient(135deg, #7c6fff, #9d6fff)", color: "#fff",
            textDecoration: "none", transition: "opacity 0.2s"
          }}>
            Start Free <ArrowRight size={18} />
          </Link>
          <Link href="/dashboard" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 12, fontWeight: 600, fontSize: 15,
            background: "#16161f", border: "1px solid #2a2a3e", color: "#a0a0b8",
            textDecoration: "none"
          }}>
            View Demo
          </Link>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 32 }}>
          {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
          <span style={{ fontSize: 13, color: "#6a6a8a", marginLeft: 4 }}>Trusted by 1,000+ users</span>
        </div>
      </section>

      {/* AI Employees */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#4a4a6a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
          Meet Your AI Team
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {employees.map((e) => (
            <div key={e.name} style={{
              background: "#16161f", border: "1px solid #1e1e2e",
              borderRadius: 14, padding: "20px 28px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              minWidth: 120, transition: "all 0.2s", cursor: "pointer"
            }}>
              <span style={{ fontSize: 32 }}>{e.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: e.color }}>{e.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#4a4a6a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
          Features
        </p>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 800, marginBottom: 40, letterSpacing: -1 }}>
          Everything You Need
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "#16161f", border: "1px solid #1e1e2e",
              borderRadius: 16, padding: "24px",
              transition: "all 0.2s", cursor: "pointer"
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, marginBottom: 16,
                background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                color: f.color
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#6a6a8a", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 80px", textAlign: "center" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a28, #16161f)",
          border: "1px solid #2a2a3e", borderRadius: 24, padding: "56px 40px"
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>
            Ready to hire your AI team?
          </h2>
          <p style={{ fontSize: 15, color: "#6a6a8a", marginBottom: 28 }}>
            Free to start. No credit card required.
          </p>
          <Link href="/login" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15,
            background: "linear-gradient(135deg, #7c6fff, #9d6fff)", color: "#fff",
            textDecoration: "none"
          }}>
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a28", padding: "24px", textAlign: "center", fontSize: 13, color: "#4a4a6a" }}>
        © 2025 My AI Employee. All rights reserved.
      </footer>
    </main>
  );
}
