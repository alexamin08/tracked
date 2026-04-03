"use client";

import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

/* ─── Mock track data from Stitch design ─── */
const TRACKS = [
  {
    title: "Static Shadows",
    composer: "Marcus Vane",
    genre: "Cinematic Ambient",
    match: 94,
    network: "Netflix",
    tags: ["Tense", "Investigative", "Minor Key"],
    explanation:
      "The persistent staccato cello creates an underlying urgency that perfectly mirrors high-stakes questioning, while the cold digital textures evoke the clinical atmosphere of a modern crime lab.",
    duration: "03:42",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcYSak-6N1WqaLD5wMEoE6g-ItcMv8jX2sW_hTMFL-6Uarm_x_Pb6jvruozCKAkMy8syVamrAWVEr12mryPEyRE-ipC6NYcCqSqNt3JgRnqFyrJvzhRQKBSae_8FWZXJNr7jpHXvB-LdDl5DR-LCNPtVMHuJWm-_HGjzSqvb_fTaHKlQjVuvDWqZlT2hF4SJ-oX7XvcHWc_-rHb9_x7tMKYmOFsyP2rfEaiHqJdwuEWZ0UGougmTssE-F1RLGHyqt67CC9wW9ADYG7",
    bars: [33, 50, 66, 80, 100, 66, 50, 75, 100, 83, 66, 33, 50, 66, 83, 100, 80, 75, 50, 33],
  },
  {
    title: "The Paper Trail",
    composer: "Elena S.",
    genre: "Orchestral Noir",
    match: 89,
    network: "HBO Max",
    tags: ["Mystery", "Analytical", "Clock-like"],
    explanation:
      "Employs a relentless ticking percussion element that simulates a detective\u2019s logic unfolding. The sparse piano notes provide moments of cold clarity during narrative revelations.",
    duration: "02:15",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEcvFUekspbCqLHQLwokmMKQNB5OWnTYBCZLwCXSJV8KY3L3nGIszkzpioDfGm_13XHF96pUI5sYxbYwh2Dp_S1ChNmzEaO0T2HCa-QbYryqk3Q3Ld22eCKd-63S_m1cvEerHbFN8CgLyx4RAv6MkDGg5VqP1Prdp4bx2FWfKIMZU5BN021JErSxaiuol_cuKyK6_o6uC8GUnPuEA9V5EbkMLZgF42BmHA40I9RZYccMYo7t8hKcnOlOmy9NuORRiQnMWiSC0k3pGK",
    bars: [25, 33, 50, 75, 50, 33, 25, 50, 66, 75, 50, 33, 25, 50, 75, 100, 75, 50, 25, 33],
  },
  {
    title: "Echoes in the Hall",
    composer: "Dystopia Labs",
    genre: "Industrial Drone",
    match: 85,
    network: "Discovery",
    tags: ["Dark", "Suspense", "Cold"],
    explanation:
      "A deep, vibrating sub-bass creates physical tension. The occasional metallic clang suggests a sense of confinement, perfect for prison or isolation themes.",
    duration: "05:10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd_tQTii9GJmbb1OiREoZjGywuShxdoqSupTfxDEC4NPpFkavpfoUgX-5wrJtK_f_Zf3TUxJh49RpC2Myya5fwID_wb86PNb2RMzoVXqbS6NHexDx7e_wi3KorYCdAOXk5TVvCn-zx6iwMiO2pnWYgQ8Xo8dPKKUcuS0YeqHuUelYAZ1eJ4zLr8F96yYO7uVgLnUVtxwEbkXQJc3AgBoTqfUUEJa4DJOFx7rxPueKl_w7Ei5h_OxjbTrL1Hk3u8KDnoIfOhs3MsXh2",
    bars: [16, 20, 25, 33, 50, 66, 75, 66, 50, 33, 25, 20, 16, 20, 25, 33, 50, 66, 75, 50],
  },
  {
    title: "Connecting Dots",
    composer: "The Alchemist",
    genre: "Experimental Techno",
    match: 81,
    network: "A&E",
    tags: ["Complex", "Fast-Paced", "Urgent"],
    explanation:
      "A rapid, rhythmic pulse mimics the frantic energy of a chase or a breakthrough in an investigation. Minimalist and driving.",
    duration: "04:00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA52BWOtbFkJx4ds5WXiG2lJKZNYXdeffJq8HXNZ6Jh8hMDYyxom-S1J0tfwE1f-xySRC14XRmFd3C5hC4lfjpJQbLBmU60UhBmDMea8Q52kWePX5Vl_HT5LIniAHgLevU1FrqXe7E9F3iY7W9v4Fi7eMjYoB-lhGCaKqyKNcslax6gLxP_UAjq7JF5oRPo8O6lVT4ZUdCqW3oJCV5x6v-824XMDBIawGcGXki8rOiQT7-okkcx5fXSsFELft0M1lVX59SXX3pNHYb",
    bars: [50, 66, 75, 100, 75, 66, 50, 66, 75, 100, 75, 66, 50, 66, 75, 100, 75, 66, 50, 66],
  },
  {
    title: "The Unseen Witness",
    composer: "Lumina",
    genre: "Neo-Classical",
    match: 74,
    network: "Netflix",
    tags: ["Somber", "Cinematic", "Emotional"],
    explanation:
      "A melancholy violin melody sits atop a bed of unsettling synthesizers, providing a human element to the cold facts of a criminal case.",
    duration: "03:55",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjL57z-MPeuCvBMghZWv4ENSSyG6lCA3h2X5q6A08azwkdc-_rN0qihzM9GTw79MLhHWwOs_DGqJdtnXdtxRA2PDpwj-wloJCc3DZrlnW32bvYVDtbvRbSViBLvgn51AVTlfuhM6mxMFFEvIWhdeJGkN50OHUEk21_NdZJD9b7wJW7HChFKSXIDj5WFFfw4baNyL3f0Jm3oL2EC7rp85K3IxLxu9Xpb5j1R6xalv0blDWe3_iwzBp8YFMN81GtV9ToxkY4mL8EZY_m",
    bars: [50, 33, 25, 33, 50, 66, 50, 33, 25, 33, 50, 66, 50, 33, 25, 33, 50, 66, 50, 33],
  },
];

