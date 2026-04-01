import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio/audio-provider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <html lang="en" className={jakarta.variable}>
        <body className="font-sans antialiased">
          <PostHogProvider>
            <ThemeProvider>
              <AudioProvider>{children}</AudioProvider>
            </ThemeProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
