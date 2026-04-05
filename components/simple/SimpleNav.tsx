"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { href: "/collections", label: "Catalog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
];

function ModeToggle() {
  const { resolvedMode, toggleColorMode } = useTheme();
  const isDark = resolvedMode === "dark";

  return (
    <button
      onClick={toggleColorMode}
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#52525b",
        transition: "color 150ms ease",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.05 3.05L4.11 4.11M11.89 11.89L12.95 12.95M12.95 3.05L11.89 4.11M4.11 11.89L3.05 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5C12.6 10.4 11.4 11 10 11C7.24 11 5 8.76 5 6C5 4.6 5.6 3.4 6.5 2.5C3.92 3.07 2 5.31 2 8C2 11.31 4.69 14 8 14C10.69 14 12.93 12.08 13.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </button>
  );
}

export function SimpleNav() {
  const pathname = usePathname();

  /* Map pathname to "active" link — search pages activate "Catalog" */
  const activePath = pathname.startsWith("/search") ? "/collections" : pathname;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-outline-variant)",
        height: 56,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left zone */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            color: "var(--color-on-surface)",
            textDecoration: "none",
          }}
        >
          Tracked
        </Link>
        <div className="hidden md:flex" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {NAV_LINKS.map((link) => {
            const isActive = activePath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: "-0.01em",
                  color: isActive ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color 150ms ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right zone */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ModeToggle />
        <Link
          href="/sign-in"
          className="hidden sm:block"
          style={{
            fontSize: 14,
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            color: "var(--color-on-surface-variant)",
            textDecoration: "none",
          }}
        >
          Sign In
        </Link>
        <Link
          href="/subscribe"
          className="hidden sm:block"
          style={{
            fontSize: 14,
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
            padding: "6px 16px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Start Free Trial
        </Link>
      </div>
    </nav>
  );
}
