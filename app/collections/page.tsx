import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AudioPlayer } from "@/components/audio/audio-player";
import { ThemeLink } from "@/components/theme-link";
import { displayName } from "@/lib/utils";

interface Collection {
  slug: string;
  name: string;
  trackCount: number;
}

async function fetchCollections(): Promise<Collection[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/collections`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function CollectionsPage() {
  const collections = await fetchCollections();

  return (
    <>
      <Header />
      <main className="pt-24 pb-24" style={{ background: "var(--t-color-bg)" }}>
        {/* Hero on surface-low */}
        <section
          className="px-6 text-center relative overflow-hidden"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-16)",
            paddingBottom: "var(--t-space-16)",
          }}
        >
          {/* Subtle glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "300px",
              background: "radial-gradient(ellipse at center, var(--t-color-primary) 0%, transparent 70%)",
              opacity: "calc(var(--t-glow-opacity) * 0.5)",
            }}
          />
          <h1
            className="t-label-md mb-4 relative z-10"
            style={{ color: "var(--t-color-text-muted)" }}
          >
            Collections
          </h1>
          <p
            className="t-body-lg max-w-md mx-auto relative z-10"
            style={{ color: "var(--t-color-text-muted)" }}
          >
            {collections.length} collections. Curated by album. Scored for
            television.
          </p>
        </section>

        {/* Collection cards grid on bg canvas */}
        <section
          className="max-w-5xl mx-auto px-6"
          style={{
            paddingTop: "var(--t-space-12)",
            paddingBottom: "var(--t-space-12)",
          }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((col) => (
              <ThemeLink
                key={col.slug}
                href={`/collection/${col.slug}`}
                className="block hover-lift"
                style={{
                  background: "var(--t-color-surface)",
                  borderRadius: "var(--t-radius-lg)",
                  padding: "var(--t-space-6)",
                  textDecoration: "none",
                }}
              >
                {/* Color swatch */}
                <div
                  style={{
                    height: "4px",
                    width: "32px",
                    borderRadius: "var(--t-radius-pill)",
                    background: "var(--t-color-primary)",
                    marginBottom: "var(--t-space-4)",
                  }}
                />
                <h2
                  className="t-headline-sm"
                  style={{ color: "var(--t-color-text)" }}
                >
                  {displayName(col.name)}
                </h2>
                <p
                  className="t-body-sm mt-1"
                  style={{ color: "var(--t-color-text-muted)" }}
                >
                  {col.trackCount} composition{col.trackCount !== 1 ? "s" : ""}
                </p>
              </ThemeLink>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <AudioPlayer />
    </>
  );
}
