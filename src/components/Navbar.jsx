import React from 'react';
import { FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from './CartContext';

const Navbar = () => {
    const { cartItems, setIsCartOpen, isDarkMode, toggleTheme } = useCart();

    return (
        <nav className="bg-theme-primary border-b border-theme font-sans sticky top-0 z-30 transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Vén Khéo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <FaMapMarkerAlt className="text-[#00a624] text-2xl" />
                        <h1 className="text-theme-primary font-black text-2xl tracking-widest uppercase">
                            VÉN KHÉO
                        </h1>
                    </div>

                    {/* Menu & Icons */}
                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden lg:flex items-center gap-6 text-[14px] font-bold tracking-wide">
                            <a href="#" className="text-[#00a624]">Danh sách</a>
                            <a href="#" className="text-theme-primary hover:text-[#00a624] transition-colors">Khuyến mãi</a>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={toggleTheme}
                                className="w-10 h-10 rounded-full border border-theme flex items-center justify-center text-theme-muted hover:text-theme-primary transition-all cursor-pointer"
                            >
                                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                            </button>

                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="relative w-10 h-10 rounded-full bg-[#00a624]/10 border border-[#00a624]/20 flex items-center justify-center text-[#00a624] hover:bg-[#00a624]/20 transition-all cursor-pointer"
                            >
                                <FiShoppingCart size={18} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#00a624] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-theme">
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