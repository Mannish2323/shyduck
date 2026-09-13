import React from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Feather, Heart, ArrowRight } from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export const metadata = {
  title: "About — Shyduck Tales",
  description: "Learn about the mission, philosophy, and storytellers behind Shyduck Tales."
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen py-16 shell max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-3">
          <ShyduckMascot mood="peaceful" size={54} />
          <div className="text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e9b65a] block">
              Origin & Philosophy
            </span>
            <span className="font-serif font-bold text-lg text-[#fbf7ef]">
              The Shyduck Manifesto
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#fbf7ef] tracking-tight leading-tight">
          Where Stories <br className="hidden sm:inline" />
          <span className="text-[#e9b65a] italic">Come Alive.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9ea4bc] leading-relaxed max-w-2xl">
          We believe that stories deserve worlds. Shyduck Tales was founded to create an India-first storytelling platform honoring deep serials, speculative fiction, anime-inspired epics, and subcontinent mythologies.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-3">
          <div className="p-3 rounded-2xl bg-[#17192d] text-[#e9b65a] w-fit">
            <Feather className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
            For Writers First
          </h3>
          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Distraction-free chapter drafting, transparent reader retention analytics, and direct control over character bibles and world lore.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-3">
          <div className="p-3 rounded-2xl bg-[#17192d] text-sky-400 w-fit">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
            Pure Reading Sanctuary
          </h3>
          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Comfortable typography, customizable light/dark/sepia modes, scroll progress persistence, and no noisy ads interrupting the prose.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-3">
          <div className="p-3 rounded-2xl bg-[#17192d] text-purple-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
            Living Universes
          </h3>
          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Every story is more than a book. It is a living world with encyclopedias, factions, character relationships, and community theories.
          </p>
        </div>
      </div>

      {/* Editorial Mission */}
      <div className="p-8 sm:p-10 rounded-3xl border border-[#23273e] bg-gradient-to-br from-[#121428] via-[#0d0f1e] to-[#090a14] space-y-6 text-sm text-[#cbd0e6] leading-relaxed">
        <h2 className="font-serif font-bold text-2xl text-[#fbf7ef]">
          Different Stories. Same Sky.
        </h2>
        <p>
          For decades, Indian readers grew up devouring translated light novels, Western fantasy series, and Japanese manga—always wondering when our own folklore, cities, languages, and philosophies would receive the same cinematic dedication.
        </p>
        <p>
          Shyduck Tales is that home. From monsoon-swept Kolkata sea citadels to neon-drenched Bengaluru cyberpunk loops, we are providing the platform where independent creators can publish with dignity, build fandoms, and see their stories take root in readers&apos; hearts.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1c2035]">
        <span className="text-xs text-[#82879e]">
          Ready to discover your next favorite universe?
        </span>
        <div className="flex items-center space-x-3">
          <Link href="/discover" className="button button-primary px-5 py-2.5 text-xs font-semibold">
            Explore All Stories
          </Link>
          <Link href="/write" className="button button-secondary px-5 py-2.5 text-xs font-semibold">
            Start Writing Today
          </Link>
        </div>
      </div>
    </div>
  );
}
