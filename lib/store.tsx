'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  Story,
  Chapter,
  Comment,
  ReadingProgress,
  ReadingList,
  NotificationItem,
  ReaderSettings,
  ToastMessage
} from './types';
import { STORIES, CHAPTERS, COMMENTS, NOTIFICATIONS } from './mock-data';

interface ShyduckContextType {
  user: User | null;
  loginAs: (role: 'reader' | 'writer' | 'admin') => void;
  logout: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Bookmarks
  bookmarks: string[];
  toggleBookmark: (storySlug: string) => void;
  isBookmarked: (storySlug: string) => boolean;

  // Following Authors
  followingAuthors: string[];
  toggleFollow: (authorUsername: string) => void;
  isFollowing: (authorUsername: string) => boolean;

  // Reading Progress
  readingProgress: Record<string, ReadingProgress>;
  saveReadingProgress: (storySlug: string, chapterSlug: string, chapterNumber: number, percentage: number) => void;

  // Reading Lists
  readingLists: ReadingList[];
  createReadingList: (name: string, description: string, isPrivate?: boolean) => void;
  addStoryToList: (listId: string, storySlug: string) => void;
  removeStoryFromList: (listId: string, storySlug: string) => void;

  // Stories & Chapters
  stories: Story[];
  createStory: (story: Partial<Story>) => Story;
  getStoryBySlug: (slug: string) => Story | undefined;
  getChaptersByStorySlug: (slug: string) => Chapter[];
  addChapter: (storySlug: string, chapter: Partial<Chapter>) => Chapter;

  // Comments & Discussions
  comments: Comment[];
  addComment: (targetType: 'story' | 'chapter' | 'discussion', targetId: string, content: string, isSpoiler: boolean) => void;
  addReply: (commentId: string, content: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Reader Settings
  readerSettings: ReaderSettings;
  updateReaderSettings: (settings: Partial<ReaderSettings>) => void;

  // Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_USER: User = {
  id: 'usr-manish-23',
  name: 'Manish Kumar',
  username: 'manish_writer',
  email: 'manish@shyduck.io',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  role: 'writer',
  bio: 'Storyteller exploring cosmic myths and subcontinent speculative fiction. Creator at Shyduck Tales.',
  joinedDate: 'Joined September 2025',
  preferredGenres: ['Fantasy', 'Sci-Fi', 'Mystery']
};

const DEFAULT_READER_SETTINGS: ReaderSettings = {
  fontSize: 18,
  fontFamily: 'serif',
  lineHeight: 1.8,
  maxWidth: 'prose',
  theme: 'dark'
};

const ShyduckContext = createContext<ShyduckContextType | undefined>(undefined);

export function ShyduckProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [bookmarks, setBookmarks] = useState<string[]>(['the-last-dragon', 'echoes-of-aether']);
  const [followingAuthors, setFollowingAuthors] = useState<string[]>(['mirasen']);
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>({
    'the-last-dragon': {
      storySlug: 'the-last-dragon',
      chapterSlug: 'chapter-01-the-shifting-vellum',
      chapterNumber: 1,
      percentage: 65,
      lastReadAt: '1 hour ago'
    }
  });
  const [readingLists, setReadingLists] = useState<ReadingList[]>([
    {
      id: 'list-1',
      name: 'Weekend Monsoon Reads',
      description: 'Stories with rain, deep lore, and cozy worldbuilding.',
      storySlugs: ['the-last-dragon', 'echoes-of-aether', 'the-clockwork-city'],
      isPrivate: false,
      createdAt: '2026-08-15'
    }
  ]);
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [chapters, setChapters] = useState<Record<string, Chapter[]>>(CHAPTERS);
  const [comments, setComments] = useState<Comment[]>(COMMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(DEFAULT_READER_SETTINGS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedTheme = localStorage.getItem('shyduck_theme') as 'dark' | 'light' | null;
      if (savedTheme) setTheme(savedTheme);

      const savedBookmarks = localStorage.getItem('shyduck_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedFollows = localStorage.getItem('shyduck_follows');
      if (savedFollows) setFollowingAuthors(JSON.parse(savedFollows));

      const savedProgress = localStorage.getItem('shyduck_progress');
      if (savedProgress) setReadingProgress(JSON.parse(savedProgress));

      const savedLists = localStorage.getItem('shyduck_lists');
      if (savedLists) setReadingLists(JSON.parse(savedLists));

      const savedReader = localStorage.getItem('shyduck_reader_settings');
      if (savedReader) setReaderSettings(JSON.parse(savedReader));
    } catch {
      // Ignore localStorage errors in restricted environments
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('shyduck_theme', theme);
      localStorage.setItem('shyduck_bookmarks', JSON.stringify(bookmarks));
      localStorage.setItem('shyduck_follows', JSON.stringify(followingAuthors));
      localStorage.setItem('shyduck_progress', JSON.stringify(readingProgress));
      localStorage.setItem('shyduck_lists', JSON.stringify(readingLists));
      localStorage.setItem('shyduck_reader_settings', JSON.stringify(readerSettings));
      document.documentElement.setAttribute('data-theme', theme);
    } catch {
      // Ignore
    }
  }, [isMounted, theme, bookmarks, followingAuthors, readingProgress, readingLists, readerSettings]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    addToast(`Switched to ${next === 'dark' ? 'Midnight Dark' : 'Daylight'} mode`);
  };

