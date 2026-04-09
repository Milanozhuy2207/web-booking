import React, { useMemo, useState } from 'react';
import { groupsData } from '../data/mockData';
import { FiFilter, FiChevronDown, FiSearch, FiX, FiFacebook } from 'react-icons/fi';
import { useCart } from './CartContext';
import banner from '../assets/Banner.png';

const HeroStats = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { 
        selectedCategory, setSelectedCategory,
        followerRange, setFollowerRange,
        budgetRange, setBudgetRange,
        categories, followerOptions, budgetOptions,
        searchTerm, setSearchTerm
    } = useCart();

    const stats = useMemo(() => {
        const totalChannels = groupsData.length;
        const totalFollowers = "5.8M+"; // Estimated based on FB only data
        const totalCategories = new Set(groupsData.map(item => item.category)).size;

        return [
            { label: 'Số kênh Facebook', value: totalChannels },
            { label: 'Tổng Followers', value: totalFollowers },
            { label: 'Chủ đề đa dạng', value: totalCategories }
        ];
    }, []);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8 pb-8 font-sans transition-colors duration-300">
            {/* Banner Section - Luxury Profile Style */}
            <div className="relative w-full h-[600px] md:h-[750px] rounded-[40px] overflow-hidden mb-12 shadow-2xl">
                {/* Background Image with Darkened Overlay */}
                <img src={banner} alt="Vén Khéo Banner" className="w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                {/* Centered Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">

                    {/* Branding Title */}
                    <div className="mb-10">
                        <h2 className="inline-block bg-[#E10600] text-white text-[15px] md:text-[17px] font-black uppercase tracking-[0.4em] px-8 py-3 rounded-full mb-6 shadow-2xl shadow-[#E10600]/40 animate-pulse-slow flex items-center gap-3">
                            Hệ Thống Booking
                        </h2>
                        <h1 className="text-white text-[39px] md:text-[87px] font-black uppercase tracking-tighter mb-2 drop-shadow-2xl leading-none">
                            VÉN KHÉO<span className="text-[#E10600]">.</span>
                        </h1>
                        <p className="text-white text-sm md:text-base font-medium max-w-2xl mx-auto opacity-80 leading-relaxed italic hidden sm:block">
                            "Kết nối thương hiệu với cộng đồng Facebook Fanpage & Group chất lượng nhất"
                        </p>
                    </div>

                    {/* Integrated Controls Group */}
                    <div className="w-full max-w-[1100px] flex flex-col items-center gap-6">

                        {/* Luxury Stats Bar - Expanded */}
                        <div className="flex items-center justify-around bg-white/5 backdrop-blur-xl border border-white/10 rounded-[35px] p-8 md:p-10 shadow-2xl relative overflow-hidden group w-full transition-all duration-500 hover:border-white/20">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {stats.map((stat, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center flex-1">
                                        <p className="text-white text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase mb-2 whitespace-nowrap opacity-80">
                                            {stat.label}
                                        </p>
                                        <p className="text-white text-3xl md:text-5xl font-black tracking-tighter drop-shadow-lg">
                                            {stat.value}
                                        </p>
                                    </div>
                                    {index < stats.length - 1 && (
                                        <div className="h-16 md:h-20 w-[1.5px] bg-white/10 mx-4" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Search & Filter Floating Bar */}
                        <div className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-4 md:p-5 rounded-[32px] shadow-3xl flex flex-col md:flex-row items-center gap-4">

                            {/* Expanded Search Input */}
                            <div className="relative flex-1 group w-full">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <FiSearch className="text-white/50 group-focus-within:text-[#E10600] transition-colors text-lg" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm Fanpage, Group, chủ đề..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 text-white text-sm font-bold py-4 pl-12 pr-4 rounded-[20px] focus:outline-none focus:border-[#E10600] transition-all placeholder:text-white/30"
                                />
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                {/* Advanced Filter Toggle Button */}
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center justify-center gap-3 bg-[#E10600] hover:bg-red-700 text-white px-8 py-4 rounded-[20px] font-black text-xs transition-all uppercase tracking-widest shadow-xl shadow-[#E10600]/20 active:scale-95 whitespace-nowrap"
                                >
                                    <FiFilter size={16} />
                                    LỌC NÂNG CAO
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Advanced Filter Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-[#151a28] border border-white/10 w-full max-w-lg rounded-[40px] p-8 md:p-12 shadow-3xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-white text-2xl font-black uppercase tracking-tight">Bộ lọc Facebook</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-60">Tối ưu chiến dịch của bạn</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#E10600] hover:text-white transition-all shadow-inner"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Category Filter */}
                            <div>
                                <label className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 block opacity-50">Lĩnh vực cộng đồng</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setSelectedCategory(opt)}
                                            className={`py-4 px-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                                selectedCategory === opt 
                                                ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/20' 
                                                : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                                            }`}
                                        >
                                            {opt === 'All' ? 'Tất cả chủ đề' : opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Follower Range Filter */}
                            <div>
                                <label className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 block opacity-50">Lượt theo dõi / Thành viên</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {followerOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setFollowerRange(opt)}
                                            className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                                                followerRange === opt 
                                                ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/20' 
                                                : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                                            }`}
                                        >
                                            {opt === 'All' ? 'Tất cả' : opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Range Filter */}
                            <div>
                                <label className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 block opacity-50">Ngân sách dự kiến</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {budgetOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setBudgetRange(opt)}
                                            className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                                                budgetRange === opt 
                                                ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/20' 
                                                : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                                            }`}
                                        >
                                            {opt === 'All' ? 'Tất cả' : opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-white text-[#151a28] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs mt-10 hover:bg-[#E10600] hover:text-white transition-all shadow-xl active:scale-95"
                        >
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroStats;