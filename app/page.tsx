"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const SUGGESTED_SEARCHES = [
  "tense interrogation, true crime doc",
  "sun-drenched wedding, celebratory",
  "cold open, midnight, empty street",
  "high-energy reality competition",
  "emotional documentary reveal",
];

/* ─── Collection data (matches Stitch tiles) ─── */
const COLLECTIONS = [
  {
    name: "Reality Competition",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDikH6y288VRXRgON4B31Uu83DegJD9otpoEloUUAjbTeZfkCdsA4yHNe1DgTmcnWNieeYLTXCA3aIaBn782yQrvhFMYOnbFqFCK6J7qk7QljwRbupGObdg0noC6vmpMK8RbKde1ewJeSlCan8u8d7_kiLfNcRux9g0BCmgZ-q0Ucmn5TK5O6cSpv3ngc9aXfE4CWsYY5A98_uCI5_7qanx8yRElPRCeCuJe9I8Isygfe4LC7LPicRaWyuwZxrGqtu7mMOieZeeEemC",
  },
  {
    name: "True Crime",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZshPKxLifikP_NzuOzmrlsddPnrPnAebwQ_oEFjwHck5mBLTbK4nMI8Mb-R6hdOf_hYb_lQjocqkx2U05wlRDs9AcLUasjN9wp4OJbN-r5Y6wQMu9bkbcVpHF48DuZGixCk-BigODwR9hFN-mDEtuK2rrac-xGEIDZEO9MGlbm5EXSQvq9aEpNmaIoevzCBEpc2PJ6yHGffAVjLiL0VBEDot9j9lAH73kxTjO7tcfNV3OXQQKf7AdUOmW2Gn49m3taT1UNhRXKn5w",
  },
  {
    name: "Documentary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTC787Y7qKoHyBqEz9g2JZb7hfrPdTYCY2JnZcltH-l0NNj3MPrJReG9cXW0MXfTb6mVhzmhB_aS96oZT0WgUYyywdQqMBvsjBF3MUXYvd7YNfAGZjfWPQW7iM7ZCb71OeG1AFgvXh4DVxs6yKHV-JQ-8OIsS44XXN45HLp0HfM9AZf5zJmVk-kDPIH9Svb6YbvlnQwWimdpMtY1kHwhYM6cnCckhWyKHsGv64FjEWTIsu1CBf8YCpNHp4WAT0S-NsB0E_q91z3arY",
  },
  {
    name: "Dating Shows",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqaXVoLLTktqsaFdhOKqNBshAqiNgX0pMOZ11UM-pzGv9jZB5y_L2pzV_FAmXZoTkZa5XbSJ_rg6cPUJewdh28-N0cmOYSt1eE7izj_JZ_lm0q4v46d78twFTPnHLjihBT1yhk2-TiHzTCOfDmFukwDE3VtKGimRP3EXTpb-cEtiCFNhREtomcemTFvyebkld1cZ-Z3qSYbUANPaqZqtBd0oYe23hYIoOvVzsxtgVCBpWzSybOqtP4TUB76D1eW2b6L8aS1xPXTjn6",
  },
  {
    name: "Investigative",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGutDIAMF1XB1nayS-0NlMkOkbBezeS5Q2k2gln8nca6lsLiGt80D5uKv3faUiGqbMVo1Um_1g78mLRwbgRvJB7PnfD9hSmrDB5yCBt6mUyZ7e4Uqk8lNF83nyZG2fCKl6g8nevwamYKBZXgfKaodMcv9TGL5QbB1cQk6jGhmBJUyfg_EpdoBu3Hn_oXREgE1UtoWQpZRKt17w0-XLNLLdQBIVvkWySpS1ZFH4kEzF0a6zJckPCIBlkfcAkm5ptIGy4J-56TUCZxsn",
  },
];

