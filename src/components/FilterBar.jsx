import React from 'react';
import { FiFilter, FiChevronDown, FiSearch } from 'react-icons/fi';
import { useCart } from './CartContext';

const FilterBar = () => {
    const { 
        selectedCategory, setSelectedCategory,
        followerRange, setFollowerRange,
        budgetRange, setBudgetRange,
        categories, followerOptions, budgetOptions,
        filteredData,
        searchTerm, setSearchTerm
    } = useCart();

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-8 font-sans transition-colors duration-300">
            <div className="flex flex-col lg:flex-row justify-between items-center bg-theme-card p-4 rounded-2xl border border-theme gap-4 shadow-xl">
                
                <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto flex-1">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-theme-muted" />
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm kênh, KOLs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-theme-secondary border border-theme text-theme-primary text-xs font-bold py-2.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-[#E10600] transition-colors placeholder:text-theme-muted/50"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        {/* Category Select */}
                        <div className="relative flex-1 md:flex-none">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full appearance-none bg-theme-secondary text-theme-primary text-xs font-bold py-2.5 pl-4 pr-10 rounded-xl border border-theme focus:border-[#E10600] outline-none cursor-pointer uppercase tracking-wider transition-colors"
                            >
                                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'CHỦ ĐỀ' : c}</option>)}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                        </div>

                        {/* Follower Range Select */}
                        <div className="relative flex-1 md:flex-none">
                            <select 
                                value={followerRange}
                                onChange={(e) => setFollowerRange(e.target.value)}
                                className="w-full appearance-none bg-theme-secondary text-theme-primary text-xs font-bold py-2.5 pl-4 pr-10 rounded-xl border border-theme focus:border-[#E10600] outline-none cursor-pointer uppercase tracking-wider transition-colors"
                            >
                                {followerOptions.map(f => <option key={f} value={f}>{f === 'All' ? 'FOLLOWERS' : f}</option>)}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                        </div>

                        {/* Budget Range Select */}
                        <div className="relative flex-1 md:flex-none">
                            <select 
                                value={budgetRange}
                                onChange={(e) => setBudgetRange(e.target.value)}
                                className="w-full appearance-none bg-theme-secondary text-theme-primary text-xs font-bold py-2.5 pl-4 pr-10 rounded-xl border border-theme focus:border-[#E10600] outline-none cursor-pointer uppercase tracking-wider transition-colors"
                            >
                                {budgetOptions.map(b => <option key={b} value={b}>{b === 'All' ? 'BUDGET' : b}</option>)}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
                    <div className="text-theme-muted font-medium text-sm whitespace-nowrap">
                        Hiển thị <span className="text-theme-primary font-black">{filteredData.length}</span> kết quả
                    </div>

                    <button className="flex items-center gap-2 bg-[#E10600] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-black text-xs transition-all uppercase tracking-wider shadow-lg shadow-[#E10600]/20 active:scale-95">
                        <FiFilter size={14} />
                        LỌC NÂNG CAO
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FilterBar;