import { NextRequest, NextResponse } from 'next/server';
import { mkdir } from 'fs/promises';
import { createWriteStream, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { join } from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const fileHash = req.nextUrl.searchParams.get('hash');
    const chunkIndex = req.nextUrl.searchParams.get('index');
    const totalChunks = req.nextUrl.searchParams.get('total');

    if (!fileHash || !chunkIndex || !totalChunks || !req.body) {
      console.error(`[API Bridge] Chunk Error: Missing parameters`, { fileHash, chunkIndex, totalChunks, hasBody: !!req.body });
      return NextResponse.json({ error: "Missing required chunk parameters or body" }, { status: 400 });
    }

    console.log(`[API Bridge] Receiving chunk ${chunkIndex}/${totalChunks} for hash ${fileHash}...`);

    const baseStorageDir = existsSync('/data') ? '/data' : os.tmpdir();
    const uploadsDir = join(baseStorageDir, 'mars_uploads');
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const tempInputPath = join(uploadsDir, `${fileHash}.txt`);
    
    // If it's the very first chunk, overwrite any existing file from a failed previous attempt
    const writeFlags = chunkIndex === '0' ? 'w' : 'a';
    
    const nodeStream = Readable.fromWeb(req.body as any);
    const writeStream = createWriteStream(tempInputPath, { flags: writeFlags });
    
    await pipeline(nodeStream, writeStream);

    return NextResponse.json({ 
      success: true, 
      message: `Chunk ${chunkIndex}/${totalChunks} saved successfully.` 
    });

  } catch (error: any) {
    console.error(`[API Bridge] Chunk Upload Error:`, error);
    return NextResponse.json({ error: "Failed to save chunk." }, { status: 500 });
  }
}
