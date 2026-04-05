'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PUNav } from './PUNav';
import { FloatingPlayer } from '@/components/player/FloatingPlayer';

const DEMO_TRACKS = [
  { name: 'KINETIC_FLOW_01', artist: 'SYNAPTA', bpm: '124', key: 'Am', genre: 'GLITCH' },
  { name: 'SILENT PRESSURE', artist: 'VOID ARCH', bpm: '98', key: 'Cm', genre: 'AMBIENT' },
  { name: 'VOID_RESONANCE', artist: 'DRIFTLAB', bpm: '140', key: 'F#m', genre: 'INDUSTRIAL' },
  { name: 'NEURAL_DRIFT', artist: 'CORTEX NULL', bpm: '112', key: 'Dm', genre: 'DOWNTEMPO' },
  { name: 'CARBON_PULSE', artist: 'HEXFRAME', bpm: '132', key: 'Gm', genre: 'TECHNO' },
];

const STATS = [
  { label: 'TOTAL ASSETS', value: '42,000+', highlight: false },
  { label: 'PRODUCTION FILES', value: '140,000+', highlight: false },
  { label: 'SEARCH LATENCY', value: '0.02s', highlight: true },
  { label: 'BROADCAST CLEARANCE', value: '100%', highlight: false },
];

const FEATURES = [
  {
    icon: 'psychology',
    heading: 'AI SEMANTIC INDEXING',
    desc: 'Search via emotional descriptor, technical BPM range, or stem-specific attributes.',
  },
  {
    icon: 'dynamic_feed',
    heading: 'STEM SEPARATION',
    desc: 'Download individual tracks for drums, bass, synths, and FX instantly upon licensing.',
  },
  {
    icon: 'verified_user',
    heading: 'BROADCAST CLEARANCE',
    desc: 'Automated licensing certificates issued in seconds for worldwide broadcast.',
  },
];

