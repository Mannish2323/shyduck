"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Sparkles, 
  Trash2, 
  Shield, 
  Feather 
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { UIModal } from "@/components/ui-modal";
import { WriterStoryGate } from "@/components/creator-space";

export default function StoryCharactersPage() {
  const params = useParams();
  const storyId = (params?.id as string) || "";
  const { user, stories, addToast } = useShyduck();

  const story = stories.find((s) => user?.role === "writer" && s.author.username === user.username && (s.id === storyId || s.slug === storyId));

  const [characters, setCharacters] = useState(story?.characters || []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Protagonist");
  const [description, setDescription] = useState("");
  const [abilities, setAbilities] = useState("");
  const [relationships, setRelationships] = useState("");
  const [avatarColor, setAvatarColor] = useState("#e9b65a");

  const handleAddCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const newChar = {
      id: `char-${Date.now()}`,
      name: name.trim(),
      role,
      avatarColor,
      description: description.trim(),
      abilities: abilities ? abilities.split(",").map((a) => a.trim()).filter(Boolean) : [],
      relationships: relationships.trim() || undefined
    };

    setCharacters([...characters, newChar]);
    setName("");
    setDescription("");
    setAbilities("");
    setRelationships("");
    setIsModalOpen(false);
    addToast("Character Created!", `${newChar.name} has been enrolled in the story codex.`, "success");
  };

  const handleDeleteCharacter = (id: string, charName: string) => {
    setCharacters(characters.filter((c) => c.id !== id));
    addToast("Character removed", `${charName} removed from codex.`, "info");
  };

  if (!story) return <WriterStoryGate title="That story is not in your studio." description="Character entries are private creator data and can only be opened for a story you own." />;

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
            <Users className="w-3.5 h-3.5" />
            <span>Dramatis Personae Codex</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#fbf7ef]">
            Characters in &ldquo;{story?.title}&rdquo;
          </h1>
          <p className="text-xs text-[#8c91a8]">
            Create and maintain character bibles, powers, and relationship webs visible to your readers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto shadow-lg shadow-[#e9b65a]/15"
        >
          <Plus className="w-4 h-4" />
          <span>Add Character</span>
        </button>
      </div>

      {/* Character Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characters.map((char) => (
          <div
            key={char.id}
            className="p-6 rounded-2xl border border-[#21263f] bg-[#0e1022] hover:border-[#e9b65a]/40 transition-all space-y-4 relative group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-lg font-bold text-[#0a0b14]"
                  style={{ backgroundColor: char.avatarColor || "#e9b65a" }}
                >
                  {char.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#fbf7ef]">
                    {char.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#e9b65a] block">
                    {char.role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteCharacter(char.id, char.name)}
                className="p-2 text-[#6e738d] hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Character"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#9ea3b9] leading-relaxed">
              {char.description}
            </p>

            {char.abilities && char.abilities.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#1a1d30]">
                <span className="text-[10px] uppercase font-semibold text-[#6e738d]">
                  Signature Traits
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {char.abilities.map((ab) => (
                    <span key={ab} className="text-[11px] bg-[#16182c] text-[#c0c5db] px-2 py-0.5 rounded border border-[#272b45]">
                      {ab}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {char.relationships && (
              <div className="text-xs text-[#7e849d] pt-1">
                <strong className="text-[#a6acc2]">Bonds:</strong> {char.relationships}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Character Modal */}
      <UIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Character to Universe"
      >
        <form onSubmit={handleAddCharacter} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Character Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vaelen the Ashen"
                className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2.5 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
                Story Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#141628] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-[#e9b65a]"
              >
                <option value="Protagonist">Protagonist</option>
                <option value="Deuteragonist">Deuteragonist</option>
                <option value="Antagonist">Antagonist</option>
                <option value="Mentor">Mentor</option>
                <option value="Ally">Ally</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Character Description *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Background, motives, physical appearance..."
              className="w-full bg-[#141628] text-[#fbf7ef] p-3 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Abilities / Signature Traits (Comma-separated)
            </label>
            <input
              type="text"
              value={abilities}
              onChange={(e) => setAbilities(e.target.value)}
              placeholder="e.g. Thunder Tongue, Thermal Gliding, Cartography"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b91a9] uppercase tracking-wider block">
              Key Bonds & Relationships
            </label>
            <input
              type="text"
              value={relationships}
              onChange={(e) => setRelationships(e.target.value)}
              placeholder="e.g. Reluctant ally to Tara; former captain in the sky guard"
              className="w-full bg-[#141628] text-[#fbf7ef] px-3.5 py-2 rounded-xl border border-[#272c44] focus:border-[#e9b65a] outline-none text-xs sm:text-sm"
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
              disabled={!name.trim() || !description.trim()}
              className="button button-primary px-5 py-2 text-xs font-semibold disabled:opacity-50"
            >
              Add Character
            </button>
          </div>
        </form>
      </UIModal>
    </div>
  );
}
