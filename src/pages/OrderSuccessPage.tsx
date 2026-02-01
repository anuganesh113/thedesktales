import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    CheckCircle,
    Package,
    Truck,
    ShoppingBag,
    ArrowRight,
    Sparkles,
    PartyPopper,
    CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const OrderSuccessPage: React.FC = () => {
    // Generate a mock order ID
    const orderId = `DT-${Math.floor(Math.random() * 90000) + 10000}`;

    // Update document title for context
    useEffect(() => {
        document.title = "Order Successful | DeskCraft Studio";
    }, []);

    return (
        <Layout>
            <div className="min-h-[85vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6 mb-[-1px]">
                <div className="max-w-xl w-full">
                    {/* Animated Celebration Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-700 relative">

                        {/* Background Accents */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full -ml-16 -mb-16 blur-2xl animate-pulse delay-700" />

                        {/* Content Container */}
                        <div className="p-10 md:p-14 text-center relative z-10">

                            {/* Animated Success Icon */}
                            <div className="relative mx-auto w-24 h-24 mb-10">
                                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
                                <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                                    <CheckCircle size={48} className="text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 text-brand-orange animate-bounce">
                                    <Sparkles size={24} />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-display font-black text-[#111827] mb-4 tracking-tighter">
                                ORDER SUCCESS!
                            </h1>
                            <p className="text-gray-500 font-medium mb-10 leading-relaxed text-lg">
                                Thank you for your creation. We've received your order and started preparing your desk upgrade.
                            </p>

                            {/* Order Info Bar */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</span>
                                    <span className="text-xl font-bold text-[#111827]">{orderId}</span>
                                </div>
                                <div className="w-px h-10 bg-gray-200 hidden md:block" />
                                <div className="flex flex-col items-center md:items-end">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Delivery</span>
                                    <span className="text-xl font-bold text-green-600 flex items-center gap-2">
                                        <CalendarDays size={18} />
                                        2-4 Days
                                    </span>
                                </div>
                            </div>

                            {/* Steps Progress */}
                            <div className="grid grid-cols-3 gap-2 mb-12">
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-green-500 rounded-full" />
                                    <span className="text-[9px] font-bold text-[#111827] uppercase tracking-tighter">Confirmed</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-0 bg-brand-orange rounded-full animate-progress-glow" />
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Processing</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Delivered</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="flex-1 rounded-2xl h-14 bg-[#111827] hover:bg-black text-white font-bold gap-2" asChild>
                                    <Link to="/products">
                                        Continue Shopping <ArrowRight size={18} />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="flex-1 rounded-2xl h-14 border-gray-200 hover:bg-gray-50 font-bold gap-2" asChild>
                                    <Link to="/">
                                        Back to Home <ShoppingBag size={18} />
                                    </Link>
                                </Button>
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                                <PartyPopper size={14} className="text-brand-orange" />
                                A confirmation email has been sent to your inbox.
                            </div>
                        </div>

                        {/* Footer Contact */}
                        <div className="bg-gray-900 border-t border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-3">
                                <Truck size={14} className="text-brand-orange" />
                                Free Shipping Applied
                            </div>
                            <div className="flex items-center gap-3">
                                <Package size={14} className="text-brand-orange" />
                                Premium Packaging
                            </div>
                            <div className="hover:text-white transition-colors cursor-pointer">
                                Need Help? Contact Support
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderSuccessPage;
