import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ThemeLink } from "@/components/theme-link";

const stats = [
  { value: "53,000+", label: "Compositions" },
  { value: "138,000", label: "Production-ready files" },
  { value: "30s to 5min", label: "Pre-cut versions" },
  { value: "100%", label: "Content ID protected" },
];

const networks = ["Netflix", "HBO", "Bravo", "Discovery", "NBC", "ABC", "CBS", "FOX", "Hulu", "Peacock"];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <section className="px-6 py-20 text-center" style={{ background: "var(--t-color-surface-low)" }}>
          <h1 className="t-display-md mb-4" style={{ color: "var(--t-color-text)" }}>
            Broadcast-proven music, AI-powered discovery
          </h1>
          <p className="t-body-lg max-w-xl mx-auto" style={{ color: "var(--t-color-text-muted)" }}>
            Tracked is a 50/50 joint venture combining AI technology with the catalog of Signature Tracks, the broadcast scoring house behind major unscripted television.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16" style={{ background: "var(--t-color-bg)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="t-headline-md mb-1" style={{ color: "var(--t-color-primary)" }}>{stat.value}</p>
                <p className="t-label-md" style={{ color: "var(--t-color-text-muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16 space-y-6" style={{ background: "var(--t-color-bg)" }}>
          <h2 className="t-headline-md" style={{ color: "var(--t-color-text)" }}>The catalog behind the scenes</h2>
          <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>
            Signature Tracks is a broadcast scoring house whose music has appeared across Netflix, HBO, Bravo, Discovery, and every major network. Their composers write original music specifically for television, scored to match the emotional beats of real scenes.
          </p>
          <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>
            That means every track in the Tracked catalog was composed by professionals who understand how music works in context. Not stock music written to fill a library. Music written to score a moment.
          </p>

          <h2 className="t-headline-md pt-4" style={{ color: "var(--t-color-text)" }}>AI that understands scenes, not keywords</h2>
          <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>
            Traditional music libraries make you search by keyword or genre. &ldquo;Upbeat.&rdquo; &ldquo;Cinematic.&rdquo; These are too vague to find the right track for a specific scene.
          </p>
          <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>
            Tracked uses AI trained on real broadcast placement data to match your scene description to music that has actually scored similar moments on television.
          </p>

          <h2 className="t-headline-md pt-4" style={{ color: "var(--t-color-text)" }}>Networks and shows</h2>
          <div className="flex flex-wrap gap-2">
            {networks.map((network) => (
              <span
                key={network}
                className="t-body-sm px-4 py-1.5"
                style={{
                  borderRadius: "var(--t-radius-pill)",
                  background: "var(--t-color-surface-high)",
                  color: "var(--t-color-text-muted)",
                }}
              >
                {network}
              </span>
            ))}
          </div>
        </section>

        <section className="text-center pb-8" style={{ background: "var(--t-color-bg)" }}>
          <ThemeLink href="/">
            <Button size="lg">Describe your scene</Button>
          </ThemeLink>
        </section>
      </main>
      <Footer />
    </>
  );
}
