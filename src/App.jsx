import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './components/CartContext';
import HomePage from './pages/HomePage';
import PromotionPage from './pages/PromotionPage';
import ServicePage from './pages/ServicePage';
import CartDetail from './pages/CartDetail';
import MobileNavbar from './components/MobileNavbar';
import Notification from './components/Notification';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen relative transition-colors duration-300 pb-20 md:pb-0">
          <Navbar />
          <Notification />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/promotions" element={<PromotionPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/cart" element={<CartDetail />} />
          </Routes>
          <MobileNavbar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;