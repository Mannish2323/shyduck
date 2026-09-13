"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Feather, 
  Check, 
  ArrowRight, 
  Sparkles,
  Compass
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { GENRES } from "@/lib/mock-data";
import { ShyduckMascot } from "@/components/shyduck-mascot";

export default function OnboardingPage() {
  const router = useRouter();
  const { loginAs, addToast } = useShyduck();

  const [step, setStep] = useState<1 | 2>(1);
  const [intent, setIntent] = useState<"reader" | "writer" | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Fantasy",
    "Sci-Fi",
    "Mystery"
  ]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleFinishOnboarding = () => {
    if (!intent) return;

    let profile: { username?: string; email?: string; name?: string } = {};
    try {
      const pending = localStorage.getItem("shyduck_pending_profile");
      if (pending) profile = JSON.parse(pending);
      localStorage.removeItem("shyduck_pending_profile");
    } catch {
      // Continue with fallback profile if storage is restricted
    }

    loginAs(intent, { ...profile, preferredGenres: selectedGenres });

    if (intent === "writer") {
      addToast("Welcome to Writer Studio! ✍️", "Your creative workspace is prepared.", "success");
      router.push("/write");
    } else {
      addToast("Welcome to Shyduck Tales! 📖", "Discover worlds tuned to your favorite genres.", "success");
      router.push("/discover");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl border border-[#262b45] bg-[#0e1022] shadow-2xl space-y-8 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e9b65a]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mascot & Step indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShyduckMascot mood="peaceful" size={48} />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#e9b65a] block">
                Account Setup
              </span>
              <h2 className="font-serif font-bold text-lg text-[#fbf7ef]">
                Shyduck Tales
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono text-[#8b91ab] bg-[#16182c] px-3.5 py-1 rounded-full border border-[#252942]">
            Step {step} of 2
          </span>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: MUTUALLY EXCLUSIVE ACCOUNT TYPE (READER vs WRITER)               */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#fbf7ef] tracking-tight">
                Choose how you want to use Shyduck Tales
              </h1>
              <p className="text-xs sm:text-sm text-[#8c91a8]">
                Select your primary experience. You can always change or upgrade your preferences later in Account Settings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Option A: Reader */}
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIntent("reader")}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-4 ${
                  intent === "reader"
                    ? "bg-[#181a32] border-[#e9b65a] shadow-[0_0_30px_rgba(233,182,90,0.18)] -translate-y-1"
                    : "bg-[#111324] border-[#222740] hover:border-[#3b4066] hover:bg-[#15182c]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl transition-colors ${
                    intent === "reader" 
                      ? "bg-[#e9b65a] text-[#0a0b14]" 
                      : "bg-[#1b1e36] text-[#a1a6bf]"
                  }`}>
                    <BookOpen className="w-5 h-5" />
                  </div>

                  {intent === "reader" ? (
                    <div className="w-5 h-5 rounded-full bg-[#e9b65a] text-[#0a0b14] flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#303554]" />
                  )}
                </div>

                <div>
                  <h3 className={`font-serif font-bold text-base flex items-center gap-1.5 ${
                    intent === "reader" ? "text-[#e9b65a]" : "text-[#fbf7ef]"
                  }`}>
                    <span>📖 Reader</span>
                  </h3>
                  <p className="text-xs text-[#878da6] mt-1.5 leading-relaxed">
                    Read stories, follow authors, save books and join the community.
                  </p>
                </div>
              </motion.button>

              {/* Option B: Writer */}
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIntent("writer")}
                className={`p-6 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-4 ${
                  intent === "writer"
                    ? "bg-[#181a32] border-[#e9b65a] shadow-[0_0_30px_rgba(233,182,90,0.18)] -translate-y-1"
                    : "bg-[#111324] border-[#222740] hover:border-[#3b4066] hover:bg-[#15182c]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl transition-colors ${
                    intent === "writer" 
                      ? "bg-[#e9b65a] text-[#0a0b14]" 
                      : "bg-[#1b1e36] text-[#a1a6bf]"
                  }`}>
                    <Feather className="w-5 h-5" />
                  </div>

                  {intent === "writer" ? (
                    <div className="w-5 h-5 rounded-full bg-[#e9b65a] text-[#0a0b14] flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#303554]" />
                  )}
                </div>

                <div>
                  <h3 className={`font-serif font-bold text-base flex items-center gap-1.5 ${
                    intent === "writer" ? "text-[#e9b65a]" : "text-[#fbf7ef]"
                  }`}>
                    <span>✍ Writer</span>
                  </h3>
                  <p className="text-xs text-[#878da6] mt-1.5 leading-relaxed">
                    Write stories, publish chapters, build your audience and manage your worlds.
                  </p>
                </div>
              </motion.button>
            </div>

            {/* Continue CTA (Disabled until role chosen) */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-[#6e748d]">
                {intent ? `Selected: ${intent === "writer" ? "✍ Writer Studio" : "📖 Reader Feed"}` : "Please select one account type"}
              </span>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!intent}
                className="button button-primary px-8 py-3 text-xs font-bold flex items-center space-x-2 disabled:cursor-not-allowed disabled:opacity-30 shadow-lg shadow-[#e9b65a]/15"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: GENRE PREFERENCES                                                 */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#fbf7ef] tracking-tight">
                Choose your favorite genres
              </h1>
              <p className="text-xs sm:text-sm text-[#8c91a8]">
                Select the themes that captivate your mind. We use this to tailor your initial story recommendations and prompts.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {GENRES.map((genre) => {
                const isSelected = selectedGenres.includes(genre);

                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? "bg-[#e9b65a] text-[#0a0b14] border-[#e9b65a] shadow-md shadow-[#e9b65a]/15 font-bold"
                        : "bg-[#131526] text-[#8e94ad] border-[#252942] hover:border-[#3a3f65] hover:text-[#fbf7ef]"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#1f233a]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#7e849e] hover:text-[#fbf7ef] transition-colors"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="button button-primary px-8 py-3 text-xs font-bold flex items-center space-x-2 shadow-lg shadow-[#e9b65a]/15"
              >
                <span>{intent === "writer" ? "Enter Writer Studio →" : "Start Exploring Stories →"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
