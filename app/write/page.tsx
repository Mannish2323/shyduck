"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Feather, 
  Plus, 
  BookOpen, 
  BarChart3, 
  Users, 
  Eye, 
  Sparkles, 
  FileText, 
  Edit3, 
  Globe, 
  Settings, 
  Clock, 
  Filter,
  CheckCircle2
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { WRITER_ANALYTICS } from "@/lib/mock-data";

export default function WriterDashboardPage() {
  const { user, stories } = useShyduck();
  const [filter, setFilter] = useState<string>("All");

  // Writer's personal stories (or demo writer stories)
  const myStories = stories.filter(
    (s) => s.author.username === user?.username || s.author.username === "mirasen"
  );

  const filteredStories = myStories.filter((s) => {
    if (filter === "All") return true;
    return s.status.toLowerCase() === filter.toLowerCase();
  });

  const totalReads = myStories.reduce((acc, curr) => acc + curr.readsCount, 0);
  const totalChapters = myStories.reduce((acc, curr) => acc + curr.chaptersCount, 0);

  return (
    <div className="w-full min-h-screen py-10 shell space-y-10">
      {/* ========================================================================= */}
      {/* 1. STUDIO HEADER */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
            <Feather className="w-3.5 h-3.5" />
            <span>Creative Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
            Good evening, <span className="text-[#e9b65a] italic">{user?.name || "Creator"}.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8c91a8]">
            Your stories have captivated thousands of minds across the subcontinent today.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/write/stories/new"
            className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-[#e9b65a]/15"
          >
            <Plus className="w-4 h-4" />
            <span>New Story</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CREATOR METRICS CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Total Reads</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#fbf7ef]">
            {totalReads ? totalReads.toLocaleString() : "248,900"}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
            <span>+14.2%</span>
            <span className="text-[#64687d]">vs last week</span>
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Dedicated Followers</span>
            <Users className="w-4 h-4 text-[#e9b65a]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#fbf7ef]">
            14,820
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
            <span>+82 new</span>
            <span className="text-[#64687d]">readers today</span>
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Published Chapters</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#fbf7ef]">
            {totalChapters || 18}
          </div>
          <span className="text-[10px] text-[#8a8fa6]">
            Across {myStories.length} universes
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Avg Completion Rate</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#fbf7ef]">
            {WRITER_ANALYTICS.completionRate}%
          </div>
          <span className="text-[10px] text-[#e9b65a] font-semibold">
            Top 5% of serialized fiction
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. STORY MANAGEMENT SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2338] pb-4">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-xl text-[#fbf7ef]">
              My Stories ({myStories.length})
            </h2>
            <p className="text-xs text-[#7c8299]">
              Manage chapters, character bibles, worldbuilding codices, and analytics.
            </p>
          </div>

          {/* Status Filters */}
          <div className="flex items-center space-x-2 text-xs">
            {["All", "Ongoing", "Completed", "Drafts"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filter === st
                    ? "bg-[#e9b65a] text-[#0a0b14] font-semibold"
                    : "bg-[#131526] text-[#8c91a8] hover:bg-[#1b1e36]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Stories List */}
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] hover:border-[#e9b65a]/50 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-start space-x-4 min-w-0">
                <div className={`cover-${story.coverStyle} w-16 h-24 rounded-xl shrink-0 p-1.5 flex flex-col justify-end shadow-md`}>
                  <span className="text-[8px] font-bold text-white bg-black/40 px-1 rounded truncate">
                    {story.genre}
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#16182c] text-[#e9b65a] border border-[#272c48]">
                      {story.genre}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      ● {story.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#fbf7ef] truncate">
                    {story.title}
                  </h3>

                  <div className="flex items-center space-x-3 text-xs text-[#71768f]">
                    <span>{story.chaptersCount} chapters</span>
                    <span>•</span>
                    <span>{story.readsCount.toLocaleString()} reads</span>
                    <span>•</span>
                    <span>Updated {story.updatedAt}</span>
                  </div>
                </div>
              </div>

              {/* Right: Studio Quick Actions */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1c2035]">
                <Link
                  href={`/write/stories/${story.id}/editor`}
                  className="button button-primary px-3.5 py-2 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write Chapter</span>
                </Link>

                <Link
                  href={`/write/stories/${story.id}/chapters`}
                  className="button button-secondary px-3.5 py-2 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Chapters</span>
                </Link>

                <Link
                  href={`/write/stories/${story.id}/characters`}
                  className="button button-secondary px-3 py-2 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Characters</span>
                </Link>

                <Link
                  href={`/write/stories/${story.id}/world`}
                  className="button button-secondary px-3 py-2 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>World</span>
                </Link>

                <Link
                  href={`/write/stories/${story.id}/analytics`}
                  className="button button-secondary px-3 py-2 text-xs font-semibold flex items-center space-x-1.5"
                  title="Story Performance Analytics"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#e9b65a]" />
                  <span>Analytics</span>
                </Link>

                <Link
                  href={`/stories/${story.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl text-[#7e849e] hover:text-[#fbf7ef] hover:bg-[#181a2e] transition-colors"
                  title="Preview Public Page"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
