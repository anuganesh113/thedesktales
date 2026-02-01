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
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/common/ScrollToTop";

import { WishlistProvider } from "./context/WishlistContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
