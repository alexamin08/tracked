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
            Broadcast-proven music, AI-powered discovery
          </h1>
          <p className="t-body-lg max-w-xl mx-auto" style={{ color: "var(--t-color-text-muted)" }}>
            Tracked is a 50/50 joint venture combining AI technology with the catalog of Signature Tracks, the broadcast scoring house behind major unscripted television.
          </p>
        </section>

        {/* Stats — cards on surface, canvas is bg */}
        <section className="max-w-4xl mx-auto px-6" style={{ paddingTop: "var(--t-space-16)", paddingBottom: "var(--t-space-16)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  background: "var(--t-color-surface)",
                  borderRadius: "var(--t-radius-lg)",
                  padding: "var(--t-space-6)",
                }}
              >
                <p className="t-headline-md mb-1" style={{ color: "var(--t-color-primary)" }}>{stat.value}</p>
                <p className="t-label-md" style={{ color: "var(--t-color-text-muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Body text on surface-low */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-16)",
            paddingBottom: "var(--t-space-16)",
          }}
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h2 className="t-headline-md mb-3" style={{ color: "var(--t-color-text)" }}>The catalog behind the scenes</h2>
              <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>
                Signature Tracks is a broadcast scoring house whose music has appeared across Netflix, HBO, Bravo, Discovery, and every major network. Their composers write original music specifically for television, scored to match the emotional beats of real scenes.
              </p>
            </div>
            <div>
              <h2 className="t-headline-md mb-3" style={{ color: "var(--t-color-text)" }}>AI that understands scenes, not keywords</h2>
              <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>
                Tracked uses AI trained on real broadcast placement data to match your scene description to music that has actually scored similar moments on television.
              </p>
            </div>
          </div>
        </section>

        {/* Networks — back to bg */}
        <section className="max-w-2xl mx-auto px-6" style={{ paddingTop: "var(--t-space-16)", paddingBottom: "var(--t-space-16)" }}>
          <h2 className="t-headline-md mb-6" style={{ color: "var(--t-color-text)" }}>Networks and shows</h2>
          <div className="flex flex-wrap gap-3">
            {networks.map((network) => (
              <span
                key={network}
                className="t-body-sm px-5 py-2"
                style={{
                  borderRadius: "var(--t-radius-pill)",
                  background: "var(--t-color-surface)",
                  color: "var(--t-color-text-muted)",
                }}
              >
                {network}
              </span>
            ))}
          </div>
        </section>

        {/* CTA on surface-low */}
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
        </section>
      </main>
      <Footer />
    </>
  );
}
