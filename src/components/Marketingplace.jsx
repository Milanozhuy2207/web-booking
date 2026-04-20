import React, { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContext';
import { FiPlus, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData, cartItems, searchTerm, selectedCategory, followerRange, budgetRange } = useCart();
    
    // Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef(null);

    // Reset visible count when any filter changes
    useEffect(() => {
        setVisibleCount(12);
    }, [searchTerm, selectedCategory, followerRange, budgetRange]);

    // Intersection Observer to detect when user reaches bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredData.length) {
                    // Small delay to simulate loading feel if desired, or just update
                    setVisibleCount(prev => prev + 8);
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [visibleCount, filteredData.length]);

    const displayData = filteredData.slice(0, visibleCount);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 font-sans transition-colors duration-300">
            {/* Results Header */}
            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-theme-primary text-xs md:text-sm font-black uppercase tracking-[0.2em] opacity-60">
                    HIỂN THỊ <span className="text-[#E10600]">{Math.min(visibleCount, filteredData.length)}</span> / <span className="text-[#E10600]">{filteredData.length}</span> KÊNH
                </h2>
            </div>

            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-theme-card rounded-3xl border border-theme shadow-lg">
                    <p className="text-theme-primary text-lg font-medium">Không tìm thấy kết quả phù hợp</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
                        {displayData.map((group) => (
                            <div
                                key={group.id}
                                className="bg-theme-card rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-between border border-theme hover:border-[#E10600]/50 transition-all duration-500 shadow-xl group relative cursor-pointer"
                            >
                                {/* Wrap content in a link to the Facebook group */}
                                <a 
                                    href={group.link || '#'} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-0"
                                >
                                    <span className="sr-only">Xem nhóm {group.name}</span>
                                </a>

                                {/* Subtle Glow Background */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E10600]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Card Image */}
                                <div className="relative h-32 md:h-48 w-full bg-theme-secondary overflow-hidden p-2 pointer-events-none">
                                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                        <img
                                            src={group.image}
                                            alt={group.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-[#E10600] text-white text-[8px] md:text-[10px] font-black px-2 py-1 rounded-lg tracking-wider uppercase">
                                            {group.platform}
                                        </span>
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <div className="bg-yellow-500 p-1.5 rounded-lg text-black shadow-lg">
                                            <FiTrendingUp size={12} />
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-3 md:p-6 flex flex-col flex-1 relative z-10 text-center md:text-left pointer-events-none">
                                    <div className="mb-4 min-h-[3rem] md:min-h-[4rem] flex flex-col justify-start">
                                        <h3 className="text-theme-primary font-black text-sm md:text-lg uppercase leading-tight group-hover:text-[#E10600] transition-colors duration-300 break-words">
                                            {group.name}
                                        </h3>
                                        <p className="text-[#E10600] text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1">
                                            {group.category}
                                        </p>
                                        <p className="text-theme-primary text-[10px] md:text-xs italic line-clamp-2 mt-2 leading-relaxed hidden md:block opacity-80">
                                            "{group.description}"
                                        </p>
                                    </div>

                                    {/* Unified Stats Box */}
                                    <div className="bg-theme-secondary rounded-xl md:rounded-2xl border border-theme p-2 md:p-4 flex flex-col md:flex-row justify-around md:items-center gap-2 mb-4 mt-auto">
                                        <div className="flex flex-col items-center md:flex-1 text-center md:text-left">
                                            <p className="text-theme-muted text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] mb-0.5">BOOKING</p>
                                            <p className="text-[#E10600] font-black text-xs md:text-sm">{group.bookingPrice}</p>
                                        </div>
                                        
                                        <div className="hidden md:block h-8 w-px bg-theme-muted/20" />
                                        <div className="h-px w-full bg-theme-muted/10 md:hidden" />
                                        
                                        <div className="flex flex-col items-center md:flex-1 text-center md:text-left">
                                            <p className="text-theme-muted text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] mb-0.5">FOLLOWERS</p>
                                            <p className="text-theme-primary font-black text-xs md:text-sm">{group.followers}</p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="relative z-20 pointer-events-auto">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(group);
                                            }}
                                            disabled={cartItems.some(item => item.id === group.id)}
                                            className={`w-full font-black text-[10px] md:text-xs py-3 rounded-xl border transition-all duration-300 active:scale-95 uppercase tracking-widest ${
                                                cartItems.some(item => item.id === group.id)
                                                ? 'bg-gray-500/10 border-gray-500/20 text-gray-500 cursor-default'
                                                : 'bg-[#E10600]/10 hover:bg-[#E10600] border-[#E10600]/20 text-[#E10600] hover:text-white cursor-pointer'
                                            }`}
                                        >
                                            {cartItems.some(item => item.id === group.id) ? 'ĐÃ TRONG GIỎ' : 'THÊM GIỎ HÀNG'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Infinite Scroll Trigger */}
                    {visibleCount < filteredData.length && (
                        <div 
                            ref={loaderRef} 
                            className="w-full flex justify-center py-12"
                        >
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E10600]"></div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Marketplace;