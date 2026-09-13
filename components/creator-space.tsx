"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  BookOpen, 
  Feather, 
  FilePlus2, 
  Globe2, 
  Lightbulb, 
  Settings, 
  Users, 
  WandSparkles,
  Compass,
  ArrowRight,
  Sparkles,
  PenTool
} from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

const CREATOR_NAV = [
  { href: "/write", label: "Dashboard", icon: BookOpen },
  { href: "/write#stories", label: "My Stories", icon: Feather },
  { href: "/write/stories/new", label: "New Story", icon: FilePlus2 },
  { href: "/write#analytics", label: "Analytics", icon: BarChart3 },
  { href: "/community", label: "Reading Audience", icon: Users },
  { href: "/guidelines", label: "Creator Tools", icon: WandSparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

/**
 * Clean, modern Creator Space Sidebar.
 * Collapses smoothly on mobile & tablet while offering full desktop ergonomics.
 */
export function CreatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col rounded-3xl border border-[#21263f] bg-[#0c0e1d]/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      {/* Brand Header */}
      <Link href="/" className="mb-8 flex items-center gap-3 px-2 py-1 group">
        <ShyduckMascot size={38} mood="curious" className="transition-transform group-hover:scale-105" />
        <div>
          <span className="block font-sans text-xs font-black tracking-[0.14em] text-[#fbf7ef]">
            SHYDUCK TALES
          </span>
          <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-[#e9b65a]">
            Stories Deserve Worlds
          </span>
        </div>
      </Link>

      {/* Navigation Label */}
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#636a87]">
        Creator Space
      </div>

      {/* Nav links */}
      <nav className="space-y-1" aria-label="Creator space navigation">
        {CREATOR_NAV.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#e9b65a] text-[#0a0b14] shadow-lg shadow-[#e9b65a]/15 font-bold"
                  : "text-[#8a91aa] hover:bg-[#16192d] hover:text-[#fbf7ef]"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-[#0a0b14]" : "text-[#757c96] group-hover:text-[#e9b65a]"}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Creator Inspiration Card */}
      <div className="mt-auto border-t border-[#1f2339] pt-5">
        <Link
          href="/vision"
          className="block rounded-2xl border border-[#2e2a44] bg-gradient-to-br from-[#1f1d33] to-[#121424] p-4 transition-all hover:border-[#e9b65a]/40 hover:-translate-y-0.5 group"
        >
          <div className="mb-2 flex items-center gap-2 text-[#e9b65a]">
            <Lightbulb className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Creator Note</span>
          </div>
          <p className="text-xs leading-relaxed text-[#c4c7d7]">
            &ldquo;Your first world does not need to be perfect. It only needs a beginning.&rdquo;
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#e9b65a] group-hover:underline">
            Read our vision <Globe2 className="h-3 w-3" />
          </span>
        </Link>
      </div>
    </aside>
  );
}

/**
 * Hero Area with personalized greeting and cinematic literary illustration.
 */
export function CreatorHero({ name }: { name: string }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#242944] bg-[radial-gradient(ellipse_at_80%_20%,rgba(125,111,212,0.22),transparent_50%),linear-gradient(135deg,#13162b_0%,#0e1020_100%)] p-6 sm:p-8 shadow-xl">
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#e9b65a]/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-8">
        <div className="max-w-xl space-y-2">
          <div className="eyebrow flex items-center gap-2 text-[#e9b65a]">
            <Feather className="h-3.5 w-3.5" />
            <span>Creative Workspace</span>
          </div>
          <h1 id="creator-dashboard-title" className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#fbf7ef]">
            Good evening, <span className="italic text-[#e9b65a]">{name}.</span>
          </h1>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#9ba0b7]">
            Welcome to your creative space. Turn your ideas into worlds, one chapter at a time.
          </p>
        </div>

        {/* Mascot Artwork */}
        <div className="hidden sm:flex shrink-0 items-center justify-center pr-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShyduckMascot size={110} mood="creative" className="drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Master Empty State for new writers with zero stories.
 * Featuring Shyduck at a fantasy library desk, inspiring copy, and working CTAs.
 */
export function EmptyStoryState() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-[#312c47] bg-[radial-gradient(ellipse_at_85%_15%,rgba(155,145,232,0.18),transparent_40%),linear-gradient(135deg,#16152a_0%,#0f1122_100%)] p-7 sm:p-10 shadow-2xl"
    >
      <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-[#e9b65a]/10 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9b65a]/30 bg-[#e9b65a]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e9b65a]">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#e9b65a] text-[9px] text-[#0a0b14] font-black">✦</span>
            <span>Your Blank Page Awaits</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#fbf7ef]">
              You haven&apos;t created a story yet.
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#e9b65a]/90">
              Every great world begins with a blank page.
            </p>
          </div>

          <p className="max-w-lg text-xs sm:text-sm leading-relaxed text-[#9ca1b7]">
            Start writing your first story and share it with readers around the world. As you serialize chapters, real reader reactions, bookmarks, and readership retention data will appear here.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/write/stories/new"
              className="button button-primary px-6 py-3 text-xs font-bold shadow-lg shadow-[#e9b65a]/20 flex items-center gap-2"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Create Your First Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/guidelines"
              className="button button-secondary px-5 py-3 text-xs font-bold flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#e9b65a]" />
              <span>Explore Writing Guide</span>
            </Link>
          </div>
        </div>

        {/* Fantasy Library Illustration with Shyduck Writing */}
        <div className="relative mx-auto flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center rounded-full border border-[#e9b65a]/25 bg-[#0e1022]/80 shadow-[0_0_80px_rgba(233,182,90,0.12)]">
          <div className="absolute inset-4 rounded-full border border-dashed border-[#9b91e8]/30 animate-[spin_60s_linear_infinite]" />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            <ShyduckMascot size={115} mood="writing" className="drop-shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/**
 * Functional Quick Action Card for the Creator Studio.
 */
export function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#21263d] bg-[#0f1122] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#e9b65a]/50 hover:bg-[#15182d] hover:shadow-xl hover:shadow-black/20"
    >
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#e9b65a]/10 text-[#e9b65a] transition-all group-hover:bg-[#e9b65a] group-hover:text-[#0a0b14] group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>
      <strong className="block font-serif font-bold text-sm text-[#fbf7ef] group-hover:text-[#e9b65a] transition-colors">
        {title}
      </strong>
      <span className="mt-1 block text-xs leading-relaxed text-[#7c8299]">
        {description}
      </span>
    </Link>
  );
}

/**
 * Elegant dark skeleton loader for dashboard hydration.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading creator dashboard" aria-busy="true">
      <div className="h-48 animate-pulse rounded-3xl bg-[#14172c] border border-[#20253f]" />
      <div className="h-64 animate-pulse rounded-3xl bg-[#14172c] border border-[#20253f]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-[#14172c] border border-[#20253f]" />
        ))}
      </div>
    </div>
  );
}

/**
 * Graceful gate when a signed-in writer visits an unowned story or tool.
 */
export function WriterStoryGate({
  title = "Open a story from your studio.",
  description = "This creator tool only works with a story created by your active writer profile.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <main className="shell flex min-h-[70vh] items-center justify-center py-12">
      <div className="max-w-md rounded-3xl border border-[#242944] bg-[#0e1022] p-8 text-center shadow-2xl">
        <div className="eyebrow text-[#e9b65a]">Creator Space</div>
        <h1 className="mt-3 font-serif text-2xl font-bold text-[#fbf7ef]">{title}</h1>
        <p className="mt-3 text-xs leading-relaxed text-[#8f95ad]">{description}</p>
        <Link href="/write/stories/new" className="button button-primary mt-6 px-6 py-3 text-xs font-bold">
          Create a story →
        </Link>
      </div>
    </main>
  );
}
