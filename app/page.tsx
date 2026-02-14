"use client";

import React, { useState } from "react";
import { Search, Filter, Grid, List as ListIcon, SlidersHorizontal, Sparkles } from "lucide-react";
import { BookmarkCard } from "@/components/BookmarkCard";
import { useBookmarks } from "@/components/BookmarkContext";

export default function Home() {
  const { bookmarks, openModal, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter bookmarks based on search
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const q = searchQuery.toLowerCase();
    return (
      bookmark.title.toLowerCase().includes(q) ||
      bookmark.url.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Your Bookmarks
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </h2>
          <p className="text-zinc-500 mt-1">Manage and access your saved links.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              className="bg-zinc-900 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-white placeholder-zinc-600"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between py-2 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-white pb-2 border-b-2 border-indigo-500 px-1">
            All
          </button>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-indigo-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-indigo-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {filteredBookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id!}
            title={bookmark.title}
            url={bookmark.url}
            onDelete={removeBookmark}
          />
        ))}


        {/* Empty State / Add Card */}
        {filteredBookmarks.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500">
            <div className="w-16 h-16 rounded-full bg-zinc-900/50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-lg font-medium">No bookmarks found</p>
            <p className="text-sm opacity-60">Try adjusting your search query or add a new one.</p>
            <button
              onClick={openModal}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Add New Bookmark
            </button>
          </div>
        ) : (
          <button
            onClick={openModal}
            className="h-full min-h-[140px] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 text-zinc-500 hover:border-indigo-500/40 hover:text-indigo-400 transition-all group p-8"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
              <Filter className="w-6 h-6" />
            </div>
            <span className="font-medium">Add New Bookmark</span>
          </button>
        )}
      </div>
    </div>
  );
}
