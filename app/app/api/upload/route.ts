import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import {saveTempFile} from "@/app/api/upload/saveTempFile";
import {uploadFileAndGetSignedUrl} from "@/utils/supabase/backendClient";
import {DEFAULT_BUCKET} from "@/utils/env/envConstants";
import fs from "fs";
import {randomUUID} from "node:crypto";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file → buffer
        const validTypes = ["image/jpeg", "image/png", "image/gif" ,"audio/mpeg", "audio/wav", "audio/mp3"];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type! Only JPEG, PNG, GIF, mp3, wav or mpeg allowed." }, { status: 400 });
        }

        const tempUrl = await saveTempFile(file);
        return NextResponse.json(tempUrl);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
