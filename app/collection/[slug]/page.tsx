import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/layout/footer";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";
import { CollectionTrackList } from "./collection-tracks";
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

  const { data: albumRows } = await supabase
    .from("tracks")
    .select("album_name")
    .not("album_name", "is", null);

  const uniqueAlbums = Array.from(
    new Set((albumRows ?? []).map((r) => r.album_name).filter(Boolean))
  );
  const albumName = uniqueAlbums.find((name) => slugify(name) === slug);
  if (!albumName) return null;

  const { data: tracks, error } = await supabase
    .from("tracks")
    .select("id, track_id, title, composer, description, moods, genres, preview_url, album_name")
    .eq("album_name", albumName)
    .order("title", { ascending: true });

  if (error || !tracks) return null;

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
      list.push({ showName: p.show_name, network: p.network, sceneType: p.scene_type });
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
        <TopNav />
        <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-on-surface)" }}>Collection not found</p>
            <Link href="/collections" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-primary)", marginTop: 16, display: "block", textDecoration: "none" }}>
              ← All Collections
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNav />

      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, paddingBottom: 128 }}>
        {/* Header */}
        <header style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 48px" }}>
          <Link href="/collections" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-on-surface-variant)", textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
            ← All Collections
          </Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            {displayName(data.name)}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-on-surface-variant)", marginTop: 8 }}>
            {data.trackCount} composition{data.trackCount !== 1 ? "s" : ""}
          </p>
        </header>

        {/* Track list */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <CollectionTrackList tracks={data.tracks} />
        </section>
      </main>

      <Footer />
      <FloatingPlayer />
    </>
  );
}
