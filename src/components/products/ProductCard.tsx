import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Eye, Plus, Heart, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'minimal';
}

import { useWishlist } from '@/context/WishlistContext';

const ProductCard: React.FC<ProductCardProps> = ({ product, className, style, variant = 'default' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist: globalToggleWishlist } = useWishlist();
  const isWishlisted = checkWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.category === 'custom') {
      navigate('/custom-design');
    } else {
      const added = addToCart(product, product.sizes[0], product.colors[0]);
      if (added) {
        toast.success(`Added ${product.name} to cart`);
      } else {
        toast.info(`${product.name} is already in your cart`);
      }
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    globalToggleWishlist(product.id);
  };

  return (
    <div
      className={cn("group relative bg-white rounded-[2rem] p-4 border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 ease-out", className)}
      style={style}
    >
      {/* Ghost Link - Makes the entire card clickable */}
      <Link
        to={product.category === 'custom' ? '/custom-design' : `/products/${product.id}`}
        className="absolute inset-0 z-10 rounded-3xl"
        aria-label={`View details for ${product.name}`}
      />

      {/* Visual Content Layer */}
      <div className="relative z-0 group/card">
        {/* Image Container with Zoom Effect */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/card:scale-105"
          />

          {/* Luxury Glassmorphism Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
            {product.newArrival && (
              <Badge className="bg-white text-[#111827] border border-gray-100 font-black px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-[0.2em] shadow-sm">
                NEW
              </Badge>
            )}
            {product.limited && (
              <Badge className="bg-[#111827] text-white border-0 font-black px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-[0.2em] shadow-sm">
                LIMITED
              </Badge>
            )}
          </div>
        </div>

        {/* Enhanced Info Area - Editorial Style */}
        <div className="mt-5 px-1 pb-2">
          {variant === 'minimal' ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em] leading-none">
                  {product.category.replace('-', ' ')}
                </p>
                <div className="h-[1px] flex-grow mx-3 bg-gray-100/50" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] line-clamp-1 leading-tight tracking-tight">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-xl font-black text-[#F97316]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] text-gray-300 line-through font-bold">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em]">
                  {product.category.replace('-', ' ')}
                </p>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                  <Star fill="currentColor" stroke="none" className="h-2.5 w-2.5 text-[#FBBF24]" />
                  <span className="text-[10px] font-bold text-[#b45309]">{product.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-gray-900 group-hover:text-[#F97316] transition-colors leading-tight">
                {product.name}
              </h3>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-[#F97316] tracking-tight">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-bold">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.category === 'custom' && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316] text-white shadow-lg shadow-orange-500/20">
                    <Wand2 size={10} className="animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-wider">Bespoke</span>
                  </div>
                )}
              </div>
            </div>
          )
          }
        </div >
      </div >

      {/* Interactive Elements - Absolute Positioned with Higher Z-Index */}
      {/* Wishlist Button */}
      <div className="absolute top-6 right-6 z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleWishlist}
                className={cn(
                  "h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0",
                  isWishlisted
                    ? "bg-[#F97316] text-white shadow-[0_8px_20px_-4px_rgba(249,115,22,0.4)] opacity-100 translate-y-0"
                    : "bg-white/70 backdrop-blur-md text-[#111827] border border-white/50 hover:bg-white hover:scale-110 shadow-sm"
                )}
              >
                <motion.div
                  animate={isWishlisted ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={18}
                    className={cn("transition-colors duration-300", isWishlisted ? "fill-white" : "fill-none")}
                  />
                </motion.div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#111827] text-white border-0 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl translate-x-[8px]">
              {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-r-4 border-r-[#111827] border-y-4 border-y-transparent" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-[40%] right-6 flex flex-col gap-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-20 delay-100">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={`/products/${product.id}`} className="block">
                <Button
                  size="icon"
                  className="h-11 w-11 rounded-2xl bg-white text-[#111827] hover:bg-[#111827] hover:text-white shadow-xl transition-all border border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye size={18} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#111827] text-white border-0 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl translate-x-[8px]">
              View Product
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-r-4 border-r-[#111827] border-y-4 border-y-transparent" />
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className={cn(
                  "h-11 w-11 rounded-2xl shadow-xl transition-all border-0",
                  product.category === 'custom'
                    ? "bg-[#F97316] text-white hover:bg-[#111827]"
                    : "bg-[#111827] text-white hover:bg-[#F97316]"
                )}
                onClick={handleQuickAdd}
              >
                {product.category === 'custom' ? <Wand2 size={18} /> : <Plus size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#111827] text-white border-0 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl translate-x-[8px]">
              {product.category === 'custom' ? "Start Styling" : "Add to Cart"}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-r-4 border-r-[#111827] border-y-4 border-y-transparent" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div >
  );
};

export default ProductCard;
