import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, Palette, ChevronRight, Star, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-background selection:bg-brand-orange/30 perspective-[1000px]"
    >

      {/* 1. Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Parallax Blobs */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-brand-orange/20 rounded-full blur-[130px] mix-blend-screen transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-yellow/10 rounded-full blur-[100px] mix-blend-screen transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        />

        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />

        {/* Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="container relative z-10 px-6 md:px-10 lg:px-12 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* 2. Left Column: Typography (7 Columns) */}
          <div className="lg:col-span-6 lg:pr-10 space-y-10 order-2 lg:order-1 relative">

            <div className={`space-y-8 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

              {/* Ultra-Premium Badge with Shimmer */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/5 group cursor-default hover:bg-white/10 transition-colors duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite]" />
                <Sparkles size={14} className="text-brand-yellow" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/90 font-display relative z-10">Handcrafted Excellence</span>
              </div>

              {/* Editoral Headline */}
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-foreground -ml-1">
                Design Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-foreground to-brand-orange/80">
                  Dream Setup.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed max-w-lg font-normal tracking-wide border-l-2 border-brand-orange/30 pl-6">
                Premium, custom-printed desk accessories for creators who refuse to settle for ordinary.
              </p>
            </div>

            {/* Interactive CTAs */}
            <div className={`flex flex-col sm:flex-row gap-5 transition-all duration-1000 delay-200 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <Button
                size="xl"
                className="h-16 px-10 text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white shadow-[0_4px_40px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_60px_-10px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all duration-300 rounded-full group relative overflow-hidden"
                asChild
              >
                <Link to="/custom-design">
                  <span className="relative z-10 flex items-center">
                    <Palette className="mr-2.5 w-5 h-5" />
                    Start Creating
                    <ChevronRight className="ml-2 w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/0 via-brand-yellow/30 to-brand-yellow/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </Button>

              <Button
                size="xl"
                variant="ghost"
                className="h-16 px-10 text-lg font-semibold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-foreground backdrop-blur-sm transition-all duration-300 rounded-full"
                asChild
              >
                <Link to="/products">
                  Explore Collection
                </Link>
              </Button>
            </div>

            {/* Stats Footer */}
            <div className={`pt-8 border-t border-white/5 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>12 Designers Online</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div>2 Day Production Time</div>
              </div>
            </div>
          </div>

          {/* 3. Right Column: 3D Image Showcase (5 Columns) */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 perspective-[2000px]">
            <div
              className={`relative z-10 w-full aspect-[4/5] lg:aspect-square max-h-[700px] mx-auto transition-all duration-1000 delay-300 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                transform: `rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >

              {/* Main Card with Glass Border */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-surface-elevated group">
                {/* Image Scale Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
                  <img
                    src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=2000"
                    alt="Premium Desk Setup"
                    className="w-full h-full object-cover transform scale-[1.03] group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform: `scale(1.1) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
                    }}
                  />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Floating Elements that move OPPOSED to mouse for depth */}

                {/* Top Right: Color Dots */}
                <div
                  className="absolute top-10 right-10 z-30 transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
                >
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl hover:bg-black/50 transition-colors">
                    <div className="flex flex-col gap-3">
                      {['#F97316', '#FBBF24', '#FFFFFF'].map((color, i) => (
                        <div key={i} className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Left: Product Tag */}
                <div
                  className="absolute bottom-10 left-10 z-30 transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
                >
                  <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4">
                    <div className=" bg-brand-orange rounded-full p-2 text-white">
                      <MousePointer2 size={16} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Custom Print</p>
                      <p className="font-bold text-white text-sm">Upload Your Art</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Glow */}
              <div
                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-brand-orange/30 blur-[100px] rounded-full opacity-60 transition-transform duration-200"
                style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
