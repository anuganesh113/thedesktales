import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    MapPin,
    Bell,
    Lock,
    ShieldCheck,
    Save,
    Camera,
    CreditCard,
    Trash2
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const ProfileSettingsPage: React.FC = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Form states
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [address, setAddress] = useState(user?.shippingAddress || 'New Baneshwor, Kathmandu, Nepal');

    const handleSave = () => {
        updateUser({
            name,
            email,
            shippingAddress: address
        });
        toast.success('Settings updated successfully!');
    };

    const handleDeleteAccount = () => {
        logout();
        toast.success('Account deleted successfully. We\'re sorry to see you go.');
        navigate('/');
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (e.g., 2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size too large. Please select an image under 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadstart = () => {
                toast.loading('Uploading image...', { id: 'avatar-upload' });
            };
            reader.onloadend = () => {
                const result = reader.result as string;
                updateUser({ avatar: result });
                toast.dismiss('avatar-upload');
                toast.success('Profile picture updated!');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50/50 pb-24">
                {/* Header */}
                <div className="bg-[#111827] pt-28 pb-16 relative overflow-hidden">
                    <div className="container px-6 relative z-10">
                        <div className="space-y-4 max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                                Account <span className="text-brand-orange">Settings.</span>
                            </h1>
                            <p className="text-gray-400 font-medium max-w-xl">
                                Manage your personal information, security preferences, and communication settings.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container px-6 -mt-8 relative z-20">
                    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">

                        {/* Tab Sidebar */}
                        <div className="lg:w-64 shrink-0">
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 sticky top-24">
                                {[
                                    { id: 'profile', label: 'Personal Info', icon: User },
                                    { id: 'notifications', label: 'Notifications', icon: Bell },
                                    { id: 'security', label: 'Security', icon: ShieldCheck },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm",
                                            activeTab === tab.id
                                                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-[#111827]"
                                        )}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                    </button>
                                ))}
                                <div className="h-px bg-gray-100 my-2 mx-4" />
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                                >
                                    <Trash2 size={18} />
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* Content Panel */}
                        <div className="flex-1">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <div className="p-8 lg:p-12">
                                    {activeTab === 'profile' && (
                                        <div className="space-y-10">
                                            {/* Avatar Grid */}
                                            <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-50 pb-10">
                                                <div className="relative group">
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                    <div
                                                        className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl relative cursor-pointer group-hover:opacity-80 transition-opacity"
                                                        onClick={handleAvatarClick}
                                                    >
                                                        <img
                                                            src={user?.avatar}
                                                            alt={user?.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <button
                                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                    >
                                                        <div className="bg-white/90 p-3 rounded-2xl shadow-lg">
                                                            <Camera className="text-brand-orange" size={24} />
                                                        </div>
                                                    </button>
                                                </div>
                                                <div className="space-y-2 text-center md:text-left">
                                                    <h3 className="text-xl font-black text-[#111827]">Profile Picture</h3>
                                                    <p className="text-sm text-gray-500 font-medium mb-4">Upload a high-resolution portrait.</p>
                                                    <div className="flex gap-3 justify-center md:justify-start">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10"
                                                            onClick={handleAvatarClick}
                                                        >
                                                            Change
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="rounded-xl text-red-500 hover:text-red-600 font-black text-[9px] uppercase tracking-widest px-6 h-10"
                                                            onClick={() => updateUser({ avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' })}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Form Grid */}
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Full Name</Label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                                        <Input
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="rounded-2xl py-7 pl-12 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-[8px] focus:ring-brand-orange/5 transition-all font-bold text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Email Address</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                                        <Input
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="rounded-2xl py-7 pl-12 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-[8px] focus:ring-brand-orange/5 transition-all font-bold text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Default Shipping Address</Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                                        <Input
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            className="rounded-2xl py-7 pl-12 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-[8px] focus:ring-brand-orange/5 transition-all font-bold text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'notifications' && (
                                        <div className="space-y-8">
                                            <div className="border-b border-gray-50 pb-8">
                                                <h3 className="text-xl font-black text-[#111827] mb-2">Notification Preferences</h3>
                                                <p className="text-sm font-medium text-gray-500">Control how we communicate with you.</p>
                                            </div>

                                            <div className="space-y-6">
                                                {[
                                                    { title: 'Order Updates', desc: 'Real-time alerts when your order is processed or shipped.', checked: true },
                                                    { title: 'New Art Drops', desc: 'Be the first to know when new designer collections land.', checked: true },
                                                    { title: 'Exclusive Promotions', desc: 'Member-only discounts and early access to sales.', checked: false },
                                                    { title: 'Newsletter', desc: 'A weekly digest of desk setup inspiration and artist spotlights.', checked: true },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                        <div className="space-y-1 pr-10">
                                                            <p className="font-bold text-[#111827]">{item.title}</p>
                                                            <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                                        </div>
                                                        <Switch defaultChecked={item.checked} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'security' && (
                                        <div className="space-y-10">
                                            <div className="border-b border-gray-50 pb-8">
                                                <h3 className="text-xl font-black text-[#111827] mb-2">Security & Access</h3>
                                                <p className="text-sm font-medium text-gray-500">Secure your account and manage sessions.</p>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="space-y-6 max-w-lg">
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">Current Password</Label>
                                                        <Input type="password" placeholder="••••••••" className="rounded-2xl py-7 bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#111827] ml-1">New Password</Label>
                                                        <Input type="password" placeholder="••••••••" className="rounded-2xl py-7 bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                                                    </div>
                                                </div>

                                                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex gap-6">
                                                    <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                                                    <div className="space-y-2">
                                                        <p className="font-bold text-[#111827]">Two-Factor Authentication</p>
                                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Add an extra layer of security to your account by requiring a code from your phone at login.</p>
                                                        <Button size="sm" variant="outline" className="mt-2 rounded-xl text-blue-600 border-blue-200 hover:bg-blue-100 text-[9px] font-black uppercase tracking-widest px-6 h-9">Configure 2FA</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-12 pt-10 border-t border-gray-50 flex justify-end">
                                        <Button
                                            onClick={handleSave}
                                            className="rounded-2xl px-12 py-7 bg-[#111827] hover:bg-brand-orange text-white transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl gap-2 group"
                                        >
                                            <Save size={16} className="group-hover:scale-110 transition-transform" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-md bg-white rounded-[2.5rem] border-0 p-8 shadow-2xl">
                    <DialogHeader className="space-y-4">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
                            <Trash2 size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-black text-center text-[#111827]">Delete Account?</DialogTitle>
                        <DialogDescription className="text-center text-gray-500 font-medium">
                            This action is permanent and cannot be undone. All your order history and saved designs will be lost.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-6">
                        <Button
                            variant="destructive"
                            className="rounded-2xl py-7 font-black text-xs uppercase tracking-widest bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200"
                            onClick={handleDeleteAccount}
                        >
                            Yes, Delete My Account
                        </Button>
                        <Button
                            variant="ghost"
                            className="rounded-2xl py-7 font-black text-xs uppercase tracking-widest text-gray-500"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default ProfileSettingsPage;
