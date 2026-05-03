import React from 'react';
import { useCart } from './CartContextInstance';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

const Notification = () => {
    const { notification } = useCart();

    if (!notification) return null;

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-[#151a28] border border-[#E10600]/30 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] backdrop-blur-xl">
                <div className="w-10 h-10 rounded-full bg-[#E10600]/10 flex items-center justify-center text-[#E10600]">
                    <FiCheckCircle size={20} />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#E10600] mb-0.5">Thông báo</p>
                    <p className="text-sm font-bold opacity-90">{notification}</p>
                </div>
            </div>
        </div>
    );
};

export default Notification;
