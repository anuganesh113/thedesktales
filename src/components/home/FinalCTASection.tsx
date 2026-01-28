import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Command } from 'lucide-react';

const FinalCTASection: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] text-white px-6 py-24 lg:px-24 lg:py-32 text-center shadow-2xl">

                    {/* Dynamic Background Texture */}
                    <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    {/* Ambient Glows */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-[10000ms]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-[10000ms] delay-1000" />

                    <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-10">

                        {/* Status Pill */}
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-colors cursor-default">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
                            </div>
                            <span className="font-semibold text-sm tracking-wide text-white/90">Ready to Upgrade?</span>
                        </div>

                        {/* Huge Typography */}
                        <div className="space-y-6">
                            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]">
                                Your Desk Story <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-brand-yellow animate-gradient-x">Starts Here.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                                Join the new standard of workspace aesthetics. Premium materials, unmatched print quality, and a lifetime guarantee.
                            </p>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full pt-4">
                            <Button size="xl" className="group relative w-full sm:w-auto h-16 px-10 text-lg font-bold bg-white text-black hover:bg-white/90 rounded-full overflow-hidden transition-all duration-300 hover:scale-105" asChild>
                                <Link to="/products">
                                    <span className="relative z-10 flex items-center">
                                        Shop The Collection
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </Link>
                            </Button>

                            <Button size="xl" variant="outline" className="group w-full sm:w-auto h-16 px-10 text-lg font-bold bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white rounded-full transition-all duration-300" asChild>
                                <Link to="/custom-design">
                                    <span className="flex items-center gap-2">
                                        <Command size={20} />
                                        Design Your Own
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </Button>
                        </div>

                        {/* Footer Micro-copy */}
                        <p className="text-sm text-white/30 pt-8">
                            Includes 30-day money back guarantee & free shipping worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTASection;
