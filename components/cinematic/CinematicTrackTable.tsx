"use client";

import { useAudio } from "@/components/audio/audio-provider";
import type { SearchResult } from "@/types";

const DEMO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy2T8wA36fDsbUwX5wotYrCTloCTXq8Bs-fWsZVZF10P-6ZmLaQdSggO-lXw_p2Gw26sQ28c85X3Ds-FcUMx2wRV95wFTYOwoC7Ju1QrgbwYcD_2X55fdpvCAw5M_AVXvTHvPnP8gF-mr3a_aoP5_pyFTP7MJmRVn13R4r1emw-g9jQlYdznleVswVgAi25WP1vR1seoMfXXZaulkEs0ECz1nIfcV2IyleCPkZLw8VAFF0QbUzRNOS2bDSsUEEbFMD0_snXz1w0U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgEsvLoKFfPwP30p2_ne21YEcr6RPmZaXAA5z7rUYU4pU4J-4Hi_8VOYld0MNDNmTOOUD3kdcmzaaDPAoo-g-esMp_iRK_sUPX971HDxLTVL71VlbwgWj_6x9IjcVppQ_HH7A0lgCNg_C8B6j5LRv5h9rym_TDjLAn6YzloQ_fei3woa0rp8AtMTzqvSrMKHVIeKoegHCJDXln4Q61y7L6o_WhnnQyOQaS61nmyjJMOMobStTwmwLrySYgeLVrtGWOSP9akQPuVYg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD83LdHXkJANM0ebGXu0W7u050XmsHLJmgI3PVyq8VPiTyhxXCXM_Jiup5g6g1HmmKceYx1LeG-UX3EFN326V34FYF3D896p7nJHPpgDDMgj8vACfjG_c2hEyxpH7n5K2PZkX_w47kLuVty4HZRuxFOlxwF3ZaJ36WGarnaAmQRNf_4xU9nOpB320rqb6fxYa_uBFdn9DEUrkv40zI1fUD05albPRZmaUg4kcMh6SjHrtNBBN1QSHzHGodR5mVsjqao-Nhyut3n3mo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbNxnXRFfi4ZpqkSmpGD9gi_K6mM0h5I8mMup1gMijkTLzPtb3nONN-ywr01PV2uObpckKWyTcdGCahW7npCZGG5fYBTfHUWWBDYqc85jxiVh0k2nbhJUHkVl7479qel6EtEQTIovR8QH_JwuXHc3iMVuf5Z7HXySBjOy-kqHFezdNGp-0pDToL-GdTEj-ok-rQW1PK1iwvv7i698oPIH3VSkwzqUh9xmRPONNzkZ4nab-Ied7OToTiAggjyWo5hP1Mygn-TrcY8w",
];

const BPM = [122, 115, 74, 140, 98, 130, 88, 110];
const KEY = ["Am", "D#m", "C", "Fm", "G", "Bb", "Em", "Ab"];
const TIME = ["2:45", "3:12", "1:58", "2:10", "3:44", "2:22", "4:01", "1:35"];
const GRID = "64px 1fr 120px 80px 80px 80px 160px 160px 120px";

interface Props {
  tracks: SearchResult[];
  totalCount?: number;
}

