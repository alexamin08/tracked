"use client";

import { useState } from "react";
import Link from "next/link";
import { PUNav } from "./PUNav";
import { useTheme } from "@/components/theme-provider";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TIERS = [
  {
    key: "starter",
    eyebrow: "Entry Point",
    name: "STARTER",
    monthly: 15,
    annual: 12,
    features: [
      "MP3 Downloads",
      "2 Platforms",
      "10 AI Searches / Day",
      "50 Saved Results",
    ],
    cta: "SELECT STARTER",
    ctaStyle: "ghost" as const,
  },
  {
    key: "pro",
    eyebrow: "Standard Output",
    name: "PRO",
    monthly: 29,
    annual: 24,
    features: [
      "WAV + Stems",
      "5 Platforms",
      "30 AI Searches / Day",
      "250 Saved Results",
      "AI Match Previews",
    ],
    cta: "START 14-DAY FREE TRIAL",
    ctaStyle: "primary" as const,
    popular: true,
  },
  {
    key: "team",
    eyebrow: "Scale Force",
    name: "TEAM",
    monthly: 79,
    annual: 66,
    features: [
      "Unlimited Downloads",
      "15 Platforms",
      "Unlimited AI Searches",
      "Unlimited Saved Results",
      "5 Team Seats",
      "Dedicated Curator",
    ],
    cta: "SELECT TEAM",
    ctaStyle: "ghost" as const,
  },
];

const FAQ_ITEMS = [
  {
    q: "CAN I CANCEL MY SUBSCRIPTION AT ANY TIME?",
    a: "Yes. Access remains active until the end of your billing cycle. No data lock-ins.",
  },
  {
    q: "HOW DOES THE 14-DAY FREE TRIAL WORK?",
    a: "All plans include a 14-day free trial. Credit card required at signup. Cancel anytime during the trial — you won't be charged.",
  },
  {
    q: "WHAT HAPPENS TO MY LICENSES IF I CANCEL?",
    a: "All tracks licensed during an active subscription remain cleared for life.",
  },
  {
    q: "DO YOU OFFER EDUCATIONAL OR NON-PROFIT DISCOUNTS?",
    a: "Contact our support team with valid credentials for specialized pricing modules.",
  },
];

