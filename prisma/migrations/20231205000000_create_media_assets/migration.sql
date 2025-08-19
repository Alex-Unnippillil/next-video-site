-- Create media_assets table
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "media_assets" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "container" TEXT NOT NULL,
  "video_codec" TEXT,
  "audio_codec" TEXT,
  "duration" DOUBLE PRECISION,
  "frame_rate" DOUBLE PRECISION,
  "width" INTEGER,
  "height" INTEGER,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
