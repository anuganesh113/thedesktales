import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background shadow-2xl z-50 transition-transform duration-300 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} className="text-primary" />
              <h2 className="font-display font-bold text-xl">Your Cart</h2>
              <span className="text-sm text-muted-foreground">({totalItems} items)</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <X size={24} />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={64} className="text-muted-foreground/30 mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Add some beautiful desk accessories!</p>
                <Button onClick={() => setIsCartOpen(false)} asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${item.selectedEdge || 'none'}-${item.selectedFrameColor?.name || 'none'}`}
                    className="flex gap-4 p-3 bg-muted/50 rounded-lg animate-fade-in"
                  >
                    <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span
                          className="w-3 h-3 rounded-full border border-border"
                          style={{ backgroundColor: item.selectedColor.value }}
                        />
                        <span>{item.selectedColor.name}</span>
                        <span>•</span>
                        <span>{item.selectedSize.split(' ')[0]}</span>
                        {item.selectedEdge && (
                          <>
                            <span>•</span>
                            <span>{item.selectedEdge}</span>
                          </>
                        )}
                        {item.selectedFrameColor && (
                          <>
                            <span>•</span>
                            <span>{item.selectedFrameColor.name} Frame</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 bg-background rounded-md border border-border">
                          <button
                            className="p-1.5 hover:bg-muted transition-colors rounded-l-md"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.selectedEdge, item.quantity - 1, item.selectedFrameColor?.name)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            className="p-1.5 hover:bg-muted transition-colors rounded-r-md"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.selectedEdge, item.quantity + 1, item.selectedFrameColor?.name)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-semibold">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name, item.selectedEdge, item.selectedFrameColor?.name)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{totalPrice >= 1500 ? 'Free' : 'Rs. 150'}</span>
                </div>
                <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span>Rs. {(totalPrice + (totalPrice >= 1500 ? 0 : 150)).toLocaleString()}</span>
                </div>
              </div>
              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsCartOpen(false)} asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
