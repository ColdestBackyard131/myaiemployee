"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MessageSquare, CheckSquare, FolderOpen, Share2, Mic, TrendingUp, Clock, Zap } from "lucide-react";

const employees = [
  { emoji: "👨💼", name: "CEO", color: "#6c63ff", desc: "Strategy & planning" },
  { emoji: "✍️", name: "Writer", color: "#f59e0b", desc: "Content & copywriting" },
  { emoji: "📱", name: "Social Media", color: "#10b981", desc: "Posts & campaigns" },
  { emoji: "🎨", name: "Designer", color: "#ec4899", desc: "Visuals & branding" },
  { emoji: "💻", name: "Programmer", color: "#3b82f6", desc: "Code & tech" },
];

const quickActions = [
  { href: "/chat", icon: <MessageSquare size={20} />, label: "New Chat", color: "#6c63ff" },
  { href: "/voice", icon: <Mic size={20} />, label: "Voice Mode", color: "#10b981" },
  { href: "/tasks", icon: <CheckSquare size={20} />, label: "Add Task", color: "#f59e0b" },
  { href: "/social", icon: <Share2 size={20} />, label: "Social AI", color: "#ec4899" },
  { href: "/projects", icon: <FolderOpen size={20} />, label: "Projects", color: "#3b82f6" },
];

const stats = [
  { label: "Tasks Today", value: "0", icon: <CheckSquare size={20} />, color: "#6c63ff" },
  { label: "AI Chats", value: "0", icon: <MessageSquare size={20} />, color: "#10b981" },
  { label: "Projects", value: "0", icon: <FolderOpen size={20} />, color: "#f59e0b" },
  { label: "AI Employees", value: "5", icon: <Zap size={20} />, color: "#ec4899" },
];

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [hour] = useState(new Date().getHours());

  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else setUserName(user.displayName || user.email?.split("@")[0] || "User");
    });
    return () => unsub();
  }, [router]);

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} style={{ color: "var(--text-secondary)" }} />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl font-black">
            {greeting} 👋 <span className="gradient-text">{userName}</span>
          </h1>
          <p className="mt-1" style={{ color: "var(--text-secondary)" }}>Your AI team is ready to work.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.label}</span>
                <div className="p-2 rounded-lg" style={{ background: `${s.color}20`, color: s.color }}>{s.icon}</div>
              </div>
              <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={20} color="#6c63ff" /> Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((a) => (
              <Link key={a.href} href={a.href}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}40` }}>
                {a.icon} {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* AI Employees */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Your AI Employees</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {employees.map((e) => (
              <Link key={e.name} href="/employees"
                className="glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-105 transition-all cursor-pointer text-center">
                <span className="text-3xl">{e.emoji}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: e.color }}>{e.name}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{e.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            style={{ minHeight: 150 }}>
            <MessageSquare size={40} style={{ color: "var(--text-secondary)", marginBottom: 12 }} />
            <p style={{ color: "var(--text-secondary)" }}>No recent activity yet.</p>
            <Link href="/chat" className="mt-4 text-sm font-semibold" style={{ color: "#6c63ff" }}>
              Start your first chat →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
