"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, CheckSquare, Square, Trash2, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addTask, getTasks, updateTask, deleteTask } from "@/lib/firestore";

type Task = { id: string; text: string; done: boolean; priority: "high" | "medium" | "low"; date: string };
const priorityColors = { high: "#ef4444", medium: "#f59e0b", low: "#34d399" };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [aiInput, setAiInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try { const data = await getTasks(user.uid); setTasks(data as Task[]); }
        catch { setTasks([]); }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (text: string, p = priority) => {
    if (!text.trim() || !userId) return;
    const ref = await addTask(userId, { text, priority: p, date });
    setTasks((prev) => [{ id: ref.id, text, done: false, priority: p, date }, ...prev]);
    setInput("");
  };

  const handleToggle = async (task: Task) => {
    await updateTask(task.id, { done: !task.done });
    setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, done: !t.done } : t));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAiTask = async () => {
    if (!aiInput.trim()) return;
    const res = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: `Extract a task from: "${aiInput}". Reply with ONLY the task text.` }] }),
    });
    const data = await res.json();
    await handleAdd(data.reply, "medium");
    setAiInput("");
  };

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.07) 0%, transparent 70%)" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Task <span className="gradient-text">Manager</span></h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{pending.length} pending · {completed.length} completed</p>
        </div>

        <div className="glass" style={{ padding: 20, marginBottom: 16, border: "1px solid rgba(124,111,255,0.15)" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#a78bfa", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={13} /> Tell AI to create a task
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={aiInput} onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiTask()}
              placeholder='"Remind me to upload a YouTube video tomorrow"'
              className="input-field" style={{ flex: 1, padding: "10px 14px", fontSize: 13 }} />
            <button onClick={handleAiTask} className="btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>Create</button>
          </div>
        </div>

        <div className="glass" style={{ padding: 20, marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Add Manually</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd(input)}
              placeholder="Task description..."
              className="input-field" style={{ flex: 1, minWidth: 200, padding: "10px 14px", fontSize: 13 }} />
            <select value={priority} onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              className="input-field" style={{ width: "auto", padding: "10px 14px", fontSize: 13 }}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="input-field" style={{ width: "auto", padding: "10px 14px", fontSize: 13 }} />
            <button onClick={() => handleAdd(input)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 13 }}>
              <Plus size={15} /> Add
            </button>
          </div>
        </div>

        {loading ? (
          <div className="glass" style={{ padding: 48, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Loading tasks...</div>
        ) : (
          <>
            <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Pending ({pending.length})</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {pending.length === 0 && (
                <div className="glass" style={{ padding: 24, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>No pending tasks. Great job! 🎉</div>
              )}
              {pending.map((task) => (
                <div key={task.id} className="glass" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={() => handleToggle(task)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Square size={18} style={{ color: priorityColors[task.priority] }} />
                  </button>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{task.text}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: `${priorityColors[task.priority]}15`, color: priorityColors[task.priority] }}>{task.priority}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{task.date}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(task.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,68,68,0.5)" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {completed.length > 0 && (
              <>
                <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Completed ({completed.length})</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {completed.map((task) => (
                    <div key={task.id} className="glass" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, opacity: 0.5 }}>
                      <button onClick={() => handleToggle(task)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                        <CheckSquare size={18} color="#34d399" />
                      </button>
                      <p style={{ flex: 1, fontSize: 13, textDecoration: "line-through", color: "rgba(255,255,255,0.4)" }}>{task.text}</p>
                      <button onClick={() => handleDelete(task.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,68,68,0.5)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
