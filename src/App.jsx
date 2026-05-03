import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './components/CartContext';
import { useCart } from './components/CartContextInstance';
import HomePage from './pages/HomePage';
import PromotionPage from './pages/PromotionPage';
import ServicePage from './pages/ServicePage';
import CartDetail from './pages/CartDetail';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import MobileNavbar from './components/MobileNavbar';
import Notification from './components/Notification';
import ZaloChat from './components/ZaloChat';

// Public Layout Wrapper
const PublicLayout = ({ children }) => (
  <div className="min-h-screen relative transition-colors duration-300 pb-20 md:pb-0">
    <Navbar />
    <Notification />
    {children}
    <ZaloChat />
    <MobileNavbar />
  </div>
);

// Protected Admin Route
const ProtectedAdminRoute = ({ children }) => {
  const { isAdminLoggedIn } = useCart();
  
  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/promotions" element={<PublicLayout><PromotionPage /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicePage /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><CartDetail /></PublicLayout>} />

          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedAdminRoute>
                <Routes>
                  <Route index element={<AdminPage />} />
                  <Route path="marketplace" element={<AdminPage />} />
                  <Route path="settings" element={<div className="text-slate-500 font-bold uppercase p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">Cài đặt hệ thống đang phát triển...</div>} />
                </Routes>
              </ProtectedAdminRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;