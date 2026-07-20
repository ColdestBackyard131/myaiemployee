"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, FolderOpen, Trash2, Calendar } from "lucide-react";

type Project = { id: string; name: string; desc: string; color: string; date: string };

const colors = ["#6c63ff", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#ef4444"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "YouTube Channel Growth", desc: "Scripts, thumbnails, and posting schedule", color: "#ef4444", date: "2025-01-01" },
    { id: "2", name: "My AI Employee App", desc: "Building the full platform", color: "#6c63ff", date: "2025-01-01" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(colors[0]);

  const addProject = () => {
    if (!name.trim()) return;
    setProjects([...projects, { id: Date.now().toString(), name, desc, color, date: new Date().toISOString().split("T")[0] }]);
    setName(""); setDesc(""); setColor(colors[0]); setShowForm(false);
  };

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">My <span className="gradient-text">Projects</span></h1>
            <p style={{ color: "var(--text-secondary)" }}>{projects.length} active projects</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm glow transition-all hover:scale-105"
            style={{ background: "var(--accent)", color: "#fff" }}>
            <Plus size={18} /> New Project
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="glass rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(108,99,255,0.3)" }}>
            <h2 className="font-bold mb-4">Create New Project</h2>
            <div className="flex flex-col gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name"
                className="px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description (optional)" rows={2}
                className="px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Color:</span>
                {colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)}
                    className="w-7 h-7 rounded-full transition-all hover:scale-125"
                    style={{ background: c, border: color === c ? "3px solid #fff" : "none" }} />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={addProject}
                  className="px-6 py-2 rounded-xl text-sm font-bold glow"
                  style={{ background: "var(--accent)", color: "#fff" }}>
                  Create
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-6 py-2 rounded-xl text-sm font-bold"
                  style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="glass rounded-2xl p-6 hover:scale-105 transition-all cursor-pointer"
              style={{ borderTop: `3px solid ${p.color}` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ background: `${p.color}20` }}>
                  <FolderOpen size={24} style={{ color: p.color }} />
                </div>
                <button onClick={() => setProjects(projects.filter((x) => x.id !== p.id))}
                  className="p-2 rounded-lg hover:scale-110 transition-all" style={{ color: "#ef4444" }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                <Calendar size={12} /> Created {p.date}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
