"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

  return (
    <div className="w-full min-h-screen py-10 shell space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
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
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#e9b65a]" />
          <span>Filter in Discover</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Genre Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#fbf7ef] tracking-tight">
          {genreName} <span className="text-[#e9b65a] italic">Chronicles</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9fa4bb] leading-relaxed">
          Explore all stories filed under {genreName}. From rising independent drafts to beloved high-ranking serialized web novels.
        </p>
      </div>

      {genreStories.length > 0 ? (
        <div className="space-y-12">
          {/* Highlighted Masterpiece */}
          {featuredInGenre && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#e9b65a]">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Featured in {genreName}</span>
              </div>
              <div className="max-w-2xl">
                <StoryCard story={featuredInGenre} variant="featured" />
              </div>
            </div>
          )}

          {/* All Stories in this Genre */}
          {otherStories.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#fbf7ef]">
                More in {genreName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherStories.map((story) => (
                  <StoryCard key={story.id} story={story} variant="standard" />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-5">
          <ShyduckMascot mood="curious" size={72} />
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
        </div>
      )}
    </div>
  );
}
