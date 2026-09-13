import { useMemo } from "react";
import type { Story, User } from "@/lib/types";
import { useShyduck } from "@/lib/store";

export interface WriterDashboardData {
  user: User | null;
  stories: Story[];
  drafts: Story[];
  publishedStories: Story[];
  totalReads: number;
  totalChapters: number;
  totalFollowers: number;
  hasAudienceData: boolean;
  isEmpty: boolean;
  hasDrafts: boolean;
  hasPublished: boolean;
}

/**
 * Service function: filters only the stories authentically created by the signed-in writer.
 * Never mixes public library demo stories into the writer's personal workspace.
 */
export function selectWriterDashboard(stories: Story[], user: User | null): WriterDashboardData {
  const ownedStories = user?.role === "writer"
    ? stories.filter((story) => story.author.username === user.username)
    : [];

  const drafts = ownedStories.filter((story) => story.status === "Draft");
  const publishedStories = ownedStories.filter((story) => story.status !== "Draft");
  const totalReads = ownedStories.reduce((sum, story) => sum + (story.readsCount || 0), 0);
  const totalChapters = ownedStories.reduce((sum, story) => sum + (story.chaptersCount || 0), 0);
  const totalFollowers = user?.followersCount || 0;

  return {
    user,
    stories: ownedStories,
    drafts,
    publishedStories,
    totalReads,
    totalChapters,
    totalFollowers,
    hasAudienceData: totalReads > 0,
    isEmpty: ownedStories.length === 0,
    hasDrafts: drafts.length > 0,
    hasPublished: publishedStories.length > 0,
  };
}

/**
 * Clean hook for writer components.
 * Consumes the global store and returns cleanly scoped, real user studio state.
 */
export function useWriterDashboard(): WriterDashboardData {
  const { user, stories } = useShyduck();
  return useMemo(() => selectWriterDashboard(stories, user), [stories, user]);
}
