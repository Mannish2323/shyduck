"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Star, 
  Sparkles, 
  RotateCcw,
  BookOpen
} from "lucide-react";
import { useShyduck } from "@/lib/store";
import { GENRES, LANGUAGES } from "@/lib/mock-data";
import { StoryCard } from "@/components/story-card";
import { ShyduckMascot } from "@/components/shyduck-mascot";

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { stories } = useShyduck();

  // Read URL query params
  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genre") || "All";
  const initialStatus = searchParams.get("status") || "All";
  const initialLanguage = searchParams.get("lang") || "All";
  const initialLength = searchParams.get("length") || "All";
  const initialMinRating = searchParams.get("rating") ? Number(searchParams.get("rating")) : 0;
  const initialSort = searchParams.get("sort") || "popular";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [selectedLength, setSelectedLength] = useState(initialLength);
  const [minRating, setMinRating] = useState<number>(initialMinRating);
  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes externally
  useEffect(() => {
    if (searchParams.get("genre")) setSelectedGenre(searchParams.get("genre")!);
    if (searchParams.get("q")) setSearchQuery(searchParams.get("q")!);
    if (searchParams.get("sort")) setSortBy(searchParams.get("sort")!);
  }, [searchParams]);

  // Update URL state
  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "All" || value === "" || value === "0") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.replace(`/discover?${params.toString()}`, { scroll: false });
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    updateUrlParams({ genre: genre === "All" ? null : genre });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrlParams({ sort: sort === "popular" ? null : sort });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedStatus("All");
    setSelectedLanguage("All");
    setSelectedLength("All");
    setMinRating(0);
    setSortBy("popular");
    router.replace("/discover", { scroll: false });
  };

  // Filter logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = story.title.toLowerCase().includes(q);
        const matchAuthor = (story.author?.name || story.authorName || "").toLowerCase().includes(q);
        const matchDesc = story.description.toLowerCase().includes(q);
        const matchTags = story.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchAuthor && !matchDesc && !matchTags) {
          return false;
        }
      }

      // 2. Genre
      if (selectedGenre !== "All" && story.genre.toLowerCase() !== selectedGenre.toLowerCase()) {
        return false;
      }

      // 3. Status
      if (selectedStatus !== "All" && story.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      // 4. Language
      if (selectedLanguage !== "All" && story.language.toLowerCase() !== selectedLanguage.toLowerCase()) {
        return false;
      }

      // 5. Length
      if (selectedLength !== "All") {
        const count = story.chaptersCount;
        if (selectedLength === "Short" && count > 5) return false;
        if (selectedLength === "Medium" && (count < 6 || count > 15)) return false;
        if (selectedLength === "Long" && count <= 15) return false;
      }

      // 6. Rating
      if (minRating > 0 && story.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return b.readsCount - a.readsCount;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "newest") {
        const dateB = new Date(b.createdAt || b.publishedAt || 0).getTime();
        const dateA = new Date(a.createdAt || a.publishedAt || 0).getTime();
        return dateB - dateA;
      }
      if (sortBy === "updated") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === "trending") {
        return (b.readsCount * b.rating) - (a.readsCount * a.rating);
      }
      return 0;
    });
  }, [stories, searchQuery, selectedGenre, selectedStatus, selectedLanguage, selectedLength, minRating, sortBy]);

  const hasActiveFilters = 
    searchQuery !== "" || 
    selectedGenre !== "All" || 
    selectedStatus !== "All" || 
    selectedLanguage !== "All" || 
    selectedLength !== "All" || 
    minRating > 0;

  return (
    <div className="w-full min-h-screen py-10 shell space-y-8">
      {/* ========================================================================= */}
      {/* 1. DISCOVER HERO & SEARCH */}
      {/* ========================================================================= */}
      <div className="space-y-4 max-w-3xl">
        <div className="eyebrow flex items-center space-x-1.5 text-[#e9b65a]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Grand Library of Independent Tales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#fbf7ef] tracking-tight">
          Discover <span className="text-[#e9b65a] italic">New Worlds.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9ea3ba] leading-relaxed">
          Explore hundreds of original Indian web novels, epic anime-inspired serials, and speculative fiction crafted with heart.
        </p>

        {/* Global Search Bar with instant reaction */}
        <div className="relative pt-2">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#737891]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateUrlParams({ q: e.target.value });
              }}
              placeholder="Search stories by title, author name, world lore, or tags..."
              className="w-full bg-[#131525] text-[#fbf7ef] pl-12 pr-10 py-3.5 rounded-2xl border border-[#262a42] focus:border-[#e9b65a] focus:ring-2 focus:ring-[#e9b65a]/20 outline-none text-sm transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  updateUrlParams({ q: null });
                }}
                className="absolute right-3.5 p-1 rounded-full text-[#7d829c] hover:text-[#fbf7ef] hover:bg-[#202438]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTROLS BAR (Mobile filter trigger, Sort dropdown, Grid/List toggle) */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#1e2238] bg-[#0c0d18]/40">
        <div className="flex items-center space-x-3">
          {/* Mobile Filter Sheet Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden button button-secondary px-3.5 py-2 text-xs flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#e9b65a]" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>

          <span className="text-xs text-[#8c92a9]">
            Showing <strong className="text-[#fbf7ef] font-semibold">{filteredStories.length}</strong> of {stories.length} stories
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="hidden sm:flex items-center space-x-1 text-xs text-[#e9b65a] hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort By Select */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#787d96] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-[#141626] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-1.5 outline-none focus:border-[#e9b65a] text-xs font-medium cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="trending">Trending Now</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Releases</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#141626] border border-[#272c44] rounded-xl p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#e9b65a] text-[#0a0b14]" : "text-[#7f849c] hover:text-[#fbf7ef]"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#e9b65a] text-[#0a0b14]" : "text-[#7f849c] hover:text-[#fbf7ef]"}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN LAYOUT (Filter Sidebar + Story Results) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* ==================== LEFT SIDEBAR: FILTERS ==================== */}
        <aside className={`
          lg:col-span-1 space-y-6 bg-[#0e101f] border border-[#21253c] p-6 rounded-2xl
          ${isMobileFilterOpen ? "block" : "hidden lg:block"}
        `}>
          <div className="flex items-center justify-between pb-4 border-b border-[#21253c]">
            <div className="flex items-center space-x-2 text-sm font-bold text-[#fbf7ef]">
              <Filter className="w-4 h-4 text-[#e9b65a]" />
              <span>Refine Worlds</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] text-[#e9b65a] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Genre Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7e849e] block">
              Genre
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleGenreChange("All")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedGenre === "All"
                    ? "bg-[#e9b65a] text-[#0a0b14] font-semibold"
                    : "bg-[#15172a] text-[#9da3ba] hover:bg-[#1d2036]"
                }`}
              >
                All
              </button>
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => handleGenreChange(g)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedGenre.toLowerCase() === g.toLowerCase()
                      ? "bg-[#e9b65a] text-[#0a0b14] font-semibold"
                      : "bg-[#15172a] text-[#9da3ba] hover:bg-[#1d2036]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#1e2238]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7e849e] block">
              Story Status
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {["All", "Ongoing", "Completed", "Hiatus"].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setSelectedStatus(st);
                    updateUrlParams({ status: st });
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium text-left transition-all ${
                    selectedStatus.toLowerCase() === st.toLowerCase()
                      ? "bg-[#e9b65a]/20 text-[#e9b65a] border border-[#e9b65a]/40 font-semibold"
                      : "bg-[#15172a] text-[#9da3ba] hover:bg-[#1c1f36]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#1e2238]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7e849e] block">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                updateUrlParams({ lang: e.target.value });
              }}
              className="w-full bg-[#15172a] text-[#e2e6f5] border border-[#272c44] rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-[#e9b65a]"
            >
              <option value="All">All Languages (Subcontinent)</option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Length Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#1e2238]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7e849e] block">
              Length
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {["All", "Short", "Medium", "Long"].map((len) => (
                <button
                  key={len}
                  onClick={() => {
                    setSelectedLength(len);
                    updateUrlParams({ length: len });
                  }}
                  className={`px-2 py-1.5 rounded-lg text-center font-medium transition-all ${
                    selectedLength === len
                      ? "bg-[#e9b65a]/20 text-[#e9b65a] border border-[#e9b65a]/40 font-semibold"
                      : "bg-[#15172a] text-[#9da3ba] hover:bg-[#1c1f36]"
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#71768e]">
              Short (&lt; 5 ch) • Medium (6-15 ch) • Long (15+ ch)
            </p>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2.5 pt-4 border-t border-[#1e2238]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7e849e] block">
              Minimum Rating
            </label>
            <div className="flex items-center space-x-1 text-xs">
              {[0, 3.5, 4.0, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setMinRating(r);
                    updateUrlParams({ rating: r.toString() });
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center space-x-1 transition-all ${
                    minRating === r
                      ? "bg-[#e9b65a] text-[#0a0b14] font-bold"
                      : "bg-[#15172a] text-[#9da3ba] hover:bg-[#1c1f36]"
                  }`}
                >
                  {r === 0 ? (
                    <span>Any</span>
                  ) : (
                    <>
                      <span>{r}+</span>
                      <Star className="w-3 h-3 fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ==================== RIGHT CONTENT: STORY RESULTS ==================== */}
        <section className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs text-[#71768f]">Active Filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-[#e9b65a]/15 text-[#e9b65a] border border-[#e9b65a]/30">
                  <span>Query: &quot;{searchQuery}&quot;</span>
                  <button onClick={() => { setSearchQuery(""); updateUrlParams({ q: null }); }}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}
              {selectedGenre !== "All" && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-[#e9b65a]/15 text-[#e9b65a] border border-[#e9b65a]/30">
                  <span>Genre: {selectedGenre}</span>
                  <button onClick={() => handleGenreChange("All")}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}
              {selectedStatus !== "All" && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-[#1f2338] text-[#c0c6dc] border border-[#2f3552]">
                  <span>Status: {selectedStatus}</span>
                  <button onClick={() => { setSelectedStatus("All"); updateUrlParams({ status: null }); }}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}
              {selectedLanguage !== "All" && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-[#1f2338] text-[#c0c6dc] border border-[#2f3552]">
                  <span>Lang: {selectedLanguage}</span>
                  <button onClick={() => { setSelectedLanguage("All"); updateUrlParams({ lang: null }); }}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-[#1f2338] text-[#c0c6dc] border border-[#2f3552]">
                  <span>Rating: {minRating}+ ★</span>
                  <button onClick={() => { setMinRating(0); updateUrlParams({ rating: null }); }}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Display */}
          {filteredStories.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col space-y-4"
            }>
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  variant={viewMode === "grid" ? "standard" : "compact"}
                />
              ))}
            </div>
          ) : (
            /* Empty State as explicitly specified in Section 11 & 46 */
            <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0e101f] border border-[#22263d] rounded-2xl space-y-5">
              <ShyduckMascot mood="curious" size={72} />
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-xl font-serif font-bold text-[#fbf7ef]">
                  We couldn&apos;t find that world yet.
                </h3>
                <p className="text-xs sm:text-sm text-[#8c91a8]">
                  No stories matched your current combination of search terms and filters. Perhaps you are meant to write it?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleClearFilters}
                  className="button button-primary px-5 py-2.5 text-xs font-semibold flex items-center space-x-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
                <button
                  onClick={() => router.push("/write/stories/new")}
                  className="button button-secondary px-5 py-2.5 text-xs font-semibold"
                >
                  <span>Write This Story Instead</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e9b65a]" />
      </div>
    }>
      <DiscoverContent />
    </Suspense>
  );
}
