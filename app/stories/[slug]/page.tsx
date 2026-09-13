"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark, 
  Share2, 
  Star, 
  Eye, 
  Clock, 
  Feather, 
  UserCheck, 
  UserPlus, 
  Sparkles, 
  MapPin, 
  Shield, 
  Scroll, 
  Calendar,
  MessageSquare,
  AlertTriangle,
  Send,
  Heart,
  ExternalLink
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";

  const { 
    getStoryBySlug, 
    getChaptersByStorySlug, 
    isBookmarked, 
    toggleBookmark, 
    isFollowing, 
    toggleFollow, 
    readingProgress,
    comments,
    addComment,
    addToast 
  } = useShyduck();

  const story = getStoryBySlug(slug);
  const chapters = getChaptersByStorySlug(slug);
  const progress = readingProgress[slug];
  const bookmarked = story ? isBookmarked(story.slug) : false;
  const followingAuthor = story ? isFollowing(story.author.username) : false;

  // Tabs: 'overview' | 'chapters' | 'characters' | 'world' | 'discussion'
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Comment input state
  const [newComment, setNewComment] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});

  if (!story) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 shell space-y-4">
        <ShyduckMascot mood="curious" size={80} />
        <h1 className="text-2xl font-serif font-bold text-[#fbf7ef]">Story Not Found</h1>
        <p className="text-sm text-[#8a8fa6] max-w-md">
          The fictional universe you are looking for may have dissolved into the cosmic ether or been renamed.
        </p>
        <Link href="/discover" className="button button-primary px-6 py-2.5 text-xs font-semibold">
          Return to Discover
        </Link>
      </div>
    );
  }

  // Calculate destination chapter for "Start Reading" vs "Continue Reading"
  const startChapterSlug = progress?.chapterSlug || (chapters[0] ? chapters[0].slug : "chapter-1");

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      addToast("Link copied to clipboard!", "Share this story world with your friends.", "success");
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment("story", story.id, newComment.trim(), isSpoiler);
    setNewComment("");
    setIsSpoiler(false);
    addToast("Comment posted!", "Your thoughts are now part of the story discussion.", "success");
  };

  const storyComments = comments.filter((c) => c.targetId === story.id);

  // Available tabs calculation
  const hasCharacters = story.characters && story.characters.length > 0;
  const hasWorld = story.world && (
    story.world.locations?.length || 
    story.world.factions?.length || 
    story.world.loreItems?.length || 
    story.world.timeline?.length
  );

  return (
    <div className="w-full min-h-screen pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER & STORY METADATA */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-8 pb-16 border-b border-[#1c2033] bg-gradient-to-b from-[#0f1122] to-[#0a0b14]">
        <div className="shell space-y-6">
          {/* Top navigation back link */}
          <div className="flex items-center justify-between">
            <Link
              href="/discover"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8b90a6] hover:text-[#e9b65a] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Discover</span>
            </Link>

            <div className="flex items-center space-x-2 text-xs text-[#7e849e]">
              <span>Filed in:</span>
              <Link 
                href={`/genres/${story.genre.toLowerCase()}`}
                className="text-[#e9b65a] font-medium hover:underline"
              >
                {story.genre}
              </Link>
            </div>
          </div>

          {/* Hero Grid: Cover on Left + Details on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Book Cover Artwork */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <div className="relative group w-full max-w-[260px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-[#2b304c] transition-transform duration-300 group-hover:scale-[1.02]">
                <div className={`cover-${story.coverStyle} w-full h-full flex flex-col justify-between p-6 relative`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#fbf7ef]/70 bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                      {story.genre}
                    </span>
                    <span className="text-[10px] font-semibold text-[#e9b65a] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      ★ {story.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="space-y-1 z-10">
                    <h2 className="font-serif text-xl font-black text-[#fbf7ef] leading-tight drop-shadow-md">
                      {story.title}
                    </h2>
                    <p className="text-[11px] text-[#e0e4f5] font-medium drop-shadow-sm">
                      by {story.author.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Story Details & Actions */}
            <div className="md:col-span-8 lg:col-span-9 space-y-6">
              {/* Badges / Pill row */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#e9b65a]/15 text-[#e9b65a] font-semibold border border-[#e9b65a]/30">
                  {story.genre}
                </span>
                <span className={`px-2.5 py-1 rounded-full font-medium border ${
                  story.status === 'Completed' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                }`}>
                  ● {story.status}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#1b1e30] text-[#a4a9be] border border-[#292e47]">
                  {story.language}
                </span>
                {story.isFeatured && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Featured Masterpiece</span>
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#fbf7ef] tracking-tight leading-tight">
                  {story.title}
                </h1>
                {story.subtitle && (
                  <p className="text-base sm:text-lg text-[#e9b65a] font-serif italic">
                    {story.subtitle}
                  </p>
                )}
              </div>

              {/* Author Row */}
              <div className="flex items-center space-x-4 py-2">
                <Link href={`/authors/${story.author.username}`} className="flex items-center space-x-3 group">
                  <img
                    src={story.author.avatar}
                    alt={story.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#e9b65a]/40 group-hover:border-[#e9b65a] transition-colors"
                  />
                  <div>
                    <span className="text-xs text-[#7e849d] block">Written by</span>
                    <span className="text-sm font-semibold text-[#fbf7ef] group-hover:text-[#e9b65a] transition-colors">
                      {story.author.name}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => toggleFollow(story.author.username)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    followingAuthor
                      ? "bg-[#1f243b] text-[#e9b65a] border border-[#e9b65a]/40"
                      : "bg-[#171a2b] text-[#abb1c9] hover:text-[#fbf7ef] border border-[#2b304d]"
                  }`}
                >
                  {followingAuthor ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-[#e9b65a]" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow Author</span>
                    </>
                  )}
                </button>
              </div>

              {/* Synopsis / Description */}
              <p className="text-sm sm:text-base text-[#a3a9bf] leading-relaxed max-w-3xl">
                {story.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {story.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/discover?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-[#131526] hover:bg-[#1b1e36] text-[#8e94ad] hover:text-[#e2e6f5] px-2.5 py-1 rounded-lg border border-[#22263d] transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-[#1c2033] text-xs text-[#8c92a9]">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-[#e9b65a] fill-[#e9b65a]" />
                  <span className="font-bold text-[#fbf7ef] text-sm">{story.rating.toFixed(2)}</span>
                  <span>rating</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#8a90aa]" />
                  <span className="font-bold text-[#fbf7ef]">{chapters.length || story.chaptersCount}</span>
                  <span>chapters</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-[#8a90aa]" />
                  <span className="font-bold text-[#fbf7ef]">{story.readsCount.toLocaleString()}</span>
                  <span>reads</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#8a90aa]" />
                  <span>Updated {story.updatedAt}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Start or Continue Reading */}
                <Link
                  href={`/stories/${story.slug}/chapters/${startChapterSlug}`}
                  className="button button-primary px-7 py-3.5 text-sm font-semibold flex items-center space-x-2.5 shadow-lg shadow-[#e9b65a]/15 hover:shadow-[#e9b65a]/25 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {progress 
                      ? `Continue Reading (Ch ${progress.chapterNumber} • ${progress.percentage}%)` 
                      : "Start Reading Chapter 1"}
                  </span>
                </Link>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(story.slug)}
                  className={`button button-secondary px-4 py-3.5 text-xs font-semibold flex items-center space-x-2 transition-all ${
                    bookmarked ? "text-[#e9b65a] border-[#e9b65a]/50 bg-[#e9b65a]/10" : ""
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                  <span>{bookmarked ? "Bookmarked" : "Add to Library"}</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="button button-secondary px-4 py-3.5 text-xs font-semibold flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STORY TABS (Overview, Chapters, Characters, World, Discussion) */}
      {/* ========================================================================= */}
      <section className="w-full shell pt-8">
        {/* Tab Headers */}
        <div className="flex items-center space-x-2 overflow-x-auto border-b border-[#1e2238] pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 ${
              activeTab === "overview"
                ? "text-[#e9b65a]"
                : "text-[#858aa1] hover:text-[#fbf7ef]"
            }`}
          >
            Overview
            {activeTab === "overview" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("chapters")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 flex items-center space-x-1.5 ${
              activeTab === "chapters"
                ? "text-[#e9b65a]"
                : "text-[#858aa1] hover:text-[#fbf7ef]"
            }`}
          >
            <span>Chapters</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1b1e32] text-[#8b91ab]">
              {chapters.length}
            </span>
            {activeTab === "chapters" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a] rounded-full" />
            )}
          </button>

          {hasCharacters && (
            <button
              onClick={() => setActiveTab("characters")}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 ${
                activeTab === "characters"
                  ? "text-[#e9b65a]"
                  : "text-[#858aa1] hover:text-[#fbf7ef]"
              }`}
            >
              Characters ({story.characters?.length})
              {activeTab === "characters" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a] rounded-full" />
              )}
            </button>
          )}

          {hasWorld && (
            <button
              onClick={() => setActiveTab("world")}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 ${
                activeTab === "world"
                  ? "text-[#e9b65a]"
                  : "text-[#858aa1] hover:text-[#fbf7ef]"
              }`}
            >
              World Lore
              {activeTab === "world" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a] rounded-full" />
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab("discussion")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 flex items-center space-x-1.5 ${
              activeTab === "discussion"
                ? "text-[#e9b65a]"
                : "text-[#858aa1] hover:text-[#fbf7ef]"
            }`}
          >
            <span>Discussion</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1b1e32] text-[#8b91ab]">
              {storyComments.length}
            </span>
            {activeTab === "discussion" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a] rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="py-8">
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-serif font-bold text-[#fbf7ef]">Synopsis</h3>
                  <p className="text-sm sm:text-base text-[#a0a5ba] leading-relaxed whitespace-pre-line">
                    {story.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#1b1f33]">
                  <h3 className="text-lg font-serif font-bold text-[#fbf7ef]">Themes & Tone</h3>
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((t) => (
                      <span key={t} className="text-xs bg-[#131526] text-[#b3b9d4] px-3 py-1 rounded-xl border border-[#232740]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {chapters[0] && (
                  <div className="p-6 rounded-2xl border border-[#252942] bg-[#111324] space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#e9b65a]">
                      First Look
                    </div>
                    <h4 className="font-serif font-bold text-lg text-[#fbf7ef]">
                      {chapters[0].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#8a8fa6] line-clamp-3">
                      {chapters[0].content}
                    </p>
                    <Link
                      href={`/stories/${story.slug}/chapters/${chapters[0].slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#e9b65a] hover:underline pt-2"
                    >
                      <span>Read opening chapter →</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Sidebar: Story Meta Info */}
              <div className="space-y-6">
                <div className="bg-[#0e101f] border border-[#20243b] p-6 rounded-2xl space-y-4 text-xs">
                  <h4 className="font-semibold text-sm text-[#fbf7ef]">Story Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-1 border-b border-[#1b1f33]">
                      <span className="text-[#7d8299]">Author:</span>
                      <span className="font-semibold text-[#fbf7ef]">{story.author.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1b1f33]">
                      <span className="text-[#7d8299]">Genre:</span>
                      <span className="font-semibold text-[#fbf7ef]">{story.genre}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1b1f33]">
                      <span className="text-[#7d8299]">Status:</span>
                      <span className="font-semibold text-[#fbf7ef]">{story.status}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1b1f33]">
                      <span className="text-[#7d8299]">Language:</span>
                      <span className="font-semibold text-[#fbf7ef]">{story.language}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1b1f33]">
                      <span className="text-[#7d8299]">Total Words:</span>
                      <span className="font-semibold text-[#fbf7ef]">{story.wordCount ? story.wordCount.toLocaleString() : "42,000"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#7d8299]">First Published:</span>
                      <span className="font-semibold text-[#fbf7ef]">{story.publishedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#121426] to-[#0c0d18] border border-[#252940] p-6 rounded-2xl space-y-3">
                  <span className="text-xs text-[#e9b65a] font-semibold uppercase tracking-wider block">
                    Future Adaptation
                  </span>
                  <p className="text-xs text-[#8f94ad] leading-relaxed">
                    This story is being tracked for community-backed comic and audio drama adaptation under the Shyduck Adaptation Pipeline.
                  </p>
                  <Link href="/support" className="text-xs text-[#e9b65a] font-semibold hover:underline block pt-1">
                    Learn about adaptation →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: CHAPTER LIST ================= */}
          {activeTab === "chapters" && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-serif font-bold text-[#fbf7ef]">
                  Published Chapters ({chapters.length})
                </h3>
                <span className="text-xs text-[#8288a3]">
                  Distraction-free web reader ready
                </span>
              </div>

              {chapters.length > 0 ? (
                <div className="divide-y divide-[#1b1e32] border border-[#20243b] rounded-2xl overflow-hidden bg-[#0d0f1e]">
                  {chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/stories/${story.slug}/chapters/${chapter.slug}`}
                      className="p-4 sm:p-5 flex items-center justify-between hover:bg-[#16182c] transition-colors group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs text-[#e9b65a] font-semibold">
                          <span>Chapter {chapter.chapterNumber.toString().padStart(2, "0")}</span>
                          {progress?.chapterSlug === chapter.slug && (
                            <span className="text-[10px] bg-[#e9b65a]/20 text-[#e9b65a] px-2 py-0.5 rounded-full">
                              Current ({progress.percentage}%)
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-medium text-[#fbf7ef] group-hover:text-[#e9b65a] transition-colors">
                          {chapter.title}
                        </h4>
                        <div className="flex items-center space-x-3 text-xs text-[#71768e]">
                          <span>{chapter.wordCount.toLocaleString()} words</span>
                          <span>•</span>
                          <span>{chapter.readingTimeMinutes} min read</span>
                          <span>•</span>
                          <span>{chapter.publishedAt}</span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-[#8b91ab] group-hover:text-[#e9b65a] transition-colors shrink-0">
                        Read →
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-[#0d0f1e] rounded-2xl border border-[#20243b] space-y-2">
                  <p className="text-sm text-[#8c91a8]">No public chapters published yet.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: CHARACTERS ================= */}
          {activeTab === "characters" && hasCharacters && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-[#fbf7ef]">
                  Dramatis Personae
                </h3>
                <p className="text-xs sm:text-sm text-[#898ea6]">
                  Key figures shaping the events of {story.title}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {story.characters?.map((char) => (
                  <div
                    key={char.id}
                    className="p-6 rounded-2xl border border-[#21263e] bg-[#0e101f] space-y-4 hover:border-[#e9b65a]/40 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-lg font-bold text-[#0a0b14]"
                        style={{ backgroundColor: char.avatarColor || '#e9b65a' }}
                      >
                        {char.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#fbf7ef]">
                          {char.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#e9b65a] block">
                          {char.role}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#9da2b8] leading-relaxed">
                      {char.description}
                    </p>

                    {char.abilities && char.abilities.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-[#1b1f33]">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#737891]">
                          Signature Traits / Powers
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {char.abilities.map((ab) => (
                            <span
                              key={ab}
                              className="text-[11px] bg-[#16182c] text-[#c4c9df] px-2 py-0.5 rounded-md border border-[#282c47]"
                            >
                              {ab}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {char.relationships && (
                      <div className="text-xs text-[#7b8199] pt-1">
                        <strong className="text-[#a5abbf]">Bonds:</strong> {char.relationships}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: WORLD LORE ================= */}
          {activeTab === "world" && hasWorld && (
            <div className="space-y-10">
              {/* Locations */}
              {story.world?.locations && story.world.locations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm font-serif font-bold text-[#fbf7ef]">
                    <MapPin className="w-4 h-4 text-[#e9b65a]" />
                    <span>Key Cartography & Locations</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {story.world.locations.map((loc) => (
                      <div key={loc.name} className="p-5 rounded-2xl border border-[#20253d] bg-[#0d0f1e] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-sm text-[#fbf7ef]">{loc.name}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#171a2e] text-[#e9b65a] border border-[#262a47]">
                            {loc.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#8a90aa] leading-relaxed">{loc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Factions */}
              {story.world?.factions && story.world.factions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm font-serif font-bold text-[#fbf7ef]">
                    <Shield className="w-4 h-4 text-[#e9b65a]" />
                    <span>Factions & Power Dynamics</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {story.world.factions.map((fac) => (
                      <div key={fac.name} className="p-5 rounded-2xl border border-[#20253d] bg-[#0d0f1e] space-y-1.5">
                        <h5 className="font-semibold text-sm text-[#fbf7ef]">{fac.name}</h5>
                        <p className="text-xs text-[#e9b65a] italic">Motive: {fac.motive}</p>
                        <p className="text-xs text-[#8a90aa] leading-relaxed">{fac.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lore Items */}
              {story.world?.loreItems && story.world.loreItems.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm font-serif font-bold text-[#fbf7ef]">
                    <Scroll className="w-4 h-4 text-[#e9b65a]" />
                    <span>Artifacts & Ancient Lore</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {story.world.loreItems.map((item) => (
                      <div key={item.title} className="p-5 rounded-2xl border border-[#20253d] bg-[#0d0f1e] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-sm text-[#fbf7ef]">{item.title}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#171a2e] text-[#a4a9c2] border border-[#262a47]">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#8a90aa] leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {story.world?.timeline && story.world.timeline.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm font-serif font-bold text-[#fbf7ef]">
                    <Calendar className="w-4 h-4 text-[#e9b65a]" />
                    <span>Historical Timeline</span>
                  </div>
                  <div className="border-l-2 border-[#2b304c] ml-3 pl-5 space-y-6">
                    {story.world.timeline.map((event) => (
                      <div key={event.era} className="relative space-y-1">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#e9b65a] border-2 border-[#0a0b14]" />
                        <span className="text-xs font-bold text-[#e9b65a] uppercase tracking-wider">{event.era}</span>
                        <h5 className="font-semibold text-sm text-[#fbf7ef]">{event.event}</h5>
                        <p className="text-xs text-[#8a90aa] leading-relaxed">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: DISCUSSION ================= */}
          {activeTab === "discussion" && (
            <div className="space-y-8 max-w-3xl">
              {/* Comment Input Box */}
              <form onSubmit={handlePostComment} className="p-5 rounded-2xl border border-[#23273e] bg-[#0d0f1e] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#fbf7ef] flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#e9b65a]" />
                    <span>Join the Story Discussion</span>
                  </span>
                  <label className="flex items-center space-x-2 text-xs text-[#9aa0b8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSpoiler}
                      onChange={(e) => setIsSpoiler(e.target.checked)}
                      className="rounded border-[#2f3552] text-[#e9b65a] focus:ring-[#e9b65a]"
                    />
                    <span className="text-amber-400 font-medium">⚠️ Mark as Spoiler</span>
                  </label>
                </div>

                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share theories, favorite dialogues, or questions for fellow readers..."
                  className="w-full bg-[#141628] text-[#fbf7ef] p-3.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="button button-primary px-5 py-2 text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Comment</span>
                  </button>
                </div>
              </form>

              {/* Comments Thread */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-[#fbf7ef]">
                  All Comments ({storyComments.length})
                </h4>

                {storyComments.length > 0 ? (
                  storyComments.map((comment) => {
                    const isRevealed = revealedSpoilers[comment.id];

                    return (
                      <div
                        key={comment.id}
                        className="p-5 rounded-2xl border border-[#1e2338] bg-[#0c0e1c] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              className="w-8 h-8 rounded-full object-cover border border-[#2b304c]"
                            />
                            <div>
                              <span className="text-xs font-semibold text-[#fbf7ef] block">
                                {comment.authorName}
                              </span>
                              <span className="text-[10px] text-[#6d7289]">
                                {comment.createdAt}
                              </span>
                            </div>
                          </div>

                          {comment.isSpoiler && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                              Spoiler
                            </span>
                          )}
                        </div>

                        {/* Spoiler Protection as specified in Section 24 */}
                        {comment.isSpoiler && !isRevealed ? (
                          <div className="p-3.5 rounded-xl bg-[#141628] border border-amber-500/30 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-amber-300">
                              <AlertTriangle className="w-4 h-4" />
                              <span>This comment contains plot spoilers.</span>
                            </div>
                            <button
                              onClick={() => setRevealedSpoilers({ ...revealedSpoilers, [comment.id]: true })}
                              className="text-xs text-[#e9b65a] font-semibold hover:underline"
                            >
                              Reveal Spoiler
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-[#cad0e6] leading-relaxed">
                            {comment.content}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 pt-1 text-xs text-[#7e849e]">
                          <button className="flex items-center space-x-1 hover:text-[#e9b65a] transition-colors">
                            <Heart className="w-3.5 h-3.5" />
                            <span>{comment.likesCount}</span>
                          </button>
                          <span>•</span>
                          <button className="hover:text-[#fbf7ef] transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center bg-[#0d0f1e] rounded-2xl border border-[#20243b] space-y-2">
                    <p className="text-sm text-[#8c91a8]">No discussion yet. Be the first reader to start the conversation!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
