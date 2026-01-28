import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; value: string };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; value: string }, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, size: string, color: { name: string; value: string }, quantity = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevItems, { product, quantity, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, colorName: string) => {
    setItems(prevItems => 
      prevItems.filter(
        item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor.name === colorName)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId && item.selectedSize === size && item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
