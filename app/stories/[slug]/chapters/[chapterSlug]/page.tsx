"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Settings2, 
  Bookmark, 
  Share2, 
  Heart, 
  MessageSquare, 
  Sun, 
  Moon, 
  BookOpen, 
  Sparkles,
  AlertTriangle,
  Send,
  X
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { StoryCard } from "@/components/story-card";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function NovelReaderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";
  const chapterParam = (params?.chapterSlug as string) || (params?.chapter as string) || "1";

  const { 
    getStoryBySlug, 
    getChaptersByStorySlug, 
    isBookmarked, 
    toggleBookmark, 
    saveReadingProgress,
    readerSettings,
    updateReaderSettings,
    comments,
    addComment,
    addToast,
    stories 
  } = useShyduck();

  const story = getStoryBySlug(slug);
  const chapters = getChaptersByStorySlug(slug);

  // Find the active chapter
  const currentChapterIndex = chapters.findIndex(
    (c) => 
      c.slug === chapterParam || 
      c.chapterNumber.toString() === chapterParam ||
      chapterParam.endsWith(c.chapterNumber.toString())
  );

  const activeChapterIndex = currentChapterIndex >= 0 ? currentChapterIndex : 0;
  const currentChapter = chapters[activeChapterIndex];

  // Previous & Next Chapter Links
  const prevChapter = activeChapterIndex > 0 ? chapters[activeChapterIndex - 1] : null;
  const nextChapter = activeChapterIndex < chapters.length - 1 ? chapters[activeChapterIndex + 1] : null;

  // Local reading state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  // Comment state
  const [newComment, setNewComment] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});

  const contentRef = useRef<HTMLDivElement>(null);
  const bookmarked = story ? isBookmarked(story.slug) : false;

  // Scroll Progress Listener & Reading Position Persistence
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight <= 0) return;

      const currentScroll = el.scrollTop;
      const percentage = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
      setScrollProgress(percentage);

      // Save reading progress every scroll change
      if (story && currentChapter) {
        saveReadingProgress(story.slug, currentChapter.slug, currentChapter.chapterNumber, percentage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [story, currentChapter, saveReadingProgress]);

  if (!story || !currentChapter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[#0a0b14] space-y-4">
        <ShyduckMascot mood="curious" size={80} />
        <h1 className="text-2xl font-serif font-bold text-[#fbf7ef]">Chapter Unavailable</h1>
        <p className="text-sm text-[#8a8fa6] max-w-md">
          This chapter may still be under the author&apos;s drafting feather or has not been released yet.
        </p>
        <Link href={`/stories/${slug}`} className="button button-primary px-6 py-2.5 text-xs font-semibold">
          Return to Story Details
        </Link>
      </div>
    );
  }

  // Related recommended stories
  const relatedStories = stories.filter((s) => s.id !== story.id && s.genre === story.genre).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      addToast("Chapter link copied!", "Share this chapter with fellow readers.", "success");
    }
  };

  const handleToggleLike = () => {
    if (hasLiked) {
      setLikesCount((c) => c - 1);
      setHasLiked(false);
    } else {
      setLikesCount((c) => c + 1);
      setHasLiked(true);
      addToast("Chapter liked!", "Author notified of your appreciation.", "success");
    }
  };

  const handlePostChapterComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment("chapter", currentChapter.id, newComment.trim(), isSpoiler);
    setNewComment("");
    setIsSpoiler(false);
    addToast("Comment posted!", "Your reaction is live on this chapter.", "success");
  };

  const chapterComments = comments.filter((c) => c.targetId === currentChapter.id);

  // Reader theme class mapping
  const themeClass = 
    readerSettings.theme === "light"
      ? "reader-light bg-[#fbfaf5] text-[#1f212d]"
      : readerSettings.theme === "sepia"
      ? "reader-sepia bg-[#f4ecd8] text-[#3c2f21]"
      : "reader-dark bg-[#0a0b14] text-[#fbf7ef]";

  // Max width container mapping
  const maxWidthClass =
    readerSettings.maxWidth === "prose"
      ? "max-w-prose"
      : readerSettings.maxWidth === "wide"
      ? "max-w-4xl"
      : "max-w-5xl";

  // Font family mapping
  const fontFamilyStyle =
    readerSettings.fontFamily === "serif"
      ? "Georgia, 'Playfair Display', serif"
      : readerSettings.fontFamily === "mono"
      ? "ui-monospace, monospace"
      : "system-ui, -apple-system, sans-serif";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClass}`}>
      {/* ========================================================================= */}
      {/* 1. STICKY READING PROGRESS BAR */}
      {/* ========================================================================= */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/10">
        <div 
          className="h-full bg-gradient-to-r from-[#e9b65a] to-[#f3cf8a] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP READER CONTROLS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-opacity-90 border-b border-black/10 px-4 py-3 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-3">
          <Link
            href={`/stories/${story.slug}`}
            className="flex items-center space-x-1 text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity"
            title="Return to Story Overview"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </Link>
          <span className="opacity-30">•</span>
          <div className="truncate max-w-[200px] sm:max-w-xs text-xs font-medium">
            <span className="font-bold">{story.title}</span>
            <span className="opacity-60 hidden md:inline"> — {currentChapter.title}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="text-[11px] font-mono opacity-60 hidden sm:inline">
            {scrollProgress}% read
          </span>

          <button
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className={`p-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors border ${
              isControlsOpen 
                ? "bg-[#e9b65a] text-[#0a0b14] border-[#e9b65a]" 
                : "border-black/10 hover:bg-black/5"
            }`}
            title="Reader Display Settings"
          >
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Display (Aa)</span>
          </button>

          <button
            onClick={() => toggleBookmark(story.slug)}
            className={`p-2 rounded-xl border border-black/10 transition-colors ${
              bookmarked ? "text-[#e9b65a]" : "opacity-70 hover:opacity-100"
            }`}
            title="Bookmark this story"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-black/10 opacity-70 hover:opacity-100 transition-colors"
            title="Share Chapter"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. READER PREFERENCES MODAL / DRAWER */}
      {/* ========================================================================= */}
      {isControlsOpen && (
        <div className="fixed top-14 right-4 z-50 w-80 p-5 rounded-2xl shadow-2xl border border-[#2b304c] bg-[#111324] text-[#fbf7ef] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#21263e]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e9b65a] flex items-center space-x-1.5">
              <Settings2 className="w-3.5 h-3.5" />
              <span>Reading Preferences</span>
            </span>
            <button 
              onClick={() => setIsControlsOpen(false)}
              className="p-1 rounded-lg text-[#7c829c] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Atmosphere
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              <button
                onClick={() => updateReaderSettings({ theme: "dark" })}
                className={`py-2 rounded-xl border flex items-center justify-center space-x-1.5 transition-all ${
                  readerSettings.theme === "dark"
                    ? "bg-[#1f2338] text-[#e9b65a] border-[#e9b65a]"
                    : "bg-[#0c0d18] text-[#8e94ad] border-[#252940]"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => updateReaderSettings({ theme: "light" })}
                className={`py-2 rounded-xl border flex items-center justify-center space-x-1.5 transition-all ${
                  readerSettings.theme === "light"
                    ? "bg-[#fbfaf5] text-[#0a0b14] border-[#e9b65a]"
                    : "bg-[#0c0d18] text-[#8e94ad] border-[#252940]"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => updateReaderSettings({ theme: "sepia" })}
                className={`py-2 rounded-xl border flex items-center justify-center space-x-1.5 transition-all ${
                  readerSettings.theme === "sepia"
                    ? "bg-[#f4ecd8] text-[#3c2f21] border-[#e9b65a]"
                    : "bg-[#0c0d18] text-[#8e94ad] border-[#252940]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Sepia</span>
              </button>
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold text-[#8b91a9]">
              <span className="uppercase tracking-wider">Font Size</span>
              <span>{readerSettings.fontSize}px</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs">A</span>
              <input
                type="range"
                min={14}
                max={26}
                step={1}
                value={readerSettings.fontSize}
                onChange={(e) => updateReaderSettings({ fontSize: Number(e.target.value) })}
                className="w-full accent-[#e9b65a]"
              />
              <span className="text-lg font-bold">A</span>
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Typeface
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { label: "Serif", value: "serif" },
                { label: "Sans", value: "sans" },
                { label: "Mono", value: "mono" }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => updateReaderSettings({ fontFamily: f.value as any })}
                  className={`py-1.5 rounded-lg border transition-all ${
                    readerSettings.fontFamily === f.value
                      ? "bg-[#e9b65a] text-[#0a0b14] font-bold border-[#e9b65a]"
                      : "bg-[#16182c] text-[#9da2b8] border-[#272b44]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Height & Margins */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Column Width
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { label: "Comfort", value: "prose" },
                { label: "Wide", value: "wide" },
                { label: "Full", value: "full" }
              ].map((w) => (
                <button
                  key={w.value}
                  onClick={() => updateReaderSettings({ maxWidth: w.value as any })}
                  className={`py-1.5 rounded-lg border transition-all ${
                    readerSettings.maxWidth === w.value
                      ? "bg-[#e9b65a] text-[#0a0b14] font-bold border-[#e9b65a]"
                      : "bg-[#16182c] text-[#9da2b8] border-[#272b44]"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CHAPTER CONTENT COLUMN */}
      {/* ========================================================================= */}
      <main className={`mx-auto px-6 sm:px-8 py-16 ${maxWidthClass}`}>
        {/* Chapter Header */}
        <div className="space-y-4 mb-12 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#e9b65a]">
            Chapter {currentChapter.chapterNumber.toString().padStart(2, "0")} of {chapters.length}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {currentChapter.title}
          </h1>
          <div className="flex items-center justify-center space-x-3 text-xs opacity-60">
            <span>By {story.author.name}</span>
            <span>•</span>
            <span>{currentChapter.wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{currentChapter.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Author Note if present */}
        {currentChapter.authorNote && (
          <div className="p-5 rounded-2xl border border-black/15 bg-black/5 text-xs sm:text-sm italic leading-relaxed mb-10 opacity-85 space-y-1">
            <span className="font-bold not-italic text-[#e9b65a] block uppercase text-[10px] tracking-wider">
              Author&apos;s Transmission:
            </span>
            <p>&ldquo;{currentChapter.authorNote}&rdquo;</p>
          </div>
        )}

        {/* Main Reading Text */}
        <article
          ref={contentRef}
          className="space-y-6 leading-relaxed select-text"
          style={{
            fontSize: `${readerSettings.fontSize}px`,
            lineHeight: readerSettings.lineHeight,
            fontFamily: fontFamilyStyle
          }}
        >
          {currentChapter.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="indent-4 sm:indent-6">
              {paragraph}
            </p>
          ))}
        </article>

        {/* ========================================================================= */}
        {/* 5. CHAPTER NAVIGATION CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between py-12 my-12 border-y border-black/10">
          {prevChapter ? (
            <Link
              href={`/stories/${story.slug}/chapters/${prevChapter.slug}`}
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold opacity-75 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev: Chapter {prevChapter.chapterNumber}</span>
            </Link>
          ) : (
            <span className="text-xs opacity-40">First Chapter</span>
          )}

          <Link
            href={`/stories/${story.slug}`}
            className="text-xs font-semibold text-[#e9b65a] hover:underline"
          >
            Table of Contents
          </Link>

          {nextChapter ? (
            <Link
              href={`/stories/${story.slug}/chapters/${nextChapter.slug}`}
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold opacity-75 hover:opacity-100 transition-opacity"
            >
              <span>Next: Chapter {nextChapter.chapterNumber}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="text-xs opacity-40">Latest Chapter</span>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 6. CHAPTER COMPLETION END CARD (Section 17) */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl border border-[#272c44] bg-[#111326] text-[#fbf7ef] space-y-6 text-center my-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#e9b65a]/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#e9b65a]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Chapter Complete!
            </h3>
            <p className="text-xs sm:text-sm text-[#8f94ad] max-w-md mx-auto">
              You&apos;ve completed {currentChapter.title}. What destiny awaits next in {story.title}?
            </p>
          </div>

          {/* Primary Next Chapter or Final Chapter CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {nextChapter ? (
              <Link
                href={`/stories/${story.slug}/chapters/${nextChapter.slug}`}
                className="button button-primary px-8 py-3 text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-[#e9b65a]/20"
              >
                <span>Proceed to Chapter {nextChapter.chapterNumber}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="p-3 px-5 rounded-full bg-[#1b1e32] border border-[#2b304c] text-xs font-semibold text-[#e9b65a]">
                ✨ You are caught up with the latest published chapter!
              </div>
            )}
          </div>

          {/* Reactions and Share Bar */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-[#1f243b] text-xs">
            <button
              onClick={handleToggleLike}
              className={`flex items-center space-x-2 transition-colors ${
                hasLiked ? "text-rose-400 font-semibold" : "text-[#8a90aa] hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
              <span>{likesCount} Applaud</span>
            </button>

            <button
              onClick={() => toggleBookmark(story.slug)}
              className={`flex items-center space-x-2 transition-colors ${
                bookmarked ? "text-[#e9b65a] font-semibold" : "text-[#8a90aa] hover:text-white"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
              <span>{bookmarked ? "Saved in Library" : "Bookmark Story"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-[#8a90aa] hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Chapter</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. CHAPTER DISCUSSION / COMMENTS */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-xl flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#e9b65a]" />
              <span>Chapter Discussion ({chapterComments.length})</span>
            </h4>
            <span className="text-xs opacity-60">Keep theories respectful</span>
          </div>

          {/* Add Chapter Comment */}
          <form onSubmit={handlePostChapterComment} className="p-5 rounded-2xl border border-black/15 bg-black/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold opacity-80">
                Share your reaction to this chapter:
              </span>
              <label className="flex items-center space-x-2 text-xs text-amber-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)}
                  className="rounded border-[#2f3552] text-[#e9b65a] focus:ring-[#e9b65a]"
                />
                <span className="font-medium">⚠️ Spoiler Warning</span>
              </label>
            </div>

            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What line gave you chills? What are your predictions?"
              className="w-full bg-black/10 p-3 rounded-xl border border-black/15 outline-none text-xs sm:text-sm resize-none focus:ring-1 focus:ring-[#e9b65a]"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="button button-primary px-5 py-2 text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                <span>Post Reaction</span>
              </button>
            </div>
          </form>

          {/* Comment Stream */}
          <div className="space-y-4">
            {chapterComments.length > 0 ? (
              chapterComments.map((comm) => {
                const isRevealed = revealedSpoilers[comm.id];

                return (
                  <div
                    key={comm.id}
                    className="p-5 rounded-2xl border border-black/10 bg-black/5 space-y-3 text-xs sm:text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={comm.authorAvatar}
                          alt={comm.authorName}
                          className="w-7 h-7 rounded-full object-cover border border-black/15"
                        />
                        <div>
                          <span className="font-semibold block">{comm.authorName}</span>
                          <span className="text-[10px] opacity-60">{comm.createdAt}</span>
                        </div>
                      </div>
                      {comm.isSpoiler && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 font-semibold">
                          Spoiler
                        </span>
                      )}
                    </div>

                    {comm.isSpoiler && !isRevealed ? (
                      <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between text-xs text-amber-500">
                        <span>Plot spoiler hidden.</span>
                        <button
                          onClick={() => setRevealedSpoilers({ ...revealedSpoilers, [comm.id]: true })}
                          className="font-bold underline"
                        >
                          Reveal
                        </button>
                      </div>
                    ) : (
                      <p className="leading-relaxed opacity-90">{comm.content}</p>
                    )}

                    <div className="flex items-center space-x-4 pt-1 text-xs opacity-60">
                      <button className="flex items-center space-x-1 hover:text-[#e9b65a]">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{comm.likesCount}</span>
                      </button>
                      <span>•</span>
                      <button className="hover:opacity-100">Reply</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center rounded-2xl border border-black/10 opacity-70 text-xs">
                No comments on this chapter yet. Drop the first reaction!
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. "YOU MAY ALSO LIKE" RELATED STORIES */}
        {/* ========================================================================= */}
        {relatedStories.length > 0 && (
          <section className="pt-16 space-y-6">
            <h4 className="font-serif font-bold text-xl text-center">
              More in {story.genre}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedStories.map((rel) => (
                <StoryCard key={rel.id} story={rel} variant="standard" />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
