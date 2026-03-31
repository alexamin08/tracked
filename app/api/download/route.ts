import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(request: NextRequest) {
  const user = await getOrCreateUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  if (user.subscriptionStatus !== "active" && user.subscriptionStatus !== "trialing") {
    return NextResponse.json(
      { error: "Active subscription required.", action: "subscribe" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { trackId, versionId } = body;

  if (!trackId) {
    return NextResponse.json(
      { error: "trackId is required." },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Get track or version URL
  let fileUrl: string | null = null;

  if (versionId) {
    const { data: version } = await supabase
      .from("versions")
      .select("full_url")
      .eq("id", versionId)
      .single();
    fileUrl = version?.full_url ?? null;
  }

  if (!fileUrl) {
    const { data: track } = await supabase
      .from("tracks")
      .select("full_url")
      .eq("id", trackId)
      .single();
    fileUrl = track?.full_url ?? null;
  }

  if (!fileUrl) {
    return NextResponse.json({ error: "Track not found." }, { status: 404 });
  }

  // Log download
  await supabase.from("downloads").insert({
    user_id: user.id,
    track_id: trackId,
    version_id: versionId ?? null,
  });

  // Proxy the file
  try {
    const upstream = await fetch(fileUrl);
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "File temporarily unavailable." },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      upstream.headers.get("Content-Type") ?? "audio/wav"
    );
    headers.set(
      "Content-Disposition",
      `attachment; filename="track-${trackId}.wav"`
    );
    if (upstream.headers.get("Content-Length")) {
      headers.set("Content-Length", upstream.headers.get("Content-Length")!);
    }

    return new NextResponse(upstream.body, { status: 200, headers });
  } catch {
    return NextResponse.json(
      { error: "Download failed. Please try again." },
      { status: 500 }
    );
  }
}
