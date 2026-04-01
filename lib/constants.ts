export const PLANS = {
  starter: {
    name: "Starter",
    price: 15,
    priceAnnual: 13,
    stripePriceId: process.env.STRIPE_PRICE_ID_STARTER ?? "",
  },
} as const;

export const RATE_LIMITS = {
  searchPerMinute: 20,
  searchPerMinuteAuthenticated: 60,
} as const;

export const SEARCH = {
  similarityThreshold: 0.35,
  maxResults: 10,
  topResultsForExplanation: 5,
  maxQueryLength: 500,
  minQueryLength: 3,
} as const;

export const EMBEDDING = {
  model: "text-embedding-3-small" as const,
  dimensions: 1536,
  batchSize: 100,
};

export const EXPLANATION = {
  model: "gpt-4o-mini" as const,
  maxTokens: 200,
  systemPrompt: `You are a music supervisor for content creators. Given a creator's scene description and a list of tracks with their metadata and broadcast placement history, write a 1-2 sentence explanation for each track explaining why it fits the scene. Only reference metadata provided. Do not invent credits or placements. Be specific about musical qualities and scene fit.`,
};

export const SUGGESTED_PROMPTS = [
  "Tense elimination scene, reality competition",
  "Golden hour travel montage, acoustic warmth",
  "Upbeat cooking show opener, playful energy",
  "Emotional reunion scene, swelling strings",
  "Late night city driving, moody electronic",
  "Wedding first dance, romantic and timeless",
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
