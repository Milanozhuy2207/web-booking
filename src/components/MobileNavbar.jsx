import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiPercent, FiLayers, FiShoppingCart } from 'react-icons/fi';

const MobileNavbar = () => {
    const location = useLocation();

    const tabs = [
        { name: 'KOLS', icon: <FiSearch size={24} />, path: '/' },
        { name: 'SALE', icon: <FiPercent size={24} />, path: '/promotions' },
        { name: 'GBUZZ', icon: <FiLayers size={24} />, path: '/services' },
        { name: 'GIỎ', icon: <FiShoppingCart size={24} />, path: '#cart' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0b0f19] border-t border-white/10 z-[100] px-2 py-3">
            <div className="flex justify-around items-center">
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        to={tab.path === '#cart' ? '#' : tab.path}
                        className={`flex flex-col items-center gap-1 min-w-[64px] transition-colors ${
                            location.pathname === tab.path 
                            ? 'text-[#E10600]' 
                            : 'text-gray-500 hover:text-white'
                        }`}
                    >
                        <div className="relative">
                            {tab.icon}
                            {tab.name === 'SALE' && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-[#0b0f19]" />
                            )}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{tab.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MobileNavbar;
