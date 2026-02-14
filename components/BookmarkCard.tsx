"use client";

import React from "react";
import { ExternalLink, Trash2 } from "lucide-react";

interface BookmarkCardProps {
    id: number;
    title: string;
    url: string;
    onDelete: (id: number) => void;
}

export function BookmarkCard({ id, title, url, onDelete }: BookmarkCardProps) {
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this bookmark?")) {
            onDelete(id);
        }
    };

    return (
        <div className="group relative">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-indigo-500/50 hover:bg-zinc-800/40 transition-all card-hover"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                                {title}
                            </h3>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        <p className="text-sm text-zinc-500 truncate font-medium">{url}</p>
                    </div>
                </div>
            </a>

            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-red-500/0 text-zinc-600 hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                title="Delete Bookmark"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

