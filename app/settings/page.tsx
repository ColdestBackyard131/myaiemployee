"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Settings, User, Key, Bell, Palette, Save, Check } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
      }
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser && name) {
      await updateProfile(auth.currentUser, { displayName: name });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { icon: <User size={20} />, label: "Profile", color: "#6c63ff" },
    { icon: <Key size={20} />, label: "API Keys", color: "#f59e0b" },
    { icon: <Bell size={20} />, label: "Notifications", color: "#10b981" },
    { icon: <Palette size={20} />, label: "Appearance", color: "#ec4899" },
  ];

  return (
    <div className="flex" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Settings size={28} color="#6c63ff" /> <span className="gradient-text">Settings</span>
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage your account and preferences.</p>
        </div>

        <div className="max-w-2xl flex flex-col gap-6">
          {/* Profile */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <User size={18} color="#6c63ff" /> Profile
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-secondary)" }}>Display Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--text-secondary)" }}>Email</label>
                <input value={email} disabled
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none opacity-60"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Key size={18} color="#f59e0b" /> API Keys
            </h2>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--text-secondary)" }}>OpenAI API Key</label>
              <input value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                type="password" placeholder="sk-..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
                Add your OpenAI key to enable full AI capabilities. Get one at platform.openai.com
              </p>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Palette size={18} color="#ec4899" /> Appearance
            </h2>
            <div className="flex gap-3">
              {["dark", "darker"].map((t) => (
                <button key={t} onClick={() => setTheme(t)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all hover:scale-105"
                  style={{
                    background: theme === t ? "var(--accent)" : "var(--bg-secondary)",
                    color: theme === t ? "#fff" : "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Save */}
          <button onClick={handleSave}
            className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold glow transition-all hover:scale-105"
            style={{ background: saved ? "#10b981" : "var(--accent)", color: "#fff" }}>
            {saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}
