"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MessageSquare, CheckSquare, FolderOpen, Share2, Mic, TrendingUp, Zap, ArrowRight } from "lucide-react";

const employees = [
  { emoji: "👨💼", name: "CEO", color: "#7c6fff", desc: "Strategy & planning" },
  { emoji: "✍️", name: "Writer", color: "#f59e0b", desc: "Content & copy" },
  { emoji: "📱", name: "Social Media", color: "#34d399", desc: "Posts & campaigns" },
  { emoji: "🎨", name: "Designer", color: "#f472b6", desc: "Visuals & branding" },
  { emoji: "💻", name: "Programmer", color: "#60a5fa", desc: "Code & tech" },
];

const quickActions = [
  { href: "/chat", icon: <MessageSquare size={16} />, label: "New Chat", color: "#7c6fff" },
  { href: "/voice", icon: <Mic size={16} />, label: "Voice Mode", color: "#34d399" },
  { href: "/tasks", icon: <CheckSquare size={16} />, label: "Add Task", color: "#f59e0b" },
  { href: "/social", icon: <Share2 size={16} />, label: "Social AI", color: "#f472b6" },
  { href: "/projects", icon: <FolderOpen size={16} />, label: "Projects", color: "#60a5fa" },
];

const stats = [
  { label: "Tasks Today", value: "0", icon: <CheckSquare size={18} />, color: "#7c6fff", bg: "#7c6fff15" },
  { label: "AI Chats", value: "0", icon: <MessageSquare size={18} />, color: "#34d399", bg: "#34d39915" },
  { label: "Projects", value: "0", icon: <FolderOpen size={18} />, color: "#f59e0b", bg: "#f59e0b15" },
  { label: "AI Employees", value: "5", icon: <Zap size={18} />, color: "#f472b6", bg: "#f472b615" },
];

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else setUserName(user.displayName || user.email?.split("@")[0] || "User");
    });
    return () => unsub();
  }, [router]);

  return (
    <div style={{ display: "flex", background: "#0f0f13", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 240, padding: "36px 40px", maxWidth: "calc(100vw - 240px)" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: "#4a4a6a", marginBottom: 6 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
            {greeting}, <span className="gradient-text">{userName}</span> 👋
          </h1>
          <p style={{ fontSize: 14, color: "#6a6a8a", marginTop: 4 }}>Your AI team is ready to work.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#16161f", border: "1px solid #1e1e2e", borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: "#6a6a8a" }}>{s.label}</span>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <p style={{ fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Quick Actions */}
          <div style={{ background: "#16161f", border: "1px solid #1e1e2e", borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <TrendingUp size={16} color="#7c6fff" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>Quick Actions</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickActions.map((a) => (
                <Link key={a.href} href={a.href} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px", borderRadius: 10, textDecoration: "none",
                  background: "#1a1a28", border: "1px solid #222235",
                  transition: "all 0.15s"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: a.color }}>
                    {a.icon}
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#c0c0d8" }}>{a.label}</span>
                  </div>
                  <ArrowRight size={14} color="#3a3a5a" />
                </Link>
              ))}
            </div>
          </div>

          {/* AI Employees */}
          <div style={{ background: "#16161f", border: "1px solid #1e1e2e", borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>AI Employees</span>
              <Link href="/employees" style={{ fontSize: 12, color: "#7c6fff", textDecoration: "none" }}>View all →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {employees.map((e) => (
                <Link key={e.name} href="/employees" style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                  background: "#1a1a28", border: "1px solid #222235"
                }}>
                  <span style={{ fontSize: 22 }}>{e.emoji}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: e.color }}>{e.name}</p>
                    <p style={{ fontSize: 11, color: "#4a4a6a" }}>{e.desc}</p>
                  </div>
                  <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background: "#16161f", border: "1px solid #1e1e2e", borderRadius: 16, padding: 24, marginTop: 24 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Recent Activity</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 0", gap: 10 }}>
            <MessageSquare size={32} color="#2a2a3e" />
            <p style={{ fontSize: 13, color: "#4a4a6a" }}>No recent activity yet.</p>
            <Link href="/chat" style={{ fontSize: 13, color: "#7c6fff", textDecoration: "none", fontWeight: 500 }}>
              Start your first chat →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
