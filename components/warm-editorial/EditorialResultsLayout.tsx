"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { EditorialTrackTable } from "./EditorialTrackTable";
import { WENav } from "./WENav";
import { useAudio } from "@/components/audio/audio-provider";
import type { SearchResult } from "@/types";

interface Props {
  initialQuery: string;
  tracks: SearchResult[];
  totalCount: number;
}

const FILTERS = ["Genre", "Mood", "BPM", "Key", "Duration"];

export function EditorialResultsLayout({ initialQuery, tracks, totalCount }: Props) {
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";
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
      <WENav />

      {/* ═══ SEARCH BAR ═══ */}
      <div style={{ position: "sticky", top: 76, zIndex: 42, backgroundColor: "var(--color-surface)", borderBottom: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)", padding: "8px 24px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
          <form onSubmit={handleSearch}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)", paddingBottom: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: "var(--color-primary)", flexShrink: 0 }}>search</span>
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Search the catalog..." style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.02em", color: "var(--color-on-surface)", background: "none", border: "none", outline: "none" }} />
            </div>
          </form>
        </div>
      </div>

      {/* ═══ FILTER BAR ═══ */}
      <div style={{
        position: "sticky", top: 128, zIndex: 40,
        backgroundColor: "var(--color-surface)",
        borderTop: isDark ? "1px solid color-mix(in srgb, var(--color-on-surface) 10%, transparent)" : "none",
        borderBottom: isDark ? "1px solid color-mix(in srgb, var(--color-on-surface) 10%, transparent)" : "1px solid var(--color-outline-variant)",
        padding: "12px 24px",
      }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", minWidth: 0 }}>
            {FILTERS.map((filter) => (
              <button key={filter} style={{
                display: "flex", alignItems: "center", gap: 4, padding: "6px 14px",
                borderRadius: isDark ? 2 : 9999,
                backgroundColor: isDark ? "color-mix(in srgb, var(--color-primary-container) 10%, transparent)" : "var(--color-surface-container-high)",
                border: isDark ? "1px solid color-mix(in srgb, var(--color-primary-container) 20%, transparent)" : `1px solid color-mix(in srgb, var(--color-on-surface) 10%, transparent)`,
                fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-on-surface-variant)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {filter}
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
              </button>
            ))}
            <button style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, whiteSpace: "nowrap" }}>
              Reset Filters
            </button>
          </div>
          {/* Sort */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontStyle: "italic", color: "var(--color-on-surface-variant)", whiteSpace: "nowrap" }}>{totalCount.toLocaleString()} results</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-on-surface-variant)" }}>Sort By</span>
            <select style={{ fontFamily: "var(--font-body)", background: "transparent", border: "none", fontSize: 12, fontWeight: 700, color: "var(--color-on-surface)", cursor: "pointer", outline: "none", borderBottom: "2px solid var(--color-primary)", paddingBottom: 2 }}>
              <option>Best Match</option>
              <option>Newest First</option>
              <option>BPM (Ascending)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══ TRACK TABLE ═══ */}
      <main style={{ backgroundColor: "var(--color-surface)", paddingBottom: 128, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px 0" }}>
          <EditorialTrackTable tracks={tracks} totalCount={totalCount} />
        </div>
      </main>

      {/* ═══ FLOATING PLAYER ═══ */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, height: 80, backgroundColor: "var(--color-surface-container-lowest)", borderTop: "1px solid var(--color-outline-variant)", boxShadow: "var(--shadow-player)", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 2, backgroundColor: "var(--color-surface-container-high)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, fontStyle: "italic", color: "var(--color-on-surface)" }}>{audio.state.title || "No track"}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-on-surface-variant)" }}>{audio.state.composer || ""}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>skip_previous</span></button>
            <button style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>play_arrow</span></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex" }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>skip_next</span></button>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--color-on-surface-variant)", width: 28 }}>0:00</span>
            <div style={{ flex: 1, height: 2, backgroundColor: "var(--color-surface-container-highest)", borderRadius: 9999, overflow: "hidden" }}><div style={{ height: "100%", width: "0%", backgroundColor: "var(--color-primary)" }} /></div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--color-on-surface-variant)", width: 28 }}>0:00</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "var(--color-on-surface-variant)" }}>volume_up</span>
          <div style={{ width: 80, height: 2, backgroundColor: "var(--color-surface-container-highest)", borderRadius: 9999, overflow: "hidden" }}><div style={{ height: "100%", width: "80%", backgroundColor: "var(--color-on-surface-variant)" }} /></div>
        </div>
      </div>
    </>
  );
}
