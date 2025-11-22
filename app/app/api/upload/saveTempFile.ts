import {randomUUID} from "node:crypto";
import {DEFAULT_BUCKET} from "@/utils/env/envConstants";
import {uploadFile, uploadFileAndGetSignedUrl} from "@/utils/supabase/fs";

export const saveTempFile = async (file: File) : Promise<string> => {
    const newUUID = randomUUID();

    const tempUrl = uploadFileAndGetSignedUrl(
        DEFAULT_BUCKET,
        newUUID,
        file
    )

    return tempUrl;
}

export const savePermaFile = async (file: File, path : string) => {
    uploadFile(DEFAULT_BUCKET, path, file)
};
