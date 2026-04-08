import React, { useMemo } from 'react';
import { groupsData } from '../data/mockData';

const HeroStats = () => {
    const stats = useMemo(() => {
        const totalChannels = groupsData.length;
        const totalFollowers = "7.3M+"; 
        const totalCategories = new Set(groupsData.map(item => item.category)).size;

        return [
            { label: 'Số kênh', value: totalChannels, color: 'text-[#00a624]' },
            { label: 'Followers', value: totalFollowers, color: 'text-theme-primary' },
            { label: 'Chủ đề', value: totalCategories, color: 'text-[#00a624]' }
        ];
    }, []);

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-10 pb-8 font-sans transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-[#00a624] text-xs font-black uppercase tracking-[0.3em] mb-3">Hệ thống Booking</h2>
                    <h1 className="text-theme-primary text-4xl md:text-5xl font-black uppercase tracking-tight">
                        VÉN KHÉO <span className="text-[#00a624]">.</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="bg-theme-card border border-theme rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group hover:border-[#00a624]/30 transition-all duration-500"
                    >
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#00a624]/5 rounded-full blur-2xl group-hover:bg-[#00a624]/10 transition-colors" />
                        <p className="text-theme-muted text-[11px] font-black tracking-[0.2em] uppercase mb-3 relative z-10">{stat.label}</p>
                        <p className={`${stat.color} text-5xl md:text-6xl font-black tracking-tighter relative z-10`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroStats;