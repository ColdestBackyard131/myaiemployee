"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { MessageSquare, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const employees = [
  {
    emoji: "👨💼",
    name: "CEO",
    color: "#6c63ff",
    role: "Chief Executive Officer",
    desc: "Strategic thinking, business planning, leadership advice, and executive decision-making.",
    skills: ["Business Strategy", "Leadership", "Planning", "Decision Making", "Vision"],
    prompt: "You are a CEO AI Employee. Help with business strategy, planning, and executive decisions.",
  },
  {
    emoji: "✍️",
    name: "Writer",
    color: "#f59e0b",
    role: "Content Writer",
    desc: "Blog posts, articles, scripts, emails, copywriting, and any written content.",
    skills: ["Blog Writing", "Copywriting", "Scripts", "Emails", "SEO Content"],
    prompt: "You are a Writer AI Employee. Help with all forms of written content.",
  },
  {
    emoji: "📱",
    name: "Social Media Manager",
    color: "#10b981",
    role: "Social Media Manager",
    desc: "Content ideas, captions, hashtags, posting schedules, and social media strategy.",
    skills: ["Instagram", "TikTok", "YouTube", "Captions", "Hashtags", "Strategy"],
    prompt: "You are a Social Media Manager AI Employee. Help with social media content and strategy.",
  },
  {
    emoji: "🎨",
    name: "Designer",
    color: "#ec4899",
    role: "Creative Designer",
    desc: "Design concepts, color palettes, branding ideas, UI/UX suggestions, and visual direction.",
    skills: ["Branding", "UI/UX", "Color Theory", "Logo Ideas", "Visual Design"],
    prompt: "You are a Designer AI Employee. Help with design concepts, branding, and visual direction.",
  },
  {
    emoji: "💻",
    name: "Programmer",
    color: "#3b82f6",
    role: "Software Developer",
    desc: "Write code, debug errors, explain concepts, review code, and solve technical problems.",
    skills: ["JavaScript", "Python", "React", "Next.js", "Debugging", "APIs"],
    prompt: "You are a Programmer AI Employee. Help with coding, debugging, and technical problems.",
  },
];

export default function EmployeesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const handleChat = (emp: typeof employees[0]) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(emp));
    router.push("/chat");
  };

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">AI Employees <span className="gradient-text">Team</span></h1>
          <p style={{ color: "var(--text-secondary)" }}>Your personal AI team, available 24/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp, i) => (
            <div key={emp.name}
              onClick={() => setSelected(selected === i ? null : i)}
              className="glass rounded-2xl p-6 cursor-pointer transition-all hover:scale-105"
              style={{ border: selected === i ? `1px solid ${emp.color}` : "1px solid var(--border)" }}>
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl p-3 rounded-2xl" style={{ background: `${emp.color}20` }}>
                  {emp.emoji}
                </div>
                <div>
                  <h2 className="font-black text-lg" style={{ color: emp.color }}>{emp.name}</h2>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{emp.role}</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                    style={{ background: `${emp.color}20`, color: emp.color }}>
                    <Zap size={10} /> Online
                  </div>
                </div>
              </div>

              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{emp.desc}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {emp.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-lg"
                    style={{ background: `${emp.color}15`, color: emp.color }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill={emp.color} color={emp.color} />
                ))}
                <span className="text-xs ml-1" style={{ color: "var(--text-secondary)" }}>5.0</span>
              </div>

              {/* Chat Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleChat(emp); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: emp.color, color: "#fff" }}>
                <MessageSquare size={16} /> Chat with {emp.name}
              </button>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-secondary)" }}>Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["⚖️ AI Lawyer", "🏥 AI Doctor", "📚 AI Teacher", "💰 AI Accountant"].map((e) => (
              <div key={e} className="glass rounded-2xl p-4 text-center opacity-50">
                <p className="text-sm font-semibold">{e}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Coming in V2</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
