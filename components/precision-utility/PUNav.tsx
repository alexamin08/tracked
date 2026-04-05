"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { label: "CATALOG", href: "/collections", matchPaths: ["/collections", "/search"] },
  { label: "PRICING", href: "/pricing", matchPaths: ["/pricing"] },
  { label: "HOW IT WORKS", href: "/how-it-works", matchPaths: ["/how-it-works"] },
] as const;

export function PUNav() {
  const pathname = usePathname();
  const { resolvedMode, toggleColorMode } = useTheme();

  function isActive(matchPaths: readonly string[]) {
    return matchPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        height: 64,
        background: "#111316",
        borderBottom: "1px solid color-mix(in srgb, #3B494C 10%, transparent)",
        borderRadius: 0,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Wordmark */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.05em",
          color: "#C3F5FF",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        TRACKED
      </Link>

      {/* Center: Nav links (hidden on mobile) */}
      <div
        style={{
          display: "none",
          gap: 32,
          alignItems: "center",
        }}
        className="pu-nav-center"
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(link.matchPaths);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="pu-nav-link"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: active ? "#C3F5FF" : "#94A3B8",
                textDecoration: "none",
                transition: "color 200ms",
                borderBottom: active ? "1px solid #C3F5FF" : "1px solid transparent",
                paddingBottom: active ? 4 : 4,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {/* Mode toggle */}
        <button
          onClick={toggleColorMode}
          aria-label={resolvedMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="pu-nav-link"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94A3B8",
            transition: "color 200ms",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          {resolvedMode === "dark" ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Sign In */}
        <Link
          href="/sign-in"
          className="pu-nav-link"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#94A3B8",
            textDecoration: "none",
            transition: "color 200ms",
          }}
        >
          SIGN IN
        </Link>

        {/* CTA */}
        <Link
          href="/sign-up"
          className="pu-nav-cta"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#111316",
            background: "#C3F5FF",
            padding: "8px 24px",
            borderRadius: 0,
            textDecoration: "none",
            transition: "opacity 200ms",
          }}
        >
          START FREE TRIAL
        </Link>
      </div>

      {/* Hover styles + responsive center nav */}
      <style>{`
        .pu-nav-link:hover {
          color: #C3F5FF !important;
        }
        .pu-nav-cta:hover {
          opacity: 0.8;
        }
        @media (min-width: 768px) {
          .pu-nav-center {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
