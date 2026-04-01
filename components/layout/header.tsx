"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-header glass-surface-light">
      <div className="max-w-6xl mx-auto px-6 h-header-h flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Tracked
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm text-content-secondary hover:text-content"
          >
            Pricing
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm text-content-secondary hover:text-content hidden md:block"
          >
            How it works
          </Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
