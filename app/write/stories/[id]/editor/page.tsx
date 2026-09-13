"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  Quote, 
  Minus, 
  List, 
  Undo, 
  Redo, 
  Eye, 
  Save, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileText 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { UIModal } from "@/components/ui-modal";

export default function StoryEditorPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = (params?.id as string) || "";

  const { stories, addChapter, addToast } = useShyduck();

  // Find story
  const story = stories.find((s) => s.id === storyId || s.slug === storyId) || stories[0];

  // Editor State
  const [chapterTitle, setChapterTitle] = useState("Chapter 01: The Awakening");
  const [content, setContent] = useState(
    "The rain in archive chamber nine had ceased, replaced by a low harmonic hum that vibrated through the floorboards.\n\nShe looked down at the brass ruler in her hand. The meridian line had shifted again—not by yards, but by leagues."
  );
  const [authorNote, setAuthorNote] = useState("");

  // Autosave simulation state
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [lastSavedTime, setLastSavedTime] = useState("Just now");

  // Publish Modal State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Word count & reading time
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 220));

  // Trigger autosave state on content changes
  useEffect(() => {
    setSaveStatus("saving");
    const timer = setTimeout(() => {
      setSaveStatus("saved");
      setLastSavedTime("Just now");
    }, 1200);

    return () => clearTimeout(timer);
  }, [content, chapterTitle, authorNote]);

  // Insert formatting snippet into textarea
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end);

    const replacement = `${prefix}${selectedText || "text"}${suffix}`;
    const newContent = previousText.substring(0, start) + replacement + previousText.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  const handleManualSaveDraft = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setLastSavedTime("Just now");
      addToast("Draft saved", "Your chapter draft is safely preserved in local workspace.", "info");
    }, 400);
  };

  const handleConfirmPublish = () => {
    setIsPublishing(true);

    setTimeout(() => {
      if (story) {
        addChapter(story.slug, {
          title: chapterTitle,
          content,
          wordCount,
          authorNote: authorNote || undefined,
          status: "Published"
        });
      }

      setIsPublishing(false);
      setIsPublishModalOpen(false);
      addToast("Chapter Published! 🎉", `"${chapterTitle}" is now live for all readers.`, "success");
      router.push(`/write/stories/${story?.id}/chapters`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#090a12] text-[#fbf7ef] flex flex-col">
      {/* ========================================================================= */}
      {/* 1. TOP EDITOR STATUS & ACTIONS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#0c0d18]/95 backdrop-blur-md border-b border-[#1c2033] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/write"
            className="p-1.5 rounded-lg text-[#7c8299] hover:text-white hover:bg-[#181a2c] transition-colors"
            title="Back to Studio"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#e9b65a] block">
              {story?.title || "Story Universe"}
            </span>
            <span className="text-xs text-[#8288a1]">Distraction-Free Chapter Studio</span>
          </div>
        </div>

        {/* Center: Autosave status & metrics */}
        <div className="hidden md:flex items-center space-x-4 text-xs text-[#7e849d]">
          <span className="flex items-center space-x-1 font-mono">
            <span>{wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </span>

          <span className="flex items-center space-x-1.5 text-[11px]">
            <CheckCircle2 className={`w-3.5 h-3.5 ${saveStatus === "saving" ? "text-amber-400 animate-spin" : "text-emerald-400"}`} />
            <span>{saveStatus === "saving" ? "Saving draft..." : `Saved ${lastSavedTime}`}</span>
          </span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            type="button"
            onClick={handleManualSaveDraft}
            className="button button-secondary px-3.5 py-2 text-xs font-semibold flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <Link
            href={`/stories/${story?.slug}`}
            target="_blank"
            className="p-2 rounded-xl border border-[#252940] text-[#7e849e] hover:text-[#fbf7ef] transition-colors"
            title="Preview in Reader"
          >
            <Eye className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsPublishModalOpen(true)}
            className="button button-primary px-5 py-2 text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-[#e9b65a]/15"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Chapter</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. RICH FORMATTING TOOLBAR */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#0d0f1e] border-b border-[#1c2033] px-4 py-2 flex items-center justify-center overflow-x-auto space-x-1">
        <button
          type="button"
          onClick={() => insertFormatting("**", "**")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Bold (**text**)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("*", "*")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Italic (*text*)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <span className="w-[1px] h-4 bg-[#23273e] mx-1" />
        <button
          type="button"
          onClick={() => insertFormatting("## ")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("### ")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <span className="w-[1px] h-4 bg-[#23273e] mx-1" />
        <button
          type="button"
          onClick={() => insertFormatting("> ")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("\n\n---\n\n")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Scene Break (Divider)"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("- ")}
          className="p-2 rounded-lg text-[#8a8fa6] hover:text-white hover:bg-[#181a2e]"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. WRITING CANVAS */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 py-12 flex flex-col space-y-6">
        {/* Chapter Title Input */}
        <input
          type="text"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          placeholder="Chapter Title..."
          className="w-full bg-transparent font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf7ef] placeholder-[#41465e] border-none outline-none leading-tight"
        />

        {/* Author Note Accordion */}
        <div className="space-y-1">
          <input
            type="text"
            value={authorNote}
            onChange={(e) => setAuthorNote(e.target.value)}
            placeholder="Author's transmission note to readers for this chapter (Optional)..."
            className="w-full bg-[#121424] text-xs text-[#cbd0e6] px-4 py-2.5 rounded-xl border border-[#22273e] outline-none focus:border-[#e9b65a]"
          />
        </div>

        {/* Chapter Prose Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Begin your chapter here. Write without fear..."
          rows={22}
          className="w-full flex-1 bg-transparent text-[#e8ecfa] font-serif text-lg sm:text-xl leading-relaxed placeholder-[#3a3e56] border-none outline-none resize-none select-text"
          style={{ lineHeight: 1.85 }}
        />
      </main>

      {/* ========================================================================= */}
      {/* 4. PUBLISH CONFIRMATION MODAL (Section 31) */}
      {/* ========================================================================= */}
      <UIModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Ready to Publish Chapter?"
      >
        <div className="space-y-5 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#141628] border border-[#262b45] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#7c8299]">Story Universe:</span>
              <strong className="text-[#fbf7ef]">{story?.title}</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#7c8299]">Chapter Title:</span>
              <strong className="text-[#e9b65a]">{chapterTitle}</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#7c8299]">Length:</span>
              <span>{wordCount.toLocaleString()} words ({readingTime} min)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#7c8299]">Visibility:</span>
              <span className="text-emerald-400 font-semibold">Public (All Readers)</span>
            </div>
          </div>

          <p className="text-xs text-[#8c91a8] leading-relaxed">
            Publishing will push this chapter to the public story table of contents and trigger instant notifications for your followers.
          </p>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8a90a6] hover:text-white"
            >
              Keep Editing
            </button>

            <button
              type="button"
              disabled={isPublishing}
              onClick={handleConfirmPublish}
              className="button button-primary px-6 py-2.5 text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-[#e9b65a]/20 disabled:opacity-50"
            >
              {isPublishing ? (
                <span>Broadcasting to sky...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </UIModal>
    </div>
  );
}
