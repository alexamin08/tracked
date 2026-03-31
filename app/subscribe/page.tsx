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
      <main className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Start your free trial</h1>
          <p className="text-gray-500 text-sm mb-6">
            14 days free. $15/mo after. Cancel anytime.
          </p>

          <ul className="text-sm text-gray-600 space-y-2 text-left mb-8">
            <li>Unlimited AI scene matching</li>
            <li>Unlimited downloads</li>
            <li>All 53,000+ compositions</li>
            <li>Fully licensed for all platforms</li>
            <li>Content ID protection</li>
          </ul>

          <Button onClick={handleSubscribe} disabled={loading} size="lg" className="w-full">
            {loading ? "Redirecting to checkout..." : "Start free trial"}
          </Button>

          <p className="text-xs text-gray-400 mt-4">
            Credit card required. You will not be charged during the trial period.
          </p>
        </div>
      </main>
    </>
  );
}
