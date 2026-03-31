"use client";

import posthog from "posthog-js";

export function trackSearch(query: string, resultCount: number) {
  posthog.capture("search_performed", { query, result_count: resultCount });
}

export function trackPreview(trackId: string) {
  posthog.capture("track_previewed", { track_id: trackId });
}

export function trackExplanationViewed(trackId: string) {
  posthog.capture("explanation_viewed", { track_id: trackId });
}

export function trackAuthGateShown() {
  posthog.capture("auth_gate_shown");
}

export function trackCheckoutStarted() {
  posthog.capture("checkout_started");
}

export function trackDownload(trackId: string, format: string) {
  posthog.capture("download_completed", { track_id: trackId, format });
}
