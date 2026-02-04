import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, Trash2, Ghost, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';

const WishlistPage: React.FC = () => {
    const { wishlist, toggleWishlist } = useWishlist();

    const wishlistedProducts = useMemo(() => {
        return products.filter(p => wishlist.includes(p.id));
    }, [wishlist]);

    return (
        <Layout>
            <div className="min-h-screen bg-white pb-24">
                {/* Dynamic Header Section */}
                <div className="bg-[#111827] pt-32 pb-20 relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[70%] bg-brand-orange/20 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[60%] bg-brand-yellow/10 blur-[100px] rounded-full" />
                    </div>

                    <div className="container px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2"
                            >
                                <Heart size={14} className="text-brand-orange fill-brand-orange" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Your Curated Collection</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
                            >
                                MY <span className="text-brand-orange">WISHLIST</span><span className="text-brand-yellow">.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 font-medium text-lg max-w-xl mx-auto"
                            >
                                {wishlistedProducts.length === 0
                                    ? "Your stash is looking a bit empty. Let's find some inspiration."
                                    : `You have ${wishlistedProducts.length} items saved in your personal gallery.`}
                            </motion.p>
                        </div>
                    </div>
                </div>

                <div className="container px-6 mt-[-3rem] relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {wishlistedProducts.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                >
                                    {wishlistedProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="relative group"
                                        >
                                            <ProductCard product={product} />
                                            {/* Remove from wishlist floating button for quick action */}
                                            <button
                                                onClick={() => toggleWishlist(product.id)}
                                                className="absolute top-4 right-4 z-30 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110"
                                                title="Remove from wishlist"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-[3rem] border border-dashed border-gray-200 py-32 text-center shadow-sm"
                                >
                                    <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-gray-300 relative">
                                        <Ghost size={48} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                                            <Sparkles size={16} className="text-brand-orange" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-[#111827] mb-4 tracking-tight">Nothing saved yet.</h3>
                                    <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                                        Explore our curated collections and heart the designs that resonate with your workspace.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        <Link to="/products">
                                            <Button className="rounded-2xl px-10 py-8 bg-[#111827] hover:bg-brand-orange text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all group">
                                                Explore Shop <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                            </Button>
                                        </Link>
                                        <Link to="/custom-design">
                                            <Button variant="outline" className="rounded-2xl px-10 py-8 border-2 border-gray-100 hover:border-brand-orange hover:text-brand-orange font-black text-xs uppercase tracking-[0.2em] transition-all">
                                                Create Your Own
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Recommendation Section for empty or small wishlists */}
                        {wishlistedProducts.length < 4 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-32 border-t border-gray-100 pt-20"
                            >
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                    <div className="space-y-2 text-center md:text-left">
                                        <h2 className="text-3xl font-black text-[#111827] tracking-tight">Recommended for your Setup</h2>
                                        <p className="text-gray-500 font-medium">Bestselling pieces to complete your desk aesthetic</p>
                                    </div>
                                    <Link to="/products?sort=best-selling">
                                        <Button variant="ghost" className="text-brand-orange font-black text-[10px] uppercase tracking-widest gap-2">
                                            View Bestsellers <ArrowRight size={14} />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {products.filter(p => p.bestseller && !wishlist.includes(p.id)).slice(0, 4).map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WishlistPage;
