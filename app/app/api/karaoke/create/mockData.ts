// mockVideos.ts
import path from "path";

export const MOCK_VIDEOS = [
    {
        file: "public/mockData/NeverGonnaGiveYouUp.mp4",
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        file: "public/mockData/CallingYou.mp4",
        youtube: "https://www.youtube.com/watch?v=iNyGK7ymW0k"
    },
    {
        file: "public/mockData/Hallelujah.mp4",
        youtube: "https://www.youtube.com/watch?v=ttEMYvpoR-k"
    }
];

import crypto from "crypto";

function hashUUID(uuid: string): number {
    // Create a numeric hash
    const hash = crypto.createHash("md5").update(uuid).digest("hex");
    return parseInt(hash.substring(0, 8), 16); // 32-bit subset
}

function indexFromUUID(uuid: string, length: number): number {
    return hashUUID(uuid) % length;
}

export function getVideoFileFromUUID(uuid: string): string {
    const index = indexFromUUID(uuid, MOCK_VIDEOS.length);
    return path.resolve(MOCK_VIDEOS[index].file);
}
export function getYoutubeLinkFromUUID(uuid: string): string {
    const index = indexFromUUID(uuid, MOCK_VIDEOS.length);
    return MOCK_VIDEOS[index].youtube;
}

