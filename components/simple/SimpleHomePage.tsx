"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SimpleNav } from "./SimpleNav";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const COLLECTIONS = [
  {
    name: "True Crime Narrative",
    count: "1,240",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvCF_yquMiZzzrbXj6DXXtfFpLVxiZ1paTqMAn5KwRsI2IWLWiB3ySGuWOr9yn9mSrnVFbdPX1L0xb5WmxeW6qtR_68fee6Po5GmuTKVu4ARON2wANfbMzysZDWyPDZqnWoPCLLCkCDFesLc3ajYju7y6PXqvCpfQcWH4I9yZrVmAsp4YbjWgYuuBgi6Hb1X_mySNDpBXLd7fgfKt1w9dWb1ybxeAW24ivUvc2p7odDAnJA2EI8Tf7bqw7TlhSa_2VZPstvOv5yc",
  },
  {
    name: "Competition Energy",
    count: "850",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs_pDe99H3Kqe_y1fZp2E692f2d0gN2p1yx2KTVIoBBhUg-qGoI6u5YPxd46mzH8riB7G3f9jL_P2V3CHyKzOkIjklfMSyibnTIi5MZdgdPXP66wiShZI7y7ZvqB0SGkpT8nwPV0uuzWymEdN-uCuxLRqDm0ohROXSCHiwwTsucj0rGaz9uCD93SO4xvKjO1nVFkMcGhoqi6MS3EuDusZe55L76ogRodApR0_sX6k6n2FgwBN99USvDSJZK5owyk5ebxJrD6msaMg",
  },
  {
    name: "Late Night Noir",
    count: "412",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhFAR18ra_UBADdXpHnWZcPLeV92ACij3MSQk_GtK4snp2BdK2yi9RPhn0kkfvGqG4MFOwur9LZK6q9z1kqIJ_n_4DKTjMOmIRxQyfFlsfM4BhlOxYumlOjnm9fNgNjh3K3uHnMb03Xme6zBUDbAM3YlmVh7x-xT3aNsbKXVFlVaZjo1O_8beUHLbKAIYOkVQzipdOQUPwtV8wCCUQyy2x2sk3ry_9OhjIU6wk9UN_eLoFyf3KDOhpISJA68uH055CvNhpM9foDG0",
  },
  {
    name: "The Lab: Experimental",
    count: "2,104",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtLH2OuZ2acuRSIyAolIE-BlhG2KqXOYAajhIeaRM2Ap8149VwzKVlKRsFvKoZPLEH0wnn32-kwJd-T2jzN38K0OoHTAZOP6w0ZOL-zXgEvCfE9ynJbKkT0_yElBLe8Q1iNp1FvirLZkeIKJSkqkrnPo3s5dIf2iDDyKWWRgUO0rQaau_X-WNX1dczk0sPOWqqvPfvGnL7n1FwtBVwl7-zcwKj-nKVBwycgX15vnXFcRT8Vhl2FfjYGu7kRrxYLPK794bwyv5ptMI",
  },
];

const STEPS = [
  {
    icon: "auto_awesome",
    title: "Describe Your Scene",
    desc: "Describe the emotional beat or action in plain English. Our AI understands dramatic subtext.",
  },
  {
    icon: "filter_list",
    title: "Refine and Preview",
    desc: "Filter by BPM, key, or energy. Audition tracks against your cut with one click.",
  },
  {
    icon: "download",
    title: "Instant Stems",
    desc: "Download full mixes or separated stems. All tracks are cleared for worldwide broadcast.",
  },
];

