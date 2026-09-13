"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Compass, 
  BookMarked, 
  Feather, 
  User, 
  Bell
} from "lucide-react";
import { useShyduck } from "@/lib/store";

export function MobileNav() {
  const pathname = usePathname();
  const { unreadNotificationsCount, user } = useShyduck();

  // Hide mobile nav in distraction-free reader to ensure immersive reading
  if (pathname.includes("/chapters/")) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discover", icon: Compass },
    { label: "Library", href: "/library", icon: BookMarked },
    { label: "Write", href: "/write", icon: Feather },
    { 
      label: "Alerts", 
      href: "/notifications", 
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null 
    },
    { 
      label: "Account", 
      href: user?.role === "writer" ? "/write" : "/settings", 
      icon: User 
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d18]/95 backdrop-blur-xl border-t border-[#23263b] px-2 py-2 safe-bottom shadow-2xl"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-[#e9b65a]" 
                  : "text-[#8c90a4] hover:text-[#fbf7ef] active:scale-95"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.2]" : "stroke-[1.6]"}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#e9b65a] text-[#0a0b14] text-[9px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-wide ${isActive ? "text-[#e9b65a] font-semibold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-1.5 h-0.5 rounded-full bg-[#e9b65a]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
