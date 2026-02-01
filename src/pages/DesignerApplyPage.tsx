import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, DollarSign, PenTool, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DesignerApplyPage: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API submission
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Welcome to the team!", {
                description: "Your comprehensive design studio is ready."
            });
            navigate('/designer');
        }, 1500);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative bg-[#111827] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
                <div className="container relative py-24 md:py-32 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6 border border-brand-orange/20">
                        <Sparkles size={14} />
                        Join the Creator Economy
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6">
                        Turn Your Art into <span className="text-brand-orange">Recurring Revenue</span>.
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mb-10 leading-relaxed">
                        Upload your designs, and we handle the rest—printing, shipping, and customer support. You keep the rights and earn a 15% commission on every sale.
                    </p>
                </div>
            </div>

            <div className="container py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Form Side */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-purple-600 rounded-2xl blur opacity-20" />
                        <Card className="relative border-border/50 bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-2">Create your Designer Account</h2>
                                <p className="text-muted-foreground mb-8">Start selling in under 2 minutes.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="Jane" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="jane@example.com" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="portfolio">Portfolio Link (Instagram, Behance, etc.)</Label>
                                        <Input id="portfolio" placeholder="https://" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" required />
                                    </div>

                                    <div className="pt-2 flex items-start gap-2">
                                        <div className="mt-1">
                                            <input type="checkbox" id="terms" required className="rounded border-gray-300" />
                                        </div>
                                        <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                                            I agree to the <a href="/terms" className="text-brand-orange hover:underline">Terms of Service</a> & <a href="/designer-terms" className="text-brand-orange hover:underline">Designer Agreement</a>. I confirm that I own the rights to all content I upload.
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full h-12 text-base font-bold bg-brand-orange hover:bg-brand-orange/90" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating Studio...' : 'Start Selling'}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Benefits Side */}
                    <div className="space-y-12 lg:pt-8">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">High Commissions</h3>
                                    <p className="text-muted-foreground">Earn 15-20% on every sale. Top designers earn over Rs. 50,000/month in passive income.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">You Own Your Art</h3>
                                    <p className="text-muted-foreground">You retain 100% ownership. You grant us a non-exclusive license to print, which you can revoke at any time.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                    <PenTool size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Automatic Mockups</h3>
                                    <p className="text-muted-foreground">Upload one image, and our engine automatically places it on Deskmats, Mousepads, and Posters.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 font-bold mb-4">
                                <CheckCircle className="w-5 h-5 text-brand-orange" />
                                <span>Simple Requirements</span>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                    Original or Licensed Artwork
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                    High Resolution Files (300 DPI recommended)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                    Valid Payment Method (Bank/UPI)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DesignerApplyPage;
