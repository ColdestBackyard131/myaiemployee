"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, MessageSquare, Mic, Users, CheckSquare, FolderOpen, Share2, Settings, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { href: "/chat", icon: <MessageSquare size={20} />, label: "AI Chat" },
  { href: "/voice", icon: <Mic size={20} />, label: "Voice" },
  { href: "/employees", icon: <Users size={20} />, label: "AI Employees" },
  { href: "/tasks", icon: <CheckSquare size={20} />, label: "Tasks" },
  { href: "/social", icon: <Share2 size={20} />, label: "Social Media" },
  { href: "/projects", icon: <FolderOpen size={20} />, label: "Projects" },
  { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <aside className="glass h-screen w-64 flex flex-col fixed left-0 top-0 z-40"
      style={{ borderRight: "1px solid var(--border)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <Image src="/images/logo.jpeg" alt="My AI Employee" width={36} height={36} className="rounded-xl" />
        <span className="font-black text-base gradient-text">My AI Employee</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{
                background: active ? "rgba(108,99,255,0.2)" : "transparent",
                color: active ? "#6c63ff" : "var(--text-secondary)",
                border: active ? "1px solid rgba(108,99,255,0.3)" : "1px solid transparent",
              }}>
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all hover:scale-105"
          style={{ color: "#ef4444" }}>
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
