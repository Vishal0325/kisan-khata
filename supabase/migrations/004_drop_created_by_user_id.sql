-- Migration: drop legacy created_by_user_id column

ALTER TABLE transactions DROP COLUMN IF EXISTS created_by_user_id;
