import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Shop All', href: '/products' },
    { name: 'DeskMats', href: '/products?category=desk-mat' },
    { name: 'Mousepads', href: '/products?category=mousepad' },
    { name: 'Posters', href: '/products?category=poster' },
    { name: 'Custom Prints', href: '/products?category=custom' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto">
        {/* Top bar */}
        <div className="hidden lg:flex items-center justify-between py-2 text-xs text-muted-foreground border-b border-border">
          <p>Free shipping on orders over Rs. 1,500 🚚</p>
          <div className="flex items-center gap-6">
            <Link to="/designer-apply" className="hover:text-foreground transition-colors">
              Become a Designer
            </Link>
            <Link to="/help" className="hover:text-foreground transition-colors">
              Help & FAQ
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="The Desk Tales" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              to="/custom-design"
              className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
            >
              ✨ Design Your Own
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link to="/account">
                <User size={20} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/custom-design"
              className="py-3 px-4 text-accent font-semibold hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✨ Design Your Own
            </Link>
            <div className="h-px bg-border my-2" />
            <Link
              to="/designer-apply"
              className="py-3 px-4 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become a Designer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
