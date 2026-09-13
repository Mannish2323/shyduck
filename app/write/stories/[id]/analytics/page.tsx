"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BarChart3, BookOpen, Eye, Info, Users } from "lucide-react";
import { useShyduck } from "@/lib/store";

export default function StoryAnalyticsPage() {
  const params = useParams();
  const storyId = (params?.id as string) || "";
  const { user, stories } = useShyduck();
  const story = stories.find((item) => user?.role === "writer" && item.author.username === user.username && (item.id === storyId || item.slug === storyId));

  if (!story) {
    return <main className="shell flex min-h-[70vh] items-center justify-center py-12"><div className="max-w-md rounded-3xl border border-[#2a2e47] bg-[#111322] p-8 text-center"><div className="eyebrow">Creator analytics</div><h1 className="mt-3 font-serif-title text-2xl font-bold text-[#fbf7ef]">That story is not in your studio.</h1><p className="mt-3 text-sm leading-relaxed text-[#949ab2]">Analytics are only available for stories owned by the signed-in writer.</p><Link href="/write" className="button button-primary mt-6 px-5 py-3 text-xs font-bold">Back to studio →</Link></div></main>;
  }

  return <main className="shell max-w-5xl space-y-8 py-8" aria-labelledby="analytics-title">
    <Link href="/write" className="inline-flex items-center gap-2 text-xs font-semibold text-[#8b90a6] transition-colors hover:text-[#e9b65a]"><ArrowLeft className="h-3.5 w-3.5" /> Back to Writer Dashboard</Link>
    <header className="border-b border-[#20243a] pb-6"><div className="eyebrow flex items-center gap-2"><BarChart3 className="h-3.5 w-3.5" /> Story performance</div><h1 id="analytics-title" className="mt-2 font-serif-title text-3xl font-bold text-[#fbf7ef]">{story.title}</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9399b0]">A truthful view of the audience signals currently attached to this story. No estimates are generated.</p></header>
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Story metrics"><Metric label="Reads" value={story.readsCount.toLocaleString()} detail={story.readsCount ? "Recorded reads" : "No reads recorded yet"} icon={Eye} /><Metric label="Chapters" value={story.chaptersCount.toString()} detail="From your story record" icon={BookOpen} /><Metric label="Followers" value="—" detail="Audience service not connected" icon={Users} /><Metric label="Completion" value="—" detail="Available after reader events" icon={Info} /></section>
    <section className="rounded-3xl border border-dashed border-[#343952] bg-[#101222] p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e9b65a]/10 text-[#e9b65a]"><BarChart3 className="h-5 w-5" /></div><h2 className="mt-4 font-serif-title text-xl font-bold text-[#f4f1e8]">Your readership story will appear here.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#858ba2]">Once a published chapter receives real reader events through Supabase, this space can show reads over time, unique readers and chapter retention.</p><Link href={`/stories/${story.slug}`} className="button button-secondary mt-5 px-4 py-2.5 text-xs font-bold">Preview public story</Link></section>
  </main>;
}

function Metric({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Eye }) {
  return <div className="rounded-2xl border border-[#252a43] bg-[#111322] p-4"><div className="flex items-center justify-between text-xs text-[#858ba3]"><span>{label}</span><Icon className="h-4 w-4 text-[#e9b65a]" /></div><div className="mt-3 font-serif-title text-2xl font-bold text-[#fbf7ef]">{value}</div><p className="mt-1 text-[10px] text-[#727890]">{detail}</p></div>;
}
