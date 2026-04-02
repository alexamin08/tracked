import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchInput } from "@/components/search/search-input";
import { AudioPlayer } from "@/components/audio/audio-player";
import { ThemeLink } from "@/components/theme-link";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section
          className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 relative"
          style={{ background: "var(--t-color-bg)" }}
        >
          {/* Signature glow behind search */}
          <div className="signature-glow absolute inset-0 pointer-events-none" />

          <span
            className="t-label-md mb-6"
            style={{
              color: "var(--t-color-primary)",
              padding: "6px 16px",
              borderRadius: "var(--t-radius-pill)",
              background: "color-mix(in srgb, var(--t-color-primary) 10%, transparent)",
            }}
          >
            AI Music Supervisor
          </span>

          <h1 className="t-display-lg text-center mb-2" style={{ color: "var(--t-color-text)" }}>
            Describe your scene
          </h1>

          <p className="t-body-lg text-center mb-10" style={{ color: "var(--t-color-text-muted)" }}>
            53,000+ broadcast-proven compositions. Fully licensed. Content ID protected.
          </p>

          <SearchInput />

          <ThemeLink
            href="/search"
            className="t-label-lg mt-8 block"
            style={{ color: "var(--t-color-text-muted)" }}
          >
            Browse all music →
          </ThemeLink>
        </section>

        {/* How it works */}
        <section className="py-20 px-6" style={{ background: "var(--t-color-surface-low)" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="t-label-md text-center mb-12" style={{ color: "var(--t-color-text-muted)" }}>
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: "1", title: "Describe your scene", desc: "Type what you see. A tense elimination, a golden hour montage, a cooking show opener." },
                { n: "2", title: "AI matches your scene", desc: "Matched against music that has actually scored real TV scenes. Not keywords. Scene intelligence." },
                { n: "3", title: "Download and use", desc: "Fully licensed for all platforms. Content ID protected. No copyright claims. Ever." },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <div
                    className="t-headline-lg mx-auto mb-4 flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--t-radius-pill)",
                      background: "color-mix(in srgb, var(--t-color-primary) 12%, transparent)",
                      color: "var(--t-color-primary)",
                    }}
                  >
                    {step.n}
                  </div>
                  <h3 className="t-headline-sm mb-2" style={{ color: "var(--t-color-text)" }}>{step.title}</h3>
                  <p className="t-body-md" style={{ color: "var(--t-color-text-muted)" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6" style={{ background: "var(--t-color-bg)" }}>
          <div className="max-w-md mx-auto text-center">
            <h2 className="t-label-md mb-8" style={{ color: "var(--t-color-text-muted)" }}>
              Pricing
            </h2>

            <div
              className="p-8"
              style={{
                background: "var(--t-color-surface)",
                borderRadius: "var(--t-radius-lg)",
                boxShadow: "var(--t-shadow-ambient)",
              }}
            >
              <p className="t-label-md mb-2" style={{ color: "var(--t-color-primary)" }}>
                Starter
              </p>
              <p className="t-headline-lg mb-1" style={{ color: "var(--t-color-text)" }}>
                $15<span className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>/mo</span>
              </p>
              <p className="t-body-md mb-6" style={{ color: "var(--t-color-text-muted)" }}>
                14-day free trial. Cancel anytime.
              </p>

              <ul className="t-body-md space-y-2 text-left" style={{ color: "var(--t-color-text-muted)" }}>
                <li>Unlimited AI scene matching</li>
                <li>Unlimited downloads</li>
                <li>All 53,000+ compositions</li>
                <li>Fully licensed for all platforms</li>
                <li>Content ID protection</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AudioPlayer />
    </>
  );
}
