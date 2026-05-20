-- Figurinhas Copa 2026 - Database Schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  count INTEGER NOT NULL,
  confederation TEXT NOT NULL,
  flag_colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  flag_emoji TEXT NOT NULL DEFAULT ''
);

CREATE TABLE stickers (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES sections(id),
  number INTEGER NOT NULL,
  UNIQUE(section_id, number)
);

CREATE INDEX idx_stickers_section_id ON stickers(section_id);

CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID NOT NULL,
  sticker_id TEXT NOT NULL REFERENCES stickers(id),
  collected BOOLEAN NOT NULL DEFAULT false,
  repeated_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(device_id, sticker_id)
);

CREATE INDEX idx_collections_device_id ON collections(device_id);
CREATE INDEX idx_collections_sticker_id ON collections(sticker_id);

CREATE TABLE sync_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID NOT NULL,
  last_sync_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sync_log_device_id ON sync_log(device_id);

-- Enable Row Level Security
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access based on device_id
CREATE POLICY "Users can manage their own collections"
  ON collections
  FOR ALL
  USING (device_id = current_setting('app.device_id')::uuid)
  WITH CHECK (device_id = current_setting('app.device_id')::uuid);

-- Allow public read for sections and stickers
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public sections read"
  ON sections FOR SELECT USING (true);

ALTER TABLE stickers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public stickers read"
  ON stickers FOR SELECT USING (true);
