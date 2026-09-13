"use client";

import Link from "next/link";
import { BarChart3, BookOpen, Feather, FilePlus2, Globe2, Lightbulb, Settings, Users, WandSparkles } from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

const creatorNav = [
  { href: "/write", label: "Dashboard", icon: BookOpen },
  { href: "/write#stories", label: "My Stories", icon: Feather },
  { href: "/write/stories/new", label: "New Story", icon: FilePlus2 },
  { href: "/write#analytics", label: "Analytics", icon: BarChart3 },
  { href: "/community", label: "Reading Audience", icon: Users },
  { href: "/guidelines", label: "Creator Tools", icon: WandSparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function CreatorSidebar() {
  return (
    <aside className="hidden lg:flex w-[236px] shrink-0 flex-col rounded-3xl border border-[#232943] bg-[#0c0e1c]/90 p-4 shadow-2xl shadow-black/20">
      <Link href="/" className="mb-8 flex items-center gap-3 px-2 py-2">
        <ShyduckMascot size={38} mood="curious" />
        <span>
          <span className="block font-sans text-[11px] font-extrabold tracking-[.14em] text-[#fbf7ef]">SHYDUCK TALES</span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.14em] text-[#e9b65a]">Stories deserve worlds</span>
        </span>
      </Link>

      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#666d89]">Creator space</div>
      <nav className="space-y-1" aria-label="Creator space navigation">
        {creatorNav.map(({ href, label, icon: Icon }) => (
          <Link key={label} href={href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${label === "Dashboard" ? "bg-[#e9b65a] text-[#0a0b14] shadow-lg shadow-[#e9b65a]/10" : "text-[#8d93ad] hover:bg-[#171a2c] hover:text-[#fbf7ef]"}`}>
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-[#20243a] pt-4">
        <Link href="/vision" className="block rounded-2xl border border-[#34314a] bg-gradient-to-br from-[#25223b] to-[#151727] p-4 transition-transform hover:-translate-y-0.5">
          <div className="mb-2 flex items-center gap-2 text-[#e9b65a]"><Lightbulb className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-wider">Creator note</span></div>
          <p className="text-xs leading-relaxed text-[#c1c3d1]">Your first world does not need to be perfect. It only needs a beginning.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#e9b65a]">Read the vision <Globe2 className="h-3 w-3" /></span>
        </Link>
      </div>
    </aside>
  );
}

export function CreatorHero({ name }: { name: string }) {
  return <section className="relative overflow-hidden rounded-3xl border border-[#282c48] bg-[radial-gradient(circle_at_80%_15%,rgba(125,111,212,.24),transparent_38%),linear-gradient(135deg,#15182d,#0f1120)] p-6 sm:p-8">
    <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#e9b65a]/10 blur-3xl" aria-hidden="true" />
    <div className="relative flex items-center justify-between gap-8">
      <div className="max-w-xl">
        <div className="eyebrow flex items-center gap-2"><Feather className="h-3.5 w-3.5" /> Creative workspace</div>
        <h1 className="mt-3 font-serif-title text-3xl font-bold tracking-tight text-[#fbf7ef] sm:text-4xl">Good evening, <span className="italic text-[#e9b65a]">{name}.</span></h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#a1a6bd]">Welcome to your creative space. Turn your ideas into worlds, one chapter at a time.</p>
      </div>
      <div className="hidden sm:block"><ShyduckMascot size={112} mood="creative" className="drop-shadow-2xl" /></div>
    </div>
  </section>;
}

export function EmptyStoryState() {
  return <section className="relative overflow-hidden rounded-3xl border border-[#3c3750] bg-[radial-gradient(circle_at_88%_10%,rgba(155,145,232,.2),transparent_33%),linear-gradient(135deg,#18172a,#111322)] p-7 sm:p-10">
    <div className="absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-[#e9b65a]/10 blur-3xl" aria-hidden="true" />
    <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
      <div className="max-w-xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9b65a]/30 bg-[#e9b65a]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#e9b65a]"><SparkleDot /> Your blank page awaits</div>
        <h2 className="font-serif-title text-3xl font-bold leading-tight text-[#fbf7ef] sm:text-4xl">You haven&apos;t created a story yet.</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#aeb1c2]">Every great world begins with a blank page. Start writing your first story and share it with readers around the world.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/write/stories/new" className="button button-primary px-5 py-3 text-xs font-bold">Create your first story <span aria-hidden="true">→</span></Link>
          <Link href="/guidelines" className="button button-secondary px-5 py-3 text-xs font-bold">View writing guide</Link>
        </div>
      </div>
      <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-[#e9b65a]/20 bg-[#0e1020]/70 shadow-[0_0_70px_rgba(233,182,90,.12)] sm:h-48 sm:w-48"><div className="absolute inset-5 rounded-full border border-dashed border-[#9b91e8]/30" /><ShyduckMascot size={108} mood="writing" className="relative" /></div>
    </div>
  </section>;
}

function SparkleDot() { return <span className="grid h-4 w-4 place-items-center rounded-full bg-[#e9b65a] text-[9px] text-[#0a0b14]">✦</span>; }

export function QuickActionCard({ href, icon: Icon, title, description }: { href: string; icon: typeof Feather; title: string; description: string }) {
  return <Link href={href} className="group rounded-2xl border border-[#242942] bg-[#111322] p-4 transition-all hover:-translate-y-1 hover:border-[#e9b65a]/50 hover:bg-[#17192c]"><span className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-[#e9b65a]/10 text-[#e9b65a] transition-colors group-hover:bg-[#e9b65a] group-hover:text-[#0a0b14]"><Icon className="h-4 w-4" /></span><strong className="block text-sm text-[#f4f1e8]">{title}</strong><span className="mt-1 block text-xs leading-relaxed text-[#7f849b]">{description}</span></Link>;
}

export function DashboardSkeleton() {
  return <div className="space-y-4" aria-label="Loading creator dashboard" aria-busy="true"><div className="h-56 animate-pulse rounded-3xl bg-[#171a2d]" /><div className="grid gap-4 sm:grid-cols-2"><div className="h-28 animate-pulse rounded-2xl bg-[#171a2d]" /><div className="h-28 animate-pulse rounded-2xl bg-[#171a2d]" /></div></div>;
}
