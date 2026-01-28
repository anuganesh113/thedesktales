import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, categories } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
    const [sortBy, setSortBy] = useState('featured');
    const [visibleItems, setVisibleItems] = useState(8);
    const [isStyleOpen, setIsStyleOpen] = useState(false);

    // Sync with URL
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }
    }, [categoryParam]);

    const handleCategoryToggle = (slug: string) => {
        setSelectedCategories(prev => {
            const newCategories = prev.includes(slug)
                ? prev.filter(c => c !== slug)
                : [...prev, slug];

            // Update URL
            if (newCategories.length === 0) {
                searchParams.delete('category');
            } else if (newCategories.length === 1) {
                searchParams.set('category', newCategories[0]);
            }
            setSearchParams(searchParams);

            return newCategories;
        });
    };

    const handlePriceRangeChange = (range: string) => {
        setSelectedPriceRange(prev => prev === range ? '' : range);
    };

    // Get product counts per category
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        categories.forEach(cat => {
            counts[cat.slug] = products.filter(p => p.category === cat.slug).length;
        });
        return counts;
    }, []);

    const filteredProducts = useMemo(() => {
        let result = products.filter(product => {
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            let matchesPrice = true;
            if (selectedPriceRange) {
                if (selectedPriceRange === '$0 - $25') matchesPrice = product.price < 25;
                else if (selectedPriceRange === '$25 - $50') matchesPrice = product.price >= 25 && product.price <= 50;
                else if (selectedPriceRange === '$50+') matchesPrice = product.price > 50;
            }

            return matchesCategory && matchesPrice;
        });

        if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
        else if (sortBy === 'newest') result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));

        return result;
    }, [selectedCategories, selectedPriceRange, sortBy]);

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Ultra-Premium Hero Section - Fixed Height 400px */}
                <div className="relative h-[400px] overflow-hidden bg-white flex items-center">
                    {/* Artistic Background Elements */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        {/* Mesh Gradients */}
                        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[70%] bg-[#F97316]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#111827]/3 blur-[100px] rounded-full" />

                        {/* Floating Background Text - Hidden on mobile for performance and layout */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 0.03, x: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute right-[-50px] top-[10%] select-none pointer-events-none hidden lg:block"
                        >
                            <span className="text-[15rem] font-black tracking-tighter text-black uppercase leading-none">
                                Curated
                            </span>
                        </motion.div>

                        {/* Subtle Grid Pattern Overlay */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                    </div>

                    <div className="container relative z-10 px-6">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-4"
                            >
                                <span className="w-1 h-1 rounded-full bg-[#F97316]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F97316]">The Stash Redefined</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black text-[#111827] tracking-tighter leading-none mb-6"
                            >
                                SHOP <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] to-[#F97316]/50">ALL</span><span className="text-[#F97316]">.</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="flex flex-col md:flex-row md:items-end gap-6"
                            >
                                <p className="text-gray-500 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                                    A meticulously curated library of <span className="text-[#111827] font-bold">bespoke desk accessories</span> designed for the modern visionary. Elevate your physical workspace with high-definition surfaces.
                                </p>

                                <div className="flex gap-4 pb-1">
                                    <div className="h-10 w-px bg-gray-200 hidden md:block" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Assets</span>
                                        <span className="text-2xl font-bold text-[#111827]">{products.length} Designs</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Sidebar + Grid */}
                <div className="container px-4 py-12">
                    <div className="flex gap-8">
                        {/* Left Sidebar - Filters */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="sticky top-24 space-y-8">
                                {/* Categories */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                                        CATEGORIES
                                    </h3>
                                    <div className="space-y-4">
                                        {categories.map((category) => (
                                            <button
                                                key={category.slug}
                                                onClick={() => handleCategoryToggle(category.slug)}
                                                className="flex items-center justify-between w-full group transition-all"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300",
                                                        selectedCategories.includes(category.slug)
                                                            ? "bg-[#111827] border-[#111827] shadow-lg shadow-gray-200"
                                                            : "border-gray-200 group-hover:border-[#111827]"
                                                    )}>
                                                        <AnimatePresence>
                                                            {selectedCategories.includes(category.slug) && (
                                                                <motion.div
                                                                    initial={{ scale: 0, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    exit={{ scale: 0, opacity: 0 }}
                                                                >
                                                                    <Check size={12} className="text-white" strokeWidth={4} />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                    <span className={cn(
                                                        "text-sm font-bold transition-colors",
                                                        selectedCategories.includes(category.slug) ? "text-[#111827]" : "text-gray-500 group-hover:text-[#111827]"
                                                    )}>
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-black text-gray-300 bg-gray-50 px-2 py-0.5 rounded-full">
                                                    {categoryCounts[category.slug] || 0}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                                        PRICE RANGE
                                    </h3>
                                    <div className="space-y-4">
                                        {['$0 - $25', '$25 - $50', '$50+'].map((range) => (
                                            <button
                                                key={range}
                                                onClick={() => handlePriceRangeChange(range)}
                                                className="flex items-center gap-4 w-full group transition-all"
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                                    selectedPriceRange === range
                                                        ? "border-[#F97316] shadow-lg shadow-orange-100"
                                                        : "border-gray-200 group-hover:border-[#F97316]"
                                                )}>
                                                    <AnimatePresence>
                                                        {selectedPriceRange === range && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                                className="w-2.5 h-2.5 rounded-full bg-[#F97316]"
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                <span className={cn(
                                                    "text-sm font-bold transition-colors",
                                                    selectedPriceRange === range ? "text-[#111827]" : "text-gray-500 group-hover:text-[#F97316]"
                                                )}>
                                                    {range}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Style - Collapsible */}
                                <div>
                                    <button
                                        onClick={() => setIsStyleOpen(!isStyleOpen)}
                                        className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 hover:text-gray-700 transition-colors"
                                    >
                                        STYLE
                                        <ChevronDown
                                            size={16}
                                            className={cn(
                                                "transition-transform",
                                                isStyleOpen && "rotate-180"
                                            )}
                                        />
                                    </button>
                                    {isStyleOpen && (
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>Style filters coming soon...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </aside>

                        {/* Main Product Grid */}
                        <div className="flex-1">
                            {/* Top Bar - Count & Sort */}
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-sm text-gray-600">
                                    Showing <span className="font-semibold">{Math.min(visibleItems, filteredProducts.length)}</span> of{' '}
                                    <span className="font-semibold">{filteredProducts.length}</span> products
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Sort by:</span>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[140px] border-gray-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="featured">Featured</SelectItem>
                                            <SelectItem value="newest">Newest</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Product Grid - Premium Staggered Entry */}
                            {filteredProducts.length > 0 ? (
                                <>
                                    <motion.div
                                        layout
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                                    >
                                        <AnimatePresence mode='popLayout'>
                                            {filteredProducts.slice(0, visibleItems).map((product, index) => (
                                                <React.Fragment key={product.id}>
                                                    {/* Editorial Slot Removed */}
                                                    {false && (

                                                        <span className="hidden" />
                                                    )}

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{
                                                            duration: 0.6,
                                                            delay: index * 0.05,
                                                            ease: [0.215, 0.61, 0.355, 1]
                                                        }}
                                                    >
                                                        <ProductCard product={product} variant="minimal" />
                                                    </motion.div>
                                                </React.Fragment>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Premium Load More Experience */}
                                    {filteredProducts.length > visibleItems && (
                                        <div className="mt-20 flex flex-col items-center">
                                            {/* Progress Status */}
                                            <div className="w-full max-w-xs mb-8">
                                                <div className="flex justify-between items-end mb-2">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#111827]">
                                                        Discovery Progress
                                                    </p>
                                                    <p className="text-[11px] font-bold text-gray-400">
                                                        {Math.min(visibleItems, filteredProducts.length)} / {filteredProducts.length}
                                                    </p>
                                                </div>
                                                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(Math.min(visibleItems, filteredProducts.length) / filteredProducts.length) * 100}%` }}
                                                        className="h-full bg-[#F97316]"
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                variant="outline"
                                                onClick={() => setVisibleItems(prev => prev + 8)}
                                                className="group relative px-12 py-7 rounded-full border-2 border-[#111827] bg-transparent text-[#111827] hover:bg-[#111827] hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden"
                                            >
                                                <span className="relative z-10">Load More Products</span>
                                                <div className="absolute inset-0 bg-[#111827] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-32 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                                        <Check size={32} className="text-gray-200" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#111827] mb-2 tracking-tight">No products match your selection</h3>
                                    <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">Fine-tune your filters or clear them to explore our full collection.</p>
                                    <Button
                                        onClick={() => {
                                            setSelectedCategories([]);
                                            setSelectedPriceRange('');
                                        }}
                                        className="bg-[#111827] text-white hover:bg-[#F97316] rounded-full px-8 py-6 font-black text-[10px] uppercase tracking-widest transition-all"
                                    >
                                        Reset Filters
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductsPage;
