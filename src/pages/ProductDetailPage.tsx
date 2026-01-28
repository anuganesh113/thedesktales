import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, Minus, Plus, Heart, Share2, ChevronLeft, ChevronRight, Check, Palette } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductById, products } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '@/components/auth/AuthModal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useWishlist } from '@/context/WishlistContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const product = getProductById(productId || '');
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist();
  const isWishlisted = product ? checkWishlisted(product.id) : false;

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, product?.colors[0] || { name: 'Default', value: '' }, quantity);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <span>/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="container py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.bestseller && (
                  <Badge className="bg-accent text-accent-foreground">
                    <Star size={12} className="mr-1" /> Bestseller
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => i === 0 ? product.images.length - 1 : i - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => i === product.images.length - 1 ? 0 : i + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors",
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">


            {/* Title & Rating */}
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn(
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>



            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-muted transition-colors rounded-l-lg"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 hover:bg-muted transition-colors rounded-r-lg"
                >
                  <Plus size={18} />
                </button>
              </div>

              <Button variant="hero" size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isWishlisted ? "default" : "outline"}
                      size="icon"
                      className={cn(
                        "shrink-0 transition-all duration-300 rounded-xl h-12 w-12",
                        isWishlisted
                          ? "bg-[#F97316] hover:bg-[#F97316]/90 text-white border-0 shadow-[0_8px_20px_-4px_rgba(249,115,22,0.4)]"
                          : "hover:text-[#F97316] hover:border-[#F97316]/30"
                      )}
                      onClick={() => product && toggleWishlist(product.id)}
                    >
                      <Heart
                        size={22}
                        className={cn("transition-colors duration-300", isWishlisted ? "fill-white" : "fill-none")}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#111827] text-white border-0 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl translate-y-[-8px]">
                    {isWishlisted ? "Saved to wishlist" : "Add to wishlist"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Premium Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/10 group hover:bg-[#F97316]/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#F97316] shrink-0 border border-[#F97316]/5">
                  <Truck size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#F97316]/60">Fast Delivery</span>
                  <span className="text-sm font-bold text-[#111827]">Free over Rs. 75</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/10 group hover:bg-[#F97316]/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#F97316] shrink-0 border border-[#F97316]/5">
                  <Shield size={22} className="group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#F97316]/60">Secure Shopping</span>
                  <span className="text-sm font-bold text-[#111827]">30-day returns</span>
                </div>
              </div>
            </div>

            {/* Customize CTA */}
            <div className="bg-accent/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Want a custom design?</p>
                <p className="text-sm text-muted-foreground">Create your own unique version</p>
              </div>
              <Button variant="accent" asChild>
                <Link to="/custom-design">Customize</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section - Description & Reviews */}
      <section className="container py-12 border-t border-gray-100">
        <div className="flex flex-col gap-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('description')}
              className={cn(
                "px-8 py-5 font-black text-[10px] uppercase tracking-[0.3em] transition-all relative",
                activeTab === 'description' ? "text-[#111827]" : "text-gray-400 hover:text-[#111827]"
              )}
            >
              Description.
              {activeTab === 'description' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F97316]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={cn(
                "px-8 py-5 font-black text-[10px] uppercase tracking-[0.3em] transition-all relative",
                activeTab === 'reviews' ? "text-[#111827]" : "text-gray-400 hover:text-[#111827]"
              )}
            >
              Reviews ({product.reviewCount})
              {activeTab === 'reviews' && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F97316]" />
              )}
            </button>
          </div>

          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'description' ? (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-[#111827]">Built for Perfection.</h3>
                    <p className="text-gray-500 leading-relaxed text-lg">
                      {product.description} Every {product.name} is meticulously engineered for the modern desk environment. We combine artisan aesthetics with industrial-grade durability.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2rem] bg-gray-50/50 border border-gray-100 space-y-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#F97316] shadow-sm">
                        <Palette size={18} />
                      </div>
                      <h4 className="font-black text-sm uppercase tracking-widest text-[#111827]">Vibrant Finishes</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">High-definition printing techniques ensure that every color pop and deep dark is rendered with absolute precision.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-gray-50/50 border border-gray-100 space-y-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#F97316] shadow-sm">
                        <Truck size={18} />
                      </div>
                      <h4 className="font-black text-sm uppercase tracking-widest text-[#111827]">Swift Stash</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">Packaged in sustainable, reinforced tubes to ensure your new workspace upgrade arrives in pristine condition.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  {/* Reviews Summary Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-gray-100">
                    <div className="flex items-center gap-6">
                      <div className="text-6xl font-black text-[#111827]">{product.rating}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={cn(
                                i < Math.floor(product.rating) ? "fill-[#FBBF24] text-[#FBBF24]" : "fill-gray-100 text-gray-100"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Based on {product.reviewCount} reviews</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="rounded-2xl px-10 py-7 bg-[#111827] text-white hover:bg-[#F97316] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-gray-200"
                    >
                      Write a review.
                    </Button>
                  </div>

                  {/* Reviews List */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {product.reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 space-y-6"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img src={review.userAvatar} alt="" className="w-12 h-12 rounded-full border border-gray-100 shadow-sm" />
                            <div>
                              <h4 className="font-black text-sm text-[#111827]">{review.userName}</h4>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={cn(
                                  i < review.rating ? "fill-[#FBBF24] text-[#FBBF24]" : "fill-gray-100 text-gray-100"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-500 leading-relaxed font-medium italic overflow-hidden line-clamp-3">
                          "{review.comment}"
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <Check size={14} className="text-[#22C55E]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#22C55E]">Verified Soul</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-muted py-12 lg:py-16">
          <div className="container">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="minimal" />
              ))}
            </div>
          </div>
        </section>
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </Layout>
  );
};

export default ProductDetailPage;
