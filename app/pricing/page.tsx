"use client";

import { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const TIERS = [
  {
    name: "Starter",
    price: 15,
    annualPrice: 12,
    desc: "Perfect for individuals and small channels.",
    popular: false,
    features: ["MP3 downloads", "2 platforms", "10 searches/day", "50 saved"],
    cta: "Choose Starter",
    ctaStyle: "ghost" as const,
  },
  {
    name: "Pro",
    price: 29,
    annualPrice: 24,
    desc: "Our most robust toolkit for production houses.",
    popular: true,
    features: ["WAV + stems", "5 platforms", "30 searches/day", "250 saved", "AI Match Previews"],
    cta: "Start 14-Day Free Trial",
    ctaStyle: "filled" as const,
  },
  {
    name: "Team",
    price: 79,
    annualPrice: 66,
    desc: "Bespoke licensing for global networks.",
    popular: false,
    features: ["Unlimited everything", "15 platforms", "5 seats included", "Dedicated curator"],
    cta: "Contact Sales",
    ctaStyle: "ghost" as const,
  },
];

const FAQ = [
  { q: "Can I cancel anytime?", a: "Yes. Our subscriptions are flexible. You can cancel at any time, and your licenses will remain valid for content published during your active subscription period." },
  { q: "How does the 14-day free trial work?", a: "You get full access to the Pro tier for 14 days. We don\u2019t ask for billing information until you\u2019re ready to commit." },
  { q: "Are the tracks truly original?", a: "Every track in our catalog is composed by the Signature Tracks team and vetted for broadcast-quality production standards." },
  { q: "Do you offer educational or non-profit discounts?", a: "Yes. We offer 50% off all tiers for verified educational institutions and registered non-profits." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <TopNav />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "128px 24px 0", backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: 96 }}>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "var(--color-primary)", display: "block", marginBottom: 16 }}>
            The Sound of Curation
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--color-on-surface)", marginBottom: 32 }}>
            Investment in <br />Atmosphere.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "var(--color-on-surface-variant)", maxWidth: 640, margin: "0 auto" }}>
            Choose a plan that fits your production scale. From independent creators to global agencies, Tracked provides the sonic foundation for every narrative.
          </p>
        </header>

        {/* Toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 64 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: annual ? "var(--color-on-surface-variant)" : "var(--color-on-surface)" }}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} style={{ width: 56, height: 28, borderRadius: 9999, backgroundColor: "var(--color-surface-container-high)", position: "relative", border: "none", cursor: "pointer", padding: 4 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "var(--color-primary)", position: "absolute", top: 3, transition: "left 200ms ease, right 200ms ease", ...(annual ? { right: 4 } : { left: 4 }) }} />
          </button>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: annual ? "var(--color-on-surface)" : "var(--color-on-surface-variant)" }}>Annual</span>
          {annual && (
            <span style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary) 10%, transparent)", color: "var(--color-secondary)", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Save 2 months
            </span>
          )}
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, alignItems: "flex-end" }} className="md:grid-cols-3 grid-cols-1">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              style={{
                backgroundColor: "var(--color-surface-container)",
                padding: 40,
                borderRadius: "var(--radius-lg)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: tier.popular ? "2px solid color-mix(in srgb, var(--color-primary) 30%, transparent)" : "1px solid color-mix(in srgb, var(--color-outline-variant) 50%, transparent)",
                boxShadow: tier.popular ? "0 25px 50px -12px rgba(0,0,0,0.3)" : "none",
                transform: tier.popular ? "scale(1.05)" : "none",
                position: "relative",
                zIndex: tier.popular ? 10 : 1,
                overflow: "hidden",
              }}
            >
              {tier.popular && (
                <div style={{ position: "absolute", top: 0, right: 0, backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "4px 16px", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--color-on-surface)", marginBottom: 8 }}>{tier.name}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)" }}>{tier.desc}</p>
              </div>

              <div style={{ marginBottom: 40 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--color-on-surface)" }}>${annual ? tier.annualPrice : tier.price}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)" }}>/month</span>
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48, flex: 1 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.name === "Team" ? "#" : "/subscribe"}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "16px 0",
                  textAlign: "center",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: "var(--radius-md)",
                  ...(tier.ctaStyle === "filled"
                    ? { backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }
                    : { border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)", backgroundColor: "transparent" }),
                }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div style={{ maxWidth: 800, margin: "128px auto 0", borderLeft: "2px solid var(--color-primary)", paddingLeft: 32 }}>
          <blockquote style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 30, color: "var(--color-on-surface)", lineHeight: 1.4 }}>
            &ldquo;Tracked has fundamentally changed our post-production rhythm. The AI doesn&rsquo;t just find music; it finds the emotion we were looking for.&rdquo;
          </blockquote>
          <cite style={{ display: "block", marginTop: 24, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-primary)", fontStyle: "normal" }}>
            Director, Vanguard Studios
          </cite>
        </div>

        {/* FAQ — 2-column editorial grid */}
        <section style={{ marginTop: 160, display: "grid", gridTemplateColumns: "1fr", gap: 64 }} className="lg:grid-cols-2">
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--color-on-surface)", marginBottom: 24 }}>
              Common <br />Inquiries
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-on-surface-variant)", maxWidth: 320 }}>
              Everything you need to know about our licensing and technology.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {FAQ.map((item) => (
              <div key={item.q}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-on-surface)", marginBottom: 16 }}>{item.q}</h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
