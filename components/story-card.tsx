'use client';

import React from 'react';
import Link from 'next/link';
import { Story } from '@/lib/types';
import { useShyduck } from '@/lib/store';
import { Bookmark, Star, BookOpen, Eye } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  variant?: 'standard' | 'featured' | 'trending' | 'compact' | 'horizontal';
  rank?: number;
}

export function StoryCard({ story, variant = 'standard', rank }: StoryCardProps) {
  const { isBookmarked, toggleBookmark } = useShyduck();
  const bookmarked = isBookmarked(story.slug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(story.slug);
  };

  // Trending Ranked Card (1 to 5)
  if (variant === 'trending') {
    return (
      <Link
        href={`/stories/${story.slug}`}
        className="card-panel card-panel-hover"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '16px 20px',
          position: 'relative'
        }}
      >
        {rank !== undefined && (
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1,
              color: rank === 1 ? 'var(--gold)' : rank === 2 ? '#c0c0c0' : rank === 3 ? '#cd7f32' : 'var(--text-subtle)',
              minWidth: '36px',
              textAlign: 'center'
            }}
          >
            {rank}
          </div>
        )}

        {/* Mini Cover Art */}
        <div
          className={`cover-${story.coverStyle}`}
          style={{
            width: '64px',
            height: '84px',
            borderRadius: '8px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <span style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.9, lineHeight: 1.1 }}>
            {story.title.split(' ')[0]}
          </span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
              {story.genre}
            </span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.75rem' }}>•</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              {story.chaptersCount} chapters
            </span>
          </div>

          <h4
            style={{
              fontSize: '1.02rem',
              fontWeight: 700,
              margin: '0 0 4px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {story.title}
          </h4>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>by {story.author.name}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: 'var(--gold)' }}>
              <Star size={12} fill="currentColor" /> {story.rating}
            </span>
          </div>
        </div>

        {/* Bookmark Trigger */}
        <button
          onClick={handleBookmarkClick}
          className="btn-icon"
          style={{
            color: bookmarked ? 'var(--gold)' : 'var(--text-subtle)',
            backgroundColor: bookmarked ? 'var(--gold-subtle)' : 'transparent',
            borderColor: bookmarked ? 'var(--gold-border)' : 'var(--line)'
          }}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
        >
          <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </Link>
    );
  }

  // Large Featured Hero Card
  if (variant === 'featured') {
    return (
      <div
        className="card-panel card-panel-hover"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: '36px',
          padding: '32px',
          background: 'linear-gradient(145deg, rgba(23, 24, 39, 0.95), rgba(16, 17, 30, 0.95))',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Link href={`/stories/${story.slug}`}>
          <div
            className={`cover-${story.coverStyle}`}
            style={{
              height: '380px',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <span className="badge badge-gold" style={{ position: 'absolute', top: '20px', left: '20px' }}>
              ★ Editor’s Choice
            </span>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.2rem',
                lineHeight: 1.05,
                fontWeight: 700,
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              {story.title}
            </div>
          </div>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">{story.genre}</span>
            <span className="badge">{story.status}</span>
            <span className="badge" style={{ color: 'var(--gold)' }}>
              <Star size={13} fill="currentColor" /> {story.rating}
            </span>
            <span className="badge">
              <Eye size={13} /> {(story.readsCount / 1000).toFixed(1)}k reads
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              lineHeight: 1.15,
              marginBottom: '12px'
            }}
          >
            <Link href={`/stories/${story.slug}`}>{story.title}</Link>
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.65, margin: '0 0 20px 0' }}>
            {story.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <img
              src={story.author.avatar}
              alt={story.author.name}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <Link href={`/authors/${story.author.username}`} style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {story.author.name}
              </Link>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                Updated {story.updatedAt} • {story.chaptersCount} chapters
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href={`/stories/${story.slug}`} className="btn btn-primary">
              <BookOpen size={16} /> Start Reading
            </Link>
            <button
              onClick={handleBookmarkClick}
              className={`btn ${bookmarked ? 'btn-outline' : 'btn-secondary'}`}
            >
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Story Card (Default)
  return (
    <div className="card-panel card-panel-hover" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Link href={`/stories/${story.slug}`} style={{ position: 'relative', display: 'block' }}>
        <div
          className={`cover-${story.coverStyle}`}
          style={{
            height: '210px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.72rem', backdropFilter: 'blur(4px)' }}>
              {story.genre}
            </span>
            <button
              onClick={handleBookmarkClick}
              className="btn-icon"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(10, 11, 20, 0.65)',
                color: bookmarked ? 'var(--gold)' : '#ffffff',
                borderColor: bookmarked ? 'var(--gold)' : 'rgba(255,255,255,0.2)'
              }}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.45rem',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)'
            }}
          >
            {story.title}
          </div>
        </div>
      </Link>

      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Link
              href={`/authors/${story.author.username}`}
              style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}
            >
              by {story.author.name}
            </Link>
            <span style={{ fontSize: '0.78rem', color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Star size={12} fill="currentColor" /> {story.rating}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              margin: '0 0 16px 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {story.description}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--line)',
            fontSize: '0.76rem',
            color: 'var(--text-subtle)'
          }}
        >
          <span>{story.chaptersCount} chapters</span>
          <span>{(story.readsCount / 1000).toFixed(1)}k reads</span>
        </div>
      </div>
    </div>
  );
}
