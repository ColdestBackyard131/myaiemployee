"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-primary)" }}>
      <div className="glass rounded-3xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Image src="/images/logo.jpeg" alt="My AI Employee" width={72} height={72} className="rounded-2xl glow" />
          </div>
          <h1 className="text-2xl font-black gradient-text">My AI Employee</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex rounded-xl p-1 mb-6" style={{ background: "var(--bg-secondary)" }}>
          <button onClick={() => setIsLogin(true)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: isLogin ? "var(--accent)" : "transparent", color: isLogin ? "#fff" : "var(--text-secondary)" }}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: !isLogin ? "var(--accent)" : "transparent", color: !isLogin ? "#fff" : "var(--text-secondary)" }}>
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
              required className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
            <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              required className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button type="submit" disabled={loading}
            className="py-3 rounded-xl font-bold text-sm glow transition-all hover:scale-105 disabled:opacity-50"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Google */}
        <button onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}>
          <Chrome size={18} /> Continue with Google
        </button>

        <p className="text-center text-xs mt-6" style={{ color: "var(--text-secondary)" }}>
          <Link href="/" style={{ color: "#6c63ff" }}>← Back to Home</Link>
        </p>
      </div>
    </main>
  );
}
