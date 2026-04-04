"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAudio } from "@/components/audio/audio-provider";
import { displayName } from "@/lib/utils";
import { trackPreview } from "@/lib/analytics";
import type { SearchResponse, SearchResult } from "@/types";

function WETrackCard({ track, index }: { track: SearchResult; index: number }) {
  const { state, play, pause } = useAudio();
  const isPlaying = state.trackId === track.id && state.isPlaying;

  function handlePlay() {
    if (isPlaying) { pause(); return; }
    if (!track.previewUrl) return;
    play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl });
    trackPreview(track.id);
  }

  const matchPct = Math.round(track.similarity * 100);
  const genre = track.genres?.[0] ?? "";
  const placement = track.placements?.[0];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 32,
        alignItems: "start",
        opacity: index === 0 ? 1 : 0.8,
        transition: "opacity 300ms ease",
      }}
      className="md:grid-cols-12"
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = index === 0 ? "1" : "0.8")}
    >
      {/* Number */}
      <div
        className="md:col-span-1"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 36,
          fontStyle: "italic",
          color: "var(--color-outline-variant)",
          transition: "color 200ms ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Portrait thumbnail — 4:5 */}
      <div
        className="md:col-span-4"
        style={{
          aspectRatio: "4 / 5",
          backgroundColor: "var(--color-surface-container)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          position: "relative",
          cursor: track.previewUrl ? "pointer" : "default",
        }}
        onClick={handlePlay}
      >
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--color-surface-container), var(--color-primary-container))", filter: "grayscale(100%)", transition: "filter 700ms ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
        />
        {/* Play overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 200ms ease", backgroundColor: "color-mix(in srgb, var(--color-surface) 40%, transparent)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-on-surface)"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
        {/* Match badge */}
        {matchPct > 0 && (
          <div style={{ position: "absolute", top: 16, left: 16, backgroundColor: "var(--color-secondary)", color: "var(--color-on-primary)", padding: "4px 12px", borderRadius: 9999, fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {matchPct}% Match
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="md:col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", paddingTop: 8 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--color-on-surface)", lineHeight: 1.1, marginBottom: 8 }}>
            {displayName(track.title)}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", marginBottom: 24 }}>
            {displayName(track.composer)}{genre ? ` \u2022 ${displayName(genre)}` : ""}
          </p>

          {/* AS HEARD ON / Album badge */}
          {(placement || track.albumName) && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 24 }}>
              {placement ? `As Heard on ${displayName(placement.showName)}` : `From ${displayName(track.albumName!)}`}
            </p>
          )}

          {/* Mood tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {track.moods?.slice(0, 3).map((m) => (
              <span key={m} style={{ padding: "3px 10px", backgroundColor: "var(--color-surface-container-high)", borderRadius: 9999, fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/subscribe" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "12px 24px", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
            License
          </Link>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </button>
        </div>
      </div>

      {/* Critic's Note (AI Explanation) */}
      <div className="md:col-span-3">
        {track.explanation && (
          <div style={{ position: "relative", paddingTop: 8 }}>
            <div style={{ position: "absolute", left: -16, top: 0, width: 2, height: "100%", backgroundColor: "var(--color-primary)" }} />
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "var(--color-primary-container)", marginBottom: 12, lineHeight: 1.5 }}>
              &ldquo;Why this track&rdquo;
            </p>
            <div style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary) 5%, transparent)", borderTop: "1px dashed color-mix(in srgb, var(--color-secondary) 30%, transparent)", borderBottom: "1px dashed color-mix(in srgb, var(--color-secondary) 30%, transparent)", padding: 16 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface)", lineHeight: 1.7, fontStyle: "italic" }}>
                {track.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";

export function SearchPageClient({ query, data }: { query: string; data: SearchResponse | null }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(query);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length >= 3) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  const results = data?.results ?? [];
  const fallback = data?.fallback ?? false;

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "112px 32px 128px", backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
      {/* Search header */}
      <div style={{ marginBottom: 64, display: "grid", gridTemplateColumns: "1fr", gap: 32, alignItems: "flex-end" }} className="md:grid-cols-12">
        <div className="md:col-span-8">
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 16 }}>
            AI Search Results
          </p>
          {query ? (
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "var(--color-on-surface)", lineHeight: 1 }}>
              &ldquo;{query}&rdquo;
            </h1>
          ) : (
            <form onSubmit={handleSearch} style={{ position: "relative" }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your scene..."
                style={{ width: "100%", backgroundColor: "var(--color-surface-container)", border: "none", outline: "none", padding: "32px 80px 32px 40px", fontFamily: "var(--font-body)", fontSize: 20, borderRadius: "var(--radius-lg)", color: "var(--color-on-surface)" }}
              />
              <button type="submit" style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", width: 48, height: 48, borderRadius: "var(--radius-lg)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </button>
            </form>
          )}
        </div>
        {query && (
          <div className="md:col-span-4" style={{ borderLeft: "1px solid var(--color-outline-variant)", paddingLeft: 32, paddingBottom: 8 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", marginBottom: 8 }}>
              Analyzing catalog...
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, backgroundColor: "var(--color-secondary)", borderRadius: "50%" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-secondary)" }}>
                {results.length} Match{results.length !== 1 ? "es" : ""} Found{fallback ? " (keyword)" : ""}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Refine search when query exists */}
      {query && (
        <form onSubmit={handleSearch} style={{ marginBottom: 48, position: "relative" }}>
          <div style={{ backgroundColor: "color-mix(in srgb, var(--color-surface-container) 50%, transparent)", borderRadius: "var(--radius-lg)", padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-on-surface)" }}
            />
            <button type="submit" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "8px 20px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Refine
            </button>
          </div>
        </form>
      )}

      {/* Results */}
      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {results.map((track, i) => (
            <WETrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      ) : query ? (
        <div style={{ textAlign: "center", paddingTop: 64 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", color: "var(--color-on-surface-variant)" }}>No matches found</p>
        </div>
      ) : null}
    </main>
  );
}
