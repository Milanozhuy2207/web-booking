import React, { useMemo, useState } from 'react';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from './CartContext';
import { groupsData } from '../data/mockData';

const HeroStats = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const { 
        selectedCategory, setSelectedCategory,
        followerRange, setFollowerRange,
        budgetRange, setBudgetRange,
        categories, followerOptions, budgetOptions,
        searchTerm, setSearchTerm
    } = useCart();

    const stats = useMemo(() => {
        // We can get groupsData from the hook if it's exposed, 
        // but it's easier to just calculate from the source of truth
        const parseFollowers = (val) => {
            if (typeof val !== 'string') return 0;
            const num = parseFloat(val.replace(',', '.'));
            if (val.toUpperCase().includes('M') || val.includes('triệu')) return num * 1000000;
            if (val.toUpperCase().includes('K')) return num * 1000;
            return num;
        };

        const totalFollowers = groupsData.reduce((acc, curr) => acc + parseFollowers(curr.followers), 0);
        const formatFollowers = (num) => {
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
            return num.toString();
        };

        const uniqueTopics = new Set(groupsData.map(item => item.category)).size;

        return [
            { label: 'SỐ KÊNH', value: groupsData.length.toString() },
            { label: 'FOLLOWERS', value: formatFollowers(totalFollowers) },
            { label: 'NGÀNH NGHỀ', value: uniqueTopics.toString(), isTopic: true }
        ];
    }, []);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8 pb-8 font-sans transition-colors duration-300">
            {/* Main Header Container - Red Theme based on Layout */}
            <div className="relative w-full rounded-[40px] md:rounded-[60px] overflow-hidden mb-12 shadow-2xl bg-[#E10600] p-6 md:p-16">
                {/* Texture/Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center">

                    {/* Branding Title - Italic & Bold like screenshot */}
                    <h2 className="text-white text-2xl md:text-6xl font-black italic uppercase tracking-tight mb-8 md:mb-12 drop-shadow-lg text-center max-w-sm md:max-w-none leading-tight">
                        HỆ THỐNG BOOKING VÉN KHÉO NETWORK
                    </h2>
                    
                    {/* Stats Row - 3 Boxes - Adjusted for Mobile Layout in screenshot */}
                    <div className="grid grid-cols-3 gap-2 md:gap-8 w-full max-w-6xl mb-8 md:mb-12">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                onClick={() => stat.isTopic ? setIsTopicModalOpen(true) : null}
                                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[20px] md:rounded-[40px] p-3 md:p-10 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 cursor-pointer shadow-lg"
                            >
                                <p className="text-white text-[7px] md:text-xs font-black tracking-widest uppercase mb-1 md:mb-2 opacity-90 flex items-center gap-1 whitespace-nowrap">
                                    {stat.label} {stat.isTopic && <span className="text-[6px] md:text-[10px]">▼</span>}
                                </p>
                                <p className="text-white text-base md:text-7xl font-black tracking-tighter drop-shadow-md">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Controls - Vertical on mobile, Horizontal on desktop */}
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full max-w-xl md:max-w-4xl">
                        {/* Search Input */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Tìm Kênh theo tên..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/20 border border-white/10 text-white text-xs md:text-base font-bold py-4 md:py-5 px-6 rounded-[20px] md:rounded-3xl focus:outline-none focus:bg-white/30 transition-all placeholder:text-white/60 text-left"
                            />
                        </div>

                        {/* Filter Button - White background, red text */}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full md:w-auto bg-white text-[#E10600] hover:bg-gray-100 px-10 py-4 md:py-5 rounded-[20px] md:rounded-3xl font-black text-xs md:text-sm transition-all uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 whitespace-nowrap active:scale-95 cursor-pointer"
                        >
                            <FiFilter size={18} />
                            LỌC NÂNG CAO
                        </button>
                    </div>

                    {/* Logo Watermark like screenshot */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none translate-x-1/4">
                        <div className="w-[400px] h-[400px] border-[40px] border-white rounded-full flex items-center justify-center">
                            <div className="w-40 h-40 bg-white rounded-lg rotate-12"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topic Modal */}
            {isTopicModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsTopicModalOpen(false)} />
                    <div className="relative bg-[#151a28] border border-white/10 w-full max-w-2xl rounded-[40px] p-8 md:p-12 shadow-3xl">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-white text-3xl font-black uppercase tracking-tight">Chọn Ngành Nghề</h3>
                                <p className="text-[#E10600] text-xs font-black uppercase tracking-widest mt-1">Khám phá cộng đồng theo chủ đề</p>
                            </div>
                            <button onClick={() => setIsTopicModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#E10600] hover:text-white transition-all">
                                <FiX size={20} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {categories.map(opt => (
                                <button 
                                    key={opt} 
                                    onClick={() => {
                                        setSelectedCategory(opt);
                                        setIsTopicModalOpen(false);
                                    }} 
                                    className={`group flex items-center justify-between py-6 px-8 rounded-[30px] text-sm font-black uppercase tracking-widest transition-all border ${selectedCategory === opt ? 'bg-[#E10600] border-[#E10600] text-white shadow-xl' : 'bg-white/5 border-white/5 text-gray-400 hover:border-[#E10600]/50 hover:text-white'}`}
                                >
                                    <span>{opt === 'All' ? 'Tất cả chủ đề' : opt}</span>
                                    <div className={`w-2 h-2 rounded-full transition-all ${selectedCategory === opt ? 'bg-white scale-150' : 'bg-gray-700 group-hover:bg-[#E10600]'}`}></div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-black/40 rounded-3xl border border-white/5">
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed italic">
                                * Lựa chọn ngành nghề giúp hệ thống hiển thị chính xác các cộng đồng phù hợp với mục tiêu truyền thông của doanh nghiệp.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Advanced Filter Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-[#151a28] border border-white/10 w-full max-w-lg rounded-[40px] p-8 md:p-12 shadow-3xl">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-white text-2xl font-black uppercase tracking-tight">Bộ lọc Facebook</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-60">Tối ưu chiến dịch</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#E10600] hover:text-white transition-all">
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <label className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 block opacity-50">Lượt theo dõi / Thành viên</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {followerOptions.map(opt => (
                                        <button key={opt} onClick={() => setFollowerRange(opt)} className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${followerRange === opt ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/20' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>
                                            {opt === 'All' ? 'Tất cả' : opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 block opacity-50">Ngân sách dự kiến</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {budgetOptions.map(opt => (
                                        <button key={opt} onClick={() => setBudgetRange(opt)} className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${budgetRange === opt ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/20' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>
                                            {opt === 'All' ? 'Tất cả' : opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="w-full bg-white text-[#151a28] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs mt-10 hover:bg-[#E10600] hover:text-white transition-all shadow-xl active:scale-95">
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroStats;
