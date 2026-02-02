import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                setFileName(file.name);
                onFileSelect(file);
            } else {
                alert("PDF ONLY, YOU INCOMPETENT FOOL.");
            }
        }
    }, [onFileSelect]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                setFileName(file.name);
                onFileSelect(file);
            } else {
                alert("PDF ONLY, YOU INCOMPETENT FOOL.");
            }
        }
    }, [onFileSelect]);

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFileName(null);
        onFileSelect(null);
    }

    return (
        <div className="relative group">
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="application/pdf"
                onChange={handleChange}
            />
            <motion.label
                htmlFor="file-upload"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
          flex flex-col items-center justify-center w-full h-48 
          border-2 border-dashed rounded-lg cursor-pointer 
          transition-all duration-300
          ${dragActive ? 'border-error bg-error/10 shadow-[0_0_30px_#ef4444]' : 'border-zinc-700 bg-background hover:border-error hover:bg-zinc-900'}
          ${fileName ? 'border-terminal shadow-[0_0_10px_#22c55e]' : ''}
        `}
            >
                <AnimatePresence mode='wait'>
                    {fileName ? (
                        <motion.div
                            key="file"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex flex-col items-center text-terminal"
                        >
                            <FileText className="w-12 h-12 mb-3" />
                            <p className="font-mono text-sm tracking-tighter">{fileName}</p>
                            <button
                                onClick={clearFile}
                                className="mt-2 p-1 hover:bg-error/20 rounded-full transition-colors text-error"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="prompt"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex flex-col items-center text-zinc-400 group-hover:text-error transition-colors"
                        >
                            <Upload className="w-12 h-12 mb-3 group-hover:animate-bounce" />
                            <p className="mb-2 text-sm font-mono"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-zinc-500">PDF (MAX 5MB, if you have that much to say)</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.label>
        </div>
    );
};
