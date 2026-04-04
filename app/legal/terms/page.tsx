import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <>
      <TopNav />
      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, paddingBottom: 96 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--color-on-surface)", marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", marginBottom: 48 }}>Last updated: March 31, 2026</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              ["1. Agreement to Terms", "By accessing or using Tracked, you agree to be bound by these Terms of Service. Tracked is operated as a joint venture between Tracked, Inc. and Signature Tracks."],
              ["2. Service Description", "Tracked provides AI-powered music discovery and licensing for content creators. The service matches scene descriptions to broadcast-proven compositions from the Signature Tracks catalog."],
              ["3. Subscriptions and Billing", "Tracked offers subscription plans billed monthly or annually. All plans include a 14-day free trial. Your subscription will automatically renew unless canceled before the end of the current billing period."],
              ["4. Content Licensing", "Downloaded tracks are licensed for use according to the terms of your subscription plan. Licensing terms are detailed in the Licensing Agreement. All licenses are non-transferable and non-exclusive."],
              ["5. Acceptable Use", "You may not redistribute, resell, or sublicense downloaded tracks. You may not use the service to train AI models or generate derivative compositions from the catalog."],
            ].map(([heading, body]) => (
              <div key={heading}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--color-on-surface)", marginBottom: 8 }}>{heading}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>{body}</p>
              </div>
            ))}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", opacity: 0.5, paddingTop: 32 }}>
              This is a placeholder. Full terms will be published before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
