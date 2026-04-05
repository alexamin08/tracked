"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { WENav } from "./WENav";
import { CriticsNote } from "./CriticsNote";
import { useAudio } from "@/components/audio/audio-provider";
import type { SearchResponse, SearchResult } from "@/types";

/* ─── Demo rows when no real results ─── */
const DEMO_ROWS: SearchResult[] = [
  {
    id: "demo-1",
    trackId: "demo-1",
    title: "Midnight Heist",
    composer: "Marcus Thorne",
    description:
      "An undercover agent creeps through a darkened warehouse. High stakes, minimal synth pulse.",
    moods: ["Tense", "Dark"],
    genres: ["Cinematic", "Thriller"],
    albumName: null,
    previewUrl: null,
    similarity: 0.98,
    placements: [{ showName: "THE BEAR", network: "FX", sceneType: "Dramatic" }],
    explanation:
      "Matches your query's tense pacing with minor-key string ostinato and restrained percussion.",
  },
  {
    id: "demo-2",
    trackId: "demo-2",
    title: "Neon Frontier",
    composer: "Elena Volkov",
    description:
      "Cyberpunk cityscapes, night drives, high-speed chase sequences with a digital edge.",
    moods: ["Driving", "Electronic"],
    genres: ["Synthwave"],
    albumName: null,
    previewUrl: null,
    similarity: 0.94,
    placements: [{ showName: "SUCCESSION", network: "HBO", sceneType: "Dramatic" }],
    explanation:
      "Matches atmospheric requirements with expansive reverb and driving low-end bass synth.",
  },
  {
    id: "demo-3",
    trackId: "demo-3",
    title: "Quiet Resolution",
    composer: "Julian Gray",
    description:
      "Somber reflection, post-conflict dialogue, or a character coming to a difficult decision.",
    moods: ["Somber", "Reflective"],
    genres: ["Classical", "Drama"],
    albumName: null,
    previewUrl: null,
    similarity: 0.91,
    placements: [
      { showName: "OPPENHEIMER", network: "Universal", sceneType: "Dramatic" },
    ],
    explanation:
      "Matches emotional core with minimalist piano motifs and subtle cello undertones.",
  },
  {
    id: "demo-4",
    trackId: "demo-4",
    title: "Broken Circuit",
    composer: "Methodic",
    description:
      "Fast-cut action montages, high-tech infiltration, and chaotic confrontation scenes.",
    moods: ["Aggressive", "Chaotic"],
    genres: ["Industrial"],
    albumName: null,
    previewUrl: null,
    similarity: 0.87,
    placements: [{ showName: "MR. ROBOT", network: "USA", sceneType: "Action" }],
    explanation:
      "Matches aggressive intent with distorted glitch textures and heavy industrial drums.",
  },
];

