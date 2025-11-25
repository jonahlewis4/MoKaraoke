// app/api/karaoke/upload/create.ts
import path from "path";
import { NextResponse } from "next/server";
import {randomUUID} from "node:crypto";
import {savePermaFile} from "@/app/api/upload/saveTempFile";
import { readFile } from 'fs/promises';
import { basename } from 'path';
import {addGenVideoRow} from "@/utils/supabase/db";
import {getVideoFileFromUUID} from "@/app/api/karaoke/create/mockData";
path.join(process.cwd(), "public", "mockData");


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateVideo = async () => {
    const newUUID = randomUUID();

    const randomFile = getVideoFileFromUUID(newUUID);

    //save map from uuid to file path in db, and store the file in the bucket
    const storagePath = `generated_videos/${randomUUID()}.mp4`; //important that the returend uuid is different from the one in the db
    console.log("storagePath: ", storagePath);

    const file = await getFileByPath(randomFile);
    console.log("file: ", file);

    await savePermaFile(file, storagePath);
    console.log("file saved");

    await addGenVideoRow(newUUID, storagePath)
    console.log("row added");
    return newUUID;
};

export async function GET() {
    await sleep(2000);
    try {
        const uuid = await generateVideo();
        console.log("generated video with uuid: ", uuid);
        return NextResponse.json(uuid);
    }
    catch (e) {
        console.error('Error generating video:', e);
        return NextResponse.json({ error: e }, { status: 400 });    }
}

async function getFileByPath(filePath: string): Promise<File> {
    const buffer = await readFile(filePath);
    const fileName = basename(filePath);

    // Convert buffer to File object (using browser File API polyfill if needed)
    const blob = new Blob([buffer]);
    return new File([blob], fileName);
}