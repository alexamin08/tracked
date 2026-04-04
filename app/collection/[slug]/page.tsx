import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AudioPlayer } from "@/components/audio/audio-player";
import { TrackCard } from "@/components/search/track-card";
import { ThemeLink } from "@/components/theme-link";
import { displayName, slugify } from "@/lib/utils";
import { createServiceClient } from "@/lib/supabase/service";
import type { SearchResult } from "@/types";

interface CollectionData {
  name: string;
  trackCount: number;
  tracks: SearchResult[];
}

async function fetchCollection(slug: string): Promise<CollectionData | null> {
  const supabase = createServiceClient();

  // Find album name matching this slug
  const { data: albumRows } = await supabase
    .from("tracks")
    .select("album_name")
    .not("album_name", "is", null);

  const uniqueAlbums = Array.from(
    new Set((albumRows ?? []).map((r) => r.album_name).filter(Boolean))
  );
  const albumName = uniqueAlbums.find((name) => slugify(name) === slug);
  if (!albumName) return null;

  // Fetch tracks for this album
  const { data: tracks, error } = await supabase
    .from("tracks")
    .select("id, track_id, title, composer, description, moods, genres, preview_url, album_name")
    .eq("album_name", albumName)
    .order("title", { ascending: true });

  if (error || !tracks) return null;

  // Batch-fetch placements
  const trackIds = tracks.map((t) => t.id);
  const placementMap = new Map<
    string,
    { showName: string; network: string | null; sceneType: string | null }[]
  >();

  for (let i = 0; i < trackIds.length; i += 200) {
    const batch = trackIds.slice(i, i + 200);
    const { data: placements } = await supabase
      .from("placements")
      .select("track_id, show_name, network, scene_type")
      .in("track_id", batch);

    for (const p of placements ?? []) {
      const list = placementMap.get(p.track_id) ?? [];
      list.push({
        showName: p.show_name,
        network: p.network,
        sceneType: p.scene_type,
      });
      placementMap.set(p.track_id, list);
    }
  }

  const results: SearchResult[] = tracks.map((t) => ({
    id: t.id,
    trackId: t.track_id,
    title: t.title,
    composer: t.composer,
    description: t.description,
    moods: t.moods ?? [],
    genres: t.genres ?? [],
    albumName: t.album_name,
    previewUrl: t.preview_url,
    similarity: 0,
    placements: placementMap.get(t.id) ?? [],
    explanation: "",
  }));

  return { name: albumName, trackCount: results.length, tracks: results };
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
              {displayName(data.name)}
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
