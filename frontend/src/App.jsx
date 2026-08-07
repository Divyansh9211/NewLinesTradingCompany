import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ui/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import OccasionPage from './pages/OccasionPage';
import BestsellerPage from './pages/BestsellerPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
            {/* Main pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Occasion pages — single dynamic component (10 occasions) */}
            <Route path="/occasion/:slug" element={<OccasionPage />} />

            {/* Bestseller sub-pages — single dynamic component (12 bestsellers) */}
            <Route path="/bestseller/:slug" element={<BestsellerPage />} />

            {/* Fallback: redirect unknown routes to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
