import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import {DEFAULT_BUCKET} from "@/utils/env/envConstants";
import {getPathOfGenVideo} from "@/utils/supabase/db";
import {getFileUrl} from "@/utils/supabase/fs";


export async function GET(
    request: NextRequest,
) {
    try {
        const uuid = request.nextUrl.searchParams.get('uuid');
        console.log("uuid: ", uuid);
        if (!uuid) {
            return NextResponse.json({error: 'no uuid found'}, {status: 400});
        }
        const tempUrl = await getVideoFileByUuid(uuid);

        return NextResponse.redirect(tempUrl);
    }
    catch (error) {
        console.error('Error serving video:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

const getVideoFileByUuid = async (uuid: string) => {
    const path = await getPathOfGenVideo(uuid);
    console.log("path: ", path);
    const url = await getFileUrl(DEFAULT_BUCKET, path);
    console.log("url: ", url);
    return url;
};

