import {NextRequest, NextResponse} from "next/server";
import {getAllUploadedVideos} from "@/utils/supabase/db";

export async function GET(
    request: NextRequest,
) {
    try {
        const videos: SanitizedVideo[] = await getAllUploadedVideos();
        return NextResponse.json(videos);
    } catch (error) {
        console.error('Error serving getting videos: ', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export type SanitizedVideo = {
    uuid: string;
    title: string;
    youtubeUrl: string;
}