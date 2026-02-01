import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; value: string };
  selectedEdge?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; value: string }, edge?: string, quantity?: number) => boolean;
  removeFromCart: (productId: string, size: string, colorName: string, edge?: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, edge: string | undefined, quantity: number) => void;
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

  const addToCart = useCallback((product: Product, size: string, color: { name: string; value: string }, edge?: string, quantity = 1) => {
    const existingIndex = items.findIndex(
      item => item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.name === color.name &&
        item.selectedEdge === edge
    );

    if (existingIndex > -1) {
      return false;
    }

    setItems(prevItems => [
      ...prevItems,
      { product, quantity, selectedSize: size, selectedColor: color, selectedEdge: edge }
    ]);
    setIsCartOpen(true);
    return true;
  }, [items]);

  const removeFromCart = useCallback((productId: string, size: string, colorName: string, edge?: string) => {
    setItems(prevItems =>
      prevItems.filter(
        item => !(item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName &&
          item.selectedEdge === edge)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, colorName: string, edge: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName, edge);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName &&
          item.selectedEdge === edge
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
