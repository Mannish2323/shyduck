"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  UserPlus, 
  UserCheck, 
  Share2, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Award,
  Globe
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { AUTHORS } from "@/lib/mock-data";
import { StoryCard } from "@/components/story-card";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function AuthorProfilePage() {
  const params = useParams();
  const username = (params?.username as string) || "";

  const { isFollowing, toggleFollow, stories, addToast } = useShyduck();

  // Find author
  const author = AUTHORS.find(
    (a) => a.username.toLowerCase() === username.toLowerCase()
  );

  const following = author ? isFollowing(author.username) : false;
  const [activeTab, setActiveTab] = useState<"stories" | "about" | "collections">("stories");

  if (!author) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 shell space-y-4">
        <ShyduckMascot mood="curious" size={80} />
        <h1 className="text-2xl font-serif font-bold text-[#fbf7ef]">Author Not Found</h1>
        <p className="text-sm text-[#8a8fa6] max-w-md">
          The storyteller @{username} may have vanished into a new chapter or changed their quill handle.
        </p>
        <Link href="/community" className="button button-primary px-6 py-2.5 text-xs font-semibold">
          Meet Other Writers
        </Link>
      </div>
    );
  }

  // Author's stories
  const authorStories = stories.filter(
    (s) => s.author.username.toLowerCase() === author.username.toLowerCase()
  );

  // Popular spotlight story
  const popularStory = authorStories.find((s) => s.slug === author.popularStorySlug) || authorStories[0];

  // Dynamic followers count (adds 1 if following)
  const currentFollowersCount = following 
    ? author.followersCount + 1 
    : author.followersCount;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      addToast("Author profile link copied!", "Share this creator's worlds with others.", "success");
    }
  };

  return (
    <div className="w-full min-h-screen pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO PROFILE BANNER */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-8 pb-14 border-b border-[#1d2136] bg-gradient-to-b from-[#111326] via-[#0c0e1c] to-[#0a0b14]">
        <div className="shell space-y-6">
          <Link
            href="/community"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8b90a6] hover:text-[#e9b65a] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Community</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#2c314f] shadow-2xl"
              />
              <div className="absolute bottom-1 right-1 p-2 rounded-full bg-[#e9b65a] text-[#0a0b14] shadow-lg">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="space-y-1">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7ef]">
                  {author.name}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[#e9b65a]">
                  @{author.username}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#9ea4bc] max-w-2xl leading-relaxed">
                {author.bio}
              </p>

              {/* Stats Counters */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-xs text-[#8c91a9]">
                <div>
                  <strong className="text-base font-bold text-[#fbf7ef] block">
                    {currentFollowersCount.toLocaleString()}
                  </strong>
                  <span>Followers</span>
                </div>
                <div>
                  <strong className="text-base font-bold text-[#fbf7ef] block">
                    {author.followingCount}
                  </strong>
                  <span>Following</span>
                </div>
                <div>
                  <strong className="text-base font-bold text-[#fbf7ef] block">
                    {authorStories.length || author.storiesCount}
                  </strong>
                  <span>Published Works</span>
                </div>
                <div>
                  <strong className="text-base font-bold text-emerald-400 block">
                    {author.completedCount}
                  </strong>
                  <span>Completed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={() => toggleFollow(author.username)}
                  className={`button px-6 py-2.5 text-xs font-semibold flex items-center space-x-2 transition-all ${
                    following 
                      ? "bg-[#1f243b] text-[#e9b65a] border border-[#e9b65a]/50" 
                      : "button-primary"
                  }`}
                >
                  {following ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow Author</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="button button-secondary px-4 py-2.5 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TABS & PROFILE CONTENT */}
      {/* ========================================================================= */}
      <div className="shell pt-8 space-y-8">
        {/* Tab Headers */}
        <div className="flex items-center space-x-6 border-b border-[#1f2338]">
          <button
            onClick={() => setActiveTab("stories")}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === "stories" ? "text-[#e9b65a]" : "text-[#858aa1] hover:text-white"
            }`}
          >
            Published Stories ({authorStories.length})
            {activeTab === "stories" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === "about" ? "text-[#e9b65a]" : "text-[#858aa1] hover:text-white"
            }`}
          >
            Creative Philosophy
            {activeTab === "about" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("collections")}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === "collections" ? "text-[#e9b65a]" : "text-[#858aa1] hover:text-white"
            }`}
          >
            Author Collections
            {activeTab === "collections" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a]" />
            )}
          </button>
        </div>

        {/* Tab 1: Stories Grid */}
        {activeTab === "stories" && (
          <div className="space-y-8">
            {/* Popular Story Highlight */}
            {popularStory && (
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#e9b65a] uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Most Beloved Story</span>
                </div>
                <div className="max-w-xl">
                  <StoryCard story={popularStory} variant="featured" />
                </div>
              </div>
            )}

            {/* All Stories */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#fbf7ef]">
                All Works by {author.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorStories.map((story) => (
                  <StoryCard key={story.id} story={story} variant="standard" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Creative Philosophy */}
        {activeTab === "about" && (
          <div className="max-w-2xl space-y-6 text-xs sm:text-sm text-[#9ea3b9] leading-relaxed">
            <div className="p-6 rounded-2xl border border-[#20253d] bg-[#0e101f] space-y-3">
              <h4 className="font-serif font-bold text-base text-[#fbf7ef]">
                The Story Behind the Quill
              </h4>
              <p>
                &ldquo;I believe that the subcontinent has the richest mythic memory on earth—waiting for fresh voices to spin into high fantasy, neon noir, and interstellar drama. Shyduck Tales gives us the canvas to build universes that reflect our skies.&rdquo;
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#20253d] bg-[#0e101f] space-y-3">
              <h4 className="font-serif font-bold text-base text-[#fbf7ef] flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#e9b65a]" />
                <span>Milestones & Recognitions</span>
              </h4>
              <ul className="space-y-2 list-disc list-inside text-xs text-[#8c91a8]">
                <li>Featured in Shyduck Monsoon Showcase 2025</li>
                <li>Over 200,000 serialized reads across ongoing chronicles</li>
                <li>Ranked #1 in Epic Fantasy for &quot;The Last Dragon&quot;</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Author Collections */}
        {activeTab === "collections" && (
          <div className="p-8 text-center bg-[#0d0f1e] rounded-2xl border border-[#20243b] space-y-2 max-w-xl">
            <h4 className="font-serif font-bold text-base text-[#fbf7ef]">
              Curated Series Collections
            </h4>
            <p className="text-xs text-[#8a8fa6]">
              {author.name} is currently compiling their universe companion omnibus. Check back soon for exclusive reading orders and side-story vignettes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
