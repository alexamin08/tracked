import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const STATS = [
  { value: "53,000+", label: "Compositions" },
  { value: "140,000", label: "Production files" },
  { value: "2008", label: "Scoring since" },
  { value: "100%", label: "Content ID protected" },
];

const NETWORKS = ["Netflix", "HBO", "Bravo", "Discovery", "NBC", "ABC", "CBS", "FOX", "Hulu", "Peacock"];

export default function AboutPage() {
  return (
    <>
      <TopNav />

      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112 }}>
        {/* Hero */}
        <header style={{ textAlign: "center", padding: "64px 32px 80px", maxWidth: 800, margin: "0 auto" }}>
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: 16 }}>
            THE PLATFORM
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 300, fontStyle: "italic", color: "var(--color-on-surface)" }}>
            Broadcast-Proven Music, <span style={{ fontStyle: "normal", fontWeight: 700 }}>AI-Powered Discovery</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)", marginTop: 20, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Tracked is a 50/50 joint venture combining AI technology with the catalog of Signature Tracks, the broadcast scoring house behind major unscripted television.
          </p>
        </header>

        {/* Stats bar */}
        <section style={{ backgroundColor: "var(--color-surface-container)", borderTop: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)", borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)", padding: "32px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "var(--color-primary)", letterSpacing: "-0.03em" }}>{stat.value}</span>
                <br />
                <span style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Body sections */}
        <section style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, fontStyle: "italic", color: "var(--color-on-surface)", marginBottom: 16 }}>
              The catalog behind the scenes
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>
              Signature Tracks is a broadcast scoring house whose music has appeared across Netflix, HBO, Bravo, Discovery, and every major network. Their composers write original music specifically for television, scored to match the emotional beats of real scenes.
            </p>
          </div>
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, fontStyle: "italic", color: "var(--color-on-surface)", marginBottom: 16 }}>
              AI that understands scenes, not keywords
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>
              Tracked uses AI trained on real broadcast placement data to match your scene description to music that has actually scored similar moments on television. Every match comes with an AI explanation of why it fits.
            </p>
          </div>

          {/* Networks */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, fontStyle: "italic", color: "var(--color-on-surface)", marginBottom: 20 }}>
              Networks and shows
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {NETWORKS.map((n) => (
                <span key={n} style={{ padding: "6px 16px", backgroundColor: "var(--color-surface-container)", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)" }}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "var(--color-surface-container-lowest)", padding: "96px 32px", textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-block", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "16px 40px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            Describe your scene
          </Link>
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
