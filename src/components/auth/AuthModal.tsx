import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
    const [view, setView] = useState<'login' | 'register'>(initialView);

    const { login } = useAuth();

    const handleGoogleLogin = () => {
        // Mock login for now
        login({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        });
        toast.success('Successfully signed in with Google!');
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use test data for any login attempt
        login({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        });
        toast.success(`Welcome back, Test User!`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 border-0 bg-white shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="h-2 w-full bg-gradient-to-r from-[#F97316] to-[#FBBF24] shrink-0" />
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    <DialogHeader className="space-y-3">
                        <div className="flex justify-center mb-4">
                            <img src={logo} alt="The Desk Tales" className="h-16 w-auto object-contain" />
                        </div>
                        <DialogTitle className="font-display text-3xl font-black text-[#111827] tracking-tight">
                            {view === 'login' ? 'Welcome Back.' : 'Join The Desk Tales.'}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 font-medium">
                            {view === 'login'
                                ? 'Sign in to share your review and manage your favorites.'
                                : 'Create an account to track your orders and save your designs.'}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Toggle Switch */}
                    <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
                        <button
                            onClick={() => setView('login')}
                            className={cn(
                                "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                view === 'login' ? "bg-white text-[#111827] shadow-sm" : "text-gray-400 hover:text-[#111827]"
                            )}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setView('register')}
                            className={cn(
                                "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                view === 'register' ? "bg-white text-[#111827] shadow-sm" : "text-gray-400 hover:text-[#111827]"
                            )}
                        >
                            Register
                        </button>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="rounded-2xl py-6 border-gray-100 font-bold text-[10px] uppercase tracking-widest gap-2 hover:bg-gray-50 hover:text-[#111827] transition-all"
                            onClick={handleGoogleLogin}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="rounded-2xl py-6 border-gray-100 font-bold text-[10px] uppercase tracking-widest gap-2 hover:bg-gray-50 hover:text-[#111827] transition-all">
                            <Github size={16} />
                            Github
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.3em]">
                            <span className="bg-white px-4 text-gray-300">Or use email</span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={view}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-4"
                            >
                                {view === 'register' && (
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Your Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                            <Input placeholder="Alex Morrison" className="rounded-2xl py-6 pl-12 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-[6px] focus:ring-[#F97316]/5 transition-all" />
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                        <Input placeholder="name@example.com" value="test@example.com" readOnly className="rounded-2xl py-6 pl-12 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-[6px] focus:ring-[#F97316]/5 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                        <Input type="password" placeholder="••••••••" value="password" readOnly className="rounded-2xl py-6 pl-12 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-[6px] focus:ring-[#F97316]/5 transition-all" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <Button type="submit" className="w-full py-7 rounded-2xl bg-[#111827] hover:bg-[#F97316] text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#111827]/10 group">
                            {view === 'login' ? 'Sign In' : 'Create My Account'}
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
