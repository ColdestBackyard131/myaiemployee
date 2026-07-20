"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Send, Bot, User, Trash2, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { saveChat, getChats, clearChats } from "@/lib/firestore";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Write a YouTube script about AI",
  "Create a business plan for a coffee shop",
  "Plan my week for maximum productivity",
  "Write 5 Instagram captions for my brand",
  "Give me 10 content ideas for TikTok",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI Employee. I can write content, create plans, answer questions, and much more. What would you like to work on today? 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const history = await getChats(user.uid);
        if (history.length > 0) setMessages(history as unknown as Message[]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");
    const userMsg: Message = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    if (userId) await saveChat(userId, userMsg);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const aiMsg: Message = { role: "assistant", content: data.reply };
      setMessages([...newMessages, aiMsg]);
      if (userId) await saveChat(userId, aiMsg);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (userId) await clearChats(userId);
    setMessages([{ role: "assistant", content: "Hello! I'm your AI Employee. How can I help you today? 🚀" }]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative", zIndex: 1, paddingTop: 52 }}>
        {/* Header */}
        <div style={{
          padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(8,8,16,0.8)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(124,111,255,0.15)", border: "1px solid rgba(124,111,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={20} color="#a78bfa" />
            </div>
            <div>
              <h1 style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AI Chat</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
                <span style={{ fontSize: 11, color: "#34d399" }}>Online</span>
              </div>
            </div>
          </div>
          <button onClick={handleClear} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
            borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "rgba(239,68,68,0.7)",
          }}>
            <Trash2 size={13} /> Clear
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", gap: 12, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: msg.role === "user" ? "rgba(124,111,255,0.2)" : "rgba(52,211,153,0.15)",
                border: `1px solid ${msg.role === "user" ? "rgba(124,111,255,0.3)" : "rgba(52,211,153,0.2)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {msg.role === "user" ? <User size={15} color="#a78bfa" /> : <Bot size={15} color="#34d399" />}
              </div>
              <div style={{
                maxWidth: "70%", padding: "12px 16px", borderRadius: 14, fontSize: 13, lineHeight: 1.7,
                background: msg.role === "user" ? "rgba(124,111,255,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${msg.role === "user" ? "rgba(124,111,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                whiteSpace: "pre-wrap", color: "rgba(255,255,255,0.85)",
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={15} color="#34d399" />
              </div>
              <div style={{ padding: "12px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                <span style={{ animation: "pulse 1.5s ease-in-out infinite" }}>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div style={{ padding: "0 28px 12px", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {suggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
                borderRadius: 8, fontSize: 12, cursor: "pointer", transition: "all 0.15s",
                background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.15)", color: "#a78bfa",
              }}>
                <Sparkles size={11} /> {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: "14px 28px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,8,16,0.8)", backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask your AI Employee anything..."
              className="input-field"
              style={{ flex: 1, padding: "12px 16px", fontSize: 13 }} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="btn-primary"
              style={{ padding: "12px 18px", opacity: loading || !input.trim() ? 0.4 : 1 }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </main>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
