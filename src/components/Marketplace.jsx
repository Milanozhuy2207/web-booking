import React, { useState, useEffect } from 'react';
import { useCart } from './CartContextInstance';
import { FiPlus, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData, isLoading } = useCart();
    
    // Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = React.useRef(null);

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
                <p className="mt-4 text-theme-muted font-bold uppercase tracking-widest text-xs">Đang tải dữ liệu...</p>
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
                                            src={group.image || '/favicon.svg'}
                                            alt={group.name}
                                            onError={(e) => {
                                                e.target.src = '/favicon.svg';
                                                e.target.className = "w-full h-full object-contain p-8 opacity-20 group-hover:scale-110 transition-transform duration-700";
                                            }}
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
                                </div>

                                {/* Card Body */}
                                <div className="p-3 md:p-6 flex-1 flex flex-col justify-between relative z-10 pointer-events-none">
                                    <div className="space-y-2 md:space-y-4">
                                        <div className="flex flex-col gap-1 md:gap-2">
                                            <h3 className="text-theme-primary font-black text-xs md:text-lg uppercase leading-tight md:leading-snug group-hover:text-[#E10600] transition-colors duration-300 line-clamp-2">
                                                {group.name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="bg-theme-secondary text-theme-muted text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.1em] border border-theme">
                                                    {group.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Stats Row */}
                                        <div className="flex justify-between items-center py-2 md:py-4 border-y border-theme/50">
                                            <div className="flex items-center gap-1.5 md:gap-3 text-theme-muted">
                                                <FiUsers size={14} className="text-[#E10600] md:w-5 md:h-5" />
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] md:text-sm font-black text-theme-primary leading-none uppercase tracking-wider">{group.followers}</span>
                                                    <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest opacity-40">Followers</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-3 text-theme-muted">
                                                <FiTrendingUp size={14} className="text-[#E10600] md:w-5 md:h-5" />
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] md:text-sm font-black text-theme-primary leading-none uppercase tracking-wider">TĂNG TRƯỞNG</span>
                                                    <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest opacity-40">Ổn định</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Area */}
                                    <div className="mt-4 md:mt-8 flex items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-theme-muted text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">CHI PHÍ BOOKING</span>
                                            <span className="text-theme-primary font-black text-sm md:text-2xl tracking-tighter">
                                                {group.bookingPrice}
                                            </span>
                                        </div>
                                        
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addToCart(group);
                                            }}
                                            className="pointer-events-auto bg-theme-secondary hover:bg-[#E10600] text-theme-primary hover:text-white p-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl transition-all duration-500 border border-theme group/btn shadow-lg active:scale-95"
                                        >
                                            <FiPlus size={18} className="md:w-6 md:h-6" />
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