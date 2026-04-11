import React from 'react';
import { useCart } from './CartContext';
import { FiPlus, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData, cartItems } = useCart();

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 font-sans transition-colors duration-300">
            {/* Results Header */}
            <div className="mb-8">
                <h2 className="text-theme-primary text-xs md:text-sm font-black uppercase tracking-[0.2em] opacity-60">
                    HIỂN THỊ <span className="text-[#E10600]">{filteredData.length}</span> KÊNH
                </h2>
            </div>

            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-theme-card rounded-3xl border border-theme shadow-lg">
                    <p className="text-theme-primary text-lg font-medium">Không tìm thấy kết quả phù hợp</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
                    {filteredData.map((group) => (
                        <div
                            key={group.id}
                            className="bg-theme-card rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-between border border-theme hover:border-[#E10600]/50 transition-all duration-500 shadow-xl group relative"
                        >
                            {/* Subtle Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E10600]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Card Image */}
                            <div className="relative h-32 md:h-48 w-full bg-theme-secondary overflow-hidden p-2">
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
                                    <button className="bg-yellow-500 p-1.5 rounded-lg text-black shadow-lg cursor-pointer">
                                        <FiTrendingUp size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-3 md:p-6 flex flex-col flex-1 relative z-10 text-center md:text-left">
                                <div className="mb-4">
                                    <h3 className="text-theme-primary font-black text-sm md:text-lg uppercase leading-tight line-clamp-1 group-hover:text-[#E10600] transition-colors duration-300">
                                        {group.name}
                                    </h3>
                                    <p className="text-[#E10600] text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1">TIN TỨC & GIẢI TRÍ</p>
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
                                <button
                                    onClick={() => addToCart(group)}
                                    disabled={cartItems.some(item => item.id === group.id)}
                                    className={`w-full font-black text-[10px] md:text-xs py-3 rounded-xl border transition-all duration-300 active:scale-95 uppercase tracking-widest ${
                                        cartItems.some(item => item.id === group.id)
                                        ? 'bg-gray-500/10 border-gray-500/20 text-gray-500 cursor-default'
                                        : 'bg-[#E10600]/10 hover:bg-[#E10600] border-[#E10600]/20 text-[#E10600] hover:text-white'
                                    }`}
                                >
                                    {cartItems.some(item => item.id === group.id) ? 'ĐÃ TRONG GIỎ' : 'THÊM GIỎ HÀNG'}
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