CREATE TABLE IF NOT EXISTS user_consent (
  user_id text PRIMARY KEY,
  consented_at timestamptz NOT NULL
);