export default function HomePage() {
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
      <TopNav />

      <main className="pt-24">
        {/* ============================
            HERO — 2-column grid
            ============================ */}
        <section
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "48px 32px 64px",
            display: "grid",
            gap: 64,
            alignItems: "center",
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Eyebrow */}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-secondary)",
                }}
              >
                The Digital Curator
              </span>

              {/* Headline — italic "Broadcast-Proven" + bold "Music for Your Scenes." */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--color-on-surface)",
                }}
              >
                Broadcast-Proven <br />
                <span style={{ fontStyle: "normal", fontWeight: 700 }}>
                  Music for Your Scenes.
                </span>
              </h1>
            </div>

            {/* Search input with glow */}
            <form onSubmit={handleSearch} style={{ position: "relative" }}>
              {/* Glow backdrop */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  background: "linear-gradient(to right, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-secondary) 20%, transparent))",
                  filter: "blur(8px)",
                  opacity: 0.3,
                  pointerEvents: "none",
                  transition: "opacity 1s ease",
                }}
              />
              <div
                style={{
                  position: "relative",
                  backgroundColor: "var(--color-surface-container)",
                  borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 16, flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="tense standoff, interrogation room, fluorescent light"
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 18, color: "var(--color-on-surface)" }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    padding: "12px 32px",
                    fontSize: 12,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Suggested searches */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
                TRY:
              </span>
              {SUGGESTED_SEARCHES.map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--color-on-surface-variant)", textDecoration: "none", transition: "color 150ms ease" }}
                >
                  {s}
                </Link>
              ))}
            </div>

            {/* Utility tags */}
            <div style={{ display: "flex", gap: 32, fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
              {["Instant License", "Stem Access", "Cue Sheet Ready"].map((tag) => (
                <span key={tag} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, backgroundColor: "var(--color-secondary)" }} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — image + overlapping badge */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                aspectRatio: "16 / 9",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMdDa7-UFjGkw2EvZjc-iLkomcY-Iw89X_2NZpaEcVDdnjoJK3kHWN8RUypbtYc3ki-G3qq8NqpQYHiy5vRv-OEHJGPvGPGaAQrLKENljPgpdUc02IgZV4lsdZ1LR314bf1ytfc3tpoO-6jyNadyhXvZpD6wEYZmwbJq219XbuU3BUL2z7D0fDHm3xkj-OiL6u2t7wtkFdENbJtvV87VU01ZcQgVvkrUmqaHBGKKFhKAZur14CeukuKiDwZAt8tFooEuQSYZT4HLe2"
                alt="Cinematic production still of a dark interrogation room with a single overhead light casting dramatic shadows"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Overlapping badge — offset bottom-left */}
            <div
              style={{
                position: "absolute",
                bottom: -32,
                left: -32,
                backgroundColor: "var(--color-surface-container)",
                padding: 24,
                border: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "color-mix(in srgb, var(--color-primary) 20%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
                  <rect x="4" y="4" width="3" height="16" rx="1" />
                  <rect x="10.5" y="7" width="3" height="10" rx="1" />
                  <rect x="17" y="2" width="3" height="20" rx="1" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-body)",
                    color: "var(--color-secondary)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Current Match
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    color: "var(--color-on-surface)",
                  }}
                >
                  Atmospheric Tension Vol. 4
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            STAT BAR
            ============================ */}
        <section
          style={{
            backgroundColor: "var(--color-surface-container)",
            borderTop: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
            borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
            padding: "32px 0",
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 32,
            }}
          >
            {/* Stat 1 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  letterSpacing: "-0.03em",
                }}
              >
                42,000+
              </span>
              <br />
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                compositions
              </span>
            </div>

            {/* Divider */}
            <div
              className="hidden md:block"
              style={{
                width: 1,
                height: 32,
                backgroundColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
              }}
            />

            {/* Stat 2 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  letterSpacing: "-0.03em",
                }}
              >
                140,000+
              </span>
              <br />
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                production files
              </span>
            </div>

            {/* Divider */}
            <div
              className="hidden md:block"
              style={{
                width: 1,
                height: 32,
                backgroundColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
              }}
            />

            {/* Stat 3 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 30,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "var(--color-secondary)",
                  letterSpacing: "-0.03em",
                }}
              >
                Scoring TV
              </span>
              <br />
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                Since 2008
              </span>
            </div>
          </div>
        </section>

        {/* ============================
            COLLECTIONS — Horizontal scroll
            ============================ */}
        <section style={{ padding: "64px 0 48px", overflow: "hidden" }}>
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "0 32px",
              marginBottom: 48,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3vw, 2.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--color-on-surface)",
              }}
            >
              Curated{" "}
              <span style={{ fontStyle: "normal", fontWeight: 700 }}>
                Collections
              </span>
            </h2>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                style={{
                  padding: 8,
                  border: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                  background: "none",
                  color: "var(--color-on-surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12l7-7M5 12l7 7" /></svg>
              </button>
              <button
                style={{
                  padding: 8,
                  border: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                  background: "none",
                  color: "var(--color-on-surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M19 12l-7-7M19 12l-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Scrollable tiles */}
          <div
            style={{
              display: "flex",
              gap: 24,
              padding: "0 32px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {COLLECTIONS.map((col) => (
              <Link
                key={col.name}
                href="/collections"
                style={{
                  flex: "none",
                  width: 320,
                  scrollSnapAlign: "start",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    marginBottom: 16,
                    overflow: "hidden",
                    position: "relative",
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
                      filter: "grayscale(100%)",
                      transition: "filter 700ms ease, transform 700ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(100%)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "color-mix(in srgb, var(--color-surface-container-lowest) 40%, transparent)",
                      transition: "background-color 300ms ease",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-on-surface-variant)",
                    transition: "color 300ms ease",
                  }}
                >
                  {col.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================
            HOW IT WORKS — "The Process"
            ============================ */}
        <section
          style={{
            backgroundColor: "var(--color-surface-container)",
            padding: "80px 0",
          }}
        >
          <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }}>
            {/* Centered header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 4vw, 3rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--color-on-surface)",
                  marginBottom: 16,
                }}
              >
                The{" "}
                <span style={{ fontStyle: "normal", fontWeight: 700 }}>
                  Process
                </span>
              </h2>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                Editorial precision at the speed of thought
              </p>
            </div>

            {/* 3-column grid with dashed connectors */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 64,
              }}
              className="md:grid-cols-3 grid-cols-1"
            >
              {/* Step 1 */}
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "var(--color-on-surface)",
                  }}
                >
                  Describe your scene
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--color-on-surface-variant)",
                    maxWidth: 280,
                  }}
                >
                  Input your visual prompts, mood boards, or scene descriptions
                  directly into our neural search engine.
                </p>
              </div>

              {/* Step 2 */}
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24, position: "relative" }}>
                {/* Dashed connectors */}
                <div
                  className="hidden md:block"
                  style={{
                    position: "absolute",
                    top: 32,
                    left: "-25%",
                    width: "50%",
                    borderTop: "1px dashed color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                  }}
                />
                <div
                  className="hidden md:block"
                  style={{
                    position: "absolute",
                    top: 32,
                    right: "-25%",
                    width: "50%",
                    borderTop: "1px dashed color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                  }}
                />
                <div
                  style={{
                    width: 64,
                    height: 64,
                    border: "1px solid color-mix(in srgb, var(--color-secondary) 20%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--color-secondary) 5%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "var(--color-on-surface)",
                  }}
                >
                  AI matches the music
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--color-on-surface-variant)",
                    maxWidth: 280,
                  }}
                >
                  Our curator engine analyzes structural motifs and harmonic
                  depth to find the perfect sonic companion.
                </p>
              </div>

              {/* Step 3 */}
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "var(--color-on-surface)",
                  }}
                >
                  License instantly
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--color-on-surface-variant)",
                    maxWidth: 280,
                  }}
                >
                  Full clearing and stem downloads ready for your DAW before
                  the next edit cycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            CTA SECTION
            ============================ */}
        <section style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 32px 0" }}>
          <div
            style={{
              backgroundColor: "var(--color-surface-container)",
              padding: "clamp(48px, 5vw, 96px)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              gap: 48,
            }}
            className="flex-col lg:flex-row lg:justify-between lg:items-center"
          >
            {/* Gradient accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "33%",
                height: "100%",
                background: "linear-gradient(to left, color-mix(in srgb, var(--color-primary) 5%, transparent), transparent)",
                pointerEvents: "none",
              }}
            />

            {/* Left — headline + CTA */}
            <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-on-surface)",
                  marginBottom: 32,
                }}
              >
                Elevate your production with{" "}
                <span style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                  Cinematic Intelligence.
                </span>
              </h2>
              <Link
                href="/subscribe"
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  padding: "20px 48px",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "transform 150ms ease",
                }}
              >
                Start Free Trial
              </Link>
            </div>

            {/* Right — "As used by" */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                backgroundColor: "color-mix(in srgb, var(--color-surface-container-highest) 50%, transparent)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: 32,
                border: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                maxWidth: 320,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-body)",
                  color: "var(--color-secondary)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                As used by
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: 0.6 }}>
                {["PRO-NETWORK 1", "STREAMER+", "STUDIO LABS"].map((name, i, arr) => (
                  <div
                    key={name}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--color-on-surface)",
                      paddingBottom: i < arr.length - 1 ? 8 : 0,
                      borderBottom: i < arr.length - 1 ? "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" : "none",
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
