"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrecisionTrackTable } from "./PrecisionTrackTable";
import { PUNav } from "./PUNav";
import { useAudio } from "@/components/audio/audio-provider";
import type { SearchResult } from "@/types";

interface Props {
  initialQuery: string;
  tracks: SearchResult[];
  totalCount: number;
}

const FILTERS = ["Genre", "Mood", "BPM", "Key", "Duration"];

export function PrecisionResultsLayout({ initialQuery, tracks, totalCount }: Props) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const audio = useAudio();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <>
      <PUNav />

      {/* ═══ QUERY DISPLAY ═══ */}
      <div style={{ backgroundColor: "var(--color-surface)", padding: "32px 24px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Eyebrow */}
          <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-tertiary)" }}>
            Search Query Analysis
          </span>

          {/* Query + data chips row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginTop: 8 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--color-on-surface)", margin: 0, lineHeight: 1.1 }}>
              {initialQuery || "Search"}
            </h1>
            {/* Data chips */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", backgroundColor: "var(--color-surface-container-high)", border: "1px solid var(--color-outline-variant)", fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)" }}>
                RESULTS: {totalCount.toLocaleString()}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", backgroundColor: "var(--color-primary-container)", fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-primary-container)" }}>
                SEMANTIC MATCH
              </span>
            </div>
          </div>

          {/* Search input — bottom-border, Space Grotesk uppercase */}
          <form onSubmit={handleSearch} style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", borderBottom: "2px solid var(--color-outline-variant)", paddingBottom: 8 }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="DESCRIBE YOUR SCENE..."
                style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface)", background: "none", border: "none", outline: "none" }}
              />
              <button type="submit" style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)", border: "none", borderRadius: 0, padding: "8px 20px", cursor: "pointer" }}>
                Execute
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ═══ FILTER BAR ═══ */}
      <div style={{ position: "sticky", top: 56, zIndex: 40, backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-outline-variant)", padding: "10px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", minWidth: 0 }}>
            {FILTERS.map((filter) => (
              <button key={filter} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", borderRadius: 0, border: "1px solid var(--color-outline-variant)", backgroundColor: "transparent", fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                {filter}
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>expand_more</span>
              </button>
            ))}
            <button style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-outline)", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", marginLeft: "auto" }}>
              Clear all
            </button>
          </div>
          <select style={{ fontFamily: "var(--font-display)", background: "transparent", border: "1px solid var(--color-outline-variant)", borderRadius: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface)", cursor: "pointer", outline: "none", padding: "5px 8px" }}>
            <option>Best Match</option>
            <option>Newest First</option>
            <option>BPM (Ascending)</option>
          </select>
        </div>
      </div>

      {/* ═══ TRACK TABLE ═══ */}
      <main style={{ backgroundColor: "var(--color-surface)", paddingBottom: 128, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px 0" }}>
          <PrecisionTrackTable tracks={tracks} totalCount={totalCount} />
        </div>
      </main>

      {/* ═══ FLOATING PLAYER ═══ */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, height: 72, backgroundColor: "var(--color-surface-container-lowest)", borderTop: "2px solid var(--color-outline-variant)", boxShadow: "var(--shadow-player)", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 0, backgroundColor: "var(--color-surface-container-high)", filter: "grayscale(100%)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-on-surface)" }}>{audio.state.title || "No track"}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-outline)" }}>{audio.state.composer || ""}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>skip_previous</span></button>
            <button style={{ width: 36, height: 36, borderRadius: 0, backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>play_arrow</span></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>skip_next</span></button>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "0 16px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "var(--color-outline)", width: 28 }}>0:00</span>
            <div style={{ flex: 1, height: 2, backgroundColor: "var(--color-surface-container-highest)", overflow: "hidden" }}><div style={{ height: "100%", width: "0%", backgroundColor: "var(--color-primary-container)" }} /></div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "var(--color-outline)", width: 28 }}>0:00</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--color-on-surface-variant)" }}>volume_up</span>
          <div style={{ width: 64, height: 2, backgroundColor: "var(--color-surface-container-highest)", overflow: "hidden" }}><div style={{ height: "100%", width: "80%", backgroundColor: "var(--color-on-surface-variant)" }} /></div>
        </div>
      </div>
    </>
  );
}
