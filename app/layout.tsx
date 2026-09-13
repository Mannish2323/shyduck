import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ShyduckProvider } from "@/lib/store";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/site-footer";
import { SearchModal } from "@/components/search-modal";
import { ToastContainer } from "@/components/toast-container";

export const metadata: Metadata = {
  title: "Shyduck Tales — Where Stories Come Alive | India's Storyverse",
  description: "Discover original novels, anime-inspired stories, and unforgettable fictional worlds created by independent Indian storytellers. Write. Publish. Read. Build a World.",
  keywords: ["novels", "stories", "web fiction", "anime story", "fantasy novels", "indian writers", "storytelling", "shyduck"],
  authors: [{ name: "Shyduck Tales Team" }],
  creator: "Shyduck Tales",
  openGraph: {
    title: "Shyduck Tales — Where Stories Come Alive",
    description: "Write, publish, discover, and read original Indian fiction, fantasy, and anime-inspired novels.",
    siteName: "Shyduck Tales",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0b14] text-[#fbf7ef] antialiased selection:bg-[#e9b65a]/25 selection:text-[#e9b65a]">
        <ShyduckProvider>
          {/* Header */}
          <SiteHeader />

          {/* Main content area */}
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>

          {/* Global Footer */}
          <SiteFooter />

          {/* Mobile Bottom Navigation */}
          <MobileNav />

          {/* Global Search Overlay (Cmd+K) */}
          <SearchModal />

          {/* Global Notification Toasts */}
          <ToastContainer />
        </ShyduckProvider>
      </body>
    </html>
  );
}
