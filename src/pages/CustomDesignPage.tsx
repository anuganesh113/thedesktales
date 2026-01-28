import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart, Save, ChevronLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import RealisticPreview from '@/components/custom/RealisticPreview';
import DesignerControls from '@/components/custom/DesignerControls';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/mockData';
import { toast } from 'sonner';

const SIZES = [
  { id: 's', name: 'Standard', width: 80, height: 30, price: 2499 },
  { id: 'm', name: 'Large', width: 90, height: 40, price: 3299 },
  { id: 'l', name: 'Extended', width: 120, height: 60, price: 4499 },
];

const CustomDesignPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [image, setImage] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number } | null>(null);

  const [controls, setControls] = useState({
    position: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
  });

  const onImageUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);

    // Get image dimensions for quality calculation
    const img = new Image();
    img.onload = () => {
      setImageMeta({ width: img.width, height: img.height });
    };
    img.src = url;
  }, []);

  const quality = useMemo(() => {
    if (!imageMeta) return null;

    // Simple PPI calculation: (pixels / size_in_cm * 2.54)
    // We want at least 150 PPI for "good"
    const ppiW = (imageMeta.width / selectedSize.width) * 2.54;
    const ppiH = (imageMeta.height / selectedSize.height) * 2.54;
    const minPPI = Math.min(ppiW, ppiH) * controls.scale;

    if (minPPI > 150) return 'good';
    if (minPPI > 72) return 'fair';
    return 'poor';
  }, [imageMeta, selectedSize, controls.scale]);

  const handleReset = () => {
    setImage(null);
    setImageMeta(null);
    setControls({ position: { x: 0, y: 0 }, scale: 1, rotation: 0 });
  };

  const handleAddToCart = () => {
    if (!image) {
      toast.error("Please upload an artwork first");
      return;
    }

    const customProduct: Product = {
      id: `custom-${Date.now()}`,
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

    addToCart(customProduct, selectedSize.name, { name: 'Custom', value: '#000000' }, 1);

    toast.success("Added your custom creation to cart!");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Sub-Header / Navigation */}
        <div className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-16 z-40">
          <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/products" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#111827] transition-colors">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-[10px] uppercase font-black tracking-widest text-gray-400">
                <Save size={14} /> Save Design
              </Button>
              <div className="h-4 w-px bg-gray-100 hidden md:block" />
              <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Price</span>
                <span className="text-sm font-black text-[#111827]">Rs. {selectedSize.price.toLocaleString()}</span>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!image}
                className="rounded-full bg-[#111827] text-white hover:bg-[#F97316] font-black text-[10px] uppercase tracking-widest px-8 transition-all h-10"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-w-[1440px] mx-auto">
          {/* Left: Controls */}
          <aside className="w-full lg:w-[450px] lg:h-[calc(100vh-8rem)] overflow-y-auto border-r border-gray-50 custom-scrollbar">
            <DesignerControls
              onImageUpload={onImageUpload}
              onPositionChange={(pos) => setControls(prev => ({ ...prev, position: pos }))}
              onScaleChange={(s) => setControls(prev => ({ ...prev, scale: s }))}
              onRotationChange={(r) => setControls(prev => ({ ...prev, rotation: r }))}
              onReset={handleReset}
              controls={{ ...controls, image, quality }}
              selectedSize={selectedSize}
              sizes={SIZES}
              onSizeChange={(id) => setSelectedSize(SIZES.find(s => s.id === id) || SIZES[1])}
            />

            {/* Help/Tips Section */}
            <div className="px-8 pb-12">
              <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 flex gap-4">
                <div className="text-blue-500 mt-1">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-900 mb-1 tracking-tight">Pro Designer Tip</h4>
                  <p className="text-[10px] leading-relaxed text-blue-800/70">
                    For the best results, use high-resolution images (at least 3000px wide).
                    Avoid placing critical elements near the edges as they might be partially
                    covered by the stitched borders.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Realistic Preview */}
          <main className="flex-1 bg-[#F9FAFB] p-6 md:p-12 lg:h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-5xl">
              <RealisticPreview
                image={image}
                position={controls.position}
                scale={controls.scale}
                rotation={controls.rotation}
                size={selectedSize}
              />

              <div className="mt-12 text-center">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
                  High-Fidelity Studio Preview
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
