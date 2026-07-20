"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, MessageSquare, Mic, Users, CheckSquare, FolderOpen, Share2, Settings, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard size={17} />, label: "Dashboard" },
  { href: "/chat", icon: <MessageSquare size={17} />, label: "AI Chat" },
  { href: "/voice", icon: <Mic size={17} />, label: "Voice" },
  { href: "/employees", icon: <Users size={17} />, label: "AI Employees" },
  { href: "/tasks", icon: <CheckSquare size={17} />, label: "Tasks" },
  { href: "/social", icon: <Share2 size={17} />, label: "Social Media" },
  { href: "/projects", icon: <FolderOpen size={17} />, label: "Projects" },
  { href: "/settings", icon: <Settings size={17} />, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #1a1a28" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/images/logo.jpeg" alt="My AI Employee" width={32} height={32}
            style={{ borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>My AI Employee</div>
            <div style={{ fontSize: 11, color: "#4a4a6a" }}>AI Productivity Platform</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#3a3a5a", textTransform: "uppercase", letterSpacing: "0.8px", padding: "4px 8px 8px" }}>
          Main Menu
        </div>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`}>
              {item.icon}
              {item.label}
              {active && (
                <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#7c6fff" }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid #1a1a28" }}>
        <button onClick={handleLogout} className="nav-item" style={{ width: "100%", background: "none", border: "none", color: "#ef4444", textAlign: "left" }}>
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
}
