// app/api/video/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MOCK_DATA_DIR = path.join(process.cwd(), "public", "mockData");


export async function GET(
    request: NextRequest,
) {
    try {
        const uuid = request.nextUrl.searchParams.get('uuid');
        if (!uuid) {
            return NextResponse.json({error: 'no uuid found'}, {status: 400});
        }
        const videoPath = getVideoFileByUuid(uuid);

        // Check if file exists
        if (!fs.existsSync(videoPath)) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = request.headers.get('range');

        if (range) {
            // Parse Range header
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            // Create read stream for the requested range
            const stream = fs.createReadStream(videoPath, { start, end });

            // Return 206 Partial Content
            return new NextResponse(stream as any, {
                status: 206,
                headers: {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize.toString(),
                    'Content-Type': 'video/mp4',
                },
            });
        } else {
            // No range request - send entire file
            const stream = fs.createReadStream(videoPath);

            return new NextResponse(stream as any, {
                status: 200,
                headers: {
                    'Content-Length': fileSize.toString(),
                    'Content-Type': 'video/mp4',
                    'Accept-Ranges': 'bytes',
                },
            });
        }
    } catch (error) {
        console.error('Error serving video:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function getVideoFileByUuid(uuid: string): string {
    const files = fs.readdirSync(MOCK_DATA_DIR).filter(f => f.endsWith(".mp4"));

    // Use UUID as seed for consistent file selection
    const hash = uuid.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);

    const index = Math.abs(hash) % files.length;
    return path.join(MOCK_DATA_DIR, files[index]);
}