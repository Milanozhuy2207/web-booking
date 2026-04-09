import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './components/CartContext';
import HomePage from './pages/HomePage';
import PromotionPage from './pages/PromotionPage';
import ServicePage from './pages/ServicePage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/promotions" element={<PromotionPage />} />
            <Route path="/services" element={<ServicePage />} />
          </Routes>
          <CartSidebar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;