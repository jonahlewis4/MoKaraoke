// app/api/download/route.ts
import {NextRequest, NextResponse} from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get("uuid");

    if (!uuid) return new Response(JSON.stringify({ error: "Missing uuid" }), { status: 400 });

    const dirPath = path.join(process.cwd(), "public", "mockData");
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".mp4"));

    if (files.length === 0) {
        return new NextResponse("No videos found", { status: 404 });
    }

    const randomVideo = files[Math.floor(Math.random() * files.length)];
    const filePath = '/mockData/' + randomVideo;
    // just return the client-accessible URL

    if (!fs.existsSync(filePath)) return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });

    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
        headers: {
            "Content-Disposition": `attachment; filename="${uuid}.mp3"`,
            "Content-Type": "audio/mpeg",
        },
    });
}
