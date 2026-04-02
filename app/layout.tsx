import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio/audio-provider";
import { ThemeSwitcher } from "@/lib/themes/theme-switcher";
import "./globals.css";

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
      <html lang="en" suppressHydrationWarning>
        <body>
          <PostHogProvider>
            <Suspense>
              <ThemeProvider>
                <AudioProvider>
                  {children}
                  <ThemeSwitcher />
                </AudioProvider>
              </ThemeProvider>
            </Suspense>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
