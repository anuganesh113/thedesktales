import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft,
    CreditCard,
    Truck,
    ShieldCheck,
    ShoppingBag,
    CheckCircle2,
    AlertCircle,
    Phone,
    MapPin,
    User,
    Smartphone,
    Info
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type PaymentMethod = 'esewa' | 'khalti' | 'fonepay' | 'cod';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Kathmandu',
        municipality: '',
        ward: '',
    });

    const [showAlerts, setShowAlerts] = useState({
        security: true,
        fastTrack: true,
    });

    if (items.length === 0 && !isProcessing) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                    <ShoppingBag size={64} className="text-muted-foreground/20 mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">You need to add some products before checking out.</p>
                    <Button asChild>
                        <Link to="/products">Explore Products</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    const shippingCost = totalPrice >= 1500 ? 0 : 150;
    const grandTotal = totalPrice + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.fullName || !formData.phone || !formData.address) {
            toast.error("Please fill in all required shipping details.");
            return;
        }

        setIsProcessing(true);

        // Simulate payment gateway redirection/processing
        setTimeout(() => {
            // In a real app, you'd send order data to backend here
            setIsProcessing(false);
            clearCart();
            navigate('/order-success');
        }, 2000);
    };

    const paymentGateways = [
        {
            id: 'esewa',
            name: 'eSewa',
            color: 'bg-[#60bb46]',
            textColor: 'text-white',
            icon: '/src/assets/esewa.png',
        },
        {
            id: 'khalti',
            name: 'Khalti',
            color: 'bg-[#5c2d91]',
            textColor: 'text-white',
            icon: '/src/assets/khalti.png',
        },
        {
            id: 'fonepay',
            name: 'Fonepay',
            color: 'bg-[#e31e24]',
            textColor: 'text-white',
            icon: '/src/assets/fonepay.png',
        },
        {
            id: 'cod',
            name: 'Cash on Delivery',
            color: 'bg-gray-100',
            textColor: 'text-gray-900',
            icon: null,
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-[#F9FAFB] pb-20">
                {/* Simple Header */}
                <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link to="/products" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back
                        </Link>
                        <h1 className="font-display font-black text-xl uppercase tracking-tighter">Secure Checkout</h1>
                        <div className="w-20 hidden md:block" /> {/* Spacer */}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12">
                    <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-12">

                        {/* Left: Shipping & Payment */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Shipping Details */}
                            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Shipping Details</h2>
                                        <p className="text-sm text-muted-foreground">Where should we send your order?</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="flex items-center gap-2">
                                            <User size={14} className="text-gray-400" /> Full Name
                                        </Label>
                                        <Input
                                            id="fullName"
                                            placeholder="Enter your full name"
                                            className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-brand-orange/20"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="flex items-center gap-2">
                                            <Smartphone size={14} className="text-gray-400" /> Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="98XXXXXXXX"
                                            className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-brand-orange/20"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address" className="flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-400" /> Exact Shipping Address
                                        </Label>
                                        <Input
                                            id="address"
                                            placeholder="House No, Street name, Landmark"
                                            className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-brand-orange/20"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            placeholder="Kathmandu"
                                            className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-brand-orange/20"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="municipality">Municipality</Label>
                                            <Input
                                                id="municipality"
                                                placeholder="Budhanilkantha"
                                                className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-brand-orange/20"
                                                value={formData.municipality}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ward">Ward No.</Label>
                                            <Input
                                                id="ward"
                                                placeholder="3"
                                                className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-brand-orange/20"
                                                value={formData.ward}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Payment Method</h2>
                                        <p className="text-sm text-muted-foreground">Select your preferred payment gateway</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {paymentGateways.map((gate) => (
                                        <button
                                            key={gate.id}
                                            type="button"
                                            onClick={() => setPaymentMethod(gate.id as PaymentMethod)}
                                            className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all h-24 ${paymentMethod === gate.id
                                                ? 'border-brand-orange ring-4 ring-brand-orange/5 bg-gray-50'
                                                : 'border-gray-100 hover:border-gray-200 bg-white'
                                                }`}
                                        >
                                            {gate.id === 'cod' ? (
                                                <div className="flex flex-col items-center justify-center transition-all scale-125">
                                                    <Truck className="mx-auto mb-1 text-gray-400" size={28} />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight leading-none block text-gray-500">COD</span>
                                                </div>
                                            ) : (
                                                <div className={cn(
                                                    "flex items-center justify-center transition-all",
                                                    gate.id === 'fonepay' ? "w-32 h-16 scale-125" : "w-24 h-12"
                                                )}>
                                                    {gate.icon ? (
                                                        <img src={gate.icon} alt={gate.name} className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        <span className={`font-black italic text-sm ${gate.id === 'esewa' ? 'text-[#60bb46]' : gate.id === 'khalti' ? 'text-[#5c2d91]' : 'text-[#e31e24]'}`}>
                                                            {gate.name}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {paymentMethod === gate.id && (
                                                <div className="absolute top-2 right-2 text-brand-orange">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {showAlerts.security && (
                                    <Alert className="mt-6 bg-amber-50 border-amber-100 text-amber-800" onClose={() => setShowAlerts(prev => ({ ...prev, security: false }))}>
                                        <ShieldCheck className="h-4 w-4 text-amber-600" />
                                        <AlertTitle className="text-xs font-bold">Secure Payment</AlertTitle>
                                        <AlertDescription className="text-[10px] leading-relaxed">
                                            Your payment information is encrypted and secure. We do not store your full card or login details on our servers.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </section>

                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-4 lg:sticky lg:top-36 h-fit space-y-6">
                            <Card className="rounded-3xl border-gray-100 shadow-xl overflow-hidden">
                                <div className="p-6 bg-[#111827] text-white">
                                    <h3 className="font-display font-bold text-lg uppercase tracking-widest flex items-center gap-2">
                                        <ShoppingBag size={18} /> Order Summary
                                    </h3>
                                </div>
                                <CardContent className="p-0">
                                    {/* Items Mini List */}
                                    <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto bg-gray-50/50">
                                        {items.map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden border border-gray-100 shrink-0">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-xs truncate">{item.product.name}</h4>
                                                    <p className="text-[10px] text-muted-foreground mt-0.5">
                                                        {item.quantity} × {item.selectedSize.split(' ')[0]} • {item.selectedColor.name}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="font-black text-xs">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="p-6 space-y-3 bg-white">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-bold">Rs. {totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Shipping (Nepal)</span>
                                            <span className="font-bold text-green-600">
                                                {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}
                                            </span>
                                        </div>
                                        <Separator className="bg-gray-100" />
                                        <div className="flex justify-between items-end pt-2">
                                            <div>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Grand Total</span>
                                                <span className="text-2xl font-black text-[#111827]">Rs. {grandTotal.toLocaleString()}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-muted-foreground italic">Inc. all taxes</p>
                                            </div>
                                        </div>

                                        <Button
                                            disabled={isProcessing}
                                            className="w-full h-14 rounded-2xl bg-brand-orange hover:bg-brand-orange/90 text-white font-black uppercase tracking-widest text-xs mt-6 transition-all active:scale-[0.98] shadow-lg shadow-brand-orange/20"
                                        >
                                            {isProcessing ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Processing Order...
                                                </div>
                                            ) : (
                                                `Pay with ${paymentMethod === 'cod' ? 'COD' : paymentMethod.toUpperCase()}`
                                            )}
                                        </Button>

                                        <div className="mt-4 flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-1.5 grayscale opacity-50">
                                                <span className="text-[9px] font-bold uppercase tracking-tighter line-through decoration-brand-orange">Visa</span>
                                                <span className="text-[9px] font-bold uppercase tracking-tighter">eSewa</span>
                                                <span className="text-[9px] font-bold uppercase tracking-tighter">Khalti</span>
                                                <span className="text-[9px] font-bold uppercase tracking-tighter">Fonepay</span>
                                            </div>
                                            <p className="text-[9px] text-muted-foreground text-center">
                                                By clicking this button, you agree to our 14-day return policy and terms of service.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {showAlerts.fastTrack && (
                                <Alert className="bg-green-50 border-green-100 text-green-800" onClose={() => setShowAlerts(prev => ({ ...prev, fastTrack: false }))}>
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-xs font-bold">Fast Track Eligible</AlertTitle>
                                    <AlertDescription className="text-[10px] leading-tight">
                                        You are eligible for **Fast Track** delivery. Orders placed before 4PM in Kathmandu Valley arrive the same day!
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutPage;
