export interface Track {
  id: string;
  trackId: string;
  title: string;
  composer: string;
  description: string | null;
  moods: string[];
  genres: string[];
  instruments: string[];
  tempoBpm: number | null;
  durationSec: number | null;
  metadataBlob: string;
  previewUrl: string | null;
  fullUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Version {
  id: string;
  trackId: string;
  versionName: string;
  durationSec: number | null;
  previewUrl: string | null;
  fullUrl: string | null;
}

export interface Placement {
  id: string;
  trackId: string;
  showName: string;
  network: string | null;
  season: string | null;
  episode: string | null;
  sceneType: string | null;
  sceneDescription: string | null;
  airDate: string | null;
}

export interface SearchResult {
  id: string;
  trackId: string;
  title: string;
  composer: string;
  description: string | null;
  moods: string[];
  genres: string[];
  previewUrl: string | null;
  similarity: number;
  placements: Pick<Placement, "showName" | "network" | "sceneType">[];
  explanation: string;
}

export interface SearchResponse {
  results: SearchResult[];
  sessionId: string;
  fallback?: boolean;
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  stripeCustomerId: string | null;
  subscriptionStatus: SubscriptionStatus;
  subscriptionId: string | null;
  trialEndsAt: string | null;
}

export type SubscriptionStatus =
  | "none"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled";

export interface DownloadRecord {
  id: string;
  userId: string;
  trackId: string;
  versionId: string | null;
  createdAt: string;
}

export interface ImportRow {
  track_id: string;
  title: string;
  composer: string;
  description?: string;
  moods?: string;
  genres?: string;
  instruments?: string;
  tempo_bpm?: string;
  duration_sec?: string;
  preview_url?: string;
  full_url?: string;
  show_name?: string;
  network?: string;
  season?: string;
  episode?: string;
  scene_type?: string;
  scene_description?: string;
  version_name?: string;
  version_duration_sec?: string;
  version_preview_url?: string;
  version_full_url?: string;
}
