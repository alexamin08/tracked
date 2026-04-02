import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function LicensingPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6" style={{ background: "var(--t-color-surface-low)" }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="t-display-sm mb-2" style={{ color: "var(--t-color-text)" }}>Licensing Agreement</h1>
          <p className="t-body-sm mb-8" style={{ color: "var(--t-color-text-muted)" }}>Last updated: March 31, 2026</p>
          <div className="space-y-6">
            {[
              ["1. License Grant", "Tracked grants you a non-exclusive, non-transferable license to use downloaded compositions in your content according to the terms of your subscription plan."],
              ["2. License Scope by Plan", "Starter: Personal use, up to 2 platforms. Pro: Commercial use, up to 5 platforms. Team: Broadcast use, up to 15 platforms, up to 5 team members."],
              ["3. Content ID Protection", "All licensed tracks are registered with YouTube Content ID and other content recognition systems. Signature Tracks handles Content ID claims resolution."],
              ["4. Restrictions", "You may not redistribute, resell, sublicense, or make compositions available as standalone audio files. You may not use compositions in AI training datasets."],
              ["5. License Duration", "Licenses are perpetual for content published during your active subscription. Previously published content remains licensed after cancellation."],
            ].map(([heading, body]) => (
              <div key={heading}>
                <h2 className="t-headline-sm mb-2" style={{ color: "var(--t-color-text)" }}>{heading}</h2>
                <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>{body}</p>
              </div>
            ))}
            <p className="t-body-sm pt-8" style={{ color: "var(--t-color-text-muted)", opacity: 0.5 }}>
              This is a placeholder. Full licensing agreement will be published before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
