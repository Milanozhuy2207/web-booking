import React from 'react';
import Navbar from './components/Navbar';
import HeroStats from './components/HeroStats';
import FilterBar from './components/FilterBar';
import Marketplace from './components/Marketingplace';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-theme-primary pb-20 relative overflow-hidden transition-colors duration-300">
        <Navbar />
        <HeroStats />
        <FilterBar />
        <Marketplace />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}

export default App;