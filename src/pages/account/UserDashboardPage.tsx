import React from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    MapPin,
    Settings,
    Heart,
    Clock,
    ArrowRight,
    ChevronRight,
    User,
    ShoppingBag,
    Bell,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const UserDashboardPage: React.FC = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Active Orders', value: '2', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Wishlist Items', value: '12', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
        { label: 'Saved Designs', value: '4', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Review Points', value: '850', icon: Clock, color: 'text-green-500', bg: 'bg-green-50' },
    ];

    const recentOrders = [
        { id: 'ORD-7721', date: 'Oct 12, 2023', status: 'In Transit', total: 'Rs. 4,200', items: 2 },
        { id: 'ORD-6540', date: 'Sep 24, 2023', status: 'Delivered', total: 'Rs. 2,800', items: 1 },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50/50 pb-20">
                {/* Header Section */}
                <div className="bg-[#111827] pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[120px] rounded-full" />
                    </div>
                    <div className="container px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-orange to-brand-yellow rounded-[2.5rem] blur opacity-30" />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                                    <img
                                        src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                        alt={user?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-brand-orange text-white p-2.5 rounded-2xl shadow-lg">
                                    <Settings size={18} />
                                </div>
                            </div>
                            <div className="text-center md:text-left space-y-4">
                                <div className="space-y-1">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]"
                                    >
                                        Member Since Oct 2023
                                    </motion.p>
                                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                        Hello, {user?.name.split(' ')[0]}.
                                    </h1>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <Link to="/account/settings">
                                        <Button variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest px-6 py-6">
                                            Edit Profile
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 h-14 w-14">
                                        <Bell size={20} />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="container px-6 -mt-10 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Stats Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-default"
                                    >
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                                            <stat.icon size={20} />
                                        </div>
                                        <p className="text-2xl font-black text-[#111827]">{stat.value}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Navigation Card */}
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-2 space-y-1">
                                    {[
                                        { label: 'My Orders', icon: Package, href: '/account/orders' },
                                        { label: 'Wishlist', icon: Heart, href: '/products?wishlist=true' },
                                        { label: 'Shipping Addresses', icon: MapPin, href: '/account/settings' },
                                        { label: 'Account Settings', icon: Settings, href: '/account/settings' },
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.href}
                                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#111827] group-hover:bg-[#111827] group-hover:text-white transition-colors">
                                                    <item.icon size={18} />
                                                </div>
                                                <span className="font-bold text-sm text-gray-700">{item.label}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#111827] transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Recent Orders Card */}
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 lg:p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-black text-[#111827] tracking-tight">Recent Orders</h2>
                                        <p className="text-sm text-gray-500 font-medium">Keep track of your latest purchases</p>
                                    </div>
                                    <Link to="/account/orders">
                                        <Button variant="ghost" className="text-brand-orange hover:text-brand-orange/80 font-black text-[10px] uppercase tracking-widest gap-2">
                                            View All <ArrowRight size={14} />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="p-6 rounded-3xl border border-gray-50 bg-gray-50/30 flex items-center justify-between group hover:border-gray-200 hover:bg-white transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[#111827] shadow-sm">
                                                    <Package size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-[#111827]">#{order.id}</p>
                                                    <p className="text-sm font-medium text-gray-500">{order.date} • {order.items} items</p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <p className="font-black text-[#111827]">{order.total}</p>
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                    order.status === 'Delivered' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                                )}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Loyalty / Promotion Card */}
                            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-orange to-brand-yellow p-10 overflow-hidden shadow-2xl shadow-brand-orange/20 group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-[9px] uppercase tracking-widest">
                                            <Sparkles size={12} /> Special Member Offer
                                        </div>
                                        <h3 className="text-3xl font-black text-white leading-tight max-w-sm">
                                            Enjoy 20% Off your next custom design.
                                        </h3>
                                        <p className="text-white/80 text-sm font-medium max-w-sm leading-relaxed">
                                            As a thank you for being a part of The Desk Tales collective, use code <span className="font-bold text-white uppercase tracking-wider">MEMBER20</span> at checkout.
                                        </p>
                                    </div>
                                    <Link to="/custom-design">
                                        <Button className="rounded-2xl px-10 py-8 bg-white text-brand-orange hover:bg-[#111827] hover:text-white transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl">
                                            Start Designing
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboardPage;
