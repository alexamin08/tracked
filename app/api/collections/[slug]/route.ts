import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const supabase = createServiceClient();

  // Get all distinct album names and find the one matching this slug
  const { data: albumRows } = await supabase
    .from("tracks")
    .select("album_name")
    .not("album_name", "is", null);

  const uniqueAlbums = Array.from(new Set((albumRows ?? []).map((r) => r.album_name).filter(Boolean)));
  const albumName = uniqueAlbums.find((name) => slugify(name) === slug);

  if (!albumName) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  // Fetch tracks for this album
  const { data: tracks, error } = await supabase
    .from("tracks")
    .select("id, track_id, title, composer, description, moods, genres, preview_url, album_name")
    .eq("album_name", albumName)
    .order("title", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to load tracks" }, { status: 500 });
  }

  // Enrich with placements
  const trackIds = (tracks ?? []).map((t) => t.id);
  const placementMap = new Map<
    string,
    { showName: string; network: string | null; sceneType: string | null }[]
  >();

  if (trackIds.length > 0) {
    // Batch placement queries to avoid URL length limits
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
  }

  const results = (tracks ?? []).map((t) => ({
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

  return NextResponse.json({
    name: albumName,
    trackCount: results.length,
    tracks: results,
  });
}
