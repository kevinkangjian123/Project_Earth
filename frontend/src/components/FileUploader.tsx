"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface FileUploaderProps {
  onUploadSuccess: (data: any) => void;
}

export function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to compute SHA-256 in the browser
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
      // 1. Edge-Side De-duplication (SHA-256 Hashing)
      const hash = await computeFileHash(file);
      console.log(`[MARS Edge] File SHA-256 computed: ${hash}`);

      // Check client-side session cache to avoid redundant API calls
      const cachedFact = sessionStorage.getItem(`mars_fact_${hash}`);
      if (cachedFact) {
        console.log(`[MARS Edge] Cache Hit! Instantly restoring facts for hash: ${hash}`);
        // Simulate a tiny delay for UX
        await new Promise(r => setTimeout(r, 600)); 
        onUploadSuccess(JSON.parse(cachedFact));
        setIsProcessing(false);
        return;
      }

      // 2. If Cache Miss, send to Backend API Bridge
      const formData = new FormData();
      formData.append('file', file);
      formData.append('hash', hash);

      // We will create this API route next
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process file on the server.");
      }

      const result = await response.json();

      // 3. Store result in ephemeral session memory using the Hash
      sessionStorage.setItem(`mars_fact_${hash}`, JSON.stringify(result));
      
      onUploadSuccess(result);

    } catch (err: any) {
      setError(err.message || "An unknown error occurred during analysis.");
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
          accept=".csv,.json,.xlsx,.pdf"
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
            {isProcessing ? "Computing Kinematic Momentum..." : "Upload Scorecard Data"}
          </h3>
          
          <p className="text-slate-500 text-sm mt-1 mb-4 text-center max-w-md">
            {isProcessing 
              ? "Running SHA-256 edge verification and invoking MARS Python Engine..." 
              : "Drop your Excel, CSV, or JSON here. MARS uses an ephemeral memory strategy with SHA-256 de-duplication."}
          </p>

          {!isProcessing && (
            <div className="px-6 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-sm">
              Browse Files
            </div>
          )}
        </label>
      </motion.div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-start text-sm border border-red-100">
          <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