export function CinematicTrackTable({ tracks, totalCount }: Props) {
  const audio = useAudio();
  const count = totalCount ?? tracks.length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `.ci-row:hover { background-color: var(--color-surface-container-low) !important; }` }} />

      <div style={{ backgroundColor: "var(--color-surface)", borderRadius: 8, boxShadow: "var(--shadow-ambient)" }}>

        {/* ═══ TABLE HEADER ═══ */}
        <div style={{ display: "grid", gridTemplateColumns: GRID, alignItems: "center", backgroundColor: "var(--color-surface-container)", borderBottom: "1px solid var(--color-outline-variant)", padding: "10px 16px" }}>
          <div style={{ textAlign: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--color-on-surface-variant)" }}>image</span>
          </div>
          {["TRACK DETAILS", "SCORE", "BPM", "KEY", "TIME", "GENRE", "AS HEARD ON", "ACTIONS"].map((label, i) => (
            <div key={label} style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)", textAlign: i >= 2 && i <= 4 ? "center" : i === 7 ? "right" : undefined, paddingRight: i === 7 ? 16 : undefined }}>
              {label}
            </div>
          ))}
        </div>

        {/* ═══ TRACK ROWS ═══ */}
        {tracks.map((track, idx) => {
          const matchPct = Math.round(track.similarity * 100);
          const explanationText = track.explanation || track.description || "";

          return (
            <div
              key={track.id}
              className="ci-row"
              style={{
                display: "grid",
                gridTemplateColumns: GRID,
                alignItems: "start",
                padding: "14px 16px",
                backgroundColor: "var(--color-surface)",
                borderBottom: "1px solid var(--color-outline-variant)",
                cursor: "pointer",
                transition: "background-color 150ms ease",
              }}
            >
              {/* 1. Thumbnail — 48x48, 8px radius */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
                  alt={track.title}
                  style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
                />
              </div>

              {/* 2. Track Details — Playfair Display title, Manrope composer */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingRight: 16 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--color-on-surface)" }}>
                  {track.title}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)" }}>
                  {track.composer}
                </span>
                {explanationText && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontStyle: "italic", fontWeight: 400, color: "var(--color-on-surface-variant)", lineHeight: 1.3, margin: 0 }}>
                    <span style={{ fontStyle: "normal", fontWeight: 700, color: "var(--color-secondary)" }}>AI MATCH: </span>
                    {explanationText}
                  </p>
                )}
                {track.explanation && track.description && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-on-surface-variant)", opacity: 0.6, lineHeight: 1.3, margin: 0 }}>
                    {track.description}
                  </p>
                )}
              </div>

              {/* 3. Score — gold outlined pill */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
                {matchPct > 0 ? (
                  <span style={{ border: "1px solid var(--color-secondary)", color: "var(--color-secondary)", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 9999, fontFamily: "var(--font-body)" }}>
                    {matchPct}% MATCH
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>&mdash;</span>
                )}
              </div>

              {/* 4. BPM */}
              <div style={{ textAlign: "center", paddingTop: 4, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                {BPM[idx % BPM.length]}
              </div>

              {/* 5. Key */}
              <div style={{ textAlign: "center", paddingTop: 4, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                {KEY[idx % KEY.length]}
              </div>

              {/* 6. Time */}
              <div style={{ textAlign: "center", paddingTop: 4, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                {TIME[idx % TIME.length]}
              </div>

              {/* 7. Genre tags — rounded, surface-container-highest bg */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingTop: 4 }}>
                {track.genres.slice(0, 2).map((genre) => (
                  <span key={genre} style={{ backgroundColor: "var(--color-surface-container-highest)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", padding: "2px 8px", borderRadius: 4, color: "var(--color-on-surface-variant)", fontFamily: "var(--font-body)" }}>
                    {genre}
                  </span>
                ))}
              </div>

              {/* 8. AS HEARD ON — gold pill with border */}
              <div style={{ paddingTop: 4 }}>
                {track.placements.length > 0 ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 9999, border: "1px solid color-mix(in srgb, var(--color-secondary) 30%, transparent)", color: "var(--color-secondary)", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-body)" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>tv</span>
                    {track.placements[0].showName}
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>&mdash;</span>
                )}
              </div>

              {/* 9. Actions — round play in primary-container, heart + download */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, paddingTop: 4, paddingRight: 8 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>favorite</span>
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
                </button>
                <button
                  onClick={() => { if (track.previewUrl) audio.play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl }); }}
                  style={{ width: 32, height: 32, borderRadius: 9999, backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* ═══ PAGINATION ═══ */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", backgroundColor: "var(--color-surface-container)", borderTop: "1px solid var(--color-outline-variant)" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)" }}>
            SHOWING 1-{Math.min(20, tracks.length)} OF {count.toLocaleString()}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button disabled style={{ padding: 4, borderRadius: 4, background: "none", border: "none", opacity: 0.3, display: "flex", color: "var(--color-on-surface)" }}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map((num) => (
              <button key={num} style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: num === 1 ? "var(--color-secondary)" : "transparent", color: num === 1 ? "var(--color-surface)" : "var(--color-on-surface)" }}>
                {num}
              </button>
            ))}
            <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>...</span>
            <button style={{ padding: 4, borderRadius: 4, background: "none", border: "none", cursor: "pointer", display: "flex", color: "var(--color-on-surface)" }}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
