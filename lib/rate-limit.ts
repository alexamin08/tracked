import { createServiceClient } from "./supabase/service";
import { RATE_LIMITS } from "./constants";

export async function checkRateLimit(
  ip: string,
  isAuthenticated: boolean
): Promise<{ allowed: boolean; remaining: number }> {
  const limit = isAuthenticated
    ? RATE_LIMITS.searchPerMinuteAuthenticated
    : RATE_LIMITS.searchPerMinute;

  const supabase = createServiceClient();
  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();

  const { count, error } = await supabase
    .from("search_sessions")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", oneMinuteAgo);

  if (error) {
    // If rate limit check fails, allow the request
    return { allowed: true, remaining: limit };
  }

  const used = count ?? 0;
  return {
    allowed: used < limit,
    remaining: Math.max(0, limit - used),
  };
}
