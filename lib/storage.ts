import { getSupabase } from "./supabase";

const BUCKET = "farmer-photos";

/**
 * Uploads a farmer photo to Supabase Storage and returns the public URL.
 * Requires the farmer-photos bucket to exist and be public.
 */
export async function uploadFarmerPhoto(
  farmerId: string,
  file: File
): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${farmerId}/photo.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      upsert: true,
      contentType: file.type,
    });

  if (error) throw new Error(`Failed to upload photo: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return publicUrl;
}
