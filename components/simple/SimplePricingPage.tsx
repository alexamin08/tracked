"use client";

import { useState } from "react";
import Link from "next/link";
import { SimpleNav } from "./SimpleNav";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const TIERS = [
  {
    name: "Starter",
    nameDisplay: "STARTER",
    price: 15,
    annualPrice: 12,
    desc: "For individual creators getting started.",
    popular: false,
    features: [
      "MP3 downloads",
      "2 platforms",
      "10 AI searches/day",
      "50 saved results",
    ],
    cta: "Select Starter",
    ctaFilled: false,
  },
  {
    name: "Pro",
    nameDisplay: "PRO",
    price: 29,
    annualPrice: 24,
    desc: "Advanced features for growing professional teams.",
    popular: true,
    features: [
      "WAV + stems included",
      "5 platforms",
      "30 AI searches/day",
      "250 saved results",
      "AI Match Previews",
    ],
    cta: "Start 14-Day Free Trial",
    ctaFilled: true,
  },
  {
    name: "Team",
    nameDisplay: "TEAM",
    price: 79,
    annualPrice: 66,
    desc: "Full suite power for large scale organizations.",
    popular: false,
    features: [
      "Unlimited everything",
      "15 platforms",
      "5 team seats",
      "Dedicated curator",
    ],
    cta: "Contact Sales",
    ctaFilled: false,
  },
];

const FAQ_ITEMS = [
  {
    q: "Can I change plans at any time?",
    a: "Absolutely. You can switch between plans at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfer for Team plans. All payments are processed securely through Stripe.",
  },
  {
    q: "Is there a free trial for the Pro plan?",
    a: "Yes, all plans include a 14-day free trial. Credit card required at signup. Cancel anytime during the trial — you won't be charged.",
  },
  {
    q: "Do you offer discounts for non-profits?",
    a: "Yes. We offer 50% off all tiers for verified educational institutions and registered non-profits. Contact our team with proof of status to get your discount code.",
  },
];

export function SimplePricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(2);

  return (
    <>
      <SimpleNav />

      <main style={{ paddingTop: 56 }}>
        {/* ═══ PRICING HERO ═══ */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            paddingTop: 96,
            paddingBottom: 32,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(2.5rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-on-surface)",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Choose Your Plan
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              fontWeight: 500,
              color: "var(--color-on-surface-variant)",
              maxWidth: 672,
              margin: "0 auto",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Scalable solutions for teams of all sizes. Professional precision for
            your workflow.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--color-on-surface)",
              }}
            >
              Monthly
            </span>

            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: 48,
                height: 24,
                borderRadius: 9999,
                backgroundColor: "var(--color-surface-container-high)",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background-color 200ms ease",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  position: "absolute",
                  top: 4,
                  transition: "left 200ms ease",
                  left: annual ? 28 : 4,
                }}
              />
            </button>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--color-on-surface)",
              }}
            >
              Annual
            </span>

            <span
              style={{
                backgroundColor: "var(--color-primary-container)",
                color: "var(--color-on-primary-container)",
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 9999,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              2 MONTHS FREE
            </span>
          </div>
        </section>

        {/* ═══ PRICING CARDS ═══ */}
        <section style={{ padding: "48px 24px 96px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              maxWidth: 1152,
              margin: "0 auto",
            }}
            className="md:grid-cols-3 grid-cols-1"
          >
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                style={{
                  backgroundColor: "var(--color-surface-container-lowest)",
                  padding: 32,
                  borderRadius: 12,
                  border: tier.popular
                    ? "2px solid var(--color-primary)"
                    : "1px solid transparent",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 150ms ease",
                }}
              >
                {/* MOST POPULAR pill */}
                {tier.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-on-primary)",
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 9999,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Tier name */}
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: tier.popular
                      ? "var(--color-primary)"
                      : "var(--color-on-surface-variant)",
                    marginBottom: 8,
                  }}
                >
                  {tier.nameDisplay}
                </h3>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 36,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "var(--color-on-surface)",
                    }}
                  >
                    ${annual ? tier.annualPrice : tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    /mo
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--color-on-surface-variant)",
                    marginBottom: 24,
                  }}
                >
                  {tier.desc}
                </p>

                {/* Features */}
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    flex: 1,
                    marginBottom: 32,
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    marginBlockEnd: 32,
                  }}
                >
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: 18,
                          color: "var(--color-primary)",
                          flexShrink: 0,
                        }}
                      >
                        check_circle
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.name === "Team" ? "#" : "/subscribe"}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 16px",
                    textAlign: "center",
                    borderRadius: 8,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "background-color 150ms ease",
                    ...(tier.ctaFilled
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-on-primary)",
                        }
                      : {
                          backgroundColor: "var(--color-secondary-container)",
                          color: "var(--color-on-secondary-container)",
                        }),
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section style={{ padding: "0 24px 96px" }}>
          <div style={{ maxWidth: 768, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                textAlign: "center",
                color: "var(--color-on-surface)",
                marginBottom: 48,
              }}
            >
              Frequently Asked Questions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "var(--color-surface-container-lowest)",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width: "100%",
                        padding: "20px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background-color 150ms ease",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          color: "var(--color-on-surface)",
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        className="material-symbols-outlined"
                        style={{
                          color: "var(--color-on-surface-variant)",
                          transition: "transform 200ms ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          flexShrink: 0,
                          marginLeft: 16,
                        }}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: "0 16px 20px",
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          color: "var(--color-on-surface-variant)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ SIMPLE PRICING FOOTER ═══ */}
      <footer
        style={{
          backgroundColor: "var(--color-surface-container-low)",
          borderTop: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-on-surface-variant)",
            }}
          >
            &copy; 2026 TRACKED SYSTEMS INC. ALL RIGHTS RESERVED.
          </span>
          <div style={{ display: "flex", gap: 32 }}>
            {["PRIVACY", "TERMS", "SECURITY"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-on-surface-variant)",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <FloatingPlayer />
    </>
  );
}
