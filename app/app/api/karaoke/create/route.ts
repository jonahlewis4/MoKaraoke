// app/api/karaoke/upload/create.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
    await sleep(2000);

    const dirPath = path.join(process.cwd(), "public", "mockData");
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".mp4"));

    if (files.length === 0) {
        return new NextResponse("No videos found", { status: 404 });
    }

    const randomVideo = files[Math.floor(Math.random() * files.length)];

    // just return the client-accessible URL
    return NextResponse.json({ videoUrl: `/mockData/${randomVideo}` });
}
