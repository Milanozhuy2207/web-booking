import React from 'react';

const PromotionPage = () => {
    const deals = [
        {
            range: "2 - 5 BÀI",
            discount: "10%",
            height: "h-[200px]",
            bgColor: "bg-[#008000]" // Deep green
        },
        {
            range: "6 - 10 BÀI",
            discount: "15%",
            height: "h-[280px]",
            bgColor: "bg-[#006400]" // Darker green
        },
        {
            range: "11 - 20 BÀI",
            discount: "20%",
            height: "h-[350px]",
            bgColor: "bg-[#228B22]" // Forest green
        },
        {
            range: "TRÊN 20 BÀI",
            discount: "25%",
            height: "h-[450px]",
            bgColor: "bg-[#4ade80]", // Bright green (Lime)
            highlight: true
        }
    ];

    return (
        <div className="bg-theme-primary min-h-screen font-sans flex flex-col items-center justify-center py-20 px-4 transition-colors duration-300">
            {/* Main Title */}
            <div className="text-center mb-20">
                <h1 className="text-theme-primary text-6xl md:text-8xl font-black italic tracking-tighter leading-none flex flex-col items-center">
                    <span className="drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">MUA NHIỀU</span>
                    <span className="drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">GIẢM ĐẬM</span>
                </h1>
            </div>

            {/* Bars Container */}
            <div className="flex items-end justify-center gap-4 md:gap-6 w-full max-w-6xl mb-12">
                {deals.map((deal, index) => (
                    <div 
                        key={index} 
                        className={`relative ${deal.height} w-full flex flex-col items-center justify-center rounded-t-[40px] md:rounded-t-[60px] transition-all duration-500 hover:scale-105 cursor-default ${deal.bgColor}`}
                    >
                        {deal.highlight && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                <div className="bg-[#fbbf24] text-black text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap shadow-lg">
                                    BÙNG NỔ ⚡
                                </div>
                            </div>
                        )}
                        
                        <div className="text-center px-2">
                            <p className="text-white/80 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2">
                                BOOKING TỪ
                            </p>
                            <p className="text-white text-sm md:text-lg font-black uppercase mb-4">
                                {deal.range}
                            </p>
                            <div className="text-white text-5xl md:text-7xl font-black italic tracking-tighter drop-shadow-lg">
                                {deal.discount}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Text Box */}
            <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md border border-white/5 py-4 px-8 rounded-2xl text-center">
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-relaxed">
                    <span className="text-gray-400">ÁP DỤNG TỰ ĐỘNG CHO PLATFORM: </span>
                    <span className="text-[#4ade80]">FACEBOOK GROUP, FACEBOOK PAGE</span>
                </p>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-1">
                    <span className="text-gray-400">THUỘC VeoKheo LLC: </span>
                </p>
            </div>
        </div>
    );
};

export default PromotionPage;