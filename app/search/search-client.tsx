"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAudio } from "@/components/audio/audio-provider";
import { displayName } from "@/lib/utils";
import { trackPreview } from "@/lib/analytics";
import type { SearchResponse, SearchResult } from "@/types";

function Waveform({ trackId, progress }: { trackId: string; progress: number }) {
  const bars: number[] = [];
  let seed = 0;
  for (let i = 0; i < trackId.length; i++) seed += trackId.charCodeAt(i);
  for (let i = 0; i < 20; i++) { seed = (seed * 16807 + 7) % 2147483647; bars.push(8 + (seed % 24)); }
  const playedCount = Math.round((progress / 100) * bars.length);
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 32 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width: 4, height: h, backgroundColor: "var(--color-primary)", opacity: i < playedCount ? 0.8 : 0.4 }} />
      ))}
    </div>
  );
}

function PUTrackRow({ track }: { track: SearchResult }) {
  const { state, play, pause } = useAudio();
  const isPlaying = state.trackId === track.id && state.isPlaying;
  const progress = state.trackId === track.id && state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
  const matchPct = Math.round(track.similarity * 100);
  const placement = track.placements?.[0];
  const moods = track.moods?.slice(0, 2) ?? [];

  function handlePlay() {
    if (isPlaying) { pause(); return; }
    if (!track.previewUrl) return;
    play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl });
    trackPreview(track.id);
  }

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "180px 1fr 120px", alignItems: "center", backgroundColor: "var(--color-surface-container)", padding: 16, gap: 24, transition: "background-color 200ms ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-container-high)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-container)")}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-surface-container-highest)", cursor: track.previewUrl ? "pointer" : "default" }} onClick={handlePlay}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--color-surface-container-high), var(--color-surface-container-highest))", filter: "grayscale(100%)", transition: "filter 500ms ease" }} />
      </div>

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--color-on-surface)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{displayName(track.title)}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>{displayName(track.composer)}</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(placement || track.albumName) && (
              <span style={{ backgroundColor: "var(--color-surface-container-highest)", color: "var(--color-on-surface-variant)", padding: "4px 8px", fontSize: 10, fontFamily: "var(--font-body)", letterSpacing: "0.05em", textTransform: "uppercase", border: "1px solid color-mix(in srgb, var(--color-outline-variant) 15%, transparent)" }}>
                {placement ? `AS HEARD ON: ${displayName(placement.showName)}` : `FROM: ${displayName(track.albumName!)}`}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32 }}>
          <Waveform trackId={track.id} progress={progress} />
          <div style={{ display: "flex", gap: 8 }}>
            {moods.map((m) => (
              <span key={m} style={{ fontSize: 10, fontFamily: "var(--font-body)", padding: "4px 12px", backgroundColor: "color-mix(in srgb, var(--color-surface-container-highest) 50%, transparent)", color: "var(--color-on-surface-variant)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{m}</span>
            ))}
          </div>
        </div>
        {track.explanation && (
          <div style={{ padding: 8, backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)", borderLeft: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)" }}>
            <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "color-mix(in srgb, var(--color-primary) 80%, transparent)", lineHeight: 1.4 }}>
              <strong style={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginRight: 8 }}>AI MATCH:</strong>
              {track.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Match score */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
        {matchPct > 0 && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "var(--color-primary)", lineHeight: 1 }}>{matchPct}<span style={{ fontSize: 12 }}>%</span></div>
            <div style={{ fontSize: 10, fontFamily: "var(--font-body)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>Match Score</div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, color: "var(--color-on-surface-variant)" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px 128px", backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
      <div style={{ marginBottom: 48 }}>
        <form onSubmit={handleSearch} style={{ display: "flex", backgroundColor: "var(--color-surface-container-high)", alignItems: "center", padding: 4, maxWidth: 768 }}>
          <div style={{ padding: "0 16px", color: "var(--color-on-surface-variant)", display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Search AI library..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-body)", fontSize: 18, color: "var(--color-on-surface)", padding: "16px 0" }} />
          <button type="submit" style={{ padding: "8px 24px", backgroundColor: "var(--color-surface-container-highest)", color: "var(--color-primary)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>Execute</button>
        </form>
        {query && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16, fontSize: 12, fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
            <span>{results.length} results found{fallback ? " (keyword)" : ""}</span>
            <span style={{ height: 1, width: 32, backgroundColor: "var(--color-outline-variant)", display: "inline-block" }} />
            <span>Optimized for tension &amp; cinematic depth</span>
          </div>
        )}
      </div>
      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, backgroundColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}>
          {results.map((track) => (<PUTrackRow key={track.id} track={track} />))}
        </div>
      ) : query ? (
        <div style={{ textAlign: "center", paddingTop: 64 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>No results found</p>
        </div>
      ) : null}
    </main>
  );
}
