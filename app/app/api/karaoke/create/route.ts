// app/api/karaoke/upload/create.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {randomUUID} from "node:crypto";
import {GenerationRequest} from "@/utils/types/KaraokeRequest";
const MOCK_DATA_DIR = path.join(process.cwd(), "public", "mockData");


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateVideo = async (input: GenerationRequest) => {
    return randomUUID();
};

export async function GET(request: GenerationRequest) {
    await sleep(2000);
    const uuid = randomUUID();
    return NextResponse.json(uuid);
}

function getRandomVideoFile(): string {
    const files = fs.readdirSync(MOCK_DATA_DIR).filter(f => f.endsWith(".mp4"));

    const index = Math.random() * files.length;
    return path.join(MOCK_DATA_DIR, files[index]);
}