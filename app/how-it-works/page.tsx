import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const STEPS = [
  {
    num: "01.",
    title: "Describe your scene",
    description:
      "Type what you see. A tense elimination, a golden hour travel montage, a late-night city drive. Use natural language, not keywords. The more specific you are, the better the match.",
    detail:
      "You can also paste a YouTube URL or upload a video file. The AI analyzes mood, energy, pacing, and emotional arc to understand exactly what your scene needs.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
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
      "Your scene description is matched against 53,000+ compositions that have actually scored real television. Not stock music tagged with generic keywords.",
    detail:
      "Each result shows exactly where the track has been placed, why the AI chose it for your scene, and pre-cut versions ready to drop into your timeline.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    prompts: [],
  },
  {
    num: "03.",
    title: "Download with Content ID protection",
    description:
      "Every track is fully licensed for your content. No copyright claims. No Content ID flags. No takedowns. Your license covers the platforms in your plan.",
    detail:
      "Download in your preferred format, drop it into your editor, and publish. You get a license certificate with every download.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    prompts: [],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <TopNav />

      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112 }}>
        {/* Hero */}
        <header style={{ textAlign: "center", padding: "64px 32px 96px", maxWidth: 800, margin: "0 auto" }}>
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: 16 }}>
            THE PROCESS
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 300, fontStyle: "italic", color: "var(--color-on-surface)" }}>
            How <span style={{ fontStyle: "normal", fontWeight: 700 }}>Tracked</span> Works
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
                <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", color: "var(--color-secondary)", marginBottom: 16 }}>
                  {step.num}
                </span>
                <div style={{ width: 64, height: 64, border: `1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)`, backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, fontStyle: "italic", color: "var(--color-on-surface)", marginBottom: 16 }}>
                  {step.title}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)", marginBottom: 12 }}>
                  {step.description}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-on-surface-variant)", opacity: 0.7 }}>
                  {step.detail}
                </p>

                {/* Example prompts */}
                {step.prompts.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                    {step.prompts.map((p) => (
                      <Link
                        key={p}
                        href={`/search?q=${encodeURIComponent(p)}`}
                        style={{
                          padding: "6px 14px",
                          backgroundColor: "var(--color-surface-container-highest)",
                          border: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--color-on-surface-variant)",
                          textDecoration: "none",
                          transition: "color 150ms ease",
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
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontStyle: "italic", color: "var(--color-on-surface)", marginBottom: 32 }}>
            Ready to find your sound?
          </h2>
          <Link
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              padding: "16px 40px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Describe your scene
          </Link>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", marginTop: 16 }}>
            14-day free trial. No credit card required to search.
          </p>
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
