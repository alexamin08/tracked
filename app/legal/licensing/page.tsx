import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function LicensingPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Licensing Agreement</h1>
          <p className="text-sm text-content-tertiary mb-8">
            Last updated: March 31, 2026
          </p>

          <div className="prose prose-gray prose-sm max-w-none space-y-6 text-content-secondary leading-relaxed">
            <h2 className="text-lg font-semibold text-content">
              1. License Grant
            </h2>
            <p>
              Tracked grants you a non-exclusive, non-transferable license to
              use downloaded compositions in your content according to the
              terms of your subscription plan. All compositions are owned by
              Signature Tracks and licensed through the Tracked platform.
            </p>

            <h2 className="text-lg font-semibold text-content">
              2. License Scope by Plan
            </h2>
            <ul className="list-none space-y-3 pl-0">
              <li>
                <span className="font-semibold text-content">Starter</span>{" "}
                — Personal use. YouTube, TikTok, or similar personal content
                channels. Up to 2 platforms.
              </li>
              <li>
                <span className="font-semibold text-content">Pro</span> —
                Commercial use. Client work, branded content, ad-supported
                channels. Up to 5 platforms.
              </li>
              <li>
                <span className="font-semibold text-content">Team</span> —
                Broadcast use. Television, film, streaming platforms,
                advertising. Up to 15 platforms. Up to 5 team members.
              </li>
            </ul>

            <h2 className="text-lg font-semibold text-content">
              3. Content ID Protection
            </h2>
            <p>
              All licensed tracks are registered with YouTube Content ID and
              other content recognition systems. Your license grants
              whitelisting for the platforms included in your plan. Signature
              Tracks handles Content ID claims resolution.
            </p>

            <h2 className="text-lg font-semibold text-content">
              4. Restrictions
            </h2>
            <p>
              You may not redistribute, resell, sublicense, or make
              compositions available as standalone audio files. You may not
              use compositions in AI training datasets. You may not register
              compositions with any performing rights organization or content
              recognition system.
            </p>

            <h2 className="text-lg font-semibold text-content">
              5. License Duration
            </h2>
            <p>
              Licenses are perpetual for content published during your active
              subscription. If your subscription lapses, you may not use
              downloaded compositions in new content, but previously published
              content remains licensed.
            </p>

            <p className="text-content-tertiary text-xs pt-8">
              This is a placeholder. Full licensing agreement will be
              published before public launch in consultation with legal
              counsel.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
