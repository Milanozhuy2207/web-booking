import React, { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContextInstance';
import { FiPlus, FiUsers, FiExternalLink } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData, isLoading, trackView } = useCart();
    
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
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
                        {displayData.map((group) => (
                            <div
                                key={group.id}
                                onClick={() => {
                                    trackView(group.id);
                                    window.open(group.link || '#', '_blank');
                                }}
                                className="bg-theme-card rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col border border-theme hover:border-[#E10600]/30 transition-all duration-300 shadow-sm hover:shadow-2xl group relative cursor-pointer"
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
                                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#E10600] text-white text-[8px] md:text-[10px] font-black px-2 py-1 md:px-3 md:py-1.5 rounded-md uppercase tracking-wider">
                                        {group.platform}
                                    </div>

                                    {/* Link Icon - Top Right */}
                                    <div 
                                        className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2.5 bg-[#FFCC00] text-black rounded-lg md:rounded-xl transition-transform hover:scale-110 z-10"
                                    >
                                        <FiExternalLink size={14} className="md:w-[18px] md:h-[18px]" strokeWidth={3} />
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-3 md:p-6 flex-1 flex flex-col">
                                    {/* Title & Category Row */}
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-1 md:gap-2 mb-2 md:mb-4 min-h-[3rem]">
                                        <h3 className="text-theme-primary font-black text-xs md:text-lg uppercase leading-tight line-clamp-2">
                                            {group.name}
                                        </h3>
                                        <span className="text-[#E10600] text-[8px] md:text-[10px] font-black uppercase tracking-widest flex-shrink-0">
                                            {group.category}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-theme-muted text-[10px] md:text-xs italic opacity-60 mb-4 md:mb-6 flex-1 line-clamp-2 md:line-clamp-none">
                                        “{group.description || 'Chưa có mô tả cho kênh này'}”
                                    </p>
                                    
                                    {/* Bottom Action Area */}
                                    <div className="mt-auto">
                                        {/* Stats Box (Dark Background) */}
                                        <div className="bg-[#121826] rounded-xl md:rounded-2xl p-2 md:p-4 grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-6 transition-colors group-hover:bg-[#1a2233]">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-theme-muted text-[7px] md:text-[8px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-50">Booking</span>
                                                <span className="text-[#E10600] font-black text-[10px] md:text-base tracking-tighter">
                                                    {group.bookingPrice}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 items-end">
                                                <span className="text-theme-muted text-[7px] md:text-[8px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-50">Followers</span>
                                                <span className="text-white font-black text-[10px] md:text-base tracking-tighter">
                                                    {group.followers}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(group);
                                            }}
                                            className="w-full bg-[#E10600] hover:bg-red-700 text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm transition-all duration-300 shadow-lg shadow-[#E10600]/20 active:scale-[0.98] uppercase tracking-widest"
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