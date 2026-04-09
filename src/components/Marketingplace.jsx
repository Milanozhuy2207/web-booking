import React from 'react';
import { useCart } from './CartContext';
import { FiPlus, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData } = useCart();

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 font-sans transition-colors duration-300">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-theme pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-[#E10600] rounded-full shadow-lg shadow-[#E10600]/20" />
                    <div>
                        <h2 className="text-theme-primary text-2xl md:text-3xl font-black uppercase tracking-tight">
                            DANH SÁCH HỆ THỐNG <span className="text-[#E10600]">.</span>
                        </h2>
                        <p className="text-theme-muted text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-1 opacity-60">
                            Khám phá các kênh social chất lượng từ Vén Khéo
                        </p>
                    </div>
                </div>
                
                <div className="bg-theme-card border border-theme px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
                    <span className="text-theme-primary font-black text-sm uppercase tracking-widest">
                        HIỂN THỊ: <span className="text-[#E10600]">{filteredData.length}</span> KÊNH
                    </span>
                </div>
            </div>

            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-theme-card rounded-3xl border border-theme shadow-lg">
                    <p className="text-theme-muted text-lg font-medium">Không tìm thấy kết quả phù hợp</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredData.map((group) => (
                        <div
                            key={group.id}
                            className="bg-theme-card rounded-[32px] overflow-hidden flex flex-col justify-between border border-theme hover:border-[#E10600]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#E10600]/10 group relative"
                        >
                            {/* Subtle Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E10600]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Card Image */}
                            <div className="relative h-48 w-full bg-theme-secondary overflow-hidden">
                                <img
                                    src={group.image}
                                    alt={group.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-[#E10600] text-white text-[10px] font-black px-3 py-1.5 rounded-xl tracking-[0.2em] uppercase shadow-lg backdrop-blur-md">
                                        {group.platform}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-1 relative z-10">
                                <div className="mb-6">
                                    <h3 className="text-theme-primary font-black text-lg uppercase leading-tight line-clamp-2 min-h-[48px] group-hover:text-[#E10600] transition-colors duration-300">
                                        {group.name}
                                    </h3>
                                    <p className="text-theme-muted text-xs italic line-clamp-2 mt-3 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                        "{group.description}"
                                    </p>
                                </div>

                                {/* Unified Stats Box */}
                                <div className="bg-theme-secondary/50 group-hover:bg-theme-secondary rounded-2xl border border-theme p-4 flex justify-around items-center mb-6 mt-auto transition-colors duration-300">
                                    <div className="flex flex-col items-center flex-1 text-center">
                                        <p className="text-theme-muted text-[9px] font-black uppercase mb-1 flex items-center gap-1.5 tracking-[0.1em]">
                                            <FiTrendingUp size={12} className="text-[#E10600]" /> Booking
                                        </p>
                                        <p className="text-[#E10600] font-black text-sm">{group.bookingPrice}</p>
                                    </div>
                                    
                                    <div className="h-8 w-px bg-theme-muted/20" />
                                    
                                    <div className="flex flex-col items-center flex-1 text-center">
                                        <p className="text-theme-muted text-[9px] font-black uppercase mb-1 flex items-center gap-1.5 tracking-[0.1em]">
                                            <FiUsers size={12} className="text-[#E10600]" /> Followers
                                        </p>
                                        <p className="text-theme-primary font-black text-sm">{group.followers}</p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => addToCart(group)}
                                    className="w-full bg-[#E10600]/5 hover:bg-[#E10600] text-[#E10600] hover:text-white font-black text-xs py-4 rounded-2xl border border-[#E10600]/20 hover:border-[#E10600] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.3em] shadow-lg shadow-transparent hover:shadow-[#E10600]/30 overflow-hidden relative"
                                >
                                    <FiPlus size={16} /> THÊM GIỎ HÀNG
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Marketplace;