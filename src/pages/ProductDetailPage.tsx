import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, Minus, Plus, Heart, Share2, ChevronLeft, ChevronRight, Check, Palette, Maximize2, X, ChevronDown, Clock, Ruler, FileText, Flag, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductById, products } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import AuthModal from '@/components/auth/AuthModal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useWishlist } from '@/context/WishlistContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId || '');
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('reviews');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');

  const [selectedEdge, setSelectedEdge] = useState<'Plain' | 'Stitched Edge'>('Plain');
  const [selectedFrameColor, setSelectedFrameColor] = useState<{ name: string; value: string }>(product?.frameColors?.[0] || { name: 'Black', value: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('copyright');

  const reviewsPerPage = 2;
  const totalReviewPages = Math.ceil(product ? product.reviews.length / reviewsPerPage : 0);

  const visibleReviews = product ? product.reviews.slice(
    currentReviewPage * reviewsPerPage,
    (currentReviewPage + 1) * reviewsPerPage
  ) : [];

  const handleNextReviewPage = () => {
    if (currentReviewPage < totalReviewPages - 1) {
      setCurrentReviewPage(prev => prev + 1);
    }
  };

  const handlePrevReviewPage = () => {
    if (currentReviewPage > 0) {
      setCurrentReviewPage(prev => prev - 1);
    }
  };

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
    const added = addToCart(
      product,
      selectedSize,
      product?.colors[0] || { name: 'Default', value: '' },
      (product.category === 'desk-mat' || product.category === 'mousepad') ? selectedEdge : undefined,
      quantity,
      product.category === 'poster' ? selectedFrameColor : undefined
    );

    if (added) {
      toast.success(`Added ${product.name} to cart`);
    } else {
      toast.info(`${product.name} is already in your cart`);
    }
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      selectedSize,
      product?.colors[0] || { name: 'Default', value: '' },
      (product.category === 'desk-mat' || product.category === 'mousepad') ? selectedEdge : undefined,
      quantity,
      product.category === 'poster' ? selectedFrameColor : undefined
    );
    navigate('/checkout');
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
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 hover:scale-105"
                onClick={() => setIsImageZoomed(true)}
              />

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setIsImageZoomed(true)}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-sm"
                aria-label="Zoom image"
              >
                <Maximize2 size={18} className="text-foreground" />
              </button>

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
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors uppercase",
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
            )}



            {/* Edge Selection - Only for deskmats and mousepads */}
            {(product.category === 'desk-mat' || product.category === 'mousepad') && (
              <div>
                <h3 className="font-semibold mb-3">Edge</h3>
                <div className="flex flex-wrap gap-3">
                  {['Plain', 'Stitched Edge'].map((edge) => (
                    <button
                      key={edge}
                      onClick={() => setSelectedEdge(edge as any)}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors",
                        selectedEdge === edge
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      )}
                    >
                      {edge}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Frame Color Selection - Only for posters */}
            {product.category === 'poster' && product.frameColors && product.frameColors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Frame Color</h3>
                <div className="flex flex-wrap gap-4">
                  {product.frameColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedFrameColor(color)}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center p-0.5 shadow-sm",
                          selectedFrameColor.name === color.name
                            ? "border-primary scale-110 shadow-md"
                            : "border-border hover:border-primary"
                        )}
                        style={{ backgroundColor: color.value === '#FFFFFF' ? '#F9FAFB' : color.value }}
                      >
                        <div
                          className="w-full h-full rounded-full border border-black/5"
                          style={{ backgroundColor: color.value }}
                        />
                        {selectedFrameColor.name === color.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check size={20} className={cn(
                              "text-white drop-shadow-md",
                              color.name === 'White' && "text-black drop-shadow-none"
                            )} />
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest transition-all",
                        selectedFrameColor.name === color.name ? "text-primary opacity-100" : "text-muted-foreground opacity-60"
                      )}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buy It Now & Add to Cart */}
            <div className="space-y-4">
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

                <Button variant="outline" size="lg" className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary h-12" onClick={handleAddToCart}>
                  Add to Cart
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

              <Button variant="hero" size="xl" className="w-full text-lg font-bold shadow-xl shadow-primary/20" onClick={handleBuyNow}>
                Buy It Now — Rs. {(product.price * quantity).toLocaleString()}
              </Button>
            </div>

            {/* Product Details Accordions */}
            <div className="pt-6 border-t border-gray-100 space-y-2">
              {[
                {
                  id: 'desc',
                  title: 'Description',
                  icon: FileText,
                  content: (
                    <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
                      <p>{product.description}</p>
                      <p>Meticulously engineered for the modern desk environment. We combine artisan aesthetics with industrial-grade durability.</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>High-definition printing</li>
                        <li>Non-slip rubber base</li>
                        <li>Water-resistant surface</li>
                        <li>Premium {product.material}</li>
                      </ul>
                    </div>
                  )
                },
                {
                  id: 'size',
                  title: 'Size Guide',
                  icon: Ruler,
                  content: (
                    <div className="space-y-4 text-sm text-gray-500">
                      <p>Available sizes for this product:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {product.sizes.map(size => (
                          <div key={size} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="font-bold text-gray-700">{size.split(' ')[0]}</span>
                            <span>{size.includes('(') ? size.split('(')[1].replace(')', '') : size}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] uppercase tracking-wider italic text-gray-400">All dimensions are approximate.</p>
                    </div>
                  )
                },
                {
                  id: 'delivery',
                  title: 'Expected Delivery Time',
                  icon: Clock,
                  content: (
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-start gap-3 p-3 bg-[#F97316]/5 rounded-xl border border-[#F97316]/10">
                        <Truck size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-800">Inside Kathmandu Valley</p>
                          <p>2 - 3 Business Days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Clock size={18} className="text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-800">Outside Kathmandu Valley</p>
                          <p>4 - 7 Business Days</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              ].map((item) => (
                <div key={item.id} className="border-b border-gray-50 last:border-0 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full py-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        openAccordion === item.id ? "bg-[#F97316]/10 text-[#F97316]" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
                      )}>
                        <item.icon size={16} />
                      </div>
                      <span className={cn(
                        "font-bold text-sm tracking-wide transition-colors",
                        openAccordion === item.id ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                      )}>
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={cn(
                        "text-gray-300 transition-transform duration-300",
                        openAccordion === item.id && "rotate-180 text-[#F97316]"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="pb-6 pt-2">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Premium Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/10 group hover:bg-[#F97316]/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#F97316] shrink-0 border border-[#F97316]/5">
                  <Truck size={22} className="group-hover:translate-x-1 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#F97316]/60">Fast Delivery</span>
                  <span className="text-sm font-bold text-[#111827]">Free over Rs. 1,500</span>
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
                <Link to={`/custom-design?type=${product.id}`}>Customize</Link>
              </Button>
            </div>

            {/* Report Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
              >
                <Flag size={14} />
                Report this design
              </button>
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
              {activeTab === 'reviews' && (
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
                    {visibleReviews.map((review) => (
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

                  {/* Pagination Controls */}
                  {totalReviewPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-4">
                      <button
                        onClick={handlePrevReviewPage}
                        disabled={currentReviewPage === 0}
                        className="p-3 rounded-full bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F97316] hover:text-white transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <span className="text-sm font-bold text-gray-500">
                        Page {currentReviewPage + 1} of {totalReviewPages}
                      </span>
                      <button
                        onClick={handleNextReviewPage}
                        disabled={currentReviewPage === totalReviewPages - 1}
                        className="p-3 rounded-full bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F97316] hover:text-white transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
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
      {/* Image Zoom Lightbox */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 mb-0"
            onClick={() => setIsImageZoomed(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageZoomed(false);
              }}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation Arrows in Zoom Mode */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(i => i === 0 ? product.images.length - 1 : i - 1);
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-[110]"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(i => i === product.images.length - 1 ? 0 : i + 1);
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-[110]"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Zoomed Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              {/* Image Counter */}
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/80 text-sm font-bold tracking-widest uppercase">
                {selectedImage + 1} / {product.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Report this Design
            </DialogTitle>
            <DialogDescription>
              Help us keep The Desk Tales safe. Reports are anonymous.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup defaultValue="copyright" onValueChange={setReportReason} className="gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="copyright" id="r1" />
                <Label htmlFor="r1">Copyright Infringement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inappropriate" id="r2" />
                <Label htmlFor="r2">Inappropriate Content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quality" id="r3" />
                <Label htmlFor="r3">Low Quality / Misleading</Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea id="details" placeholder="Please provide more context..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)} className="hover:text-gray-900 hover:bg-gray-100">Cancel</Button>
            <Button variant="destructive" onClick={() => {
              // Mock submit
              setIsReportModalOpen(false);
            }}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ProductDetailPage;
