import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchInput } from "@/components/search/search-input";
import { AudioPlayer } from "@/components/audio/audio-player";
import { ThemeLink } from "@/components/theme-link";

const collections = [
  { name: "True Crime", desc: "Tension beds, investigation cues, and suspenseful underscore from real crime television." },
  { name: "Reality", desc: "Competition energy, elimination drama, and emotional reveals from unscripted TV." },
  { name: "Documentary", desc: "Cinematic scoring, reflective beds, and narrative tension for factual storytelling." },
  { name: "Podcast", desc: "Subtle beds, transitions, and atmospheric textures for audio-first content." },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ============================================
            HERO — dramatic headline + double glow
            ============================================ */}
        <section
          className="min-h-[90vh] flex flex-col items-center justify-center px-6 pt-28 relative overflow-hidden"
          style={{ background: "var(--t-color-bg)", paddingBottom: "var(--t-space-20)" }}
        >
          {/* Outer atmospheric glow (wide, very subtle) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "1200px",
              height: "800px",
              background: "radial-gradient(ellipse at center, var(--t-color-primary) 0%, transparent 60%)",
              opacity: "0.05",
            }}
          />
          {/* Inner signature glow (concentrated, bright) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "25%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "700px",
              height: "400px",
              background: "radial-gradient(ellipse at center, var(--t-color-primary) 0%, transparent 65%)",
              opacity: "0.15",
            }}
          />

          <span
            className="t-label-md mb-10 relative z-10"
            style={{
              color: "var(--t-color-primary)",
              padding: "8px 24px",
              borderRadius: "var(--t-radius-pill)",
              background: "color-mix(in srgb, var(--t-color-primary) 8%, transparent)",
            }}
          >
            AI Music Supervisor
          </span>

          {/* Dramatic headline — Newsreader italic, huge */}
          <h1
            className="text-center mb-6 relative z-10"
            style={{
              fontFamily: "var(--t-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--t-color-text)",
            }}
          >
            Describe your scene
          </h1>

          <p
            className="t-body-lg text-center mb-14 max-w-md relative z-10"
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
            className="t-body-lg mt-12 block relative z-10 transition-colors"
            style={{ color: "var(--t-color-text-muted)", fontWeight: 500 }}
          >
            Browse all music →
          </ThemeLink>
        </section>

        {/* ============================================
            STATS BAR — surface-low
            ============================================ */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-12)",
            paddingBottom: "var(--t-space-12)",
          }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 text-center">
            {[
              "42,000+ Compositions",
              "AI Music Supervisor",
              "Content ID Protected",
            ].map((stat) => (
              <p key={stat} className="t-label-md" style={{ color: "var(--t-color-text-muted)" }}>
                {stat}
              </p>
            ))}
          </div>
        </section>

        {/* ============================================
            HOW IT WORKS — bg canvas
            ============================================ */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-bg)",
            paddingTop: "var(--t-space-20)",
            paddingBottom: "var(--t-space-20)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="t-label-md text-center mb-16" style={{ color: "var(--t-color-text-muted)" }}>
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { n: "1", title: "Describe your scene", desc: "Type what you see. Natural language, not keywords. The more specific, the better the match." },
                { n: "2", title: "AI matches your scene", desc: "Matched against music scored for real TV. Scene intelligence, not tag search." },
                { n: "3", title: "Download and use", desc: "Fully licensed for all platforms. Content ID protected. No copyright claims." },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: "var(--t-font-display)",
                      fontSize: "2rem",
                      fontWeight: 300,
                      color: "var(--t-color-primary)",
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </p>
                  <h3 className="t-headline-sm mb-3" style={{ color: "var(--t-color-text)" }}>
                    {step.title}
                  </h3>
                  <p className="t-body-md" style={{ color: "var(--t-color-text-muted)" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            COLLECTIONS — surface-low with surface cards
            ============================================ */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-20)",
            paddingBottom: "var(--t-space-20)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="t-label-md text-center mb-4" style={{ color: "var(--t-color-text-muted)" }}>
              Collections
            </h2>
            <p className="t-body-lg text-center mb-12 max-w-md mx-auto" style={{ color: "var(--t-color-text-muted)" }}>
              Curated by genre. Scored for television.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {collections.map((col) => (
                <div
                  key={col.name}
                  className="hover-lift"
                  style={{
                    background: "var(--t-color-surface)",
                    borderRadius: "var(--t-radius-lg)",
                    padding: "var(--t-space-6)",
                  }}
                >
                  {/* Color swatch */}
                  <div
                    className="mb-4"
                    style={{
                      height: "4px",
                      width: "32px",
                      borderRadius: "var(--t-radius-pill)",
                      background: "var(--t-color-primary)",
                    }}
                  />
                  <h3 className="t-headline-sm mb-2" style={{ color: "var(--t-color-text)" }}>
                    {col.name}
                  </h3>
                  <p className="t-body-md" style={{ color: "var(--t-color-text-muted)" }}>
                    {col.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            PRICING TEASER — back to bg
            ============================================ */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-bg)",
            paddingTop: "var(--t-space-20)",
            paddingBottom: "var(--t-space-20)",
          }}
        >
          <div className="max-w-md mx-auto text-center">
            <h2 className="t-label-md mb-10" style={{ color: "var(--t-color-text-muted)" }}>
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
              <p className="t-label-md mb-3" style={{ color: "var(--t-color-primary)" }}>
                Starter
              </p>
              <p className="mb-1">
                <span
                  style={{
                    fontFamily: "var(--t-font-display)",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    color: "var(--t-color-text)",
                  }}
                >
                  $15
                </span>
                <span className="t-body-lg ml-1" style={{ color: "var(--t-color-text-muted)" }}>/mo</span>
              </p>
              <p className="t-body-md mb-8" style={{ color: "var(--t-color-text-muted)" }}>
                14-day free trial. Cancel anytime.
              </p>

              <ul className="t-body-md space-y-3 text-left" style={{ color: "var(--t-color-text-muted)" }}>
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
