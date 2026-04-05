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
const GRID = "48px 1fr 100px 60px 60px 80px 140px 160px 120px";

interface Props {
  tracks: SearchResult[];
  totalCount?: number;
}

export function SimpleTrackTable({ tracks, totalCount }: Props) {
  const audio = useAudio();
  const count = totalCount ?? tracks.length;

  return (
    <>
      {/* Injected hover style — cannot do :hover with inline styles */}
      <style dangerouslySetInnerHTML={{ __html: `.sm-row:hover { background-color: #DBEAFE !important; }` }} />

      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB" }}>

        {/* ═══ TABLE HEADER ═══ */}
        <div style={{ position: "sticky", top: 152, zIndex: 30, display: "grid", gridTemplateColumns: GRID, alignItems: "center", backgroundColor: "#EBEDF0", borderBottom: "2px solid #D1D5DB", padding: "10px 16px" }}>
          <div style={{ textAlign: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#9CA3AF" }}>image</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280" }}>TRACK DETAILS</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", textAlign: "center" }}>SCORE</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", textAlign: "center" }}>BPM</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", textAlign: "center" }}>KEY</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", textAlign: "center" }}>TIME</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280" }}>GENRE</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280" }}>AS HEARD ON</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", textAlign: "right", paddingRight: 16 }}>ACTIONS</div>
        </div>

        {/* ═══ TRACK ROWS ═══ */}
        {tracks.map((track, idx) => {
          const matchPct = Math.round(track.similarity * 100);
          const rowBg = idx % 2 === 0 ? "#FFFFFF" : "#F9FAFB";
          // For collection pages (similarity=0, no explanation), use description as the "why" text
          const explanationText = track.explanation || track.description || "";

          return (
            <div
              key={track.id}
              className="sm-row"
              style={{
                display: "grid",
                gridTemplateColumns: GRID,
                alignItems: "start",
                padding: "14px 16px",
                backgroundColor: rowBg,
                borderBottom: "1px solid #E5E7EB",
                cursor: "pointer",
                transition: "background-color 150ms ease",
              }}
            >
              {/* 1. Thumbnail */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
                  alt={track.title}
                  style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
                />
              </div>

              {/* 2. Track Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingRight: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{track.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 400, color: "#6B7280" }}>&mdash; {track.composer}</span>
                </div>
                {explanationText && (
                  <p style={{ fontSize: 11, fontStyle: "italic", fontWeight: 500, color: "#0053DB", lineHeight: 1.3, margin: 0 }}>
                    <span style={{ fontStyle: "normal", fontWeight: 700 }}>AI MATCH: </span>
                    {explanationText}
                  </p>
                )}
                {track.explanation && track.description && (
                  <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.3, margin: 0 }}>
                    {track.description}
                  </p>
                )}
              </div>

              {/* 3. Score */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
                {matchPct > 0 ? (
                  <span style={{ backgroundColor: "rgba(0, 83, 219, 0.10)", color: "#0053DB", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 9999 }}>
                    {matchPct}% MATCH
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>&mdash;</span>
                )}
              </div>

              {/* 4. BPM */}
              <div style={{ textAlign: "center", paddingTop: 4, fontSize: 12, fontWeight: 500, color: "#374151" }}>
                {BPM[idx % BPM.length]}
              </div>

              {/* 5. Key */}
              <div style={{ textAlign: "center", paddingTop: 4, fontSize: 12, fontWeight: 500, color: "#374151" }}>
                {KEY[idx % KEY.length]}
              </div>

              {/* 6. Time */}
              <div style={{ textAlign: "center", paddingTop: 4, fontSize: 12, fontWeight: 500, color: "#374151" }}>
                {TIME[idx % TIME.length]}
              </div>

              {/* 7. Genre tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingTop: 4 }}>
                {track.genres.slice(0, 2).map((genre) => (
                  <span key={genre} style={{ backgroundColor: "#E5E7EB", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, color: "#4B5563" }}>
                    {genre}
                  </span>
                ))}
              </div>

              {/* 8. AS HEARD ON */}
              <div style={{ paddingTop: 4 }}>
                {track.placements.length > 0 ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRadius: 6, backgroundColor: "#E5E7EB", fontSize: 10, fontWeight: 700, color: "#4B5563" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>tv</span>
                    {track.placements[0].showName}
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>&mdash;</span>
                )}
              </div>

              {/* 9. Actions */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, paddingTop: 4, paddingRight: 8 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 0, display: "flex" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>favorite</span>
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 0, display: "flex" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
                </button>
                <button
                  onClick={() => {
                    if (track.previewUrl) {
                      audio.play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl });
                    }
                  }}
                  style={{ width: 32, height: 32, borderRadius: 9999, backgroundColor: "#0053DB", color: "#FFFFFF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* ═══ PAGINATION ═══ */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", backgroundColor: "#EBEDF0", borderTop: "1px solid #D1D5DB" }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280" }}>
            SHOWING 1-{Math.min(20, tracks.length)} OF {count.toLocaleString()}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button disabled style={{ padding: 4, borderRadius: 4, background: "none", border: "none", opacity: 0.3, display: "flex" }}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map((num) => (
              <button key={num} style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: num === 1 ? "#2563EB" : "transparent", color: num === 1 ? "#FFFFFF" : "#374151" }}>
                {num}
              </button>
            ))}
            <span style={{ fontSize: 12, color: "#6B7280" }}>...</span>
            <button style={{ padding: 4, borderRadius: 4, background: "none", border: "none", cursor: "pointer", display: "flex" }}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
