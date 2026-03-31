import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { searchTracks } from "@/lib/search";
import { batchExplain } from "@/lib/explain";
import { checkRateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/service";
import { SEARCH } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const query = body.query?.trim();

  if (!query || query.length < SEARCH.minQueryLength) {
    return NextResponse.json(
      { error: `Query must be at least ${SEARCH.minQueryLength} characters.` },
      { status: 400 }
    );
  }

  if (query.length > SEARCH.maxQueryLength) {
    return NextResponse.json(
      { error: `Query must be under ${SEARCH.maxQueryLength} characters.` },
      { status: 400 }
    );
  }

  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "127.0.0.1";
  const { userId } = auth();
  const { allowed, remaining } = await checkRateLimit(ip, !!userId);

  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in 60 seconds." },
      {
        status: 429,
        headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
      }
    );
  }

  try {
    // Search
    const results = await searchTracks(query);
    const fallback = results.length > 0 && results[0].similarity === 0;

    // Generate explanations for top results
    const explanations = await batchExplain(query, results);
    const resultsWithExplanations = results.map((r, i) => ({
      ...r,
      explanation: explanations[i] ?? "",
    }));

    // Log search session
    const supabase = createServiceClient();
    const { data: session } = await supabase
      .from("search_sessions")
      .insert({
        user_id: userId ? undefined : null,
        query_text: query,
        result_count: results.length,
        ip_address: ip,
      })
      .select("id")
      .single();

    return NextResponse.json(
      {
        results: resultsWithExplanations,
        sessionId: session?.id ?? null,
        fallback,
      },
      { headers: { "X-RateLimit-Remaining": String(remaining - 1) } }
    );
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search is temporarily unavailable." },
      { status: 500 }
    );
  }
}
