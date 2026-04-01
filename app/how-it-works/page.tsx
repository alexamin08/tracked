import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Describe your scene",
    description:
      "Type what you see. A tense elimination, a golden hour travel montage, a late-night city drive. Use natural language, not keywords. The more specific you are, the better the match.",
    detail:
      "You can also paste a YouTube URL or upload a video file. The AI analyzes mood, energy, pacing, and emotional arc to understand exactly what your scene needs.",
    icon: "✎",
  },
  {
    number: "2",
    title: "AI matches broadcast-proven music",
    description:
      "Your scene description is matched against 53,000+ compositions that have actually scored real television. Not stock music tagged with generic keywords. Music that has been placed by professional music supervisors on shows across Netflix, HBO, Bravo, and Discovery.",
    detail:
      "Each result shows exactly where the track has been placed, why the AI chose it for your scene, and pre-cut versions ready to drop into your timeline (30s, 60s, stingers, bumpers).",
    icon: "♪",
  },
  {
    number: "3",
    title: "Download with Content ID protection",
    description:
      "Every track is fully licensed for your content. No copyright claims. No Content ID flags. No takedowns. Your license covers the platforms in your plan, and Signature Tracks handles the Content ID whitelisting.",
    detail:
      "Download in your preferred format, drop it into your editor, and publish. The licensing paperwork is handled. You get a license certificate with every download.",
    icon: "↓",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-surface-dark via-surface-dark-mid to-surface-dark px-6 py-20 text-center">
          <h1 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-4">
            How Tracked works
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">
            From scene description to licensed download in under 5 minutes.
            No browsing. No keyword guessing. No copyright risk.
          </p>
        </section>

        {/* Steps */}
        <section className="max-w-3xl mx-auto px-6 py-16 space-y-16">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-pill bg-azure-50 text-azure flex items-center justify-center text-xl">
                  {step.icon}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-azure uppercase tracking-wider mb-1">
                  Step {step.number}
                </p>
                <h2 className="text-xl font-semibold mb-3">{step.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {step.description}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="text-center pb-8">
          <Link href="/">
            <Button size="lg">Describe your scene</Button>
          </Link>
          <p className="text-sm text-gray-400 mt-3">
            14-day free trial. No credit card required to search.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
