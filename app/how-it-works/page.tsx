import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ThemeLink } from "@/components/theme-link";

const steps = [
  {
    number: "1",
    title: "Describe your scene",
    description: "Type what you see. A tense elimination, a golden hour travel montage, a late-night city drive. Use natural language, not keywords. The more specific you are, the better the match.",
    detail: "You can also paste a YouTube URL or upload a video file. The AI analyzes mood, energy, pacing, and emotional arc to understand exactly what your scene needs.",
    icon: "✎",
  },
  {
    number: "2",
    title: "AI matches broadcast-proven music",
    description: "Your scene description is matched against 53,000+ compositions that have actually scored real television. Not stock music tagged with generic keywords.",
    detail: "Each result shows exactly where the track has been placed, why the AI chose it for your scene, and pre-cut versions ready to drop into your timeline.",
    icon: "♪",
  },
  {
    number: "3",
    title: "Download with Content ID protection",
    description: "Every track is fully licensed for your content. No copyright claims. No Content ID flags. No takedowns. Your license covers the platforms in your plan.",
    detail: "Download in your preferred format, drop it into your editor, and publish. You get a license certificate with every download.",
    icon: "↓",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20" style={{ background: "var(--t-color-bg)" }}>
        {/* Hero on surface-low */}
        <section
          className="px-6 text-center"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-20)",
            paddingBottom: "var(--t-space-20)",
          }}
        >
          <h1 className="t-display-md mb-4" style={{ color: "var(--t-color-text)" }}>
            How Tracked works
          </h1>
          <p className="t-body-lg max-w-lg mx-auto" style={{ color: "var(--t-color-text-muted)" }}>
            From scene description to licensed download in under 5 minutes. No browsing. No keyword guessing.
          </p>
        </section>

        {/* Steps — alternating bg / surface-low */}
        {steps.map((step, idx) => (
          <section
            key={step.number}
            className="px-6"
            style={{
              background: idx % 2 === 0 ? "var(--t-color-bg)" : "var(--t-color-surface-low)",
              paddingTop: "var(--t-space-16)",
              paddingBottom: "var(--t-space-16)",
            }}
          >
            <div className="max-w-3xl mx-auto flex gap-8">
              <div className="shrink-0">
                <div
                  className="flex items-center justify-center text-xl"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--t-radius-pill)",
                    background: "color-mix(in srgb, var(--t-color-primary) 10%, transparent)",
                    color: "var(--t-color-primary)",
                  }}
                >
                  {step.icon}
                </div>
              </div>
              <div>
                <p className="t-headline-lg mb-1" style={{ color: "var(--t-color-primary)" }}>
                  Step {step.number}
                </p>
                <h2 className="t-headline-md mb-4" style={{ color: "var(--t-color-text)" }}>
                  {step.title}
                </h2>
                <p className="t-body-lg mb-3" style={{ color: "var(--t-color-text-muted)" }}>
                  {step.description}
                </p>
                <p className="t-body-md" style={{ color: "var(--t-color-text-muted)", opacity: 0.6 }}>
                  {step.detail}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section
          className="text-center px-6"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-16)",
            paddingBottom: "var(--t-space-16)",
          }}
        >
          <ThemeLink href="/">
            <Button size="lg">Describe your scene</Button>
          </ThemeLink>
          <p className="t-body-sm mt-4" style={{ color: "var(--t-color-text-muted)" }}>
            14-day free trial. No credit card required to search.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
