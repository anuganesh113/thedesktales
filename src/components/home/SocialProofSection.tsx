import React from 'react';
import { Star, CheckCircle2, Instagram, Twitter, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialProofSection: React.FC = () => {
    const testimonials = [
        {
            id: 1,
            name: "Alex Morrison",
            handle: "@alexm_dev",
            role: "Senior Engineer",
            content: "The print quality on the 'Deep Space' mat is absolutely insane. It completely transformed my entire setup experience. 10/10 recommendation.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
            platform: "twitter"
        },
        {
            id: 2,
            name: "Sarah Kim",
            handle: "@skim_art",
            role: "Digital Illustrator",
            content: "Finally a desk mat that keeps up with my mouse movements AND looks like a piece of art. The custom print process was seamless.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            platform: "instagram"
        },
        {
            id: 3,
            name: "James Lee",
            handle: "@productivity_jam",
            role: "Content Creator",
            content: "Durable, easy to clean, and looks incredibly premium. I've recommended The Desk Tales to my entire discord community.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            platform: "twitter"
        },
        {
            id: 4,
            name: "Elena Rodriguez",
            handle: "@elena_builds",
            role: "UX Designer",
            content: "The texture is perfect for precision work. Plus, it brings my whole workspace aesthetic together perfectly.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
            platform: "instagram"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/5 via-transparent to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-yellow/5 via-transparent to-transparent opacity-50" />

            <div className="container relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center p-1 pr-6 rounded-full bg-white border border-black/5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 backdrop-blur-sm cursor-default hover:scale-105">
                        <div className="flex -space-x-3 mr-4">
                            {[
                                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100",
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"
                            ].map((src, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white overflow-hidden bg-gray-100">
                                    <img src={src} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-start gap-0.5">
                            <div className="flex text-brand-orange">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={10} className="fill-current" />
                                ))}
                            </div>
                            <span className="text-xs font-medium text-black/60 leading-none">
                                Trusted by <strong className="text-black font-bold">10,000+ Creators</strong>
                            </span>
                        </div>
                    </div>

                    <h2 className="font-display text-4xl md:text-6xl font-bold text-black leading-tight">
                        Loved by the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Best Setups.</span>
                    </h2>

                    <p className="text-black/60 text-lg md:text-xl leading-relaxed">
                        Join thousands of designers, developers, and gamers who have upgraded their workspace with The Desk Tales.
                    </p>
                </div>

                {/* Testimonials Grid (Masonry Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {testimonials.map((t, index) => (
                        <div
                            key={t.id}
                            className={`group relative p-8 rounded-3xl bg-white border border-black/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 ${index === 1 || index === 2 ? 'lg:translate-y-12' : ''}`}
                        >
                            {/* Quote Icon Background */}
                            <Quote className="absolute top-6 right-6 text-black/5 group-hover:text-brand-orange/10 transition-colors duration-300 scale-150 rotate-12" size={48} />

                            <div className="relative z-10 space-y-6">
                                {/* User Info */}
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                            {t.platform === 'twitter' ? <Twitter size={10} className="text-blue-400 fill-current" /> : <Instagram size={10} className="text-pink-500" />}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-black">{t.name}</h4>
                                        <p className="text-xs text-black/50">{t.role}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <p className="text-black/80 font-medium leading-relaxed">
                                    "{t.content}"
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-brand-yellow text-brand-yellow" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </section>
    );
};

export default SocialProofSection;
