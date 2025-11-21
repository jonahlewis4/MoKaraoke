import {GenerationRequest} from "@/utils/types/KaraokeRequest";

//simulation of a backend call
export const createKaraokiVideo = async (input : GenerationRequest) : Promise<string> => {
    const response = await fetch("/api/karaoke/create");
    const data = await response.json();
    return data.videoUrl;
}