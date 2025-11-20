import {KaraokeRequest} from "@/types/KaraokeRequest";

//simulation of a backend call
export const createKaraokiVideo = async (input : KaraokeRequest) : Promise<string> => {
    const response = await fetch("/api/karaoke");
    const data = await response.json();
    return data.videoUrl;
}