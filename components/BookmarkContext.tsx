"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export interface BookmarkData {
    id?: number;
    title: string;
    url: string;
    user_id?: string;
}

interface BookmarkContextType {
    bookmarks: BookmarkData[];
    addBookmark: (bookmark: BookmarkData) => Promise<void>;
    removeBookmark: (id: number) => Promise<void>;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
    const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        // Initial fetch
        const fetchBookmarks = async () => {
            const { data } = await supabase.from('bookmarks').select('*').order('created_at', { ascending: false });
            if (data) setBookmarks(data);
        };

        fetchBookmarks();

        // Real-time subscription
        const channel = supabase
            .channel('realtime bookmarks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bookmarks' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setBookmarks((prev) => [payload.new as BookmarkData, ...prev]);
                } else if (payload.eventType === 'DELETE') {
                    setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const addBookmark = async (bookmark: BookmarkData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from('bookmarks').insert({
            title: bookmark.title,
            url: bookmark.url,
            user_id: user.id
        });
    };

    const removeBookmark = async (id: number) => {
        await supabase.from('bookmarks').delete().eq('id', id);
    };


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isModalOpen, openModal, closeModal }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error("useBookmarks must be used within a BookmarkProvider");
    }
    return context;
};
