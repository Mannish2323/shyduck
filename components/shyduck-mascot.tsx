'use client';

import React from 'react';

interface ShyduckMascotProps {
  size?: number;
  className?: string;
  mood?: 'curious' | 'reading' | 'writing' | 'sleepy' | 'starry' | 'creative' | 'peaceful';
}

export function ShyduckMascot({ size = 48, className = '', mood = 'curious' }: ShyduckMascotProps) {
  const uniqueId = React.useId();

  return (
    <div
      className={`inline-flex items-center justify-center relative select-none group/mascot ${className}`}
      style={{ width: size, height: size }}
      aria-label="Shyduck Mascot"
    >
      {/* Sparkle particles on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/mascot:opacity-100 transition-opacity duration-500">
        {[
          { top: '-8%', left: '10%', delay: '0s', size: 3 },
          { top: '5%', right: '-5%', delay: '0.3s', size: 4 },
          { bottom: '10%', right: '0%', delay: '0.6s', size: 3 },
          { top: '-5%', right: '20%', delay: '0.9s', size: 2 },
        ].map((spark, i) => (
          <span
            key={i}
            className="absolute sparkle-anim"
            style={{
              ...spark,
              width: spark.size,
              height: spark.size,
              borderRadius: '50%',
              background: '#e9b65a',
              animationDelay: spark.delay,
              boxShadow: '0 0 4px #e9b65a',
            }}
          />
        ))}
      </div>

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover/mascot:scale-110"
      >
        <defs>
          {/* Golden Body Gradient */}
          <linearGradient id={`duckGold-${uniqueId}`} x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde074" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Cozy Cheeks */}
          <radialGradient id={`duckBlush-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>

          {/* Beak Gradient */}
          <linearGradient id={`duckBeak-${uniqueId}`} x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Midnight Cap / Hood for writer vibe */}
          <linearGradient id={`duckHood-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="50" cy="50" r="42" fill="#eab308" opacity="0.12" filter="blur(6px)" />

        {/* Body */}
        <ellipse cx="50" cy="54" rx="34" ry="30" fill={`url(#duckGold-${uniqueId})`} />

        {/* Shy Wing */}
        <path
          d="M26 50 C26 62, 38 72, 48 70 C40 68, 30 62, 30 52 Z"
          fill="#ca8a04"
          opacity="0.8"
        />

        {/* Head */}
        <circle cx="50" cy="38" r="24" fill={`url(#duckGold-${uniqueId})`} />

        {/* Cute Little Writer Feather / Cowlick */}
        <path
          d="M50 14 C48 8, 44 4, 38 6 C42 10, 45 13, 48 18 Z"
          fill="#eab308"
        />

        {/* Shy Blushing Cheeks */}
        <circle cx="34" cy="44" r="6" fill={`url(#duckBlush-${uniqueId})`} />
        <circle cx="66" cy="44" r="6" fill={`url(#duckBlush-${uniqueId})`} />

        {/* Eyes based on mood */}
        {mood === 'sleepy' ? (
          <>
            <path d="M34 38 Q38 42 42 38" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M58 38 Q62 42 66 38" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : mood === 'starry' ? (
          <>
            <text x="33" y="42" fontSize="11" fill="#fff3c8" fontWeight="bold">✦</text>
            <text x="59" y="42" fontSize="11" fill="#fff3c8" fontWeight="bold">✦</text>
          </>
        ) : (
          <>
            {/* Sparkly Curious Eyes */}
            <ellipse cx="38" cy="37" rx="3.5" ry="4.5" fill="#18181b" />
            <circle cx="36.5" cy="35.5" r="1.5" fill="#ffffff" />
            <ellipse cx="62" cy="37" rx="3.5" ry="4.5" fill="#18181b" />
            <circle cx="60.5" cy="35.5" r="1.5" fill="#ffffff" />
          </>
        )}

        {/* Cute Rounded Beak */}
        <ellipse cx="50" cy="45" rx="7.5" ry="4.5" fill={`url(#duckBeak-${uniqueId})`} />

        {/* Star Sparkle near wing */}
        <path
          d="M74 30 L76 34 L80 36 L76 38 L74 42 L72 38 L68 36 L72 34 Z"
          fill="#fef08a"
          opacity="0.85"
          className="sparkle-anim"
        />
      </svg>
    </div>
  );
}
