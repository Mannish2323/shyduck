'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShyduck } from '@/lib/store';
import { AUTHORS } from '@/lib/mock-data';
import { Search, X, BookOpen, User, Tag, ArrowRight, CornerDownLeft } from 'lucide-react';

export function SearchModal() {
  const { isSearchOpen, closeSearch, stories } = useShyduck();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else {
          // Open handled by context
        }
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Filtered stories
  const matchingStories = q
    ? stories.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.genre.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  // Filtered authors
  const matchingAuthors = q
    ? AUTHORS.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.username.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q)
      )
    : [];

  // Unique tags
  const allTags = Array.from(new Set(stories.flatMap((s) => s.tags)));
  const matchingTags = q ? allTags.filter((t) => t.toLowerCase().includes(q)) : [];

  const hasResults = matchingStories.length > 0 || matchingAuthors.length > 0 || matchingTags.length > 0;

  const handleSelectStory = (slug: string) => {
    closeSearch();
    router.push(`/stories/${slug}`);
  };

  const handleSelectAuthor = (username: string) => {
    closeSearch();
    router.push(`/authors/${username}`);
  };

  const handleSelectTag = (tag: string) => {
    closeSearch();
    router.push(`/discover?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 20px 20px',
        backgroundColor: 'rgba(5, 6, 12, 0.85)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={closeSearch}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--line-strong)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          animation: 'fadeIn 0.15s ease-out'
        }}
      >
        {/* Search Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--line)'
          }}
        >
          <Search size={20} color="var(--gold)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stories, novelists, anime tags, worlds... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-main)',
              fontFamily: 'inherit'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)', padding: '4px' }}
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: '0.72rem',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid var(--line)',
              color: 'var(--text-subtle)',
              fontFamily: 'monospace'
            }}
          >
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {!q ? (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Popular Searches & Tags
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {['Cartography', 'Time Travel', 'Mughal Tech', 'Vedic Myth', 'Cozy Sci-Fi', 'Sky Dragons'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectTag(tag)}
                    className="badge badge-gold"
                    style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Tag size={12} /> {tag}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Trending Story Worlds
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stories.slice(0, 3).map((story) => (
                  <div
                    key={story.slug}
                    onClick={() => handleSelectStory(story.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid var(--line)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <BookOpen size={16} color="var(--gold)" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{story.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{story.genre} • by {story.author.name}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} color="var(--text-subtle)" />
                  </div>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🦆</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                We couldn&apos;t find that world yet.
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
                Try searching for broader keywords like &quot;Fantasy&quot;, &quot;Dragon&quot;, &quot;Bengaluru&quot;, or browse our full collection on Discover.
              </p>
              <Link
                href="/discover"
                onClick={closeSearch}
                className="btn btn-primary btn-sm"
              >
                Browse All Worlds ↗
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Stories Result Section */}
              {matchingStories.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Stories ({matchingStories.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingStories.map((story) => (
                      <div
                        key={story.slug}
                        onClick={() => handleSelectStory(story.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--line)'
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{story.title}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                            by {story.author.name} • {story.genre}
                          </span>
                        </div>
                        <CornerDownLeft size={13} color="var(--gold)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Authors Result Section */}
              {matchingAuthors.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Novelists & Creators ({matchingAuthors.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingAuthors.map((author) => (
                      <div
                        key={author.username}
                        onClick={() => handleSelectAuthor(author.username)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--line)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <User size={15} color="var(--lavender)" />
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{author.name}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>@{author.username}</span>
                        </div>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {author.followersCount.toLocaleString()} followers
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags Result Section */}
              {matchingTags.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Tags
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {matchingTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSelectTag(tag)}
                        className="badge badge-gold"
                        style={{ cursor: 'pointer', padding: '6px 12px' }}
                      >
                        <Tag size={12} /> {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
