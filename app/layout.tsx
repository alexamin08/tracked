import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Playfair_Display, Manrope, Newsreader, Space_Grotesk, Inter } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio/audio-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeNameProvider } from "@/components/theme-name-provider";
import "./globals.css";

function getThemeFromHost(): { theme: string; mode: string } {
  try {
    const headersList = headers();
    const host = headersList.get("host") || "";
    if (host.includes("tracked-simple")) return { theme: "simple", mode: "light" };
    if (host.includes("tracked-warm")) return { theme: "warm-editorial", mode: "dark" };
    if (host.includes("tracked-precision")) return { theme: "precision-utility", mode: "dark" };
  } catch {}
  return { theme: "cinematic", mode: "dark" };
}

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
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

/* Warm Editorial fonts */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
  weight: ["400", "500", "600", "700", "800"],
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
  const { theme, mode } = getThemeFromHost();

  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme={theme}
        data-mode={mode}
        className={`${playfair.variable} ${manrope.variable} ${newsreader.variable} ${spaceGrotesk.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <PostHogProvider>
            <Suspense>
              <ThemeProvider>
                <ThemeNameProvider theme={theme}>
                  <AudioProvider>
                    {children}
                    <ThemeSwitcher />
                  </AudioProvider>
                </ThemeNameProvider>
              </ThemeProvider>
            </Suspense>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
