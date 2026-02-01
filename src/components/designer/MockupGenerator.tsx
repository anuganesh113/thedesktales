import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Wand2, Rocket, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface MockupGeneratorProps {
    originalFile: File | null;
    onReset: () => void;
}

export const MockupGenerator: React.FC<MockupGeneratorProps> = ({ originalFile, onReset }) => {
    const products = [
        { name: 'Desk Mat (60x28cm)', aspect: 'aspect-[15/7]', style: 'object-cover' },
        { name: 'Mousepad', aspect: 'aspect-[4/3]', style: 'object-cover' },
        { name: 'Premium Poster', aspect: 'aspect-[2/3]', style: 'object-cover' },
    ];

    const [step, setStep] = useState<'generating' | 'review' | 'details' | 'success'>('generating');
    const [mockups, setMockups] = useState<string[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([0, 1, 2]);
    const [details, setDetails] = useState({
        title: '',
        description: '',
        tags: '',
    });
    const [isPublishing, setIsPublishing] = useState(false);

    // Customization State
    const [activeEdit, setActiveEdit] = useState<number | null>(null);
    const [customizations, setCustomizations] = useState(
        products.map(() => ({ zoom: 1, x: 0, y: 0 }))
    );

    // Mock generation process
    useEffect(() => {
        if (originalFile && step === 'generating') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setTimeout(() => {
                    setMockups([result, result, result]);
                    setStep('review');
                    setDetails(prev => ({ ...prev, title: originalFile.name.replace(/\.[^/.]+$/, "") }));
                    toast.success("Mockups generated successfully!");
                }, 2000);
            };
            reader.readAsDataURL(originalFile);
        }
    }, [originalFile, step]);

    const updateCustomization = (key: 'zoom' | 'x' | 'y', value: number) => {
        if (activeEdit === null) return;
        setCustomizations(prev => {
            const next = [...prev];
            next[activeEdit] = { ...next[activeEdit], [key]: value };
            return next;
        });
    };

    const handlePublish = () => {
        if (!details.title || !details.description) {
            toast.error("Please fill in the title and description.");
            return;
        }
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            setStep('success');
            toast.success("Products published successfully!");
        }, 2000);
    };

    const toggleProduct = (index: number) => {
        setSelectedProducts(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    if (!originalFile) return null;

    if (step === 'success') {
        return (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-black font-display mb-4">You're Live!</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    "{details.title}" has been submitted and will be live on the store in 5-10 minutes.
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={onReset}>Upload Another</Button>
                    <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
                        <Link to="/designer">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Customization Overlay */}
            {activeEdit !== null && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-xl">Customize {products[activeEdit].name}</h3>
                            <Button variant="ghost" size="icon" onClick={() => setActiveEdit(null)}>
                                <Check className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="p-8 bg-gray-50 flex flex-col items-center">
                            <div className={`relative ${products[activeEdit].aspect} w-full max-w-2xl bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-200`}>
                                <img
                                    src={mockups[activeEdit]}
                                    className={`w-full h-full object-cover transition-transform duration-100 ease-out`}
                                    style={{
                                        transform: `scale(${customizations[activeEdit].zoom}) translate(${customizations[activeEdit].x}%, ${customizations[activeEdit].y}%)`,
                                        filter: 'brightness(0.95) contrast(1.1)'
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none select-none">
                                    <div className="transform -rotate-12 text-white font-black text-2xl uppercase tracking-widest border-4 border-white px-4 py-2 opacity-50">
                                        Preview
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 grid gap-6 md:grid-cols-3 bg-white">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <Label>Zoom</Label>
                                    <span className="text-muted-foreground">{Math.round(customizations[activeEdit].zoom * 100)}%</span>
                                </div>
                                <input
                                    type="range" min="1" max="3" step="0.1"
                                    value={customizations[activeEdit].zoom}
                                    onChange={(e) => updateCustomization('zoom', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <Label>Horizontal Pan</Label>
                                    <span className="text-muted-foreground">{customizations[activeEdit].x}%</span>
                                </div>
                                <input
                                    type="range" min="-50" max="50" step="1"
                                    value={customizations[activeEdit].x}
                                    onChange={(e) => updateCustomization('x', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <Label>Vertical Pan</Label>
                                    <span className="text-muted-foreground">{customizations[activeEdit].y}%</span>
                                </div>
                                <input
                                    type="range" min="-50" max="50" step="1"
                                    value={customizations[activeEdit].y}
                                    onChange={(e) => updateCustomization('y', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <Button onClick={() => setActiveEdit(null)} className="bg-brand-orange text-white hover:bg-brand-orange/90">
                                Done Customizing
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Wand2 className="text-brand-orange" />
                        Mockup Engine
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        {step === 'generating' ? 'Generating assets...' : step === 'review' ? 'Customize & Select products' : 'Add product details'}
                    </p>
                </div>
                <div className="flex gap-2">
                    {step !== 'generating' && (
                        <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground">Cancel</Button>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-end">
                {products.map((product, i) => (
                    <Card
                        key={product.name}
                        className={`overflow-hidden border transition-all duration-300 ${selectedProducts.includes(i) ? 'border-brand-orange ring-1 ring-brand-orange/20 shadow-lg' : 'border-border/50 opacity-60 grayscale'
                            }`}
                        onClick={() => step === 'review' && toggleProduct(i)}
                    >
                        <div className={`relative ${product.aspect} bg-gray-100 overflow-hidden cursor-pointer group`}>
                            {step === 'generating' ? (
                                <Skeleton className="w-full h-full" />
                            ) : (
                                <>
                                    <img
                                        src={mockups[i]}
                                        alt={`${product.name} Mockup`}
                                        className={`w-full h-full ${product.style} transition-transform duration-300`}
                                        style={{
                                            filter: 'brightness(0.95) contrast(1.1)',
                                            transform: `scale(${customizations[i].zoom}) translate(${customizations[i].x}%, ${customizations[i].y}%)`
                                        }}
                                    />

                                    {/* Watermark */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none select-none">
                                        <div className="transform -rotate-12 text-white font-black text-xl uppercase tracking-widest border-4 border-white px-3 py-1 opacity-50">
                                            Preview
                                        </div>
                                    </div>

                                    {/* Edit Button Overlay */}
                                    {step === 'review' && (
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="shadow-lg font-semibold gap-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveEdit(i);
                                                }}
                                            >
                                                <Sparkles size={14} /> Customize
                                            </Button>
                                        </div>
                                    )}

                                    {/* Selection Check */}
                                    {step === 'review' && selectedProducts.includes(i) && (
                                        <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedProducts.includes(i) ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-400'} shadow-md z-10`}>
                                            <Check size={16} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <CardContent className="p-3 bg-white">
                            <h3 className="font-bold text-center text-sm">{product.name}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Action Area */}
            {step === 'review' && (
                <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep('details')} className="bg-black text-white hover:bg-gray-800 gap-2 px-8">
                        Next: Add Details <ArrowRight size={16} />
                    </Button>
                </div>
            )}

            {step === 'details' && (
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Rocket className="text-brand-orange w-5 h-5" />
                        Listing Details
                    </h3>
                    <div className="grid gap-6 max-w-2xl">
                        <div className="space-y-2">
                            <Label htmlFor="title">Product Title</Label>
                            <Input
                                id="title"
                                value={details.title}
                                onChange={(e) => setDetails({ ...details, title: e.target.value })}
                                placeholder="e.g. Cosmic Nebula Deck"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea
                                id="desc"
                                value={details.description}
                                onChange={(e) => setDetails({ ...details, description: e.target.value })}
                                placeholder="Tell the story behind your art..."
                                rows={4}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                value={details.tags}
                                onChange={(e) => setDetails({ ...details, tags: e.target.value })}
                                placeholder="space, abstract, dark..."
                            />
                        </div>
                        <div className="pt-4 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setStep('review')}>Back</Button>
                            <Button onClick={handlePublish} disabled={isPublishing} className="bg-brand-orange hover:bg-brand-orange/90 text-white min-w-[150px]">
                                {isPublishing ? <Loader2 className="animate-spin" /> : 'Publish Products'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
