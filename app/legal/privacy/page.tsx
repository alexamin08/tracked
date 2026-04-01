import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-content-tertiary mb-8">
            Last updated: March 31, 2026
          </p>

          <div className="prose prose-gray prose-sm max-w-none space-y-6 text-content-secondary leading-relaxed">
            <h2 className="text-lg font-semibold text-content">
              1. Information We Collect
            </h2>
            <p>
              When you create an account via Google Sign-In, we collect your
              name, email address, and profile photo from your Google account.
              We also collect search queries, download history, and usage
              analytics to improve the service.
            </p>

            <h2 className="text-lg font-semibold text-content">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to provide the Tracked service, process
              payments, improve AI matching quality, and communicate with you
              about your account. We do not sell your personal information.
            </p>

            <h2 className="text-lg font-semibold text-content">
              3. Third-Party Services
            </h2>
            <p>
              Tracked uses Clerk for authentication, Stripe for payment
              processing, Supabase for data storage, OpenAI for AI matching,
              and PostHog for analytics. Each of these services has its own
              privacy policy governing how they handle your data.
            </p>

            <h2 className="text-lg font-semibold text-content">
              4. Data Retention
            </h2>
            <p>
              We retain your account information and download history for the
              duration of your subscription and for 30 days after
              cancellation. Search queries are retained in anonymized form for
              service improvement.
            </p>

            <h2 className="text-lg font-semibold text-content">
              5. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting us. You may also export
              your download history.
            </p>

            <p className="text-content-tertiary text-xs pt-8">
              This is a placeholder. Full privacy policy will be published
              before public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
