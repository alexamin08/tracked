"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

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
      <main className="pt-24 pb-20 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Pricing</h1>
            <p className="text-gray-500 mb-8">
              14-day free trial on all plans. Unlimited downloads. Cancel
              anytime.
            </p>

            {/* Annual toggle */}
            <div className="inline-flex items-center gap-3 bg-white rounded-pill px-1.5 py-1.5">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-pill text-sm font-medium transition-colors ${
                  !annual
                    ? "bg-azure text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-pill text-sm font-medium transition-colors ${
                  annual
                    ? "bg-azure text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Annual
                <span className="ml-1.5 text-[11px] font-semibold text-azure-300">
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
                className={`bg-white rounded-2xl p-8 relative ${
                  plan.popular ? "ring-2 ring-azure" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-pill bg-azure text-white text-[11px] font-semibold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <p className="text-xs font-semibold text-azure uppercase tracking-wider mb-3">
                  {plan.name}
                </p>

                <div className="mb-1">
                  <span className="text-4xl font-bold">
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-gray-400 text-base">/mo</span>
                </div>

                {annual && (
                  <p className="text-xs text-gray-400 mb-6">
                    ${plan.annual * 12}/year (save $
                    {(plan.monthly - plan.annual) * 12})
                  </p>
                )}
                {!annual && <p className="text-xs text-gray-400 mb-6">Billed monthly</p>}

                <Link href="/subscribe">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full mb-8"
                  >
                    Start free trial
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <li
                      key={feature}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-500">{feature}</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            All plans include Content ID protection and full licensing.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
