import React, { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContextInstance';
import { FiPlus, FiUsers, FiExternalLink } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData, isLoading } = useCart();
    
    // Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef(null);

    // Intersection Observer to detect when user reaches bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredData.length) {
                    setVisibleCount(prev => prev + 8);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '100px' 
            }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [visibleCount, filteredData.length]);

    const displayData = filteredData.slice(0, visibleCount);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E10600]"></div>
                <p className="mt-4 text-theme-primary font-medium">Đang tải dữ liệu...</p>
            </div>
        );
    }

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {displayData.map((group) => (
                            <div
                                key={group.id}
                                className="bg-theme-card rounded-[40px] overflow-hidden flex flex-col border border-theme hover:border-[#E10600]/30 transition-all duration-300 shadow-sm hover:shadow-2xl group relative"
                            >
                                {/* Card Image Container */}
                                <div className="relative aspect-[1.4/1] w-full overflow-hidden">
                                    <img
                                        src={group.image || '/favicon.svg'}
                                        alt={group.name}
                                        onError={(e) => {
                                            e.target.src = '/favicon.svg';
                                            e.target.className = "w-full h-full object-contain p-12 opacity-20";
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    
                                    {/* Platform Badge - Top Left */}
                                    <div className="absolute top-4 left-4 bg-[#E10600] text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider">
                                        {group.platform} {group.platform?.toLowerCase().includes('facebook') ? 'GROUP' : ''}
                                    </div>

                                    {/* Link Icon - Top Right */}
                                    <a 
                                        href={group.link || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="absolute top-4 right-4 p-2.5 bg-[#FFCC00] text-black rounded-xl transition-transform hover:scale-110 z-10"
                                    >
                                        <FiExternalLink size={18} strokeWidth={3} />
                                    </a>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Title & Category Row */}
                                    <div className="flex justify-between items-start gap-2 mb-4 min-h-[3rem]">
                                        <h3 className="text-theme-primary font-black text-lg uppercase leading-tight">
                                            {group.name}
                                        </h3>
                                        <span className="text-[#E10600] text-[10px] font-black uppercase tracking-widest mt-1.5 flex-shrink-0">
                                            {group.category}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-theme-muted text-xs italic opacity-60 mb-6 flex-1">
                                        “{group.description || 'Chưa có mô tả cho kênh này'}”
                                    </p>
                                    
                                    {/* Bottom Action Area */}
                                    <div className="mt-auto">
                                        {/* Stats Box (Dark Background) */}
                                        <div className="bg-[#121826] rounded-2xl p-4 grid grid-cols-2 gap-4 mb-6 transition-colors group-hover:bg-[#1a2233]">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-theme-muted text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Booking</span>
                                                <span className="text-[#E10600] font-black text-base tracking-tighter">
                                                    {group.bookingPrice}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 items-end">
                                                <span className="text-theme-muted text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Followers</span>
                                                <span className="text-white font-black text-base tracking-tighter">
                                                    {group.followers}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(group);
                                            }}
                                            className="w-full bg-[#E10600] hover:bg-red-700 text-white py-4 rounded-2xl font-black text-sm transition-all duration-300 shadow-lg shadow-[#E10600]/20 active:scale-[0.98] uppercase tracking-widest"
                                        >
                                            Thêm giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Infinite Scroll Trigger */}
                    {visibleCount < filteredData.length && (
                        <div ref={loaderRef} className="py-20 flex justify-center">
                            <div className="animate-bounce text-theme-muted font-black text-[10px] uppercase tracking-[0.3em]">
                                Đang tải thêm kênh...
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Marketplace;