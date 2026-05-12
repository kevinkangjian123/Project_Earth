import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileHash = formData.get('hash') as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 1. Determine Storage Volume (Use Zeabur /data if available, otherwise OS /tmp)
    const baseStorageDir = existsSync('/data') ? '/data' : os.tmpdir();
    
    // Ensure directories exist
    const uploadsDir = join(baseStorageDir, 'mars_uploads');
    const resultsDir = join(baseStorageDir, 'mars_results');
    
    if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true });
    if (!existsSync(resultsDir)) await mkdir(resultsDir, { recursive: true });

    // 2. Stream file to disk (For MVP, we use arrayBuffer bufferization. The RAM spike is brief.)
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempInputPath = join(uploadsDir, `${fileHash}.txt`);
    const tempOutputPath = join(resultsDir, `${fileHash}.json`);
    
    await writeFile(tempInputPath, buffer);
    console.log(`[API Bridge] File saved to ${tempInputPath}.`);

    // 3. Asynchronous Execution (Decoupling)
    // We spawn the Python Engine and DO NOT wait for it.
    const pythonScriptPath = join(process.cwd(), 'python_engine', 'scorecard_to_mars_adapter.py');
    
    const pyProcess = spawn('python3', [pythonScriptPath, tempInputPath, tempOutputPath], {
      detached: true, // Allow process to run independently
      stdio: 'ignore' // Ignore stdio to prevent hanging on buffer fill
    });

    // Unref the process so Node doesn't wait for it to exit
    pyProcess.unref();

    console.log(`[API Bridge] Async Python Worker spawned for Task ID: ${fileHash}`);

    // 4. Instant Return to break the Proxy Timeout chain
    return NextResponse.json({ 
      success: true, 
      taskId: fileHash,
      message: "Processing started in background."
    });

  } catch (error: any) {
    console.error("[API Bridge] Server error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
