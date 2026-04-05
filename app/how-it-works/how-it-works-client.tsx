"use client";

import Link from "next/link";
import { useActiveTheme } from "@/hooks/useActiveTheme";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";
import { SimpleNav } from "@/components/simple/SimpleNav";
import { WENav } from "@/components/warm-editorial/WENav";
import { PUNav } from "@/components/precision-utility/PUNav";

function ThemeNav({ theme }: { theme: string }) {
  switch (theme) {
    case "simple": return <SimpleNav />;
    case "warm-editorial": return <WENav />;
    case "precision-utility": return <PUNav />;
    default: return <TopNav />;
  }
}

const STEPS = [
  {
    num: "01.",
    title: "Describe your scene",
    description:
      "Type what you see. A tense elimination, a golden hour travel montage, a late-night city drive. Use natural language, not keywords. The more specific you are, the better the match.",
    detail:
      "You can also paste a YouTube URL or upload a video file. The AI analyzes mood, energy, pacing, and emotional arc to understand exactly what your scene needs.",
    iconName: "auto_awesome",
    prompts: [
      "tense elimination scene, reality competition",
      "golden hour travel montage, acoustic warmth",
      "late night city driving, moody electronic",
    ],
  },
  {
    num: "02.",
    title: "AI matches broadcast-proven music",
    description:
      "Your scene description is matched against 42,000+ compositions that have actually scored real television. Not stock music tagged with generic keywords.",
    detail:
      "Each result shows exactly where the track has been placed, why the AI chose it for your scene, and pre-cut versions ready to drop into your timeline.",
    iconName: "filter_list",
    prompts: [],
  },
  {
    num: "03.",
    title: "Download with Content ID protection",
    description:
      "Every track is fully licensed for your content. No copyright claims. No Content ID flags. No takedowns. Your license covers the platforms in your plan.",
    detail:
      "Download in your preferred format, drop it into your editor, and publish. You get a license certificate with every download.",
    iconName: "download",
    prompts: [],
  },
];

export function HowItWorksClient() {
  const theme = useActiveTheme();
  const isCinematic = theme === "cinematic";
  const isSM = theme === "simple";
  const navPaddingTop = isSM ? 56 : theme === "precision-utility" ? 64 : 112;

  return (
    <>
      <ThemeNav theme={theme} />

      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: navPaddingTop }}>
        {/* Hero */}
        <header style={{ textAlign: "center", padding: "64px 32px 96px", maxWidth: 800, margin: "0 auto" }}>
          {!isSM && (
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: 16 }}>
              THE PROCESS
            </span>
          )}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: isSM ? 800 : 300,
            fontStyle: isSM ? "normal" : "italic",
            color: "var(--color-on-surface)",
            letterSpacing: isSM ? "-0.02em" : undefined,
          }}>
            {isSM ? (
              "How Tracked Works"
            ) : (
              <>How <span style={{ fontStyle: "normal", fontWeight: 700 }}>Tracked</span> Works</>
            )}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)", marginTop: 20, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            From scene description to licensed download in under 5 minutes. No browsing. No keyword guessing.
          </p>
        </header>

        {/* Steps */}
        {STEPS.map((step, idx) => (
          <section
            key={step.num}
            style={{
              backgroundColor: idx % 2 === 0 ? "var(--color-surface-container)" : "var(--color-surface)",
              padding: "96px 32px",
            }}
          >
            <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 48 }}>
              {/* Icon + number */}
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: isSM ? 700 : 600,
                  letterSpacing: "0.06em",
                  color: isSM ? "#0053DB" : "var(--color-secondary)",
                  marginBottom: 16,
                }}>
                  {step.num}
                </span>
                <div style={{
                  width: isSM ? 48 : 64,
                  height: isSM ? 48 : 64,
                  borderRadius: isSM ? 8 : 0,
                  backgroundColor: isSM ? "#DBE1FF" : "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                  border: isSM ? "none" : "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isSM ? "#0048BF" : "var(--color-primary)",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{step.iconName}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isSM ? 18 : 24,
                  fontWeight: 700,
                  fontStyle: isSM ? "normal" : "italic",
                  color: "var(--color-on-surface)",
                  marginBottom: 16,
                }}>
                  {step.title}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)", marginBottom: 12 }}>
                  {step.description}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-on-surface-variant)", opacity: 0.7 }}>
                  {step.detail}
                </p>

                {step.prompts.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                    {step.prompts.map((p) => (
                      <Link
                        key={p}
                        href={`/search?q=${encodeURIComponent(p)}`}
                        style={{
                          padding: isSM ? "6px 16px" : "6px 14px",
                          borderRadius: isSM ? 9999 : 0,
                          backgroundColor: isSM ? "#EBEEEF" : "var(--color-surface-container-highest)",
                          border: isSM ? "none" : "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                          fontFamily: "var(--font-body)",
                          fontSize: isSM ? 14 : 11,
                          fontWeight: 500,
                          letterSpacing: isSM ? undefined : "0.08em",
                          textTransform: isSM ? undefined : ("uppercase" as const),
                          color: isSM ? "#5A6061" : "var(--color-on-surface-variant)",
                          textDecoration: "none",
                        }}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section style={{ backgroundColor: "var(--color-surface-container-lowest)", padding: "96px 32px", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: isSM ? 700 : undefined,
            fontStyle: isSM ? "normal" : "italic",
            color: "var(--color-on-surface)",
            marginBottom: 32,
          }}>
            Ready to find your sound?
          </h2>
          <Link
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: isSM ? "#0053DB" : "var(--color-primary)",
              color: isSM ? "#FFFFFF" : "var(--color-on-primary)",
              padding: "16px 40px",
              borderRadius: isSM ? 8 : 0,
              fontFamily: "var(--font-body)",
              fontSize: isSM ? 14 : 12,
              fontWeight: 700,
              letterSpacing: isSM ? undefined : "0.2em",
              textTransform: isSM ? undefined : ("uppercase" as const),
              textDecoration: "none",
            }}
          >
            Describe your scene
          </Link>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", marginTop: 16 }}>
            14-day free trial. Credit card required at signup.
          </p>
        </section>
      </main>

      {isCinematic && <Footer />}

      {/* SM footer */}
      {isSM && (
        <footer style={{ backgroundColor: "#EBEEEF", padding: "64px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(173,179,180,0.20)", paddingBottom: 48, flexWrap: "wrap", gap: 24 }}>
              <div>
                <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.05em", color: "#2D3435", display: "block", marginBottom: 8 }}>Tracked</span>
                <p style={{ fontSize: 14, color: "#5A6061" }}>Professional scoring for the modern broadcast era.</p>
              </div>
              <div style={{ display: "flex", gap: 32 }}>
                {["Catalog", "Licensing", "Privacy", "Terms"].map((link) => (
                  <a key={link} href="#" style={{ fontSize: 14, fontWeight: 500, color: "#5A6061", textDecoration: "none" }}>{link}</a>
                ))}
              </div>
            </div>
            <div style={{ paddingTop: 32 }}>
              <p style={{ fontSize: 12, color: "rgba(90,96,97,0.60)" }}>&copy; 2026 Tracked Music Group. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}

      <FloatingPlayer />
    </>
  );
}
