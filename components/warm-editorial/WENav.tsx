"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { label: "Catalog", href: "/collections", match: ["/collections", "/search"] },
  { label: "Pricing", href: "/pricing", match: ["/pricing"] },
  { label: "How It Works", href: "/how-it-works", match: ["/how-it-works"] },
] as const;

function SunIcon() {
  return (
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
  );
}

function MoonIcon() {
  return (
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
  );
}

export function WENav() {
  const pathname = usePathname();
  const { resolvedMode, toggleColorMode } = useTheme();
  const isDark = resolvedMode === "dark";

  function isActive(match: readonly string[]) {
    return match.some((m) => pathname === m || pathname.startsWith(m + "/"));
  }

  // --- Shared values ---
  const logoColor = isDark ? "#C05E3E" : "#994123";
  const linkInactiveColor = isDark ? "#A8A29E" : "#57534E";
  const ctaBg = "#994123";

  // --- Light mode ---
  if (!isDark) {
    return (
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(251, 249, 245, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1280,
            margin: "0 auto",
            height: 76,
          }}
        >
          {/* Left: Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: 30,
                color: logoColor,
                letterSpacing: "-0.05em",
              }}
            >
              Tracked
            </span>
          </Link>

          {/* Center: Nav links (hidden on mobile via media query workaround) */}
          <div
            className="we-nav-center"
            style={{
              display: "none",
              gap: 40,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.match);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: active ? "#994123" : linkInactiveColor,
                    textDecoration: "none",
                    borderBottom: active ? "2px solid #994123" : "2px solid transparent",
                    paddingBottom: 4,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = "#994123";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = linkInactiveColor;
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Auth + mode toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <button
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: linkInactiveColor,
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MoonIcon />
            </button>

            <Link
              href="/sign-in"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: linkInactiveColor,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#994123";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = linkInactiveColor;
              }}
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#FFFFFF",
                backgroundColor: ctaBg,
                padding: "10px 20px",
                borderRadius: 6,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>

        {/* Responsive: show center nav on desktop */}
        <style>{`
          @media (min-width: 768px) {
            .we-nav-center { display: flex !important; }
          }
        `}</style>
      </nav>
    );
  }

  // --- Dark mode (different structural layout) ---
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(12, 10, 9, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "0 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1280,
          margin: "0 auto",
          height: 76,
        }}
      >
        {/* Left: Logo + nav links grouped together */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: 30,
                color: logoColor,
                letterSpacing: "-0.05em",
              }}
            >
              Tracked
            </span>
          </Link>

          {/* Nav links inline with logo (hidden mobile) */}
          <div
            className="we-nav-dark-links"
            style={{
              display: "none",
              gap: 32,
              alignItems: "baseline",
            }}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.match);
              if (active) {
                // Active: Newsreader italic, 18px, editorial style
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#C05E3E",
                      textDecoration: "none",
                      borderBottom: "2px solid #994123",
                      paddingBottom: 4,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: linkInactiveColor,
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    paddingBottom: 4,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C05E3E";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkInactiveColor;
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Auth + mode toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: linkInactiveColor,
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SunIcon />
          </button>

          <Link
            href="/sign-in"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: linkInactiveColor,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C05E3E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = linkInactiveColor;
            }}
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#FFFFFF",
              backgroundColor: ctaBg,
              padding: "10px 20px",
              borderRadius: 6,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Responsive: show dark nav links on desktop */}
      <style>{`
        @media (min-width: 768px) {
          .we-nav-dark-links { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
