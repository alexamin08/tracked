"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { WENav } from "./WENav";
import { CriticsNote } from "./CriticsNote";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

/* ------------------------------------------------------------------ */
/*  Tier data (spec-corrected)                                        */
/* ------------------------------------------------------------------ */

interface Tier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  cta: string;
  ctaStyle: "ghost" | "filled";
  popular?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    monthlyPrice: 15,
    annualPrice: 12,
    features: [
      "MP3 downloads",
      "2 platforms",
      "10 AI searches / day",
      "50 saved results",
    ],
    cta: "SELECT STARTER",
    ctaStyle: "ghost",
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 24,
    features: [
      "WAV + stems",
      "5 platforms",
      "30 AI searches / day",
      "250 saved results",
      "AI Match Previews",
    ],
    cta: "START 14-DAY FREE TRIAL",
    ctaStyle: "filled",
    popular: true,
  },
  {
    name: "Team",
    monthlyPrice: 79,
    annualPrice: 66,
    features: [
      "Unlimited downloads",
      "15 platforms",
      "Unlimited AI searches",
      "Unlimited saved results",
      "5 team seats",
      "Dedicated curator",
    ],
    cta: "CONTACT SALES",
    ctaStyle: "ghost",
  },
];

const FAQ_ITEMS = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes. You can change plans at any time from your account settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "How does the 14-day free trial work?",
    a: "All plans include a 14-day free trial. Credit card required at signup. Cancel anytime during the trial \u2014 you won\u2019t be charged.",
  },
  {
    q: "What counts as a \u2018platform\u2019 for tracking?",
    a: "A platform is any distinct distribution channel \u2014 YouTube, TikTok, podcast feed, broadcast network, etc.",
  },
  {
    q: "Do you offer educational or non-profit discounts?",
    a: "Contact our team with valid credentials for specialized pricing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function CheckIcon({ filled = false }: { filled?: boolean }) {
  if (filled) {
    return (
      <span
        className="material-symbols-rounded"
        style={{ fontSize: 20, color: "var(--color-primary)" }}
      >
        check_circle
      </span>
    );
  }
  return (
    <span
      className="material-symbols-rounded"
      style={{ fontSize: 20, color: "var(--color-primary)", opacity: 0.6 }}
    >
      check_circle
    </span>
  );
}

function Toggle({
  isAnnual,
  onToggle,
  isDark,
}: {
  isAnnual: boolean;
  onToggle: () => void;
  isDark: boolean;
}) {
  const trackW = isDark ? 56 : 48;
  const trackH = isDark ? 28 : 24;
  const circleSize = isDark ? 22 : 18;
  const circleOffset = isAnnual ? trackW - circleSize - 3 : 3;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: isDark ? 0 : 48,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 600,
          color: isDark
            ? "#a8a29e"
            : isAnnual
              ? "color-mix(in srgb, var(--color-secondary) 60%, transparent)"
              : "var(--color-secondary)",
          letterSpacing: "0.02em",
          textTransform: "uppercase" as const,
        }}
      >
        Monthly
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-label={isAnnual ? "Switch to monthly billing" : "Switch to annual billing"}
        style={{
          position: "relative",
          width: trackW,
          height: trackH,
          borderRadius: 9999,
          backgroundColor: isDark ? "#292524" : "var(--color-surface-container-high)",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "background-color 200ms",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: circleOffset,
            transform: "translateY(-50%)",
            width: circleSize,
            height: circleSize,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            transition: "left 200ms ease",
          }}
        />
      </button>

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 700,
          color: isDark
            ? (isAnnual ? "#fafaf9" : "#a8a29e")
            : "var(--color-primary)",
          letterSpacing: "0.02em",
          textTransform: "uppercase" as const,
        }}
      >
        Annual
      </span>

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          fontWeight: 700,
          padding: "4px 12px",
          borderRadius: 9999,
          backgroundColor: isDark
            ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
            : "color-mix(in srgb, var(--color-primary) 10%, transparent)",
          color: "var(--color-primary)",
          letterSpacing: "0.04em",
          textTransform: "uppercase" as const,
        }}
      >
        Save 2 months
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LIGHT MODE                                                         */
/* ------------------------------------------------------------------ */

