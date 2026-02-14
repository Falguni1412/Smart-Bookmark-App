"use client";

import { Sidebar } from "./Sidebar";
import { AddBookmarkModal } from "./AddBookmarkModal";
import { useBookmarks } from "./BookmarkContext";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
    const { addBookmark, isModalOpen, openModal, closeModal } = useBookmarks();

    return (
        <div className="flex">
            <Sidebar onAddNew={openModal} />
            <main className="flex-1 ml-72 min-h-screen p-8">
                {children}
            </main>


            <AddBookmarkModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAdd={(bookmark) => {
                    addBookmark(bookmark);
                    closeModal();
                }}
            />
        </div>
    );
};
