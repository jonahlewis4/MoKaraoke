// app/api/karaoke/upload/create.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {randomUUID} from "node:crypto";
import {GenerationRequest} from "@/utils/types/KaraokeRequest";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateVideo = async (input: GenerationRequest) => {
    return randomUUID();
};

export async function GET(request: GenerationRequest) {
    await sleep(2000);
    const uuid = await generateVideo(request);
    return NextResponse.json(uuid);
}
