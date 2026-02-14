"use client";

import React from "react";
import {
    LayoutDashboard,
    Bookmark,
    Settings,
    Search,
    PlusCircle,
    Hash,
    Clock,
    Star,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
    { icon: LayoutDashboard, label: "All Bookmarks", active: true },
    { icon: Star, label: "Favorites", active: false },
    { icon: Clock, label: "Recently Added", active: false },
];

const categories = [
    "Development",
    "Design",
    "Productivity",
    "AI & Machine Learning",
    "Articles",
];

interface SidebarProps {
    onAddNew?: () => void;
}

export const Sidebar = ({ onAddNew }: SidebarProps) => {
    return (
        <aside className="w-72 h-screen glass-dark border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
            <div className="p-8 flex-1 overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-4 mb-10 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Bookmark className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gradient-text tracking-tight">SmartMark</h1>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Premium Account</p>
                    </div>
                </div>

                <button
                    onClick={onAddNew}
                    className="w-full relative group py-4 px-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 transition-all hover:bg-zinc-100 active:scale-[0.97] mb-10 shadow-xl shadow-white/5"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Create New</span>
                    <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="space-y-8">
                    <nav className="space-y-1.5">
                        <h2 className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">
                            Discover
                        </h2>
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all ${item.active
                                    ? "bg-white/10 text-white ring-1 ring-white/10"
                                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-5 h-5 transition-colors ${item.active ? "text-indigo-400" : "group-hover:text-indigo-400"}`} />
                                    <span className="font-semibold text-sm">{item.label}</span>
                                </div>
                                {item.active && (
                                    <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="space-y-1.5">
                        <h2 className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">
                            Categories
                        </h2>
                        <div className="grid grid-cols-1 gap-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-800/50 group-hover:bg-indigo-500/20 transition-colors">
                                            <Hash className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                        <span className="font-medium">{category}</span>
                                    </div>
                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 space-y-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all group">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <Settings className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Settings</span>
                </button>

                <div className="px-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Still working</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium">
                        Developed by <span className="text-zinc-200">Falguni Timande</span>
                    </p>
                </div>
            </div>

        </aside>
    );
};

