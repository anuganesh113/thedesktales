import React from 'react';
import { Truck, Shield, Award, Leaf, Zap, Globe, Repeat, HeartHandshake } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'Global Shipping',
      description: 'Complimentary tracked shipping on all international orders over Rs. 150.',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description: "Protected forever. We stand behind our craftsmanship, guaranteed for life.",
      gradient: 'from-brand-orange to-red-500'
    },
    {
      icon: Award,
      title: 'Premium Materials',
      description: 'Sustainably sourced walnut, vegan leather, and aerospace-grade aluminum.',
      gradient: 'from-brand-yellow to-amber-500'
    },
    {
      icon: Leaf,
      title: 'Carbon Neutral',
      description: 'We plant a tree for every product sold, offsetting 100% of our footprint.',
      gradient: 'from-green-500 to-emerald-400'
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-orange/10 via-black to-black opacity-40 pointer-events-none" />

      <div className="container relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">The Desk Tales Promise</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            Designed for Life.<br />
            <span className="text-white/40">Built for Forever.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-start gap-6">
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                    <feature.icon size={28} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
