export type UserRole = 'reader' | 'writer' | 'admin';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio: string;
  joinedDate: string;
  preferredGenres: string[];
  followersCount?: number;
}

export interface AuthorSummary {
  username: string;
  name: string;
  avatar: string;
}

export interface Character {
  id: string;
  name: string;
  role: 'Protagonist' | 'Antagonist' | 'Supporting' | 'Deuteragonist' | 'Mentor' | 'Ally' | string;
  avatarColor: string;
  description: string;
  abilities: string[];
  relationships?: string;
}

export interface WorldLore {
  locations: { name: string; type: string; description: string }[];
  factions: { name: string; motive: string; description: string }[];
  loreItems: { title: string; category: string; description: string }[];
  timeline: { era: string; event: string; description: string }[];
}

export type CoverStyle = 'ember' | 'aether' | 'city' | 'lotus' | 'cosmic' | 'shadow' | 'monk' | 'forest';

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: AuthorSummary;
  authorName?: string;
  genre: string;
  tags: string[];
  status: 'Ongoing' | 'Completed' | 'Hiatus' | 'Draft';
  description: string;
  coverStyle: CoverStyle;
  coverUrl?: string;
  language: string;
  chaptersCount: number;
  readsCount: number;
  rating: number;
  wordCount: number;
  publishedAt: string;
  updatedAt: string;
  createdAt?: string;
  featured?: boolean;
  isFeatured?: boolean;
  characters?: Character[];
  world?: WorldLore;
}

export interface Chapter {
  id: string;
  storySlug: string;
  chapterNumber: number;
  slug: string;
  title: string;
  content: string;
  wordCount: number;
  readTimeMin: number;
  readingTimeMinutes?: number;
  publishedAt: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  authorNote?: string;
}

export interface Author {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  storiesCount: number;
  completedCount: number;
  ongoingCount: number;
  popularStorySlug: string;
}

export interface CommentReply {
  id: string;
  commentId: string;
  author: AuthorSummary;
  content: string;
  likesCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  targetType: 'story' | 'chapter' | 'discussion';
  targetId: string;
  author: AuthorSummary;
  authorName?: string;
  authorAvatar?: string;
  content: string;
  isSpoiler: boolean;
  likesCount: number;
  createdAt: string;
  replies?: CommentReply[];
}

export interface Discussion {
  id: string;
  title: string;
  category: 'Theories' | 'Character Debates' | 'Worldbuilding' | 'Writing Advice' | 'General' | string;
  author: AuthorSummary;
  content: string;
  repliesCount: number;
  likesCount: number;
  lastActivity: string;
  tags: string[];
}

export interface ReadingProgress {
  storySlug: string;
  chapterSlug: string;
  chapterNumber: number;
  percentage: number;
  lastReadAt: string;
}

export interface ReadingList {
  id: string;
  name: string;
  description: string;
  storySlugs: string[];
  isPrivate: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'chapter' | 'follower' | 'reply' | 'milestone' | 'system';
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  read?: boolean;
  createdAt: string;
}

export interface WriterAnalytics {
  totalReads: number;
  uniqueReaders: number;
  totalFollowers: number;
  bookmarksCount: number;
  commentsCount: number;
  avgCompletionRate: number;
  completionRate?: number;
  dailyReads: { date: string; reads: number }[];
  chapterPerformance: { chapter: string; views: number; completion: number }[];
  readsOverTime?: { date: string; reads: number }[];
  chapterDropoff?: { chapterNumber: number; views: number }[];
}

export interface AdminMedia {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  owner: string;
  usedInStories: string[];
  uploadedAt: string;
  previewColor: string;
  previewUrl?: string;
  size?: string;
  type?: string;
  usedByStoriesCount?: number;
}

export interface AdminReport {
  id: string;
  targetType: 'story' | 'comment' | 'user';
  targetId: string;
  targetTitle: string;
  reporter: string;
  reporterUsername?: string;
  reason: string;
  contentSnippet: string;
  status: 'Pending' | 'Reviewing' | 'Resolved' | 'Dismissed';
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  admin: string;
  adminName?: string;
  action: string;
  target: string;
  beforeValue?: string;
  beforeState?: string;
  afterValue?: string;
  afterState?: string;
  timestamp: string;
}

export type ReaderTheme = 'dark' | 'light' | 'sepia';
export type ReaderFont = 'serif' | 'sans' | 'mono';
export type ReaderWidth = 'prose' | 'wide' | 'compact';

export interface ReaderSettings {
  fontSize: number;
  fontFamily: ReaderFont;
  lineHeight: number;
  maxWidth: ReaderWidth;
  theme: ReaderTheme;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
