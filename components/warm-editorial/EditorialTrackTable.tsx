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

export function EditorialTrackTable({ tracks, totalCount }: Props) {
  const audio = useAudio();
  const count = totalCount ?? tracks.length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .we-row:hover { background-color: var(--color-surface-container-low) !important; }
        .we-row:hover img { filter: grayscale(0) !important; opacity: 1 !important; }
      `}} />

      <div style={{ backgroundColor: "var(--color-surface)", borderRadius: 2, boxShadow: "var(--shadow-ambient)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          {/* ═══ TABLE HEADER ═══ */}
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface-container)", borderBottom: "1px solid var(--color-outline-variant)", position: "sticky", top: 180, zIndex: 30 }}>
              <th style={{ width: 64, padding: "10px 8px", textAlign: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--color-on-surface-variant)" }}>image</span>
              </th>
              {["TRACK DETAILS", "SCORE", "BPM", "KEY", "TIME", "GENRE", "AS HEARD ON", "ACTIONS"].map((label, i) => (
                <th key={label} style={{ padding: "10px 8px", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)", textAlign: i >= 2 && i <= 4 ? "center" : i === 7 ? "right" : "left", paddingRight: i === 7 ? 16 : 8 }}>
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

              return (
                <tr
                  key={track.id}
                  className="we-row"
                  style={{ borderBottom: "1px solid var(--color-outline-variant)", cursor: "pointer", transition: "background-color 150ms ease", backgroundColor: "var(--color-surface)" }}
                >
                  {/* 1. Thumbnail — 48x48, 2px radius, grayscale in dark */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={DEMO_IMAGES[idx % DEMO_IMAGES.length]}
                        alt={track.title}
                        style={{ width: 48, height: 48, borderRadius: 2, objectFit: "cover", filter: "grayscale(100%)", opacity: 0.8, transition: "filter 300ms, opacity 300ms" }}
                      />
                    </div>
                  </td>

                  {/* 2. Track Details — Newsreader italic title, Manrope composer */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingRight: 12 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, fontStyle: "italic", color: "var(--color-on-surface)" }}>
                        {track.title}
                      </span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-on-surface-variant)" }}>
                        {track.composer}
                      </span>
                      {/* Critic's Note — teal bordered container */}
                      {explanationText && (
                        <div style={{ marginTop: 4, padding: "8px 12px", borderTop: "1px dashed color-mix(in srgb, var(--color-tertiary) 30%, transparent)", borderBottom: "1px dashed color-mix(in srgb, var(--color-tertiary) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--color-tertiary) 5%, transparent)", position: "relative" }}>
                          <span className="material-symbols-outlined" style={{ position: "absolute", top: 4, right: 4, fontSize: 14, color: "var(--color-tertiary)", opacity: 0.5 }}>auto_awesome</span>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontStyle: "italic", color: "var(--color-tertiary)", lineHeight: 1.4, margin: 0 }}>
                            {explanationText}
                          </p>
                        </div>
                      )}
                      {track.explanation && track.description && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-on-surface-variant)", opacity: 0.8, lineHeight: 1.3, margin: 0 }}>
                          {track.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* 3. Score — sienna outlined pill */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center" }}>
                    {matchPct > 0 ? (
                      <span style={{ border: "1px solid var(--color-primary)", color: "var(--color-primary)", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 9999, fontFamily: "var(--font-body)" }}>
                        {matchPct}% MATCH
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>&mdash;</span>
                    )}
                  </td>

                  {/* 4. BPM */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                    {BPM[idx % BPM.length]}
                  </td>

                  {/* 5. Key */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                    {KEY[idx % KEY.length]}
                  </td>

                  {/* 6. Time */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-on-surface)" }}>
                    {TIME[idx % TIME.length]}
                  </td>

                  {/* 7. Genre tags */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {track.genres.slice(0, 2).map((genre) => (
                        <span key={genre} style={{ backgroundColor: "var(--color-surface-container-highest)", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, color: "var(--color-on-surface-variant)", fontFamily: "var(--font-body)" }}>
                          {genre}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* 8. AS HEARD ON — editorial pull-quote style with sienna left border */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top" }}>
                    {track.placements.length > 0 ? (
                      <div style={{ borderLeft: "4px solid var(--color-primary)", paddingLeft: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: "var(--color-on-surface)", fontFamily: "var(--font-body)" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>tv</span>
                          {track.placements[0].network || "Network"}
                        </div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 11, fontStyle: "italic", color: "var(--color-on-surface-variant)", marginTop: 2 }}>
                          {track.placements[0].showName}
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>&mdash;</span>
                    )}
                  </td>

                  {/* 9. Actions — round play in sienna, heart + download */}
                  <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "right", paddingRight: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>favorite</span>
                      </button>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
                      </button>
                      <button
                        onClick={() => { if (track.previewUrl) audio.play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl }); }}
                        style={{ width: 32, height: 32, borderRadius: 9999, backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
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
          <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)" }}>
            SHOWING 1-{Math.min(20, tracks.length)} OF {count.toLocaleString()}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button disabled style={{ padding: 4, borderRadius: 9999, background: "none", border: "none", opacity: 0.3, display: "flex", color: "var(--color-on-surface)" }}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map((num) => (
              <button key={num} style={{ padding: "4px 8px", borderRadius: 9999, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: num === 1 ? "var(--color-primary)" : "transparent", color: num === 1 ? "var(--color-on-primary)" : "var(--color-on-surface)" }}>
                {num}
              </button>
            ))}
            <span style={{ fontSize: 12, color: "var(--color-on-surface-variant)" }}>...</span>
            <button style={{ padding: 4, borderRadius: 9999, background: "none", border: "none", cursor: "pointer", display: "flex", color: "var(--color-on-surface)" }}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
