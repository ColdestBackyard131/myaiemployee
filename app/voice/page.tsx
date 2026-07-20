"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import { Mic, MicOff, Volume2, Bot } from "lucide-react";

export default function VoicePage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ user: string; ai: string }[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SR = (window as any).webkitSpeechRecognition;
      const r = new SR();
      r.continuous = false; r.interimResults = true; r.lang = "en-US";
      r.onresult = (e: any) => setTranscript(Array.from(e.results).map((x: any) => x[0].transcript).join(""));
      r.onend = () => setListening(false);
      recognitionRef.current = r;
    }
  }, []);

  const toggleListen = () => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); if (transcript) handleSend(transcript); }
    else { setTranscript(""); recognitionRef.current?.start(); setListening(true); }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: text }] }) });
      const data = await res.json();
      setResponse(data.reply);
      setHistory((prev) => [...prev, { user: text, ai: data.reply }]);
      if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.reply)); }
    } catch { setResponse("Sorry, something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${listening ? "rgba(239,68,68,0.08)" : "rgba(124,111,255,0.08)"} 0%, transparent 70%)`, transition: "background 0.5s" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Voice <span className="gradient-text">Assistant</span></h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>Speak to your AI Employee. It listens and responds.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 36 }}>
            <button onClick={toggleListen} style={{
              width: 120, height: 120, borderRadius: "50%", border: "none", cursor: "pointer",
              background: listening ? "rgba(239,68,68,0.15)" : "rgba(124,111,255,0.15)",
              outline: `2px solid ${listening ? "rgba(239,68,68,0.4)" : "rgba(124,111,255,0.4)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: listening ? "0 0 40px rgba(239,68,68,0.3)" : "0 0 40px rgba(124,111,255,0.2)",
              transition: "all 0.3s",
            } as React.CSSProperties}>
              {listening ? <MicOff size={44} color="#ef4444" /> : <Mic size={44} color="#a78bfa" />}
            </button>
            <p style={{ fontSize: 13, fontWeight: 500, color: listening ? "#ef4444" : "rgba(255,255,255,0.3)" }}>
              {listening ? "🔴 Listening... Click to stop" : "Click to speak"}
            </p>
          </div>

          {transcript && (
            <div className="glass" style={{ padding: 16, marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>You said:</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{transcript}</p>
            </div>
          )}

          {loading && (
            <div className="glass" style={{ padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <Bot size={18} color="#a78bfa" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Thinking...</span>
            </div>
          )}

          {response && !loading && (
            <div className="glass" style={{ padding: 18, marginBottom: 20, border: "1px solid rgba(124,111,255,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Bot size={16} color="#a78bfa" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#a78bfa" }}>AI Employee</span>
                </div>
                <button onClick={() => { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(response)); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>
                  <Volume2 size={15} />
                </button>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", whiteSpace: "pre-wrap" }}>{response}</p>
            </div>
          )}

          <div className="glass" style={{ padding: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>Try saying:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Write a YouTube script", "Create a business plan", "Plan my day", "Give me content ideas"].map((t) => (
                <button key={t} onClick={() => handleSend(t)} style={{
                  textAlign: "left", padding: "10px 14px", borderRadius: 9, fontSize: 13, cursor: "pointer",
                  background: "rgba(124,111,255,0.06)", border: "1px solid rgba(124,111,255,0.1)", color: "rgba(255,255,255,0.6)",
                }}>
                  💬 &quot;{t}&quot;
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
