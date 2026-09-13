"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Globe, 
  MapPin, 
  Shield, 
  Scroll, 
  Calendar,
  Sparkles,
  Trash2 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { UIModal } from "@/components/ui-modal";

export default function StoryWorldPage() {
  const params = useParams();
  const storyId = (params?.id as string) || "";
  const { stories, addToast } = useShyduck();

  const story = stories.find((s) => s.id === storyId || s.slug === storyId) || stories[0];

  const [activeSubTab, setActiveSubTab] = useState<"locations" | "factions" | "lore" | "timeline">("locations");

  // Local state for lore sections
  const [locations, setLocations] = useState(story?.world?.locations || [
    { name: "Sundarban Sea Citadel", type: "Capital City", description: "Carved out of petrified mangroves and saltwater stone, connected by swaying glass rope-bridges." }
  ]);
  const [factions, setFactions] = useState(story?.world?.factions || [
    { name: "The Imperial Guild of Mapmakers", motive: "Preservation of trade secrets", description: "Scholars who hold monopoly over navigation and the suppressed dragon prophecies." }
  ]);
  const [loreItems, setLoreItems] = useState(story?.world?.loreItems || [
    { title: "The Living Vellum", category: "Artifact", description: "Parchment harvested from moon-reeds that bleeds genuine seawater when punctured." }
  ]);
  const [timeline, setTimeline] = useState(story?.world?.timeline || [
    { era: "Year 0", event: "The Binding Accord", description: "Dragons were lured into volcanic dormancy by the Seven Sages." }
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemDesc.trim()) return;

    if (activeSubTab === "locations") {
      setLocations([...locations, { name: itemTitle, type: itemType || "Region", description: itemDesc }]);
    } else if (activeSubTab === "factions") {
      setFactions([...factions, { name: itemTitle, motive: itemType || "Influence", description: itemDesc }]);
    } else if (activeSubTab === "lore") {
      setLoreItems([...loreItems, { title: itemTitle, category: itemType || "Ancient Lore", description: itemDesc }]);
    } else {
      setTimeline([...timeline, { era: itemType || "Current Era", event: itemTitle, description: itemDesc }]);
    }

    setItemTitle("");
    setItemType("");
    setItemDesc("");
    setIsModalOpen(false);
    addToast("World Entry Added!", `New ${activeSubTab.slice(0, -1)} recorded into story encyclopedia.`, "success");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2338] pb-6">
        <div className="space-y-1">
          <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
            <Globe className="w-3.5 h-3.5" />
            <span>Worldbuilding Encyclopedia</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#fbf7ef]">
            World Lore for &ldquo;{story?.title}&rdquo;
          </h1>
          <p className="text-xs text-[#8c91a8]">
            An interactive encyclopedia for your readers exploring locations, factions, and historical timelines.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto shadow-lg shadow-[#e9b65a]/15"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeSubTab === "timeline" ? "Event" : activeSubTab.slice(0, -1)}</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 border-b border-[#1e2238] pb-1">
        {[
          { id: "locations", label: "Locations", icon: MapPin, count: locations.length },
          { id: "factions", label: "Factions", icon: Shield, count: factions.length },
          { id: "lore", label: "Lore & Artifacts", icon: Scroll, count: loreItems.length },
          { id: "timeline", label: "Timeline", icon: Calendar, count: timeline.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center space-x-2 ${
                isActive
                  ? "bg-[#e9b65a] text-[#0a0b14] font-bold"
                  : "text-[#858aa1] hover:text-white hover:bg-[#131526]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-black/20 text-black" : "bg-[#181a2e] text-[#8e94ad]"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Stream */}
      <div className="space-y-4">
        {activeSubTab === "locations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((loc, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-[#20253d] bg-[#0e1022] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-[#fbf7ef]">{loc.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#171a2e] text-[#e9b65a] border border-[#272b48]">
                    {loc.type}
                  </span>
                </div>
                <p className="text-xs text-[#8c91a8] leading-relaxed">{loc.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "factions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factions.map((fac, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-[#20253d] bg-[#0e1022] space-y-2">
                <h3 className="font-serif font-bold text-base text-[#fbf7ef]">{fac.name}</h3>
                <p className="text-xs text-[#e9b65a] italic">Motive: {fac.motive}</p>
                <p className="text-xs text-[#8c91a8] leading-relaxed">{fac.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "lore" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loreItems.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-[#20253d] bg-[#0e1022] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-[#fbf7ef]">{item.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#171a2e] text-[#a1a6bf] border border-[#272b48]">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-[#8c91a8] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "timeline" && (
          <div className="border-l-2 border-[#2b304c] ml-3 pl-6 space-y-6 py-2">
            {timeline.map((event, idx) => (
              <div key={idx} className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#e9b65a] border-2 border-[#0a0b14]" />
                <span className="text-xs font-bold text-[#e9b65a] uppercase tracking-wider">{event.era}</span>
                <h4 className="font-semibold text-sm text-[#fbf7ef]">{event.event}</h4>
                <p className="text-xs text-[#8c91a8] leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add World Item Modal */}
      <UIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add Entry to ${activeSubTab.toUpperCase()}`}
      >
        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              {activeSubTab === "timeline" ? "Event Name *" : "Name / Title *"}
            </label>
            <input
              type="text"
              required
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              placeholder="e.g. The Sunken Spire"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              {activeSubTab === "locations" ? "Location Type" : activeSubTab === "factions" ? "Core Motive" : activeSubTab === "timeline" ? "Era / Year" : "Category"}
            </label>
            <input
              type="text"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              placeholder="e.g. Floating Island / Trade Secret / Year 289"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Encyclopedia Entry Description *
            </label>
            <textarea
              rows={3}
              required
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              placeholder="Describe the lore, significance to the plot, visual aesthetics..."
              className="w-full bg-[#141628] text-[#fbf7ef] p-3 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8a90a6] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!itemTitle.trim() || !itemDesc.trim()}
              className="button button-primary px-5 py-2 text-xs font-semibold disabled:opacity-50"
            >
              Add Entry
            </button>
          </div>
        </form>
      </UIModal>
    </div>
  );
}
