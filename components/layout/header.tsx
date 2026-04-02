"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeLink } from "@/components/theme-link";
import { useTheme } from "@/components/theme-provider";

function ModeToggle() {
  const { resolvedMode, toggleColorMode } = useTheme();
  const isDark = resolvedMode === "dark";

  return (
    <button
      onClick={toggleColorMode}
      className="flex items-center justify-center focus-glow"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "var(--t-radius-pill)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--t-color-text-muted)",
        transition: "color 0.2s ease",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.05 3.05L4.11 4.11M11.89 11.89L12.95 12.95M12.95 3.05L11.89 4.11M4.11 11.89L3.05 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 9.5C12.6 10.4 11.4 11 10 11C7.24 11 5 8.76 5 6C5 4.6 5.6 3.4 6.5 2.5C3.92 3.07 2 5.31 2 8C2 11.31 4.69 14 8 14C10.69 14 12.93 12.08 13.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 glass-panel"
      style={{ zIndex: "var(--t-z-header, 40)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <ThemeLink
          href="/"
          className="t-headline-lg"
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
            href="/collections"
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

          {/* Light/Dark mode toggle */}
          <ModeToggle />

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
