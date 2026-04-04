"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CinematicTrackCard } from "@/components/track/CinematicTrackCard";
import type { SearchResponse } from "@/types";

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
      {/* SEARCH HEADER */}
      <header style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)" }}>
            Curated Intelligence Search
          </span>
        </div>

        {/* Search input with SEARCH button */}
        <form onSubmit={handleSearch} style={{ position: "relative", display: "flex" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 24, display: "flex", alignItems: "center", pointerEvents: "none" }}>
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
                border: "none",
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
          <button
            type="submit"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              padding: "0 32px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              transition: "opacity 150ms ease",
            }}
          >
            Search
          </button>
        </form>

        {query && (
          <div style={{ marginTop: 16, display: "flex", gap: 24, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-on-surface-variant) 60%, transparent)" }}>
            <span>{results.length} match{results.length !== 1 ? "es" : ""} found{fallback ? " (keyword)" : ""}</span>
            <span style={{ borderLeft: "1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)", paddingLeft: 24 }}>Sorted by relevance</span>
          </div>
        )}
      </header>

      {/* TRACK RESULTS */}
      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {results.map((track) => (
            <CinematicTrackCard key={track.id} track={track} />
          ))}
        </div>
      ) : query ? (
        <div style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", color: "var(--color-on-surface-variant)", marginBottom: 12 }}>No matches found</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)" }}>Try adding more detail: mood, energy level, or reference a show</p>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", color: "var(--color-on-surface-variant)" }}>Describe your scene to find the perfect track</p>
        </div>
      )}
    </main>
  );
}
