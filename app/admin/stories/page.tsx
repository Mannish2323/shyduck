"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Archive, 
  Trash2, 
  Star,
  CheckCircle2
} from "lucide-react";
import { useShyduck } from "@/lib/store";

export default function AdminStoriesPage() {
  const { stories, addToast } = useShyduck();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Local state for admin stories override
  const [storyList, setStoryList] = useState(stories);

  const filteredStories = storyList.filter((story) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!story.title.toLowerCase().includes(q) && !story.author.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (statusFilter !== "All" && story.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const handleToggleFeatured = (id: string, title: string) => {
    setStoryList(
      storyList.map((s) => (s.id === id ? { ...s, isFeatured: !s.isFeatured } : s))
    );
    addToast("Featured status updated", `"${title}" status adjusted.`, "success");
  };

  const handleDeleteStory = (id: string, title: string) => {
    if (confirm(`ADMIN CONFIRMATION: Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) {
      setStoryList(storyList.filter((s) => s.id !== id));
      addToast("Story deleted", `"${title}" has been removed from platform database.`, "warning");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
            Story Content Management
          </h1>
          <p className="text-xs text-[#8c91a8]">
            Inspect, feature, archive, and moderate published web novels.
          </p>
        </div>

        <span className="text-xs text-[#8c91a8] bg-[#141628] px-3 py-1.5 rounded-xl border border-[#23273e] self-start sm:self-auto">
          {filteredStories.length} stories found
        </span>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#6e738d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author name..."
            className="w-full bg-[#121426] text-[#fbf7ef] pl-10 pr-4 py-2.5 rounded-xl border border-[#242842] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full sm:w-auto">
          <span className="text-[#7c8299]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#121426] text-[#e2e6f5] border border-[#242842] rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-[#e9b65a]"
          >
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Hiatus">Hiatus</option>
          </select>
        </div>
      </div>

      {/* Stories Table */}
      <div className="border border-[#21263f] rounded-2xl overflow-hidden bg-[#0d0f1e] divide-y divide-[#1c2035]">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#131526] transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`cover-${story.coverStyle} w-12 h-16 rounded-lg shrink-0 p-1 flex flex-col justify-end shadow-sm`}>
                <span className="text-[7px] font-bold text-white bg-black/40 px-1 rounded truncate">
                  {story.genre}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif font-bold text-base text-[#fbf7ef]">
                    {story.title}
                  </h3>
                  {story.isFeatured && (
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3 text-xs text-[#787d96]">
                  <span>By {story.author.name}</span>
                  <span>•</span>
                  <span>{story.chaptersCount} ch</span>
                  <span>•</span>
                  <span>{story.readsCount.toLocaleString()} reads</span>
                  <span>•</span>
                  <span className="text-emerald-400">★ {story.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Admin Action Buttons */}
            <div className="flex items-center space-x-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#1c2035] w-full md:w-auto justify-end">
              <button
                onClick={() => handleToggleFeatured(story.id, story.title)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                  story.isFeatured
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-[#16182c] text-[#8e94ad] hover:text-white border border-[#272b45]"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{story.isFeatured ? "Unfeature" : "Feature"}</span>
              </button>

              <Link
                href={`/stories/${story.slug}`}
                target="_blank"
                className="p-2 rounded-xl text-[#787e99] hover:text-[#fbf7ef] hover:bg-[#181a2e] transition-colors"
                title="View Story Page"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <button
                onClick={() => handleDeleteStory(story.id, story.title)}
                className="p-2 rounded-xl text-[#787e99] hover:text-rose-400 hover:bg-[#181a2e] transition-colors"
                title="Delete Story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
