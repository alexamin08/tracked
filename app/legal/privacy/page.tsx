import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <>
      <TopNav />
      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, paddingBottom: 96 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--color-on-surface)", marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", marginBottom: 48 }}>Last updated: March 31, 2026</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              ["1. Information We Collect", "When you create an account via Google Sign-In, we collect your name, email address, and profile photo. We also collect search queries, download history, and usage analytics to improve the service."],
              ["2. How We Use Your Information", "We use your information to provide the Tracked service, process payments, improve AI matching quality, and communicate with you about your account. We do not sell your personal information."],
              ["3. Third-Party Services", "Tracked uses Clerk for authentication, Stripe for payment processing, Supabase for data storage, OpenAI for AI matching, and PostHog for analytics."],
              ["4. Data Retention", "We retain your account information and download history for the duration of your subscription and for 30 days after cancellation."],
              ["5. Your Rights", "You may request access to, correction of, or deletion of your personal data at any time by contacting us."],
            ].map(([heading, body]) => (
              <div key={heading}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--color-on-surface)", marginBottom: 8 }}>{heading}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>{body}</p>
              </div>
            ))}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", opacity: 0.5, paddingTop: 32 }}>
              This is a placeholder. Full privacy policy will be published before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
