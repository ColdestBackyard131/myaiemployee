"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Sparkles, Hash, FileText, Calendar, Lightbulb, Copy, Check } from "lucide-react";

type Tab = "ideas" | "captions" | "hashtags" | "scripts" | "calendar";

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>("ideas");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "ideas", label: "Content Ideas", icon: <Lightbulb size={16} /> },
    { id: "captions", label: "Captions", icon: <FileText size={16} /> },
    { id: "hashtags", label: "Hashtags", icon: <Hash size={16} /> },
    { id: "scripts", label: "Scripts", icon: <Sparkles size={16} /> },
    { id: "calendar", label: "Calendar", icon: <Calendar size={16} /> },
  ];

  const prompts: Record<Tab, string> = {
    ideas: `Generate 10 creative content ideas for ${platform} about "${topic}". Format as a numbered list.`,
    captions: `Write 5 engaging ${platform} captions about "${topic}". Include emojis. Format as a numbered list.`,
    hashtags: `Generate 20 relevant hashtags for ${platform} about "${topic}". Group them by category.`,
    scripts: `Write a short ${platform} video script about "${topic}". Include hook, main content, and CTA.`,
    calendar: `Create a 7-day ${platform} content calendar about "${topic}". Include post type and caption idea for each day.`,
  };

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompts[tab] }] }),
      });
      const data = await res.json();
      setResult(data.reply);
    } catch {
      setResult("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Social Media <span className="gradient-text">AI Manager</span></h1>
          <p style={{ color: "var(--text-secondary)" }}>Generate content, captions, hashtags, and more.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: tab === t.id ? "var(--accent)" : "var(--bg-card)",
                color: tab === t.id ? "#fff" : "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex gap-3 flex-wrap">
            <input value={topic} onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="Enter your topic, brand, or niche..."
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none min-w-48"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
              {["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Facebook"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <button onClick={generate} disabled={loading || !topic.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold glow disabled:opacity-50 transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "#fff" }}>
              <Sparkles size={16} /> {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Result */}
        {loading && (
          <div className="glass rounded-2xl p-8 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Sparkles size={20} color="#6c63ff" className="animate-spin" />
              <span style={{ color: "var(--text-secondary)" }}>Your AI Social Media Manager is working...</span>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold flex items-center gap-2">
                <span className="text-lg">📱</span> Generated for {platform}
              </h2>
              <button onClick={copy}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:scale-105"
                style={{ border: "1px solid var(--border)", color: copied ? "#10b981" : "var(--text-secondary)" }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-primary)", fontFamily: "inherit" }}>
              {result}
            </pre>
          </div>
        )}

        {/* Quick Examples */}
        {!result && !loading && (
          <div className="glass rounded-2xl p-6">
            <p className="text-sm font-bold mb-4" style={{ color: "var(--text-secondary)" }}>Quick Examples</p>
            <div className="flex flex-wrap gap-3">
              {["AI tools", "Fitness tips", "Coffee shop", "YouTube growth", "Online business", "Travel vlog"].map((ex) => (
                <button key={ex} onClick={() => setTopic(ex)}
                  className="px-3 py-2 rounded-xl text-sm transition-all hover:scale-105"
                  style={{ background: "rgba(108,99,255,0.1)", color: "#a78bfa", border: "1px solid rgba(108,99,255,0.2)" }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
