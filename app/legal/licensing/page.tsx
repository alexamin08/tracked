import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";

export default function LicensingPage() {
  return (
    <>
      <TopNav />
      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, paddingBottom: 96 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--color-on-surface)", marginBottom: 8 }}>Licensing Agreement</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", marginBottom: 48 }}>Last updated: March 31, 2026</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              ["1. License Grant", "Tracked grants you a non-exclusive, non-transferable license to use downloaded compositions in your content according to the terms of your subscription plan."],
              ["2. License Scope by Plan", "Starter: Personal use, up to 2 platforms. Pro: Commercial use, up to 5 platforms. Team: Broadcast use, up to 15 platforms, up to 5 team members."],
              ["3. Content ID Protection", "All licensed tracks are registered with YouTube Content ID and other content recognition systems. Signature Tracks handles Content ID claims resolution."],
              ["4. Restrictions", "You may not redistribute, resell, sublicense, or make compositions available as standalone audio files. You may not use compositions in AI training datasets."],
              ["5. License Duration", "Licenses are perpetual for content published during your active subscription. Previously published content remains licensed after cancellation."],
            ].map(([heading, body]) => (
              <div key={heading}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--color-on-surface)", marginBottom: 8 }}>{heading}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>{body}</p>
              </div>
            ))}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", opacity: 0.5, paddingTop: 32 }}>
              This is a placeholder. Full licensing agreement will be published before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
