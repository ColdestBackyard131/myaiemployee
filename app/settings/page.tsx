"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { User, Key, Save, Check } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) { setName(user.displayName || ""); setEmail(user.email || ""); }
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser && name) await updateProfile(auth.currentUser, { displayName: name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.07) 0%, transparent 70%)" }} />
      </div>
      <Sidebar />
      <main className="main-content" style={{ position: "relative", zIndex: 1, padding: "32px 36px", paddingTop: 64 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}><span className="gradient-text">Settings</span></h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Manage your account and preferences.</p>
        </div>

        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <User size={16} color="#a78bfa" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>Profile</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>Display Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="input-field" style={{ padding: "11px 14px", fontSize: 13 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>Email</label>
                <input value={email} disabled
                  className="input-field" style={{ padding: "11px 14px", fontSize: 13, opacity: 0.4 }} />
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Key size={16} color="#f59e0b" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>API Keys</span>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6 }}>OpenAI API Key</label>
              <input value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                type="password" placeholder="sk-..."
                className="input-field" style={{ padding: "11px 14px", fontSize: 13 }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 8, lineHeight: 1.5 }}>
                Add your OpenAI key to enable full AI capabilities. Get one at platform.openai.com
              </p>
            </div>
          </div>

          <button onClick={handleSave} className="btn-primary"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", fontSize: 14, background: saved ? "linear-gradient(135deg, #34d399, #10b981)" : undefined }}>
            {saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}
