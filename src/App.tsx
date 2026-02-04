import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CustomDesignPage from "./pages/CustomDesignPage";
import DesignerDashboardPage from "./pages/DesignerDashboardPage";
import DesignerApplyPage from "./pages/DesignerApplyPage";
import DesignerAssetsPage from "./pages/DesignerAssetsPage";
import DMCA from "./pages/legal/DMCA";
import TermsOfService from "./pages/legal/TermsOfService";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import HelpPage from "./pages/HelpPage";
import DesignersPage from "./pages/DesignersPage";
import UserDashboardPage from "./pages/account/UserDashboardPage";
import OrdersPage from "./pages/account/OrdersPage";
import ProfileSettingsPage from "./pages/account/ProfileSettingsPage";
import WishlistPage from "./pages/account/WishlistPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import ScrollToTop from "./components/common/ScrollToTop";

import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner duration={3000} />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/custom-design" element={<CustomDesignPage />} />
                <Route path="/designer" element={<DesignerDashboardPage />} />
                <Route path="/designer/assets" element={<DesignerAssetsPage />} />
                <Route path="/designer-apply" element={<DesignerApplyPage />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/designers" element={<DesignersPage />} />

                {/* Member Only Routes */}
                <Route path="/account" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
                <Route path="/account/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/account/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
                <Route path="/account/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
