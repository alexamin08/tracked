"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { WENav } from "./WENav";
import { CriticsNote } from "./CriticsNote";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";

/* ──────────────────────────────────────────────
   Collection image URLs (from existing codebase)
   ────────────────────────────────────────────── */
const COLLECTION_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDikH6y288VRXRgON4B31Uu83DegJD9otpoEloUUAjbTeZfkCdsA4yHNe1DgTmcnWNieeYLTXCA3aIaBn782yQrvhFMYOnbFqFCK6J7qk7QljwRbupGObdg0noC6vmpMK8RbKde1ewJeSlCan8u8d7_kiLfNcRux9g0BCmgZ-q0Ucmn5TK5O6cSpv3ngc9aXfE4CWsYY5A98_uCI5_7qanx8yRElPRCeCuJe9I8Isygfe4LC7LPicRaWyuwZxrGqtu7mMOieZeeEemC",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZshPKxLifikP_NzuOzmrlsddPnrPnAebwQ_oEFjwHck5mBLTbK4nMI8Mb-R6hdOf_hYb_lQjocqkx2U05wlRDs9AcLUasjN9wp4OJbN-r5Y6wQMu9bkbcVpHF48DuZGixCk-BigODwR9hFN-mDEtuK2rrac-xGEIDZEO9MGlbm5EXSQvq9aEpNmaIoevzCBEpc2PJ6yHGffAVjLiL0VBEDot9j9lAH73kxTjO7tcfNV3OXQQKf7AdUOmW2Gn49m3taT1UNhRXKn5w",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTC787Y7qKoHyBqEz9g2JZb7hfrPdTYCY2JnZcltH-l0NNj3MPrJReG9cXW0MXfTb6mVhzmhB_aS96oZT0WgUYyywdQqMBvsjBF3MUXYvd7YNfAGZjfWPQW7iM7ZCb71OeG1AFgvXh4DVxs6yKHV-JQ-8OIsS44XXN45HLp0HfM9AZf5zJmVk-kDPIH9Svb6YbvlnQwWimdpMtY1kHwhYM6cnCckhWyKHsGv64FjEWTIsu1CBf8YCpNHp4WAT0S-NsB0E_q91z3arY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCqaXVoLLTktqsaFdhOKqNBshAqiNgX0pMOZ11UM-pzGv9jZB5y_L2pzV_FAmXZoTkZa5XbSJ_rg6cPUJewdh28-N0cmOYSt1eE7izj_JZ_lm0q4v46d78twFTPnHLjihBT1yhk2-TiHzTCOfDmFukwDE3VtKGimRP3EXTpb-cEtiCFNhREtomcemTFvyebkld1cZ-Z3qSYbUANPaqZqtBd0oYe23hYIoOvVzsxtgVCBpWzSybOqtP4TUB76D1eW2b6L8aS1xPXTjn6",
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80";

const LIGHT_COLLECTIONS = [
  { name: "Reality Competition", image: COLLECTION_IMAGES[0] },
  { name: "True Crime", image: COLLECTION_IMAGES[1] },
  { name: "Epic Trailers", image: COLLECTION_IMAGES[2] },
  { name: "Neo-Noir", image: COLLECTION_IMAGES[3] },
];

