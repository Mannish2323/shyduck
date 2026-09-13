import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Feather, 
  AlertTriangle, 
  Heart, 
  FileText, 
  CheckCircle2, 
  Users 
} from "lucide-react";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export const metadata = {
  title: "Guidelines & Community Rules — Shyduck Tales",
  description: "Creator standards, intellectual property protection, and community conduct rules."
};

export default function GuidelinesPage() {
  return (
    <div className="w-full min-h-screen py-16 shell max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Standards & Ethics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7ef]">
          Creator Guidelines & Community Rules
        </h1>
        <p className="text-sm text-[#8c91a8] leading-relaxed">
          The principles that keep Shyduck Tales safe, inspiring, and respectful for storytellers and readers alike.
        </p>
      </div>

      {/* Part 1: Creator Guidelines */}
      <section className="p-8 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-6">
        <div className="flex items-center space-x-2 font-serif font-bold text-xl text-[#fbf7ef] border-b border-[#1c2035] pb-4">
          <Feather className="w-5 h-5 text-[#e9b65a]" />
          <h2>Creator Guidelines</h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#cbd0e6] leading-relaxed">
          <div className="space-y-1">
            <h4 className="font-bold text-[#fbf7ef] text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
              <span>1. 100% Creator Ownership</span>
            </h4>
            <p className="text-[#8c91a8] pl-6">
              You retain all copyright and intellectual property rights to the worlds, characters, lore, and words you publish on Shyduck Tales. We do not claim ownership of your fictional universes.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-[#fbf7ef] text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
              <span>2. Originality & Plagiarism</span>
            </h4>
            <p className="text-[#8c91a8] pl-6">
              All stories must be original works created by you. Copying, re-uploading other authors&apos; novels, or scraping uncredited work is strictly prohibited and results in immediate platform ban.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-[#fbf7ef] text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#e9b65a]" />
              <span>3. Proper Content Tagging</span>
            </h4>
            <p className="text-[#8c91a8] pl-6">
              If your story contains mature themes (graphic violence, psychological dread, or explicit content), you must mark the content advisory rating as &ldquo;Mature (18+)&rdquo; during story setup.
            </p>
          </div>
        </div>
      </section>

      {/* Part 2: Community Rules */}
      <section id="rules" className="p-8 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-6 scroll-mt-24">
        <div className="flex items-center space-x-2 font-serif font-bold text-xl text-[#fbf7ef] border-b border-[#1c2035] pb-4">
          <Users className="w-5 h-5 text-sky-400" />
          <h2>The Reader&apos;s Code of Conduct</h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#cbd0e6] leading-relaxed">
          <div className="space-y-1">
            <h4 className="font-bold text-[#fbf7ef] text-sm flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>1. Mandatory Spoiler Warnings</span>
            </h4>
            <p className="text-[#8c91a8] pl-6">
              When discussing plot twists, character deaths, or secret revelations in chapter comments, always check the &ldquo;Mark as Spoiler&rdquo; toggle. Respect the first-time reader&apos;s thrill of discovery.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-[#fbf7ef] text-sm flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>2. Constructive Critique Over Harassment</span>
            </h4>
            <p className="text-[#8c91a8] pl-6">
              Our creators are independent writers sharing vulnerable creative worlds. Feedback should be respectful, constructive, and aimed at encouraging craft improvement rather than personal mockery.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-[#fbf7ef] text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Zero Tolerance for Hate Speech</span>
            </h4>
            <p className="text-[#8c91a8] pl-6">
              Targeted discrimination, communal hatred, harassment, or doxxing will result in immediate suspension and comment scrubbing by our admin moderation team.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-4 text-center text-xs text-[#71768e]">
        Questions regarding our policies? Join the conversation on our{" "}
        <Link href="/community" className="text-[#e9b65a] hover:underline">
          Community Round Table
        </Link>.
      </div>
    </div>
  );
}
