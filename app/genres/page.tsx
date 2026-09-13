"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, ArrowRight, BookOpen } from "lucide-react";
import { useShyduck } from "@/lib/store";
import { GENRES } from "@/lib/mock-data";

const GENRE_METADATA: Record<string, { icon: string; description: string; gradient: string }> = {
  Fantasy: {
    icon: "⚔️",
    description: "Epic magic systems, ancient deities, mythical beasts, and realms steeped in subcontinent wonder.",
    gradient: "from-amber-500/15 via-orange-950/25 to-[#0e101d]"
  },
  Romance: {
    icon: "🥀",
    description: "Tender slow-burns, destined lovers, enemies-to-allies, and heart-wrenching emotional depths.",
    gradient: "from-rose-500/15 via-pink-950/25 to-[#0e101d]"
  },
  Action: {
    icon: "⚡",
    description: "High-octane martial arts, superpower tournaments, breathtaking chases, and relentless battles.",
    gradient: "from-red-500/15 via-amber-950/25 to-[#0e101d]"
  },
  Adventure: {
    icon: "🗺️",
    description: "Uncharted archipelagos, lost civilizations, perilous expeditions, and boundless discoveries.",
    gradient: "from-emerald-500/15 via-teal-950/25 to-[#0e101d]"
  },
  Mystery: {
    icon: "🗝️",
    description: "Occult investigations, locked-room puzzles, shadowy motives, and secrets buried beneath centuries.",
    gradient: "from-indigo-500/15 via-violet-950/25 to-[#0e101d]"
  },
  "Sci-Fi": {
    icon: "🛰️",
    description: "Futuristic megacities, synthetic consciousness, stellar empires, and time dilation paradoxes.",
    gradient: "from-cyan-500/15 via-blue-950/25 to-[#0e101d]"
  },
  Horror: {
    icon: "🕯️",
    description: "Folkloric entities, psychological dread, haunted monsoon nights, and unspeakable atmospheric terror.",
    gradient: "from-purple-900/20 via-stone-950/30 to-[#0e101d]"
  },
  Historical: {
    icon: "📜",
    description: "Forgotten dynasties, court intrigue, silk route chronicles, and rich period tapestries.",
    gradient: "from-yellow-600/15 via-stone-900/30 to-[#0e101d]"
  },
  Comedy: {
    icon: "🎭",
    description: "Witty banter, chaotic reincarnations, satirical guilds, and heartwarming comedic adventures.",
    gradient: "from-lime-500/15 via-emerald-950/25 to-[#0e101d]"
  },
  Drama: {
    icon: "🍷",
    description: "Family legacies, societal fractures, morally grey protagonists, and profound character journeys.",
    gradient: "from-fuchsia-500/15 via-purple-950/25 to-[#0e101d]"
  }
};

export default function GenresIndexPage() {
  const { stories } = useShyduck();

  return (
    <div className="w-full min-h-screen py-12 shell space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <Compass className="w-3.5 h-3.5" />
          <span>Atmospheres & Worlds</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#fbf7ef] tracking-tight">
          Explore by <span className="text-[#e9b65a] italic">Genre.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9ba0b8] leading-relaxed">
          Every story is an open doorway. Browse curated collections by atmosphere, or step into an unfamiliar world that challenges your imagination.
        </p>
      </div>

      {/* Grid of All Genres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GENRES.map((genre) => {
          const meta = GENRE_METADATA[genre] || {
            icon: "📖",
            description: "Exciting tales and original perspectives waiting to be read.",
            gradient: "from-[#1a1d30] to-[#0e101d]"
          };
          const matchingStories = stories.filter(
            (s) => s.genre.toLowerCase() === genre.toLowerCase()
          );

          return (
            <div
              key={genre}
              className={`p-6 sm:p-8 rounded-3xl border border-[#23273e] bg-gradient-to-br ${meta.gradient} hover:border-[#e9b65a]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl p-2.5 rounded-2xl bg-[#141628]/80 border border-[#272b44] shadow-sm">
                    {meta.icon}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#15172a] text-[#e9b65a] border border-[#292e4a]">
                    {matchingStories.length} {matchingStories.length === 1 ? "Story" : "Stories"}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#fbf7ef] group-hover:text-[#e9b65a] transition-colors">
                    {genre}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8f94ad] mt-1.5 leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                {/* Preview sample titles */}
                {matchingStories.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#696e85] font-semibold block mb-2">
                      Popular in {genre}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchingStories.slice(0, 2).map((story) => (
                        <Link
                          key={story.id}
                          href={`/stories/${story.slug}`}
                          className="text-xs bg-[#111322] hover:bg-[#1a1d33] text-[#cad0e6] px-3 py-1.5 rounded-xl border border-[#24283f] flex items-center space-x-1.5 transition-colors"
                        >
                          <BookOpen className="w-3 h-3 text-[#e9b65a]" />
                          <span className="line-clamp-1">{story.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1e2238] flex items-center justify-between">
                <Link
                  href={`/genres/${genre.toLowerCase()}`}
                  className="text-xs sm:text-sm font-semibold text-[#e9b65a] hover:text-[#fbf7ef] flex items-center space-x-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore {genre} Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/discover?genre=${encodeURIComponent(genre)}`}
                  className="text-xs text-[#7d829c] hover:text-[#e2e6f5] transition-colors"
                >
                  View in Discover →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
