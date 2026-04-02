"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
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
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center px-6" style={{ background: "var(--t-color-surface-low)" }}>
        <div
          className="max-w-md w-full text-center"
          style={{
            background: "var(--t-color-surface)",
            borderRadius: "var(--t-radius-lg)",
            padding: "var(--t-space-8)",
            boxShadow: "var(--t-shadow-ambient)",
          }}
        >
          <h1 className="t-display-sm mb-2" style={{ color: "var(--t-color-text)" }}>Start your free trial</h1>
          <p className="t-body-md mb-6" style={{ color: "var(--t-color-text-muted)" }}>
            14 days free. $15/mo after. Cancel anytime.
          </p>

          <ul className="t-body-md space-y-2 text-left mb-8" style={{ color: "var(--t-color-text-muted)" }}>
            <li>Unlimited AI scene matching</li>
            <li>Unlimited downloads</li>
            <li>All 53,000+ compositions</li>
            <li>Fully licensed for all platforms</li>
            <li>Content ID protection</li>
          </ul>

          <Button onClick={handleSubscribe} disabled={loading} size="lg" className="w-full">
            {loading ? "Redirecting to checkout..." : "Start free trial"}
          </Button>

          <p className="t-body-sm mt-4" style={{ color: "var(--t-color-text-muted)" }}>
            Credit card required. You will not be charged during the trial period.
          </p>
        </div>
      </main>
    </>
  );
}
