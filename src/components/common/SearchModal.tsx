import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { products, Product } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Small delay to ensure the dialog is mounted before focusing
            const timer = setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 6);
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSelectProduct = (productId: string) => {
        navigate(`/products/${productId}`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] p-0 gap-0 overflow-hidden border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                <div className="relative flex items-center border-b border-border/50 p-6">
                    <Search className="absolute left-10 text-muted-foreground w-6 h-6" />
                    <input
                        ref={inputRef}
                        placeholder="Search for deskmats, mousepads, art..."
                        className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium pl-14 pr-12 h-12 outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && query.trim().length > 0) {
                                navigate(`/products?search=${query}`);
                                onClose();
                            }
                        }}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-10 p-2 hover:bg-muted rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    )}
                </div>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {query.trim().length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-10 text-center"
                            >
                                <div className="mb-4 flex justify-center">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                        <Search className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Search The Desk Tales</h3>
                                <p className="text-muted-foreground">Find the perfect accessory for your workspace.</p>
                                <div className="mt-8 flex flex-wrap justify-center gap-2">
                                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2 w-full text-center">Suggested</span>
                                    {['Deskmat', 'Mousepad', 'Poster', 'Minimalist', 'Gaming'].map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setQuery(tag)}
                                            className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : results.length > 0 ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 grid grid-cols-1 gap-2"
                            >
                                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    Products ({results.length})
                                </div>
                                {results.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelectProduct(product.id)}
                                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-accent/5 group transition-all text-left border border-transparent hover:border-accent/10"
                                    >
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-base truncate group-hover:text-accent transition-colors">
                                                {product.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground capitalize">{product.category.replace('-', ' ')}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-bold text-accent">Rs. {product.price.toLocaleString()}</p>
                                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                                                View Item <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={() => { navigate(`/products?search=${query}`); onClose(); }}
                                    className="mt-4 mx-4 p-4 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-accent transition-all shadow-lg shadow-primary/20"
                                >
                                    See all results for "{query}" <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-16 text-center"
                            >
                                <p className="text-xl font-medium mb-2">No results for "{query}"</p>
                                <p className="text-muted-foreground">Try adjusting your search or category.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchModal;