  const loginAs = (role: 'reader' | 'writer' | 'admin') => {
    setUser({
      ...DEFAULT_USER,
      role,
      name: role === 'admin' ? 'Admin Console' : DEFAULT_USER.name
    });
    addToast(`Logged in as ${role.toUpperCase()}`, 'Welcome to Shyduck Tales!');
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out', 'You are now viewing as guest');
  };

  const toggleBookmark = (storySlug: string) => {
    const targetStory = stories.find((s) => s.slug === storySlug);
    const storyTitle = targetStory?.title || 'Story';

    if (bookmarks.includes(storySlug)) {
      setBookmarks((prev) => prev.filter((s) => s !== storySlug));
      addToast('Bookmark removed', `Removed ${storyTitle} from your library`);
    } else {
      setBookmarks((prev) => [...prev, storySlug]);
      addToast('Story bookmarked! 🔖', `Saved ${storyTitle} to your library`);
    }
  };

  const isBookmarked = (storySlug: string) => bookmarks.includes(storySlug);

  const toggleFollow = (authorUsername: string) => {
    if (followingAuthors.includes(authorUsername)) {
      setFollowingAuthors((prev) => prev.filter((u) => u !== authorUsername));
      addToast('Unfollowed', `You unfollowed @${authorUsername}`);
    } else {
      setFollowingAuthors((prev) => [...prev, authorUsername]);
      addToast('Author Followed! ✨', `You will now receive updates from @${authorUsername}`);
    }
  };

  const isFollowing = (authorUsername: string) => followingAuthors.includes(authorUsername);

  const saveReadingProgress = (storySlug: string, chapterSlug: string, chapterNumber: number, percentage: number) => {
    setReadingProgress((prev) => ({
      ...prev,
      [storySlug]: {
        storySlug,
        chapterSlug,
        chapterNumber,
        percentage: Math.min(100, Math.max(0, Math.round(percentage))),
        lastReadAt: 'Just now'
      }
    }));
  };

