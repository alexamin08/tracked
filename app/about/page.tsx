import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "53,000+", label: "Compositions" },
  { value: "138,000", label: "Production-ready files" },
  { value: "30s to 5min", label: "Pre-cut versions" },
  { value: "100%", label: "Content ID protected" },
];

const networks = [
  "Netflix", "HBO", "Bravo", "Discovery", "NBC",
  "ABC", "CBS", "FOX", "Hulu", "Peacock",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <section className="hero-gradient px-6 py-20 text-center">
          <h1 className="text-content-on-dark text-3xl md:text-4xl font-light tracking-tight mb-4">
            Broadcast-proven music, AI-powered discovery
          </h1>
          <p className="text-content-on-dark-secondary max-w-xl mx-auto">
            Tracked is a 50/50 joint venture combining AI technology with the
            catalog of Signature Tracks, the broadcast scoring house behind
            major unscripted television.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-content-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16 space-y-6 text-content-secondary leading-relaxed">
          <h2 className="text-xl font-semibold text-content">
            The catalog behind the scenes
          </h2>
          <p>
            Signature Tracks is a broadcast scoring house whose music has
            appeared across Netflix, HBO, Bravo, Discovery, and every major
            network. Their composers write original music specifically for
            television, scored to match the emotional beats of real scenes.
          </p>
          <p>
            That means every track in the Tracked catalog was composed by
            professionals who understand how music works in context. Not
            stock music written to fill a library. Music written to score a
            moment.
          </p>

          <h2 className="text-xl font-semibold text-content pt-4">
            AI that understands scenes, not keywords
          </h2>
          <p>
            Traditional music libraries make you search by keyword or genre.
            &ldquo;Upbeat.&rdquo; &ldquo;Cinematic.&rdquo; These are too
            vague to find the right track for a specific scene.
          </p>
          <p>
            Tracked uses AI trained on real broadcast placement data to match
            your scene description to music that has actually scored similar
            moments on television. When you type &ldquo;tense elimination
            scene in a reality competition,&rdquo; the AI draws on thousands
            of real placements to find the right match.
          </p>

          <h2 className="text-xl font-semibold text-content pt-4">
            Networks and shows
          </h2>
          <div className="flex flex-wrap gap-2">
            {networks.map((network) => (
              <span
                key={network}
                className="px-4 py-1.5 rounded-pill bg-surface-tertiary text-sm text-content-secondary"
              >
                {network}
              </span>
            ))}
          </div>
        </section>

        <section className="text-center pb-8">
          <Link href="/">
            <Button size="lg">Describe your scene</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
