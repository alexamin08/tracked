"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAudio } from "@/components/audio/audio-provider";
import { displayName } from "@/lib/utils";
import { trackPreview } from "@/lib/analytics";
import type { SearchResponse, SearchResult } from "@/types";

/* ─── Waveform ─── */
function Waveform({
  trackId,
  isPlaying,
  progress,
}: {
  trackId: string;
  isPlaying: boolean;
  progress: number;
}) {
  // Seed a deterministic pattern from trackId
  const bars: number[] = [];
  let seed = 0;
  for (let i = 0; i < trackId.length; i++) seed += trackId.charCodeAt(i);
  for (let i = 0; i < 30; i++) {
    seed = (seed * 16807 + 7) % 2147483647;
    bars.push(20 + (seed % 80));
  }

  const playedCount = Math.round((progress / 100) * bars.length);

  return (
    <div style={{ flex: 1, height: 32, display: "flex", alignItems: "flex-end", gap: 2 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: `${h}%`,
            backgroundColor: "var(--color-primary)",
            opacity: i < playedCount ? 0.8 : 0.25,
            borderRadius: 1,
            transition: "opacity 150ms ease",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Icons ─── */
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
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
  );
}
function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
  );
}

function formatDuration(sec: number | null) {
  if (!sec) return "";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ─── Track Card ─── */
function TrackCard({ track }: { track: SearchResult }) {
  const { state, play, pause } = useAudio();
  const isCurrentTrack = state.trackId === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;
  const progress = isCurrentTrack && state.duration > 0
    ? (state.currentTime / state.duration) * 100
    : 0;

  function handlePlay() {
    if (isPlaying) { pause(); return; }
    if (!track.previewUrl) return;
    play({
      id: track.id,
      title: track.title,
      composer: track.composer,
      previewUrl: track.previewUrl,
    });
    trackPreview(track.id);
  }

  const matchPct = Math.round(track.similarity * 100);
  const placement = track.placements?.[0];
  const moods = track.moods?.slice(0, 3) ?? [];
  const genre = track.genres?.[0] ?? "";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "4fr 8fr",
        gap: 32,
        padding: 32,
        transition: "background-color 200ms ease",
        borderRadius: "var(--radius-sm)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-surface-container-highest)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {/* Thumbnail area with play button */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--color-surface-container)",
          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.5)",
          cursor: track.previewUrl ? "pointer" : "default",
        }}
        onClick={handlePlay}
      >
        {/* Gradient placeholder art based on track title */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, var(--color-surface-container), var(--color-primary-container))`,
            opacity: 0.8,
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
        {/* Play button overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isPlaying ? 1 : 0,
            transition: "opacity 200ms ease",
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
        </div>

        {/* Match badge */}
        {matchPct > 0 && (
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
            {matchPct}% Match
          </div>
        )}
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
              }}
            >
              {displayName(track.title)}
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
              {displayName(track.composer)}
              {genre ? ` · ${displayName(genre)}` : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, color: "var(--color-on-surface-variant)" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex" }}><HeartIcon /></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex" }}><DownloadIcon /></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex" }}><PlusIcon /></button>
          </div>
        </div>

        {/* Badges row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {/* AS HEARD ON badge (placement) or FROM badge (album fallback) */}
          {(placement || track.albumName) && (
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
                {placement
                  ? `As Heard on ${displayName(placement.network || placement.showName)}`
                  : `From ${displayName(track.albumName!)}`}
              </span>
            </span>
          )}

          {/* Mood tags */}
          {moods.map((mood) => (
            <span
              key={mood}
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
              {mood}
            </span>
          ))}
        </div>

        {/* AI Explanation */}
        {track.explanation && (
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
        )}

        {/* Waveform + duration */}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <Waveform trackId={track.id} isPlaying={isPlaying} progress={progress} />
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
            {formatDuration((track as any).durationSec ?? null)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Client Component ─── */
interface SearchPageClientProps {
  query: string;
  data: SearchResponse | null;
}

export function SearchPageClient({ query, data }: SearchPageClientProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(query);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  const results = data?.results ?? [];
  const fallback = data?.fallback ?? false;

  return (
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

        {/* Search input */}
        <form onSubmit={handleSearch} style={{ position: "relative" }}>
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your scene..."
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
        </form>

        {/* Results meta */}
        {query && (
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
            <span>
              {results.length} match{results.length !== 1 ? "es" : ""} found
              {fallback ? " (keyword)" : ""}
            </span>
            <span
              style={{
                borderLeft: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                paddingLeft: 24,
              }}
            >
              Sorted by relevance
            </span>
          </div>
        )}
      </header>

      {/* ============================
          TRACK RESULTS
          ============================ */}
      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {results.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      ) : query ? (
        <div style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontStyle: "italic",
              color: "var(--color-on-surface-variant)",
              marginBottom: 12,
            }}
          >
            No matches found
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--color-on-surface-variant)",
            }}
          >
            Try adding more detail: mood, energy level, or reference a show
          </p>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontStyle: "italic",
              color: "var(--color-on-surface-variant)",
            }}
          >
            Describe your scene to find the perfect track
          </p>
        </div>
      )}
    </main>
  );
}
