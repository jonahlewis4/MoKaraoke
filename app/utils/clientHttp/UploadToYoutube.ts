import {UploadRequest} from "@/utils/types/KaraokeRequest";

export const uploadToYoutube = async (input : UploadRequest) => {
    const response = await fetch("/api/karaoke/upload",
    {
        method: "POST",
        body: JSON.stringify(input),
    });
    const data = await response.json();
    return data.youtubePath;
}