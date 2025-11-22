// backend/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import {SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL} from "@/utils/env/envConstants";

const supabaseUrl = SUPABASE_URL!;
const supabaseKey = SUPABASE_SERVICE_ROLE_KEY!; // SERVICE KEY for server only
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Ensures the bucket exists; if not, creates it.
 */
async function ensureBucketExists(bucket: string, isPublic = false) {
    // List all buckets to check if it exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) throw new Error(`Failed to list buckets: ${listError.message}`);

    const exists = buckets.some((b) => b.name === bucket);
    if (!exists) {
        const { data, error: createError } = await supabase.storage.createBucket(bucket, {
            public: isPublic,
        });
        if (createError) throw new Error(`Failed to create bucket: ${createError.message}`);
        return data;
    }
    return buckets.find((b) => b.name === bucket);
}

/**
 * Uploads a file to Supabase storage, ensuring bucket exists.
 * Returns a signed URL valid for `expiresInSec` seconds.
 */
export async function uploadFileAndGetSignedUrl(
    bucket: string,
    filePath: string,
    fileBuffer: Buffer,
    expiresInSec = 3600, // default 1 hour
    isPublic = false
): Promise<string> {
    // Step 1: Ensure bucket exists
    await ensureBucketExists(bucket, isPublic);

    // Step 2: Upload the file
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, fileBuffer, { upsert: true });

    if (uploadError) throw new Error(`Failed to upload file: ${uploadError.message}`);
    if (!uploadData) throw new Error("Upload failed, no data returned.");

    // Step 3: Generate signed URL
    if (isPublic) {
        // Public bucket: return permanent URL
        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        const publicUrl = data.publicUrl;
        return publicUrl;
    } else {
        // Private bucket: return temporary signed URL
        const { data: signedData, error: signedError } = await supabase.storage
            .from(bucket)
            .createSignedUrl(filePath, expiresInSec);
        if (signedError || !signedData) throw new Error(`Failed to create signed URL: ${signedError?.message}`);
        return signedData.signedUrl;
    }
}
