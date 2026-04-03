"use client";

import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    heading: "CATALOG",
    links: [
      { label: "New Releases", href: "#" },
      { label: "Top Rated", href: "#" },
      { label: "Stems Archive", href: "#" },
      { label: "AI Tools", href: "#" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Methodology", href: "#" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
  {
    heading: "CONNECT",
    links: [
      { label: "API Access", href: "#" },
      { label: "Help Desk", href: "#" },
      { label: "Social Feed", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0E0E0E",
        color: "#F0EDEA",
        padding: "64px 48px 40px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* 4-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Column 1 — Brand */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 20,
                fontWeight: 600,
                color: "#F0EDEA",
              }}
            >
              Tracked
            </span>
            <p
              style={{
                fontSize: 11,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#A09A96",
                marginTop: 12,
                lineHeight: 1.8,
              }}
            >
              THE SONIC LABORATORY
              <br />
              SCORING SINCE 2008
              <br />
              ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Columns 2–4 — Links */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "#A09A96",
                  marginBottom: 20,
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 14,
                        fontFamily: "var(--font-body)",
                        color: "#A09A96",
                        textDecoration: "none",
                        lineHeight: 2.0,
                        display: "block",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(58, 56, 54, 0.15)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(160, 154, 150, 0.4)",
            }}
          >
            VERSION 4.0.72 BUILD.FINAL
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "#A09A96",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