export function SimpleHomePage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <>
      <SimpleNav />

      <main style={{ paddingTop: 56 }}>
        {/* ═══ HERO ═══ */}
        <section
          style={{
            minHeight: 716,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            backgroundColor: "var(--color-surface)",
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(2.5rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--color-on-background)",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Find music for your project
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              fontWeight: 400,
              color: "var(--color-on-surface-variant)",
              lineHeight: 1.65,
              maxWidth: 672,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Search 42,000+ broadcast-proven compositions by scene, mood, or style.
            AI-powered matching in under 2 seconds.
          </p>

          {/* Search Input */}
          <form
            onSubmit={handleSearch}
            style={{ width: "100%", maxWidth: "80%", marginBottom: 32 }}
            className="md:max-w-[80%] max-w-full"
          >
            <div
              style={{
                display: "flex",
                padding: 6,
                backgroundColor: "var(--color-surface-container-lowest)",
                borderRadius: 12,
                border: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "border-color 200ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 16,
                  color: "var(--color-on-surface-variant)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Describe your scene — tense interrogation, upbeat reality competition, emotional documentary reveal..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  padding: "16px 16px",
                  color: "var(--color-on-surface)",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  padding: "8px 32px",
                  borderRadius: 8,
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Suggested query chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-body)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 700,
                color: "color-mix(in srgb, var(--color-on-surface-variant) 40%, transparent)",
                display: "flex",
                alignItems: "center",
                marginRight: 4,
              }}
            >
              TRY:
            </span>
            {["Tense Noir", "Reality Bounce", "Atmospheric Pulse", "Orchestral Sweep"].map(
              (chip) => (
                <Link
                  key={chip}
                  href={`/search?q=${encodeURIComponent(chip)}`}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 9999,
                    backgroundColor: "var(--color-surface-container)",
                    color: "var(--color-on-surface-variant)",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background-color 150ms ease",
                  }}
                >
                  {chip}
                </Link>
              )
            )}
          </div>

          {/* Stats line */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "color-mix(in srgb, var(--color-on-surface-variant) 60%, transparent)",
              textAlign: "center",
            }}
          >
            42,000+ compositions &middot; 140,000+ files &middot; Scoring TV since 2008
          </p>
        </section>

        {/* ═══ COLLECTIONS GRID ═══ */}
        <section
          style={{
            backgroundColor: "var(--color-surface-container-low)",
            padding: "96px 24px",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 48,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "var(--color-on-background)",
                  }}
                >
                  Curated Collections
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    fontWeight: 400,
                    color: "var(--color-on-surface-variant)",
                    marginTop: 4,
                  }}
                >
                  Browse by album. Scored for television.
                </p>
              </div>
              <Link
                href="/collections"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-primary)",
                  textDecoration: "none",
                }}
              >
                View All Collections
              </Link>
            </div>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 24,
              }}
              className="lg:grid-cols-4 sm:grid-cols-2 grid-cols-1"
            >
              {COLLECTIONS.map((col) => (
                <Link
                  key={col.name}
                  href="/collections"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <div
                    style={{
                      aspectRatio: "4/3",
                      borderRadius: 8,
                      overflow: "hidden",
                      backgroundColor: "var(--color-surface-container)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={col.img}
                      alt={col.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 500ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      color: "var(--color-on-background)",
                      marginTop: 16,
                      transition: "color 150ms ease",
                    }}
                  >
                    {col.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    {col.count} Tracks
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            padding: "96px 24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textAlign: "center",
              color: "var(--color-on-background)",
              marginBottom: 64,
            }}
          >
            Broadcast Ready in 3 Steps
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 48,
              maxWidth: 1024,
              margin: "0 auto",
            }}
            className="md:grid-cols-3 grid-cols-1"
          >
            {STEPS.map((step) => (
              <div
                key={step.title}
                style={{
                  padding: 32,
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: "var(--color-primary-container)",
                    color: "var(--color-on-primary-container)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--color-on-background)",
                    marginTop: 24,
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--color-on-surface-variant)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          backgroundColor: "var(--color-surface-container)",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
              paddingBottom: 48,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  color: "var(--color-on-surface)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Tracked
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--color-on-surface-variant)",
                }}
              >
                Professional scoring for the modern broadcast era.
              </p>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              {["Catalog", "Licensing", "Privacy", "Terms"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              paddingTop: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "color-mix(in srgb, var(--color-on-surface-variant) 60%, transparent)",
              }}
            >
              &copy; 2026 Tracked Music Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <FloatingPlayer />
    </>
  );
}