const DEMO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy2T8wA36fDsbUwX5wotYrCTloCTXq8Bs-fWsZVZF10P-6ZmLaQdSggO-lXw_p2Gw26sQ28c85X3Ds-FcUMx2wRV95wFTYOwoC7Ju1QrgbwYcD_2X55fdpvCAw5M_AVXvTHvPnP8gF-mr3a_aoP5_pyFTP7MJmRVn13R4r1emw-g9jQlYdznleVswVgAi25WP1vR1seoMfXXZaulkEs0ECz1nIfcV2IyleCPkZLw8VAFF0QbUzRNOS2bDSsUEEbFMD0_snXz1w0U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgEsvLoKFfPwP30p2_ne21YEcr6RPmZaXAA5z7rUYU4pU4J-4Hi_8VOYld0MNDNmTOOUD3kdcmzaaDPAoo-g-esMp_iRK_sUPX971HDxLTVL71VlbwgWj_6x9IjcVppQ_HH7A0lgCNg_C8B6j5LRv5h9rym_TDjLAn6YzloQ_fei3woa0rp8AtMTzqvSrMKHVIeKoegHCJDXln4Q61y7L6o_WhnnQyOQaS61nmyjJMOMobStTwmwLrySYgeLVrtGWOSP9akQPuVYg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD83LdHXkJANM0ebGXu0W7u050XmsHLJmgI3PVyq8VPiTyhxXCXM_Jiup5g6g1HmmKceYx1LeG-UX3EFN326V34FYF3D896p7nJHPpgDDMgj8vACfjG_c2hEyxpH7n5K2PZkX_w47kLuVty4HZRuxFOlxwF3ZaJ36WGarnaAmQRNf_4xU9nOpB320rqb6fxYa_uBFdn9DEUrkv40zI1fUD05albPRZmaUg4kcMh6SjHrtNBBN1QSHzHGodR5mVsjqao-Nhyut3n3mo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbNxnXRFfi4ZpqkSmpGD9gi_K6mM0h5I8mMup1gMijkTLzPtb3nONN-ywr01PV2uObpckKWyTcdGCahW7npCZGG5fYBTfHUWWBDYqc85jxiVh0k2nbhJUHkVl7479qel6EtEQTIovR8QH_JwuXHc3iMVuf5Z7HXySBjOy-kqHFezdNGp-0pDToL-GdTEj-ok-rQW1PK1iwvv7i698oPIH3VSkwzqUh9xmRPONNzkZ4nab-Ied7OToTiAggjyWo5hP1Mygn-TrcY8w",
];

const BPM_VALUES = [122, 115, 74, 140];
const KEY_VALUES = ["Am", "D#m", "C", "Fm"];
const TIME_VALUES = ["2:45", "3:12", "1:58", "2:10"];

interface WESearchPageProps {
  query: string;
  data: SearchResponse | null;
}

export function WESearchPage({ query, data }: WESearchPageProps) {
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";
  const router = useRouter();
  const [inputValue, setInputValue] = useState(query);
  const audio = useAudio();

  const results = data?.results ?? [];
  const rows = results.length > 0 ? results : DEMO_ROWS;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <>
      <WENav />

      {isDark ? (
        <DarkSearchLayout
          query={query}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
          rows={rows}
          audio={audio}
        />
      ) : (
        <LightSearchLayout
          query={query}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
          rows={rows}
          audio={audio}
        />
      )}

      {/* ═══ FLOATING PLAYER ═══ */}
      {isDark ? (
        <DarkPlayer audio={audio} />
      ) : (
        <LightPlayer audio={audio} />
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
   LIGHT MODE LAYOUT
   ════════════════════════════════════════════════════════════════════ */

interface LayoutProps {
  query: string;
  inputValue: string;
  setInputValue: (v: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  rows: SearchResult[];
  audio: ReturnType<typeof useAudio>;
}

function LightSearchLayout({
  query,
  inputValue,
  setInputValue,
  handleSearch,
  rows,
  audio,
}: LayoutProps) {
  const filters = ["Cinematic", "Tense", "120+ BPM"];

  return (
    <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
      {/* ─── Search Header ─── */}
      <div
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          padding: "48px 24px 64px",
        }}
      >
        <form onSubmit={handleSearch} style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              borderBottom: "1px solid color-mix(in srgb, var(--color-primary) 10%, transparent)",
              paddingBottom: 12,
              transition: "border-color 300ms ease",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 30,
                color: "var(--color-primary)",
                flexShrink: 0,
              }}
            >
              search
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search the catalog..."
              style={{
                flex: 1,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-on-surface)",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />
          </div>
        </form>

        {/* Filter chips */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-on-surface-variant)",
            }}
          >
            Refined by:
          </span>
          {filters.map((f) => (
            <span
              key={f}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                color: "var(--color-primary)",
                backgroundColor: "var(--color-surface-container-high)",
                padding: "6px 16px",
                borderRadius: 9999,
              }}
            >
              {f}
            </span>
          ))}
          <button
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-primary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* ─── Track Results ─── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 96,
          marginBottom: 128,
        }}
      >
        {rows.map((track, idx) => (
          <LightTrackCard
            key={track.id}
            track={track}
            idx={idx}
            audio={audio}
          />
        ))}
      </div>
    </main>
  );
}

