import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Playfair_Display, Manrope, Newsreader, Space_Grotesk, Inter } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio/audio-provider";
import { DevThemeSwitcher } from "@/components/dev-theme-switcher";
import "./globals.css";

/* Cinematic Intelligence fonts */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

/* Warm Editorial fonts */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

/* Precision Utility fonts */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
        data-theme="warm-editorial"
        data-mode="dark"
        className={`${playfair.variable} ${manrope.variable} ${newsreader.variable} ${spaceGrotesk.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <body>
          <PostHogProvider>
            <Suspense>
              <ThemeProvider>
                <AudioProvider>
                  {children}
                  <DevThemeSwitcher />
                </AudioProvider>
              </ThemeProvider>
            </Suspense>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
