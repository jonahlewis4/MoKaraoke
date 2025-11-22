import {randomUUID} from "node:crypto";
import {uploadFileAndGetSignedUrl} from "@/utils/supabase/backendClient";
import {DEFAULT_BUCKET} from "@/utils/env/envConstants";

export const saveTempFile = async (file: File) : Promise<string> => {
    const newUUID = randomUUID();

    const tempUrl = uploadFileAndGetSignedUrl(
        DEFAULT_BUCKET,
        newUUID,
        file
    )

    return tempUrl;
}