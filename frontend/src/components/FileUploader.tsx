"use client";

import { useState } from "react";
import { UploadCloud, Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { dict, Language } from "@/lib/i18n";

interface FileUploaderProps {
  onUploadSuccess: (data: any) => void;
  lang: Language;
}

export function FileUploader({ onUploadSuccess, lang }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = dict[lang];

  const computeFileHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const hash = await computeFileHash(file);
      console.log(`[MARS Edge] SHA-256: ${hash}`);

      const cachedFact = sessionStorage.getItem(`mars_fact_${hash}`);
      if (cachedFact) {
        await new Promise(r => setTimeout(r, 600)); 
        onUploadSuccess(JSON.parse(cachedFact));
        setIsProcessing(false);
        return;
      }

      // 1. Chunked Upload Architecture (Bypass Proxy Limits)
      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        
        let chunkRes;
        try {
          chunkRes = await fetch(`/api/upload-chunk?hash=${hash}&index=${i}&total=${totalChunks}`, {
            method: 'POST',
            body: chunk,
            headers: {
              'Content-Type': 'application/octet-stream'
            }
          });
        } catch (fetchErr: any) {
          throw new Error(`Chunk ${i} Network Error: ${fetchErr.message}`);
        }

        if (!chunkRes.ok) {
          throw new Error(`Chunk ${i} Failed: HTTP ${chunkRes.status}`);
        }
      }

      // 2. Trigger Analysis after all chunks are uploaded
      let uploadRes;
      try {
        uploadRes = await fetch(`/api/analyze?hash=${hash}`, {
          method: 'POST'
        });
      } catch (fetchErr: any) {
        throw new Error(`Network Error: ${fetchErr.message}`);
      }

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`HTTP ${uploadRes.status}: ${errText}`);
      }

      const initResult = await uploadRes.json();
      if (!initResult.taskId) {
        throw new Error(lang === 'zh' ? "服务器未返回任务ID" : "No Task ID returned from server.");
      }

      const taskId = initResult.taskId;
      let isComplete = false;
      let attempts = 0;
      const maxAttempts = 100; // 5 minutes max (100 * 3s)

      // 2. Poll for Status
      while (!isComplete && attempts < maxAttempts) {
        await new Promise(r => setTimeout(r, 3000));
        
        const statusRes = await fetch(`/api/status?taskId=${taskId}`);
        if (!statusRes.ok) {
          throw new Error("Failed to check task status.");
        }

        const statusData = await statusRes.json();
        
        if (statusData.status === 'complete') {
          sessionStorage.setItem(`mars_fact_${hash}`, JSON.stringify(statusData.facts));
          onUploadSuccess(statusData.facts);
          isComplete = true;
          break;
        } else if (statusData.error) {
          throw new Error(statusData.error);
        }

        attempts++;
      }

      if (!isComplete) {
        throw new Error(lang === 'zh' ? "后台计算超时 (超过5分钟)" : "Background processing timeout (exceeded 5 mins)");
      }

    } catch (err: any) {
      console.error("Upload Error:", err);
      setError(err.message || (lang === 'zh' ? "未知错误" : "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <motion.div 
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
        }`}
      >
        <input 
          type="file" 
          className="hidden" 
          id="file-upload" 
          onChange={onFileSelect}
          accept=".csv,.json,.xlsx,.pdf,.txt"
        />
        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full">
          <div className="p-4 bg-slate-100 rounded-full mb-4">
            {isProcessing ? (
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            ) : (
              <UploadCloud className="w-8 h-8 text-slate-600" />
            )}
          </div>
          
          <h3 className="text-lg font-medium text-slate-800">
            {isProcessing ? t.computing : t.uploadTitle}
          </h3>
          
          <p className="text-slate-500 text-sm mt-1 mb-4 text-center max-w-md">
            {isProcessing ? t.computingDesc : t.uploadDesc}
          </p>

          {!isProcessing && (
            <div className="px-6 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-sm">
              {t.browseFiles}
            </div>
          )}
        </label>
      </motion.div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-start text-sm border border-red-100 overflow-x-auto whitespace-pre-wrap">
          <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
