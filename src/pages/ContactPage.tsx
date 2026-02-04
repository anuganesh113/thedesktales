import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Clock,
    Send,
    CheckCircle2,
    HelpCircle,
    Package,
    User,
    ArrowRight,
    Monitor,
    MousePointer2,
    Image as ImageIcon,
    MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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

const ContactPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success("Message sent successfully!", {
                description: "Our studio team will get back to you within 24 hours.",
            });
        }, 1500);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white text-gray-900">

                {/* 1. HERO SECTION */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-zinc-50/50">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand-orange/5 rounded-full blur-[140px]" />
                        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-brand-yellow/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="container relative z-10 px-6">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-6">
                                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                                    <span className="text-xs font-bold tracking-widest uppercase text-zinc-500">Always Online</span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] text-gray-900">
                                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Touch.</span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
                                    Questions? We're here to help you create your perfect story. Whether it's a sizing doubt or a custom masterpiece, our team is standing by.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* 2. CONTACT OPTIONS & FORM */}
                <section className="py-20 lg:py-32 relative border-t border-zinc-100">
                    <div className="container px-6">
                        <div className="grid lg:grid-cols-12 gap-16">

                            {/* Left Column: Support Channels */}
                            <div className="lg:col-span-4 space-y-12">
                                <FadeIn direction="right">
                                    <div className="space-y-4 mb-12">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Support Channels</h2>
                                        <p className="text-zinc-500 leading-relaxed font-light">
                                            Every message is read by our small studio team. We care deeply about your experience.
                                        </p>
                                    </div>

                                    <div className="grid gap-6">
                                        {[
                                            {
                                                icon: Mail,
                                                title: 'General Inquiry',
                                                content: 'hello@thedesktales.com',
                                                desc: 'For design talk and partnerships.',
                                                link: 'mailto:hello@thedesktales.com'
                                            },
                                            {
                                                icon: Package,
                                                title: 'Order Support',
                                                content: 'orders@thedesktales.com',
                                                desc: 'Tracking, shipping, and returns.',
                                                link: 'mailto:orders@thedesktales.com'
                                            },
                                            {
                                                icon: Clock,
                                                title: 'Studio Hours',
                                                content: 'Mon – Fri: 9am – 6pm',
                                                desc: 'Typical response within 24h.',
                                                link: null
                                            }
                                        ].map((item, i) => (
                                            <div key={i} className="group p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-brand-orange/20 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50">
                                                <div className="flex items-start gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-brand-orange/5 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform">
                                                        <item.icon size={26} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-400">{item.title}</h4>
                                                        {item.link ? (
                                                            <a href={item.link} className="text-lg font-bold text-gray-900 hover:text-brand-orange transition-colors">{item.content}</a>
                                                        ) : (
                                                            <p className="text-lg font-bold text-gray-900">{item.content}</p>
                                                        )}
                                                        <p className="text-sm text-zinc-500/70 font-light">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Right Column: Contact Form */}
                            <div className="lg:col-span-8">
                                <FadeIn direction="left">
                                    <div className="relative p-[1px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-zinc-200 to-transparent">
                                        <div className="bg-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-zinc-200/50">
                                            {/* Subtle Internal Blob */}
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[100px] -mr-32 -mt-32" />

                                            <AnimatePresence mode="wait">
                                                {!isSubmitted ? (
                                                    <motion.div
                                                        key="form"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-10 relative z-10"
                                                    >
                                                        <div className="space-y-3">
                                                            <h3 className="text-4xl font-bold tracking-tight text-gray-900">Send us a message</h3>
                                                            <p className="text-zinc-500 font-light">Fill out the form below and we'll get back to you shortly.</p>
                                                        </div>

                                                        <form onSubmit={handleSubmit} className="space-y-8">
                                                            <div className="grid md:grid-cols-2 gap-8">
                                                                <div className="space-y-3">
                                                                    <Label htmlFor="name" className="text-zinc-500 font-bold ml-1 uppercase tracking-widest text-[10px]">Full Name</Label>
                                                                    <div className="relative group">
                                                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-orange transition-colors" size={20} />
                                                                        <Input
                                                                            id="name"
                                                                            required
                                                                            placeholder="John Doe"
                                                                            className="pl-14 h-16 rounded-[1.25rem] bg-zinc-50 border-zinc-100 focus:bg-white focus:border-brand-orange text-gray-900 placeholder:text-zinc-300 transition-all font-medium"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-3">
                                                                    <Label htmlFor="email" className="text-zinc-500 font-bold ml-1 uppercase tracking-widest text-[10px]">Email Address</Label>
                                                                    <div className="relative group">
                                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-orange transition-colors" size={20} />
                                                                        <Input
                                                                            id="email"
                                                                            type="email"
                                                                            required
                                                                            placeholder="john@example.com"
                                                                            className="pl-14 h-16 rounded-[1.25rem] bg-zinc-50 border-zinc-100 focus:bg-white focus:border-brand-orange text-gray-900 placeholder:text-zinc-300 transition-all font-medium"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="grid md:grid-cols-2 gap-8">
                                                                <div className="space-y-3">
                                                                    <Label htmlFor="subject" className="text-zinc-500 font-bold ml-1 uppercase tracking-widest text-[10px]">Subject</Label>
                                                                    <Select required>
                                                                        <SelectTrigger className="h-16 rounded-[1.25rem] bg-zinc-50 border-zinc-100 focus:ring-brand-orange/10 focus:border-brand-orange text-gray-900">
                                                                            <SelectValue placeholder="What can we help with?" />
                                                                        </SelectTrigger>
                                                                        <SelectContent className="rounded-2xl bg-white border-zinc-100 text-gray-900">
                                                                            <SelectItem value="order">Order Status</SelectItem>
                                                                            <SelectItem value="custom">Custom Design Request</SelectItem>
                                                                            <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                                                                            <SelectItem value="quality">Product Quality</SelectItem>
                                                                            <SelectItem value="designer">Designer Program</SelectItem>
                                                                            <SelectItem value="other">General Inquiry</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="space-y-3">
                                                                    <Label htmlFor="order" className="text-zinc-500 font-bold ml-1 uppercase tracking-widest text-[10px]">Order Number (Optional)</Label>
                                                                    <div className="relative group">
                                                                        <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-orange transition-colors" size={20} />
                                                                        <Input
                                                                            id="order"
                                                                            placeholder="#DT-12345"
                                                                            className="pl-14 h-16 rounded-[1.25rem] bg-zinc-50 border-zinc-100 focus:bg-white focus:border-brand-orange text-gray-900 placeholder:text-zinc-300 transition-all font-medium"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-3">
                                                                <Label htmlFor="message" className="text-zinc-500 font-bold ml-1 uppercase tracking-widest text-[10px]">Message</Label>
                                                                <Textarea
                                                                    id="message"
                                                                    required
                                                                    placeholder="Tell us how we can help..."
                                                                    className="min-h-[180px] rounded-[2rem] bg-zinc-50 border-zinc-100 focus:bg-white focus:border-brand-orange p-6 text-gray-900 placeholder:text-zinc-300 transition-all resize-none font-medium text-lg leading-relaxed shadow-sm"
                                                                />
                                                            </div>

                                                            <Button
                                                                type="submit"
                                                                disabled={isSubmitting}
                                                                className="w-full h-18 py-8 rounded-[1.5rem] bg-zinc-900 hover:bg-zinc-800 text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all active:scale-[0.98] group"
                                                            >
                                                                {isSubmitting ? (
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                        Sending...
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-3">
                                                                        <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                                                                        Send Message
                                                                    </div>
                                                                )}
                                                            </Button>
                                                        </form>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="success"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="flex flex-col items-center justify-center text-center py-20 space-y-8"
                                                    >
                                                        <div className="w-28 h-28 bg-brand-orange/5 rounded-full flex items-center justify-center text-brand-orange">
                                                            <CheckCircle2 size={56} className="animate-bounce" />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <h3 className="text-4xl font-bold tracking-tight text-gray-900">Message Received.</h3>
                                                            <p className="text-zinc-500 max-w-sm mx-auto font-light leading-relaxed">
                                                                Thank you for reaching out. We've verified your inquiry and our studio team will get back to you within 24 hours.
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setIsSubmitted(false)}
                                                            className="rounded-2xl border-zinc-200 hover:bg-zinc-50 h-14 px-10 text-xs font-bold uppercase tracking-widest text-zinc-900"
                                                        >
                                                            Send Another Message
                                                        </Button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. FAQ TEASER */}
                <section className="py-32 bg-zinc-50/50">
                    <div className="container px-6">
                        <div className="max-w-4xl mx-auto space-y-20">
                            <FadeIn>
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
                                        <HelpCircle size={12} />
                                        Common Questions
                                    </div>
                                    <h2 className="text-5xl font-bold tracking-tight text-gray-900">Need a quick answer?</h2>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <Accordion type="single" collapsible className="w-full space-y-6">
                                    {[
                                        {
                                            q: "How long does custom production take?",
                                            a: "Custom orders typically enter production within 24 hours of artist approval. The average production time is 2-3 business days, followed by secure global shipping."
                                        },
                                        {
                                            q: "Do you ship internationally?",
                                            a: "Yes! We ship our premium desk accessories to most countries worldwide. Shipping costs and delivery estimates are calculated in real-time at checkout."
                                        },
                                        {
                                            q: "What is your return policy?",
                                            a: "We offer a 30-day return policy for all standard items in original condition. Custom-printed products are only eligible for returns if there is a detected manufacturing defect."
                                        },
                                        {
                                            q: "Can I use my own artwork for posters?",
                                            a: "Absolutely. Our 'Create Your Own' tool supports high-resolution uploads for posters, mousepads, and desk mats. We calibrate every file for color accuracy."
                                        }
                                    ].map((faq, i) => (
                                        <AccordionItem key={i} value={`item-${i}`} className="border border-zinc-100 rounded-[2rem] px-8 bg-white overflow-hidden transition-all hover:shadow-lg hover:shadow-zinc-200/50">
                                            <AccordionTrigger className="hover:no-underline font-bold text-lg text-gray-900 text-left py-8">
                                                {faq.q}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-zinc-500 leading-relaxed pb-8 pt-0 font-light text-lg">
                                                {faq.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </FadeIn>

                        </div>
                    </div>
                </section>

                {/* 4. CTA SECTION */}
                <section className="py-40 relative overflow-hidden bg-zinc-900 text-white">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000"
                            alt="Workspace"
                            className="w-full h-full object-cover opacity-20 grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
                    </div>

                    <div className="container px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-12">
                            <FadeIn>
                                <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                                    Ready to transform <br />
                                    <span className="text-brand-orange">your workspace?</span>
                                </h2>
                                <p className="text-xl text-white/40 font-light tracking-wide max-w-2xl mx-auto">
                                    While we process your message, explore our handcrafted collections or start your next custom masterpiece in our studio.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Button
                                        size="xl"
                                        className="py-5 px-16 text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.4)]"
                                        asChild
                                    >
                                        <Link to="/products">Shop Collections</Link>
                                    </Button>
                                    <Button
                                        size="xl"
                                        variant="outline"
                                        className="py-5 px-16 text-lg font-bold border-white/20 rounded-full hover:bg-white hover:text-zinc-900 transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent"
                                        asChild
                                    >
                                        <Link to="/custom-design">Build Custom</Link>
                                    </Button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
};

export default ContactPage;
