import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Truck,
    RotateCcw,
    Package,
    CreditCard,
    ShieldCheck,
    Mail,
    MessageSquare,
    Phone,
    ChevronDown,
    ExternalLink,
    LifeBuoy,
    MousePointer2,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HelpPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>('general');
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const categories = [
        { id: 'general', name: 'General', icon: LifeBuoy },
        { id: 'orders', name: 'Orders', icon: Package },
        { id: 'shipping', name: 'Shipping', icon: Truck },
        { id: 'returns', name: 'Returns', icon: RotateCcw },
        { id: 'payments', name: 'Payments', icon: CreditCard },
        { id: 'product', name: 'Product Info', icon: ShieldCheck },
    ];

    const faqs = [
        {
            id: 'f1',
            category: 'general',
            question: 'What is The Desk Tales?',
            answer: 'The Desk Tales is a premium desk accessory brand specializing in bespoke deskmats, mousepads, and art prints. We collaborate with independent designers to bring gallery-quality art to your workspace.'
        },
        {
            id: 'f2',
            category: 'orders',
            question: 'Can I change or cancel my order?',
            answer: 'We process orders quickly, but we can usually make changes if you contact us within 2 hours of placing your order. Once production starts (especially for custom items), changes or cancellations may not be possible.'
        },
        {
            id: 'f3',
            category: 'shipping',
            question: 'Where do you ship?',
            answer: 'Currently, we ship all across Nepal. We offer express delivery within the Kathmandu Valley (2-3 business days) and standard shipping to all other major cities (4-7 business days).'
        },
        {
            id: 'f4',
            category: 'shipping',
            question: 'How much does shipping cost?',
            answer: 'We offer free shipping on all orders over Rs. 1,500. For orders below this amount, a flat rate shipping fee of Rs. 150 applies for inside Valley and Rs. 250 for outside Valley.'
        },
        {
            id: 'f5',
            category: 'returns',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for standard products if they are in original condition. Please note that custom-designed products are non-returnable unless they arrive damaged or defective.'
        },
        {
            id: 'f6',
            category: 'product',
            question: 'How do I clean my DeskMat?',
            answer: 'Our deskmats are water-resistant. For regular cleaning, wipe with a damp cloth and mild soap. They are also machine washable on a gentle, cold cycle, but air drying is highly recommended to preserve the print quality.'
        },
        {
            id: 'f7',
            category: 'payments',
            question: 'What payment methods do you accept?',
            answer: 'We accept eSewa, Khalti, ConnectIPS, and Cash on Delivery for orders within the Kathmandu Valley. Digital payments are preferred for faster processing.'
        },
        {
            id: 'f8',
            category: 'orders',
            question: 'Can I track my order?',
            answer: 'Yes! Once your order is shipped, you will receive an SMS and email with a tracking link to follow your package until it reaches your doorstep.'
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        (openCategory === null || faq.category === openCategory) &&
        (searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* 1. HERO SECTION */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#111827]">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#F97316]/10 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-[#FBBF24]/5 blur-[100px] rounded-full" />
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </div>

                    <div className="container relative z-10 px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                        >
                            <Sparkles size={12} className="text-[#F97316]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Support Hub</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8"
                        >
                            HOW CAN WE <span className="text-[#F97316]">HELP?</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl mx-auto relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#F97316] to-[#FBBF24] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                            <div className="relative flex items-center bg-white rounded-2xl overflow-hidden shadow-2xl">
                                <Search className="absolute left-6 text-gray-400 w-6 h-6" />
                                <input
                                    type="text"
                                    placeholder="Search for questions, or topics..."
                                    className="w-full py-6 pl-16 pr-6 bg-transparent text-[#111827] text-lg font-medium outline-none placeholder:text-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. CATEGORIES & FAQ SECTION */}
                <section className="container px-6 py-20 lg:py-32">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Categories */}
                        <aside className="lg:w-72 shrink-0">
                            <div className="sticky top-24 space-y-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">Browse by Topic</h3>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setOpenCategory(cat.id);
                                            setSearchQuery('');
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 group text-left",
                                            openCategory === cat.id
                                                ? "bg-[#111827] text-white shadow-xl shadow-gray-200 scale-[1.02]"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-[#111827]"
                                        )}
                                    >
                                        <cat.icon size={18} className={cn(
                                            "transition-colors",
                                            openCategory === cat.id ? "text-[#F97316]" : "group-hover:text-[#F97316]"
                                        )} />
                                        {cat.name}
                                        {openCategory === cat.id && (
                                            <motion.div layoutId="activeCat" className="ml-auto">
                                                <MousePointer2 size={14} className="text-white/30" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* FAQ List */}
                        <div className="flex-1 max-w-3xl">
                            <div className="mb-12">
                                <h2 className="text-3xl lg:text-4xl font-black text-[#111827] tracking-tight mb-2">
                                    {searchQuery ? `Searching for "${searchQuery}"` : categories.find(c => c.id === openCategory)?.name}
                                </h2>
                                <p className="text-gray-500 font-medium">
                                    {filteredFaqs.length} results found in this section.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {filteredFaqs.length > 0 ? (
                                        filteredFaqs.map((faq) => (
                                            <motion.div
                                                key={faq.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className={cn(
                                                    "border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-500",
                                                    openFaq === faq.id ? "bg-gray-50/50 border-gray-200" : "bg-white hover:border-gray-200 shadow-sm"
                                                )}
                                            >
                                                <button
                                                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                                    className="w-full flex items-center justify-between p-8 text-left group"
                                                >
                                                    <span className={cn(
                                                        "text-lg font-bold tracking-tight transition-colors",
                                                        openFaq === faq.id ? "text-[#111827]" : "text-gray-500 group-hover:text-[#111827]"
                                                    )}>
                                                        {faq.question}
                                                    </span>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                                        openFaq === faq.id ? "bg-[#111827] text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-[#111827] group-hover:text-white"
                                                    )}>
                                                        <ChevronDown size={18} />
                                                    </div>
                                                </button>
                                                <AnimatePresence>
                                                    {openFaq === faq.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                        >
                                                            <div className="px-8 pb-8 pt-0">
                                                                <div className="h-px bg-gray-200/50 mb-6" />
                                                                <p className="text-gray-500 leading-relaxed font-medium">
                                                                    {faq.answer}
                                                                </p>
                                                                <div className="mt-6 flex items-center gap-4">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F97316]">Was this helpful?</span>
                                                                    <div className="flex gap-2">
                                                                        <button className="px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold hover:bg-[#111827] hover:text-white transition-all">Yes</button>
                                                                        <button className="px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold hover:bg-[#111827] hover:text-white transition-all">No</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center py-20 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                                <LifeBuoy size={24} className="text-gray-300" />
                                            </div>
                                            <h4 className="text-xl font-bold text-[#111827] mb-2">No answers found</h4>
                                            <p className="text-gray-500 max-w-xs mx-auto text-sm">We couldn't find any results for your search. Try another topic or contact our support team.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. CONTACT CTA SECTION */}
                <section className="container px-6 pb-32">
                    <div className="relative overflow-hidden rounded-[3rem] bg-[#111827] p-12 lg:p-20 text-center">
                        {/* Mesh Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/20 blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FBBF24]/10 blur-[100px]" />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F97316]/80 mb-6">Unanswered Quest?</h3>
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
                                    STILL NEED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FBBF24]">ASSISTANCE?</span>
                                </h2>
                                <p className="text-gray-400 text-lg font-medium">
                                    Our support squad is legendary. Reach out through any channel below and we'll get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <h4 className="text-white font-bold mb-2">Email</h4>
                                    <p className="text-gray-400 text-sm mb-4">support@thedesktales.com</p>
                                    <Button variant="outline" className="w-full bg-transparent border-white/10 text-white hover:bg-white hover:text-[#111827] text-[10px] rounded-xl uppercase tracking-widest font-black h-10">Email Us</Button>
                                </div>

                                <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#FBBF24]/10 flex items-center justify-center text-[#FBBF24] mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        <MessageSquare size={24} />
                                    </div>
                                    <h4 className="text-white font-bold mb-2">Live Chat</h4>
                                    <p className="text-gray-400 text-sm mb-4">Mon-Fri, 9am - 6pm</p>
                                    <Button className="w-full bg-[#F97316] hover:bg-white hover:text-[#111827] text-white text-[10px] rounded-xl uppercase tracking-widest font-black h-10 border-0">Start Chat</Button>
                                </div>

                                <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <h4 className="text-white font-bold mb-2">WhatsApp</h4>
                                    <p className="text-gray-400 text-sm mb-4">+977 980-0000000</p>
                                    <Button variant="outline" className="w-full bg-transparent border-white/10 text-white hover:bg-white hover:text-[#111827] text-[10px] rounded-xl uppercase tracking-widest font-black h-10">Text Us</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default HelpPage;
