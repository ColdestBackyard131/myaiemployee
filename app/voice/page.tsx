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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const text = Array.from(event.results).map((r: any) => r[0].transcript).join("");
        setTranscript(text);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListen = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      if (transcript) handleSend(transcript);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
      });
      const data = await res.json();
      setResponse(data.reply);
      setHistory((prev) => [...prev, { user: text, ai: data.reply }]);
      speak(data.reply);
    } catch {
      setResponse("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black mb-2">Voice <span className="gradient-text">Assistant</span></h1>
            <p style={{ color: "var(--text-secondary)" }}>Speak to your AI Employee. It listens and responds.</p>
          </div>

          {/* Mic Button */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <button onClick={toggleListen}
              className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: listening ? "rgba(239,68,68,0.2)" : "rgba(108,99,255,0.2)",
                border: `3px solid ${listening ? "#ef4444" : "#6c63ff"}`,
                boxShadow: listening ? "0 0 40px rgba(239,68,68,0.4)" : "0 0 40px rgba(108,99,255,0.3)",
              }}>
              {listening
                ? <MicOff size={48} color="#ef4444" />
                : <Mic size={48} color="#6c63ff" />}
              {listening && (
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(239,68,68,0.2)" }} />
              )}
            </button>
            <p className="text-sm font-semibold" style={{ color: listening ? "#ef4444" : "var(--text-secondary)" }}>
              {listening ? "🔴 Listening... Click to stop" : "Click to speak"}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="glass rounded-2xl p-4 mb-4">
              <p className="text-xs mb-1 font-semibold" style={{ color: "var(--text-secondary)" }}>You said:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}

          {/* Response */}
          {loading && (
            <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-3">
              <Bot size={20} color="#6c63ff" />
              <span className="text-sm animate-pulse">AI is thinking...</span>
            </div>
          )}
          {response && !loading && (
            <div className="glass rounded-2xl p-4 mb-6" style={{ border: "1px solid rgba(108,99,255,0.3)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bot size={18} color="#6c63ff" />
                  <p className="text-xs font-semibold" style={{ color: "#6c63ff" }}>AI Employee</p>
                </div>
                <button onClick={() => speak(response)} className="p-1 rounded-lg hover:scale-110 transition-all"
                  style={{ color: "var(--text-secondary)" }}>
                  <Volume2 size={16} />
                </button>
              </div>
              <p className="text-sm leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>{response}</p>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-3" style={{ color: "var(--text-secondary)" }}>Conversation History</h2>
              <div className="flex flex-col gap-3">
                {history.slice(-5).map((h, i) => (
                  <div key={i} className="glass rounded-xl p-3 text-xs">
                    <p style={{ color: "#a78bfa" }}>You: {h.user}</p>
                    <p className="mt-1" style={{ color: "var(--text-secondary)" }}>AI: {h.ai.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 glass rounded-2xl p-5">
            <p className="text-sm font-bold mb-3">Try saying:</p>
            <div className="flex flex-col gap-2">
              {["Write a YouTube script", "Create a business plan", "Plan my day", "Give me content ideas"].map((t) => (
                <button key={t} onClick={() => handleSend(t)}
                  className="text-left text-sm px-3 py-2 rounded-xl transition-all hover:scale-105"
                  style={{ background: "rgba(108,99,255,0.1)", color: "#a78bfa" }}>
                  💬 "{t}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
