import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import {saveFile} from "@/app/api/upload/saveFile";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file → buffer

        const uuid = saveFile(file);


        return NextResponse.json(uuid);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
