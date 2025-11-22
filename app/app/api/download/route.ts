// app/api/download/route.ts
import {NextRequest, NextResponse} from "next/server";
import fs from "fs";
import path from "path";
import mime from "mime"; // npm install mime

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
    const fullPath = path.join(dirPath, randomVideo);
    // just return the client-accessible URL

    if (!fs.existsSync(fullPath)) return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });

    const fileBuffer = fs.readFileSync(fullPath);

    const mimeType = await mime.getType(fullPath) || "application/octet-stream";

    return new Response(fileBuffer, {
        headers: {
            "Content-Type": mimeType,
        },
    });
}
