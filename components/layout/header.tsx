"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeLink } from "@/components/theme-link";

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 glass-panel"
      style={{ zIndex: "var(--t-z-header, 40)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <ThemeLink
          href="/"
          className="t-headline-md"
          style={{
            fontFamily: "var(--t-logo-font)",
            fontStyle: "var(--t-logo-style)",
            color: "var(--t-color-primary)",
          }}
        >
          Tracked.
        </ThemeLink>

        <div className="flex items-center gap-6">
          <ThemeLink
            href="/pricing"
            className="t-label-lg hidden sm:block"
            style={{
              color: "var(--t-color-text-muted)",
              textDecoration: "var(--t-nav-underline)",
              textUnderlineOffset: "6px",
            }}
          >
            Browse
          </ThemeLink>
          <ThemeLink
            href="/pricing"
            className="t-label-lg hidden sm:block"
            style={{
              color: "var(--t-color-text-muted)",
              textDecoration: "var(--t-nav-underline)",
              textUnderlineOffset: "6px",
            }}
          >
            Pricing
          </ThemeLink>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <ThemeLink href="/sign-in">
              <button
                className="t-label-lg focus-glow"
                style={{
                  color: "var(--t-color-text-muted)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </ThemeLink>
            <ThemeLink href="/subscribe">
              <button
                className="t-label-lg focus-glow"
                style={{
                  background: "var(--t-color-primary)",
                  color: "var(--t-color-on-primary)",
                  border: "none",
                  borderRadius: "var(--t-radius-pill)",
                  padding: "10px 20px",
                  cursor: "pointer",
                  textTransform: "var(--t-button-case)" as "uppercase",
                }}
              >
                Get Started
              </button>
            </ThemeLink>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
