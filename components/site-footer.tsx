"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShyduckMascot } from "@/components/shyduck-mascot";
import { 
  Sparkles, 
  Heart, 
  ArrowUpRight, 
  Feather,
  BookOpen,
  Globe
} from "lucide-react";

export function SiteFooter() {
  const pathname = usePathname();

  // Hide footer on reader page to preserve distraction-free reading flow
  if (pathname.includes("/chapters/")) {
    return null;
  }

  return (
    <footer className="w-full bg-[#080911] text-[#a0a5ba] text-sm relative overflow-hidden">
      {/* Animated gradient wave divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e9b65a]/40 to-transparent" />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#9b91e8]/20 to-transparent mt-px" />

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-[#e9b65a]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-gradient-to-b from-[#9b91e8]/3 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-24 md:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#1c1f30]">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="relative">
                <div className="transition-transform group-hover:rotate-6 duration-300">
                  <ShyduckMascot mood="creative" size={38} />
                </div>
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9b65a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9b65a]"></span>
                </span>
              </div>
              <div>
                <span className="font-serif font-black text-xl tracking-tight text-[#fbf7ef] block">
                  SHYDUCK <span className="text-[#e9b65a] font-serif italic">TALES</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#828699] font-medium block">
                  India&apos;s Storyverse
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#8c90a4] leading-relaxed max-w-sm">
              Where Stories Come Alive. An India-first storytelling and novel platform uniting independent fiction writers, anime-inspired creators, and passionate readers.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#e9b65a] bg-[#e9b65a]/10 px-3 py-1.5 rounded-full w-fit border border-[#e9b65a]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-medium tracking-wide">Write • Publish • Read • Build Worlds</span>
            </div>
          </div>

          {/* Platform */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf7ef]/90">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { href: "/", label: "Home" },
                { href: "/discover", label: "Discover" },
                { href: "/genres", label: "Genres" },
                { href: "/community", label: "Community" },
                { href: "/library", label: "My Library" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#e9b65a] transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/write" className="hover:text-[#e9b65a] transition-colors duration-200 flex items-center space-x-1">
                  <span>Creator Studio</span>
                  <span className="text-[9px] bg-[#e9b65a]/20 text-[#e9b65a] px-1.5 py-0.5 rounded font-bold">PRO</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Writers */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf7ef]/90">
              For Writers
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { href: "/write/stories/new", label: "Publish a Story" },
                { href: "/guidelines", label: "Writer Guidelines" },
                { href: "/write", label: "Story Analytics" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#e9b65a] transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/support" className="hover:text-[#e9b65a] transition-colors duration-200 flex items-center space-x-1">
                  <span>Story Adaptation</span>
                  <span className="text-[9px] bg-[#3a4163] text-[#bac0d6] px-1 rounded">Vision</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf7ef]/90">
              Vision & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { href: "/about", label: "About Shyduck" },
                { href: "/vision", label: "Our Grand Vision" },
                { href: "/support", label: "Adaptation Program" },
                { href: "/guidelines#rules", label: "Community Rules" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#e9b65a] transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-[#64687d] hover:text-[#e9b65a] transition-colors duration-200 text-[11px]">
                  Admin Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf7ef]/90">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { href: "https://discord.com", label: "Discord" },
                { href: "https://x.com", label: "X / Twitter" },
                { href: "https://instagram.com", label: "Instagram" },
                { href: "https://youtube.com", label: "YouTube" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#e9b65a] transition-colors duration-200 flex items-center space-x-1 group/social"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40 group-hover/social:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71758a]">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} Shyduck Tales Inc.</span>
            <span>•</span>
            <span className="text-[#e9b65a]/80 font-medium">Stories Beyond Imagination.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#e9b65a] fill-[#e9b65a]" />
              <span>for storytellers across India</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
