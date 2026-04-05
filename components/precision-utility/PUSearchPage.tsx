"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PUNav } from "./PUNav";
import { useTheme } from "@/components/theme-provider";
import { useAudio } from "@/components/audio/audio-provider";
import type { SearchResponse, SearchResult } from "@/types";

/* ─── Demo tracks ─── */
const DEMO_ROWS: SearchResult[] = [
  {
    id: "demo-1",
    trackId: "demo-1",
    title: "SILENT PRESSURE",
    composer: "MARCUS THORNE",
    description: "Slow-burning tension build, undercover scenes, high-stakes negotiation.",
    moods: ["Tense", "Brooding"],
    genres: ["Cinematic", "Thriller"],
    albumName: null,
    previewUrl: null,
    similarity: 0.97,
    placements: [{ showName: "THE BEAR", network: "FX", sceneType: "Dramatic" }],
    explanation: "Matches tense pacing with minor-key string ostinato and restrained percussion layers.",
  },
  {
    id: "demo-2",
    trackId: "demo-2",
    title: "NEON FRONTIER",
    composer: "ELENA VOLKOV",
    description: "Cyberpunk cityscapes, night drives, high-speed chase sequences with digital edge.",
    moods: ["Driving", "Electronic"],
    genres: ["Synthwave"],
    albumName: null,
    previewUrl: null,
    similarity: 0.94,
    placements: [{ showName: "SUCCESSION", network: "HBO", sceneType: "Dramatic" }],
    explanation: "Matches atmospheric requirements with expansive reverb and driving low-end bass synth.",
  },
  {
    id: "demo-3",
    trackId: "demo-3",
    title: "QUIET RESOLUTION",
    composer: "JULIAN GRAY",
    description: "Somber reflection, post-conflict dialogue, difficult decisions.",
    moods: ["Somber", "Reflective"],
    genres: ["Classical", "Drama"],
    albumName: null,
    previewUrl: null,
    similarity: 0.91,
    placements: [{ showName: "OPPENHEIMER", network: "Universal", sceneType: "Dramatic" }],
    explanation: "Matches emotional core with minimalist piano motifs and subtle cello undertones.",
  },
  {
    id: "demo-4",
    trackId: "demo-4",
    title: "BROKEN CIRCUIT",
    composer: "METHODIC",
    description: "Fast-cut action montages, high-tech infiltration, chaotic confrontation scenes.",
    moods: ["Aggressive", "Chaotic"],
    genres: ["Industrial"],
    albumName: null,
    previewUrl: null,
    similarity: 0.87,
    placements: [{ showName: "MR. ROBOT", network: "USA", sceneType: "Action" }],
    explanation: "Matches aggressive intent with distorted glitch textures and heavy industrial drums.",
  },
];

const DEMO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy2T8wA36fDsbUwX5wotYrCTloCTXq8Bs-fWsZVZF10P-6ZmLaQdSggO-lXw_p2Gw26sQ28c85X3Ds-FcUMx2wRV95wFTYOwoC7Ju1QrgbwYcD_2X55fdpvCAw5M_AVXvTHvPnP8gF-mr3a_aoP5_pyFTP7MJmRVn13R4r1emw-g9jQlYdznleVswVgAi25WP1vR1seoMfXXZaulkEs0ECz1nIfcV2IyleCPkZLw8VAFF0QbUzRNOS2bDSsUEEbFMD0_snXz1w0U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgEsvLoKFfPwP30p2_ne21YEcr6RPmZaXAA5z7rUYU4pU4J-4Hi_8VOYld0MNDNmTOOUD3kdcmzaaDPAoo-g-esMp_iRK_sUPX971HDxLTVL71VlbwgWj_6x9IjcVppQ_HH7A0lgCNg_C8B6j5LRv5h9rym_TDjLAn6YzloQ_fei3woa0rp8AtMTzqvSrMKHVIeKoegHCJDXln4Q61y7L6o_WhnnQyOQaS61nmyjJMOMobStTwmwLrySYgeLVrtGWOSP9akQPuVYg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD83LdHXkJANM0ebGXu0W7u050XmsHLJmgI3PVyq8VPiTyhxXCXM_Jiup5g6g1HmmKceYx1LeG-UX3EFN326V34FYF3D896p7nJHPpgDDMgj8vACfjG_c2hEyxpH7n5K2PZkX_w47kLuVty4HZRuxFOlxwF3ZaJ36WGarnaAmQRNf_4xU9nOpB320rqb6fxYa_uBFdn9DEUrkv40zI1fUD05albPRZmaUg4kcMh6SjHrtNBBN1QSHzHGodR5mVsjqao-Nhyut3n3mo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbNxnXRFfi4ZpqkSmpGD9gi_K6mM0h5I8mMup1gMijkTLzPtb3nONN-ywr01PV2uObpckKWyTcdGCahW7npCZGG5fYBTfHUWWBDYqc85jxiVh0k2nbhJUHkVl7479qel6EtEQTIovR8QH_JwuXHc3iMVuf5Z7HXySBjOy-kqHFezdNGp-0pDToL-GdTEj-ok-rQW1PK1iwvv7i698oPIH3VSkwzqUh9xmRPONNzkZ4nab-Ied7OToTiAggjyWo5hP1Mygn-TrcY8w",
];

