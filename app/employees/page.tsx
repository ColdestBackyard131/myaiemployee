"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { MessageSquare, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const employees = [
  { emoji: "👨💼", name: "CEO", color: "#7c6fff", role: "Chief Executive Officer", desc: "Strategic thinking, business planning, leadership advice, and executive decision-making.", skills: ["Business Strategy", "Leadership", "Planning", "Decision Making"] },
  { emoji: "✍️", name: "Writer", color: "#f59e0b", role: "Content Writer", desc: "Blog posts, articles, scripts, emails, copywriting, and any written content.", skills: ["Blog Writing", "Copywriting", "Scripts", "SEO Content"] },
  { emoji: "📱", name: "Social Media", color: "#34d399", role: "Social Media Manager", desc: "Content ideas, captions, hashtags, posting schedules, and social media strategy.", skills: ["Instagram", "TikTok", "YouTube", "Hashtags"] },
  { emoji: "🎨", name: "Designer", color: "#f472b6", role: "Creative Designer", desc: "Design concepts, color palettes, branding ideas, UI/UX suggestions, and visual direction.", skills: ["Branding", "UI/UX", "Color Theory", "Logo Ideas"] },
  { emoji: "💻", name: "Programmer", color: "#60a5fa", role: "Software Developer", desc: "Write code, debug errors, explain concepts, review code, and solve technical problems.", skills: ["JavaScript", "Python", "React", "Next.js"] },
];

export default function EmployeesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const handleChat = (emp: typeof employees[0]) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(emp));
    router.push("/chat");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>AI Employees <span className="gradient-text">Team</span></h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Your personal AI team, available 24/7.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 32 }}>
          {employees.map((emp, i) => (
            <div key={emp.name} onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 18, padding: 24, cursor: "pointer",
                border: selected === i ? `1px solid ${emp.color}40` : "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.2s",
                boxShadow: selected === i ? `0 8px 30px ${emp.color}15` : "none",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${emp.color}15`, border: `1px solid ${emp.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                  {emp.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: emp.color }}>{emp.name}</h2>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{emp.role}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.15)" }}>
                  <Zap size={10} color="#34d399" />
                  <span style={{ fontSize: 11, color: "#34d399", fontWeight: 500 }}>Online</span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 14 }}>{emp.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {emp.skills.map((skill) => (
                  <span key={skill} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${emp.color}10`, color: emp.color, border: `1px solid ${emp.color}20` }}>{skill}</span>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
                {[1,2,3,4,5].map((s) => <Star key={s} size={12} fill={emp.color} color={emp.color} />)}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>5.0</span>
              </div>

              <button onClick={(e) => { e.stopPropagation(); handleChat(emp); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: `linear-gradient(135deg, ${emp.color}, ${emp.color}cc)`,
                  border: "none", color: "#fff", transition: "all 0.2s",
                }}>
                <MessageSquare size={15} /> Chat with {emp.name}
              </button>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>Coming Soon</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {["⚖️ AI Lawyer", "🏥 AI Doctor", "📚 AI Teacher", "💰 AI Accountant"].map((e) => (
              <div key={e} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", textAlign: "center", opacity: 0.4 }}>
                <p style={{ fontSize: 13, fontWeight: 500 }}>{e}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Coming in V2</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
