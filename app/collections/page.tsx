import Link from "next/link";
import { headers } from "next/headers";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";
import { SimpleNav } from "@/components/simple/SimpleNav";
import { WENav } from "@/components/warm-editorial/WENav";
import { PUNav } from "@/components/precision-utility/PUNav";
import { displayName, slugify } from "@/lib/utils";
import { createServiceClient } from "@/lib/supabase/service";

function getThemeFromHost(): string {
  try {
    const headersList = headers();
    const host = headersList.get("host") || "";
    if (host.includes("tracked-simple")) return "simple";
    if (host.includes("tracked-warm")) return "warm-editorial";
    if (host.includes("tracked-precision")) return "precision-utility";
  } catch {}
  return "cinematic";
}

function ThemeNav({ theme }: { theme: string }) {
  switch (theme) {
    case "simple": return <SimpleNav />;
    case "warm-editorial": return <WENav />;
    case "precision-utility": return <PUNav />;
    default: return <TopNav />;
  }
}

interface Collection {
  slug: string;
  name: string;
  trackCount: number;
}

async function fetchCollections(): Promise<Collection[]> {
  const supabase = createServiceClient();
  const { data: tracks, error } = await supabase
    .from("tracks")
    .select("album_name")
    .not("album_name", "is", null);

  if (error || !tracks) return [];

  const counts = new Map<string, number>();
  for (const t of tracks) {
    if (t.album_name) {
      counts.set(t.album_name, (counts.get(t.album_name) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, trackCount]) => ({ slug: slugify(name), name, trackCount }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default async function CollectionsPage() {
  const collections = await fetchCollections();
  const theme = getThemeFromHost();
  const isCinematic = theme === "cinematic";
  const navPaddingTop = theme === "simple" ? 56 : theme === "precision-utility" ? 64 : 112;

  return (
    <>
      <ThemeNav theme={theme} />

      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: navPaddingTop, paddingBottom: 96 }}>
        {/* Hero */}
        <header style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 64px" }}>
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: 16 }}>
            CATALOG EXPLORATION
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--color-on-surface)" }}>
            Browse Collections
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-on-surface-variant)", marginTop: 12 }}>
            {collections.length} collections. Curated by album. Scored for television.
          </p>
        </header>

        {/* Grid */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {collections.map((col) => (
              <Link
                key={col.slug}
                href={`/collection/${col.slug}`}
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  display: "block",
                  textDecoration: "none",
                  backgroundColor: "var(--color-surface-container)",
                }}
              >
                {/* Gradient fill */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, var(--color-surface-container), var(--color-primary-container))", opacity: 0.5 }} />
                {/* Dark overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)", pointerEvents: "none" }} />

                {/* Track count */}
                <span style={{ position: "absolute", top: 12, right: 12, fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
                  {col.trackCount} Tracks
                </span>

                {/* Name */}
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--color-on-surface)" }}>
                    {displayName(col.name)}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {isCinematic && <Footer />}
      <FloatingPlayer />
    </>
  );
}