const BAR_HEIGHTS = [60, 40, 80, 55, 90, 35, 70, 50, 85, 45, 75, 65];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PUPricingPage() {
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";
  const [isAnnual, setIsAnnual] = useState(false);

  /* ---- shared helpers ---- */
  const mix = (token: string, pct: number) =>
    `color-mix(in srgb, var(--color-${token}) ${pct}%, transparent)`;

  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--color-on-surface)",
        background: "var(--color-surface)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Light-mode dot texture */}
      {!isDark && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(#C4C7C5 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <PUNav />

        {/* ============================================================ */}
        {/*  HERO                                                        */}
        {/* ============================================================ */}
        <section
          style={{
            background: "var(--color-surface)",
            padding: "64px 24px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 128,
          }}
        >
          {/* Light-mode eyebrow chip */}
          {!isDark && (
            <div
              style={{
                background: "var(--color-surface-container-high)",
                color: "var(--color-on-surface-variant)",
                fontFamily: "var(--font-display)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "6px 16px",
                borderRadius: 0,
                marginBottom: 24,
              }}
            >
              INSTRUMENTATION &amp; LICENSING
            </div>
          )}

          {/* Headline */}
          {isDark ? (
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.75rem, 5vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
                margin: 0,
              }}
            >
              CLINICAL{" "}
              <span style={{ color: "var(--color-primary)" }}>PRECISION</span>{" "}
              PRICING
            </h1>
          ) : (
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.75rem, 5vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
                margin: 0,
              }}
            >
              TRANSPARENT UTILITY
            </h1>
          )}

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              color: "var(--color-on-surface-variant)",
              maxWidth: 672,
              margin: "24px auto 0",
              lineHeight: 1.6,
            }}
          >
            Select your operational tier. All plans include broadcast-cleared
            licensing, AI-powered search, and instant delivery.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 48,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: !isAnnual
                  ? "var(--color-on-surface)"
                  : "var(--color-on-surface-variant)",
              }}
            >
              MONTHLY
            </span>

            {/* Toggle track */}
            <button
              type="button"
              onClick={() => setIsAnnual((v) => !v)}
              aria-label={
                isAnnual ? "Switch to monthly billing" : "Switch to annual billing"
              }
              style={{
                width: 56,
                height: 28,
                borderRadius: 0,
                background: "var(--color-surface-container-highest)",
                border: `1px solid ${mix("outline-variant", 30)}`,
                position: "relative",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: isAnnual ? 28 : 2,
                  width: 24,
                  height: 22,
                  borderRadius: 0,
                  background: isAnnual
                    ? "var(--color-primary-container)"
                    : "var(--color-on-surface-variant)",
                  transition: "left 0.2s, background 0.2s",
                }}
              />
            </button>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: isAnnual
                  ? "var(--color-primary)"
                  : "var(--color-on-surface-variant)",
              }}
            >
              ANNUAL
            </span>

            {/* Save badge */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--color-primary)",
                background: mix("primary", 10),
                border: `1px solid ${mix("primary", 20)}`,
                borderRadius: 10,
                padding: "4px 12px",
                letterSpacing: "0.04em",
              }}
            >
              Save 2 months
            </span>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PRICING CARDS                                               */}
        {/* ============================================================ */}
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              maxWidth: 1280,
              width: "100%",
              border: `1px solid ${mix(
                "outline-variant",
                isDark ? 15 : 30
              )}`,
              borderRadius: 0,
            }}
          >
            {TIERS.map((tier, i) => {
              const isPro = tier.popular;
              const price = isAnnual ? tier.annual : tier.monthly;

              /* card bg */
              let cardBg: string;
              if (isPro) {
                cardBg = isDark
                  ? "var(--color-surface-container-high)"
                  : "#FFFFFF";
              } else {
                cardBg = "var(--color-surface-container-low)";
              }

              /* card border */
              const borderRight =
                i < 2 && !isPro
                  ? `1px solid ${mix("outline-variant", isDark ? 15 : 30)}`
                  : undefined;

              /* cta styles */
              let ctaBg: string;
              let ctaColor: string;
              let ctaBorder: string;
              if (isPro) {
                ctaBg = "var(--color-primary-container)";
                ctaColor = "var(--color-on-primary)";
                ctaBorder = "none";
              } else if (isDark) {
                ctaBg = "transparent";
                ctaColor = "var(--color-on-surface)";
                ctaBorder = `1px solid var(--color-outline-variant)`;
              } else {
                ctaBg = "var(--color-surface-container-highest)";
                ctaColor = "var(--color-on-surface)";
                ctaBorder = "none";
              }

              return (
                <div
                  key={tier.key}
                  style={{
                    background: cardBg,
                    padding: 32,
                    borderRight,
                    position: "relative",
                    zIndex: isPro ? 10 : 1,
                    borderRadius: 0,
                    ...(isPro && isDark
                      ? {
                          borderLeft: "4px solid var(--color-primary)",
                          borderRight: "4px solid var(--color-primary)",
                          boxShadow: "0 0 40px rgba(195,245,255,0.05)",
                        }
                      : {}),
                    ...(isPro && !isDark
                      ? {
                          boxShadow:
                            "0 25px 50px -12px rgba(0,0,0,0.25)",
                          outline: "1px solid var(--color-primary-container)",
                        }
                      : {}),
                  }}
                >
                  {/* MOST POPULAR badge */}
                  {isPro && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "var(--color-primary-container)",
                        color: "var(--color-on-primary)",
                        fontFamily: "var(--font-display)",
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "4px 12px",
                        borderRadius: 0,
                      }}
                    >
                      MOST POPULAR
                    </div>
                  )}

                  {/* Eyebrow */}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: isPro
                        ? "var(--color-primary)"
                        : "var(--color-outline)",
                      marginBottom: 8,
                    }}
                  >
                    {tier.eyebrow}
                  </div>

                  {/* Tier name */}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 36,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                      marginBottom: 16,
                    }}
                  >
                    {tier.name}
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      marginBottom: 32,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 48,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      ${price}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      /mo
                    </span>
                  </div>

                  {/* Features */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 32px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: 14,
                            color: "var(--color-primary)",
                          }}
                        >
                          check_small
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/sign-up"
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      padding: 16,
                      width: "100%",
                      borderRadius: 0,
                      background: ctaBg,
                      color: ctaColor,
                      border: ctaBorder,
                      textDecoration: "none",
                      boxSizing: "border-box",
                      transition: "opacity 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (isPro) {
                        (e.currentTarget as HTMLElement).style.opacity = "0.9";
                      } else if (!isDark) {
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--color-primary-container)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPro) {
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                      } else if (!isDark) {
                        (e.currentTarget as HTMLElement).style.background =
                          ctaBg;
                      }
                    }}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trial note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 48,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--color-outline)",
          }}
        >
          All plans include a 14-day free trial
        </p>

        {/* ============================================================ */}
        {/*  FAQ                                                         */}
        {/* ============================================================ */}
        <section
          style={{
            maxWidth: 896,
            margin: "128px auto 0",
            padding: "0 24px",
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: 48,
              ...(isDark
                ? {}
                : { textAlign: "center" as const }),
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              SYSTEM CLARIFICATION (FAQ)
            </h2>
            <div
              style={{
                width: 48,
                height: 4,
                background: "var(--color-primary)",
                marginTop: 16,
                borderRadius: 0,
                ...(isDark
                  ? {}
                  : { marginLeft: "auto", marginRight: "auto" }),
              }}
            />
          </div>

          {/* FAQ items */}
          {isDark ? (
            /* Dark: single column, gap 1px dividers */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                background: mix("outline-variant", 20),
                border: `1px solid ${mix("outline-variant", 20)}`,
                borderRadius: 0,
              }}
            >
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.q}
                  style={{
                    background: "var(--color-surface)",
                    padding: 24,
                    borderRadius: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 14,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-primary)",
                    }}
                  >
                    {item.q}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--color-on-surface-variant)",
                      marginTop: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Light: 2x2 grid */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
              }}
            >
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={item.q}
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid ${mix("outline-variant", 30)}`,
                    padding: 32,
                    borderRadius: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 12,
                      color: "var(--color-primary)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {`0${idx + 1}. `}
                    {item.q}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--color-on-surface-variant)",
                      marginTop: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/*  DATA VIZ CARDS (dark only)                                  */}
        {/* ============================================================ */}
        {isDark && (
          <section
            style={{
              maxWidth: 1280,
              margin: "128px auto 0",
              padding: "0 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            {/* Card 1 — Signal Density */}
            <div
              style={{
                background: "var(--color-surface-container-low)",
                border: `1px solid ${mix("outline-variant", 10)}`,
                padding: 32,
                borderRadius: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: 4,
                  }}
                >
                  GLOBAL SIGNAL DENSITY
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--color-on-surface-variant)",
                    marginBottom: 24,
                  }}
                >
                  Real-time licensing activity
                </div>
                {/* Mini bar chart */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 4,
                    height: 80,
                  }}
                >
                  {BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: `${h}%`,
                        background: "var(--color-primary)",
                        borderRadius: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 36,
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    lineHeight: 1,
                  }}
                >
                  42,000+
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--color-outline)",
                    marginTop: 4,
                  }}
                >
                  Active Tracks
                </div>
              </div>
            </div>

            {/* Card 2 — Infrastructure Status */}
            <div
              style={{
                background: "var(--color-surface-container-low)",
                border: `1px solid ${mix("outline-variant", 10)}`,
                padding: 32,
                borderRadius: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: 4,
                  }}
                >
                  INFRASTRUCTURE STATUS
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--color-on-surface-variant)",
                    marginBottom: 24,
                  }}
                >
                  Network Health
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {/* Pulsing dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 0,
                      background: "var(--color-primary)",
                      animation: "puPulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    Operational: 99.98% Uptime
                  </span>
                </div>
              </div>
              {/* Decorative rotated square */}
              <div
                style={{
                  position: "absolute",
                  bottom: -40,
                  right: -40,
                  width: 128,
                  height: 128,
                  background: mix("primary", 10),
                  transform: "rotate(45deg)",
                  borderRadius: 0,
                }}
              />
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/*  FOOTER                                                      */}
        {/* ============================================================ */}
        <footer
          style={{
            background: "var(--color-surface-container)",
            borderTop: `1px solid ${mix("outline-variant", 10)}`,
            padding: "48px 24px",
            marginTop: 128,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--color-primary)",
              marginBottom: 16,
            }}
          >
            TRACKED
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              marginBottom: 16,
            }}
          >
            {["CATALOG", "PRICING", "HOW IT WORKS", "SUPPORT"].map(
              (label) => (
                <Link
                  key={label}
                  href="#"
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    color: "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </Link>
              )
            )}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "var(--color-on-surface-variant)",
            }}
          >
            &copy; 2026 Tracked Music Group
          </div>
        </footer>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes puPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <FloatingPlayer />
    </div>
  );
}
