"use client";

import { useState } from "react";
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
      className="focus-glow"
      style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", transition: "color 150ms ease" }}
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

export function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 64,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "color-mix(in srgb, var(--color-surface-container) 90%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Left — Wordmark */}
        <Link
          href="/"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: 22, color: "var(--color-on-surface)", textDecoration: "none" }}
        >
          Tracked
        </Link>

        {/* Center — Nav links (desktop) */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="ci-label-md"
                style={{ color: isActive ? "var(--color-on-surface)" : "var(--color-on-surface-variant)", textDecoration: "none", position: "relative", paddingBottom: 4, transition: "color 150ms ease" }}
              >
                {link.label}
                {isActive && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, backgroundColor: "var(--color-primary)" }} />}
              </Link>
            );
          })}
        </nav>

        {/* Right — Auth actions (desktop) + hamburger (mobile) */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <ModeToggle />
          <Link href="/sign-in" className="ci-label-md hidden sm:block" style={{ color: "var(--color-on-surface-variant)", textDecoration: "none" }}>Sign In</Link>
          <Link href="/subscribe" className="ci-label-md hidden sm:block" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "10px 20px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>Start Free Trial</Link>
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface)", padding: 4, display: "flex" }}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "var(--color-surface)",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: 22, color: "var(--color-on-surface)", textDecoration: "none" }}>
              Tracked
            </Link>
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface)", padding: 4, display: "flex" }} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, color: pathname === link.href ? "var(--color-primary)" : "var(--color-on-surface)", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/sign-in" onClick={() => setMobileOpen(false)} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", textDecoration: "none", textAlign: "center", padding: "12px 0" }}>Sign In</Link>
            <Link href="/subscribe" onClick={() => setMobileOpen(false)} style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", padding: "16px 0" }}>Start Free Trial</Link>
          </div>
        </div>
      )}
    </>
  );
}
