import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchInput } from "@/components/search/search-input";
import { AudioPlayer } from "@/components/audio/audio-player";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="min-h-[70vh] hero-gradient flex flex-col items-center justify-center px-6 pt-24 pb-16">
          <span className="inline-block px-4 py-1.5 rounded-pill bg-primary/20 text-primary-muted text-badge font-semibold uppercase tracking-widest mb-6">
            AI Music Supervisor
          </span>

          <h1 className="text-content-on-dark text-4xl md:text-5xl font-light text-center tracking-tight mb-2">
            Describe your scene
          </h1>

          <p className="text-content-on-dark-secondary text-base text-center mb-10">
            53,000+ broadcast-proven compositions. Fully licensed. Content ID
            protected.
          </p>

          <SearchInput />
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-surface-secondary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-content-secondary uppercase tracking-wider text-center mb-12">
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
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
                  <div className="w-icon-md h-icon-md rounded-pill bg-primary-light text-primary mx-auto mb-4 flex items-center justify-center font-bold">
                    {step.n}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-content-secondary">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-sm font-semibold text-content-secondary uppercase tracking-wider mb-8">
              Pricing
            </h2>

            <div className="bg-surface-card rounded-card p-8 shadow-card">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                Starter
              </p>
              <p className="text-4xl font-bold mb-1">
                $15
                <span className="text-lg text-content-tertiary font-normal">
                  /mo
                </span>
              </p>
              <p className="text-sm text-content-secondary mb-6">
                14-day free trial. Cancel anytime.
              </p>

              <ul className="text-sm text-content-secondary space-y-2 text-left">
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
