"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Feather, 
  Sparkles, 
  BookOpen, 
  Palette, 
  Eye, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { CoverStyle } from "@/lib/types";
import { GENRES, LANGUAGES } from "@/lib/mock-data";

export default function CreateStoryPage() {
  const router = useRouter();
  const { createStory, addToast } = useShyduck();

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState(GENRES[0]);
  const [language, setLanguage] = useState("English");
  const [coverStyle, setCoverStyle] = useState<CoverStyle>("ember");
  const [tagsInput, setTagsInput] = useState("");
  const [status, setStatus] = useState<"Draft" | "Ongoing">("Ongoing");
  const [contentRating, setContentRating] = useState<"Everyone" | "Teen (13+)" | "Mature (18+)">("Teen (13+)");

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const coverOptions = [
    { id: "ember", name: "Amber & Obsidian", class: "cover-ember" },
    { id: "aether", name: "Cyber Neon Indigo", class: "cover-aether" },
    { id: "city", name: "Brass Steam & Gold", class: "cover-city" },
    { id: "lotus", name: "Crimson Lotus", class: "cover-lotus" },
    { id: "cosmic", name: "Chai & Stellar Violet", class: "cover-cosmic" },
    { id: "forest", name: "Mist & Ancient Pine", class: "cover-forest" },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Story Title is required.";
    if (title.length > 80) newErrors.title = "Title must be under 80 characters.";
    if (!description.trim()) newErrors.description = "Story Synopsis is required.";
    if (description.length < 30) newErrors.description = "Synopsis must be at least 30 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast("Validation error", "Please correct the highlighted fields.", "error");
      return;
    }

    const tags = tagsInput
      ? tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [genre, "Original Fiction"];

    const newStory = createStory({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      description: description.trim(),
      genre,
      language,
      coverStyle,
      tags,
      status
    });

    if (status === "Draft") {
      addToast("Draft saved! 📝", `"${newStory.title}" has been saved to your drafts.`);
      router.push("/write");
    } else {
      addToast("World created! 🎉", `"${newStory.title}" is ready. Now let's write Chapter 1.`);
      router.push(`/write/stories/${newStory.id}/editor`);
    }
  };

  return (
    <div className="w-full min-h-screen py-10 shell max-w-4xl space-y-8">
      {/* Back Link */}
      <Link
        href="/write"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8b90a6] hover:text-[#e9b65a] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Writer Dashboard</span>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <Feather className="w-3.5 h-3.5" />
          <span>New Serialized Novel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#fbf7ef] tracking-tight">
          Create a New <span className="text-[#e9b65a] italic">Story Universe.</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8c91a8]">
          Set up the foundation for your book. Once created, you can write chapters, create characters, and develop world lore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (8 cols) */}
        <form onSubmit={handleCreate} className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Story Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: "" });
              }}
              placeholder="e.g. The Celestial Observatory"
              className={`w-full bg-[#131526] text-[#fbf7ef] px-4 py-3 rounded-xl border outline-none text-sm transition-all ${
                errors.title ? "border-rose-500 ring-1 ring-rose-500" : "border-[#272c44] focus:border-[#e9b65a]"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-400 flex items-center space-x-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Subtitle / Tagline */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Subtitle / Hook (Optional)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. When the stars aligned, the empire fell silent."
              className="w-full bg-[#131526] text-[#fbf7ef] px-4 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Genre & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Primary Genre *
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#131526] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:border-[#e9b65a]"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Story Language *
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#131526] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:border-[#e9b65a]"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Synopsis / Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: "" });
              }}
              placeholder="Hook your readers. What is the central conflict? Who is the protagonist? What price must they pay?"
              className={`w-full bg-[#131526] text-[#fbf7ef] p-3.5 rounded-xl border outline-none text-xs sm:text-sm resize-none transition-all ${
                errors.description ? "border-rose-500 ring-1 ring-rose-500" : "border-[#272c44] focus:border-[#e9b65a]"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-400 flex items-center space-x-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Cover Palette Style */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-[#e9b65a]" />
              <span>Choose Book Cover Atmosphere</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {coverOptions.map((cov) => (
                <button
                  key={cov.id}
                  type="button"
                  onClick={() => setCoverStyle(cov.id as CoverStyle)}
                  className={`p-3 rounded-xl border flex items-center space-x-2 text-left transition-all ${
                    coverStyle === cov.id
                      ? "border-[#e9b65a] bg-[#181a30] text-[#e9b65a] font-semibold"
                      : "border-[#232740] bg-[#131526] text-[#8e94ad] hover:text-white"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${cov.class} shrink-0`} />
                  <span className="truncate">{cov.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Search Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Ancient Magic, Slow Burn, Reincarnation, Kolkata"
              className="w-full bg-[#131526] text-[#fbf7ef] px-4 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Status & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Initial Status
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {["Ongoing", "Draft"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st as any)}
                    className={`py-2 rounded-xl border font-medium ${
                      status === st
                        ? "bg-[#e9b65a]/20 text-[#e9b65a] border-[#e9b65a]"
                        : "bg-[#131526] text-[#8e94ad] border-[#252942]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Content Advisory
              </label>
              <select
                value={contentRating}
                onChange={(e) => setContentRating(e.target.value as any)}
                className="w-full bg-[#131526] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-[#e9b65a]"
              >
                <option value="Everyone">All Audiences (G)</option>
                <option value="Teen (13+)">Teen 13+ (Mild violence/language)</option>
                <option value="Mature (18+)">Mature 18+ (Explicit/dark themes)</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#1c2035] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => router.push("/write")}
              className="text-xs text-[#82879e] hover:text-white"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  setStatus("Draft");
                  handleCreate(e);
                }}
                className="button button-secondary px-5 py-2.5 text-xs font-semibold"
              >
                Save Draft
              </button>

              <button
                type="submit"
                className="button button-primary px-6 py-2.5 text-xs font-bold flex items-center space-x-2 shadow-lg shadow-[#e9b65a]/15"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Story & Write Ch. 1</span>
              </button>
            </div>
          </div>
        </form>

        {/* Right Live Preview Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#e9b65a] flex items-center space-x-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Live Cover Preview</span>
          </span>

          <div className="p-6 rounded-3xl border border-[#23273e] bg-[#0e1022] space-y-4">
            <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <div className={`cover-${coverStyle} w-full h-full flex flex-col justify-between p-6`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fbf7ef]/70 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    {genre}
                  </span>
                  <span className="text-[10px] font-semibold text-[#e9b65a] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    {language}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-black text-[#fbf7ef] leading-tight drop-shadow-md">
                    {title || "Untitled Masterpiece"}
                  </h3>
                  {subtitle && (
                    <p className="text-[10px] text-[#e9b65a] italic drop-shadow-sm truncate">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-[#8c91a8]">
              <div className="flex justify-between">
                <span>Rating:</span>
                <span className="text-[#fbf7ef] font-semibold">{contentRating}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">{status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
