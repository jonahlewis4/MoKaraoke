// app/api/karaoke/upload/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {request} from "node:http";
import {UploadRequest} from "@/utils/types/KaraokeRequest";
import {uploadToYoutube} from "@/utils/clientHttp/UploadToYoutube";
import {updateTitleAndUrl} from "@/utils/supabase/db";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {

    const uploadRequest : UploadRequest = await request.json();

    const url = await uploadAndSave(uploadRequest);

    return NextResponse.json({ youtubePath: url }); //some random youtube link for now
}

const uploadAndSave = async (input : UploadRequest) => {
    //get the url for the requested file
    const url = await upload(input)
    await updateTitleAndUrl(input.generatedVideoUUID!, url, input.title);
    return url;
};

const upload = async (input : UploadRequest)=> {
    return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}