function LightTrackCard({
  track,
  idx,
  audio,
}: {
  track: SearchResult;
  idx: number;
  audio: ReturnType<typeof useAudio>;
}) {
  const [hovered, setHovered] = useState(false);
  const matchPct = Math.round(track.similarity * 100);
  const waveHeights = [18, 32, 24, 40, 28, 36, 20, 44, 30, 26, 38, 22, 34, 28, 42, 20, 36, 24, 30, 38];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 32,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Col 1 — Image (col-span-4) */}
      <div style={{ gridColumn: "span 4" }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
            alt={track.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(30%)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 700ms ease",
            }}
          />
          {/* Play overlay on hover */}
          {hovered && (
            <button
              onClick={() => {
                if (track.previewUrl) {
                  audio.play({
                    id: track.id,
                    title: track.title,
                    composer: track.composer,
                    previewUrl: track.previewUrl,
                  });
                }
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 32,
                  color: "var(--color-primary)",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                play_arrow
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Col 2 — Track Info (col-span-8) */}
      <div style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Row 1: Title + composer | Score + actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 400,
                color: "var(--color-on-surface)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {track.title}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-on-surface-variant)",
                marginTop: 4,
                display: "block",
              }}
            >
              {track.composer}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 24,
                fontWeight: 400,
                color: "var(--color-primary)",
              }}
            >
              {matchPct}%
            </span>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-on-surface-variant)",
                display: "flex",
                padding: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                download
              </span>
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-on-surface-variant)",
                display: "flex",
                padding: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                bookmark
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: As Heard On pull-quote */}
        {track.placements.length > 0 && (
          <div style={{ position: "relative", paddingLeft: 24 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                backgroundColor: "var(--color-primary)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--color-primary)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              As heard on
              <br />
              <span style={{ fontStyle: "normal", fontWeight: 600 }}>
                {track.placements[0].showName}
              </span>
            </p>
          </div>
        )}

        {/* Row 3: Critic's Note (indented) */}
        <div style={{ marginLeft: 48 }}>
          <CriticsNote text={track.explanation} />
        </div>

        {/* Row 4: Waveform + mood tags */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {/* Decorative waveform */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44 }}>
            {waveHeights.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: h,
                  borderRadius: 2,
                  backgroundColor: "var(--color-primary)",
                  opacity: 0.15 + (i % 4) * 0.2,
                  transition: "height 300ms ease",
                }}
              />
            ))}
          </div>

          {/* Mood tags */}
          <div style={{ display: "flex", gap: 8 }}>
            {track.moods.slice(0, 3).map((mood) => (
              <span
                key={mood}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "4px 12px",
                  borderRadius: 4,
                  backgroundColor: "var(--color-surface-container)",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                {mood}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Light Floating Player ─── */
function LightPlayer({ audio }: { audio: ReturnType<typeof useAudio> }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 96,
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid color-mix(in srgb, var(--color-primary) 10%, transparent)",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.06)",
        padding: "0 32px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
      }}
    >
      {/* Left: Album art + track info */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DEMO_IMAGES[0]}
          alt="Now playing"
          style={{ width: 48, height: 48, borderRadius: 4, objectFit: "cover" }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 18,
              fontWeight: 400,
              color: "var(--color-primary)",
              lineHeight: 1.2,
            }}
          >
            {audio.state.title || "Midnight Heist"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-on-surface-variant)",
              marginTop: 2,
            }}
          >
            {audio.state.composer || "Marcus Thorne"}
          </div>
        </div>
      </div>

      {/* Center: Transport */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-on-surface-variant)",
            display: "flex",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
            skip_previous
          </span>
        </button>
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-on-surface-variant)",
            display: "flex",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
            skip_next
          </span>
        </button>
      </div>

      {/* Right: Icon labels */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 20 }}>
        {[
          { icon: "play_circle", label: "Player" },
          { icon: "queue_music", label: "Queue" },
          { icon: "lyrics", label: "Lyrics" },
          { icon: "devices", label: "Devices" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: "var(--color-on-surface-variant)",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {icon}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DARK MODE LAYOUT
   ════════════════════════════════════════════════════════════════════ */

function DarkSearchLayout({
  query,
  inputValue,
  setInputValue,
  handleSearch,
  rows,
  audio,
}: LayoutProps) {
  const filters = ["Cinematic", "Tense", "120+ BPM"];

  /* Highlight key phrases in the query for the italic treatment */
  function renderQueryHeadline(q: string) {
    const words = q.split(" ");
    // Italicize every 3rd+ word as "key phrase"
    return words.map((w, i) => (
      <span
        key={i}
        style={
          i >= 2
            ? {
                fontStyle: "italic",
                color: "var(--color-primary-container)",
              }
            : undefined
        }
      >
        {w}{" "}
      </span>
    ));
  }

  return (
    <main
      style={{
        backgroundColor: "var(--color-surface)",
        minHeight: "100vh",
        paddingBottom: 160,
      }}
    >
      {/* ─── Search Header (dark) — grid layout ─── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 56px",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          alignItems: "end",
          gap: 32,
        }}
      >
        {/* Left: eyebrow + query headline */}
        <div style={{ gridColumn: "span 8" }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--color-primary)",
              display: "block",
              marginBottom: 16,
            }}
          >
            AI Search Results
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              color: "var(--color-on-surface)",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {renderQueryHeadline(query || "tense cinematic underscore")}
          </h1>
          {/* Inline search form */}
          <form onSubmit={handleSearch} style={{ marginTop: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderBottom: "1px solid color-mix(in srgb, var(--color-on-surface) 15%, transparent)",
                paddingBottom: 8,
                maxWidth: 480,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20, color: "var(--color-on-surface-variant)" }}
              >
                search
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Refine your search..."
                style={{
                  flex: 1,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "var(--color-on-surface)",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
          </form>
        </div>

        {/* Right: analysis status */}
        <div
          style={{
            gridColumn: "span 4",
            borderLeft: "1px solid color-mix(in srgb, var(--color-on-surface) 15%, transparent)",
            paddingLeft: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {/* Pulsing teal dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#2dd4bf",
                boxShadow: "0 0 8px #2dd4bf80",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-on-surface-variant)",
              }}
            >
              Analyzing 4,200+ stems...
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 36,
              fontWeight: 300,
              color: "var(--color-on-surface)",
              lineHeight: 1,
            }}
          >
            38
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-on-surface-variant)",
              marginLeft: 8,
            }}
          >
            Matches Found
          </span>
        </div>
      </div>

      {/* ─── Filter bar (dark) ─── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto 48px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-surface-container) 50%, transparent)",
            borderRadius: 8,
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 20, color: "var(--color-on-surface-variant)" }}
          >
            tune
          </span>
          {filters.map((f) => (
            <span
              key={f}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-on-surface-variant)",
                backgroundColor: "var(--color-surface-container-high)",
                padding: "6px 16px",
                borderRadius: 9999,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Track Results (dark — numbered rows with portrait images) ─── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
        {rows.map((track, idx) => (
          <DarkTrackCard
            key={track.id}
            track={track}
            idx={idx}
            audio={audio}
          />
        ))}
      </div>

      {/* Pulse animation for the teal dot */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </main>
  );
}

function DarkTrackCard({
  track,
  idx,
  audio,
}: {
  track: SearchResult;
  idx: number;
  audio: ReturnType<typeof useAudio>;
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(idx + 1).padStart(2, "0");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 32,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Col 1 — Row number (col-span-1) */}
      <div style={{ gridColumn: "span 1", display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 36,
            fontWeight: 400,
            color: hovered ? "var(--color-primary)" : "var(--color-on-surface-variant)",
            transition: "color 300ms ease",
            opacity: hovered ? 1 : 0.4,
          }}
        >
          {num}
        </span>
      </div>

      {/* Col 2 — Image (col-span-4, portrait 4:5) */}
      <div style={{ gridColumn: "span 4" }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: 6,
            overflow: "hidden",
            backgroundColor: "var(--color-surface-container)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
            alt={track.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
              transition: "filter 700ms ease",
            }}
          />
        </div>
      </div>

      {/* Col 3 — Track Info (col-span-4) */}
      <div
        style={{
          gridColumn: "span 4",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            fontWeight: 400,
            color: "var(--color-on-surface)",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {track.title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-on-surface-variant)",
          }}
        >
          {track.composer}
        </span>

        {/* Metadata grid: BPM / Key / Duration */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginTop: 8,
          }}
        >
          {[
            { label: "BPM", value: String(BPM_VALUES[idx % BPM_VALUES.length]) },
            { label: "Key", value: KEY_VALUES[idx % KEY_VALUES.length] },
            { label: "Duration", value: TIME_VALUES[idx % TIME_VALUES.length] },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-on-surface-variant)",
                  marginBottom: 4,
                  opacity: 0.6,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* CTA + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
          <button
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              border: "none",
              padding: "10px 24px",
              borderRadius: 9999,
              cursor: "pointer",
            }}
          >
            License Track
          </button>
          <button
            onClick={() => {
              if (track.previewUrl) {
                audio.play({
                  id: track.id,
                  title: track.title,
                  composer: track.composer,
                  previewUrl: track.previewUrl,
                });
              }
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-on-surface-variant)",
              display: "flex",
              padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              play_circle
            </span>
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-on-surface-variant)",
              display: "flex",
              padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              download
            </span>
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-on-surface-variant)",
              display: "flex",
              padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              bookmark
            </span>
          </button>
        </div>
      </div>

      {/* Col 4 — Critic's Note (col-span-3) */}
      <div
        style={{
          gridColumn: "span 3",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          justifyContent: "center",
          position: "relative",
          paddingLeft: 20,
        }}
      >
        {/* Vertical accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: "var(--color-primary)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 14,
            fontWeight: 400,
            color: "var(--color-primary-container)",
          }}
        >
          Why this track
        </span>
        <CriticsNote text={track.explanation} />
      </div>
    </div>
  );
}

/* ─── Dark Floating Player ─── */
function DarkPlayer({ audio }: { audio: ReturnType<typeof useAudio> }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 96,
        backgroundColor: "color-mix(in srgb, var(--color-surface-container) 90%, transparent)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--color-surface-container-high)",
        padding: "0 32px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
      }}
    >
      {/* Left: Album art + track info */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DEMO_IMAGES[0]}
          alt="Now playing"
          style={{ width: 48, height: 48, borderRadius: 4, objectFit: "cover" }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--color-on-surface)",
              lineHeight: 1.2,
            }}
          >
            {audio.state.title || "Midnight Heist"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-on-surface-variant)",
              marginTop: 2,
            }}
          >
            {audio.state.composer || "Marcus Thorne"}
          </div>
        </div>
      </div>

      {/* Center: Transport */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-on-surface-variant)",
            display: "flex",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
            skip_previous
          </span>
        </button>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 36,
            color: "var(--color-primary)",
            fontVariationSettings: "'FILL' 1",
            cursor: "pointer",
          }}
        >
          play_circle
        </span>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-on-surface-variant)",
            display: "flex",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
            skip_next
          </span>
        </button>
      </div>

      {/* Right: Icon labels */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 20 }}>
        {[
          { icon: "play_circle", label: "Player" },
          { icon: "queue_music", label: "Queue" },
          { icon: "lyrics", label: "Lyrics" },
          { icon: "devices", label: "Devices" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: "var(--color-on-surface-variant)",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {icon}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
