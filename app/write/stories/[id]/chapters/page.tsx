"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  BookOpen, 
  Edit3, 
  Eye, 
  Trash2, 
  Clock, 
  Sparkles,
  ArrowUpDown,
  CheckCircle2
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { WriterStoryGate } from "@/components/creator-space";

export default function ChapterManagementPage() {
  const params = useParams();
  const storyId = (params?.id as string) || "";
  const { user, stories, getChaptersByStorySlug, addToast } = useShyduck();

  const story = stories.find((s) => user?.role === "writer" && s.author.username === user.username && (s.id === storyId || s.slug === storyId));
  const initialChapters = story ? getChaptersByStorySlug(story.slug) : [];
  const [chaptersList, setChaptersList] = useState(initialChapters);

  const handleDeleteChapter = (chapterId: string, title: string) => {
    if (confirm(`Are you sure you want to unpublish "${title}"?`)) {
      setChaptersList(chaptersList.filter((c) => c.id !== chapterId));
      addToast("Chapter deleted", `"${title}" has been archived.`, "info");
    }
  };

  if (!story) return <WriterStoryGate title="That story is not in your studio." />;

  return (
    <div className="w-full min-h-screen py-10 shell max-w-4xl space-y-8">
      {/* Back Link */}
      <Link
        href="/write"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8b90a6] hover:text-[#e9b65a] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Writer Dashboard</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2338] pb-6">
        <div className="space-y-1">
          <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Table of Contents Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#fbf7ef]">
            Chapters in &ldquo;{story?.title}&rdquo;
          </h1>
          <p className="text-xs text-[#8c91a8]">
            Manage release cadence, edit manuscript chapters, and reorder table of contents.
          </p>
        </div>

        <Link
          href={`/write/stories/${story?.id}/editor`}
          className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto shadow-lg shadow-[#e9b65a]/15"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Chapter</span>
        </Link>
      </div>

      {/* Chapters Table / List */}
      <div className="space-y-3">
        {chaptersList.map((chapter, index) => (
          <div
            key={chapter.id}
            className="p-5 rounded-2xl border border-[#21263f] bg-[#0e1022] hover:border-[#e9b65a]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4">
              <span className="font-mono font-bold text-lg text-[#e9b65a] w-8 text-center shrink-0">
                {(index + 1).toString().padStart(2, "0")}
              </span>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif font-bold text-base text-[#fbf7ef]">
                    {chapter.title}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                    Published
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-[#71768e]">
                  <span>{chapter.wordCount.toLocaleString()} words</span>
                  <span>•</span>
                  <span>{chapter.readingTimeMinutes} min read</span>
                  <span>•</span>
                  <span>Published {chapter.publishedAt}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1c2035]">
              <Link
                href={`/write/stories/${story?.id}/editor`}
                className="button button-secondary px-3 py-1.5 text-xs font-semibold flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>

              <Link
                href={`/stories/${story?.slug}/chapters/${chapter.slug}`}
                target="_blank"
                className="p-2 rounded-xl text-[#787e99] hover:text-[#fbf7ef] hover:bg-[#191c30] transition-colors"
                title="Preview in Reader"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <button
                onClick={() => handleDeleteChapter(chapter.id, chapter.title)}
                className="p-2 rounded-xl text-[#787e99] hover:text-rose-400 hover:bg-[#191c30] transition-colors"
                title="Unpublish Chapter"
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
