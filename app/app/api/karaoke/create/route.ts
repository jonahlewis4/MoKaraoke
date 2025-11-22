// app/api/karaoke/upload/create.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {randomUUID} from "node:crypto";
import {GenerationRequest} from "@/utils/types/KaraokeRequest";
import {uuid} from "@supabase/supabase-js/src/lib/helpers";
import {savePermaFile} from "@/app/api/upload/saveTempFile";
import { readFile } from 'fs/promises';
import { basename } from 'path';
import {addGenVideoRow} from "@/utils/supabase/db";
const MOCK_DATA_DIR = path.join(process.cwd(), "public", "mockData");


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateVideo = async (input: GenerationRequest) => {
    const randomFile = getRandomVideoFile();
    const newUUID = randomUUID();

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

export async function GET(request: GenerationRequest) {
    await sleep(2000);
    try {
        const uuid = await generateVideo(request);
        console.log("generated video with uuid: ", uuid);
        return NextResponse.json(uuid);
    }
    catch (e) {
        console.error('Error generating video:', e);
        return NextResponse.json({ error: e }, { status: 400 });    }
}

function getRandomVideoFile(): string {
    const files = fs.readdirSync(MOCK_DATA_DIR).filter(f => f.endsWith(".mp4"));

    const index = Math.floor(Math.random() * files.length);
    return path.join(MOCK_DATA_DIR, files[index]);
}
async function getFileByPath(filePath: string): Promise<File> {
    const buffer = await readFile(filePath);
    const fileName = basename(filePath);

    // Convert buffer to File object (using browser File API polyfill if needed)
    const blob = new Blob([buffer]);
    return new File([blob], fileName);
}