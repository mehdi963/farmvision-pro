CREATE TABLE IF NOT EXISTS sensors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);