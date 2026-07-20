"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, CheckSquare, Square, Trash2, Calendar, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addTask, getTasks, updateTask, deleteTask } from "@/lib/firestore";

type Task = {
  id: string;
  text: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  date: string;
};

const priorityColors = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };

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
        const data = await getTasks(user.uid);
        setTasks(data as Task[]);
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
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAiTask = async () => {
    if (!aiInput.trim()) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: `Extract a task from this: "${aiInput}". Reply with ONLY the task text, nothing else.` }] }),
    });
    const data = await res.json();
    await handleAdd(data.reply, "medium");
    setAiInput("");
  };

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Task <span className="gradient-text">Manager</span></h1>
          <p style={{ color: "var(--text-secondary)" }}>{pending.length} pending · {completed.length} completed</p>
        </div>

        {/* AI Task Input */}
        <div className="glass rounded-2xl p-5 mb-6" style={{ border: "1px solid rgba(108,99,255,0.3)" }}>
          <p className="text-sm font-bold mb-3 flex items-center gap-2">
            <Sparkles size={16} color="#6c63ff" /> Tell AI to create a task
          </p>
          <div className="flex gap-3">
            <input value={aiInput} onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiTask()}
              placeholder='e.g. "Remind me to upload a YouTube video tomorrow"'
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <button onClick={handleAiTask}
              className="px-4 py-3 rounded-xl text-sm font-bold glow"
              style={{ background: "var(--accent)", color: "#fff" }}>
              Create
            </button>
          </div>
        </div>

        {/* Manual Add */}
        <div className="glass rounded-2xl p-5 mb-6">
          <p className="text-sm font-bold mb-3">Add Task Manually</p>
          <div className="flex gap-3 flex-wrap">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd(input)}
              placeholder="Task description..."
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none min-w-48"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <select value={priority} onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <button onClick={() => handleAdd(input)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold glow"
              style={{ background: "var(--accent)", color: "#fff" }}>
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {loading ? (
          <div className="glass rounded-2xl p-8 text-center" style={{ color: "var(--text-secondary)" }}>
            Loading tasks...
          </div>
        ) : (
          <>
            {/* Pending */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Pending ({pending.length})</h2>
              <div className="flex flex-col gap-3">
                {pending.length === 0 && (
                  <div className="glass rounded-2xl p-6 text-center" style={{ color: "var(--text-secondary)" }}>
                    No pending tasks. Great job! 🎉
                  </div>
                )}
                {pending.map((task) => (
                  <div key={task.id} className="glass rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-all">
                    <button onClick={() => handleToggle(task)}>
                      <Square size={20} style={{ color: priorityColors[task.priority] }} />
                    </button>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.text}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority] }}>
                          {task.priority}
                        </span>
                        <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                          <Calendar size={12} /> {task.date}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(task.id)} style={{ color: "#ef4444" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed */}
            {completed.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-secondary)" }}>Completed ({completed.length})</h2>
                <div className="flex flex-col gap-3">
                  {completed.map((task) => (
                    <div key={task.id} className="glass rounded-2xl p-4 flex items-center gap-4 opacity-60">
                      <button onClick={() => handleToggle(task)}>
                        <CheckSquare size={20} color="#10b981" />
                      </button>
                      <p className="flex-1 text-sm line-through" style={{ color: "var(--text-secondary)" }}>{task.text}</p>
                      <button onClick={() => handleDelete(task.id)} style={{ color: "#ef4444" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
