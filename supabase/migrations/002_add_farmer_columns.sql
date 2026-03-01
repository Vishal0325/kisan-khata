-- Add Aadhar and Photo columns to farmers table
ALTER TABLE farmers ADD COLUMN IF NOT EXISTS aadhar_no TEXT DEFAULT '';
ALTER TABLE farmers ADD COLUMN IF NOT EXISTS photo_url TEXT;