interface PUSearchPageProps {
  query: string;
  data: SearchResponse | null;
}

export function PUSearchPage({ query, data }: PUSearchPageProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(query);
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";
  const audio = useAudio();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeTrackIdx, setActiveTrackIdx] = useState<number | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  const results = data?.results ?? [];
  const tracks = results.length > 0 ? results : DEMO_ROWS;

  /* ─── Color tokens (resolved from CSS vars via inline fallbacks) ─── */
  const c = {
    surface: isDark ? "#111316" : "#F1F3F5",
    surfaceContainerLowest: isDark ? "#0C0E11" : "#FFFFFF",
    surfaceContainerLow: isDark ? "#1A1C1F" : "#F7F9FB",
    surfaceContainer: isDark ? "#1E2023" : "#F1F3F5",
    surfaceContainerHigh: isDark ? "#282A2D" : "#E2E4E7",
    surfaceContainerHighest: isDark ? "#333538" : "#D1D5DB",
    primary: isDark ? "#C3F5FF" : "#006875",
    onPrimary: isDark ? "#00363D" : "#FFFFFF",
    onSurface: isDark ? "#E2E2E6" : "#111316",
    outline: isDark ? "#849396" : "#ADB5BD",
    outlineVariant: isDark ? "#3B494C" : "#CED4DA",
  };

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  /* ─── Waveform bar heights (decorative) ─── */
  const barHeights = [12, 20, 8, 24, 16, 28, 10, 22, 14, 26, 18, 6, 20, 24, 12, 28, 16, 10, 22, 8];

  return (
    <div style={{ minHeight: "100vh", background: c.surface }}>
      <PUNav />

      {/* ─── SEARCH HEADER ─── */}
      <div
        style={{
          padding: "32px 24px 0",
          paddingTop: 64 + 32,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {isDark ? (
          /* ═══ DARK MODE HEADER ═══ */
          <>
            <form onSubmit={handleSearch}>
              <div
                style={{
                  background: c.surfaceContainerHigh,
                  padding: 4,
                  display: "flex",
                  border: `1px solid ${c.outlineVariant}4D`,
                  borderRadius: 0,
                  alignItems: "center",
                }}
              >
                {/* Search icon */}
                <div style={{ padding: 16, display: "flex", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your scene..."
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    color: c.onSurface,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: c.surfaceContainerHighest,
                    border: "none",
                    borderRadius: 0,
                    padding: "8px 24px",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: c.primary,
                    cursor: "pointer",
                  }}
                >
                  Execute
                </button>
              </div>
            </form>

            {/* Results meta */}
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: c.outline,
                }}
              >
                {tracks.length} results found
              </span>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: c.outlineVariant,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: c.outline,
                }}
              >
                Optimized for tension &amp; cinematic depth
              </span>
            </div>
          </>
        ) : (
          /* ═══ LIGHT MODE HEADER ═══ */
          <>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: c.outline,
                  whiteSpace: "nowrap",
                }}
              >
                Search Query Analysis
              </span>
              <div
                style={{
                  flexGrow: 1,
                  height: 1,
                  background: `${c.outlineVariant}4D`,
                }}
              />
            </div>

            {/* Query as headline */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: c.onSurface,
                margin: "0 0 20px 0",
                lineHeight: 1,
              }}
            >
              {query || "tension cinematic depth"}
            </h1>

            {/* Data chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {[
                { label: "Results", value: String(tracks.length) },
                { label: "Latency", value: "120ms" },
                { label: "Model", value: "v4.2" },
              ].map((chip) => (
                <div
                  key={chip.label}
                  style={{
                    background: c.surfaceContainerHighest,
                    borderRadius: 0,
                    padding: "4px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: c.outline,
                    }}
                  >
                    {chip.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      fontWeight: 600,
                      color: c.onSurface,
                    }}
                  >
                    {chip.value}
                  </span>
                </div>
              ))}
              {/* Special AI chip */}
              <div
                style={{
                  background: c.primary,
                  borderRadius: 0,
                  padding: "4px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill={c.onPrimary}>
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: c.onPrimary,
                  }}
                >
                  AI Generated Results
                </span>
              </div>
            </div>

            {/* Light mode search bar (below chips) */}
            <form onSubmit={handleSearch} style={{ marginTop: 16 }}>
              <div
                style={{
                  background: c.surfaceContainerHigh,
                  padding: 4,
                  display: "flex",
                  border: `1px solid ${c.outlineVariant}4D`,
                  borderRadius: 0,
                  alignItems: "center",
                }}
              >
                <div style={{ padding: 16, display: "flex", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Refine your search..."
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    color: c.onSurface,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: c.surfaceContainerHighest,
                    border: "none",
                    borderRadius: 0,
                    padding: "8px 24px",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: c.primary,
                    cursor: "pointer",
                  }}
                >
                  Execute
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* ─── TRACK RESULTS ─── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "24px auto 120px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            background: isDark ? `${c.outlineVariant}33` : `${c.outlineVariant}33`,
            borderRadius: 0,
          }}
        >
          {tracks.map((track, idx) => {
            const matchPct = Math.round(track.similarity * 100);
            const isHovered = hoveredIdx === idx;
            const isActive = activeTrackIdx === idx;
            const moodTags = track.moods.slice(0, 3);

            return (
              <div
                key={track.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr 120px",
                  alignItems: "center",
                  gap: 24,
                  padding: 16,
                  background: isHovered ? c.surfaceContainerHigh : c.surfaceContainerLow,
                  borderRadius: 0,
                  transition: "background 150ms",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveTrackIdx(idx);
                  if (track.previewUrl) {
                    audio.play({
                      id: track.id,
                      title: track.title,
                      composer: track.composer,
                      previewUrl: track.previewUrl,
                    });
                  }
                }}
              >
                {/* Col 1 — Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    background: c.surfaceContainerHighest,
                    borderRadius: 0,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
                    alt={track.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: isHovered ? "grayscale(0)" : "grayscale(100%)",
                      transition: "filter 500ms",
                    }}
                  />
                  {/* Play overlay on hover */}
                  {isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          background: c.primary,
                          borderRadius: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={c.onPrimary}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Col 2 — Track Info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                  {/* Title row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 700,
                        color: c.onSurface,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {track.title}
                    </span>
                    {track.placements.length > 0 && (
                      <span
                        style={{
                          flexShrink: 0,
                          background: c.surfaceContainerHighest,
                          border: `1px solid ${c.outlineVariant}26`,
                          borderRadius: 0,
                          padding: "2px 8px",
                          fontFamily: "var(--font-body)",
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: c.outline,
                        }}
                      >
                        AS HEARD ON
                      </span>
                    )}
                  </div>

                  {/* Composer */}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: c.outline,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {track.composer}
                  </span>

                  {/* Waveform + mood tags */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Decorative waveform */}
                    <div style={{ display: "flex", alignItems: "end", gap: 2, height: 28 }}>
                      {barHeights.slice(0, 12).map((h, i) => (
                        <div
                          key={i}
                          style={{
                            width: 4,
                            height: h,
                            background: `${c.primary}66`,
                            borderRadius: 0,
                            transition: "height 300ms",
                          }}
                        />
                      ))}
                    </div>
                    {/* Mood tags */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {moodTags.map((mood) => (
                        <span
                          key={mood}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: c.outline,
                            background: `${c.surfaceContainerHighest}80`,
                            padding: "2px 8px",
                            borderRadius: 0,
                          }}
                        >
                          {mood}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Match explanation */}
                  <div
                    style={{
                      background: `${c.primary}0D`,
                      borderLeft: `1px solid ${c.primary}4D`,
                      padding: 8,
                      borderRadius: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        fontWeight: 700,
                        color: c.primary,
                      }}
                    >
                      AI MATCH:{" "}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        color: `${c.primary}CC`,
                      }}
                    >
                      {track.explanation}
                    </span>
                  </div>
                </div>

                {/* Col 3 — Score + Actions */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 16,
                  }}
                >
                  {/* Match score */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 48,
                          fontWeight: 700,
                          color: c.primary,
                          lineHeight: 1,
                        }}
                      >
                        {matchPct}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 24,
                          fontWeight: 700,
                          color: c.primary,
                          lineHeight: 1,
                        }}
                      >
                        %
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: c.outline,
                      }}
                    >
                      MATCH
                    </span>
                  </div>

                  {/* Action icons */}
                  <div style={{ display: "flex", gap: 12 }}>
                    {/* Favorite */}
                    <button
                      aria-label="Favorite"
                      className="pu-action-icon"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: c.outline,
                        padding: 4,
                        display: "flex",
                        transition: "color 200ms",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    {/* Download */}
                    <button
                      aria-label="Download"
                      className="pu-action-icon"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: c.outline,
                        padding: 4,
                        display: "flex",
                        transition: "color 200ms",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── FLOATING PLAYER ─── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 50,
          background: isDark
            ? `rgba(40, 42, 45, 0.85)`
            : `rgba(233, 236, 239, 0.85)`,
          backdropFilter: isDark ? "blur(20px)" : "blur(20px)",
          WebkitBackdropFilter: isDark ? "blur(20px)" : "blur(20px)",
          borderTop: `1px solid ${c.outlineVariant}26`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        {/* Left 25% — Track info */}
        <div style={{ width: "25%", display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 0,
              overflow: "hidden",
              background: c.surfaceContainerHighest,
              flexShrink: 0,
            }}
          >
            {activeTrackIdx !== null && (
              <img
                src={DEMO_IMAGES[activeTrackIdx % DEMO_IMAGES.length]}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: c.primary,
              }}
            >
              Active Signal
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 700,
                color: c.onSurface,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeTrackIdx !== null
                ? tracks[activeTrackIdx]?.title ?? "No track selected"
                : audio.state.title || "No track selected"}
            </div>
          </div>
        </div>

        {/* Center 50% — Transport controls */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* Play/pause button */}
          <button
            onClick={() => {
              if (audio.state.isPlaying) {
                audio.pause();
              } else if (activeTrackIdx !== null) {
                const t = tracks[activeTrackIdx];
                if (t?.previewUrl) {
                  audio.play({
                    id: t.id,
                    title: t.title,
                    composer: t.composer,
                    previewUrl: t.previewUrl,
                  });
                }
              }
            }}
            aria-label={audio.state.isPlaying ? "Pause" : "Play"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: c.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            {audio.state.isPlaying ? (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            )}
          </button>

          {/* Progress bar */}
          <div style={{ width: "100%", maxWidth: 400, display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: c.outline,
                minWidth: 32,
                textAlign: "right",
              }}
            >
              {formatTime(audio.state.currentTime)}
            </span>
            <div
              style={{
                flex: 1,
                height: 4,
                background: c.surfaceContainerHighest,
                borderRadius: 0,
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={(e) => {
                if (audio.state.duration > 0) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ratio = (e.clientX - rect.left) / rect.width;
                  audio.seek(ratio * audio.state.duration);
                }
              }}
            >
              <div
                style={{
                  width:
                    audio.state.duration > 0
                      ? `${(audio.state.currentTime / audio.state.duration) * 100}%`
                      : "0%",
                  height: "100%",
                  background: c.primary,
                  transition: "width 100ms linear",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: c.outline,
                minWidth: 32,
              }}
            >
              {formatTime(audio.state.duration)}
            </span>
          </div>
        </div>

        {/* Right 25% — Waveform/Queue/Volume icon labels */}
        <div
          style={{
            width: "25%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Waveform */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12h2l3-9 4 18 4-12 3 6h4" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: c.outline,
              }}
            >
              WAVEFORM
            </span>
          </div>

          {/* Queue */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: c.outline,
              }}
            >
              QUEUE
            </span>
          </div>

          {/* Volume */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: c.outline,
              }}
            >
              VOLUME
            </span>
          </div>
        </div>
      </div>

      {/* Hover styles */}
      <style>{`
        .pu-action-icon:hover {
          color: ${c.primary} !important;
        }
      `}</style>
    </div>
  );
}
