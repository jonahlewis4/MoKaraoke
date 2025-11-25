// app/api/karaoke/upload/route.ts
import {NextResponse} from "next/server";
import {UploadRequest} from "@/utils/types/KaraokeRequest";
import {updateTitleAndUrl} from "@/utils/supabase/db";
import {getYoutubeLinkFromUUID} from "@/app/api/karaoke/create/mockData";

export async function POST(request: Request): Promise<NextResponse> {
    const uploadRequest: UploadRequest = await request.json();

    const url : string = await uploadAndSave(uploadRequest);

    return NextResponse.json({ youtubePath: url });
}

const uploadAndSave = async (input: UploadRequest): Promise<string> => {
    // Get the url for the requested file
    const url : string = await upload(input);
    await updateTitleAndUrl(input.generatedVideoUUID!, url, input.title);
    return url;
};

const upload = async (input: UploadRequest): Promise<string> => {
    return getYoutubeLinkFromUUID(input.generatedVideoUUID!);
};