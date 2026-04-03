import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Playfair_Display, Manrope } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio/audio-provider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tracked — AI Music Supervisor",
  description:
    "Describe your scene. Get matched to broadcast-proven music from 53,000+ compositions. Fully licensed. Content ID protected.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme="cinematic"
        data-mode="dark"
        className={`${playfair.variable} ${manrope.variable}`}
        suppressHydrationWarning
      >
        <body>
          <PostHogProvider>
            <Suspense>
              <ThemeProvider>
                <AudioProvider>
                  {children}
                </AudioProvider>
              </ThemeProvider>
            </Suspense>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
