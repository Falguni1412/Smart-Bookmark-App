"use client";

import { useState } from "react";
import { X, Save, Link2, Type, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface BookmarkData {
    title: string;
    url: string;
}

interface AddBookmarkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (bookmark: BookmarkData) => void;
}

export function AddBookmarkModal({ isOpen, onClose, onAdd }: AddBookmarkModalProps) {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock delay/processing
        await new Promise(resolve => setTimeout(resolve, 500));

        onAdd({
            title: title || url, // Fallback to URL if title is empty
            url,
        });

        setUrl("");
        setTitle("");
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] w-full max-w-md shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden relative"
                >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <PlusCircle className="w-5 h-5 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">New Bookmark</h3>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-zinc-500 hover:text-white transition-all active:scale-95">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-2.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Source URL</label>
                            <div className="relative group">
                                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="url"
                                    required
                                    placeholder="https://awesome-resource.com"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 outline-none transition-all placeholder-zinc-700 font-medium"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Display Title</label>
                            <div className="relative group">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder="The Future of AI Design"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 outline-none transition-all placeholder-zinc-700 font-medium"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3.5 rounded-2xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all active:scale-[0.98]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[1.5] px-4 py-3.5 bg-white text-black rounded-2xl text-sm font-bold hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-white/5"
                            >
                                {loading ? (
                                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Save Resource</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

        </AnimatePresence>
    );
}
