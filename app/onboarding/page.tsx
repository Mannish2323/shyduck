"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Feather, 
  Check, 
  ArrowRight, 
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
      // Continue with the safe local preview profile if storage is unavailable.
    }

    loginAs(intent, { ...profile, preferredGenres: selectedGenres });
    if (intent === "writer") {
      addToast("Welcome to Writer Studio!", "Your creator canvas is prepared.", "success");
      router.push("/write");
    } else {
      addToast("Welcome to Shyduck Tales!", "Recommendations tuned to your preferred genres.", "success");
      router.push("/discover");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl border border-[#262b45] bg-[#0e1022] shadow-2xl space-y-8 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e9b65a]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mascot & Step indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShyduckMascot mood="peaceful" size={48} />
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#e9b65a] block">
                Welcome Traveler
              </span>
              <h2 className="font-serif font-bold text-lg text-[#fbf7ef]">
                Shyduck Tales
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono text-[#787d96] bg-[#16182c] px-3 py-1 rounded-full border border-[#252942]">
            Step {step} of 2
          </span>
        </div>

        {/* ==================== STEP 1: INTENT ==================== */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ef]">
                Choose how you want to use Shyduck Tales
              </h1>
              <p className="text-xs sm:text-sm text-[#8c91a8]">
                Choose your primary Shyduck Tales experience. You can change this later in account settings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "reader",
                  label: "Reader",
                  desc: "Read stories, follow authors, save books and join the community.",
                  icon: BookOpen
                },
                {
                  id: "writer",
                  label: "Writer",
                  desc: "Write stories, publish chapters, build your audience and manage your worlds.",
                  icon: Feather
                }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = intent === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIntent(item.id as "reader" | "writer")}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "bg-[#181a30] border-[#e9b65a] shadow-lg shadow-[#e9b65a]/10"
                        : "bg-[#121426] border-[#222740] hover:border-[#383d63]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${isSelected ? "bg-[#e9b65a] text-[#0a0b14]" : "bg-[#1b1e36] text-[#a1a6bf]"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#e9b65a] text-[#0a0b14] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-serif font-bold text-sm ${isSelected ? "text-[#e9b65a]" : "text-[#fbf7ef]"}`}>
                        {item.label}
                      </h3>
                      <p className="text-[11px] text-[#7d8299] mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!intent}
                className="button button-primary px-7 py-3 text-xs font-semibold flex items-center space-x-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2: GENRE PREFERENCES ==================== */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ef]">
                Choose your favorite genres
              </h1>
              <p className="text-xs sm:text-sm text-[#8c91a8]">
                Select the atmospheres and themes that captivate your mind. You can always change this later.
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
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? "bg-[#e9b65a] text-[#0a0b14] shadow-md shadow-[#e9b65a]/20 scale-105"
                        : "bg-[#131526] text-[#8e94ad] border border-[#242944] hover:bg-[#1b1e36]"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-[#1c2036] flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#7c829b] hover:text-white"
              >
                ← Back
              </button>

              <button
                onClick={handleFinishOnboarding}
                className="button button-primary px-8 py-3 text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-[#e9b65a]/20"
              >
                <Compass className="w-4 h-4" />
                <span>Enter Shyduck Tales</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
