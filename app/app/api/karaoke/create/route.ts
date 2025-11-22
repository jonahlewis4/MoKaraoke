// app/api/karaoke/upload/create.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {randomUUID} from "node:crypto";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
    await sleep(2000);

    return NextResponse.json(randomUUID());
}
