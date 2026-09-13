import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Palette, 
  Headphones, 
  Film, 
  Heart, 
  ArrowRight, 
  CheckCircle2,
  Clock
} from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export const metadata = {
  title: "Story Adaptation Program — Shyduck Tales",
  description: "Learn how serialized Indian web fiction unlocks community-supported adaptations into comics, audio dramas, and animation."
};

export default function SupportAdaptationPage() {
  return (
    <div className="w-full min-h-screen py-16 shell max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181a2e] border border-[#272b47] text-xs text-[#e9b65a]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Future Vision • Coming Soon</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#fbf7ef] tracking-tight leading-tight">
          Help Bring <br />
          <span className="text-[#e9b65a] italic">Stories to Life.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9ea3b9] leading-relaxed">
          The Shyduck Adaptation Program will connect breakout serialized novels with passionate digital artists, voice actors, and animation studios.
        </p>
      </div>

      {/* The Adaptation Flow Concept (Section 61) */}
      <div className="p-8 sm:p-10 rounded-3xl border border-[#252a44] bg-[#0e1022] space-y-8">
        <div className="text-center space-y-1">
          <h2 className="font-serif font-bold text-xl text-[#fbf7ef]">
            The Journey from Sentence to Screen
          </h2>
          <p className="text-xs text-[#8c91a8]">
            A community-powered incubator for Indian storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-[#141628] border border-[#23273e] space-y-1">
            <span className="text-xs font-mono font-bold text-[#e9b65a]">01. Story</span>
            <p className="text-[11px] text-[#8c91a8]">Author publishes compelling serialized chapters.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141628] border border-[#23273e] space-y-1">
            <span className="text-xs font-mono font-bold text-sky-400">02. Readers</span>
            <p className="text-[11px] text-[#8c91a8]">Audience reads, bookmarks, and shares theories.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141628] border border-[#23273e] space-y-1">
            <span className="text-xs font-mono font-bold text-purple-400">03. Community</span>
            <p className="text-[11px] text-[#8c91a8]">Fandom rallies behind characters and world lore.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141628] border border-[#23273e] space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400">04. Support</span>
            <p className="text-[11px] text-[#8c91a8]">Readers pledge support to fund adaptation pools.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141628] border border-[#23273e] space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400">05. Adaptation</span>
            <p className="text-[11px] text-[#8c91a8]">Comic, audio drama, or motion comic is produced.</p>
          </div>
        </div>
      </div>

      {/* Adaptation Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0d0f1e] space-y-3">
          <div className="p-3 rounded-2xl bg-[#181a2e] text-[#e9b65a] w-fit">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#fbf7ef]">
            Webtoons & Manga
          </h3>
          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Full-color vertical scrolling webtoons designed for mobile reading, produced in collaboration with professional illustrators.
          </p>
          <span className="text-[10px] text-[#e9b65a] font-semibold block pt-1">
            In Pipeline • 2026/2027
          </span>
        </div>

        <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0d0f1e] space-y-3">
          <div className="p-3 rounded-2xl bg-[#181a2e] text-indigo-400 w-fit">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#fbf7ef]">
            Theatrical Audio Dramas
          </h3>
          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Immersive soundscapes with full voice casts, ambient subcontinent field recordings, and bespoke orchestral themes.
          </p>
          <span className="text-[10px] text-indigo-400 font-semibold block pt-1">
            In Conceptualization
          </span>
        </div>

        <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0d0f1e] space-y-3">
          <div className="p-3 rounded-2xl bg-[#181a2e] text-rose-400 w-fit">
            <Film className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#fbf7ef]">
            Motion Comic Pilots
          </h3>
          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Dynamic comic panel animation with camera parallax and atmospheric SFX, acting as proof-of-concept for full animation series.
          </p>
          <span className="text-[10px] text-rose-400 font-semibold block pt-1">
            Long-Term Goal
          </span>
        </div>
      </div>

      {/* Notice & CTA */}
      <div className="text-center space-y-4 pt-4 border-t border-[#1c2035]">
        <p className="text-xs text-[#7d8299] max-w-lg mx-auto">
          Payment processing and crowdfunding features are currently in regulatory preparation and will launch in a subsequent phase. In the meantime, discover and follow stories to help boost their adaptation ranking!
        </p>
        <Link href="/discover" className="button button-primary px-6 py-2.5 text-xs font-semibold inline-flex items-center space-x-2">
          <span>Explore Trending Stories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