function LightPricing({
  isAnnual,
  onToggle,
}: {
  isAnnual: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 768, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 700,
              color: "var(--color-on-surface)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Invest in your sound.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              color: "var(--color-secondary)",
              marginTop: 24,
              lineHeight: 1.5,
            }}
          >
            Curated AI licensing plans designed for the modern creator, from solo
            artists to global agencies.
          </p>
          <Toggle isAnnual={isAnnual} onToggle={onToggle} isDark={false} />
        </div>
      </section>

      {/* Pricing Cards */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: 128,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            alignItems: "start",
          }}
        >
          {TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const isPopular = tier.popular;
            return (
              <div
                key={tier.name}
                style={{
                  position: "relative",
                  backgroundColor: isPopular
                    ? "var(--color-surface-container-highest)"
                    : "var(--color-surface-container-low)",
                  padding: 40,
                  borderTop: isPopular
                    ? "none"
                    : "1px solid color-mix(in srgb, var(--color-primary) 5%, transparent)",
                  boxShadow: isPopular
                    ? "0 32px 64px -12px rgba(153,65,35,0.08)"
                    : "none",
                  transform: isPopular ? "translateY(-16px)" : "none",
                }}
              >
                {isPopular && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "var(--color-primary)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 16px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 30,
                    fontWeight: 600,
                    margin: 0,
                    color: "var(--color-on-surface)",
                  }}
                >
                  {tier.name}
                </h3>
                <div style={{ marginTop: 16, marginBottom: 32 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 48,
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    ${price}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    /month
                  </span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "var(--color-on-surface-variant)",
                        fontWeight: isPopular ? 600 : 400,
                      }}
                    >
                      <CheckIcon filled={!!isPopular} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.name === "Team" ? "/contact" : "/sign-up"}
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 32,
                    padding: "14px 24px",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: 9999,
                    transition: "all 200ms",
                    ...(tier.ctaStyle === "filled"
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "#ffffff",
                          border: "none",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "var(--color-primary)",
                          border: "1px solid var(--color-primary)",
                        }),
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trial Assurance */}
      <section style={{ textAlign: "center", marginBottom: 128 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor:
              "color-mix(in srgb, var(--color-tertiary) 5%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--color-tertiary) 10%, transparent)",
            borderRadius: 9999,
            padding: "12px 24px",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 18, color: "var(--color-tertiary)" }}
          >
            verified_user
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            All plans include a 14-day free trial
          </span>
        </span>
      </section>

      {/* FAQ */}
      <section
        style={{ maxWidth: 896, margin: "0 auto", padding: "0 24px 0 24px" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 40,
            fontWeight: 700,
            color: "var(--color-on-surface)",
            borderLeft: "4px solid var(--color-primary)",
            paddingLeft: 24,
            marginBottom: 64,
            marginTop: 0,
            lineHeight: 1.2,
          }}
        >
          Frequently Asked
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--color-primary)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {item.q}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--color-on-surface-variant)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Critic's Note */}
      <div style={{ marginTop: 96, maxWidth: 768, margin: "96px auto 0" }}>
        <CriticsNote
          standalone
          label="Archivist's Insight"
          icon="lightbulb"
          text="Most independent creators find the Pro Annual plan to be the most cost-effective entry point for securing global commercial rights without the overhead of enterprise pricing."
        />
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--color-surface-container)",
          borderTop:
            "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
          padding: "80px 32px",
          textAlign: "center",
          marginTop: 96,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 24,
            color: "color-mix(in srgb, var(--color-primary) 20%, transparent)",
            margin: 0,
            lineHeight: 1,
          }}
        >
          Tracked
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "color-mix(in srgb, var(--color-secondary) 40%, transparent)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: 16,
          }}
        >
          &copy; 2026 Tracked Music Group. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  DARK MODE                                                          */
/* ------------------------------------------------------------------ */

