import {KaraokeLifetime} from "@/types/KaraokeRequest";

//simulation of a backend call
export const createKaraokiVideo = async (input : KaraokeLifetime) : Promise<string> => {
    const response = await fetch("/api/karaoke");
    const data = await response.json();
    return data.videoUrl;
}