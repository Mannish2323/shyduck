"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 safe-bottom shadow-2xl"
      style={{
        backgroundColor: 'rgba(12, 13, 24, 0.92)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        borderTop: '1px solid rgba(233, 182, 90, 0.08)',
      }}
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
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200"
              style={{
                color: isActive ? '#e9b65a' : '#8c90a4',
              }}
            >
              <motion.div
                className="relative"
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ strokeWidth: isActive ? 2.2 : 1.6 }}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#e9b65a] text-[#0a0b14] text-[9px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span
                className="text-[10px] mt-1 font-medium tracking-wide"
                style={{
                  color: isActive ? '#e9b65a' : undefined,
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.span
                  className="absolute bottom-0 w-1.5 h-0.5 rounded-full bg-[#e9b65a]"
                  layoutId="mobileNavIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
