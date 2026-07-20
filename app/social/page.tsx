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
    { id: "ideas", label: "Content Ideas", icon: <Lightbulb size={14} /> },
    { id: "captions", label: "Captions", icon: <FileText size={14} /> },
    { id: "hashtags", label: "Hashtags", icon: <Hash size={14} /> },
    { id: "scripts", label: "Scripts", icon: <Sparkles size={14} /> },
    { id: "calendar", label: "Calendar", icon: <Calendar size={14} /> },
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
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: prompts[tab] }] }) });
      const data = await res.json();
      setResult(data.reply);
    } catch { setResult("Error generating content. Please try again."); }
    finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-5%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Social Media <span className="gradient-text">AI Manager</span></h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Generate content, captions, hashtags, and more.</p>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
              borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
              background: tab === t.id ? "linear-gradient(135deg, #7c6fff, #a855f7)" : "rgba(255,255,255,0.04)",
              border: tab === t.id ? "none" : "1px solid rgba(255,255,255,0.07)",
              color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="glass" style={{ padding: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input value={topic} onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="Enter your topic, brand, or niche..."
              className="input-field" style={{ flex: 1, minWidth: 200, padding: "11px 14px", fontSize: 13 }} />
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}
              className="input-field" style={{ width: "auto", padding: "11px 14px", fontSize: 13 }}>
              {["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Facebook"].map((p) => <option key={p}>{p}</option>)}
            </select>
            <button onClick={generate} disabled={loading || !topic.trim()} className="btn-primary"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", fontSize: 13, opacity: loading || !topic.trim() ? 0.5 : 1 }}>
              <Sparkles size={14} /> {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="glass" style={{ padding: 48, textAlign: "center" }}>
            <Sparkles size={28} color="#a78bfa" style={{ margin: "0 auto 12px", animation: "spin 1s linear infinite" }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Your AI Social Media Manager is working...</p>
          </div>
        )}

        {result && !loading && (
          <div className="glass" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                <span>📱</span> Generated for {platform}
              </h2>
              <button onClick={copy} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                background: copied ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${copied ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.07)"}`,
                color: copied ? "#34d399" : "rgba(255,255,255,0.4)",
              }}>
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre style={{ fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", color: "rgba(255,255,255,0.75)", fontFamily: "inherit" }}>{result}</pre>
          </div>
        )}

        {!result && !loading && (
          <div className="glass" style={{ padding: 20 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Quick Examples</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["AI tools", "Fitness tips", "Coffee shop", "YouTube growth", "Online business", "Travel vlog"].map((ex) => (
                <button key={ex} onClick={() => setTopic(ex)} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                  background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.15)", color: "#a78bfa",
                }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
