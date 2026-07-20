"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, FolderOpen, Trash2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addProject, getProjects, deleteProject } from "@/lib/firestore";

type Project = { id: string; name: string; desc: string; color: string };
const colors = ["#7c6fff", "#34d399", "#f59e0b", "#f472b6", "#60a5fa", "#ef4444"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userId, setUserId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const data = await getProjects(user.uid);
          setProjects(data as Project[]);
        } catch { setProjects([]); }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async () => {
    if (!name.trim() || !userId) return;
    const ref = await addProject(userId, { name, desc, color });
    setProjects((prev) => [{ id: ref.id, name, desc, color }, ...prev]);
    setName(""); setDesc(""); setColor(colors[0]); setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%)" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>My <span className="gradient-text">Projects</span></h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{projects.length} active projects</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", fontSize: 13 }}>
            <Plus size={16} /> New Project
          </button>
        </div>

        {showForm && (
          <div className="glass" style={{ padding: 24, marginBottom: 24, border: "1px solid rgba(124,111,255,0.2)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Create New Project</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name"
                className="input-field" style={{ padding: "11px 14px", fontSize: 13 }} />
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description (optional)" rows={2}
                className="input-field" style={{ padding: "11px 14px", fontSize: 13, resize: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Color:</span>
                {colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} style={{
                    width: 24, height: 24, borderRadius: "50%", background: c, border: "none", cursor: "pointer",
                    outline: color === c ? `3px solid ${c}` : "none", outlineOffset: 2,
                  }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleAdd} className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>Create</button>
                <button onClick={() => setShowForm(false)} style={{
                  padding: "9px 20px", fontSize: 13, borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)",
                }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="glass" style={{ padding: 48, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            Loading projects...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {projects.length === 0 && (
              <div className="glass" style={{ padding: 48, textAlign: "center", gridColumn: "1/-1" }}>
                <FolderOpen size={36} color="rgba(124,111,255,0.3)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No projects yet. Create your first one!</p>
              </div>
            )}
            {projects.map((p) => (
              <div key={p.id} className="card-hover" style={{ padding: 22, borderTop: `2px solid ${p.color}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}15`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FolderOpen size={20} style={{ color: p.color }} />
                  </div>
                  <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,68,68,0.5)", padding: 4 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: "#fff" }}>{p.name}</h3>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