function DarkPricing({
  isAnnual,
  onToggle,
}: {
  isAnnual: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 768, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--color-primary)",
              margin: 0,
              marginBottom: 24,
            }}
          >
            The Sound of Curation
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 500,
              color: "#fafaf9",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Investment in
            <br />
            Atmosphere.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              color: "#a8a29e",
              marginTop: 24,
              maxWidth: 672,
              margin: "24px auto 0",
              lineHeight: 1.7,
            }}
          >
            Curated AI licensing plans designed for the modern creator, from
            solo artists to global agencies.
          </p>
          <div style={{ marginTop: 48 }}>
            <Toggle isAnnual={isAnnual} onToggle={onToggle} isDark />
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: 128,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            alignItems: "start",
          }}
        >
          {TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const isPopular = tier.popular;
            return (
              <div
                key={tier.name}
                style={{
                  position: "relative",
                  backgroundColor: "#1c1917",
                  borderRadius: 8,
                  padding: 40,
                  border: isPopular
                    ? "2px solid color-mix(in srgb, var(--color-primary) 30%, transparent)"
                    : "1px solid color-mix(in srgb, #292524 50%, transparent)",
                  transform: isPopular ? "scale(1.05)" : "none",
                  zIndex: isPopular ? 10 : 1,
                  boxShadow: isPopular
                    ? "0 25px 50px -12px rgba(0,0,0,0.5)"
                    : "none",
                }}
              >
                {isPopular && (
                  <span
                    style={{
                      position: "absolute",
                      top: -1,
                      right: 24,
                      backgroundColor: "var(--color-primary)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "6px 16px",
                      borderRadius: "0 0 8px 8px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 30,
                    fontWeight: 600,
                    margin: 0,
                    color: "#fafaf9",
                  }}
                >
                  {tier.name}
                </h3>
                <div style={{ marginTop: 16, marginBottom: 32 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 48,
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    ${price}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "#a8a29e",
                    }}
                  >
                    /month
                  </span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "#d6d3d1",
                        fontWeight: isPopular ? 600 : 400,
                      }}
                    >
                      <CheckIcon filled={!!isPopular} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.name === "Team" ? "/contact" : "/sign-up"}
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 32,
                    padding: "14px 24px",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: 9999,
                    transition: "all 200ms",
                    ...(tier.ctaStyle === "filled"
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "#ffffff",
                          border: "none",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "#d6d3d1",
                          border: "1px solid #44403c",
                        }),
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trial Assurance */}
      <section style={{ textAlign: "center", marginBottom: 128 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor:
              "color-mix(in srgb, var(--color-tertiary) 5%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--color-tertiary) 10%, transparent)",
            borderRadius: 9999,
            padding: "12px 24px",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 18, color: "var(--color-tertiary)" }}
          >
            verified_user
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            All plans include a 14-day free trial
          </span>
        </span>
      </section>

      {/* Pull-quote (dark only) */}
      <section
        style={{
          maxWidth: 896,
          margin: "0 auto 128px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            borderLeft: "2px solid var(--color-primary)",
            paddingLeft: 32,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 30,
              color: "#d6d3d1",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            &ldquo;The right piece of music doesn&rsquo;t just complement a
            scene &mdash; it becomes inseparable from the memory of it. That
            precision is what we built Tracked to deliver.&rdquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-primary)",
              marginTop: 24,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            &mdash; The Tracked Curatorial Team
          </p>
        </div>
      </section>

      {/* FAQ (dark - split layout) */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
          }}
        >
          {/* Left column */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 48,
                fontWeight: 700,
                color: "#fafaf9",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Common
              <br />
              Inquiries
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "#a8a29e",
                marginTop: 24,
                lineHeight: 1.7,
              }}
            >
              Everything you need to know about plans, billing, and licensing
              scope.
            </p>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {FAQ_ITEMS.slice(0, 2).map((item) => (
              <div key={item.q}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    color: "#fafaf9",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {item.q}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "#a8a29e",
                    marginTop: 12,
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}

            {/* Critic's Note between FAQ items */}
            <div style={{ margin: "8px 0" }}>
              <CriticsNote
                standalone
                label="Archivist's Insight"
                icon="lightbulb"
                text="Most independent creators find the Pro Annual plan to be the most cost-effective entry point for securing global commercial rights without the overhead of enterprise pricing."
              />
            </div>

            {FAQ_ITEMS.slice(2).map((item) => (
              <div key={item.q}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    color: "#fafaf9",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {item.q}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "#a8a29e",
                    marginTop: 12,
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (dark) */}
      <footer
        style={{
          backgroundColor: "#0c0a09",
          borderTop: "1px solid #1c1917",
          padding: "80px 32px",
          textAlign: "center",
          marginTop: 128,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 96,
            fontWeight: 900,
            color: "#1c1917",
            letterSpacing: "-0.04em",
            margin: 0,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          TRACKED
        </p>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 32,
          }}
        >
          {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((name) => (
            <a
              key={name}
              href="#"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#57534e",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                transition: "color 200ms",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "#57534e")}
            >
              {name}
            </a>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 16,
            color: "#44403c",
            marginTop: 32,
            lineHeight: 1.5,
          }}
        >
          Music that understands the moment.
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "#44403c",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: 16,
          }}
        >
          &copy; 2026 Tracked Music Group. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function WEPricingPage() {
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#0c0a09" : "var(--color-surface)",
        color: isDark ? "#fafaf9" : "var(--color-on-surface)",
      }}
    >
      <WENav />
      {isDark ? (
        <DarkPricing
          isAnnual={isAnnual}
          onToggle={() => setIsAnnual((p) => !p)}
        />
      ) : (
        <LightPricing
          isAnnual={isAnnual}
          onToggle={() => setIsAnnual((p) => !p)}
        />
      )}
      <FloatingPlayer />
    </div>
  );
}
