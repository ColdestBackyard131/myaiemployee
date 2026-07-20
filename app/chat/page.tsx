"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Send, Bot, User, Trash2, Sparkles } from "lucide-react";

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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I encountered an error. Please check your API key in settings." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen">
        {/* Header */}
        <div className="glass px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: "rgba(108,99,255,0.2)" }}>
              <Bot size={22} color="#6c63ff" />
            </div>
            <div>
              <h1 className="font-bold">AI Chat</h1>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Your AI Employee is online</p>
            </div>
          </div>
          <button onClick={() => setMessages([{ role: "assistant", content: "Hello! I'm your AI Employee. How can I help you today? 🚀" }])}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
            <Trash2 size={16} /> Clear
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className="p-2 rounded-xl h-fit flex-shrink-0"
                style={{ background: msg.role === "user" ? "rgba(108,99,255,0.2)" : "rgba(16,185,129,0.2)" }}>
                {msg.role === "user" ? <User size={18} color="#6c63ff" /> : <Bot size={18} color="#10b981" />}
              </div>
              <div className="max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.role === "user" ? "rgba(108,99,255,0.15)" : "var(--bg-card)",
                  border: "1px solid var(--border)",
                  whiteSpace: "pre-wrap",
                }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="p-2 rounded-xl h-fit" style={{ background: "rgba(16,185,129,0.2)" }}>
                <Bot size={18} color="#10b981" />
              </div>
              <div className="px-4 py-3 rounded-2xl text-sm" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all hover:scale-105"
                style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)", color: "#a78bfa" }}>
                <Sparkles size={12} /> {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask your AI Employee anything..."
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-xl transition-all hover:scale-105 disabled:opacity-50 glow"
              style={{ background: "var(--accent)", color: "#fff" }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
