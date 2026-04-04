"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const COLLECTIONS = [
  { name: "TRUE CRIME", tracks: 128, badge: "High Match", desc: "Dark underscores, dissonant textures, and rhythmic tension.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKTBi1yvFocffi0Ty5duqWjVnJP2GMCnA3B3ENhtF4YkN4QRDJgZruB0QC8QbZW_dBo5caZoRzrJVKH-ML-Qt1Jfd6LaBfmSgXbqWuytKhi6LGu_yzp8A7QfTI51A3u7qSvP3WJqmjfYFc_tLvh1hJjMfDSlU3vN_XAnDgMwplCzMBaIfgRosEUpGXOiYDuZ7R9-ta2ifYQsjL0D915cFrg7wZEUDov-wqFhAVeDLBTj7kGHTssP77abUXIdahTr83u28qzNoJ8eSJ" },
  { name: "REALITY COMPETITION", tracks: 215, badge: "Trending", desc: "High-energy percussion, driving synth bass, celebratory climaxes.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_4N-BSGlF3JqS19UqX4cq7qDf8LomIn-OOWufXpy3Fp8wOG2FqUH-GXoiSSArVkwtHz_-Io3vlVbHWB7M2z2_2teUu9qVVQEDQa7TldEvJB4W_DY9n_XPCN4g4eMVSegWbUQ_EKUh4WPPh2oglKO7SfV4QPzpS76TR-JTJnM9PwDdbH9SRsm-NHfh99gek2he4fC1kEvPnj6AHIa8VLlD2LoBOywbOMRlP2j7F2hYHWhdakRC0Q44lwIKqz_JqdGhR8dVd43jLcV4" },
  { name: "GLOBAL DOCUS", tracks: 89, badge: "Editorial", desc: "Ethereal soundscapes, world instruments, expansive orchestral.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtdvtxDPZtqMvouf_nmRJxRnqTjlHBehSsxdRuADlRJWp-QZuMLOM44WCASruRU-XhFPtPpmYBdptmSqghlAs4MpEyAmaytZQsYDY04vqKIL7tRqlv5NBCzbqCgmYcNBp3aQiNepwXr_BwtE4QLmBb2WBm9LmC7FY_dfytgPhnGH11nlN7S78_mROSXbTLJi49MEKmE-F6cUKlU5zxh5h26WvCAlQKk9dTQdTGp-IBFKZC7DMbScU5TgqMXCfKDvKLE9EtF-SXii7D" },
  { name: "CORPORATE TECH", tracks: 54, badge: "New", desc: "Minimalist patterns, clean pulses, optimistic forward momentum.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxqeP7mOaz1pr1Vcvil50r2jeaP29pLZNyFyB4ITZADjA7_E86glTnAuQocrPUEjB6Q4pEhsxTZ9B4dOjcRY_Jh96C78Pk_VmHqyj9pCornRCif_vL4wqv_mnZwgeiCFJSEcnYVArQ2jZkTnqv-morB9Z6is_Iz-jltJFQrIIelitL3GuMiZVTfCN08UMsBqh0Rqc-vJEgWWzJPOvlR8BTffMW2yiz_jZZj_uLPHp9woaoDTiydzYt5j55fW5j7T9iLDnLPhbK8VJj" },
];

