"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  MessageSquare, 
  Flame, 
  Sparkles, 
  Plus, 
  Heart, 
  Clock, 
  Tag, 
  HelpCircle,
  Feather,
  BookOpen
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { DISCUSSIONS, AUTHORS } from "@/lib/mock-data";
import { UIModal } from "@/components/ui-modal";

export default function CommunityPage() {
  const { user, addToast } = useShyduck();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [discussionsList, setDiscussionsList] = useState(DISCUSSIONS);

  // New Discussion Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Theories");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");

  const categories = ["All", "Theories", "Writing Advice", "Lore Breakdown", "General"];

  const filteredDiscussions = discussionsList.filter((d) => {
    if (selectedCategory === "All") return true;
    return d.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newDisc = {
      id: `disc-${Date.now()}`,
      title: title.trim(),
      category,
      author: {
        username: user?.username || "fellow_reader",
        name: user?.name || "Fellow Storyteller",
        avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
      },
      content: content.trim(),
      repliesCount: 0,
      likesCount: 1,
      lastActivity: "Just now",
      tags: tagInput ? tagInput.split(",").map((t) => t.trim()).filter(Boolean) : ["General"]
    };

    setDiscussionsList([newDisc, ...discussionsList]);
    setTitle("");
    setContent("");
    setTagInput("");
    setIsModalOpen(false);
    addToast("Discussion started!", "Your thread is live in the Round Table.", "success");
  };

  return (
    <div className="w-full min-h-screen py-10 shell space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
            <Users className="w-3.5 h-3.5" />
            <span>The Reader&apos;s Round Table</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
            Community & <span className="text-[#e9b65a] italic">Theories.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8c91a8]">
            Discuss ongoing story plotlines, debate world lore, share writing advice, and connect with authors across India.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto shadow-lg shadow-[#e9b65a]/15"
        >
          <Plus className="w-4 h-4" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-[#1e2238]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-[#e9b65a] text-[#0a0b14] font-bold"
                : "bg-[#131525] text-[#8e94ad] hover:text-[#fbf7ef] hover:bg-[#1b1e33]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Discussion List + Community Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Discussions Thread List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredDiscussions.map((disc) => (
            <div
              key={disc.id}
              className="p-6 rounded-2xl border border-[#20253d] bg-[#0d0f1e] hover:border-[#e9b65a]/40 transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#171a2e] text-[#e9b65a] border border-[#272b47]">
                  {disc.category}
                </span>
                <span className="text-[11px] text-[#6d7289] flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{disc.lastActivity}</span>
                </span>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/community/discussions/${disc.id}`}
                  className="font-serif font-bold text-lg sm:text-xl text-[#fbf7ef] group-hover:text-[#e9b65a] transition-colors block leading-snug"
                >
                  {disc.title}
                </Link>
                <p className="text-xs sm:text-sm text-[#8f94ad] line-clamp-2 leading-relaxed">
                  {disc.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {disc.tags.map((t) => (
                  <span key={t} className="text-[10px] bg-[#141628] text-[#787d96] px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Footer Author & Engagement */}
              <div className="pt-3 border-t border-[#181b2e] flex items-center justify-between text-xs">
                <Link
                  href={`/authors/${disc.author.username}`}
                  className="flex items-center space-x-2 text-[#7f849c] hover:text-[#fbf7ef] transition-colors"
                >
                  <img
                    src={disc.author.avatar}
                    alt={disc.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{disc.author.name}</span>
                </Link>

                <div className="flex items-center space-x-4 text-[#898ea6]">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>{disc.likesCount}</span>
                  </span>
                  <Link
                    href={`/community/discussions/${disc.id}`}
                    className="flex items-center space-x-1 text-[#e9b65a] font-semibold hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{disc.repliesCount} Replies</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Spotlight Authors */}
          <div className="p-6 rounded-2xl border border-[#20253d] bg-[#0d0f1e] space-y-4">
            <h3 className="font-serif font-bold text-sm text-[#fbf7ef] flex items-center space-x-2">
              <Feather className="w-4 h-4 text-[#e9b65a]" />
              <span>Active Round Table Writers</span>
            </h3>
            <div className="space-y-3">
              {AUTHORS.slice(0, 3).map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.username}`}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#15172b] transition-colors group"
                >
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#262b45]"
                  />
                  <div className="truncate">
                    <span className="text-xs font-semibold text-[#fbf7ef] group-hover:text-[#e9b65a] block truncate">
                      {author.name}
                    </span>
                    <span className="text-[10px] text-[#6d7289]">
                      {author.followersCount.toLocaleString()} followers
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Guidelines Mini Box */}
          <div className="p-6 rounded-2xl border border-[#20253d] bg-gradient-to-br from-[#121426] to-[#0c0e1c] space-y-3 text-xs text-[#8c91a8]">
            <h4 className="font-semibold text-sm text-[#fbf7ef] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#e9b65a]" />
              <span>Community Etiquette</span>
            </h4>
            <p>
              Respect creators and fellow readers. Tag all major plot twists with spoiler warnings so new readers can discover worlds organically.
            </p>
            <Link href="/guidelines#rules" className="text-xs font-semibold text-[#e9b65a] hover:underline block pt-1">
              Read Community Rules →
            </Link>
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* START DISCUSSION MODAL */}
      {/* ========================================================================= */}
      <UIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Start a Community Discussion"
      >
        <form onSubmit={handleCreateDiscussion} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Topic Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Is Dev's daughter from an alternate timeline or the main loop?"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#141628] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-[#e9b65a]"
            >
              <option value="Theories">Theories & Foreshadowing</option>
              <option value="Writing Advice">Writing Advice & Craft</option>
              <option value="Lore Breakdown">Lore Breakdown & Worldbuilding</option>
              <option value="General">General Discussion</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Thoughts / Question *
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detail your evidence, timestamps, character quotes, or question..."
              className="w-full bg-[#141628] text-[#fbf7ef] p-3.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. Echoes of Aether, Time Loop, Theory"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8f94ad] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="button button-primary px-5 py-2 text-xs font-semibold disabled:opacity-50"
            >
              Publish Thread
            </button>
          </div>
        </form>
      </UIModal>
    </div>
  );
}
