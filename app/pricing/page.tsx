"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ThemeLink } from "@/components/theme-link";

const plans = [
  {
    name: "Starter",
    monthly: 15,
    annual: 13,
    popular: false,
    features: {
      "URL analyses": "10/mo",
      "File uploads": "3/mo",
      "Licensing scope": "Personal",
      "File formats": "MP3",
      Platforms: "2",
      "Team members": "1",
      "Saved results": "50",
      Downloads: "Unlimited",
    },
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 24,
    popular: true,
    features: {
      "URL analyses": "30/mo",
      "File uploads": "10/mo",
      "Licensing scope": "Commercial",
      "File formats": "WAV + stems",
      Platforms: "5",
      "Team members": "1",
      "Saved results": "250",
      Downloads: "Unlimited",
    },
  },
  {
    name: "Team",
    monthly: 79,
    annual: 66,
    popular: false,
    features: {
      "URL analyses": "Unlimited",
      "File uploads": "Unlimited",
      "Licensing scope": "Broadcast",
      "File formats": "WAV + stems",
      Platforms: "15",
      "Team members": "5",
      "Saved results": "Unlimited",
      Downloads: "Unlimited",
    },
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 px-6 min-h-screen" style={{ background: "var(--t-color-bg)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="t-display-md mb-3" style={{ color: "var(--t-color-text)" }}>
              Pricing
            </h1>
            <p className="t-body-lg mb-8" style={{ color: "var(--t-color-text-muted)" }}>
              14-day free trial on all plans. Unlimited downloads. Cancel anytime.
            </p>

            {/* Annual toggle */}
            <div
              className="inline-flex items-center gap-3 px-1.5 py-1.5"
              style={{
                background: "var(--t-color-surface)",
                borderRadius: "var(--t-radius-pill)",
              }}
            >
              <button
                onClick={() => setAnnual(false)}
                className="t-label-lg px-5 py-2 transition-colors"
                style={{
                  borderRadius: "var(--t-radius-pill)",
                  background: !annual ? "var(--t-color-primary)" : "transparent",
                  color: !annual ? "var(--t-color-on-primary)" : "var(--t-color-text-muted)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className="t-label-lg px-5 py-2 transition-colors"
                style={{
                  borderRadius: "var(--t-radius-pill)",
                  background: annual ? "var(--t-color-primary)" : "transparent",
                  color: annual ? "var(--t-color-on-primary)" : "var(--t-color-text-muted)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Annual
                <span className="ml-1.5 t-label-sm" style={{ color: annual ? "var(--t-color-on-primary)" : "var(--t-color-primary)" }}>
                  2 months free
                </span>
              </button>
            </div>
          </div>

          {/* Plans grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="hover-lift p-8 relative"
                style={{
                  background: "var(--t-color-surface)",
                  borderRadius: "var(--t-radius-lg)",
                  borderTop: plan.popular ? "3px solid var(--t-color-primary)" : "none",
                }}
              >
                {plan.popular && (
                  <span
                    className="t-label-sm absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                    style={{
                      borderRadius: "var(--t-radius-pill)",
                      background: "var(--t-color-primary)",
                      color: "var(--t-color-on-primary)",
                    }}
                  >
                    Most Popular
                  </span>
                )}

                <p className="t-label-md mb-3" style={{ color: "var(--t-color-primary)" }}>
                  {plan.name}
                </p>

                <div className="mb-1">
                  <span className="t-headline-lg" style={{ color: "var(--t-color-text)" }}>
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="t-body-lg" style={{ color: "var(--t-color-text-muted)" }}>/mo</span>
                </div>

                {annual ? (
                  <p className="t-body-sm mb-6" style={{ color: "var(--t-color-text-muted)" }}>
                    ${plan.annual * 12}/year (save ${(plan.monthly - plan.annual) * 12})
                  </p>
                ) : (
                  <p className="t-body-sm mb-6" style={{ color: "var(--t-color-text-muted)" }}>
                    Billed monthly
                  </p>
                )}

                <ThemeLink href="/subscribe">
                  <Button variant={plan.popular ? "primary" : "secondary"} className="w-full mb-8">
                    Start free trial
                  </Button>
                </ThemeLink>

                <ul className="space-y-3">
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <li key={feature} className="flex justify-between t-body-md">
                      <span style={{ color: "var(--t-color-text-muted)" }}>{feature}</span>
                      <span style={{ color: "var(--t-color-text)", fontWeight: 500 }}>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center t-body-sm mt-8" style={{ color: "var(--t-color-text-muted)" }}>
            All plans include Content ID protection and full licensing.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
