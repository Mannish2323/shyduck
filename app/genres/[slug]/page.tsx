"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  SlidersHorizontal,
  Flame,
  ArrowRight 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { StoryCard } from "@/components/story-card";
import { ShyduckMascot } from "@/components/shyduck-mascot";

/* Genre color palettes */
const genreThemes: Record<string, { gradient: string; accent: string; emoji: string }> = {
  fantasy: { gradient: "from-amber-900/40 via-[#0a0b14] to-orange-950/30", accent: "#e9b65a", emoji: "⚔️" },
  romance: { gradient: "from-rose-900/40 via-[#0a0b14] to-pink-950/30", accent: "#f472b6", emoji: "🥀" },
  "sci-fi": { gradient: "from-cyan-900/40 via-[#0a0b14] to-blue-950/30", accent: "#22d3ee", emoji: "🛰️" },
  mystery: { gradient: "from-violet-900/40 via-[#0a0b14] to-indigo-950/30", accent: "#a78bfa", emoji: "🗝️" },
  horror: { gradient: "from-red-950/50 via-[#0a0b14] to-stone-950/30", accent: "#ef4444", emoji: "🕯️" },
  historical: { gradient: "from-emerald-900/40 via-[#0a0b14] to-teal-950/30", accent: "#34d399", emoji: "📜" },
  thriller: { gradient: "from-slate-800/50 via-[#0a0b14] to-gray-950/30", accent: "#94a3b8", emoji: "🔍" },
  comedy: { gradient: "from-yellow-900/30 via-[#0a0b14] to-amber-950/20", accent: "#fbbf24", emoji: "😂" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function GenreDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const genreName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const { stories } = useShyduck();

  // Filter stories matching genre
  const genreStories = stories.filter(
    (s) => s.genre.toLowerCase() === slug.toLowerCase()
  );

  const featuredInGenre = genreStories.find((s) => s.isFeatured) || genreStories[0];
  const otherStories = genreStories.filter((s) => s.id !== featuredInGenre?.id);

  const theme = genreThemes[slug.toLowerCase()] || genreThemes.fantasy;

  return (
    <div className="w-full min-h-screen">
      {/* Genre-themed gradient hero banner */}
      <div className={`w-full bg-gradient-to-b ${theme.gradient} pt-10 pb-14 relative overflow-hidden`}>
        {/* Floating accent orbs */}
        <div
          className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none pulse-glow"
          style={{ background: `${theme.accent}10` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[200px] h-[200px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `${theme.accent}08` }}
        />

        <div className="shell space-y-6 relative z-10">
          {/* Breadcrumb & Navigation */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/genres"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8b90a6] hover:text-[#e9b65a] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Genres</span>
            </Link>

            <Link
              href={`/discover?genre=${encodeURIComponent(genreName)}`}
              className="button button-secondary px-3.5 py-1.5 text-xs flex items-center space-x-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>Filter in Discover</span>
            </Link>
          </motion.div>

          {/* Hero Header */}
          <motion.div
            className="space-y-4 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="eyebrow flex items-center space-x-1.5" style={{ color: theme.accent }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Genre Hub</span>
            </div>

            <div className="flex items-center gap-4">
              <motion.span
                className="text-5xl sm:text-6xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {theme.emoji}
              </motion.span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#fbf7ef] tracking-tight">
                {genreName} <span style={{ color: theme.accent }} className="italic">Chronicles</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#9fa4bb] leading-relaxed">
              Explore all stories filed under {genreName}. From rising independent drafts to beloved high-ranking serialized web novels.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content area */}
      <div className="shell py-10 space-y-12">
        {genreStories.length > 0 ? (
          <div className="space-y-12">
            {/* Highlighted Masterpiece */}
            {featuredInGenre && (
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider" style={{ color: theme.accent }}>
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Featured in {genreName}</span>
                </div>
                <div className="max-w-2xl">
                  <StoryCard story={featuredInGenre} variant="featured" />
                </div>
              </motion.div>
            )}

            {/* All Stories in this Genre */}
            {otherStories.length > 0 && (
              <div className="space-y-6">
                <motion.h2
                  className="text-xl sm:text-2xl font-serif font-bold text-[#fbf7ef]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  More in {genreName}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherStories.map((story, i) => (
                    <motion.div
                      key={story.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      transition={{ delay: i * 0.08 }}
                    >
                      <StoryCard story={story} variant="standard" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="float-bob">
                <ShyduckMascot mood="curious" size={72} />
              </div>
              {/* Floating question marks */}
              {["?", "?", "?"].map((q, i) => (
                <span
                  key={i}
                  className="absolute text-[#e9b65a]/40 font-serif font-bold"
                  style={{
                    top: `${-5 + i * 10}px`,
                    right: `${-15 + i * 12}px`,
                    fontSize: `${14 + i * 4}px`,
                    animation: `floatBob ${2 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {q}
                </span>
              ))}
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">
                No {genreName} stories found yet.
              </h3>
              <p className="text-xs sm:text-sm text-[#8c91a8]">
                Be the pioneer who creates the very first {genreName} epic on Shyduck Tales!
              </p>
            </div>

            <Link
              href="/write/stories/new"
              className="button button-primary px-6 py-2.5 text-xs font-semibold flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Write a {genreName} Story</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
