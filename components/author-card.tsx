'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Author } from '@/lib/types';
import { useShyduck } from '@/lib/store';
import { UserCheck, UserPlus, BookOpen } from 'lucide-react';

export function AuthorCard({ author }: { author: Author }) {
  const { isFollowing, toggleFollow } = useShyduck();
  const following = isFollowing(author.username);
  const [justFollowed, setJustFollowed] = useState(false);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow(author.username);
    if (!following) {
      setJustFollowed(true);
      setTimeout(() => setJustFollowed(false), 400);
    }
  };

  return (
    <Link
      href={`/authors/${author.username}`}
      className="card-panel card-panel-hover group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e9b65a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]" />

      <div className="relative z-10">
        <img
          src={author.avatar}
          alt={author.name}
          className="avatar-ring-hover"
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--gold-border)',
            marginBottom: '14px',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>

      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 2px 0', position: 'relative', zIndex: 1 }}>{author.name}</h4>
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

      <motion.button
        onClick={handleFollowClick}
        className={`btn btn-sm ${following ? 'btn-outline' : 'btn-primary'}`}
        style={{ width: '100%', position: 'relative', zIndex: 1 }}
        whileTap={{ scale: 0.95 }}
        animate={justFollowed ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
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
      </motion.button>
    </Link>
  );
}
