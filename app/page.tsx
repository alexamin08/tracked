"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

const SUGGESTED = [
  "Wong Kar-wai mood",
  "1970s analog funk",
  "Minimalist techno",
];

export default function HomePage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed.length >= 3) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <>
      <TopNav />

      <main style={{ minHeight: "100vh" }}>
        {/* ============================
            HERO — 7/5 col split
            ============================ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            minHeight: 870,
          }}
          className="md:grid-cols-12"
        >
          {/* Left — 7 col */}
          <div
            className="md:col-span-7"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "80px 32px 80px 64px",
              backgroundColor: "var(--color-surface)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                top: -96,
                left: -96,
                width: 384,
                height: 384,
                backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                filter: "blur(120px)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 7vw, 6rem)",
                fontWeight: 300,
                color: "var(--color-on-surface)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                marginBottom: 32,
              }}
            >
              The New <br />
              <span style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                Standard
              </span>{" "}
              of Sound.
            </h1>

            <p
              style={{
                maxWidth: 448,
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: 1.7,
                color: "var(--color-on-surface-variant)",
                marginBottom: 40,
              }}
            >
              High-fidelity AI music generation tailored for cinematic
              storytellers, archivists, and visionary creators.
            </p>

            {/* Editorial quote */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderLeft: "2px solid var(--color-primary)",
                paddingLeft: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--color-on-surface)",
                }}
              >
                &ldquo;The future of licensing is here.&rdquo;
              </span>
            </div>
          </div>

          {/* Right — 5 col, image */}
          <div
            className="md:col-span-5"
            style={{
              position: "relative",
              backgroundColor: "var(--color-surface-container)",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh9wz8SbpB6pcXR_vrQvCk_Z_fYOwWG_NdFkgBVVL4GFCRVLT7I58AOLGhrfTnYhXH0rVeFRiZ1wu-y2fNMI7HUOH_-L5hrX1UDhum3b_0nAwah2GbEVIN1Dp0m2_sDWNsS22q_mpu02aWjeFWIYRYiNpXeNcpOeVsf4IPGpkaRyJq_PrBE7a5bJXNkJSKftQFsemCRRq7f8DJuaZFIoL9emRhxk04OjxpUqY3F2Cpt-21dRygCoo8fDOoqV3b5zYNdXbS6cFzobho"
              alt="Vintage reel-to-reel tape recorder in a dimly lit studio with amber light"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.6,
                transition: "transform 700ms ease",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, var(--color-surface) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />

            {/* Floating player card */}
            <div
              style={{
                position: "absolute",
                bottom: 32,
                left: 32,
                right: 32,
                padding: 24,
                backgroundColor: "color-mix(in srgb, var(--color-surface-container) 40%, transparent)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid color-mix(in srgb, var(--color-outline-variant) 50%, transparent)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-primary)", fontFamily: "var(--font-body)" }}>
                  Now Auditioning
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-on-surface)", marginBottom: 4 }}>
                Obsidian Echoes
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", marginBottom: 16 }}>
                Cinematic / Noir / Ambient
              </p>
              <div style={{ width: "100%", height: 4, backgroundColor: "var(--color-surface-container-high)", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ width: "33%", height: "100%", backgroundColor: "var(--color-primary)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================
            AI SEARCH SECTION
            ============================ */}
        <section style={{ padding: "96px 32px", backgroundColor: "var(--color-surface)" }}>
          <div style={{ maxWidth: 1024, margin: "0 auto" }}>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-secondary)", fontFamily: "var(--font-body)", display: "block" }}>
                Natural Language Engine
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--color-on-surface)", marginTop: 8 }}>
                Describe your <span style={{ fontStyle: "italic" }}>sonic vision.</span>
              </h2>
            </div>

            <form onSubmit={handleSearch} style={{ position: "relative" }}>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Ex: A haunting cello melody recorded in a cathedral with heavy grain..."
                style={{
                  width: "100%",
                  backgroundColor: "var(--color-surface-container)",
                  border: "none",
                  outline: "none",
                  color: "var(--color-on-surface)",
                  padding: "32px 80px 32px 40px",
                  fontFamily: "var(--font-body)",
                  fontSize: 20,
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
                }}
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-lg)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </button>
            </form>

            {/* Suggested prompts */}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 12, fontFamily: "var(--font-body)", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", marginRight: 16 }}>
                Try:
              </span>
              {SUGGESTED.map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                    borderRadius: 9999,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    transition: "border-color 150ms ease",
                  }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================
            COLLECTIONS BENTO GRID
            ============================ */}
        <section style={{ padding: "96px 32px", backgroundColor: "color-mix(in srgb, var(--color-surface-container) 30%, var(--color-surface))" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: 300,
              gap: 24,
            }}
            className="md:grid-cols-4 grid-cols-1"
          >
            {/* Large 2x2 tile */}
            <div className="md:col-span-2 md:row-span-2" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-surface-container-high)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfmkmEm5dtvTcWFwJXGn9WnUpedqv2EZnBTV3uxYPKAqwu46yFyOEqAFD8KJckVRs9oLkmgPrsVwaCmjLMyBIrq5YjJYy0e4Nr5pItC632GOpMz29ZH_Bne54BeaiXlCKuPVzIZyZU1Uo34iKEpPwRmJszC6BED7uQisKfKn0ZlhsWbDuE_PLwx5wvp8JNA22vnXitWJpXhqH25VNTqAqDRMB691RZkfaJWhbO4zIExXGh5s-cfk_WlCqv5jAOLIoTRnTEHhyjK3Tl" alt="Curated vinyl collection" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, transition: "transform 700ms ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--color-surface) 0%, transparent 50%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 40, left: 40 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-primary)", fontFamily: "var(--font-body)", display: "block", marginBottom: 8 }}>Curated Series</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 3rem)", color: "var(--color-on-surface)", lineHeight: 1 }}>
                  The <br />Archives
                </h2>
              </div>
            </div>

            {/* Top-right wide tile */}
            <div className="md:col-span-2" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-surface-container-high)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0PgtT54jnMjt424GqfBZ6V_DZ47sFw-O9Xy_pazL25jqUmbyzpYpHkcB1CA2RkoiafBFE3CiJBfUoFuCKWVNPa1dtzRLY8Mt93vcoKQbVugTh4S5XYqv1USP1EVhUVnj4IR5Q-pFC83hVuO1WlL7ikWtWujBJlaDaiYpqhc-KYvOmhmRaCI4gI6U4HMTBj0pfVSixl4mYZbjjC7Khe-pL30O1XudOij2ErCtTWNibXbs2ly7cuD3-15vw7JB2td_aINQzKpImHH9T" alt="Live guitar performance" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, transition: "transform 700ms ease" }} />
              <div style={{ position: "absolute", top: 32, left: 32 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--color-on-surface)" }}>Live Energy</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", marginTop: 8 }}>Organic Textures</p>
              </div>
            </div>

            {/* Bottom-right: Stem Control */}
            <div style={{ borderRadius: "var(--radius-lg)", backgroundColor: "color-mix(in srgb, var(--color-primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 32 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--color-on-surface)", marginTop: 16 }}>Stem Control</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", marginTop: 8 }}>Full access to every layer of every track.</p>
            </div>

            {/* Bottom-right: New Release */}
            <div style={{ borderRadius: "var(--radius-lg)", backgroundColor: "color-mix(in srgb, var(--color-surface-container-high) 50%, transparent)", border: "1px solid color-mix(in srgb, var(--color-outline-variant) 50%, transparent)", padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-secondary)", fontFamily: "var(--font-body)" }}>New Release</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-on-surface)", marginTop: 8 }}>Synthetica</h3>
              </div>
              <Link href="/collections" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", textDecoration: "none" }}>
                Listen →
              </Link>
            </div>
          </div>
        </section>

        {/* ============================
            STATS / PROOF
            ============================ */}
        <section style={{ padding: "128px 32px", backgroundColor: "var(--color-surface)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: 48, textAlign: "center" }}>
            {[
              { value: "42K+", label: "Compositions" },
              { value: "140K+", label: "Production Files" },
              { value: "100%", label: "Content ID Protected" },
            ].map((stat, i, arr) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 48 }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 300, fontStyle: "italic", color: "var(--color-primary)" }}>{stat.value}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-on-surface-variant)", marginTop: 16 }}>{stat.label}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block" style={{ height: 64, width: 1, backgroundColor: "var(--color-outline-variant)" }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================
            HOW IT WORKS — Editorial columns with watermark numbers
            ============================ */}
        <section style={{ padding: "96px 32px", backgroundColor: "color-mix(in srgb, var(--color-surface-container) 10%, var(--color-surface))" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 64 }} className="md:grid-cols-3 grid-cols-1">
            {[
              {
                num: "01",
                title: "Concept Driven",
                body: "Describe the emotional arc of your film. Our engine doesn\u2019t just search metadata; it understands tempo, tone, and texture.",
                quote: "\u201CWe treat every query like a music supervisor session.\u201D",
              },
              {
                num: "02",
                title: "Broadcast-Proven Catalog",
                body: "42,000+ compositions scored for real television. Every track cleared for YouTube, broadcast, and streaming.",
                quote: null,
              },
              {
                num: "03",
                title: "One License, Forever",
                body: "License once. Use your tracks across every platform, every project, for life. No royalties, no re-licensing, no surprises.",
                quote: null,
              },
            ].map((step) => (
              <div key={step.num} style={{ position: "relative" }}>
                {/* Watermark number */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 120,
                    fontWeight: 900,
                    color: "var(--color-outline-variant)",
                    opacity: 0.15,
                    position: "absolute",
                    top: -80,
                    left: -16,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </span>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--color-on-surface)", marginBottom: 24 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>
                    {step.body}
                  </p>
                  {step.quote && (
                    <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid var(--color-outline-variant)", display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div style={{ width: 2, minHeight: 48, backgroundColor: "var(--color-primary)", flexShrink: 0 }} />
                      <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "var(--color-on-surface)", lineHeight: 1.5 }}>
                        {step.quote}
                      </p>
                    </div>
                  )}
                </div>
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
