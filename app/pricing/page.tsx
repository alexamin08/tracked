"use client";

import { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const TIERS = [
  { name: "Starter", subtitle: "ENTRY POINT", price: 15, annualPrice: 12, desc: "Perfect for independent creators and experimental projects.", popular: false, features: ["MP3 downloads", "2 platforms", "10 searches/day", "50 saved"], cta: "Select Starter", ctaStyle: "ghost" as const },
  { name: "Pro", subtitle: "STANDARD OUTPUT", price: 29, annualPrice: 24, desc: "The professional standard for agencies and content studios.", popular: true, features: ["WAV + stems", "5 platforms", "30 searches/day", "250 saved", "AI Match Previews"], cta: "Select Pro", ctaStyle: "filled" as const },
  { name: "Team", subtitle: "SCALE FORCE", price: 79, annualPrice: 66, desc: "Enterprise-grade infrastructure for high-volume units.", popular: false, features: ["Unlimited everything", "15 platforms", "5 seats included", "Dedicated curator"], cta: "Select Team", ctaStyle: "ghost" as const },
];

const FAQ = [
  { q: "Can I cancel my subscription at any time?", a: "Yes. Access remains active until the end of your billing cycle. No data lock-ins." },
  { q: "Are tracks cleared for YouTube monetization?", a: "Our Content ID protection ensures your channel is white-listed automatically upon license generation." },
  { q: "What happens to my licenses if I cancel?", a: 'All tracks licensed during an active subscription remain cleared for life. The "Forever-Clear" policy applies.' },
  { q: "Do you offer academic or non-profit discounts?", a: "Contact our support team with valid credentials for specialized pricing modules." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <TopNav />
      <main style={{ flexGrow: 1, paddingTop: 64, paddingBottom: 128, backgroundColor: "var(--color-surface)" }}>
        <header style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 48px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", textTransform: "uppercase", color: "var(--color-on-surface)", marginBottom: 24 }}>
            Clinical <span style={{ color: "var(--color-primary)" }}>Precision</span> Pricing
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "var(--color-on-surface-variant)", maxWidth: 640, margin: "0 auto" }}>
            Scale your production with high-fidelity AI music licensing. No complicated royalty tiers.
          </p>
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ width: 56, height: 28, backgroundColor: "var(--color-surface-container-highest)", border: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)", display: "flex", alignItems: "center", padding: 4, cursor: "pointer" }}>
              <div style={{ width: "50%", height: "100%", backgroundColor: annual ? "var(--color-primary-container)" : "transparent", transition: "all 200ms ease", marginLeft: annual ? "50%" : 0 }} />
            </button>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: annual ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}>Annual</span>
            {annual && <span style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)", color: "var(--color-primary)", border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)", padding: "2px 8px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Save 2 months</span>}
          </div>
        </header>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gap: 0, border: "1px solid color-mix(in srgb, var(--color-outline-variant) 15%, transparent)" }} className="grid-cols-1 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier.name} style={{ backgroundColor: tier.popular ? "var(--color-surface-container-high)" : "var(--color-surface-container)", padding: 32, display: "flex", flexDirection: "column", position: "relative", ...(tier.popular ? { borderLeft: "4px solid var(--color-primary)", borderRight: "4px solid var(--color-primary)", boxShadow: "0 0 40px color-mix(in srgb, var(--color-primary) 5%, transparent)", zIndex: 10 } : {}) }}>
              {tier.popular && <div style={{ position: "absolute", top: 0, right: 0, backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary)", padding: "4px 12px", fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>MOST POPULAR</div>}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: tier.popular ? "var(--color-primary)" : "var(--color-on-surface-variant)", marginBottom: 4 }}>{tier.subtitle}</h3>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--color-on-surface)" }}>{tier.name}</h2>
              </div>
              <div style={{ marginBottom: 32 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "var(--color-on-surface)" }}>${annual ? tier.annualPrice : tier.price}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>/mo</span>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", marginTop: 16 }}>{tier.desc}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48, flex: 1 }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href={tier.name === "Team" ? "#" : "/subscribe"} style={{ display: "block", width: "100%", padding: "16px 0", textAlign: "center", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", ...(tier.ctaStyle === "filled" ? { backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary)" } : { border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)", backgroundColor: "transparent" }) }}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </section>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>All plans include a 14-day free trial</p>
        </div>

        {/* FAQ */}
        <section style={{ maxWidth: 960, margin: "128px auto 0", padding: "0 24px" }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--color-on-surface)" }}>System Clarification (FAQ)</h2>
            <div style={{ height: 4, width: 48, backgroundColor: "var(--color-primary)", marginTop: 16 }} />
          </div>
          <div style={{ display: "grid", gap: 1, backgroundColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}>
            {FAQ.map((item) => (
              <div key={item.q} style={{ backgroundColor: "var(--color-surface)", padding: 24 }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 8 }}>{item.q}</h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data dashboard */}
        <section style={{ maxWidth: 1280, margin: "128px auto 0", padding: "0 24px", display: "grid", gap: 32 }} className="grid-cols-1 md:grid-cols-2">
          <div style={{ backgroundColor: "var(--color-surface-container)", padding: 32, border: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)", display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "var(--color-on-surface)", marginBottom: 24 }}>Global Signal Density</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
                {[16, 32, 24, 40, 20, 48, 28, 36, 16, 8, 44, 24].map((h, i) => (<div key={i} style={{ width: 4, height: h, backgroundColor: "var(--color-primary)" }} />))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--color-primary)" }}>124k+</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>Active Tracks</p>
            </div>
          </div>
          <div style={{ backgroundColor: "var(--color-surface-container)", padding: 32, border: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)", position: "relative", overflow: "hidden" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "var(--color-on-surface)", marginBottom: 24 }}>Infrastructure Status</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, backgroundColor: "var(--color-primary)", borderRadius: "50%" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-on-surface)" }}>Operational: 99.98% Uptime</span>
            </div>
            <div style={{ position: "absolute", right: 0, top: 0, width: 128, height: 128, opacity: 0.1, backgroundColor: "var(--color-primary)", transform: "rotate(45deg) translate(64px, -64px)" }} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingPlayer />
    </>
  );
}
