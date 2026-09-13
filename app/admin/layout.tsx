"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  AlertOctagon, 
  Sparkles, 
  History, 
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { useShyduck } from "@/lib/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useShyduck();

  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/stories", label: "Stories & Content", icon: BookOpen },
    { href: "/admin/media", label: "Media Manager", icon: ImageIcon },
    { href: "/admin/reports", label: "Moderation Queue", icon: AlertOctagon },
    { href: "/admin/featured", label: "Homepage Control", icon: Sparkles },
    { href: "/admin/audit", label: "Audit Logs", icon: History },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#080911] text-[#fbf7ef]">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#1a1d30] bg-[#0c0d18] p-5 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#e9b65a] uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Admin Console</span>
            </div>
            <h2 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Shyduck Control
            </h2>
            <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Session: Administrator</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/admin" 
                ? pathname === "/admin" 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#e9b65a] text-[#0a0b14] shadow-md shadow-[#e9b65a]/15"
                      : "text-[#8a8fa6] hover:text-[#fbf7ef] hover:bg-[#15172b]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#181a2c]">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs text-[#7e849d] hover:text-[#e9b65a] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin View Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
