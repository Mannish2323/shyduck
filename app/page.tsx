"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Feather, 
  Compass, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Flame, 
  Star,
  Film,
  Headphones,
  Palette,
  CheckCircle2
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { GENRES, AUTHORS } from "@/lib/mock-data";
import { StoryCard } from "@/components/story-card";
import { AuthorCard } from "@/components/author-card";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function HomePage() {
  const { stories } = useShyduck();

  // Featured stories
  const featuredStories = stories.filter((s) => s.isFeatured);
  
  // Trending stories (sorted by reads/rating, top 5)
  const trendingStories = [...stories]
    .sort((a, b) => b.readsCount - a.readsCount)
    .slice(0, 5);

  // New releases
  const newReleases = [...stories]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  // Rising writers (top 4 authors)
  const risingWriters = AUTHORS.slice(0, 4);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#1c1f30]">
        {/* Atmospheric background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#e9b65a]/10 via-[#6366f1]/10 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-[#9333ea]/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="shell flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Copy & CTAs */}
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#171827] border border-[#2b2f48] text-xs text-[#e9b65a] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold tracking-wide uppercase text-[10px]">
                India&apos;s Premier Storyverse
              </span>
              <span className="text-[#595d75]">•</span>
              <span className="text-[#a0a5ba] text-[11px]">Where Stories Come Alive</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#fbf7ef] tracking-tight leading-[1.12]">
              Stories Beyond <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#fbf7ef] via-[#e9b65a] to-[#d4993a] bg-clip-text text-transparent italic">
                Imagination.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#9da2b8] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover original novels, anime-inspired stories and unforgettable worlds created by independent storytellers. Write without limits. Read without distraction.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/discover" 
                className="button button-primary w-full sm:w-auto px-7 py-3.5 text-sm font-semibold flex items-center justify-center space-x-2.5 shadow-lg shadow-[#e9b65a]/15 hover:shadow-[#e9b65a]/25 transition-all group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Reading</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link 
                href="/write" 
                className="button button-secondary w-full sm:w-auto px-7 py-3.5 text-sm font-semibold flex items-center justify-center space-x-2.5"
              >
                <Feather className="w-4 h-4 text-[#e9b65a]" />
                <span>Become a Writer</span>
              </Link>
            </div>

            {/* Secondary Visual Message */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-3 text-xs text-[#787d96]">
              <span className="w-8 h-[1px] bg-[#2d3148]" />
              <span className="font-serif italic text-sm text-[#cbd0e6]/90">
                Different Stories. Same Sky.
              </span>
              <span className="w-8 h-[1px] bg-[#2d3148]" />
            </div>
          </div>

          {/* Right: Featured Hero Visual Artwork / Highlight Box */}
          <div className="w-full max-w-md lg:max-w-lg">
            {featuredStories[0] && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e9b65a]/30 via-[#6366f1]/20 to-[#e9b65a]/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="relative">
                  <div className="absolute -top-3 -right-3 z-20">
                    <ShyduckMascot mood="reading" size={54} className="drop-shadow-lg" />
                  </div>
                  <StoryCard story={featuredStories[0]} variant="featured" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GENRE SHORTCUTS */}
      {/* ========================================================================= */}
      <section className="w-full py-6 border-b border-[#181a29] bg-[#0c0d18]/60 backdrop-blur-sm sticky top-[65px] z-30">
        <div className="shell">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-[#6e738d] uppercase tracking-wider pl-1 pr-2 shrink-0 flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-[#e9b65a]" />
              <span>Explore:</span>
            </span>
            {GENRES.map((genre) => (
              <Link
                key={genre}
                href={`/discover?genre=${encodeURIComponent(genre)}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#141624] text-[#a5abbf] border border-[#23263b] hover:border-[#e9b65a]/60 hover:text-[#fbf7ef] hover:bg-[#1a1d30] shrink-0 transition-all active:scale-95"
              >
                {genre}
              </Link>
            ))}
            <Link
              href="/genres"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#e9b65a] hover:text-[#fbf7ef] shrink-0 transition-colors flex items-center space-x-1"
            >
              <span>All Genres →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED WORLDS */}
      {/* ========================================================================= */}
      <section className="w-full py-16 shell">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Masterpieces</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef] mt-1">
              Featured Worlds
            </h2>
          </div>
          <Link
            href="/discover?sort=rating"
            className="text-xs sm:text-sm font-semibold text-[#e9b65a] hover:text-[#fbf7ef] transition-colors flex items-center space-x-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredStories.slice(0, 2).map((story) => (
            <StoryCard key={story.id} story={story} variant="featured" />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TRENDING NOW (RANKED 1 - 5) */}
      {/* ========================================================================= */}
      <section className="w-full py-16 bg-[#080911] border-y border-[#171927]">
        <div className="shell">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Readers Are Devouring</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef] mt-1">
                Trending Now
              </h2>
            </div>
            <Link
              href="/discover?sort=popular"
              className="text-xs sm:text-sm font-semibold text-[#e9b65a] hover:text-[#fbf7ef] transition-colors flex items-center space-x-1"
            >
              <span>Rankings Leaderboard →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {trendingStories.map((story, index) => (
              <StoryCard 
                key={story.id} 
                story={story} 
                variant="trending" 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEW RELEASES */}
      {/* ========================================================================= */}
      <section className="w-full py-16 shell">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Fresh Chapters & Debuts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef] mt-1">
              New Releases
            </h2>
          </div>
          <Link
            href="/discover?sort=newest"
            className="text-xs sm:text-sm font-semibold text-[#e9b65a] hover:text-[#fbf7ef] transition-colors"
          >
            <span>See New Chapters →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((story) => (
            <StoryCard key={story.id} story={story} variant="standard" />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RISING WRITERS */}
      {/* ========================================================================= */}
      <section className="w-full py-16 bg-[#0c0d18] border-y border-[#1a1d2e]">
        <div className="shell">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
                <Feather className="w-3.5 h-3.5" />
                <span>Voices of the New Age</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef] mt-1">
                Rising Storytellers
              </h2>
            </div>
            <Link
              href="/community"
              className="text-xs sm:text-sm font-semibold text-[#e9b65a] hover:text-[#fbf7ef] transition-colors"
            >
              <span>Meet the Authors →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {risingWriters.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EXPLORE BY GENRE (EDITORIAL CARDS) */}
      {/* ========================================================================= */}
      <section className="w-full py-16 shell">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="eyebrow text-[#e9b65a]">Atmospheric Journeys</div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef]">
            Explore by Genre
          </h2>
          <p className="text-xs sm:text-sm text-[#8f94ad]">
            From quiet monsoon magic to sprawling cyber-cities, find the cadence that resonates with your imagination.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Fantasy", icon: "⚔️", count: "42 Worlds", color: "from-amber-500/20 to-orange-950/40" },
            { name: "Romance", icon: "🥀", count: "29 Stories", color: "from-rose-500/20 to-pink-950/40" },
            { name: "Sci-Fi", icon: "🛰️", count: "31 Chronicles", color: "from-cyan-500/20 to-blue-950/40" },
            { name: "Mystery", icon: "🗝️", count: "18 Cases", color: "from-violet-500/20 to-indigo-950/40" },
            { name: "Horror", icon: "🕯️", count: "14 Nightmares", color: "from-red-600/20 to-stone-950/40" },
            { name: "Historical", icon: "📜", count: "21 Epics", color: "from-emerald-500/20 to-teal-950/40" },
          ].map((g) => (
            <Link
              key={g.name}
              href={`/genres/${g.name.toLowerCase()}`}
              className={`group p-5 rounded-2xl border border-[#23263c] bg-gradient-to-b ${g.color} hover:border-[#e9b65a]/50 transition-all duration-300 flex flex-col items-center text-center space-y-2 hover:-translate-y-1`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {g.icon}
              </span>
              <h3 className="font-serif font-bold text-sm text-[#fbf7ef] group-hover:text-[#e9b65a] transition-colors">
                {g.name}
              </h3>
              <span className="text-[11px] text-[#7f849c]">
                {g.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMMUNITY & ROUND TABLE CTA */}
      {/* ========================================================================= */}
      <section className="w-full py-16 bg-gradient-to-r from-[#0c0d1a] via-[#121326] to-[#0c0d1a] border-y border-[#1e2238]">
        <div className="shell flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="eyebrow flex items-center justify-center md:justify-start space-x-1.5 text-[#e9b65a]">
              <Users className="w-3.5 h-3.5" />
              <span>The Reader&apos;s Round Table</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef]">
              Discuss theories. Unpack lore. Connect.
            </h2>
            <p className="text-sm text-[#9da2ba] leading-relaxed">
              Every great story has mysteries meant to be solved together. Join discussions, share character art, vote on chapter cliffhangers, and become part of the story&apos;s living universe.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/community"
              className="button button-primary px-6 py-3 text-sm font-semibold flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Join the Community</span>
            </Link>
            <Link
              href="/stories/the-last-dragon"
              className="button button-secondary px-6 py-3 text-sm font-semibold"
            >
              <span>Explore Lore Hub</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WRITER STUDIO CTA */}
      {/* ========================================================================= */}
      <section className="w-full py-20 shell">
        <div className="relative overflow-hidden rounded-3xl border border-[#272b42] bg-gradient-to-b from-[#131526] to-[#0d0e1b] p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e9b65a]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#e9b65a]/15 text-[#e9b65a] text-xs font-semibold border border-[#e9b65a]/30">
              <Feather className="w-3.5 h-3.5" />
              <span>Creator Studio V1</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
              Have a story to tell? <br />
              <span className="text-[#e9b65a] italic">Build a world around it.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#9fa5bc] leading-relaxed">
              Write one chapter at a time with distraction-free autosave, establish character lore, build an interactive encyclopedia, and cultivate readers who care about your craft.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#cad0e6]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
                <span>Distraction-free rich chapter editor</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
                <span>Interactive character & world encyclopedia</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
                <span>Real-time chapter analytics & reader retention</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
                <span>Path to future comic & audio adaptation</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/write"
                className="button button-primary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#e9b65a]/20"
              >
                <Feather className="w-4 h-4" />
                <span>Open Writer Studio</span>
              </Link>
              <Link
                href="/guidelines"
                className="text-xs font-medium text-[#8f94ad] hover:text-[#fbf7ef] transition-colors"
              >
                Read Creator Guidelines →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FUTURE VISION: STORIES TODAY. WORLDS TOMORROW. */}
      {/* ========================================================================= */}
      <section className="w-full py-16 bg-[#07080f] border-t border-[#181a2b]">
        <div className="shell text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#202338] border border-[#2d3250] text-[11px] text-[#b0b6cf]">
            <Sparkles className="w-3 h-3 text-[#e9b65a]" />
            <span className="font-semibold uppercase tracking-wider">Future Vision • Coming Soon</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf7ef]">
            Stories today. <span className="text-[#e9b65a] italic">Worlds tomorrow.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#8c91a8] leading-relaxed">
            Every grand franchise began with words on a page. Shyduck Tales is building the foundation where high-performing written novels unlock community-driven adaptation into next-generation visual and audio storytelling.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl border border-[#1e2236] bg-[#0f111f]/60 space-y-2">
              <Palette className="w-5 h-5 text-amber-400" />
              <h4 className="font-semibold text-xs text-[#fbf7ef]">Comics & Webtoons</h4>
              <p className="text-[11px] text-[#71768e] leading-snug">Visual adaptation pipeline partnering creators with artists.</p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2236] bg-[#0f111f]/60 space-y-2">
              <Headphones className="w-5 h-5 text-indigo-400" />
              <h4 className="font-semibold text-xs text-[#fbf7ef]">Audio Dramas</h4>
              <p className="text-[11px] text-[#71768e] leading-snug">Multi-voice theatrical audio with immersive soundscapes.</p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2236] bg-[#0f111f]/60 space-y-2">
              <Film className="w-5 h-5 text-rose-400" />
              <h4 className="font-semibold text-xs text-[#fbf7ef]">Motion Comics</h4>
              <p className="text-[11px] text-[#71768e] leading-snug">Cinematic dynamic pan & zoom with soundtrack.</p>
            </div>

            <div className="p-4 rounded-xl border border-[#1e2236] bg-[#0f111f]/60 space-y-2">
              <Sparkles className="w-5 h-5 text-[#e9b65a]" />
              <h4 className="font-semibold text-xs text-[#fbf7ef]">Animation Shorts</h4>
              <p className="text-[11px] text-[#71768e] leading-snug">Community-backed animated pilots for breakout universes.</p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/support"
              className="text-xs font-semibold text-[#e9b65a] hover:underline"
            >
              Learn how the Adaptation Program works →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
