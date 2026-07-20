"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message.replace("Firebase: ", "") : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message.replace("Firebase: ", "") : "Google sign-in failed");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0f0f13", display: "flex" }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 80px", background: "linear-gradient(135deg, #0f0f13, #1a1a28)"
      }} className="hidden md:flex">
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <Image src="/images/logo.jpeg" alt="Logo" width={36} height={36} style={{ borderRadius: 8 }} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>My AI Employee</span>
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.2, letterSpacing: -1, marginBottom: 16 }}>
            Your AI team<br /><span className="gradient-text">works 24/7</span>
          </h2>
          <p style={{ fontSize: 15, color: "#6a6a8a", lineHeight: 1.7 }}>
            Chat, create content, manage tasks, and grow your business with your personal AI employees.
          </p>
        </div>
        {["AI Chat & Voice Assistant", "Task Manager & Projects", "Social Media AI Manager", "5 Specialized AI Employees"].map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#7c6fff20", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c6fff" }} />
            </div>
            <span style={{ fontSize: 14, color: "#8a8aaa" }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div style={{
        width: "100%", maxWidth: 480,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 48px",
        borderLeft: "1px solid #1a1a28"
      }}>
        {/* Mobile Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }} className="md:hidden">
          <Image src="/images/logo.jpeg" alt="Logo" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>My AI Employee</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, letterSpacing: -0.5 }}>
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p style={{ fontSize: 14, color: "#6a6a8a", marginBottom: 32 }}>
          {isLogin ? "Sign in to your account to continue" : "Start your free account today"}
        </p>

        {/* Toggle */}
        <div style={{ display: "flex", background: "#16161f", border: "1px solid #1e1e2e", borderRadius: 10, padding: 4, marginBottom: 28 }}>
          {["Login", "Sign Up"].map((t, i) => (
            <button key={t} onClick={() => setIsLogin(i === 0)}
              style={{
                flex: 1, padding: "9px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: "none", cursor: "pointer", transition: "all 0.15s",
                background: (i === 0) === isLogin ? "#7c6fff" : "transparent",
                color: (i === 0) === isLogin ? "#fff" : "#6a6a8a"
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Google */}
        <button onClick={handleGoogle} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 500,
          background: "#16161f", border: "1px solid #2a2a3e", color: "#c0c0d8",
          cursor: "pointer", marginBottom: 20, transition: "all 0.15s"
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#1e1e2e" }} />
          <span style={{ fontSize: 12, color: "#4a4a6a" }}>or continue with email</span>
          <div style={{ flex: 1, height: 1, background: "#1e1e2e" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#4a4a6a" }} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
              required className="input-field" style={{ paddingLeft: 42, paddingRight: 16, paddingTop: 12, paddingBottom: 12, fontSize: 14 }} />
          </div>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#4a4a6a" }} />
            <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              required className="input-field" style={{ paddingLeft: 42, paddingRight: 42, paddingTop: 12, paddingBottom: 12, fontSize: 14 }} />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4a4a6a" }}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div style={{ background: "#ef444415", border: "1px solid #ef444430", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#ef4444" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary"
            style={{ padding: "13px", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "#4a4a6a", marginTop: 24 }}>
          <Link href="/" style={{ color: "#7c6fff", textDecoration: "none" }}>← Back to Home</Link>
        </p>
      </div>
    </main>
  );
}
