"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, MessageSquare, Mic, Users,
  CheckSquare, FolderOpen, Share2, Settings, LogOut, Menu, X
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
  { href: "/chat", icon: <MessageSquare size={16} />, label: "AI Chat" },
  { href: "/voice", icon: <Mic size={16} />, label: "Voice" },
  { href: "/employees", icon: <Users size={16} />, label: "AI Employees" },
  { href: "/tasks", icon: <CheckSquare size={16} />, label: "Tasks" },
  { href: "/social", icon: <Share2 size={16} />, label: "Social Media" },
  { href: "/projects", icon: <FolderOpen size={16} />, label: "Projects" },
  { href: "/settings", icon: <Settings size={16} />, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (window.innerWidth < 768) setOpen(false);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: 16,
          left: open ? 248 : 16,
          zIndex: 100,
          width: 34,
          height: 34,
          borderRadius: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "rgba(255,255,255,0.6)",
          transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
          backdropFilter: "blur(10px)",
        }}>
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 49,
            backdropFilter: "blur(2px)",
            display: "none",
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "" : "closed"}`}>
        {/* Logo */}
        <div style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 44 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #7c6fff, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden",
            }}>
              <Image src="/images/logo.jpeg" alt="Logo" width={34} height={34} style={{ borderRadius: 9 }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>My AI Employee</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 0.3 }}>AI Platform v1.0</div>
            </div>
          </div>
        </div>

        {/* Online status */}
        <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.15)",
            borderRadius: 8, padding: "6px 10px",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
            <span style={{ fontSize: 11, color: "#34d399", fontWeight: 500 }}>All AI Employees Online</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 1, padding: "6px 8px 8px" }}>
            Navigation
          </p>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { if (window.innerWidth < 768) setOpen(false); }}
                className={`nav-item ${active ? "active" : ""}`}>
                <span style={{ opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
                {active && (
                  <span style={{
                    marginLeft: "auto", width: 5, height: 5,
                    borderRadius: "50%", background: "#a78bfa", flexShrink: 0,
                    boxShadow: "0 0 6px #a78bfa"
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={handleLogout}
            className="nav-item"
            style={{ width: "100%", background: "none", border: "none", color: "rgba(239,68,68,0.7)", cursor: "pointer" }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Dynamic margin for main content */}
      <style>{`
        .main-content {
          margin-left: ${open ? "240px" : "0px"} !important;
        }
      `}</style>
    </>
  );
}
