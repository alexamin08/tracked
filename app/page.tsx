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
        {/* Hero — bg canvas with signature glow */}
        <section
          className="min-h-[80vh] flex flex-col items-center justify-center px-6 pt-24 relative overflow-hidden"
          style={{
            background: "var(--t-color-bg)",
            paddingBottom: "var(--t-space-16)",
          }}
        >
          {/* Signature glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "500px",
              background: `radial-gradient(ellipse at center, var(--t-color-primary) 0%, transparent 70%)`,
              opacity: "var(--t-glow-opacity)",
            }}
          />

          <span
            className="t-label-md mb-8 relative z-10"
            style={{
              color: "var(--t-color-primary)",
              padding: "8px 20px",
              borderRadius: "var(--t-radius-pill)",
              background: "color-mix(in srgb, var(--t-color-primary) 8%, transparent)",
            }}
          >
            AI Music Supervisor
          </span>

          <h1
            className="t-display-lg text-center mb-4 relative z-10"
            style={{ color: "var(--t-color-text)" }}
          >
            Describe your scene
          </h1>

          <p
            className="t-body-lg text-center mb-12 max-w-md relative z-10"
            style={{ color: "var(--t-color-text-muted)" }}
          >
            53,000+ broadcast-proven compositions. Fully licensed. Content ID
            protected.
          </p>

          <div className="relative z-10 w-full flex flex-col items-center">
            <SearchInput />
          </div>

          <ThemeLink
            href="/search"
            className="t-label-lg mt-10 block relative z-10"
            style={{ color: "var(--t-color-text-muted)" }}
          >
            Browse all music →
          </ThemeLink>
        </section>

        {/* How it works — surface-low for tonal shift */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-20)",
            paddingBottom: "var(--t-space-20)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="t-label-md text-center mb-16"
              style={{ color: "var(--t-color-text-muted)" }}
            >
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  n: "1",
                  title: "Describe your scene",
                  desc: "Type what you see. A tense elimination, a golden hour montage, a cooking show opener.",
                },
                {
                  n: "2",
                  title: "AI matches your scene",
                  desc: "Matched against music that has actually scored real TV scenes. Not keywords. Scene intelligence.",
                },
                {
                  n: "3",
                  title: "Download and use",
                  desc: "Fully licensed for all platforms. Content ID protected. No copyright claims. Ever.",
                },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <div
                    className="t-headline-lg mx-auto mb-5 flex items-center justify-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "var(--t-radius-pill)",
                      background:
                        "color-mix(in srgb, var(--t-color-primary) 10%, transparent)",
                      color: "var(--t-color-primary)",
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    className="t-headline-sm mb-3"
                    style={{ color: "var(--t-color-text)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="t-body-md"
                    style={{ color: "var(--t-color-text-muted)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser — back to bg */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-bg)",
            paddingTop: "var(--t-space-20)",
            paddingBottom: "var(--t-space-20)",
          }}
        >
          <div className="max-w-md mx-auto text-center">
            <h2
              className="t-label-md mb-10"
              style={{ color: "var(--t-color-text-muted)" }}
            >
              Pricing
            </h2>

            <div
              style={{
                background: "var(--t-color-surface)",
                borderRadius: "var(--t-radius-lg)",
                padding: "var(--t-space-8)",
                boxShadow: "var(--t-shadow-ambient)",
              }}
            >
              <p
                className="t-label-md mb-3"
                style={{ color: "var(--t-color-primary)" }}
              >
                Starter
              </p>
              <p className="mb-1">
                <span
                  className="t-display-md"
                  style={{ color: "var(--t-color-text)" }}
                >
                  $15
                </span>
                <span
                  className="t-body-lg ml-1"
                  style={{ color: "var(--t-color-text-muted)" }}
                >
                  /mo
                </span>
              </p>
              <p
                className="t-body-md mb-8"
                style={{ color: "var(--t-color-text-muted)" }}
              >
                14-day free trial. Cancel anytime.
              </p>

              <ul
                className="t-body-md space-y-3 text-left"
                style={{ color: "var(--t-color-text-muted)" }}
              >
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
