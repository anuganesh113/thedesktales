import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RealisticPreviewProps {
    image: string | null;
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    size: { id?: string; width: number; height: number; name: string };
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
    // Detemine if it's a poster based on ID or vertical aspect ratio (all posters are vertical)
    const isPoster = size.id === 'a3' || size.id === 'a4' || aspectRatio < 1;
    const isMousepad = size.id === 'mousepad';

    return (
        <div className="relative w-full aspect-[16/10] flex items-center justify-center p-4 md:p-12 bg-[#F9FAFB] rounded-[40px] overflow-hidden">
            {/* Background Studio Lighting */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[#F97316]/3 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[#111827]/2 blur-[100px] rounded-full opacity-30" />
            </div>

            {/* Main Container */}
            <div
                className={cn(
                    "relative transition-all duration-500 ease-out",
                    isPoster
                        ? "h-[90%] w-auto shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)]"
                        : isMousepad
                            ? "w-[75%] max-w-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-[48px]"
                            : "w-full max-w-4xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-[48px]"
                )}
                style={{ aspectRatio: `${aspectRatio}` }}
            >
                {/* 1. Frame Layer (Visible for Posters) */}
                {isPoster && (
                    <div className="absolute -inset-4 bg-[#2a1d15] rounded-sm ring-4 ring-[#3d2b1f] shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] overflow-hidden">
                        {/* Wood Grain Texture Overlay */}
                        <div
                            className="absolute inset-0 opacity-20 mix-blend-overlay"
                            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }}
                        />
                        {/* Miter joints (simplified with gradients) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20" />
                    </div>
                )}

                {/* 2. Main Surface Layer */}
                <div className={cn(
                    "absolute inset-0 overflow-hidden ring-1 ring-black/10 shadow-inner",
                    isPoster
                        ? "bg-white rounded-none shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]"
                        : "bg-[#1a1a1a] rounded-[48px]"
                )}>

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
                            <div className={cn(
                                "w-full h-full flex flex-col items-center justify-center",
                                isPoster ? "text-gray-200" : "text-white/10"
                            )}>
                                <div className={cn(
                                    "w-1/2 aspect-video border-2 border-dashed rounded-xl flex items-center justify-center",
                                    isPoster ? "border-gray-100" : "border-white/5"
                                )}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">No Artwork</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Texture & Lighting Overlays (Top of Image) */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {/* Texture Overlay */}
                        <div className={cn(
                            "absolute inset-0 contrast-150 mix-blend-overlay",
                            isPoster ? "opacity-[0.15] brightness-90" : "opacity-[0.07] brightness-110"
                        )}
                            style={{
                                backgroundImage: isPoster
                                    ? "url('https://www.transparenttextures.com/patterns/black-paper.png')"
                                    : "url('https://grainy-gradients.vercel.app/noise.svg')"
                            }} />

                        {/* Top-Down Lighting Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

                        {/* Ambient Shadows (Specific for Frame Inner) */}
                        {isPoster && (
                            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]" />
                        )}

                        {!isPoster && (
                            <>
                                {/* Edge Shadow/Ambient Occlusion */}
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] rounded-[48px]" />
                                {/* Realistic Highlight Catchment */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-white/5 whitespace-nowrap" />
                            </>
                        )}
                    </div>
                </div>

                {!isPoster && (
                    <div className="absolute -inset-[1px] border border-white/20 rounded-[49px] pointer-events-none z-30 ring-2 ring-black/30" />
                )}

                {/* Size Label Indicator */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 w-full justify-center">
                    <div className="h-px w-20 bg-gray-200" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">
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
