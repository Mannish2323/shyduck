"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Flame, 
  Save, 
  CheckCircle2, 
  Radio, 
  AlertCircle 
} from "lucide-react";
import { useShyduck } from "@/lib/store";

export default function AdminHomepageControlPage() {
  const { stories, addToast } = useShyduck();

  const [heroStoryId, setHeroStoryId] = useState("story-1");
  const [promoBannerText, setPromoBannerText] = useState(
    "Monsoon Fiction Showcase: Vote on your favorite independent serials!"
  );
  const [isBannerActive, setIsBannerActive] = useState(true);

  const handleSaveHomepageConfig = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Homepage Updated", "Editorial curation settings published to live homepage.", "success");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
          Homepage & Editorial Control
        </h1>
        <p className="text-xs text-[#8c91a8]">
          Configure hero spotlights, featured slots, and platform announcement banners.
        </p>
      </div>

      <form onSubmit={handleSaveHomepageConfig} className="space-y-6">
        {/* Hero Spotlight Story */}
        <div className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#e9b65a]">
            <Sparkles className="w-4 h-4" />
            <span>Hero Showcase Slot</span>
          </div>

          <p className="text-xs text-[#8c91a8]">
            Select which premier universe is prominently featured beside the main headline on the public homepage.
          </p>

          <select
            value={heroStoryId}
            onChange={(e) => setHeroStoryId(e.target.value)}
            className="w-full bg-[#131526] text-[#e2e6f5] border border-[#272c44] rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:border-[#e9b65a]"
          >
            {stories.map((story) => (
              <option key={story.id} value={story.id}>
                {story.title} (by {story.author.name}) — {story.genre}
              </option>
            ))}
          </select>
        </div>

        {/* Global Announcement Banner */}
        <div className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Radio className="w-4 h-4" />
              <span>Platform Broadcast Ribbon</span>
            </div>

            <label className="flex items-center space-x-2 text-xs text-[#8c91a8] cursor-pointer">
              <input
                type="checkbox"
                checked={isBannerActive}
                onChange={(e) => setIsBannerActive(e.target.checked)}
                className="rounded border-[#292e47] text-[#e9b65a] focus:ring-[#e9b65a]"
              />
              <span>Display Live</span>
            </label>
          </div>

          <p className="text-xs text-[#8c91a8]">
            A thin alert ribbon rendered at the top of the viewport for platform events or community competitions.
          </p>

          <input
            type="text"
            value={promoBannerText}
            onChange={(e) => setPromoBannerText(e.target.value)}
            placeholder="Broadcast announcement text..."
            className="w-full bg-[#131526] text-[#fbf7ef] px-4 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="button button-primary px-7 py-3 text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-[#e9b65a]/15"
          >
            <Save className="w-4 h-4" />
            <span>Publish Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
