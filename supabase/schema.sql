-- Tracked MVP Database Schema
-- Run this in the Supabase SQL Editor in order (foreign key dependencies matter)
-- Requires: Supabase project with pgvector extension available

-- ============================================================
-- 0. Extensions
-- ============================================================
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- 1. tracks — 53k+ compositions from Signature Tracks catalog
-- ============================================================
CREATE TABLE tracks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id      TEXT UNIQUE NOT NULL,          -- Signature Tracks' own ID from CSV
  title         TEXT NOT NULL,
  composer      TEXT NOT NULL,
  description   TEXT,                          -- editorial description
  moods         TEXT[] DEFAULT '{}',           -- mood tags array
  genres        TEXT[] DEFAULT '{}',           -- genre tags array
  instruments   TEXT[] DEFAULT '{}',           -- instrument tags array
  album_name    TEXT,
  tempo_bpm     INTEGER,
  duration_sec  INTEGER,
  metadata_blob TEXT NOT NULL,                 -- concatenated text used for embedding
  embedding     vector(1536),                  -- text-embedding-3-small output
  preview_url   TEXT,                          -- CDN URL for 30s preview (publicly playable)
  full_url      TEXT,                          -- CDN URL for full track (auth-gated download)
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- IVFFlat index for vector similarity search (required at 30k+ rows)
CREATE INDEX idx_tracks_embedding_ivfflat ON tracks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
CREATE INDEX idx_tracks_moods ON tracks USING gin (moods);
CREATE INDEX idx_tracks_genres ON tracks USING gin (genres);
CREATE INDEX idx_tracks_title_trgm ON tracks USING gin (title gin_trgm_ops);

-- ============================================================
-- 2. versions — alt mixes per track (30s, 60s, stinger, bumper)
-- ============================================================
CREATE TABLE versions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id      UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  version_name  TEXT NOT NULL,                 -- e.g. "60s Edit", "Stinger", "Bumper"
  duration_sec  INTEGER,
  preview_url   TEXT,
  full_url      TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_versions_track_id ON versions (track_id);

-- ============================================================
-- 3. placements — broadcast provenance (which shows used this track)
-- ============================================================
CREATE TABLE placements (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id          UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  show_name         TEXT NOT NULL,
  network           TEXT,
  season            TEXT,
  episode           TEXT,
  scene_type        TEXT,                      -- "elimination", "romantic", "comedic", etc.
  scene_description TEXT,                      -- free-text scene description
  air_date          DATE,
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_placements_track_id ON placements (track_id);
CREATE INDEX idx_placements_show ON placements (show_name);

-- ============================================================
-- 4. users — lazy-created from Clerk on first API interaction
-- ============================================================
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id            TEXT UNIQUE NOT NULL,
  email               TEXT NOT NULL,
  full_name           TEXT,
  avatar_url          TEXT,
  stripe_customer_id  TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'none'
    CHECK (subscription_status IN ('none', 'trialing', 'active', 'past_due', 'canceled')),
  subscription_id     TEXT,                    -- Stripe subscription ID
  trial_ends_at       TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_users_clerk_id ON users (clerk_id);
CREATE INDEX idx_users_stripe_customer ON users (stripe_customer_id);

-- ============================================================
-- 5. downloads — audit log of every file download
-- ============================================================
CREATE TABLE downloads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  track_id      UUID NOT NULL REFERENCES tracks(id),
  version_id    UUID REFERENCES versions(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_downloads_user ON downloads (user_id);
CREATE INDEX idx_downloads_created ON downloads (created_at DESC);

-- ============================================================
-- 6. search_sessions — analytics + IP-based rate limiting
-- ============================================================
CREATE TABLE search_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id),     -- NULL for unauthenticated searches
  query_text    TEXT NOT NULL,
  result_count  INTEGER,
  ip_address    INET,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_search_sessions_ip ON search_sessions (ip_address, created_at DESC);
CREATE INDEX idx_search_sessions_created ON search_sessions (created_at DESC);

-- ============================================================
-- Row Level Security
-- ============================================================

-- Tracks, versions, placements: publicly readable (search is unauthenticated)
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tracks_public_read" ON tracks FOR SELECT USING (true);

ALTER TABLE versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "versions_public_read" ON versions FOR SELECT USING (true);

ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "placements_public_read" ON placements FOR SELECT USING (true);

-- Users, downloads, search_sessions: accessed via service role key only (server-side)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_sessions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- pgvector similarity search function (exact cosine, no index)
-- ============================================================
--
-- Returns tracks above a similarity threshold, sorted by relevance.
-- At 53k rows, exact cosine distance is sub-100ms without an index.
--
-- Usage from Supabase client:
--   supabase.rpc('match_tracks', {
--     query_embedding: [...],   -- 1536-dim vector from text-embedding-3-small
--     match_threshold: 0.6,     -- minimum cosine similarity
--     match_count: 10           -- max results
--   })
--
CREATE OR REPLACE FUNCTION match_tracks(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.6,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id         UUID,
  track_id   TEXT,
  title      TEXT,
  composer   TEXT,
  description TEXT,
  moods      TEXT[],
  genres     TEXT[],
  preview_url TEXT,
  album_name  TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.track_id,
    t.title,
    t.composer,
    t.description,
    t.moods,
    t.genres,
    t.preview_url,
    t.album_name,
    1 - (t.embedding <=> query_embedding) AS similarity
  FROM tracks t
  WHERE t.embedding IS NOT NULL
    AND 1 - (t.embedding <=> query_embedding) > match_threshold
  ORDER BY t.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
