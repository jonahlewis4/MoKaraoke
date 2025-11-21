import {UploadRequest} from "@/types/KaraokeRequest";

export const uploadToYoutube = async (input : UploadRequest) => {
    const response = await fetch("/api/karaoke/upload");
    const data = await response.json();
    return data.youtubePath;
}