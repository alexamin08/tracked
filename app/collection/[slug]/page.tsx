import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AudioPlayer } from "@/components/audio/audio-player";
import { TrackCard } from "@/components/search/track-card";
import { ThemeLink } from "@/components/theme-link";
import type { SearchResult } from "@/types";

interface CollectionData {
  name: string;
  trackCount: number;
  tracks: SearchResult[];
}

async function fetchCollection(slug: string): Promise<CollectionData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/collections/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchCollection(params.slug);

  if (!data) {
    return (
      <>
        <Header />
        <main
          className="pt-24 pb-24 min-h-screen flex items-center justify-center"
          style={{ background: "var(--t-color-bg)" }}
        >
          <div className="text-center">
            <p className="t-headline-md" style={{ color: "var(--t-color-text)" }}>
              Collection not found
            </p>
            <ThemeLink
              href="/collections"
              className="t-body-md mt-4 block"
              style={{ color: "var(--t-color-primary)" }}
            >
              ← All Collections
            </ThemeLink>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-24" style={{ background: "var(--t-color-bg)" }}>
        {/* Hero on surface-low */}
        <section
          className="px-6"
          style={{
            background: "var(--t-color-surface-low)",
            paddingTop: "var(--t-space-12)",
            paddingBottom: "var(--t-space-12)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <ThemeLink
              href="/collections"
              className="t-body-md mb-4 inline-block"
              style={{ color: "var(--t-color-text-muted)" }}
            >
              ← All Collections
            </ThemeLink>
            <h1
              className="t-display-sm"
              style={{ color: "var(--t-color-text)" }}
            >
              {data.name}
            </h1>
            <p
              className="t-body-lg mt-2"
              style={{ color: "var(--t-color-text-muted)" }}
            >
              {data.trackCount} composition{data.trackCount !== 1 ? "s" : ""}
            </p>
          </div>
        </section>

        {/* Track list on bg canvas */}
        <section
          className="max-w-3xl mx-auto px-6"
          style={{ paddingTop: "var(--t-space-10, 40px)" }}
        >
          {data.tracks.length === 0 ? (
            <p
              className="text-center t-body-lg py-16"
              style={{ color: "var(--t-color-text-muted)" }}
            >
              No tracks in this collection.
            </p>
          ) : (
            <div className="space-y-4">
              {data.tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <AudioPlayer />
    </>
  );
}
