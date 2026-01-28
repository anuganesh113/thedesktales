import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Upload, ShoppingCart, Layers, MousePointer2, Image as ImageIcon, Sparkles, ArrowRight, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CustomDesignCTA: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  // Auto-cycle through "design states" to simulate a working tool
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const designs = [
    { color: "from-brand-orange to-brand-yellow", name: "Sunset Gradient", type: "Gradient" },
    { color: "from-blue-600 to-purple-600", name: "Midnight Neon", type: "Abstract" },
    { color: "from-emerald-500 to-teal-900", name: "Deep Forest", type: "Nature" }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black selection:bg-brand-orange/30">

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="container relative z-10 px-4 md:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-yellow text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                <Wand2 size={14} />
                Interactive Design Studio
              </span>
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Design It. <br />
                <span className="text-white/20">Print It.</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange animate-gradient bg-300%">
                  Own It.
                </span>
              </h2>
              <p className="text-white/60 text-lg lg:text-xl max-w-lg leading-relaxed font-light">
                Don't settle for mass-produced. Our studio gives you pixel-perfect control over your workspace aesthetic.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Upload, title: "High-Res Uploads", desc: "Support for 4K images & vectors" },
                { icon: Palette, title: "Unlimited Colors", desc: "Full CMYK print capability" },
                { icon: Layers, title: "Smart Templates", desc: "Pre-sized for all mat sizes" },
                { icon: Sparkles, title: "AI Enhancement", desc: "Auto-upscaling for crisp prints" }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors group cursor-default">
                  <div className="text-brand-orange group-hover:scale-110 transition-transform">
                    <feat.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{feat.title}</h4>
                    <p className="text-white/40 text-xs">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="xl" className="rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold text-lg px-8 shadow-2xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all">
                <Link to="/custom-design" className="flex items-center gap-2">
                  Start Creating <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="rounded-full border-white/10 text-white hover:bg-white/10 backdrop-blur-md px-8">
                View Gallery
              </Button>
            </div>
          </div>

          {/* Right: Interactive 3D Mockup */}
          <div className="relative perspective-distant group">
            {/* 3D Floating Layers */}
            <div className="relative transform-style-3d transition-transform duration-1000 ease-out group-hover:rotate-x-2 group-hover:rotate-y-[-5deg] group-hover:scale-105">

              {/* Back Glow */}
              <div className="absolute inset-0 bg-brand-orange/20 blur-[100px] -z-10" />

              {/* Main "App Window" */}
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">

                {/* Status Bar */}
                <div className="h-12 border-b border-white/5 flex items-center justify-between px-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-white/20 text-xs font-mono">thedesktales_studio_v2.0</div>
                </div>

                {/* App Content */}
                <div className="flex-1 flex relative">
                  {/* Tools Sidebar */}
                  <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-white/[0.02]">
                    <div className="p-2 bg-brand-orange/20 text-brand-orange rounded-lg"><MousePointer2 size={18} /></div>
                    <div className="p-2 text-white/40 hover:text-white transition-colors"><ImageIcon size={18} /></div>
                    <div className="p-2 text-white/40 hover:text-white transition-colors"><Palette size={18} /></div>
                    <div className="p-2 text-white/40 hover:text-white transition-colors"><Layers size={18} /></div>
                  </div>

                  {/* Canvas Area */}
                  <div className="flex-1 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

                    {/* The "Product" being designed - cycles automatically */}
                    <div className="relative w-[70%] h-[60%] rounded-xl shadow-2xl border border-white/10 transition-all duration-1000 overflow-hidden group/canvas">
                      <div className={`absolute inset-0 bg-gradient-to-br ${designs[activeLayer].color} transition-all duration-1000`} />

                      {/* Design Elements Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white font-display font-bold text-5xl tracking-[0.2em] mix-blend-overlay opacity-80 scale-100 group-hover/canvas:scale-110 transition-transform duration-1000">
                          {designs[activeLayer].name.split(' ')[0]}
                        </div>
                      </div>

                      {/* Mock Crop Marks */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-white/30" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-white/30" />
                    </div>

                    {/* Floating Palette */}
                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex gap-3 shadow-xl translate-y-0 transition-transform hover:-translate-y-2">
                      {designs.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveLayer(i)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${activeLayer === i ? 'border-brand-orange scale-110' : 'border-transparent opacity-50'}`}
                          style={{ background: i === 0 ? 'orange' : i === 1 ? 'blue' : 'green' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements (Parallax) */}
              <div className="absolute -top-10 -right-10 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl animate-bounce duration-[3s]">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-green/20 text-green-400 p-2 rounded-lg"><Sparkles size={16} /></div>
                  <div>
                    <div className="text-white text-xs font-bold">AI Upscaling</div>
                    <div className="text-white/40 text-[10px]">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomDesignCTA;
