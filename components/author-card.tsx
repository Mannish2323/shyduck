'use client';

import React from 'react';
import Link from 'next/link';
import { Author } from '@/lib/types';
import { useShyduck } from '@/lib/store';
import { UserCheck, UserPlus, BookOpen } from 'lucide-react';

export function AuthorCard({ author }: { author: Author }) {
  const { isFollowing, toggleFollow } = useShyduck();
  const following = isFollowing(author.username);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow(author.username);
  };

  return (
    <Link
      href={`/authors/${author.username}`}
      className="card-panel card-panel-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '24px 20px',
        position: 'relative'
      }}
    >
      <img
        src={author.avatar}
        alt={author.name}
        style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid var(--gold-border)',
          marginBottom: '14px'
        }}
      />

      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 2px 0' }}>{author.name}</h4>
      <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '10px' }}>
        @{author.username}
      </span>

      <p
        style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.45,
          margin: '0 0 16px 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {author.bio}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.76rem',
          color: 'var(--text-subtle)',
          marginBottom: '18px'
        }}
      >
        <span>
          <strong style={{ color: 'var(--text-main)' }}>
            {(author.followersCount + (following ? 1 : 0)).toLocaleString()}
          </strong>{' '}
          Followers
        </span>
        <span>•</span>
        <span>
          <strong style={{ color: 'var(--text-main)' }}>{author.storiesCount}</strong> Stories
        </span>
      </div>

      <button
        onClick={handleFollowClick}
        className={`btn btn-sm ${following ? 'btn-outline' : 'btn-primary'}`}
        style={{ width: '100%' }}
      >
        {following ? (
          <>
            <UserCheck size={14} /> Following
          </>
        ) : (
          <>
            <UserPlus size={14} /> Follow
          </>
        )}
      </button>
    </Link>
  );
}
