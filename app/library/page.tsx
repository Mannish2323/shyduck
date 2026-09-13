"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookMarked, 
  Clock, 
  Bookmark, 
  ListPlus, 
  UserCheck, 
  BookOpen, 
  CheckCircle, 
  Plus, 
  Trash2, 
  ExternalLink,
  Sparkles
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { AUTHORS } from "@/lib/mock-data";
import { StoryCard } from "@/components/story-card";
import { AuthorCard } from "@/components/author-card";
import { ShyduckMascot } from "@/components/shyduck-mascot";
import { UIModal } from "@/components/ui-modal";

export default function LibraryPage() {
  const { 
    readingProgress, 
    bookmarks, 
    followingAuthors, 
    readingLists, 
    createReadingList, 
    removeStoryFromList,
    stories,
    toggleBookmark,
    addToast 
  } = useShyduck();

  // Active tab: 'reading' | 'bookmarks' | 'lists' | 'completed' | 'following'
  const [activeTab, setActiveTab] = useState<string>("reading");

  // Create List Modal state
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  // Stories in progress
  const inProgressList = Object.values(readingProgress).map((prog) => {
    const story = stories.find((s) => s.slug === prog.storySlug);
    return { prog, story };
  }).filter((item) => item.story !== undefined);

  // Bookmarked stories
  const bookmarkedStories = stories.filter((s) => bookmarks.includes(s.slug));

  // Completed stories (progress >= 100% or marked completed)
  const completedStories = inProgressList.filter((item) => item.prog.percentage >= 100);

  // Followed authors
  const followedAuthorsList = AUTHORS.filter((a) => followingAuthors.includes(a.username));

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return;

    createReadingList(listName.trim(), listDescription.trim());
    setListName("");
    setListDescription("");
    setIsCreateListOpen(false);
    addToast("Reading list created!", `"${listName.trim()}" is now in your collection.`, "success");
  };

  return (
    <div className="w-full min-h-screen py-10 shell space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
            My <span className="text-[#e9b65a] italic">Library.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8c91a8]">
            Your current reads, saved worlds, reading lists, and followed creators.
          </p>
        </div>

        {activeTab === "lists" && (
          <button
            onClick={() => setIsCreateListOpen(true)}
            className="button button-primary px-4 py-2 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Reading List</span>
          </button>
        )}
      </div>

      {/* Library Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto border-b border-[#1e2238] pb-1 scrollbar-none">
        {[
          { id: "reading", label: "Continue Reading", count: inProgressList.length, icon: Clock },
          { id: "bookmarks", label: "Bookmarks", count: bookmarkedStories.length, icon: Bookmark },
          { id: "lists", label: "Reading Lists", count: readingLists.length, icon: ListPlus },
          { id: "completed", label: "Completed", count: completedStories.length, icon: CheckCircle },
          { id: "following", label: "Following", count: followedAuthorsList.length, icon: UserCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 flex items-center space-x-2 ${
                isActive ? "text-[#e9b65a]" : "text-[#7f849c] hover:text-[#fbf7ef]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1b1e32] text-[#8b91ab]">
                {tab.count}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9b65a] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB CONTENT PANES */}
      {/* ========================================================================= */}
      <div className="py-4">
        {/* ==================== 1. CONTINUE READING ==================== */}
        {activeTab === "reading" && (
          <div>
            {inProgressList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inProgressList.map(({ prog, story }) => (
                  <div
                    key={prog.storySlug}
                    className="p-5 sm:p-6 rounded-2xl border border-[#21253d] bg-[#0e1020] hover:border-[#e9b65a]/40 transition-all flex flex-col sm:flex-row gap-5 items-start justify-between"
                  >
                    <div className="flex gap-4 items-start w-full">
                      {/* Thumbnail */}
                      <Link
                        href={`/stories/${story!.slug}`}
                        className={`cover-${story!.coverStyle} w-20 h-28 rounded-xl shrink-0 p-2 flex flex-col justify-end shadow-md`}
                      >
                        <span className="text-[8px] font-bold text-white bg-black/40 px-1 rounded truncate">
                          {story!.title}
                        </span>
                      </Link>

                      {/* Details & Progress Bar */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-[#e9b65a] uppercase tracking-wider block">
                          {story!.genre}
                        </span>
                        <h3 className="font-serif font-bold text-base text-[#fbf7ef] truncate">
                          {story!.title}
                        </h3>
                        <p className="text-xs text-[#7e849e]">
                          By {story!.author.name} • Chapter {prog.chapterNumber} of {story!.chaptersCount}
                        </p>

                        {/* Visual Progress Bar (Section 21 format) */}
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[11px] font-mono text-[#8a90aa]">
                            <span>Ch {prog.chapterNumber.toString().padStart(2, "0")} / {story!.chaptersCount.toString().padStart(2, "0")}</span>
                            <span className="text-[#e9b65a] font-bold">{prog.percentage}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#181a2c] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#e9b65a] to-[#d8972e] rounded-full transition-all duration-300"
                              style={{ width: `${prog.percentage}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[10px] text-[#6b7087]">
                            Last read {prog.lastReadAt || "recently"}
                          </span>
                          <Link
                            href={`/stories/${story!.slug}/chapters/${prog.chapterSlug}`}
                            className="button button-primary px-3.5 py-1.5 text-xs font-semibold flex items-center space-x-1"
                          >
                            <span>Continue</span>
                            <BookOpen className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-4">
                <ShyduckMascot mood="reading" size={72} />
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">No Active Reads</h3>
                  <p className="text-xs text-[#8c91a8]">
                    You haven&apos;t started reading any stories yet. Open a chapter to start tracking your progress.
                  </p>
                </div>
                <Link href="/discover" className="button button-primary px-6 py-2.5 text-xs font-semibold">
                  Discover Stories
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. BOOKMARKS ==================== */}
        {activeTab === "bookmarks" && (
          <div>
            {bookmarkedStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bookmarkedStories.map((story) => (
                  <StoryCard key={story.id} story={story} variant="standard" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-4">
                <ShyduckMascot mood="creative" size={72} />
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">
                    Your next favorite world is waiting.
                  </h3>
                  <p className="text-xs text-[#8c91a8]">
                    Bookmark stories while browsing to keep them easily accessible in your library shelf.
                  </p>
                </div>
                <Link href="/discover" className="button button-primary px-6 py-2.5 text-xs font-semibold">
                  Discover Stories
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. READING LISTS ==================== */}
        {activeTab === "lists" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {readingLists.map((list) => {
                const listStories = stories.filter((s) => list.storySlugs.includes(s.slug));

                return (
                  <div
                    key={list.id}
                    className="p-6 rounded-2xl border border-[#22263e] bg-[#0e1020] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#e9b65a] flex items-center space-x-1">
                          <ListPlus className="w-3.5 h-3.5" />
                          <span>{list.storySlugs.length} Stories</span>
                        </span>
                        {list.isPrivate && (
                          <span className="text-[10px] text-[#787d96] bg-[#16182a] px-2 py-0.5 rounded">
                            Private List
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
                        {list.name}
                      </h3>
                      {list.description && (
                        <p className="text-xs text-[#8c91a8] leading-relaxed">
                          {list.description}
                        </p>
                      )}

                      {/* Mini stories in list */}
                      <div className="space-y-2 pt-2">
                        {listStories.map((story) => (
                          <div
                            key={story.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#141628] border border-[#23273e] text-xs"
                          >
                            <Link
                              href={`/stories/${story.slug}`}
                              className="font-medium text-[#cad0e6] hover:text-[#e9b65a] truncate max-w-[200px]"
                            >
                              {story.title}
                            </Link>
                            <button
                              onClick={() => removeStoryFromList(list.id, story.slug)}
                              className="p-1 text-[#6b7087] hover:text-rose-400 transition-colors"
                              title="Remove from list"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1a1d30] flex items-center justify-between">
                      <Link
                        href={`/discover?list=${list.id}`}
                        className="text-xs text-[#e9b65a] font-semibold hover:underline"
                      >
                        Read all in this list →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 4. COMPLETED ==================== */}
        {activeTab === "completed" && (
          <div>
            {completedStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {completedStories.map(({ story }) => (
                  <StoryCard key={story!.id} story={story!} variant="standard" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-4">
                <ShyduckMascot mood="peaceful" size={72} />
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">
                    No Completed Stories Yet
                  </h3>
                  <p className="text-xs text-[#8c91a8]">
                    When you finish the final chapter of a novel, it will be enshrined here in your completed chronicles.
                  </p>
                </div>
                <Link href="/discover?status=completed" className="button button-primary px-6 py-2.5 text-xs font-semibold">
                  Browse Completed Novels
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ==================== 5. FOLLOWING AUTHORS ==================== */}
        {activeTab === "following" && (
          <div>
            {followedAuthorsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {followedAuthorsList.map((author) => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-4">
                <ShyduckMascot mood="curious" size={72} />
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">
                    Not Following Any Creators Yet
                  </h3>
                  <p className="text-xs text-[#8c91a8]">
                    Follow authors to receive instant chapter release notifications and support independent voices.
                  </p>
                </div>
                <Link href="/community" className="button button-primary px-6 py-2.5 text-xs font-semibold">
                  Explore Rising Authors
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CREATE READING LIST MODAL */}
      {/* ========================================================================= */}
      <UIModal
        isOpen={isCreateListOpen}
        onClose={() => setIsCreateListOpen(false)}
        title="Create New Reading List"
      >
        <form onSubmit={handleCreateList} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              List Name *
            </label>
            <input
              type="text"
              required
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="e.g. Monsoon Midnight Reads"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              placeholder="Stories with ancient maps, tea stalls, or quiet magic."
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreateListOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8f94ad] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!listName.trim()}
              className="button button-primary px-5 py-2 text-xs font-semibold disabled:opacity-50"
            >
              Create List
            </button>
          </div>
        </form>
      </UIModal>
    </div>
  );
}
