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
        <section className="min-h-[70vh] bg-gradient-to-br from-surface-dark via-surface-dark-mid to-surface-dark flex flex-col items-center justify-center px-6 pt-24 pb-16">
          <span className="inline-block px-4 py-1.5 rounded-pill bg-azure/20 text-azure-300 text-[11px] font-semibold uppercase tracking-widest mb-6">
            AI Music Supervisor
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-light text-center tracking-tight mb-2">
            Describe your scene
          </h1>

          <p className="text-white/50 text-base text-center mb-10">
            53,000+ broadcast-proven compositions. Fully licensed. Content ID
            protected.
          </p>

          <SearchInput />
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center mb-12">
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-pill bg-azure-50 text-azure mx-auto mb-4 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Describe your scene</h3>
                <p className="text-sm text-gray-500">
                  Type what you see. A tense elimination, a golden hour
                  montage, a cooking show opener.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-pill bg-azure-50 text-azure mx-auto mb-4 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">AI matches your scene</h3>
                <p className="text-sm text-gray-500">
                  Matched against music that has actually scored real TV
                  scenes. Not keywords. Scene intelligence.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-pill bg-azure-50 text-azure mx-auto mb-4 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Download and use</h3>
                <p className="text-sm text-gray-500">
                  Fully licensed for all platforms. Content ID protected. No
                  copyright claims. Ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
              Pricing
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-xs font-semibold text-azure uppercase tracking-wider mb-2">
                Starter
              </p>
              <p className="text-4xl font-bold mb-1">
                $15<span className="text-lg text-gray-400 font-normal">/mo</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                14-day free trial. Cancel anytime.
              </p>

              <ul className="text-sm text-gray-600 space-y-2 text-left">
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
