"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  BarChart3, 
  Eye, 
  Users, 
  Bookmark, 
  MessageSquare, 
  TrendingUp, 
  Sparkles,
  Award 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { WRITER_ANALYTICS } from "@/lib/mock-data";

export default function StoryAnalyticsPage() {
  const params = useParams();
  const storyId = (params?.id as string) || "";
  const { stories } = useShyduck();

  const story = stories.find((s) => s.id === storyId || s.slug === storyId) || stories[0];
  const analytics = WRITER_ANALYTICS;

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
      <div className="space-y-1.5 border-b border-[#1f2338] pb-6">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Performance & Reader Retention</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#fbf7ef]">
          Analytics: {story?.title}
        </h1>
        <p className="text-xs text-[#8c91a8]">
          Detailed chapter completion data and audience demographics for your serialized world.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Total Reads</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            {analytics.totalReads.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            +18.4% this month
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Unique Readers</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            {analytics.uniqueReaders.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#8e94ad]">
            84% mobile readers
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Library Bookmarks</span>
            <Bookmark className="w-4 h-4 text-[#e9b65a]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            {analytics.bookmarksCount.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            +310 this week
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-[#222740] bg-[#0d0f1e] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#7e849e]">
            <span>Avg Completion</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#fbf7ef]">
            {analytics.completionRate ?? analytics.avgCompletionRate}%
          </div>
          <span className="text-[10px] text-[#e9b65a] font-semibold">
            Strong reader loyalty
          </span>
        </div>
      </div>

      {/* Reads Over Time Visual Bar Chart */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#21263f] bg-[#0e1022] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Reads Over Time (Last 6 Months)
            </h3>
            <p className="text-xs text-[#7d8299]">
              Growth trajectory following Chapter 10 release milestone.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#181a2e] text-[#e9b65a] border border-[#282d49]">
            Cumulative
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {(analytics.readsOverTime || []).map((item) => {
            const maxReads = 250000;
            const pct = Math.round((item.reads / maxReads) * 100);

            return (
              <div key={item.date} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8e94ab] font-medium">{item.date}</span>
                  <span className="text-[#fbf7ef] font-mono font-semibold">{item.reads.toLocaleString()} reads</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#16182c] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#e9b65a] to-[#d8972e] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Retention & Drop-off Performance */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#21263f] bg-[#0e1022] space-y-6">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
            Chapter Readership & Retention Curve
          </h3>
          <p className="text-xs text-[#7d8299]">
            Shows how many readers continue through serialized chapter releases.
          </p>
        </div>

        <div className="space-y-3">
          {(analytics.chapterDropoff || []).map((ch) => {
            const maxViews = 248900;
            const pct = Math.round((ch.views / maxViews) * 100);

            return (
              <div key={ch.chapterNumber} className="flex items-center space-x-4">
                <span className="w-16 text-xs text-[#8c91aa] font-medium shrink-0">
                  Ch {ch.chapterNumber.toString().padStart(2, "0")}
                </span>
                <div className="flex-1 h-3 rounded-full bg-[#16182c] overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-24 text-right text-xs font-mono text-[#cad0e6] shrink-0">
                  {ch.views.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
