import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../components/CartContext';
import logo from '../assets/logo.png';

const ServicePage = () => {
    const { addToCart, cartItems } = useCart();

    const services = [
        {
            id: 'srv-1',
            name: "VenKheo BUZZ",
            title: "VenKheo BUZZ",
            platform: "Dịch vụ",
            image: logo,
            subtitle: "KHỞI ĐỘNG",
            mainGoal: "Kích hoạt thảo luận ban đầu",
            features: [
                "2 post/ngày trên 2 cộng đồng VenKheoLLC bất kỳ",
                "Cam kết >50,000 tương tác",
                "Reach tối thiểu 300,000",
                "Thay cover 1 group",
                "Ghim 2 post"
            ],
            duration: "GIÁ TRỊ TRỌN GÓI (7 NGÀY):",
            displayPrice: "25.000.000 ₫",
            price: 25000000
        },
        {
            id: 'srv-2',
            name: "VenKheo PRO",
            title: "VenKheo PRO",
            platform: "Dịch vụ",
            image: logo,
            subtitle: "KHUẾCH ĐẠI",
            mainGoal: "Tăng uy tín & độ phủ",
            features: [
                "5 post/ngày trên 3 cộng đồng",
                "Cam kết >100,000 tương tác",
                "Reach tối thiểu 600,000",
                "Thay cover 2 group",
                "Ghim tối đa 3 post"
            ],
            duration: "GIÁ TRỊ TRỌN GÓI (14 NGÀY):",
            displayPrice: "40.000.000 ₫",
            price: 40000000
        },
        {
            id: 'srv-3',
            name: "VenKheo PARTNER",
            title: "VenKheo PARTNER",
            platform: "Dịch vụ",
            image: logo,
            subtitle: "ĐỒNG HÀNH",
            mainGoal: "Xây dựng ảnh hưởng dài hạn",
            features: [
                "Chiến lược nội dung chuyên sâu",
                "Quản trị 1-2 kênh",
                "Hàng triệu tương tác định hướng Thương hiệu.",
                "Miễn phí chi phí quản lý Quảng cáo.",
                "Báo cáo số liệu chuyên nghiệp"
            ],
            duration: "GIÁ TRỊ TRỌN GÓI (30 NGÀY):",
            displayPrice: "100.000.000 ₫",
            price: 100000000
        }
    ];

    return (
        <div className="bg-theme-primary min-h-screen font-sans py-24 px-4 transition-colors duration-300">
            {/* Main Header */}
            <div className="text-center mb-16">
                <h1 className="text-theme-primary text-6xl md:text-8xl font-black italic tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(225,6,0,0.2)]">
                    DỊCH VỤ <span className="text-[#E10600]">VenKheo</span>
                </h1>
                <p className="text-theme-primary text-sm md:text-lg font-medium italic opacity-80 hidden md:block">
                    Bùng nổ Thảo luận Cộng đồng cùng VenKheoLLC.
                </p>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className="bg-[#0f172a] rounded-[60px] p-10 md:p-14 border border-white/5 shadow-2xl flex flex-col items-center transition-all duration-500 hover:translate-y-[-10px] hover:border-[#E10600]/30 group"
                    >
                        {/* Title Section */}
                        <div className="text-center mb-10">
                            <h2 className="text-[#E10600] text-3xl md:text-5xl font-black tracking-tight mb-2">
                                {service.title}
                            </h2>
                            <p className="text-gray-500 text-xs font-black uppercase tracking-[0.3em]">
                                {service.subtitle}
                            </p>
                        </div>

                        {/* Main Goal Box */}
                        <div className="w-full bg-black/60 rounded-[32px] p-6 mb-10 border border-white/5 text-center">
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">MỤC TIÊU CHÍNH:</p>
                            <p className="text-white font-black text-sm md:text-base">{service.mainGoal}</p>
                        </div>

                        {/* Features List */}
                        <div className="w-full space-y-5 mb-12 flex-1">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <FiCheckCircle className="text-[#E10600] mt-1 shrink-0" size={16} />
                                    <span className="text-gray-300 text-sm font-bold leading-tight opacity-90">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Pricing Section */}
                        <div className="w-full text-center mb-10 border-t border-white/5 pt-10">
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
                                {service.duration}
                            </p>
                            <div className="text-[#E10600] text-3xl md:text-4xl font-black tracking-tighter italic">
                                {service.displayPrice}
                            </div>
                        </div>

                        {/* Action Button */}
                        <button 
                            onClick={() => addToCart(service)}
                            disabled={cartItems.some(item => item.id === service.id)}
                            className={`w-full font-black text-xs py-5 rounded-3xl uppercase tracking-[0.1em] transition-all active:scale-95 ${
                                cartItems.some(item => item.id === service.id)
                                ? 'bg-gray-500/20 text-gray-500 cursor-default'
                                : 'bg-[#E10600] hover:bg-[#b20500] text-white shadow-[0_10px_30px_rgba(225,6,0,0.3)]'
                            }`}
                        >
                            {cartItems.some(item => item.id === service.id) ? 'ĐÃ THÊM VÀO GIỎ' : 'THÊM VÀO CHIẾN DỊCH'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicePage;