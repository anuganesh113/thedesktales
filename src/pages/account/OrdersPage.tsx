import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Search,
    ChevronRight,
    ExternalLink,
    Download,
    Filter,
    CheckCircle2,
    Truck,
    Box,
    RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import deskmatsImg from '@/assets/deskmats.png';

const OrdersPage: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const orders = [
        {
            id: 'ORD-7721',
            date: 'Oct 12, 2023',
            status: 'In Transit',
            total: 'Rs. 4,200',
            items: [
                { name: 'Neon Samurai Deskmat', price: 'Rs. 3,299', image: deskmatsImg, status: 'Shipped' },
                { name: 'Cable Management Clip', price: 'Rs. 901', image: deskmatsImg, status: 'Shipped' }
            ],
            shipping: 'BlueDart • Track: 4421009871'
        },
        {
            id: 'ORD-6540',
            date: 'Sep 24, 2023',
            status: 'Delivered',
            total: 'Rs. 2,800',
            items: [
                { name: 'Minimalist Topo Mousepad', price: 'Rs. 2,800', image: deskmatsImg, status: 'Delivered' }
            ],
            shipping: 'FedEx • Delivered on Sep 28'
        },
        {
            id: 'ORD-5219',
            date: 'Aug 15, 2023',
            status: 'Delivered',
            total: 'Rs. 6,550',
            items: [
                { name: 'Custom Design Portrait', price: 'Rs. 5,500', image: deskmatsImg, status: 'Delivered' },
                { name: 'Wrist Rest', price: 'Rs. 1,050', image: deskmatsImg, status: 'Delivered' }
            ],
            shipping: 'BlueDart • Delivered on Aug 19'
        },
    ];

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(o => o.status.toLowerCase().replace(' ', '-') === filter);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50/50 pb-24">
                {/* Header Section */}
                <div className="bg-[#111827] pt-28 pb-16 relative overflow-hidden">
                    <div className="container px-6 relative z-10">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="space-y-4">
                                    <Link to="/account" className="inline-flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                                        <ChevronRight size={14} className="rotate-180" /> Back to Dashboard
                                    </Link>
                                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                                        Order <span className="text-brand-orange">History.</span>
                                    </h1>
                                </div>
                                <div className="relative w-full md:w-80">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <Input
                                        placeholder="Search by ID or Item..."
                                        className="rounded-2xl py-6 pl-12 bg-white/5 border-white/10 text-white focus:bg-white/10 focus:ring-[8px] focus:ring-white/5 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
                                <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-auto flex flex-wrap gap-1">
                                    <TabsTrigger value="all" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#111827] text-gray-400 text-[10px] font-black uppercase tracking-widest">All Orders</TabsTrigger>
                                    <TabsTrigger value="in-transit" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#111827] text-gray-400 text-[10px] font-black uppercase tracking-widest">In Transit</TabsTrigger>
                                    <TabsTrigger value="delivered" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#111827] text-gray-400 text-[10px] font-black uppercase tracking-widest">Delivered</TabsTrigger>
                                    <TabsTrigger value="cancelled" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-[#111827] text-gray-400 text-[10px] font-black uppercase tracking-widest">Cancelled</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                </div>

                <div className="container px-6 mt-8 relative z-20">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <AnimatePresence mode="popLayout">
                            {filteredOrders.map((order, idx) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {/* Order Toolbar */}
                                    <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex gap-10">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Order Placed</p>
                                                <p className="text-sm font-bold text-[#111827]">{order.date}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Total Price</p>
                                                <p className="text-sm font-bold text-brand-orange">{order.total}</p>
                                            </div>
                                            <div className="space-y-1 hidden sm:block">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Dispatch ID</p>
                                                <p className="text-sm font-bold text-[#111827]">{order.id}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="outline" size="sm" className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10 border-gray-200">
                                                Invoice <Download size={12} className="ml-2" />
                                            </Button>
                                            <Button size="sm" className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10 bg-[#111827] hover:bg-brand-orange text-white">
                                                Track Order
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-8 lg:p-10 space-y-10">
                                        {/* Status Progress */}
                                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                                                    order.status === 'Delivered' ? "bg-green-500 shadow-green-200" : "bg-brand-orange shadow-orange-200"
                                                )}>
                                                    {order.status === 'Delivered' ? <CheckCircle2 size={24} /> : <Truck size={24} />}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <h3 className="text-lg font-black text-[#111827]">{order.status}</h3>
                                                    <p className="text-sm font-medium text-gray-500">{order.shipping}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button size="sm" variant="ghost" className="rounded-xl font-black text-[9px] uppercase tracking-widest px-5 h-10 gap-2">
                                                    <RotateCcw size={14} /> Buy Again
                                                </Button>
                                                <Button size="sm" variant="ghost" className="rounded-xl font-black text-[9px] uppercase tracking-widest px-5 h-10 gap-2">
                                                    Get Support <ChevronRight size={14} />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Item Grid */}
                                        <div className="grid gap-6">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex gap-6 group">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center min-w-0">
                                                        <h4 className="font-bold text-[#111827] text-sm md:text-base truncate group-hover:text-brand-orange transition-colors">{item.name}</h4>
                                                        <p className="text-brand-orange font-bold text-sm mt-1">{item.price}</p>
                                                    </div>
                                                    <div className="hidden sm:flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                                        Qty: 01
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {filteredOrders.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-gray-200"
                                >
                                    <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-300">
                                        <Package size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-[#111827] mb-2">No orders found.</h3>
                                    <p className="text-gray-500 font-medium mb-8">You haven't placed any orders with this filter yet.</p>
                                    <Link to="/products">
                                        <Button className="rounded-2xl px-10 py-7 bg-brand-orange hover:bg-[#111827] text-white font-black text-xs uppercase tracking-widest">
                                            Start Shopping
                                        </Button>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrdersPage;
