import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart, Save, ChevronLeft, Info, Upload, Sparkles, Zap, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import RealisticPreview from '@/components/custom/RealisticPreview';
import DesignerControls from '@/components/custom/DesignerControls';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/mockData';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SIZES = [
  { id: 'm', name: 'MEDIUM (28CM X 60CM)', width: 60, height: 28, price: 2499 },
  { id: 'l', name: 'LARGE (30CM X 82CM)', width: 82, height: 30, price: 3299 },
  { id: 'xl', name: 'EXTRA LARGE (42CM X 90CM)', width: 90, height: 42, price: 4499 },
];

type SizeOption = {
  id: string;
  name: string;
  width: number;
  height: number;
  price: number;
};

const TEMPLATES = [
  { id: 1, name: 'Minimal Gradient', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop' },
  { id: 2, name: 'Abstract Art', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop' },
  { id: 3, name: 'Nature Vibes', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop' },
  { id: 4, name: 'Geometric', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop' },
];

const CustomDesignPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[0]);
  const [image, setImage] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number } | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showProTips, setShowProTips] = useState(true);

  const [controls, setControls] = useState({
    position: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
  });

  const onImageUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
    setShowTemplates(false);

    const img = new Image();
    img.onload = () => {
      setImageMeta({ width: img.width, height: img.height });
    };
    img.src = url;
  }, []);

  const handleTemplateSelect = (templateUrl: string) => {
    setImage(templateUrl);
    setShowTemplates(false);

    const img = new Image();
    img.onload = () => {
      setImageMeta({ width: img.width, height: img.height });
    };
    img.src = templateUrl;
    toast.success("Template loaded! Customize it to your liking.");
  };

  const quality = useMemo(() => {
    if (!imageMeta) return null;

    const ppiW = (imageMeta.width / selectedSize.width) * 2.54;
    const ppiH = (imageMeta.height / selectedSize.height) * 2.54;
    const minPPI = Math.min(ppiW, ppiH) * controls.scale;

    if (minPPI > 150) return 'excellent';
    if (minPPI > 100) return 'good';
    if (minPPI > 72) return 'fair';
    return 'poor';
  }, [imageMeta, selectedSize, controls.scale]);

  const handleReset = () => {
    setImage(null);
    setImageMeta(null);
    setControls({ position: { x: 0, y: 0 }, scale: 1, rotation: 0 });
    setShowTemplates(true);
  };

  const handleAddToCart = () => {
    if (!image) {
      toast.error("Please upload an artwork first");
      return;
    }

    const customProduct: Product = {
      id: 'custom-deskmat',
      name: `Custom Deskmat`,
      category: 'custom',
      price: selectedSize.price,
      image: image,
      images: [image],
      description: `Custom designed deskmat - ${selectedSize.name}`,
      sizes: [selectedSize.name],
      colors: [{ name: 'Custom', value: '#000000' }],
      rating: 5,
      reviewCount: 0,
      inStock: true,
      material: 'High-Density Fiber',
      reviews: []
    };

    const added = addToCart(customProduct, selectedSize.name, { name: 'Custom', value: '#000000' }, undefined, 1);
    if (added) {
      toast.success("Added your custom creation to cart!");
    } else {
      toast.info("This design is already in your cart");
    }
  };

  const handleSaveDesign = () => {
    if (!image) {
      toast.error("Please upload an artwork first");
      return;
    }

    const savedDesign = {
      image,
      controls,
      selectedSize: selectedSize.id,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('savedCustomDesign', JSON.stringify(savedDesign));
    setIsSaved(true);
    toast.success("Successfully saved your design!");

    // Reset the "Saved" text after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  };

  const qualityConfig = {
    excellent: { color: 'bg-green-500', text: 'Excellent', icon: Star },
    good: { color: 'bg-blue-500', text: 'Good', icon: Zap },
    fair: { color: 'bg-yellow-500', text: 'Fair', icon: Info },
    poor: { color: 'bg-red-500', text: 'Poor Quality', icon: Info },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] via-gray-900 to-black text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgMTE0aDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDkwaDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDY2aDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDQyaDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDE4aDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
            <Link to="/products" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors mb-8">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Dream Deskmat</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Upload your artwork or choose from our curated templates. Our studio-grade preview shows exactly how your design will look in real life.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Live Preview</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Quality Check</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Instant Mockup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {quality && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${qualityConfig[quality].color} text-white text-xs font-bold`}>
                  {React.createElement(qualityConfig[quality].icon, { size: 12 })}
                  {qualityConfig[quality].text}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={handleSaveDesign} variant="ghost" size="sm" className="hidden md:flex gap-2 text-xs font-bold">
                {isSaved ? (
                  <><Check size={14} className="text-green-600" /> <span className="text-green-600">Saved Changes!</span></>
                ) : (
                  <><Save size={14} /> Save Design</>
                )}
              </Button>
              <div className="h-4 w-px bg-gray-200 hidden md:block" />
              <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</span>
                <span className="text-lg font-black text-gray-900">Rs. {selectedSize.price.toLocaleString()}</span>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!image}
                className="rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold text-xs px-6 h-10 shadow-lg shadow-brand-orange/20"
              >
                <ShoppingCart size={14} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
          {/* Left: Controls */}
          <aside className="w-full lg:w-[450px] lg:h-[calc(100vh-12rem)] overflow-y-auto border-r border-gray-100 bg-white">
            <DesignerControls
              onImageUpload={onImageUpload}
              onPositionChange={(pos) => setControls(prev => ({ ...prev, position: pos }))}
              onScaleChange={(s) => setControls(prev => ({ ...prev, scale: s }))}
              onRotationChange={(r) => setControls(prev => ({ ...prev, rotation: r }))}
              onReset={handleReset}
              controls={{ ...controls, image, quality }}
              selectedSize={selectedSize}
              sizes={SIZES}
              onSizeChange={(id) => setSelectedSize(SIZES.find(s => s.id === id) || SIZES[0])}
            />

            {/* Templates Section */}
            {showTemplates && (
              <div className="px-6 pb-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-orange" />
                  Quick Start Templates
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.image)}
                      className="group relative aspect-video rounded-xl overflow-hidden border-2 border-gray-100 hover:border-brand-orange transition-all hover:scale-105"
                    >
                      <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{template.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {showProTips && (
              <div className="px-6 pb-8">
                <Alert className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 text-blue-900" onClose={() => setShowProTips(false)}>
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-xs font-bold">Pro Tips</AlertTitle>
                  <AlertDescription>
                    <ul className="text-[10px] leading-relaxed text-blue-800 space-y-1 mt-1">
                      <li>• Use images at least 3000px wide for best quality</li>
                      <li>• Avoid critical elements near edges (stitching area)</li>
                      <li>• Preview on different sizes to ensure clarity</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </aside>

          {/* Right: Preview */}
          <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12 lg:h-[calc(100vh-12rem)] flex items-center justify-center">
            <div className="w-full max-w-5xl">
              <RealisticPreview
                image={image}
                position={controls.position}
                scale={controls.scale}
                rotation={controls.rotation}
                size={selectedSize}
              />

              <div className="mt-12 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  Studio-Grade Preview • What You See Is What You Get
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default CustomDesignPage;
