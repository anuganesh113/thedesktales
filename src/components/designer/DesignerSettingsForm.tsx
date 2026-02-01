import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Check, AlertCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const DesignerSettingsForm = () => {
    const [isKycUploaded, setIsKycUploaded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "Settings Saved",
                description: "Your payment details and profile have been updated.",
            });
        }, 1500);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsKycUploaded(true);
            toast({
                title: "Document Uploaded",
                description: "We've received your ID. Verification takes 24-48 hours.",
            });
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">

            {/* Payment Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Payment Settings
                    </CardTitle>
                    <CardDescription>
                        Where should we send your commission payouts?
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="method">Payout Method</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="bank">Bank Transfer (NEFT/IMPS)</option>
                            <option value="upi">UPI ID</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account">Account Number / UPI ID</Label>
                        <Input id="account" placeholder="e.g., alex@okhdfcbank" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Account Holder Name</Label>
                        <Input id="name" placeholder="As per bank records" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Update Payment Details'}
                    </Button>
                </CardFooter>
            </Card>

            {/* Identity Verification (KYC) */}
            <Card className="border-accent/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                        Identity Verification
                    </CardTitle>
                    <CardDescription>
                        Required for payouts exceeding Rs. 5,000.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Verification Status</span>
                            {isKycUploaded ? (
                                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                                    Pending Review
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                    Unverified
                                </Badge>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Please upload a government-issued ID (Citizenship, Passport, or License).
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                            accept="image/*,.pdf"
                        />
                        {isKycUploaded ? (
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="font-medium text-green-800">Document Uploaded</p>
                                <p className="text-xs text-green-600">id_card_scan.pdf</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Upload className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="font-medium text-gray-900">Click to upload ID</p>
                                <p className="text-xs text-gray-500">PNG, JPG or PDF (Max 5MB)</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
};
