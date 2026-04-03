import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { slugify } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createServiceClient();

  const { data: tracks, error: trackError } = await supabase
    .from("tracks")
    .select("album_name")
    .not("album_name", "is", null);

  if (trackError) {
    return NextResponse.json(
      { error: "Failed to load collections" },
      { status: 500 }
    );
  }

  // Count tracks per album
  const counts = new Map<string, number>();
  for (const t of tracks ?? []) {
    if (t.album_name) {
      counts.set(t.album_name, (counts.get(t.album_name) ?? 0) + 1);
    }
  }

  const collections = Array.from(counts.entries())
    .map(([name, trackCount]) => ({
      slug: slugify(name),
      name,
      trackCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(collections);
}
