import { NextRequest, NextResponse } from 'next/server';
import { readFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import os from 'os';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const taskId = searchParams.get('taskId');

  if (!taskId) {
    return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
  }

  const baseStorageDir = existsSync('/data') ? '/data' : os.tmpdir();
  const resultsDir = join(baseStorageDir, 'mars_results');
  const tempOutputPath = join(resultsDir, `${taskId}.json`);

  try {
    if (existsSync(tempOutputPath)) {
      // 1. Read the completed JSON result
      const resultData = await readFile(tempOutputPath, 'utf-8');
      const jsonResult = JSON.parse(resultData);

      // 2. Ephemeral Privacy: Delete the file instantly after reading
      try {
        await unlink(tempOutputPath);
        
        // Also try to delete the raw upload text to save space
        const uploadsDir = join(baseStorageDir, 'mars_uploads');
        const tempInputPath = join(uploadsDir, `${taskId}.txt`);
        if (existsSync(tempInputPath)) {
          await unlink(tempInputPath);
        }
      } catch (cleanupErr) {
        console.warn(`[API Bridge] Cleanup failed for ${taskId}:`, cleanupErr);
      }

      // 3. Return the result
      return NextResponse.json({
        status: "complete",
        facts: jsonResult
      });
    } else {
      // Still processing
      return NextResponse.json({ status: "processing" });
    }
  } catch (error: any) {
    console.error(`[API Bridge] Status Check Error for ${taskId}:`, error);
    return NextResponse.json({ error: "Failed to read result data." }, { status: 500 });
  }
}
