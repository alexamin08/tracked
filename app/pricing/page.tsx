"use client";

import { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";
import { useActiveTheme } from "@/hooks/useActiveTheme";
import { SimplePricingPage } from "@/components/simple/SimplePricingPage";
import WEPricingPage from "@/components/warm-editorial/WEPricingPage";
import { PUPricingPage } from "@/components/precision-utility/PUPricingPage";

/* ─── Tier data (from spec corrections table) ─── */
const TIERS = [
  {
    name: "Starter",
    price: 15,
    annualPrice: 12,
    label: null,
    popular: false,
    features: ["MP3 downloads", "2 platforms", "10 searches/day", "50 saved"],
    cta: "Select Starter",
    ctaStyle: "ghost" as const,
  },
  {
    name: "Pro",
    price: 29,
    annualPrice: 24,
    label: "Most Popular",
    popular: true,
    features: ["WAV + stems", "5 platforms", "30 searches/day", "250 saved", "AI Match Previews"],
    cta: "Start 14-Day Free Trial",
    ctaStyle: "filled" as const,
  },
  {
    name: "Team",
    price: 79,
    annualPrice: 66,
    label: null,
    popular: false,
    features: ["Unlimited everything", "15 platforms", "5 seats included", "Dedicated curator"],
    cta: "Contact Sales",
    ctaStyle: "ghost" as const,
  },
];

const FAQ_ITEMS = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Absolutely. You can switch between plans at any time. When upgrading, you\u2019ll be prorated for the remainder of your billing cycle. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    q: "How does the 14-day free trial work?",
    a: "You get full access to the Pro tier features for 14 days. We don\u2019t ask for billing information until you\u2019re ready to commit. If you don\u2019t choose a plan after 14 days, your account will transition to a read-only state.",
  },
  {
    q: 'What counts as a "platform" for tracking?',
    a: "A platform is any distribution channel where your content appears \u2014 YouTube, TikTok, Instagram, Spotify, a podcast host, etc. Each unique platform counts once regardless of how many videos you publish there.",
  },
  {
    q: "Do you offer educational or non-profit discounts?",
    a: "Yes. We offer 50% off all tiers for verified educational institutions and registered non-profits. Contact our team with proof of status to get your discount code.",
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function PricingPage() {
  const theme = useActiveTheme();
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  if (theme === "simple") return <SimplePricingPage />;
  if (theme === "warm-editorial") return <WEPricingPage />;
  if (theme === "precision-utility") return <PUPricingPage />;

  return (
    <>
      <TopNav />

      <main
        style={{
          paddingTop: 128,
          paddingBottom: 0,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* ============================
            PRICING HERO
            ============================ */}
        <header style={{ textAlign: "center", marginBottom: 96 }}>
          {/* Eyebrow */}
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-secondary)",
              marginBottom: 16,
            }}
          >
            Investment in Sound
          </span>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--color-on-surface)",
            }}
          >
            Precision Intelligence for <br />
            <span style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
              Cinematic Visionaries
            </span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              maxWidth: 640,
              margin: "24px auto 0",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "var(--color-on-surface-variant)",
            }}
          >
            Professional-grade audio tracking and curation tools. Choose the
            scale that fits your production pipeline.
          </p>

          {/* Billing toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              paddingTop: 32,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                color: annual ? "var(--color-on-surface-variant)" : "var(--color-on-surface)",
              }}
            >
              Monthly
            </span>

            {/* Toggle switch */}
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: 56,
                height: 28,
                borderRadius: 9999,
                backgroundColor: annual
                  ? "var(--color-primary)"
                  : "var(--color-surface-container-high)",
                border: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                position: "relative",
                cursor: "pointer",
                transition: "background-color 300ms ease",
                padding: 4,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: annual ? "var(--color-secondary)" : "var(--color-on-surface)",
                  position: "absolute",
                  top: 3,
                  transition: "left 200ms ease, right 200ms ease",
                  ...(annual ? { right: 4 } : { left: 4 }),
                }}
              />
            </button>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-secondary)",
                }}
              >
                Annual (2 months free)
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                }}
              >
                Save 2 months
              </span>
            </div>
          </div>
        </header>

        {/* ============================
            PRICING CARDS — 3-column grid
            ============================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            alignItems: "stretch",
            backgroundColor: "var(--color-surface-container-lowest)",
            overflow: "hidden",
            border: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {TIERS.map((tier, idx) => (
            <div
              key={tier.name}
              style={{
                padding: 40,
                display: "flex",
                flexDirection: "column",
                gap: 40,
                ...(tier.popular
                  ? {
                      backgroundColor: "var(--color-surface-container)",
                      position: "relative",
                      zIndex: 10,
                      boxShadow: "0 0 80px rgba(0,0,0,0.5)",
                    }
                  : {
                      ...(idx === 0
                        ? { borderRight: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)" }
                        : { borderLeft: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)" }),
                    }),
              }}
            >
              {/* Most Popular badge */}
              {tier.label && (
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 40,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-on-primary)",
                      padding: "4px 12px",
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {tier.label}
                  </span>
                </div>
              )}

              {/* Tier name + price */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 300,
                    color: tier.popular ? "var(--color-primary)" : "var(--color-on-surface)",
                    marginBottom: 8,
                  }}
                >
                  {tier.name}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 36,
                      fontWeight: 700,
                      color: "var(--color-on-surface)",
                    }}
                  >
                    ${annual ? tier.annualPrice : tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: 300,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    /mo
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                {tier.features.map((feat, fi) => {
                  const isAI = feat === "AI Match Previews";
                  return (
                    <li
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: tier.popular
                          ? isAI
                            ? "var(--color-on-surface-variant)"
                            : "var(--color-on-surface)"
                          : "var(--color-on-surface-variant)",
                        fontWeight: tier.popular && !isAI ? 500 : 400,
                        fontStyle: isAI ? "italic" : "normal",
                      }}
                    >
                      {isAI ? (
                        <SparkleIcon />
                      ) : (
                        <CheckIcon
                          color={
                            tier.popular
                              ? "var(--color-secondary)"
                              : "var(--color-primary)"
                          }
                        />
                      )}
                      {feat}
                    </li>
                  );
                })}
              </ul>

              {/* CTA button */}
              {tier.ctaStyle === "filled" ? (
                <Link
                  href="/subscribe"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "16px 0",
                    textAlign: "center",
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "opacity 150ms ease",
                  }}
                >
                  {tier.cta}
                </Link>
              ) : (
                <Link
                  href={tier.name === "Team" ? "#" : "/subscribe"}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "16px 0",
                    textAlign: "center",
                    border: "1px solid color-mix(in srgb, var(--color-outline-variant) 50%, transparent)",
                    backgroundColor: "transparent",
                    color: "var(--color-on-surface)",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "background-color 150ms ease",
                  }}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Free trial note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 48,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--color-on-surface-variant)",
          }}
        >
          All plans include a 14-day free trial. No credit card required to
          start.
        </p>

        {/* ============================
            FAQ SECTION
            ============================ */}
        <section style={{ marginTop: 192, maxWidth: 960, marginLeft: "auto", marginRight: "auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 64,
              gap: 48,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "var(--color-on-surface)",
                }}
              >
                Expert{" "}
                <span style={{ fontStyle: "italic", color: "var(--color-secondary)" }}>
                  Assistance
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-on-surface-variant)",
                  marginTop: 16,
                }}
              >
                Frequently Asked Questions
              </p>
            </div>
            <div
              className="hidden md:block"
              style={{
                width: 128,
                height: 1,
                backgroundColor: "var(--color-outline-variant)",
                marginBottom: 16,
                flexShrink: 0,
              }}
            />
          </div>

          {/* Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    backgroundColor: isOpen
                      ? "var(--color-surface-container)"
                      : "var(--color-surface-container)",
                    padding: 32,
                    cursor: "pointer",
                    borderLeft: `2px solid ${
                      isOpen ? "var(--color-secondary)" : "transparent"
                    }`,
                    transition: "border-color 200ms ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: isOpen ? "flex-start" : "center",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 300,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      {item.q}
                    </h4>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 20,
                        color: isOpen
                          ? "var(--color-secondary)"
                          : "var(--color-on-surface-variant)",
                        flexShrink: 0,
                        marginLeft: 24,
                        transition: "color 200ms ease",
                      }}
                    >
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </div>
                  {isOpen && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "var(--color-on-surface-variant)",
                        marginTop: 24,
                        maxWidth: 640,
                      }}
                    >
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================
            BOTTOM CTA BANNER
            ============================ */}
        <section
          style={{
            marginTop: 192,
            position: "relative",
            height: 400,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Gradient overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, var(--color-surface), transparent, var(--color-surface))",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBffX4CEINNlfRdT268PyldCEglKstMbgZ8dHtynm3YSnWGFOO2DWwvFS7ML5l4lW0fbQAGq92nFi5B-rn8kop5hI9kaQzkWdT6Vkc1D6jkyUKB2QzSlxyivI7L9Og4DARYRDAXcQud4zWiE7NihjrGJ9P-joNzmxfUaDhcd2r6XIINTB1VHaRO2Zrp9_D4sq2uf_wQ17ayhUA-4OR-CSvfjYORER70ITr9PyzrxkRT-ayx0HVmEWWhSNqJHVlPoF-vVkYR2Nm0aUgI"
            alt="Professional recording studio"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
              mixBlendMode: "luminosity",
            }}
          />
          <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", gap: 32 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                fontStyle: "italic",
                color: "var(--color-on-surface)",
              }}
            >
              Ready to elevate your production?
            </h2>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/subscribe"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  padding: "16px 40px",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "transform 150ms ease",
                }}
              >
                Start Your Free Trial
              </Link>
              <Link
                href="#"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--color-on-surface)",
                  padding: "16px 40px",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background-color 150ms ease",
                }}
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
