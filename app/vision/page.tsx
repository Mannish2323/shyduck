import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Palette, 
  Headphones, 
  Film, 
  BookOpen, 
  Feather, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export const metadata = {
  title: "Our Vision — Shyduck Tales",
  description: "Explore the future adaptation pipeline from written novels to comics, audio dramas, and animation."
};

export default function VisionPage() {
  return (
    <div className="w-full min-h-screen py-16 shell max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181a2e] border border-[#272b47] text-xs text-[#e9b65a]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Long-Term Horizon</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#fbf7ef] tracking-tight">
          Stories Today. <br />
          <span className="text-[#e9b65a] italic">Worlds Tomorrow.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9ea3b9] leading-relaxed">
          Every legendary animated franchise, comic universe, or cinematic epic began as words on a page. Shyduck Tales is building the incubation ground for India&apos;s next generation of intellectual property.
        </p>
      </div>

      {/* The 4-Stage Evolution Pipeline */}
      <div className="space-y-6">
        <h2 className="font-serif font-bold text-xl text-[#fbf7ef] text-center sm:text-left">
          The Adaptation Ladder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1 */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#272c45] bg-[#0e1022] space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#e9b65a] uppercase tracking-wider">
                Phase 01 • Active Beta
              </span>
              <BookOpen className="w-5 h-5 text-[#e9b65a]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Novels & Serialized Reading
            </h3>
            <p className="text-xs text-[#8c91a8] leading-relaxed">
              Writers publish chapters. Readers follow along with distraction-free reading, bookmarks, comments, and character wikis.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#272c45] bg-[#0e1022] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Phase 02 • Coming Next
              </span>
              <Palette className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Webtoons & Comics
            </h3>
            <p className="text-xs text-[#8c91a8] leading-relaxed">
              Pairing breakout novel writers with digital comic illustrators to adapt top web fiction into vertical scroll manhwa and graphic novels.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#272c45] bg-[#0e1022] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                Phase 03 • Future Vision
              </span>
              <Headphones className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Theatrical Audio Dramas
            </h3>
            <p className="text-xs text-[#8c91a8] leading-relaxed">
              Multi-cast voice acting, localized subcontinent dialects, and cinematic orchestral soundscapes transforming reading into an auditory theater.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#272c45] bg-[#0e1022] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                Phase 04 • Ultimate Horizon
              </span>
              <Film className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#fbf7ef]">
              Animation Pilots & Shorts
            </h3>
            <p className="text-xs text-[#8c91a8] leading-relaxed">
              Crowd-supported animated teaser shorts and pilot episodes bringing the most beloved serialized stories to streaming screens.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Commitment Banner */}
      <div className="p-8 rounded-3xl border border-[#242944] bg-[#111326] space-y-4 text-xs text-[#9fa5bd] leading-relaxed">
        <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Transparent Promise to Creators</span>
        </div>
        <p>
          We do not promise artificial overnight animation or hype-driven miracles. Real stories take patience, discipline, and loyal readers. Our goal is to build a rock-solid reading and publishing engine today so that tomorrow&apos;s adaptations stand on authentic storytelling foundations.
        </p>
        <div className="pt-2">
          <Link href="/support" className="text-xs font-semibold text-[#e9b65a] hover:underline">
            Read details about the Story Adaptation Support Program →
          </Link>
        </div>
      </div>
    </div>
  );
}
