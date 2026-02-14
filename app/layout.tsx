import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { BookmarkProvider } from "@/components/BookmarkContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030303] text-zinc-200 min-h-screen relative overflow-x-hidden`}
      >
        {/* Background Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-float" />
          <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-purple-600/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />
          <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-4s' }} />
        </div>

        {/* Noise Overlay */}
        <div className="fixed inset-0 noise pointer-events-none -z-10" />

        <BookmarkProvider>
          <AppShell>
            {children}
          </AppShell>
        </BookmarkProvider>
      </body>

    </html>
  );
}
