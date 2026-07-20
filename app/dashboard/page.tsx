"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MessageSquare, CheckSquare, FolderOpen, Share2, Mic, Zap, ArrowRight, TrendingUp } from "lucide-react";

const employees = [
  { emoji: "👨💼", name: "CEO", color: "#7c6fff", desc: "Strategy & planning" },
  { emoji: "✍️", name: "Writer", color: "#f59e0b", desc: "Content & copy" },
  { emoji: "📱", name: "Social Media", color: "#34d399", desc: "Posts & campaigns" },
  { emoji: "🎨", name: "Designer", color: "#f472b6", desc: "Visuals & branding" },
  { emoji: "💻", name: "Programmer", color: "#60a5fa", desc: "Code & tech" },
];

const stats = [
  { label: "Tasks Today", value: "0", icon: <CheckSquare size={17} />, color: "#7c6fff" },
  { label: "AI Chats", value: "0", icon: <MessageSquare size={17} />, color: "#34d399" },
  { label: "Projects", value: "0", icon: <FolderOpen size={17} />, color: "#f59e0b" },
  { label: "AI Employees", value: "5", icon: <Zap size={17} />, color: "#f472b6" },
];

const quickActions = [
  { href: "/chat", icon: <MessageSquare size={15} />, label: "New Chat", color: "#7c6fff" },
  { href: "/voice", icon: <Mic size={15} />, label: "Voice Mode", color: "#34d399" },
  { href: "/tasks", icon: <CheckSquare size={15} />, label: "Add Task", color: "#f59e0b" },
  { href: "/social", icon: <Share2 size={15} />, label: "Social AI", color: "#f472b6" },
  { href: "/projects", icon: <FolderOpen size={15} />, label: "Projects", color: "#60a5fa" },
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
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      {/* Animated background blobs */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,111,255,0.1) 0%, transparent 70%)",
          animation: "float1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          animation: "float2 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "20%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)",
        }} />
      </div>

      <Sidebar />

      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }} className="fade-in">
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 6, letterSpacing: 0.5 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.2 }}>
            {greeting}, <span className="gradient-text">{userName}</span> 👋
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
            Your AI team is ready. What are we building today?
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={s.label} className="glass fade-in" style={{
              padding: "20px 22px",
              animationDelay: `${i * 0.05}s`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 80, height: 80, borderRadius: "50%",
                background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)`,
              }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{s.label}</span>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `${s.color}15`, border: `1px solid ${s.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: s.color,
                }}>
                  {s.icon}
                </div>
              </div>
              <p style={{ fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Quick Actions */}
          <div className="glass" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={15} color="#7c6fff" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Quick Actions</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {quickActions.map((a) => (
                <Link key={a.href} href={a.href} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "11px 14px", borderRadius: 10, textDecoration: "none",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.15s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 7,
                      background: `${a.color}15`, border: `1px solid ${a.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center", color: a.color,
                    }}>
                      {a.icon}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{a.label}</span>
                  </div>
                  <ArrowRight size={13} color="rgba(255,255,255,0.2)" />
                </Link>
              ))}
            </div>
          </div>

          {/* AI Employees */}
          <div className="glass" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>AI Employees</span>
              <Link href="/employees" style={{ fontSize: 11, color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>View all →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {employees.map((e) => (
                <Link key={e.name} href="/employees" style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 20 }}>{e.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: e.color, lineHeight: 1.3 }}>{e.name}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{e.desc}</p>
                  </div>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#34d399", boxShadow: "0 0 6px #34d399",
                  }} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass" style={{ padding: 22 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Recent Activity</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0", gap: 10 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "rgba(124,111,255,0.1)", border: "1px solid rgba(124,111,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MessageSquare size={22} color="rgba(124,111,255,0.5)" />
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>No recent activity yet.</p>
            <Link href="/chat" style={{
              fontSize: 12, color: "#a78bfa", textDecoration: "none", fontWeight: 500,
              padding: "6px 14px", borderRadius: 8,
              background: "rgba(124,111,255,0.1)", border: "1px solid rgba(124,111,255,0.2)",
            }}>
              Start your first chat →
            </Link>
          </div>
        </div>

      </main>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,20px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-20px,-30px) scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
