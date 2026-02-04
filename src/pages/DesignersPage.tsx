import React from 'react';
import { motion } from 'framer-motion';
import {
    Palette,
    Layers,
    ShoppingBag,
    Globe,
    ExternalLink,
    Sparkles,
    ArrowRight,
    UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { designers } from '@/data/mockData';
import { cn } from '@/lib/utils';

const DesignersPage: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* 1. PREMIUM HERO SECTION */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#111827]">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-[#F97316]/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#FBBF24]/5 blur-[120px] rounded-full" />

                        {/* Abstract Lines */}
                        <div className="absolute inset-0 opacity-[0.05]" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '80px 80px'
                        }} />
                    </div>

                    <div className="container relative z-10 px-6">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                            >
                                <Palette size={12} className="text-[#F97316]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">The Design Collective</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8"
                            >
                                MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">ARTISTS</span><span className="text-[#F97316]">.</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col md:flex-row md:items-end gap-10"
                            >
                                <p className="text-gray-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                                    Our collection is curated from the portfolios of <span className="text-white font-bold">visionary creators</span> worldwide. Each piece tells a story, bringing a piece of their gallery to your desk.
                                </p>

                                <Link to="/designer-apply" className="shrink-0">
                                    <Button className="rounded-2xl px-8 py-7 bg-white text-[#111827] hover:bg-[#F97316] hover:text-white transition-all duration-300 font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-black/20 group">
                                        <UserPlus size={16} />
                                        Join the collective
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 2. DESIGNERS GRID */}
                <section className="container px-6 py-24 lg:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {designers.map((designer, index) => (
                            <motion.div
                                key={designer.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group relative"
                            >
                                {/* Decorative Card Background */}
                                <div className="absolute inset-0 bg-gray-50 rounded-[2.5rem] scale-[0.98] group-hover:scale-100 group-hover:bg-gray-100/50 transition-all duration-500 -z-10" />

                                <div className="p-8 lg:p-10 flex flex-col items-center text-center">
                                    {/* Avatar with Ring */}
                                    <div className="relative mb-8">
                                        <div className="absolute -inset-2 bg-gradient-to-tr from-[#F97316] to-[#FBBF24] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />
                                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                            <img
                                                src={designer.avatar}
                                                alt={designer.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        {designer.featured && (
                                            <div className="absolute -bottom-2 -right-2 bg-[#F97316] text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                                <Sparkles size={14} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Designer Info */}
                                    <div className="space-y-4 mb-10">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-[#111827] tracking-tight">{designer.name}</h3>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F97316] opacity-80">
                                                {designer.featured ? 'Featured Artist' : 'Independent Designer'}
                                            </p>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed italic">
                                            "{designer.bio}"
                                        </p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 w-full mb-10">
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                                            <Layers size={16} className="text-gray-400 mb-2" />
                                            <span className="text-lg font-bold text-[#111827]">{designer.designCount}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Designs</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                                            <ShoppingBag size={16} className="text-gray-400 mb-2" />
                                            <span className="text-lg font-bold text-[#111827]">{designer.totalSales}+</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Units Sold</span>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full rounded-2xl py-6 border-gray-200 text-[#111827] hover:bg-[#111827] hover:text-white transition-all font-black text-[10px] uppercase tracking-widest"
                                    >
                                        <Link to={`/products?designer=${designer.id}`}>
                                            View Collection
                                            <ExternalLink size={14} className="ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}

                        {/* Become a Designer Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: designers.length * 0.1, duration: 0.6 }}
                            className="relative rounded-[2.5rem] bg-[#F97316] overflow-hidden group shadow-2xl shadow-[#F97316]/20"
                        >
                            <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay" style={{
                                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }} />

                            <div className="p-10 h-full flex flex-col items-center justify-center text-center text-white relative z-10">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                                    <Palette size={32} />
                                </div>
                                <h3 className="text-3xl font-black tracking-tight mb-4">Your art here?</h3>
                                <p className="text-white/80 font-medium mb-10 text-sm max-w-xs">
                                    Join our network of world-class artists and earn commissions on every sale of your designs. Let's build your brand together.
                                </p>
                                <Button
                                    asChild
                                    className="rounded-2xl px-10 py-7 bg-white text-[#F97316] hover:bg-[#111827] hover:text-white transition-all font-black text-xs uppercase tracking-widest"
                                >
                                    <Link to="/designer-apply">
                                        Apply to design
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. QUOTE / VALUES */}
                <section className="bg-gray-50 py-24 lg:py-32">
                    <div className="container px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-none mb-10">
                                ART IS THE <span className="text-[#F97316]">SOUL</span> OF EVERY SETUP
                            </h2>
                            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                                We believe that your desk is a canvas. By empowering artists, we ensure that every setup isn't just a place to work, but a medium for creative expression.
                            </p>

                            <div className="mt-12 flex justify-center gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-[#F97316]/30" />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default DesignersPage;
