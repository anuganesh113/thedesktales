import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/mockData';

// Force refresh for image update 
const CategorySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-background relative overflow-hidden min-h-[800px] flex items-center">

      {/* Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="container relative z-10 px-4 md:px-10 h-full flex flex-col">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-yellow text-xs font-bold tracking-widest uppercase">
            Curated Collections
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Shop by Style
          </h2>
        </div>

        {/* Expandable Gallery Grid */}
        <div className="flex flex-col lg:flex-row gap-4 h-[600px] w-full">
          {categories.map((category) => {
            const isActive = activeId === category.id;
            // Default active state for first item if none selected? Or just neutral? Let's go neutral until hover.
            // Actually, neutral is boring. Let's make no one active default, or track hover.

            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                onMouseEnter={() => setActiveId(category.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`
                        relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-elevated transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group
                        ${activeId && !isActive ? 'lg:flex-[1] opacity-60 grayscale-[50%]' : 'lg:flex-[1]'}
                        ${isActive ? 'lg:flex-[3.5] shadow-2xl shadow-brand-orange/10' : ''}
                        ${!activeId ? 'lg:flex-[1]' : ''}
                        h-[250px] lg:h-auto min-w-[60px] flex-shrink-0
                    `}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`
                                w-full h-full object-cover transition-transform duration-[1.5s] ease-out
                                ${isActive ? 'scale-100' : 'scale-125'}
                            `}
                  />
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-60'}`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end z-10">

                  {/* Desktop: Vertical Text when inactive, Horizontal when active */}
                  <div className="hidden lg:block relative w-full h-full">
                    <div className={`
                                absolute bottom-0 left-0 transition-all duration-500 origin-bottom-left
                                ${isActive ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
                            `}>
                      <h3 className="text-2xl font-bold text-white whitespace-nowrap -rotate-90 origin-bottom-left translate-x-8 translate-y-0 tracking-wider uppercase opacity-80">
                        {category.name.split(' ')[0]}
                      </h3>
                    </div>

                    <div className={`
                                flex flex-col justify-end h-full transition-all duration-500 delay-100
                                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            `}>
                      <div className="flex items-center justify-between border-b border-white/30 pb-4 mb-4">
                        <h3 className="font-display text-4xl lg:text-5xl font-bold text-white leading-none">
                          {category.name}
                        </h3>
                        <ArrowUpRight size={32} className="text-brand-orange" />
                      </div>
                      <p className="text-white/80 text-lg font-light max-w-md line-clamp-2">
                        {category.description}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                          {category.productCount} Products
                        </div>
                        <span className="text-brand-yellow font-bold text-sm tracking-wide uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                          Shop Now <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Standard Stack */}
                  <div className="lg:hidden">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white mb-1">{category.name}</h3>
                        <p className="text-white/70 text-sm">{category.productCount} items</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
