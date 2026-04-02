import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6" style={{ background: "var(--t-color-bg)" }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="t-display-sm mb-2" style={{ color: "var(--t-color-text)" }}>Privacy Policy</h1>
          <p className="t-body-sm mb-8" style={{ color: "var(--t-color-text-muted)" }}>Last updated: March 31, 2026</p>
          <div className="space-y-6">
            {[
              ["1. Information We Collect", "When you create an account via Google Sign-In, we collect your name, email address, and profile photo. We also collect search queries, download history, and usage analytics to improve the service."],
              ["2. How We Use Your Information", "We use your information to provide the Tracked service, process payments, improve AI matching quality, and communicate with you about your account. We do not sell your personal information."],
              ["3. Third-Party Services", "Tracked uses Clerk for authentication, Stripe for payment processing, Supabase for data storage, OpenAI for AI matching, and PostHog for analytics."],
              ["4. Data Retention", "We retain your account information and download history for the duration of your subscription and for 30 days after cancellation."],
              ["5. Your Rights", "You may request access to, correction of, or deletion of your personal data at any time by contacting us."],
            ].map(([heading, body]) => (
              <div key={heading}>
                <h2 className="t-headline-sm mb-2" style={{ color: "var(--t-color-text)" }}>{heading}</h2>
                <p className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>{body}</p>
              </div>
            ))}
            <p className="t-body-sm pt-8" style={{ color: "var(--t-color-text-muted)", opacity: 0.5 }}>
              This is a placeholder. Full privacy policy will be published before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
