// app/api/karaoke/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
    await sleep(2000);const dirPath = path.join(process.cwd(), "public", "mockData");

    return NextResponse.json({ youtubePath: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }); //some random youtube link for now
}
