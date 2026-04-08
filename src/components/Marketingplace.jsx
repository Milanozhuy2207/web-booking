import React from 'react';
import { useCart } from './CartContext';
import { FiPlus, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Marketplace = () => {
    const { addToCart, filteredData } = useCart();

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 font-sans transition-colors duration-300">
            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-theme-card rounded-3xl border border-theme shadow-lg">
                    <p className="text-theme-muted text-lg font-medium">Không tìm thấy kết quả phù hợp</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredData.map((group) => (
                        <div
                            key={group.id}
                            className="bg-theme-card rounded-2xl overflow-hidden flex flex-col justify-between border border-theme hover:border-[#00a624]/50 transition-all duration-300 shadow-xl group"
                        >
                            {/* Card Image */}
                            <div className="relative h-44 w-full bg-theme-secondary overflow-hidden">
                                <img
                                    src={group.image}
                                    alt={group.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="bg-[#00a624] text-white text-[10px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase shadow-lg">
                                        {group.platform}
                                    </span>
                                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase shadow-lg">
                                        {group.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <div className="mb-4">
                                    <h3 className="text-theme-primary font-black text-[16px] uppercase leading-tight line-clamp-2 min-h-[40px] group-hover:text-[#00a624] transition-colors">
                                        {group.name}
                                    </h3>
                                    <p className="text-theme-muted text-xs italic line-clamp-2 mt-2 leading-relaxed">
                                        "{group.description}"
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-5 mt-auto">
                                    <div className="bg-theme-secondary p-2.5 rounded-xl border border-theme flex flex-col items-center justify-center transition-colors">
                                        <p className="text-theme-muted text-[9px] font-black uppercase mb-1 flex items-center gap-1">
                                            <FiTrendingUp size={10} /> Booking
                                        </p>
                                        <p className="text-[#00a624] font-black text-sm">{group.bookingPrice}</p>
                                    </div>
                                    <div className="bg-theme-secondary p-2.5 rounded-xl border border-theme flex flex-col items-center justify-center transition-colors">
                                        <p className="text-theme-muted text-[9px] font-black uppercase mb-1 flex items-center gap-1">
                                            <FiUsers size={10} /> Followers
                                        </p>
                                        <p className="text-theme-primary font-black text-sm">{group.followers}</p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => addToCart(group)}
                                    className="w-full bg-[#00a624]/10 hover:bg-[#00a624] text-[#00a624] hover:text-white font-black text-xs py-3.5 rounded-xl border border-[#00a624]/20 hover:border-[#00a624] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-[#00a624]/5"
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