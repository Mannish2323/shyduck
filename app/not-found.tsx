import React from "react";
import Link from "next/link";
import { Compass, Home, BookOpen, Feather } from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-8 shell space-y-6">
      <div className="relative">
        <ShyduckMascot mood="curious" size={96} />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/40 blur-md rounded-full pointer-events-none" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e9b65a]">
          Error 404 • Uncharted Boundary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7ef]">
          Lost in the Cosmic Void
        </h1>
        <p className="text-xs sm:text-sm text-[#8c91a8] leading-relaxed">
          The page, chapter, or story world you are seeking has slipped through the margins of the royal map.
        </p>
      </div>

      {/* Recovery Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
      </div>
    </div>
  );
}
