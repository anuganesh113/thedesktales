import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedDesigners } from '@/data/mockData';

const DesignerSpotlight: React.FC = () => {
  const featuredDesigners = getFeaturedDesigners();

  return (
    <section className="py-24 bg-surface-sunken relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-elevated/50 skew-x-12 translate-x-1/4" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Content Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm uppercase tracking-widest">
                <Sparkles size={14} />
                The Creator Economy
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Designed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-cyan-500">Independent Artists</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We bridge the gap between digital art and physical workspace. Every purchase directly supports the artist behind the design.
              </p>
            </div>

            <div className="space-y-4">
              {featuredDesigners.slice(0, 3).map((designer) => (
                <Link
                  key={designer.id}
                  to={`/designers/${designer.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border/50 hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-muted overflow-hidden shrink-0 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                    <img
                      src={designer.avatar}
                      alt={designer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-brand-orange transition-colors">
                      {designer.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{designer.designCount} designs</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="shadow-lg shadow-brand-orange/20" asChild>
                <Link to="/designers">
                  Browse All Artists
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual/Image Column */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Art 1" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl bg-white -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Art 2" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl bg-white rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Art 3" />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Art 4" />
                </div>
              </div>
            </div>

            {/* Floating Impact Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-center min-w-[280px]">
              <p className="text-4xl font-bold font-display text-foreground mb-1">20+</p>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Artists</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DesignerSpotlight;