export default function HomePage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed.length >= 3) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <>
      <TopNav />
      <main style={{ paddingTop: 64 }}>
        {/* HERO — 50/50 terminal grid */}
        <section style={{ display: "grid", minHeight: 870, borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }} className="grid-cols-1 md:grid-cols-2">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 32px 48px 80px", backgroundColor: "var(--color-surface-container-lowest)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 16 }}>Precision Utility v4.0</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "uppercase", color: "var(--color-on-surface)", marginBottom: 32 }}>
              THE SONIC <br /><span style={{ color: "var(--color-on-surface-variant)" }}>LABORATORY</span>
            </h1>
            <p style={{ maxWidth: 448, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-on-surface-variant)", borderLeft: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)", paddingLeft: 16, marginBottom: 48 }}>
              High-performance music licensing for professional curators. Intentional information density meets cinematic precision.
            </p>
            <form onSubmit={handleSearch} style={{ maxWidth: 560 }}>
              <div style={{ display: "flex", backgroundColor: "var(--color-surface-container-high)", alignItems: "center", padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" style={{ marginLeft: 16, marginRight: 8, flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="tense standoff, interrogation room, fluorescent light" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-display)", fontSize: 18, color: "var(--color-primary)", padding: "16px 0" }} />
                <button type="submit" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "16px 24px", border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>Match</button>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "var(--color-on-surface-variant)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Recent:</span>
                {["Cyberpunk Night", "Industrial Grime"].map((s) => (
                  <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} style={{ fontSize: 10, color: "color-mix(in srgb, var(--color-primary) 70%, transparent)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-body)", textDecoration: "none" }}>{s}</Link>
                ))}
              </div>
            </form>
          </div>
          <div style={{ position: "relative", overflow: "hidden", backgroundColor: "var(--color-surface-container)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFZKTwSKPMCBaTZ9kofTSfeCInqi3755rje722RTb5ExK7qk6AgrhqIz1TVkPYD4RS53HRUrYcAZOvLxKE1RB5RkWErAzJtoYl3wCs7G6vcubwFbM3OW1SvGRbsHL45hipz6OScGEi_t1_gIZCeW1gan_cbZsL9KANMx1Q17e6yBMkEnOAkjlVgncc1P8U-TIG_nWPi5F4O5ct6mcM_9Q5qEl3jdbSwtfsykj9eY2qh18JZ8MOnzIBVgOFBp4EjbFgX1DBnEd74zRK" alt="Dark recording studio" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.6, mixBlendMode: "luminosity" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent, var(--color-surface))", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 32, right: 32, backgroundColor: "color-mix(in srgb, var(--color-surface-container-highest) 80%, transparent)", backdropFilter: "blur(12px)", padding: 24, border: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)", maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, backgroundColor: "var(--color-primary)", borderRadius: "50%" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-primary)" }}>Live Feed / Scoring</span>
              </div>
              <p style={{ fontSize: 10, color: "var(--color-on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Spectral Match</p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--color-on-surface)" }}>98.4%</p>
            </div>
          </div>
        </section>

        {/* STAT BAR */}
        <section style={{ backgroundColor: "var(--color-surface-container-high)", borderBottom: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 80px" }}>
            {[{ v: "42K", l: "Compositions" }, { v: "140K", l: "Production Files" }, { v: "2008", l: "Scoring Since" }, { v: "0.02s", l: "Search Latency" }].map((s) => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 32px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--color-primary)" }}>{s.v}</span>
                <span style={{ fontSize: 10, fontFamily: "var(--font-body)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* COLLECTIONS — horizontal scroll */}
        <section style={{ padding: "80px 0", backgroundColor: "var(--color-surface-container-lowest)" }}>
          <div style={{ padding: "0 80px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-primary)" }}>Catalog Exploration</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, textTransform: "uppercase", color: "var(--color-on-surface)", marginTop: 8 }}>CURATED COLLECTIONS</h2>
            </div>
            <Link href="/collections" style={{ fontSize: 10, fontFamily: "var(--font-body)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>View Archive →</Link>
          </div>
          <div style={{ display: "flex", overflowX: "auto", gap: 16, padding: "0 80px 48px" }}>
            {COLLECTIONS.map((col) => (
              <Link key={col.name} href="/collections" style={{ minWidth: 300, height: 384, position: "relative", overflow: "hidden", backgroundColor: "var(--color-surface-container)", border: "1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)", textDecoration: "none", display: "block", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={col.img} alt={col.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, transition: "transform 700ms ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--color-surface) 0%, transparent 50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: 24, width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)", color: "var(--color-primary)", padding: "2px 8px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-body)", border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)" }}>{col.badge}</span>
                    <span style={{ fontSize: 10, fontFamily: "var(--font-display)", color: "var(--color-on-surface-variant)" }}>{col.tracks} Tracks</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--color-on-surface)" }}>{col.name}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-on-surface-variant)", marginTop: 8, lineHeight: 1.5 }}>{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: "96px 80px", backgroundColor: "var(--color-surface)", borderTop: "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 48 }} className="grid-cols-1 lg:grid-cols-3">
            {[
              { num: "01", title: "Describe", body: "Input descriptive prompts, reference tracks, or narrative themes into our precision AI engine. It understands context, not just keywords." },
              { num: "02", title: "Match", body: "Our algorithm parses 140k+ audio files to find the perfect spectral match, providing stems and alternative mixes instantly." },
              { num: "03", title: "License", body: "Secure worldwide rights with a single click. Transparent pricing for major networks and independent creators alike." },
            ].map((step) => (
              <div key={step.num}>
                <div style={{ width: 48, height: 48, backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-on-surface)", marginBottom: 16 }}>{step.num}. {step.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingPlayer />
    </>
  );
}
