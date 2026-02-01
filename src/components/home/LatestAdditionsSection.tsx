import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getNewArrivals } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';

const LatestAdditionsSection: React.FC = () => {
    const products = getNewArrivals().slice(0, 8); // Showing top 8 new arrivals

    return (
        <section className="py-24 bg-[#F9FAFB] text-black overflow-hidden border-t border-gray-100">
            <div className="container">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#F97316]" />
                            <span className="text-[#F97316] font-bold uppercase tracking-widest text-[10px]">Fresh Drops</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black">
                            Latest Additions
                        </h2>
                        <p className="text-slate-500 font-medium max-w-lg">
                            Fresh from our designers' studios. Explore the latest trends in desk aesthetics and artisan craftsmanship.
                        </p>
                    </div>
                    <Link to="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#F97316] hover:text-[#FBBF24] transition-colors">
                        Shop All New
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Product Grid - Using Unified ProductCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} variant="default" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestAdditionsSection;