  const createReadingList = (name: string, description: string, isPrivate = false) => {
    const newList: ReadingList = {
      id: `list-${Date.now()}`,
      name,
      description,
      storySlugs: [],
      isPrivate,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReadingLists((prev) => [...prev, newList]);
    addToast('Reading list created! 📚', `"${name}" added to your Library`);
  };

  const addStoryToList = (listId: string, storySlug: string) => {
    setReadingLists((prev) =>
      prev.map((list) => {
        if (list.id === listId && !list.storySlugs.includes(storySlug)) {
          return { ...list, storySlugs: [...list.storySlugs, storySlug] };
        }
        return list;
      })
    );
    addToast('Added to list', 'Story added to your custom reading list');
  };

  const removeStoryFromList = (listId: string, storySlug: string) => {
    setReadingLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          return { ...list, storySlugs: list.storySlugs.filter((s) => s !== storySlug) };
        }
        return list;
      })
    );
    addToast('Removed from list', 'Story removed from list');
  };

  const createStory = (storyData: Partial<Story>): Story => {
    const slug = (storyData.title || 'untitled-world')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newStory: Story = {
      id: `story-${Date.now()}`,
      slug,
      title: storyData.title || 'Untitled World',
      subtitle: storyData.subtitle || 'A new tale in progress',
      author: {
        username: user?.username || 'anonymous',
        name: user?.name || 'Anonymous Author',
        avatar: user?.avatar || DEFAULT_USER.avatar
      },
      genre: storyData.genre || 'Fantasy',
      tags: storyData.tags || ['Original', 'New Release'],
      status: storyData.status || 'Ongoing',
      description: storyData.description || 'No synopsis provided yet.',
      coverStyle: storyData.coverStyle || 'ember',
      language: storyData.language || 'English',
      chaptersCount: 0,
      readsCount: 0,
      rating: 5.0,
      wordCount: 0,
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: 'Just now'
    };

    setStories((prev) => [newStory, ...prev]);
    addToast('Story created! 🎉', `"${newStory.title}" is ready for your first chapter.`);
    return newStory;
  };

  const getStoryBySlug = (slug: string) => stories.find((s) => s.slug === slug);

  const getChaptersByStorySlug = (slug: string): Chapter[] => {
    return chapters[slug] || [];
  };

  const addChapter = (storySlug: string, chapterData: Partial<Chapter>): Chapter => {
    const currentList = chapters[storySlug] || [];
    const chapterNumber = currentList.length + 1;
    const slug = `chapter-${chapterNumber < 10 ? '0' : ''}${chapterNumber}-${(chapterData.title || 'chapter')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}`;

    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      storySlug,
      chapterNumber,
      slug,
      title: chapterData.title || `Chapter ${chapterNumber}`,
      content: chapterData.content || '',
      wordCount: (chapterData.content || '').trim().split(/\s+/).filter(Boolean).length,
      readTimeMin: Math.max(1, Math.ceil((chapterData.content || '').trim().split(/\s+/).filter(Boolean).length / 250)),
      publishedAt: new Date().toISOString().split('T')[0],
      status: chapterData.status || 'Published',
      authorNote: chapterData.authorNote
    };

    setChapters((prev) => ({
      ...prev,
      [storySlug]: [...(prev[storySlug] || []), newChapter]
    }));

    // Update story chapter count
    setStories((prev) =>
      prev.map((s) => (s.slug === storySlug ? { ...s, chaptersCount: s.chaptersCount + 1, updatedAt: 'Just now' } : s))
    );

    addToast('Chapter published! 🚀', `"${newChapter.title}" is now available to readers.`);
    return newChapter;
  };

  const addComment = (targetType: 'story' | 'chapter' | 'discussion', targetId: string, content: string, isSpoiler: boolean) => {
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      targetType,
      targetId,
      author: {
        username: user?.username || 'reader_guest',
        name: user?.name || 'Curious Reader',
        avatar: user?.avatar || DEFAULT_USER.avatar
      },
      content,
      isSpoiler,
      likesCount: 0,
      createdAt: 'Just now'
    };

    setComments((prev) => [newComment, ...prev]);
    addToast('Comment posted! 💬', isSpoiler ? 'Marked with spoiler protection' : 'Thanks for sharing your thoughts!');
  };

  const addReply = (commentId: string, content: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const newReply = {
            id: `rep-${Date.now()}`,
            commentId,
            author: {
              username: user?.username || 'reader_guest',
              name: user?.name || 'Curious Reader',
              avatar: user?.avatar || DEFAULT_USER.avatar
            },
            content,
            likesCount: 0,
            createdAt: 'Just now'
          };
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        return c;
      })
    );
    addToast('Reply posted! ↩️');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('All caught up! 🔔', 'All notifications marked as read.');
  };

  const updateReaderSettings = (settings: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => ({ ...prev, ...settings }));
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <ShyduckContext.Provider
      value={{
        user,
        loginAs,
        logout,
        theme,
        toggleTheme,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        followingAuthors,
        toggleFollow,
        isFollowing,
        readingProgress,
        saveReadingProgress,
        readingLists,
        createReadingList,
        addStoryToList,
        removeStoryFromList,
        stories,
        createStory,
        getStoryBySlug,
        getChaptersByStorySlug,
        addChapter,
        comments,
        addComment,
        addReply,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        readerSettings,
        updateReaderSettings,
        isSearchOpen,
        openSearch,
        closeSearch,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShyduckContext.Provider>
  );
}

export function useShyduck() {
  const context = useContext(ShyduckContext);
  if (!context) {
    throw new Error('useShyduck must be used within a ShyduckProvider');
  }
  return context;
}
