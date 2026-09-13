import type { Story, User } from "@/lib/types";

export interface WriterDashboardData {
  stories: Story[];
  drafts: Story[];
  publishedStories: Story[];
  totalReads: number;
  totalChapters: number;
  hasAudienceData: boolean;
}

/**
 * The dashboard only receives stories owned by the active writer. Keeping this
 * selector outside the page makes the Supabase replacement a service concern,
 * not a UI rewrite.
 */
export function selectWriterDashboard(stories: Story[], user: User | null): WriterDashboardData {
  const ownedStories = user?.role === "writer"
    ? stories.filter((story) => story.author.username === user.username)
    : [];
  const drafts = ownedStories.filter((story) => story.status === "Draft");
  const publishedStories = ownedStories.filter((story) => story.status !== "Draft");
  const totalReads = ownedStories.reduce((sum, story) => sum + story.readsCount, 0);

  return {
    stories: ownedStories,
    drafts,
    publishedStories,
    totalReads,
    totalChapters: ownedStories.reduce((sum, story) => sum + story.chaptersCount, 0),
    hasAudienceData: totalReads > 0,
  };
}
