import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const testimonials = [
    {
        id: 1,
        name: "Rohan Shrestha",
        role: "Graphic Designer",
        content: "The quality of the Midnight Geometry desk mat is beyond my expectations. The colors are so vibrant and it's incredibly smooth for my mouse movements. A must-have for every workspace in Nepal!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        verified: true
    },
    {
        id: 2,
        name: "Aarati Thapa",
        role: "Digital Artist",
        content: "I've tried many desk mats, but the custom experience at The Desk Tales is unmatched. The process was seamless and the final result for my digital art was crystal clear. Absolutely love it!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        verified: true
    },
    {
        id: 3,
        name: "Sandeep Gupta",
        role: "Tech Enthusiast",
        content: "Found exactly what I was looking for to complete my setup! Fast delivery inside the valley and the 'Stitched Edge' finish gives it such a premium look and feel. Highly recommended.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        verified: true
    }
];

const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden selection:bg-[#F97316]/20">
            {/* Background Subtle Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] -z-10" />

            <div className="container relative z-10 px-4 md:px-10">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Social Proof.
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-6xl font-black text-[#111827] leading-[1.1]"
                    >
                        What our <br />
                        <span className="text-[#F97316]">Comunity Says.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Join thousands of professionals and creators who have redefined their workspaces with The Desk Tales.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "group relative p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#F97316]/5 transition-all duration-500 hover:-translate-y-2",
                                i === 1 && "md:translate-y-12"
                            )}
                        >
                            {/* Quote Mark */}
                            <div className="absolute top-8 right-8 text-gray-100 group-hover:text-[#F97316]/10 transition-colors duration-500">
                                <Quote size={56} fill="currentColor" />
                            </div>

                            <div className="relative z-10 space-y-8">
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={18}
                                            className={cn(
                                                "transition-all duration-500 group-hover:scale-110",
                                                starIndex < t.rating ? "fill-[#FBBF24] text-[#FBBF24]" : "text-gray-200"
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    "{t.content}"
                                </p>

                                {/* Profile */}
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="relative">
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-gray-50 group-hover:ring-[#F97316]/10 transition-all duration-500"
                                        />
                                        {t.verified && (
                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-50">
                                                <CheckCircle2 size={12} className="text-[#F97316]" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#111827] text-sm uppercase tracking-wider">{t.name}</h4>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Numbers / Stats */}
                <div className="mt-32 pt-16 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Active Users", value: "10K+" },
                        { label: "Custom Prints", value: "2.5K+" },
                        { label: "Average Rating", value: "4.9/5" },
                        { label: "Design Variants", value: "420+" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-1">
                            <div className="text-3xl font-black text-[#111827]">{stat.value}</div>
                            <div className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
