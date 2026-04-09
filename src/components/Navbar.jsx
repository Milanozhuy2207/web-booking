import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import { useCart } from './CartContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { cartItems, setIsCartOpen, isDarkMode, toggleTheme } = useCart();
    const location = useLocation();

    const navLinks = [
        { name: 'Hệ thống Kênh', path: '/' },
        { name: 'Khuyến mãi', path: '/promotions' },
        { name: 'Dịch vụ', path: '/services' }
    ];

    return (
        <nav 
            style={{ backgroundColor: isDarkMode ? 'rgba(11, 15, 25, 0.9)' : 'rgba(225, 6, 0, 0.9)' }}
            className="backdrop-blur-2xl border-b border-white/10 dark:border-white/5 font-sans sticky top-0 z-50 transition-all duration-300 shadow-xl"
        >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center h-24">

                    {/* Logo & Branding */}
                    <Link to="/" className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative h-10 w-10 md:h-12 md:w-12 bg-white rounded-2xl flex items-center justify-center p-1.5 shadow-2xl border-2 border-white/20 transition-transform duration-500 group-hover:scale-110">
                                <img 
                                    src={logo} 
                                    alt="Vén Khéo Logo" 
                                    className="h-full w-full object-contain" 
                                />
                            </div>
                        </div>
                        <h1 className="text-white font-black text-2xl md:text-3xl tracking-widest uppercase hidden sm:block drop-shadow-md">
                            VÉN KHÉO<span className="text-white">.</span>
                        </h1>
                    </Link>

                    {/* Menu & Icons */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden lg:flex items-center gap-8 text-[13px] font-black tracking-[0.2em] uppercase">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative transition-colors ${
                                        location.pathname === link.path 
                                        ? 'text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white after:rounded-full' 
                                        : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 pl-4 md:pl-8 border-l border-white/20">
                            <button 
                                onClick={toggleTheme}
                                className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer shadow-sm active:scale-95"
                            >
                                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                            </button>

                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="relative w-12 h-12 rounded-2xl bg-white text-[#E10600] border border-white flex items-center justify-center hover:bg-white/90 transition-all cursor-pointer shadow-xl active:scale-95"
                            >
                                <FiShoppingCart size={20} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-[#E10600] text-[11px] font-black h-6 w-6 rounded-full flex items-center justify-center border-[3px] border-[#E10600] shadow-md">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;