const FOOTER_LINKS = {
  product: [
    { label: "Catalog", href: "/collections" },
    { label: "Pricing", href: "/pricing" },
    { label: "AI Search", href: "/search" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "License Agreement", href: "/license" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

/* ──────────────────────────────────────────────
   LIGHT MODE SECTIONS
   ────────────────────────────────────────────── */

function LightHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const chips = ["Dark Ambient", "1970s Heist", "Lo-Fi Noir"];

  return (
    <section
      style={{
        minHeight: 870,
        backgroundColor: "var(--color-surface)",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        alignItems: "stretch",
      }}
    >
      {/* Left column */}
      <div
        style={{
          gridColumn: "span 6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 64px",
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 20,
            color: "var(--color-primary)",
            marginBottom: 24,
          }}
        >
          Editorial Music Licensing
        </span>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 5vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "var(--color-on-background)",
            margin: "0 0 48px 0",
          }}
        >
          The Sound of Modern{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>Cinema.</span>
        </h1>

        {/* Search input */}
        <div
          style={{
            maxWidth: 576,
            backgroundColor: "var(--color-surface-container-low)",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 24, color: "var(--color-primary)", flexShrink: 0 }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="tense standoff, interrogation room, fluorescent light"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              color: "var(--color-on-surface)",
            }}
          />
        </div>

        {/* Suggested chips */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#a8a29e",
            }}
          >
            Try:
          </span>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                setQuery(chip);
                router.push(`/search?q=${encodeURIComponent(chip)}`);
              }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 700,
                color: "var(--color-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div
        style={{
          gridColumn: "span 6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="Studio recording session"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%) brightness(50%) contrast(125%)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, #FBF9F5 0%, transparent 30%)",
          }}
        />
        {/* Floating badge */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            right: 48,
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              play_arrow
            </span>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Midnight Pulse
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                letterSpacing: "0.1em",
              }}
            >
              Electronic / Suspense
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LightCollections() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        padding: "96px 64px 32px 64px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 40,
            fontWeight: 700,
            color: "var(--color-on-surface)",
            margin: 0,
          }}
        >
          Curated Collections
        </h2>
        <Link
          href="/collections"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--color-primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: "0.1em",
          }}
        >
          View All
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingBottom: 24,
        }}
      >
        {LIGHT_COLLECTIONS.map((col) => (
          <Link
            key={col.name}
            href={`/collections/${col.name.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              flexShrink: 0,
              width: 320,
              aspectRatio: "4 / 5",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              textDecoration: "none",
              display: "block",
            }}
          >
            <img
              src={col.image}
              alt={col.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 24,
                color: "#FFFFFF",
              }}
            >
              {col.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LightHowItWorks() {
  const steps = [
    {
      icon: "edit_note",
      title: "Describe",
      body: "Tell us your scene in plain language. A tense courtroom closing argument, a sunrise time-lapse over Tokyo, a comedic cooking montage. Our AI understands context, not just keywords.",
    },
    {
      icon: "graphic_eq",
      title: "Match",
      body: "Our engine searches 53,000+ broadcast-proven compositions in under two seconds, ranking by emotional alignment, instrumentation, tempo, and production style.",
    },
    {
      icon: "verified",
      title: "License",
      body: "One click. Worldwide broadcast, streaming, and digital rights included. Automated cue sheet generation means zero paperwork between your edit and air.",
    },
  ];

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 64,
        padding: "128px 64px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      {/* Left sticky col */}
      <div
        style={{
          gridColumn: "span 4",
          position: "sticky",
          top: 128,
          alignSelf: "start",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--color-on-background)",
            margin: "0 0 24px 0",
          }}
        >
          From Concept to{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>Cue Sheet.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "#78716c",
            lineHeight: 1.6,
            margin: "0 0 32px 0",
          }}
        >
          Three steps between your creative vision and a fully licensed,
          broadcast-ready track.
        </p>
        <Link
          href="/sign-up"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            color: "#FFFFFF",
            backgroundColor: "var(--color-primary)",
            padding: "14px 28px",
            borderRadius: 8,
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          Get Started Now
        </Link>
      </div>

      {/* Right col — steps */}
      <div style={{ gridColumn: "span 8" }}>
        {steps.map((step, i) => (
          <div
            key={step.title}
            style={{
              display: "flex",
              gap: 48,
              paddingLeft: 48,
              paddingBottom: i < steps.length - 1 ? 64 : 0,
              borderLeft: "2px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
              position: "relative",
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: -8,
                top: 0,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "var(--color-primary)",
                flexShrink: 0,
              }}
            />
            <div>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 32,
                  color: "var(--color-primary)",
                  marginBottom: 12,
                  display: "block",
                }}
              >
                {step.icon}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "var(--color-on-background)",
                  margin: "0 0 12px 0",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  color: "#78716c",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LightStatsBar() {
  const stats = [
    { value: "42k+", label: "COMPOSITIONS" },
    { value: "140k+", label: "PRODUCTION FILES" },
    { value: "Score", label: "SINCE 2008" },
    { value: "Global", label: "LICENSING RIGHTS" },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--color-on-background)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 48,
        padding: 64,
      }}
    >
      {stats.map((s) => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 40,
              fontWeight: 700,
              color: "var(--color-surface)",
              margin: "0 0 8px 0",
            }}
          >
            {s.value}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--color-surface)",
              opacity: 0.6,
              margin: 0,
            }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </section>
  );
}

function LightFooter() {
  return (
    <footer style={{ backgroundColor: "#EAE8E4", padding: "80px 64px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 48,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Brand col */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 900,
              color: "var(--color-primary)",
              display: "block",
              marginBottom: 12,
            }}
          >
            Tracked
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#78716c",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            AI-powered music licensing for modern content creators.
          </p>
        </div>

        {/* Link columns */}
        {(
          [
            ["PRODUCT", FOOTER_LINKS.product],
            ["COMPANY", FOOTER_LINKS.company],
            ["LEGAL", FOOTER_LINKS.legal],
          ] as const
        ).map(([heading, links]) => (
          <div key={heading}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#78716c",
                margin: "0 0 20px 0",
              }}
            >
              {heading}
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map((l) => (
                <li key={l.href} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#57534e",
                      textDecoration: "none",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #d6d3d1",
          marginTop: 48,
          paddingTop: 24,
          maxWidth: 1280,
          margin: "48px auto 0",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "#a8a29e",
            margin: 0,
          }}
        >
          &copy; 2026 Tracked Music Group. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   DARK MODE SECTIONS
   ────────────────────────────────────────────── */

function DarkHero() {
  return (
    <section
      style={{
        minHeight: 870,
        backgroundColor: "#0C0A09",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        alignItems: "stretch",
      }}
    >
      {/* Left column — 7 cols */}
      <div
        style={{
          gridColumn: "span 7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#e7e5e4",
            margin: "0 0 24px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          The New{" "}
          <span
            style={{
              fontStyle: "italic",
              color: "var(--color-primary)",
            }}
          >
            Standard
          </span>{" "}
          of Sound.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "#a8a29e",
            lineHeight: 1.6,
            margin: "0 0 40px 0",
            maxWidth: 480,
            position: "relative",
            zIndex: 1,
          }}
        >
          Broadcast-proven compositions matched to your vision by AI. 53,000+
          tracks. One license. Worldwide rights.
        </p>

        {/* Pull-quote */}
        <div
          style={{
            borderLeft: "2px solid var(--color-primary)",
            paddingLeft: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "#d6d3d1",
              margin: 0,
            }}
          >
            &ldquo;The future of licensing is here.&rdquo;
          </p>
        </div>
      </div>

      {/* Right column — 5 cols */}
      <div
        style={{
          gridColumn: "span 5",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#1c1917",
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="Studio recording session"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0c0a09 0%, transparent 60%)",
          }}
        />
        {/* Floating badge */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 32,
            right: 32,
            backgroundColor: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: 20,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#a8a29e",
              display: "block",
              marginBottom: 8,
            }}
          >
            Now Auditioning
          </span>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 22,
              color: "#FFFFFF",
              margin: "0 0 12px 0",
            }}
          >
            Obsidian Echoes
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20, color: "var(--color-primary)" }}
            >
              equalizer
            </span>
            {/* Progress bar */}
            <div
              style={{
                flex: 1,
                height: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 9999,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "38%",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: 9999,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkAISearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const chips = [
    "tension building slowly",
    "90s hip-hop documentary",
    "ethereal female vocal",
    "desert highway, golden hour",
  ];

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#0c0a09",
        padding: "96px 64px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Eyebrow */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#008284",
            display: "block",
            marginBottom: 24,
          }}
        >
          Natural Language Engine
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 300,
            color: "#e7e5e4",
            margin: "0 0 48px 0",
            lineHeight: 1.1,
          }}
        >
          Describe your{" "}
          <span style={{ fontStyle: "italic", color: "#B95839" }}>
            sonic vision.
          </span>
        </h2>

        {/* Search input */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <input
            type="text"
            placeholder="tense standoff, interrogation room, fluorescent light"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            style={{
              flex: 1,
              fontFamily: "var(--font-body)",
              fontSize: 20,
              backgroundColor: "#1c1917",
              border: "none",
              borderRadius: 12,
              padding: "32px 40px",
              color: "#e7e5e4",
              outline: "none",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 12,
              padding: "0 28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
              auto_awesome
            </span>
          </button>
        </div>

        {/* Chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                setQuery(chip);
                router.push(`/search?q=${encodeURIComponent(chip)}`);
              }}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 12,
                color: "#a8a29e",
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                borderRadius: 9999,
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkCollectionsBento() {
  return (
    <section
      style={{
        backgroundColor: "rgba(28,25,23,0.3)",
        padding: "96px 64px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 40,
              fontWeight: 700,
              color: "#e7e5e4",
              margin: 0,
            }}
          >
            Curated Collections
          </h2>
          <Link
            href="/collections"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "var(--color-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              letterSpacing: "0.1em",
            }}
          >
            View All
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: 300,
            gap: 24,
          }}
        >
          {/* Large card — col-span-2, row-span-2 */}
          <div
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={COLLECTION_IMAGES[0]}
              alt="The Archives"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 32,
                left: 32,
                fontFamily: "var(--font-display)",
                fontSize: 48,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              The Archives
            </span>
          </div>

          {/* Medium card — col-span-2 */}
          <div
            style={{
              gridColumn: "span 2",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={COLLECTION_IMAGES[1]}
              alt="True Crime"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              True Crime
            </span>
          </div>

          {/* Small accent card */}
          <div
            style={{
              gridColumn: "span 1",
              borderRadius: 16,
              backgroundColor: "color-mix(in srgb, var(--color-primary) 20%, transparent)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 32,
                color: "var(--color-primary)",
                marginBottom: 12,
              }}
            >
              music_note
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "#e7e5e4",
              }}
            >
              Epic Trailers
            </span>
          </div>

          {/* Small card with new release badge */}
          <div
            style={{
              gridColumn: "span 1",
              borderRadius: 16,
              backgroundColor: "rgba(41,37,36,0.5)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#008284",
              }}
            >
              New Release
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "#e7e5e4",
              }}
            >
              Neo-Noir
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkStats() {
  const stats = [
    { value: "42k+", label: "COMPOSITIONS" },
    { value: "2008", label: "ESTABLISHED" },
    { value: "100%", label: "BROADCAST CLEARED" },
  ];

  return (
    <section
      style={{
        backgroundColor: "#0c0a09",
        padding: "128px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: "contents" }}>
            <div style={{ textAlign: "center", padding: "0 48px" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 48,
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  margin: "0 0 8px 0",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#a8a29e",
                  margin: 0,
                }}
              >
                {s.label}
              </p>
            </div>
            {i < stats.length - 1 && (
              <div
                style={{
                  width: 1,
                  height: 64,
                  backgroundColor: "#292524",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DarkHowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Concept Driven",
      body: "Start with a feeling, not a keyword. Describe mood, energy, visual imagery, or reference a scene. Our AI translates creative intent into precise musical matches.",
      extra: (
        <div
          style={{
            borderLeft: "2px solid var(--color-primary)",
            paddingLeft: 20,
            marginTop: 24,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 16,
              color: "#d6d3d1",
              margin: 0,
            }}
          >
            &ldquo;I described a feeling. It returned the exact track I didn&rsquo;t
            know I was looking for.&rdquo;
          </p>
        </div>
      ),
    },
    {
      number: "02",
      title: "Lossless Generation",
      body: "Download full-resolution WAV files and isolated stems instantly. Every track in the catalog is recorded by professional composers with broadcast-grade production standards.",
      extra: (
        <div style={{ marginTop: 24 }}>
          <CriticsNote
            text="Production quality that rivals any major scoring house in the industry."
            attribution="AI Analytical Engine"
          />
        </div>
      ),
    },
    {
      number: "03",
      title: "Perpetual Rights",
      body: "One license covers worldwide broadcast, streaming, and digital distribution. Automated cue sheet generation means zero paperwork between your edit and air.",
      extra: (
        <Link
          href="/pricing"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            color: "var(--color-primary)",
            textDecoration: "none",
            marginTop: 24,
          }}
        >
          View Pricing
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            arrow_forward
          </span>
        </Link>
      ),
    },
  ];

  return (
    <section style={{ padding: "128px 64px", backgroundColor: "#0C0A09" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 64,
        }}
      >
        {steps.map((step) => (
          <div key={step.number} style={{ position: "relative" }}>
            {/* Decorative number */}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 120,
                fontWeight: 900,
                color: "#292524",
                lineHeight: 1,
                display: "block",
                marginBottom: -24,
                userSelect: "none",
              }}
            >
              {step.number}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 700,
                color: "#e7e5e4",
                margin: "0 0 16px 0",
                position: "relative",
                zIndex: 1,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "#a8a29e",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {step.body}
            </p>
            {step.extra}
          </div>
        ))}
      </div>
    </section>
  );
}

function DarkFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#0c0a09",
        borderTop: "1px solid #292524",
        padding: "80px 64px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 64,
        }}
      >
        {/* Left col */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 36,
              fontWeight: 900,
              color: "var(--color-primary)",
              display: "block",
              marginBottom: 12,
            }}
          >
            Tracked
          </span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#78716c",
              lineHeight: 1.6,
              margin: "0 0 24px 0",
            }}
          >
            AI-powered music licensing for modern content creators.
          </p>
          {/* Social links */}
          <div style={{ display: "flex", gap: 16 }}>
            {["X (Twitter)", "Instagram", "LinkedIn"].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#78716c",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right col — 3 sub-columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}
        >
          {/* EXPLORE */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#78716c",
                margin: "0 0 20px 0",
              }}
            >
              EXPLORE
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {FOOTER_LINKS.product.map((l) => (
                <li key={l.href} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#a8a29e",
                      textDecoration: "none",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#78716c",
                margin: "0 0 20px 0",
              }}
            >
              COMPANY
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#a8a29e",
                      textDecoration: "none",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#78716c",
                margin: "0 0 20px 0",
              }}
            >
              NEWSLETTER
            </h4>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#a8a29e",
                lineHeight: 1.5,
                margin: "0 0 16px 0",
              }}
            >
              New collections and features, delivered monthly.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="you@email.com"
                style={{
                  flex: 1,
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  backgroundColor: "#1c1917",
                  border: "1px solid #292524",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#e7e5e4",
                  outline: "none",
                }}
              />
              <button
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #292524",
          marginTop: 48,
          paddingTop: 24,
          maxWidth: 1280,
          margin: "48px auto 0",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "#57534e",
            margin: 0,
          }}
        >
          &copy; 2026 Tracked Music Group. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */

export default function WEHomePage() {
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";

  if (isDark) {
    return (
      <>
        <WENav />
        <main>
          <DarkHero />
          <DarkAISearch />
          <DarkCollectionsBento />
          <DarkStats />
          <DarkHowItWorks />
          <section style={{ padding: "96px 64px", backgroundColor: "#0C0A09" }}>
            <CriticsNote
              standalone
              text="Tracked doesn't just provide background noise; it offers the kind of harmonic intentionality that defines contemporary award-winning cinema."
              attribution="AI Analytical Engine"
            />
          </section>
        </main>
        <DarkFooter />
        <FloatingPlayer />
      </>
    );
  }

  return (
    <>
      <WENav />
      <main>
        <LightHero />
        <LightCollections />
        <LightHowItWorks />
        <LightStatsBar />
        <section style={{ padding: "96px 64px" }}>
          <CriticsNote
            standalone
            text="Tracked doesn't just provide background noise; it offers the kind of harmonic intentionality that defines contemporary award-winning cinema."
            attribution="AI Analytical Engine"
          />
        </section>
      </main>
      <LightFooter />
      <FloatingPlayer />
    </>
  );
}
