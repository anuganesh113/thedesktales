import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, RotateCcw, X, AlertCircle, CheckCircle2, Sliders, Layers, ZoomIn, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DesignerControlsProps {
    onImageUpload: (file: File) => void;
    onPositionChange: (pos: { x: number; y: number }) => void;
    onScaleChange: (scale: number) => void;
    onRotationChange: (rot: number) => void;
    onReset: () => void;
    controls: {
        position: { x: number; y: number };
        scale: number;
        rotation: number;
        image: string | null;
        quality: 'excellent' | 'good' | 'fair' | 'poor' | null;
    };
    selectedSize: { width: number; height: number; name: string; price: number };
    onSizeChange: (sizeId: string) => void;
    sizes: any[];
}

const DesignerControls: React.FC<DesignerControlsProps> = ({
    onImageUpload,
    onPositionChange,
    onScaleChange,
    onRotationChange,
    onReset,
    controls,
    selectedSize,
    onSizeChange,
    sizes
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: false
    });

    return (
        <div className="p-6 md:p-8 space-y-10">
            {/* 1. Size Selection */}
            <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                    SELECT DIMENSIONS
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {sizes.map((size) => (
                        <button
                            key={size.id}
                            onClick={() => onSizeChange(size.id)}
                            className={cn(
                                "group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 text-left",
                                selectedSize.name === size.name
                                    ? "border-[#111827] bg-[#111827] text-white shadow-xl shadow-gray-200"
                                    : "border-gray-100 bg-white hover:border-[#111827]/30"
                            )}
                        >
                            <div>
                                <p className="text-sm font-bold uppercase tracking-tight">{size.name}</p>
                                <p className={cn(
                                    "text-[10px] font-medium tracking-wide",
                                    selectedSize.name === size.name ? "text-gray-400" : "text-gray-500"
                                )}>
                                    {size.width}x{size.height}cm • High-Density Fiber
                                </p>
                            </div>
                            <span className="font-black text-sm">Rs. {size.price}</span>

                            {selectedSize.name === size.name && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#F97316] rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* 2. Upload Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        UPLOAD ARTWORK
                    </h3>
                    {controls.image && (
                        <button onClick={onReset} className="text-[9px] font-black text-[#F97316] uppercase tracking-widest hover:underline flex items-center gap-1">
                            <RotateCcw size={10} /> Clear
                        </button>
                    )}
                </div>

                {!controls.image ? (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "relative aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-500 group cursor-pointer overflow-hidden",
                            isDragActive ? "border-[#F97316] bg-[#F97316]/5" : "border-gray-200 bg-gray-50 hover:bg-white hover:border-[#111827]/30"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 group-hover:text-[#F97316] transition-colors">
                            <Upload size={20} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-[#111827]">Drop your masterpiece here</p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">JPG, PNG up to 20MB</p>
                        </div>

                        {/* Background Decorative */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Adjustment Controls */}
                        <div className="space-y-6 bg-gray-50 rounded-3xl p-6 border border-gray-100">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <ZoomIn size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Zoom</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#111827]">{Math.round(controls.scale * 100)}%</span>
                                </div>
                                <Slider
                                    value={[controls.scale]}
                                    min={0.1}
                                    max={3}
                                    step={0.01}
                                    onValueChange={([val]) => onScaleChange(val)}
                                    className="[&>[role=slider]]:bg-[#F97316] [&>[role=slider]]:border-white"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Move size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Horizontal</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#111827]">{controls.position.x}px</span>
                                </div>
                                <Slider
                                    value={[controls.position.x]}
                                    min={-500}
                                    max={500}
                                    step={1}
                                    onValueChange={([val]) => onPositionChange({ ...controls.position, x: val })}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <RotateCcw size={14} className="-scale-x-100" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Rotation</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#111827]">{controls.rotation}°</span>
                                </div>
                                <Slider
                                    value={[controls.rotation]}
                                    min={-180}
                                    max={180}
                                    step={1}
                                    onValueChange={([val]) => onRotationChange(val)}
                                />
                            </div>
                        </div>

                        {/* Quality Indicator */}
                        <div className={cn(
                            "flex items-center gap-4 p-4 rounded-2xl border shadow-sm transition-all duration-500",
                            controls.quality === 'good' ? "bg-green-50/50 border-green-100" :
                                controls.quality === 'fair' ? "bg-amber-50/50 border-amber-100" :
                                    "bg-red-50/50 border-red-100"
                        )}>
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                controls.quality === 'good' ? "bg-green-100 text-green-600" :
                                    controls.quality === 'fair' ? "bg-amber-100 text-amber-600" :
                                        "bg-red-100 text-red-600"
                            )}>
                                {controls.quality === 'good' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#111827]">
                                    {controls.quality === 'good' ? "Print Resolution: Optimal" :
                                        controls.quality === 'fair' ? "Print Resolution: Moderate" :
                                            "Print Resolution: Low Quality"}
                                </p>
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                    {controls.quality === 'good' ? "Your artwork will look crisp and professional." :
                                        controls.quality === 'fair' ? "Some minor blurring may occur at this size." :
                                            "We recommend a higher resolution file for best results."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DesignerControls;
