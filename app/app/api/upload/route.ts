import { NextRequest, NextResponse } from "next/server";
import {saveTempFile} from "@/app/api/upload/saveTempFile";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file → buffer
        const validTypes = ["image/jpeg", "image/png", "image/gif" ,"audio/mpeg", "audio/wav", "audio/mp3"];
         // 5 MB

        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type! Only JPEG, PNG, GIF, mp3, wav or mpeg allowed." }, { status: 400 });
        }

        const tempUrl = await saveTempFile(file);
        return NextResponse.json(tempUrl);
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