/* ─── Waveform component ─── */
function Waveform({ bars, playedPct = 65 }: { bars: number[]; playedPct?: number }) {
  const totalBars = bars.length + 10; // 10 additional unplayed-only bars
  const playedCount = Math.round((playedPct / 100) * bars.length);

  return (
    <div style={{ flex: 1, height: 32, display: "flex", alignItems: "flex-end", gap: 2 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: `${h}%`,
            backgroundColor: "var(--color-primary)",
            opacity: i < playedCount ? 0.4 : 0.2,
            borderRadius: 1,
          }}
        />
      ))}
      {/* Extra unplayed bars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`u-${i}`}
          style={{
            width: 2,
            height: `${bars[i % bars.length] * 0.7}%`,
            backgroundColor: "var(--color-primary)",
            opacity: 0.15,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Icon helpers ─── */
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function SearchPage() {
  return (
    <>
      <TopNav />

      <main
        style={{
          paddingTop: 112,
          paddingBottom: 128,
          paddingLeft: 32,
          paddingRight: 32,
          maxWidth: 1280,
          margin: "0 auto",
          backgroundColor: "var(--color-surface)",
          minHeight: "100vh",
        }}
      >
        {/* ============================
            SEARCH HEADER
            ============================ */}
        <header style={{ marginBottom: 64 }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-secondary)",
              }}
            >
              Curated Intelligence Search
            </span>
          </div>

          {/* Search input — full width, serif italic */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 24,
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface-variant)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              defaultValue="tense interrogation in a true crime doc"
              style={{
                width: "100%",
                backgroundColor: "var(--color-surface-container-lowest)",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                padding: "24px 32px 24px 64px",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 24,
                letterSpacing: "-0.02em",
                color: "var(--color-on-surface)",
                outline: "none",
              }}
            />
          </div>

          {/* Results meta */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 24,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "color-mix(in srgb, var(--color-on-surface-variant) 60%, transparent)",
            }}
          >
            <span>5 matches found</span>
            <span
              style={{
                borderLeft: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                paddingLeft: 24,
              }}
            >
              Sorted by relevance
            </span>
          </div>
        </header>

        {/* ============================
            TRACK RESULTS LIST
            ============================ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {TRACKS.map((track) => (
            <div
              key={track.title}
              style={{
                display: "grid",
                gridTemplateColumns: "4fr 8fr",
                gap: 32,
                padding: 32,
                transition: "background-color 200ms ease",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-surface-container-highest)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {/* Thumbnail */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-surface-container)",
                  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.5)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track.img}
                  alt={track.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.8,
                    transition: "transform 700ms ease",
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, var(--color-surface-container-lowest), transparent)",
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                />
                {/* Match badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-on-primary)",
                    padding: "4px 12px",
                    borderRadius: 9999,
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {track.match}% Match
                </div>
              </div>

              {/* Track info */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Title + actions row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 30,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        color: "var(--color-on-surface)",
                        transition: "color 200ms ease",
                      }}
                    >
                      {track.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-on-surface-variant)",
                        marginTop: 8,
                      }}
                    >
                      {track.composer} · {track.genre}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 16, color: "var(--color-on-surface-variant)" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex" }}><HeartIcon /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex" }}><DownloadIcon /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex" }}><PlusIcon /></button>
                  </div>
                </div>

                {/* Badges row — AS HEARD ON + mood tags */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                  {/* AS HEARD ON badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 12px",
                      backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 30%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--color-secondary) 20%, transparent)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-secondary)" stroke="none">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-secondary)",
                      }}
                    >
                      As Heard on {track.network}
                    </span>
                  </span>

                  {/* Mood tags */}
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "3px 8px",
                        backgroundColor: "var(--color-surface-container-highest)",
                        border: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* AI Explanation */}
                <div
                  style={{
                    backgroundColor: "var(--color-surface-container)",
                    padding: 16,
                    marginBottom: 24,
                    borderLeft: "2px solid color-mix(in srgb, var(--color-primary) 40%, transparent)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>
                      Why this track:
                    </span>{" "}
                    {track.explanation}
                  </p>
                </div>

                {/* Waveform + duration */}
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 16 }}>
                  <Waveform bars={track.bars} />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    {track.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FloatingPlayer />
    </>
  );
}
