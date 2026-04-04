"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { trackCheckoutStarted } from "@/lib/analytics";

export default function SubscribePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=/subscribe");
    }
  }, [isLoaded, isSignedIn, router]);

  async function handleSubscribe() {
    setLoading(true);
    trackCheckoutStarted();
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error ?? "Could not start checkout");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!isLoaded) return null;

  return (
    <>
      <TopNav />
      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, display: "flex", alignItems: "center", justifyContent: "center", padding: "112px 32px 96px" }}>
        <div style={{ maxWidth: 440, width: "100%", textAlign: "center", backgroundColor: "var(--color-surface-container)", padding: 48, boxShadow: "var(--shadow-ambient)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--color-on-surface)", marginBottom: 8 }}>
            Start your free trial
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-on-surface-variant)", marginBottom: 32 }}>
            14 days free. $15/mo after. Cancel anytime.
          </p>

          <ul style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", textAlign: "left", display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
            {["Unlimited AI scene matching", "Unlimited downloads", "All 53,000+ compositions", "Fully licensed for all platforms", "Content ID protection"].map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px 0",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "none",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 150ms ease",
            }}
          >
            {loading ? "Redirecting to checkout..." : "Start free trial"}
          </button>

          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-on-surface-variant)", marginTop: 16 }}>
            Credit card required. You will not be charged during the trial period.
          </p>
        </div>
      </main>
    </>
  );
}
