import Link from "next/link";
import { headers } from "next/headers";
import { TopNav } from "@/components/nav/TopNav";
import { displayName, slugify } from "@/lib/utils";
import { createServiceClient } from "@/lib/supabase/service";
import type { SearchResult } from "@/types";
import { SimpleCollectionPage } from "@/components/simple/SimpleCollectionPage";
import { CinematicCollectionPage } from "@/components/cinematic/CinematicCollectionPage";
import { EditorialCollectionPage } from "@/components/warm-editorial/EditorialCollectionPage";
import { PrecisionCollectionPage } from "@/components/precision-utility/PrecisionCollectionPage";
import { WENav } from "@/components/warm-editorial/WENav";
import { PUNav } from "@/components/precision-utility/PUNav";

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

function ThemeNav({ theme }: { theme: string }) {
  switch (theme) {
    case "warm-editorial":
      return <WENav />;
    case "precision-utility":
      return <PUNav />;
    default:
      return <TopNav />;
  }
}

export default async function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchCollection(params.slug);
  const theme = getThemeFromHost();
  const navPaddingTop = theme === "simple" ? 56 : theme === "precision-utility" ? 64 : 112;

  if (!data) {
    return (
      <>
        <ThemeNav theme={theme} />
        <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: navPaddingTop, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

  const name = displayName(data.name);

  switch (theme) {
    case "simple":
      return <SimpleCollectionPage collectionName={name} tracks={data.tracks} />;
    case "warm-editorial":
      return <EditorialCollectionPage collectionName={name} tracks={data.tracks} />;
    case "precision-utility":
      return <PrecisionCollectionPage collectionName={name} tracks={data.tracks} />;
    default:
      return <CinematicCollectionPage collectionName={name} tracks={data.tracks} />;
  }
}
