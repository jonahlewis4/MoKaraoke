import {SanitizedVideo} from "@/app/api/karaoke/generated/all/route";

export const getUploadedVideos = async () : Promise<SanitizedVideo[]> => await (await fetch('/api/karaoke/generated/all')).json() as Promise<SanitizedVideo[]>;