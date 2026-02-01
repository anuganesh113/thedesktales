import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface AssetUploaderProps {
    onUploadComplete: (file: File) => void;
}

export const AssetUploader: React.FC<AssetUploaderProps> = ({ onUploadComplete }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            if (selectedFile.size > 25 * 1024 * 1024) { // 25MB limit
                toast.error("File is too large. Max size is 25MB.");
                return;
            }

            // Check dimensions
            const img = new Image();
            img.src = URL.createObjectURL(selectedFile);
            img.onload = () => {
                if (img.width < 3000 || img.height < 3000) {
                    toast.error("Low resolution detected. Artwork must be at least 3000x3000px for print quality.");
                    URL.revokeObjectURL(img.src);
                    return;
                }
                setFile(selectedFile);
                setProgress(0);
                URL.revokeObjectURL(img.src);
            };
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/tiff': ['.tiff', '.tif']
        },
        maxFiles: 1,
        multiple: false
    });

    const handleUpload = () => {
        if (!file) return;

        setUploading(true);
        // Simulate upload progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setUploading(false);
                    toast.success("Asset uploaded successfully");
                    onUploadComplete(file);
                }, 500);
            }
        }, 200);
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
    };

    return (
        <div className="w-full">
            {!file ? (
                <div
                    {...getRootProps()}
                    className={`
            border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
            ${isDragActive
                            ? 'border-brand-orange bg-brand-orange/5'
                            : 'border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50'
                        }
          `}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-4">
                        <div className={`p-4 rounded-full ${isDragActive ? 'bg-brand-orange/10 text-brand-orange' : 'bg-gray-100 text-gray-400'}`}>
                            <Upload size={32} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-900">
                                {isDragActive ? 'Drop your artwork here' : 'Click to Upload or Drag & Drop'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                High-Res PNG, JPG, or TIFF (Min 300 DPI)
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                <FileImage size={24} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                        </div>
                        {!uploading && (
                            <Button variant="ghost" size="icon" onClick={removeFile} className="text-gray-400 hover:text-red-500">
                                <X size={20} />
                            </Button>
                        )}
                    </div>

                    {uploading ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-gray-500">
                                <span>Uploading to Secure Vault...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    ) : (
                        <div className="flex gap-3 mt-4">
                            <Button onClick={handleUpload} className="w-full bg-black hover:bg-gray-800 text-white gap-2">
                                Continue to Mockups
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
