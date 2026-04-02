import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6" style={{ background: "var(--t-color-surface-low)" }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="t-display-sm mb-2" style={{ color: "var(--t-color-text)" }}>Terms of Service</h1>
          <p className="t-body-sm mb-8" style={{ color: "var(--t-color-text-muted)" }}>Last updated: March 31, 2026</p>
          <div className="space-y-6">
            {[
              ["1. Agreement to Terms", "By accessing or using Tracked, you agree to be bound by these Terms of Service. Tracked is operated as a joint venture between Tracked, Inc. and Signature Tracks."],
              ["2. Service Description", "Tracked provides AI-powered music discovery and licensing for content creators. The service matches scene descriptions to broadcast-proven compositions from the Signature Tracks catalog."],
              ["3. Subscriptions and Billing", "Tracked offers subscription plans billed monthly or annually. All plans include a 14-day free trial. Your subscription will automatically renew unless canceled before the end of the current billing period."],
              ["4. Content Licensing", "Downloaded tracks are licensed for use according to the terms of your subscription plan. Licensing terms are detailed in the Licensing Agreement. All licenses are non-transferable and non-exclusive."],
              ["5. Acceptable Use", "You may not redistribute, resell, or sublicense downloaded tracks. You may not use the service to train AI models or generate derivative compositions from the catalog."],
            ].map(([heading, body]) => (
              <div key={heading}>
                <h2 className="t-headline-sm mb-2" style={{ color: "var(--t-color-text)" }}>{heading}</h2>
                <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>{body}</p>
              </div>
            ))}
            <p className="t-body-sm pt-8" style={{ color: "var(--t-color-text-muted)", opacity: 0.5 }}>
              This is a placeholder. Full terms will be published before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
