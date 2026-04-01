import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-8">
            Last updated: March 31, 2026
          </p>

          <div className="prose prose-gray prose-sm max-w-none space-y-6 text-gray-600 leading-relaxed">
            <h2 className="text-lg font-semibold text-gray-900">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using Tracked, you agree to be bound by these
              Terms of Service. Tracked is operated as a joint venture between
              Tracked, Inc. and Signature Tracks.
            </p>

            <h2 className="text-lg font-semibold text-gray-900">
              2. Service Description
            </h2>
            <p>
              Tracked provides AI-powered music discovery and licensing for
              content creators. The service matches scene descriptions to
              broadcast-proven compositions from the Signature Tracks catalog.
            </p>

            <h2 className="text-lg font-semibold text-gray-900">
              3. Subscriptions and Billing
            </h2>
            <p>
              Tracked offers subscription plans billed monthly or annually.
              All plans include a 14-day free trial. Your subscription will
              automatically renew unless canceled before the end of the
              current billing period.
            </p>

            <h2 className="text-lg font-semibold text-gray-900">
              4. Content Licensing
            </h2>
            <p>
              Downloaded tracks are licensed for use according to the terms of
              your subscription plan. Licensing terms are detailed in the
              Licensing Agreement. All licenses are non-transferable and
              non-exclusive.
            </p>

            <h2 className="text-lg font-semibold text-gray-900">
              5. Acceptable Use
            </h2>
            <p>
              You may not redistribute, resell, or sublicense downloaded
              tracks. You may not use the service to train AI models or
              generate derivative compositions from the catalog.
            </p>

            <p className="text-gray-400 text-xs pt-8">
              This is a placeholder. Full terms will be published before
              public launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
