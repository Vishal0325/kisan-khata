# Supabase Storage Setup for Farmer Photos

1. Go to your Supabase project dashboard → **Storage**
2. Click **New bucket**
3. Name: `farmer-photos`
4. Enable **Public bucket** (so photos can be displayed via public URL)
5. Click **Create bucket**
6. Add storage policies in SQL Editor (if uploads fail):

```sql
-- Allow public uploads to farmer-photos bucket
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT TO public
  WITH CHECK (bucket_id = 'farmer-photos');

-- Allow public read (for public URLs)
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'farmer-photos');

-- Allow public update (for replacing photos)
CREATE POLICY "Allow public update" ON storage.objects
  FOR UPDATE TO public
  USING (bucket_id = 'farmer-photos');
```
