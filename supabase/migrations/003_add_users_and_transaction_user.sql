-- Migration: add users table and track which user created transactions

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mobile_number TEXT UNIQUE NOT NULL,
  pin TEXT NOT NULL, -- 4-digit pin stored as text
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- allow public access for development; adjust policies as needed in production
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on users" ON users FOR ALL USING (true) WITH CHECK (true);

-- add reference from transactions
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS created_by_user_id UUID REFERENCES users(id);

-- update existing policy on transactions to allow the new column
-- (policy defined earlier in schema.sql already permitted ALL, no change needed)

