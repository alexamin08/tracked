"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SimpleNav } from "./SimpleNav";
import { SimpleTrackTable } from "./SimpleTrackTable";
import { useAudio } from "@/components/audio/audio-provider";
import type { SearchResult } from "@/types";

interface SimpleResultsLayoutProps {
  /** Text that appears in the search bar */
  initialQuery: string;
  /** Track data to render */
  tracks: SearchResult[];
  /** Total count for pagination display */
  totalCount: number;
}

export function SimpleResultsLayout({ initialQuery, tracks, totalCount }: SimpleResultsLayoutProps) {
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
      <SimpleNav />

      {/* ═══ SEARCH BAR ═══ */}
      <div
        style={{
          position: "sticky",
          top: 56,
          zIndex: 41,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "6px 24px",
        }}
      >
        <form onSubmit={handleSearch}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 4,
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              border: "1px solid #D1D5DB",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", paddingLeft: 10, color: "#6B7280" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your scene — tense interrogation, upbeat reality competition..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: 14, padding: "8px 10px",
                height: 36, color: "#111827",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#0053DB", color: "#FFFFFF",
                padding: "6px 20px", borderRadius: 6,
                fontWeight: 600, fontSize: 13,
                border: "none", cursor: "pointer", flexShrink: 0,
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ═══ FILTER BAR ═══ */}
      <div
        style={{
          position: "sticky",
          top: 104,
          zIndex: 40,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Left: filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", minWidth: 0 }}>
          {["Genre", "Mood", "BPM", "Key", "Duration"].map((filter) => (
            <button
              key={filter}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8,
                backgroundColor: "#F3F4F6", border: "1px solid #D1D5DB",
                fontSize: 12, fontWeight: 500, color: "#374151",
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {filter}
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#6B7280" }}>keyboard_arrow_down</span>
            </button>
          ))}
          <div style={{ width: 1, height: 16, backgroundColor: "#D1D5DB", margin: "0 8px", flexShrink: 0 }} />
          <button style={{ fontSize: 12, fontWeight: 700, color: "#0053DB", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
            Clear all
          </button>
        </div>
        {/* Right: count + sort — pinned right */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", whiteSpace: "nowrap" }}>
            {totalCount.toLocaleString()} tracks found
          </span>
          <select style={{ background: "transparent", border: "none", fontSize: 12, fontWeight: 700, color: "#111827", cursor: "pointer", outline: "none", whiteSpace: "nowrap" }}>
            <option>Sort by: Best Match</option>
            <option>Newest First</option>
            <option>BPM (Ascending)</option>
          </select>
        </div>
      </div>

      {/* ═══ DATA TABLE ═══ */}
      <main style={{ backgroundColor: "var(--color-surface)", paddingBottom: 128, minHeight: "100vh" }}>
        <div style={{ maxWidth: "100%", padding: "16px 24px 0" }}>
          <SimpleTrackTable tracks={tracks} totalCount={totalCount} />
        </div>
      </main>

      {/* ═══ FLOATING AUDIO PLAYER ═══ */}
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, height: 80,
          backgroundColor: "var(--color-surface-container-lowest)",
          borderTop: "1px solid rgba(173, 179, 180, 0.30)",
          boxShadow: "0 -10px 30px rgba(0,0,0,0.03)",
          padding: "0 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center",
        }}
      >
        {/* Left: Now playing */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 4, backgroundColor: "var(--color-surface-container-high)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--color-on-surface)" }}>
              {audio.state.title || "Midnight Heist"}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-on-surface-variant)" }}>
              {audio.state.composer || "Marcus Thorne"}
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex", marginLeft: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
          </button>
        </div>

        {/* Center: Transport */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>shuffle</span>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>skip_previous</span>
            </button>
            <button style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "var(--color-on-surface)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>skip_next</span>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>repeat</span>
            </button>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: "var(--color-on-surface-variant)", width: 32 }}>0:42</span>
            <div style={{ flex: 1, height: 1.5, backgroundColor: "var(--color-surface-container-highest)", borderRadius: 9999, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "33%", backgroundColor: "var(--color-primary)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: "var(--color-on-surface-variant)", width: 32 }}>2:45</span>
          </div>
        </div>

        {/* Right: Volume */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}>
            <span className="material-symbols-outlined">queue_music</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: "var(--color-on-surface-variant)" }}>volume_up</span>
            <div style={{ width: 80, height: 1, backgroundColor: "var(--color-surface-container-highest)", borderRadius: 9999, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "80%", backgroundColor: "var(--color-on-surface-variant)" }} />
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}>
            <span className="material-symbols-outlined">fullscreen</span>
          </button>
        </div>
      </div>
    </>
  );
}
