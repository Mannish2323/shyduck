"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home, BookOpen, Feather } from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

/* Floating stars background */
function FloatingStars() {
  const stars = Array.from({ length: 12 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 3,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    opacity: 0.2 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full bg-[#e9b65a]"
          style={{
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            '--star-duration': `${star.duration}s`,
            '--star-delay': `${star.delay}s`,
          } as React.CSSProperties}
        >
          <div
            className="float-star"
            style={{
              width: star.size,
              height: star.size,
              background: 'inherit',
              borderRadius: 'inherit',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-8 shell space-y-6 relative overflow-hidden">
      <FloatingStars />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-gradient-to-b from-[#e9b65a]/6 via-[#9b91e8]/4 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="float-bob">
          <ShyduckMascot mood="curious" size={96} />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/40 blur-md rounded-full pointer-events-none" />
      </motion.div>

      <motion.div
        className="space-y-3 max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Glitch 404 */}
        <div
          className="glitch-text text-7xl sm:text-8xl font-black font-serif text-[#e9b65a]/80 leading-none"
          data-text="404"
        >
          404
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e9b65a] block">
          Uncharted Boundary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7ef]">
          Lost in the Cosmic Void
        </h1>
        <p className="text-xs sm:text-sm text-[#8c91a8] leading-relaxed">
          The page, chapter, or story world you are seeking has slipped through the margins of the royal map.
        </p>
      </motion.div>

      {/* Recovery Actions */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/"
          className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/discover"
          className="button button-secondary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2"
        >
          <Compass className="w-3.5 h-3.5 text-[#e9b65a]" />
          <span>Discover Stories</span>
        </Link>

        <Link
          href="/write"
          className="button button-secondary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2"
        >
          <Feather className="w-3.5 h-3.5 text-sky-400" />
          <span>Open Writer Studio</span>
        </Link>
      </motion.div>
    </div>
  );
}
