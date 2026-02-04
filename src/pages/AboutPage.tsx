import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Palette,
    Users,
    ShieldCheck,
    Zap,
    Globe,
    Heart,
    ArrowRight,
    Monitor,
    MousePointer2,
    Image as ImageIcon,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import deskmatsImg from '@/assets/deskmats.png';
import mousepadsImg from '@/assets/mousepads.png';
import postersImg from '@/assets/posters.png';

const FadeIn = ({ children, delay = 0, direction = 'up' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right' }) => {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    );
};

const SectionHeader = ({ badge, title, description, centered = false }: { badge: string, title: string, description?: string, centered?: boolean }) => (
    <div className={cn("space-y-4 mb-16", centered && "text-center")}>
        <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em]", centered && "mx-auto")}>
            <Sparkles size={12} />
            {badge}
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            {title}
        </h2>
        {description && (
            <p className={cn("text-lg text-muted-foreground/80 max-w-2xl leading-relaxed", centered && "mx-auto")}>
                {description}
            </p>
        )}
    </div>
);

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            {/* 1. HERO SECTION */}
            <section className="relative pt-20 pb-20 lg:pb-32 overflow-hidden bg-background">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-orange/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-yellow/5 rounded-full blur-[100px]" />
                </div>

                <div className="container relative z-10 px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                                <span className="text-xs font-bold tracking-widest uppercase text-foreground/70">Founded in 2024</span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] text-foreground">
                                Crafting the<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-foreground to-foreground/50">Modern Canvas.</span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
                                The Desk Tales is a creative agency and premium eCommerce brand dedicated to transforming workspaces into portals of inspiration.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 2. BRAND STORY SECTION */}
            <section className="py-24 bg-white/5 relative">
                <div className="container px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn direction="right">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
                                    alt="Craftsmanship"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
                                    <p className="text-white text-lg italic font-light leading-relaxed">
                                        "We didn't just want to make accessories; we wanted to build a habitat for creators who spend hours bringing ideas to life."
                                    </p>
                                    <p className="text-brand-orange font-bold mt-4 uppercase tracking-widest text-xs">— Founders, The Desk Tales</p>
                                </div>
                            </div>
                        </FadeIn>

                        <div className="space-y-10">
                            <FadeIn delay={0.2}>
                                <SectionHeader
                                    badge="Our Origin"
                                    title="Born from a blank desk."
                                    description="The Desk Tales started in a small home office where the only thing missing was a spark of inspiration. We realized that the desk is more than just furniture—it's where stories are written, games are won, and masterpieces are born."
                                />
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <h4 className="text-4xl font-black text-foreground tracking-tighter">50+</h4>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Global Artists</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-4xl font-black text-foreground tracking-tighter">10k+</h4>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Desks Elevated</p>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <Button variant="ghost" className="group p-0 hover:bg-transparent" asChild>
                                    <Link to="/products" className="flex items-center gap-4 text-brand-orange font-bold uppercase tracking-widest text-sm">
                                        View our collections <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHAT WE MAKE SECTION */}
            <section className="py-32">
                <div className="container px-6">
                    <FadeIn>
                        <SectionHeader
                            centered
                            badge="The Collection"
                            title="Artifacts of Productivity"
                            description="Every piece we create is a blend of artisan aesthetics and industrial-grade durability."
                        />
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Monitor,
                                title: 'Premium Desk Mats',
                                desc: 'Ultra-smooth surface for a silent glide and zero-fatigue workflow. High-definition prints that never fade.',
                                image: deskmatsImg
                            },
                            {
                                icon: MousePointer2,
                                title: 'Stitched Mousepads',
                                desc: 'Reinforced edges and precision tracking surface. Designed for the competitive edge in gaming and design.',
                                image: mousepadsImg
                            },
                            {
                                icon: ImageIcon,
                                title: 'Framed Posters',
                                desc: 'Gallery-grade matte prints that turn your walls into a window of imagination. Sustainably sourced frames.',
                                image: postersImg
                            }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group relative bg-surface border border-gray-100 rounded-[2.5rem] p-4 pb-12 overflow-hidden hover:shadow-2xl hover:shadow-brand-orange/5 transition-all duration-500">
                                    <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="px-6 space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                                            <item.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CUSTOM & CREATOR FOCUS SECTION */}
            <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
                {/* Abstract shapes for visual interest */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="container px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <FadeIn>
                            <SectionHeader
                                centered
                                badge="Community first"
                                title="Empowering the Individual."
                            />
                        </FadeIn>

                        <div className="grid md:grid-cols-2 gap-12 text-left">
                            <FadeIn delay={0.1} direction="left">
                                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/20">
                                        <Palette size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight">Custom Designer</h3>
                                    <p className="text-white/60 leading-relaxed font-light">
                                        Upload your high-res digital art or photography. We handle the technical calibration and premium printing to bring your vision to life on a massive scale.
                                    </p>
                                    <Button variant="outline" className="border-white/20 hover:bg-white/5 text-white" asChild>
                                        <Link to="/custom-design">Build Your Design</Link>
                                    </Button>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2} direction="right">
                                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-yellow flex items-center justify-center shadow-lg shadow-brand-yellow/20 text-black">
                                        <Users size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight">Creator Support</h3>
                                    <p className="text-white/60 leading-relaxed font-light">
                                        We support independent artists worldwide. When you buy a tagged designer product, a significant portion of the sale goes directly to the creator.
                                    </p>
                                    <Button variant="ghost" className="text-brand-yellow hover:text-white p-0 hover:bg-transparent" asChild>
                                        <Link to="/designer-apply" className="flex items-center gap-2">Join our Marketplace <ArrowRight size={16} /></Link>
                                    </Button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. OUR VALUES SECTION */}
            <section className="py-32">
                <div className="container px-6">
                    <FadeIn>
                        <SectionHeader
                            centered
                            badge="Our Ethos"
                            title="Values worth sharing."
                        />
                    </FadeIn>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: 'No-Fade Quality', color: 'text-brand-orange' },
                            { icon: Zap, title: 'Fast Production', color: 'text-brand-yellow' },
                            { icon: Heart, title: 'Artist Centric', color: 'text-red-500' },
                            { icon: Globe, title: 'Sourcing Sustainably', color: 'text-green-500' }
                        ].map((value, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110", value.color, "bg-white shadow-sm")}>
                                        <value.icon size={32} />
                                    </div>
                                    <h4 className="font-bold tracking-widest text-[10px] uppercase">{value.title}</h4>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. HOW IT WORKS (Optional - but adding for clarity) */}
            <section className="py-32 border-t border-gray-100">
                <div className="container px-6">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {[
                            { step: '01', title: 'Curate', desc: 'Choose from our artist collections or upload your own work.' },
                            { step: '02', title: 'Calibrate', desc: 'Our team ensures color accuracy and print sharpness.' },
                            { step: '03', title: 'Craft', desc: 'High-definition thermal printing onto premium surfaces.' },
                            { step: '04', title: 'Deliver', desc: 'Secure packaging and global tracking to your doorstep.' }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="relative space-y-4">
                                    <span className="text-5xl font-black text-gray-100 absolute -top-4 -left-2 z-0">{item.step}</span>
                                    <div className="relative z-10 pl-6 border-l-2 border-brand-orange">
                                        <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. TRUST & CREDIBILITY SECTION */}
            <section className="py-24 bg-brand-orange text-white">
                <div className="container px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <FadeIn>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold tracking-tight">Quality is our signature.</h3>
                                <p className="text-white/80 max-w-xl">
                                    Every product undergoes a rigorous 4-point inspection before it leaves our workshop. If it's not perfect, we don't ship it.
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                        <CheckCircle2 size={16} /> <span className="text-xs font-bold uppercase tracking-widest">30-Day Returns</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                        <CheckCircle2 size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Global Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-16 h-16 rounded-full border-4 border-brand-orange overflow-hidden bg-white/10 backdrop-blur-xl">
                                        <img
                                            src={`https://i.pravatar.cc/150?u=${i + 10}`}
                                            alt="User"
                                            className="w-full h-full object-cover grayscale brightness-110"
                                        />
                                    </div>
                                ))}
                                <div className="w-16 h-16 rounded-full border-4 border-brand-orange bg-white flex items-center justify-center text-brand-orange font-bold text-sm">
                                    +1k
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 8. CTA SECTION */}
            <section className="py-32 bg-background relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <FadeIn>
                            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-4">
                                Ready to transform <br />
                                <span className="text-brand-orange">your story?</span>
                            </h2>
                            <p className="text-xl text-muted-foreground/80 font-light tracking-wide max-w-2xl mx-auto">
                                Join thousands of creators who have already elevated their setup with The Desk Tales artifacts.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button
                                    size="xl"
                                    className="h-16 px-12 text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full shadow-2xl shadow-brand-orange/20 transition-all duration-300 hover:scale-105 active:scale-95"
                                    asChild
                                >
                                    <Link to="/products">Shop the Collection</Link>
                                </Button>
                                <Button
                                    size="xl"
                                    variant="outline"
                                    className="h-16 px-12 text-lg font-bold border-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 active:scale-95"
                                    asChild
                                >
                                    <Link to="/custom-design">Create Your Own</Link>
                                </Button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AboutPage;
