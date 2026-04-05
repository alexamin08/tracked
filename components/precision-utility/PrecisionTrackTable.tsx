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

interface Props {
  tracks: SearchResult[];
  totalCount?: number;
}

export function PrecisionTrackTable({ tracks, totalCount }: Props) {
  const audio = useAudio();
  const count = totalCount ?? tracks.length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .pu-row:hover { background-color: var(--color-surface-container-low) !important; }
        .pu-row:hover img { filter: grayscale(0) !important; }
        .pu-row:hover .pu-play-overlay { opacity: 1 !important; }
      `}} />

      <div style={{ backgroundColor: "var(--color-surface)", borderRadius: 0, boxShadow: "var(--shadow-ambient)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          {/* ═══ TABLE HEADER ═══ */}
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface-container)", borderBottom: "1px solid var(--color-outline-variant)" }}>
              {["TRACK DETAILS", "SCORE", "BPM", "KEY", "TIME", "GENRE", "AS HEARD ON", "ACTIONS"].map((label, i) => (
                <th key={label} style={{ padding: "10px 8px", fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-on-surface-variant)", textAlign: i >= 1 && i <= 4 ? "center" : i === 7 ? "right" : "left", paddingRight: i === 7 ? 16 : 8, paddingLeft: i === 0 ? 16 : 8 }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          {/* ═══ TRACK ROWS ═══ */}
          <tbody>
            {tracks.map((track, idx) => {
              const matchPct = Math.round(track.similarity * 100);
              const explanationText = track.explanation || track.description || "";
              const isActive = idx === 0; // First row as "active" example

              return (
                <tr
                  key={track.id}
                  className="pu-row"
                  style={{
                    borderBottom: "1px solid var(--color-outline-variant)",
                    cursor: "pointer",
                    transition: "background-color 150ms ease",
                    backgroundColor: "var(--color-surface)",
                    borderLeft: isActive ? "4px solid var(--color-primary-container)" : "4px solid transparent",
                  }}
                >
                  {/* 1. Track Details — thumbnail + text in SAME cell */}
                  <td style={{ padding: "14px 8px 14px 12px", verticalAlign: "top" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                      {/* Thumbnail — 48x48, 0px radius, grayscale, play overlay on hover */}
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
                          alt={track.title}
                          style={{ width: 48, height: 48, borderRadius: 0, objectFit: "cover", filter: "grayscale(100%)", transition: "filter 200ms" }}
                        />
                        <div className="pu-play-overlay" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)", opacity: 0, transition: "opacity 200ms" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#FFFFFF", fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </div>
                      </div>
                      {/* Text */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface)" }}>
                          {track.title}
                        </span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-outline)" }}>
                          {track.composer}
                        </span>
                        {explanationText && (
                          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontStyle: "italic", color: "var(--color-on-surface-variant)", lineHeight: 1.3, margin: 0 }}>
                            <span style={{ fontStyle: "normal", fontWeight: 700, color: "var(--color-tertiary)" }}>AI MATCH: </span>
                            {explanationText}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* 2. Score — just percentage, teal bg when active */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center" }}>
                    {matchPct > 0 ? (
                      <span style={{
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 0,
                        fontFamily: "var(--font-body)",
                        ...(isActive
                          ? { backgroundColor: "var(--color-secondary)", color: "var(--color-on-primary)" }
                          : { backgroundColor: "var(--color-surface-container-highest)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }
                        ),
                      }}>
                        {matchPct}%
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>&mdash;</span>
                    )}
                  </td>

                  {/* 3. BPM — monospace */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                    {BPM[idx % BPM.length]}
                  </td>

                  {/* 4. Key — monospace */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                    {KEY[idx % KEY.length]}
                  </td>

                  {/* 5. Time — monospace */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                    {TIME[idx % TIME.length]}
                  </td>

                  {/* 6. Genre tags — 0px radius, outline border, Space Grotesk */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {track.genres.slice(0, 2).map((genre) => (
                        <span key={genre} style={{ border: "1px solid var(--color-outline-variant)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", padding: "2px 8px", borderRadius: 0, color: "var(--color-on-surface-variant)", fontFamily: "var(--font-display)" }}>
                          {genre}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* 7. AS HEARD ON — dark teal container */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top" }}>
                    {track.placements.length > 0 ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 0, backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 30%, transparent)", color: "var(--color-secondary)", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-body)" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>tv</span>
                        {track.placements[0].showName}
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>&mdash;</span>
                    )}
                  </td>

                  {/* 8. Actions — SQUARE buttons, 0px radius, cyan play */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "right", paddingRight: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                      <button style={{ width: 32, height: 32, borderRadius: 0, background: "none", border: "1px solid var(--color-outline-variant)", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
                      </button>
                      <button style={{ width: 32, height: 32, borderRadius: 0, background: "none", border: "1px solid var(--color-outline-variant)", cursor: "pointer", color: "var(--color-on-surface-variant)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
                      </button>
                      <button
                        onClick={() => { if (track.previewUrl) audio.play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl }); }}
                        style={{ width: 32, height: 32, borderRadius: 0, backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ═══ PAGINATION ═══ */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", backgroundColor: "var(--color-surface-container)", borderTop: "1px solid var(--color-outline-variant)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-on-surface-variant)" }}>
            SHOWING 1-{Math.min(20, tracks.length)} OF {count.toLocaleString()}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button disabled style={{ width: 28, height: 28, borderRadius: 0, background: "none", border: "1px solid var(--color-outline-variant)", opacity: 0.3, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-on-surface)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            {[1, 2, 3].map((num) => (
              <button key={num} style={{ width: 28, height: 28, borderRadius: 0, fontSize: 11, fontWeight: 700, border: num === 1 ? "none" : "1px solid var(--color-outline-variant)", cursor: "pointer", backgroundColor: num === 1 ? "var(--color-primary-container)" : "transparent", color: num === 1 ? "var(--color-on-primary-container)" : "var(--color-on-surface)", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {num}
              </button>
            ))}
            <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)", padding: "0 4px" }}>...</span>
            <button style={{ width: 28, height: 28, borderRadius: 0, background: "none", border: "1px solid var(--color-outline-variant)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-on-surface)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
