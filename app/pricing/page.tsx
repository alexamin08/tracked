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
      {/* Page canvas = bg */}
      <main className="pt-24 pb-20 min-h-screen" style={{ background: "var(--t-color-bg)" }}>
        {/* Header section on surface-low for depth */}
        <section
          className="px-6 pt-16 pb-20 text-center"
          style={{ background: "var(--t-color-surface-low)" }}
        >
          <h1 className="t-display-md mb-4" style={{ color: "var(--t-color-text)" }}>
            Simple, transparent pricing
          </h1>
          <p className="t-body-lg mb-10 max-w-lg mx-auto" style={{ color: "var(--t-color-text-muted)" }}>
            14-day free trial on all plans. Unlimited downloads. Cancel anytime.
          </p>

          {/* Annual toggle */}
          <div
            className="inline-flex items-center gap-1 p-1"
            style={{
              background: "var(--t-color-surface)",
              borderRadius: "var(--t-radius-pill)",
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="t-label-lg px-6 py-2.5 transition-all"
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
              className="t-label-lg px-6 py-2.5 transition-all"
              style={{
                borderRadius: "var(--t-radius-pill)",
                background: annual ? "var(--t-color-primary)" : "transparent",
                color: annual ? "var(--t-color-on-primary)" : "var(--t-color-text-muted)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Annual
              <span
                className="ml-2 t-label-sm"
                style={{
                  color: annual ? "var(--t-color-on-primary)" : "var(--t-color-primary)",
                }}
              >
                Save 2 months
              </span>
            </button>
          </div>
        </section>

        {/* Plans grid — cards on bg canvas, elevated from section above */}
        <section className="max-w-5xl mx-auto px-6 -mt-4">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative hover-lift"
                style={{
                  background: "var(--t-color-surface)",
                  borderRadius: "var(--t-radius-lg)",
                  padding: plan.popular ? "var(--t-space-10, 40px)" : "var(--t-space-8)",
                  ...(plan.popular
                    ? {
                        borderTop: "3px solid var(--t-color-primary)",
                        boxShadow: `var(--t-shadow-ambient), 0 0 40px color-mix(in srgb, var(--t-color-primary) 8%, transparent)`,
                        transform: "translateY(-12px)",
                      }
                    : {}),
                }}
              >
                {plan.popular && (
                  <span
                    className="t-label-md absolute left-1/2 -translate-x-1/2 px-5 py-1.5"
                    style={{
                      top: "-14px",
                      borderRadius: "var(--t-radius-pill)",
                      background: "var(--t-color-primary)",
                      color: "var(--t-color-on-primary)",
                      boxShadow: "0 4px 12px color-mix(in srgb, var(--t-color-primary) 30%, transparent)",
                    }}
                  >
                    Most Popular
                  </span>
                )}

                <p className="t-label-md mb-4" style={{ color: "var(--t-color-primary)" }}>
                  {plan.name}
                </p>

                {/* Price in display font */}
                <div className="mb-1">
                  <span
                    className="t-display-md"
                    style={{ color: "var(--t-color-text)" }}
                  >
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="t-body-lg ml-1" style={{ color: "var(--t-color-text-muted)" }}>
                    /mo
                  </span>
                </div>

                {annual ? (
                  <p className="t-body-sm mb-8" style={{ color: "var(--t-color-text-muted)" }}>
                    ${plan.annual * 12}/year (save ${(plan.monthly - plan.annual) * 12})
                  </p>
                ) : (
                  <p className="t-body-sm mb-8" style={{ color: "var(--t-color-text-muted)" }}>
                    Billed monthly
                  </p>
                )}

                <ThemeLink href="/subscribe">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full mb-8"
                  >
                    Start free trial
                  </Button>
                </ThemeLink>

                {/* Features — on surface-low for tonal separation */}
                <div
                  className="space-y-0 -mx-4 px-4 pt-5"
                  style={{
                    borderTop: "none",
                  }}
                >
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <div
                      key={feature}
                      className="flex justify-between py-2.5 t-body-md"
                    >
                      <span style={{ color: "var(--t-color-text-muted)" }}>
                        {feature}
                      </span>
                      <span style={{ color: "var(--t-color-text)", fontWeight: 500 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center t-body-sm mt-12"
            style={{ color: "var(--t-color-text-muted)" }}
          >
            All plans include Content ID protection and full licensing.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
