"use client";

import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

/* ─── Collection data ─── */
const COLLECTIONS = [
  {
    name: "True Crime",
    desc: "Tension beds, investigation cues, and suspenseful underscore.",
    badge: "HIGH MATCH",
    badgeDot: true,
    tracks: 128,
  },
  {
    name: "Reality Competition",
    desc: "Elimination drama, reveals, and unscripted energy.",
    badge: "TRENDING",
    badgeDot: false,
    tracks: 96,
  },
  {
    name: "Global Docus",
    desc: "Cinematic scoring and reflective beds for factual storytelling.",
    badge: "EDITORIAL",
    badgeDot: false,
    tracks: 84,
  },
  {
    name: "Corporate Tech",
    desc: "Clean, confident beds for product launches and corporate film.",
    badge: "NEW",
    badgeDot: false,
    tracks: 112,
  },
];

/* ─── How It Works steps ─── */
const STEPS = [
  {
    num: "01.",
    label: "DESCRIBE",
    title: "Describe",
    desc: "Natural language prompts — describe the mood, pacing, and emotion of your scene. No keywords required.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    num: "02.",
    label: "MATCH",
    title: "Match",
    desc: "AI matches your scene against 140,000+ production files scored for broadcast television.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "03.",
    label: "LICENSE",
    title: "License",
    desc: "Single-click worldwide rights. Fully licensed, Content ID protected, no copyright claims.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: "42K", label: "COMPOSITIONS" },
  { value: "140K", label: "PRODUCTION FILES" },
  { value: "2008", label: "SCORING SINCE" },
  { value: "0.02s", label: "SEARCH LATENCY" },
];

export default function HomePage() {
  return (
    <>
      <TopNav />

      <main>
        {/* ============================
            SECTION: Hero — 45/55 grid
            ============================ */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            display: "grid",
            gridTemplateColumns: "45% 55%",
            minHeight: 580,
            alignItems: "center",
          }}
        >
          {/* Left column */}
          <div style={{ padding: "0 48px 80px 48px" }}>
            <div style={{ maxWidth: 560 }}>
              {/* Eyebrow */}
              <p
                className="ci-label-sm"
                style={{
                  color: "var(--color-secondary)",
                  marginBottom: 20,
                }}
              >
                THE DIGITAL CURATOR
              </p>

              {/* Headline */}
              <h1
                className="ci-display-lg"
                style={{
                  color: "var(--color-on-surface)",
                  fontSize: "4rem",
                  lineHeight: 1.08,
                  marginBottom: 36,
                }}
              >
                Broadcast-Proven
                <br />
                Music for
                <br />
                Your Scenes.
              </h1>

              {/* Search input with attached SEARCH button */}
              <div
                style={{
                  display: "flex",
                  height: 52,
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <div style={{ position: "relative", flex: 1 }}>
                  {/* Search icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-on-surface-variant)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="tense standoff, interrogation room, fluoresc..."
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--color-surface-container-lowest)",
                      border: "none",
                      outline: "none",
                      borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
                      padding: "0 16px 0 44px",
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontStyle: "italic",
                      color: "var(--color-on-surface)",
                    }}
                  />
                </div>
                <Link
                  href="/search"
                  className="ci-label-md"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    padding: "0 20px",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    textDecoration: "none",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  SEARCH
                </Link>
              </div>

              {/* Utility tags */}
              <div style={{ display: "flex", gap: 24 }}>
                {["INSTANT LICENSE", "STEM ACCESS", "CUE SHEET READY"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="ci-label-sm"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      <span style={{ color: "var(--color-secondary)" }}>
                        {"• "}
                      </span>
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right column — cinematic image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: 580,
              overflow: "hidden",
            }}
          >
            {/* Placeholder image — dark atmospheric */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #1a1520 0%, #0d1117 40%, #131820 100%)",
              }}
            />
            {/* Left-edge blend gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, var(--color-surface) 0%, transparent 30%)",
                pointerEvents: "none",
              }}
            />
            {/* Bottom gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(19,19,19,0.4) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                backgroundColor:
                  "color-mix(in srgb, var(--color-surface-container) 90%, transparent)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <p
                  className="ci-label-sm"
                  style={{ color: "var(--color-secondary)", marginBottom: 4 }}
                >
                  CURRENT MATCH
                </p>
                <p
                  className="ci-title-sm"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  Atmospheric Tension Vol. 4
                </p>
              </div>
              {/* Small waveform icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect x="1" y="6" width="2" height="4" rx="1" fill="var(--color-secondary)" />
                <rect x="5" y="3" width="2" height="10" rx="1" fill="var(--color-secondary)" />
                <rect x="9" y="5" width="2" height="6" rx="1" fill="var(--color-secondary)" />
                <rect x="13" y="4" width="2" height="8" rx="1" fill="var(--color-secondary)" />
              </svg>
            </div>
          </div>
        </section>

        {/* ============================
            SECTION: Stats Bar
            ============================ */}
        <section
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            padding: "28px 48px",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 32,
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p
                  className="ci-display-md"
                  style={{
                    color: "var(--color-on-surface)",
                    fontSize: 40,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="ci-label-sm"
                  style={{
                    color: "var(--color-on-surface-variant)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================
            SECTION: Curated Collections
            ============================ */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            padding: "80px 48px",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Section header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 40,
              }}
            >
              <div>
                <p
                  className="ci-label-sm"
                  style={{
                    color: "var(--color-secondary)",
                    marginBottom: 8,
                  }}
                >
                  CATALOG EXPLORATION
                </p>
                <h2
                  className="ci-headline-lg"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  CURATED COLLECTIONS
                </h2>
              </div>
              <Link
                href="/collections"
                className="ci-label-md"
                style={{
                  color: "var(--color-on-surface-variant)",
                  textDecoration: "none",
                }}
              >
                VIEW ARCHIVE →
              </Link>
            </div>

            {/* 4-column grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
              }}
            >
              {COLLECTIONS.map((col) => (
                <Link
                  key={col.name}
                  href="/collections"
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {/* Placeholder image */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${
                        col.name === "True Crime"
                          ? "#1a1520, #0d0810"
                          : col.name === "Reality Competition"
                          ? "#1a1215, #100810"
                          : col.name === "Global Docus"
                          ? "#0d1117, #0a1520"
                          : "#12150d, #0d100a"
                      })`,
                    }}
                  />
                  {/* Dark gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Badge (top-left) */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      backgroundColor:
                        "color-mix(in srgb, var(--color-surface-container) 80%, transparent)",
                      padding: "4px 8px",
                      borderRadius: 9999,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {col.badgeDot && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "var(--color-secondary)",
                        }}
                      />
                    )}
                    <span
                      className="ci-label-sm"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      {col.badge}
                    </span>
                  </div>

                  {/* Track count (top-right) */}
                  <span
                    className="ci-label-sm"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    {col.tracks} Tracks
                  </span>

                  {/* Collection name + desc (bottom-left) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      right: 16,
                    }}
                  >
                    <h3
                      className="ci-headline-sm"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      {col.name}
                    </h3>
                    <p
                      className="ci-body-sm"
                      style={{
                        color: "rgba(240, 237, 234, 0.75)",
                        marginTop: 4,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {col.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            SECTION: How It Works
            ============================ */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            padding: "80px 48px",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 48,
            }}
          >
            {STEPS.map((step) => (
              <div key={step.num}>
                {/* Step number */}
                <p
                  className="ci-label-lg"
                  style={{
                    color: "var(--color-secondary)",
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </p>

                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: "var(--color-surface-container)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  className="ci-title-lg"
                  style={{
                    color: "var(--color-on-surface)",
                    marginTop: 16,
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="ci-body-md"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
