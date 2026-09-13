"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  BookOpen, 
  Feather, 
  FilePlus2, 
  Lightbulb, 
  MessageCircle, 
  RefreshCw, 
  Users,
  Eye,
  Plus,
  PenSquare,
  Globe,
  Compass
} from "lucide-react";
import { 
  CreatorHero, 
  CreatorSidebar, 
  DashboardSkeleton, 
  EmptyStoryState, 
  QuickActionCard 
} from "@/components/creator-space";
import { useWriterDashboard } from "@/lib/writer-dashboard";
import { Story } from "@/lib/types";

type StoryFilter = "All" | "Draft" | "Published";

export default function WriterDashboardPage() {
  const dashboard = useWriterDashboard();
  const { user, stories, drafts, publishedStories, isEmpty, totalChapters, totalReads, totalFollowers } = dashboard;

  const [filter, setFilter] = useState<StoryFilter>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 160);
    const updateConnection = () => setIsOnline(window.navigator.onLine);
    updateConnection();
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  // Gate for non-writers
  if (!user || user.role !== "writer") {
    return (
      <main className="shell flex min-h-[72vh] items-center py-12">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#262b44] bg-[#0e1022] p-8 sm:p-10 text-center shadow-2xl space-y-4">
          <div className="eyebrow text-[#e9b65a]">Creator Space</div>
          <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
            Sign in as a writer to begin.
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed text-[#8f94ad]">
            Your writing studio is personal and private. Choose <strong className="text-[#e9b65a]">Writer</strong> during onboarding to craft, publish, and manage your original serialized novels.
          </p>
          <div className="pt-3 flex justify-center gap-3">
            <Link href="/onboarding" className="button button-primary px-6 py-3 text-xs font-bold shadow-lg shadow-[#e9b65a]/15">
              Choose Writer Role →
            </Link>
            <Link href="/login" className="button button-secondary px-5 py-3 text-xs font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <div className="shell flex gap-6 py-6 lg:py-8">
        <CreatorSidebar />
        <main className="min-w-0 flex-1">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  const filteredStories = stories.filter((story) => {
    if (filter === "All") return true;
    return filter === "Draft" ? story.status === "Draft" : story.status !== "Draft";
  });

  return (
    <div className="shell flex gap-6 py-6 lg:py-8">
      {/* Sidebar Navigation */}
      <CreatorSidebar />

      {/* Main Studio Area */}
      <main className="min-w-0 flex-1 space-y-6" aria-labelledby="creator-dashboard-title">
        {/* Offline Warning Banner */}
        {!isOnline && (
          <div role="status" className="flex items-center gap-3 rounded-2xl border border-[#786134] bg-[#271f14] px-4 py-3 text-xs text-[#f1d39b]">
            <RefreshCw className="h-4 w-4 shrink-0 animate-spin" />
            <span>
              <strong>Connection unavailable.</strong> Your local drafts remain safe; synchronization will resume once you are back online.
            </span>
          </div>
        )}

        {/* Hero Area */}
        <CreatorHero name={user.name || "Creator"} />

        {/* ==================================================================== */}
        {/* CONDITIONAL STATE 1: EMPTY STUDIO (No stories yet)                 */}
        {/* ==================================================================== */}
        {isEmpty ? (
          <div className="space-y-6">
            {/* Empty State Hero Card */}
            <EmptyStoryState />

            {/* Quick Actions Grid */}
            <section aria-labelledby="quick-actions-title" className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <div className="eyebrow text-[#e9b65a]">Creative Momentum</div>
                  <h2 id="quick-actions-title" className="mt-1 font-serif text-2xl font-bold text-[#fbf7ef]">
                    Quick Actions
                  </h2>
                </div>
                <span className="text-xs text-[#6e748d]">Your studio, your pace.</span>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
                <QuickActionCard 
                  href="/write/stories/new" 
                  icon={FilePlus2} 
                  title="New Story" 
                  description="Start a new world and set up its premise" 
                />
                <QuickActionCard 
                  href="/genres" 
                  icon={Lightbulb} 
                  title="Explore Ideas" 
                  description="Find spark across 10 fantasy & sci-fi genres" 
                />
                <QuickActionCard 
                  href="/guidelines" 
                  icon={BookOpen} 
                  title="Writing Guide" 
                  description="Crafting compelling hooks, world lore & pacing" 
                />
                <QuickActionCard 
                  href="/community" 
                  icon={Users} 
                  title="Community" 
                  description="Connect with fellow novelists & storytellers" 
                />
              </div>
            </section>

            {/* Reassuring Editorial Tip Card */}
            <section className="rounded-2xl border border-[#21263d] bg-[#0e1022] p-5 sm:p-6 shadow-md">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#e9b65a]/10 text-[#e9b65a] shrink-0 mt-0.5">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#f4f1e8]">A quiet place to start</h3>
                  <p className="text-xs leading-relaxed text-[#878da5]">
                    You do not need an established following before you write. Give your book a title, save a working draft, and let your world take shape one chapter at a time.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* ==================================================================== */
          /* CONDITIONAL STATE 2/3/4: POPULATED STUDIO (Has 1+ real stories)    */
          /* ==================================================================== */
          <div className="space-y-6">
            {/* Real Studio Overview Metrics (Calculated truthfully from user's data) */}
            <section id="analytics" aria-labelledby="creator-metrics-title" className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <div className="eyebrow text-[#e9b65a]">Your Work At A Glance</div>
                  <h2 id="creator-metrics-title" className="mt-1 font-serif text-2xl font-bold text-[#fbf7ef]">
                    Studio Overview
                  </h2>
                </div>
                <Link href="/write/stories/new" className="button button-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Story</span>
                </Link>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard 
                  label="My Stories" 
                  value={stories.length.toString()} 
                  detail="Created by you" 
                  icon={Feather} 
                />
                <MetricCard 
                  label="Published Chapters" 
                  value={totalChapters.toString()} 
                  detail="Across all active works" 
                  icon={BookOpen} 
                />
                <MetricCard 
                  label="Recorded Reads" 
                  value={totalReads.toLocaleString()} 
                  detail={totalReads > 0 ? "Actual reader events" : "No readers recorded yet"} 
                  icon={BarChart3} 
                />
                <MetricCard 
                  label="Followers" 
                  value={totalFollowers.toString()} 
                  detail={totalFollowers > 0 ? "Subscribed to your works" : "Audience starts with Ch. 1"} 
                  icon={Users} 
                />
              </div>
            </section>

            {/* Working Drafts Section */}
            {drafts.length > 0 && (
              <section aria-labelledby="drafts-title" className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="eyebrow text-[#e9b65a]">Pick Up Where You Left Off</div>
                    <h2 id="drafts-title" className="mt-1 font-serif text-2xl font-bold text-[#fbf7ef]">
                      Drafts
                    </h2>
                  </div>
                  <span className="text-xs text-[#70768f]">{drafts.length} in progress</span>
                </div>

                <div className="grid gap-3.5 md:grid-cols-2">
                  {drafts.map((story) => (
                    <DraftCard key={story.id} story={story} />
                  ))}
                </div>
              </section>
            )}

            {/* Stories Shelf */}
            <section id="stories" aria-labelledby="stories-shelf-title" className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[#1f233a] pb-3">
                <div>
                  <div className="eyebrow text-[#e9b65a]">Your Story Catalog</div>
                  <h2 id="stories-shelf-title" className="mt-1 font-serif text-2xl font-bold text-[#fbf7ef]">
                    My Stories
                  </h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-1 rounded-xl border border-[#232840] bg-[#0e1022] p-1">
                  {(["All", "Draft", "Published"] as StoryFilter[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                        filter === item
                          ? "bg-[#e9b65a] text-[#0a0b14] font-bold shadow-md shadow-[#e9b65a]/10"
                          : "text-[#878ea7] hover:text-[#fbf7ef]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stories List */}
              {filteredStories.length === 0 ? (
                <EmptyFilterState filter={filter} />
              ) : (
                <div className="space-y-3.5">
                  {filteredStories.map((story) => (
                    <OwnedStoryRow key={story.id} story={story} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-[#21263d] bg-[#0e1022] p-5 shadow-sm space-y-1">
      <div className="flex items-center justify-between text-xs text-[#7e849c]">
        <span className="font-medium">{label}</span>
        <div className="p-1.5 rounded-lg bg-[#16192d] text-[#e9b65a]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ef]">
        {value}
      </div>
      <p className="text-[11px] text-[#6d738a]">{detail}</p>
    </div>
  );
}

function DraftCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/write/stories/${story.id}/editor`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-[#342f47] bg-[#141427] p-5 transition-all hover:-translate-y-0.5 hover:border-[#e9b65a]/60 hover:shadow-xl hover:shadow-black/25"
    >
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e9b65a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e9b65a] animate-pulse" />
          <span>Draft in progress</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-[#fbf7ef] truncate group-hover:text-[#e9b65a] transition-colors">
          {story.title}
        </h3>
        <p className="text-xs text-[#7e849c]">
          Last edited {story.updatedAt}
        </p>
      </div>
      <span className="button button-secondary px-3.5 py-2 text-xs font-bold shrink-0 group-hover:border-[#e9b65a]">
        Continue writing →
      </span>
    </Link>
  );
}

function OwnedStoryRow({ story }: { story: Story }) {
  return (
    <article className="rounded-2xl border border-[#21263d] bg-[#0e1022] p-5 transition-all hover:border-[#e9b65a]/40 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Cover + Info */}
        <div className="flex min-w-0 items-center gap-4">
          <div className={`cover-${story.coverStyle || "ember"} flex h-20 w-14 shrink-0 items-end rounded-xl p-2 shadow-lg border border-white/10`}>
            <span className="line-clamp-2 text-[9px] font-bold leading-tight text-white drop-shadow">
              {story.title}
            </span>
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
              <span className="rounded-full border border-[#2b3049] bg-[#14172a] px-2.5 py-0.5 text-[#e9b65a]">
                {story.genre}
              </span>
              <span className={story.status === "Draft" ? "text-[#e9b65a]" : "text-emerald-400 font-bold"}>
                {story.status}
              </span>
            </div>

            <h3 className="truncate font-serif text-lg font-bold text-[#fbf7ef]">
              {story.title}
            </h3>

            <p className="text-xs text-[#798099]">
              {story.chaptersCount} chapters · {story.readsCount.toLocaleString()} reads · Updated {story.updatedAt}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Link
            href={`/write/stories/${story.id}/editor`}
            className="button button-primary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Write Chapter</span>
          </Link>

          <Link
            href={`/write/stories/${story.id}/chapters`}
            className="button button-secondary px-3 py-2 text-xs font-semibold"
          >
            Chapters
          </Link>

          <Link
            href={`/write/stories/${story.id}/characters`}
            className="button button-secondary px-3 py-2 text-xs font-semibold hidden md:inline-flex"
          >
            Characters
          </Link>

          <Link
            href={`/write/stories/${story.id}/world`}
            className="button button-secondary px-3 py-2 text-xs font-semibold hidden md:inline-flex"
          >
            World
          </Link>

          <Link
            href={`/stories/${story.slug}`}
            className="button button-ghost px-2.5 py-2 text-xs font-semibold text-[#8b91aa] hover:text-[#e9b65a]"
            title="Preview Public Page"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyFilterState({ filter }: { filter: StoryFilter }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#2b3049] bg-[#0c0e1d] p-8 text-center space-y-2">
      <p className="text-sm font-semibold text-[#b8bad0]">
        No {filter.toLowerCase()} stories found.
      </p>
      <Link href="/write/stories/new" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e9b65a] hover:underline">
        <span>Create a new story</span>
        <span>→</span>
      </Link>
    </div>
  );
}
