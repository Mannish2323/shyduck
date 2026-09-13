"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  MessageSquare, 
  Heart, 
  Share2, 
  Send, 
  AlertTriangle,
  Clock,
  Sparkles
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { DISCUSSIONS } from "@/lib/mock-data";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function DiscussionDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { user, addToast } = useShyduck();

  const discussion = DISCUSSIONS.find((d) => d.id === id) || DISCUSSIONS[0];

  const [likes, setLikes] = useState(discussion ? discussion.likesCount : 42);
  const [hasLiked, setHasLiked] = useState(false);

  // Local replies
  const [replies, setReplies] = useState([
    {
      id: "rep-1",
      author: {
        name: "Vikram Nair",
        username: "vikram_reader",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      },
      content: "This theory makes total sense! Especially when you connect it with the ancient slate in chapter 4 where the high priests took oaths in saltwater.",
      likes: 14,
      createdAt: "1 hour ago",
      isSpoiler: false
    },
    {
      id: "rep-2",
      author: {
        name: "Meera Sen",
        username: "mirasen",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      content: "As the author, I will neither confirm nor deny this... but you are definitely reading with a magnifying glass! Keep digging into the tide tables in chapter 5. 😉",
      likes: 88,
      createdAt: "45 mins ago",
      isSpoiler: false
    }
  ]);

  const [newReply, setNewReply] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);

  if (!discussion) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 shell space-y-4">
        <ShyduckMascot mood="curious" size={80} />
        <h1 className="text-2xl font-serif font-bold text-[#fbf7ef]">Discussion Not Found</h1>
        <Link href="/community" className="button button-primary px-6 py-2.5 text-xs font-semibold">
          Return to Community
        </Link>
      </div>
    );
  }

  const handleToggleLike = () => {
    if (hasLiked) {
      setLikes((l) => l - 1);
      setHasLiked(false);
    } else {
      setLikes((l) => l + 1);
      setHasLiked(true);
      addToast("Discussion upvoted!", "Appreciation recorded.", "success");
    }
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const rep = {
      id: `rep-${Date.now()}`,
      author: {
        name: user?.name || "Fellow Storyteller",
        username: user?.username || "fellow_reader",
        avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
      },
      content: newReply.trim(),
      likes: 1,
      createdAt: "Just now",
      isSpoiler
    };

    setReplies([...replies, rep]);
    setNewReply("");
    setIsSpoiler(false);
    addToast("Reply posted!", "Your voice has been added to the debate.", "success");
  };

  return (
    <div className="w-full min-h-screen py-10 shell max-w-4xl space-y-8">
      {/* Back Link */}
      <Link
        href="/community"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8b90a6] hover:text-[#e9b65a] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Discussions</span>
      </Link>

      {/* Main Discussion Post Card */}
      <article className="p-8 rounded-3xl border border-[#23273e] bg-[#0e1020] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#181a2e] text-[#e9b65a] border border-[#282d49]">
            {discussion.category}
          </span>
          <span className="text-xs text-[#71768e] flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Active {discussion.lastActivity}</span>
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ef] leading-tight">
          {discussion.title}
        </h1>

        {/* Author Header */}
        <div className="flex items-center space-x-3 py-2 border-y border-[#1a1d30]">
          <Link href={`/authors/${discussion.author.username}`}>
            <img
              src={discussion.author.avatar}
              alt={discussion.author.name}
              className="w-10 h-10 rounded-full object-cover border border-[#282d49]"
            />
          </Link>
          <div>
            <Link
              href={`/authors/${discussion.author.username}`}
              className="text-xs font-semibold text-[#fbf7ef] hover:text-[#e9b65a] transition-colors block"
            >
              {discussion.author.name}
            </Link>
            <span className="text-[11px] text-[#6e738a]">
              @{discussion.author.username}
            </span>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-sm sm:text-base text-[#cad0e6] leading-relaxed whitespace-pre-line">
          {discussion.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {discussion.tags.map((t) => (
            <span key={t} className="text-xs bg-[#141628] text-[#868c9f] px-2.5 py-1 rounded-lg">
              #{t}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#1a1d30] flex items-center justify-between text-xs">
          <button
            onClick={handleToggleLike}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              hasLiked
                ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                : "border-[#252940] text-[#8c91a8] hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
            <span>{likes} Upvotes</span>
          </button>

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                navigator.clipboard?.writeText(window.location.href);
                addToast("Thread link copied!", "Share this discussion.", "success");
              }
            }}
            className="flex items-center space-x-1.5 text-[#8c91a8] hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </article>

      {/* Reply Thread Section */}
      <section className="space-y-6">
        <h3 className="font-serif font-bold text-xl text-[#fbf7ef] flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-[#e9b65a]" />
          <span>Responses ({replies.length})</span>
        </h3>

        {/* Post Reply Form */}
        <form onSubmit={handlePostReply} className="p-5 rounded-2xl border border-[#20253d] bg-[#0d0f1e] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#fbf7ef]">
              Add your viewpoint:
            </span>
            <label className="flex items-center space-x-2 text-xs text-amber-400 cursor-pointer">
              <input
                type="checkbox"
                checked={isSpoiler}
                onChange={(e) => setIsSpoiler(e.target.checked)}
                className="rounded border-[#2f3552] text-[#e9b65a] focus:ring-[#e9b65a]"
              />
              <span>⚠️ Mark as Spoiler</span>
            </label>
          </div>

          <textarea
            rows={3}
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share theories, quote chapter evidence, or respectfully debate..."
            className="w-full bg-[#141628] text-[#fbf7ef] p-3 rounded-xl border border-[#262b44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newReply.trim()}
              className="button button-primary px-5 py-2 text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
              <span>Post Reply</span>
            </button>
          </div>
        </form>

        {/* Replies List */}
        <div className="space-y-4">
          {replies.map((rep) => (
            <div
              key={rep.id}
              className="p-5 rounded-2xl border border-[#1d2136] bg-[#0b0d1a] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={rep.author.avatar}
                    alt={rep.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#242840]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#fbf7ef] block">
                      {rep.author.name}
                    </span>
                    <span className="text-[10px] text-[#6d7289]">
                      {rep.createdAt}
                    </span>
                  </div>
                </div>

                {rep.isSpoiler && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold">
                    Spoiler
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#cbd0e6] leading-relaxed">
                {rep.content}
              </p>

              <div className="flex items-center space-x-4 pt-1 text-xs text-[#7e849e]">
                <span className="flex items-center space-x-1 text-rose-400">
                  <Heart className="w-3 h-3" />
                  <span>{rep.likes}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
