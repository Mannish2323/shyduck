"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Bold, Eye, Heading2, Italic, List, Minus, Quote, Redo2, Save, Send, Undo2 } from "lucide-react";
import { WriterStoryGate } from "@/components/creator-space";
import { UIModal } from "@/components/ui-modal";
import { useShyduck } from "@/lib/store";

export default function StoryEditorPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = (params?.id as string) || "";
  const { user, stories, addChapter, addToast } = useShyduck();
  const story = stories.find((item) => user?.role === "writer" && item.author.username === user.username && (item.id === storyId || item.slug === storyId));
  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorNote, setAuthorNote] = useState("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [lastSavedTime, setLastSavedTime] = useState("Not saved yet");
  const [isPreview, setIsPreview] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 220));

  useEffect(() => {
    if (!chapterTitle && !content && !authorNote) return;
    setSaveStatus("saving");
    const timer = window.setTimeout(() => {
      setSaveStatus("saved");
      setLastSavedTime("Just now");
    }, 700);
    return () => window.clearTimeout(timer);
  }, [chapterTitle, content, authorNote]);

  if (!story) return <WriterStoryGate title="That story is not in your studio." description="The editor only opens manuscripts belonging to the signed-in writer." />;

  const insertFormatting = (prefix: string, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || "text";
    const replacement = `${prefix}${selected}${suffix}`;
    setContent(`${content.slice(0, start)}${replacement}${content.slice(end)}`);
    window.setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 0);
  };

  const saveDraft = () => {
    setSaveStatus("saving");
    window.setTimeout(() => {
      setSaveStatus("saved");
      setLastSavedTime("Just now");
      addToast("Draft saved", "Your chapter is preserved in this local workspace.", "info");
    }, 350);
  };

  const publish = () => {
    if (!chapterTitle.trim() || !content.trim()) {
      addToast("Chapter needs a title and manuscript", "Add both before publishing.", "error");
      setIsPublishOpen(false);
      return;
    }
    setIsPublishing(true);
    window.setTimeout(() => {
      addChapter(story.slug, { title: chapterTitle.trim(), content, authorNote, status: "Published" });
      setIsPublishing(false);
      setIsPublishOpen(false);
      router.push(`/write/stories/${story.id}/chapters`);
    }, 400);
  };

  return <main className="min-h-[78vh] bg-[#0a0b14]" aria-labelledby="editor-title"><div className="mx-auto flex max-w-5xl flex-col px-4 py-6 sm:px-8">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><Link href={`/write/stories/${story.id}/chapters`} className="inline-flex items-center gap-2 text-xs font-semibold text-[#8b90a6] transition-colors hover:text-[#e9b65a]"><ArrowLeft className="h-3.5 w-3.5" /> Back to chapters</Link><div className="flex items-center gap-3 text-xs text-[#858ba2]"><span className={saveStatus === "saved" ? "text-emerald-400" : "text-[#e9b65a]"}>{saveStatus === "saved" ? "●" : "◌"} {saveStatus === "saved" ? `Saved ${lastSavedTime.toLowerCase()}` : "Saving…"}</span><button type="button" onClick={() => setIsPreview(!isPreview)} className="button button-secondary px-3 py-2 text-xs font-bold"><Eye className="h-3.5 w-3.5" /> {isPreview ? "Edit" : "Preview"}</button><button type="button" onClick={saveDraft} className="button button-secondary px-3 py-2 text-xs font-bold"><Save className="h-3.5 w-3.5" /> Save draft</button><button type="button" onClick={() => setIsPublishOpen(true)} className="button button-primary px-3 py-2 text-xs font-bold"><Send className="h-3.5 w-3.5" /> Publish</button></div></div>
    <div className="mb-6 border-b border-[#22263b] pb-5"><div className="eyebrow">{story.title} · New chapter</div><input id="editor-title" value={chapterTitle} onChange={(event) => setChapterTitle(event.target.value)} placeholder="Chapter title" className="mt-3 w-full bg-transparent font-serif-title text-3xl font-bold text-[#fbf7ef] outline-none placeholder:text-[#3d425a] sm:text-5xl" aria-label="Chapter title" /><p className="mt-2 text-xs text-[#747a93]">Write without losing your place. Your local draft saves as you work.</p></div>
    {isPreview ? <article className="mx-auto w-full max-w-3xl rounded-3xl border border-[#252a42] bg-[#111322] p-6 sm:p-10"><div className="eyebrow">Preview · {story.title}</div><h2 className="mt-3 font-serif-title text-3xl font-bold text-[#fbf7ef]">{chapterTitle || "Untitled chapter"}</h2><div className="reader-content mt-8 whitespace-pre-wrap font-serif text-lg text-[#d9d7d0]">{content || "Your chapter preview will appear here."}</div>{authorNote && <p className="mt-8 border-t border-[#282c43] pt-5 text-sm italic text-[#9298ad]">Author&apos;s note: {authorNote}</p>}</article> : <section className="overflow-hidden rounded-3xl border border-[#20243a] bg-[#0f1120] shadow-2xl"><div className="flex flex-wrap items-center gap-1 border-b border-[#20243a] bg-[#131526] p-2" aria-label="Formatting toolbar"><ToolButton label="Bold" onClick={() => insertFormatting("**", "**")}><Bold className="h-4 w-4" /></ToolButton><ToolButton label="Italic" onClick={() => insertFormatting("_", "_")}><Italic className="h-4 w-4" /></ToolButton><ToolButton label="Heading" onClick={() => insertFormatting("## ")}><Heading2 className="h-4 w-4" /></ToolButton><ToolButton label="Quote" onClick={() => insertFormatting("> ")}><Quote className="h-4 w-4" /></ToolButton><ToolButton label="Divider" onClick={() => insertFormatting("\n---\n")}><Minus className="h-4 w-4" /></ToolButton><ToolButton label="List" onClick={() => insertFormatting("- ")}><List className="h-4 w-4" /></ToolButton><span className="ml-auto flex items-center gap-2 px-2 text-[10px] text-[#757b94]"><Undo2 className="h-3.5 w-3.5" /><Redo2 className="h-3.5 w-3.5" /></span></div><textarea ref={textareaRef} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Begin your chapter here…" rows={22} className="min-h-[520px] w-full resize-y bg-transparent p-6 font-serif text-lg leading-relaxed text-[#e4e2dc] outline-none placeholder:text-[#3c4159] sm:p-10 sm:text-xl" aria-label="Chapter manuscript" /><div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#20243a] px-5 py-3 text-[11px] text-[#747a92]"><span>{wordCount.toLocaleString()} words · {readingTime} min read</span><input value={authorNote} onChange={(event) => setAuthorNote(event.target.value)} placeholder="Optional author note" className="min-w-[220px] flex-1 bg-transparent text-right text-xs text-[#b7bac8] outline-none placeholder:text-[#575d75]" aria-label="Author note" /></div></section>}
  </div><UIModal isOpen={isPublishOpen} onClose={() => setIsPublishOpen(false)} title="Ready to publish?" ><div className="space-y-5 text-sm"><div className="rounded-2xl border border-[#2a2e47] bg-[#15172a] p-4"><div className="flex justify-between gap-4 text-xs"><span className="text-[#7e849c]">Chapter</span><strong className="text-[#f5f1e7]">{chapterTitle || "Untitled chapter"}</strong></div><div className="mt-2 flex justify-between gap-4 text-xs"><span className="text-[#7e849c]">Visibility</span><span className="font-semibold text-emerald-400">Public</span></div></div><p className="text-xs leading-relaxed text-[#9298ad]">Publishing makes this chapter available in your story&apos;s table of contents. You can edit this local demo flow before Supabase is connected.</p><div className="flex justify-end gap-3"><button type="button" onClick={() => setIsPublishOpen(false)} className="button button-secondary px-4 py-2 text-xs font-bold">Keep editing</button><button type="button" onClick={publish} disabled={isPublishing} className="button button-primary px-4 py-2 text-xs font-bold disabled:opacity-50">{isPublishing ? "Publishing…" : "Publish chapter"}</button></div></div></UIModal></main>;
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} aria-label={label} title={label} className="grid h-8 w-8 place-items-center rounded-lg text-[#969bb0] transition-colors hover:bg-[#252942] hover:text-[#fbf7ef]">{children}</button>; }
