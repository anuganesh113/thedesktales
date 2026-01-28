import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RealisticPreviewProps {
    image: string | null;
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    size: { width: number; height: number; name: string };
    isDragging?: boolean;
}

const RealisticPreview: React.FC<RealisticPreviewProps> = ({
    image,
    position,
    scale,
    rotation,
    size,
    isDragging
}) => {
    // Aspect ratio for the mockup container based on product size
    const aspectRatio = size.width / size.height;

    return (
        <div className="relative w-full aspect-[16/10] flex items-center justify-center p-4 md:p-12 bg-[#F9FAFB] rounded-[40px] overflow-hidden">
            {/* Background Studio Lighting */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[#F97316]/3 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[#111827]/2 blur-[100px] rounded-full opacity-30" />
            </div>

            {/* Main Mat Container */}
            <div
                className="relative w-full max-w-4xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-[20px] transition-all duration-500 ease-out"
                style={{ aspectRatio: `${aspectRatio}` }}
            >
                {/* The "Mat" Base */}
                <div className="absolute inset-0 bg-[#1a1a1a] rounded-[20px] overflow-hidden ring-1 ring-black/5 shadow-inner">

                    {/* SVG Mask for the Image Content */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                        {image ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-full relative"
                                style={{
                                    x: position.x,
                                    y: position.y,
                                    scale: scale,
                                    rotate: rotation,
                                }}
                            >
                                <img
                                    src={image}
                                    alt="Custom Artwork"
                                    className="w-full h-full object-contain pointer-events-none"
                                />
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                <div className="w-1/2 aspect-video border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">No Artwork</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Texture & Lighting Overlays (Top of Image) */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {/* Cloth Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.07] contrast-150 brightness-110 mix-blend-overlay"
                            style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

                        {/* Top-Down Lighting Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

                        {/* Edge Shadow/Ambient Occlusion */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] rounded-[20px]" />

                        {/* Realistic Highlight Catchment */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-white/5 whitespace-nowrap" />
                    </div>
                </div>

                {/* Decorative Stitched Edge Effect (Subtle) */}
                <div className="absolute -inset-[1px] border border-black/10 rounded-[21px] pointer-events-none z-30" />

                {/* Size Label Indicator */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <div className="h-px w-20 bg-gray-200" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {size.name} • {size.width}x{size.height}cm
                    </span>
                    <div className="h-px w-20 bg-gray-200" />
                </div>
            </div>

            {/* Grid Pattern Overlay for Context */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
            />
        </div>
    );
};

export default RealisticPreview;
