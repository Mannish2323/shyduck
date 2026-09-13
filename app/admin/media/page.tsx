"use client";

import React, { useState } from "react";
import { 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw, 
  Eye, 
  AlertTriangle, 
  Upload, 
  CheckCircle2,
  FileText
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { ADMIN_MEDIA } from "@/lib/mock-data";
import { UIModal } from "@/components/ui-modal";

export default function AdminMediaManagerPage() {
  const { addToast } = useShyduck();
  const [mediaList, setMediaList] = useState(ADMIN_MEDIA);

  // Selected media for warning modal or replace
  const [selectedMedia, setSelectedMedia] = useState<typeof ADMIN_MEDIA[0] | null>(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);

  const handleDeleteClick = (media: typeof ADMIN_MEDIA[0]) => {
    if ((media.usedByStoriesCount ?? 0) > 0) {
      // Show protective warning modal as required by Section 38
      setSelectedMedia(media);
      setIsWarningModalOpen(true);
    } else {
      if (confirm(`Delete asset "${media.fileName}"?`)) {
        setMediaList(mediaList.filter((m) => m.id !== media.id));
        addToast("Asset removed", `"${media.fileName}" was deleted from storage bucket.`, "info");
      }
    }
  };

  const handleForceDelete = () => {
    if (!selectedMedia) return;
    setMediaList(mediaList.filter((m) => m.id !== selectedMedia.id));
    setIsWarningModalOpen(false);
    addToast("Asset forcefully removed", `Storage asset "${selectedMedia.fileName}" was pruned.`, "warning");
  };

  const handleReplaceAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedia) return;

    setIsReplaceModalOpen(false);
    addToast("Media Asset Replaced", `All ${selectedMedia.usedByStoriesCount} stories now reference the updated asset file.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold text-[#fbf7ef]">
            Media & Asset Storage
          </h1>
          <p className="text-xs text-[#8c91a8]">
            Manage covers, banner art, author portraits, and verify usage dependencies.
          </p>
        </div>

        <button
          onClick={() => addToast("Upload initialized", "Storage upload pipeline ready.", "info")}
          className="button button-primary px-4 py-2 text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <div
            key={media.id}
            className="p-5 rounded-2xl border border-[#21263f] bg-[#0e1022] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Preview Box */}
              <div className="w-full h-40 rounded-xl overflow-hidden border border-[#252a44] relative group">
                <img
                  src={media.previewUrl}
                  alt={media.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-[#e9b65a]">
                  {media.size}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#fbf7ef] truncate">
                  {media.fileName}
                </h3>
                <div className="flex justify-between text-xs text-[#7e849e]">
                  <span>Type: {media.type}</span>
                  <span>Uploaded {media.uploadedAt}</span>
                </div>
              </div>

              {/* Used by Badge */}
              <div className="pt-1">
                {(media.usedByStoriesCount ?? 0) > 0 ? (
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 font-semibold border border-indigo-500/30 flex items-center space-x-1.5 w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Used by {media.usedByStoriesCount} {media.usedByStoriesCount === 1 ? "story" : "stories"}</span>
                  </span>
                ) : (
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#181b2e] text-[#868c9f] w-fit">
                    Unused Asset (Safe to delete)
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#1a1d30] flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setSelectedMedia(media);
                  setIsReplaceModalOpen(true);
                }}
                className="text-[#e9b65a] hover:underline font-semibold flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>

              <button
                onClick={() => handleDeleteClick(media)}
                className="text-[#7e849d] hover:text-rose-400 p-1.5 rounded-lg transition-colors"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Warning Modal (Section 38 Rule) */}
      <UIModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        title="Active Asset Dependency Warning"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-amber-300">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-bold">
                This image is currently used by {selectedMedia?.usedByStoriesCount} stories!
              </strong>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                Deleting &ldquo;{selectedMedia?.fileName}&rdquo; will break public cover artwork and cause visual 404s for active readers. Please replace the asset or update the associated stories first.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => setIsWarningModalOpen(false)}
              className="button button-secondary px-4 py-2 text-xs font-semibold"
            >
              Cancel Safe Action
            </button>
            <button
              onClick={handleForceDelete}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600/20 text-rose-300 border border-rose-600/40 hover:bg-rose-600 hover:text-white transition-colors"
            >
              Force Delete Anyway
            </button>
          </div>
        </div>
      </UIModal>

      {/* Replace Media Modal */}
      <UIModal
        isOpen={isReplaceModalOpen}
        onClose={() => setIsReplaceModalOpen(false)}
        title={`Replace Asset: ${selectedMedia?.fileName}`}
      >
        <form onSubmit={handleReplaceAsset} className="space-y-4 text-xs sm:text-sm">
          <p className="text-xs text-[#8c91a8]">
            Upload a replacement image. The new asset will automatically propagate to all {selectedMedia?.usedByStoriesCount} stories using this file.
          </p>

          <div className="border-2 border-dashed border-[#2b304c] rounded-2xl p-6 text-center space-y-2 hover:border-[#e9b65a]/60 cursor-pointer transition-colors">
            <Upload className="w-8 h-8 mx-auto text-[#e9b65a]" />
            <span className="text-xs font-semibold text-[#fbf7ef] block">
              Drag & Drop new image here or browse
            </span>
            <span className="text-[10px] text-[#6d7287] block">
              PNG, JPG, WebP up to 10MB
            </span>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsReplaceModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8a90a6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button-primary px-5 py-2 text-xs font-semibold"
            >
              Replace Asset
            </button>
          </div>
        </form>
      </UIModal>
    </div>
  );
}