export function PUHomePage() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-on-surface)', background: 'var(--color-surface)', minHeight: '100vh' }}>
      <PUNav />

      {/* HERO */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          minHeight: 870,
          borderBottom: '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
        }}
      >
        {/* Left col */}
        <div
          style={{
            gridColumn: 'span 7',
            background: 'var(--color-surface-container-lowest)',
            borderRight: '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
            padding: 64,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div
              style={{
                width: 8,
                height: 8,
                background: 'var(--color-primary)',
                borderRadius: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-primary)',
              }}
            >
              PROTOCOL V4.0 ACTIVE
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.75rem, 5vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: 0,
              marginBottom: 32,
            }}
          >
            <span style={{ color: 'var(--color-on-surface)' }}>PRECISION</span>
            <br />
            <span style={{ color: 'var(--color-primary)' }}>SONIC UTILITY</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              color: 'var(--color-on-surface-variant)',
              maxWidth: 576,
              marginBottom: 40,
              lineHeight: 1.6,
            }}
          >
            AI-driven music licensing for high-performance production. Real-time stem separation,
            zero-radius clearance, and clinical-grade metadata indexing.
          </p>

          {/* Search */}
          <div
            style={{
              background: 'var(--color-surface-container-high)',
              padding: 4,
              display: 'flex',
              border: '1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)',
              borderRadius: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 8, padding: '0 12px' }}>
              <span
                className="material-symbols-outlined"
                style={{ color: 'var(--color-outline)', fontSize: 20 }}
              >
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Describe the sonic atmosphere (e.g. '808-heavy cinematic glitch at 124 BPM')"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--color-on-surface)',
                  flex: 1,
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: 'var(--color-primary-container)',
                color: 'var(--color-on-primary)',
                border: 'none',
                padding: '16px 32px',
                borderRadius: 0,
                cursor: 'pointer',
              }}
            >
              Process
            </button>
          </div>
        </div>

        {/* Right col */}
        <div
          style={{
            gridColumn: 'span 5',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 400,
          }}
        >
          {/* Hero image */}
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
            alt="Studio equipment"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
              opacity: 0.6,
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, var(--color-surface) 0%, transparent 50%)',
            }}
          />
          {/* Data widget */}
          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: 32,
              right: 32,
              background: 'color-mix(in srgb, var(--color-surface-container-highest) 90%, transparent)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderLeft: '4px solid var(--color-primary)',
              padding: 24,
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--color-primary)',
                  marginBottom: 4,
                }}
              >
                Signal Strength
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                }}
              >
                98.4% MATCH
              </div>
            </div>
            {/* Mini bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              {[16, 24, 32, 20, 28].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: h,
                    background: 'var(--color-primary)',
                    borderRadius: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS GRID */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
          background: 'var(--color-surface-container-low)',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: 24,
              borderRight:
                i < STATS.length - 1
                  ? '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)'
                  : 'none',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-outline)',
                marginBottom: 8,
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 700,
                color: stat.highlight ? 'var(--color-primary)' : 'var(--color-on-surface)',
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </section>

      {/* CATALOG TRACK LIST */}
      <section style={{ padding: '32px 48px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 700,
                margin: 0,
                marginBottom: 12,
                color: 'var(--color-on-surface)',
              }}
            >
              LATEST SIGNAL UPLOADS
            </h2>
            <div
              style={{
                width: 48,
                height: 3,
                background: 'var(--color-primary)',
              }}
            />
          </div>
          <Link
            href="/catalog"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--color-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            View Full Directory →
          </Link>
        </div>

        {/* Track rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {DEMO_TRACKS.map((track) => (
            <div
              key={track.name}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 16,
                alignItems: 'center',
                background: 'var(--color-surface-container-low)',
                padding: 16,
                borderRadius: 0,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--color-surface-container-high)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--color-surface-container-low)')
              }
            >
              {/* Thumbnail */}
              <div
                style={{
                  gridColumn: 'span 1',
                  width: 48,
                  height: 48,
                  background: 'var(--color-surface-container-highest)',
                  borderRadius: 0,
                }}
              />

              {/* Track info */}
              <div style={{ gridColumn: 'span 4' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--color-on-surface)',
                    textTransform: 'uppercase',
                  }}
                >
                  {track.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--color-outline)',
                    textTransform: 'uppercase',
                  }}
                >
                  {track.artist}
                </div>
              </div>

              {/* BPM */}
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-outline)',
                    marginBottom: 2,
                  }}
                >
                  BPM
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 14,
                    color: 'var(--color-on-surface)',
                  }}
                >
                  {track.bpm}
                </div>
              </div>

              {/* Key */}
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-outline)',
                    marginBottom: 2,
                  }}
                >
                  KEY
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 14,
                    color: 'var(--color-on-surface)',
                  }}
                >
                  {track.key}
                </div>
              </div>

              {/* Genre + icons */}
              <div
                style={{
                  gridColumn: 'span 3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: 'var(--color-surface-container-highest)',
                    border: '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
                    padding: '6px 12px',
                    borderRadius: 0,
                    color: 'var(--color-on-surface-variant)',
                  }}
                >
                  {track.genre}
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20, color: 'var(--color-outline)', cursor: 'pointer' }}
                >
                  play_arrow
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20, color: 'var(--color-outline)', cursor: 'pointer' }}
                >
                  more_vert
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section style={{ padding: '32px 48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4,
          }}
        >
          {FEATURES.map((feat) => (
            <div
              key={feat.heading}
              style={{
                background: 'var(--color-surface-container)',
                border: '1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)',
                padding: 32,
                borderRadius: 0,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 30,
                  color: 'var(--color-primary)',
                  marginBottom: 16,
                  display: 'block',
                }}
              >
                {feat.icon}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  margin: '0 0 12px',
                  color: 'var(--color-on-surface)',
                }}
              >
                {feat.heading}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--color-on-surface-variant)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: 'var(--color-surface-container)',
          borderTop: '1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)',
          padding: '32px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--color-primary)',
          }}
        >
          TRACKED
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Catalog', 'Pricing', 'Privacy', 'Terms'].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                textTransform: 'uppercase',
                color: 'var(--color-on-surface-variant)',
                textDecoration: 'none',
              }}
            >
              {link}
            </Link>
          ))}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            color: 'color-mix(in srgb, var(--color-on-surface-variant) 60%, transparent)',
          }}
        >
          &copy; 2026 Tracked Music Group
        </div>
      </footer>

      <FloatingPlayer />
    </div>
  );
}
