import React from 'react';

const ZaloChat = () => {
  return (
    <div className="fixed bottom-24 right-4 z-[9999] md:bottom-10 md:right-10">
      {/* Both Label and Icon jump together for a sharp "Active" look */}
      <div className="relative flex items-center justify-center animate-bounce hover:animate-none">
        
        {/* Hotline Label - Sharp and jumping */}
        <div className="flex flex-col items-end absolute right-full mr-3 md:mr-4 gap-2">
          <span className="hidden md:group-hover:block bg-white text-blue-600 px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-black whitespace-nowrap border border-blue-50 uppercase tracking-widest">
            Chat với chúng tôi
          </span>
          <a 
            href="tel:0962500719"
            className="bg-[#E10600] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-[0_10px_25px_rgba(225,6,0,0.4)] text-[10px] md:text-sm font-black whitespace-nowrap border border-white/20 tracking-wider block transition-transform hover:scale-105 active:scale-95"
          >
            HOTLINE: 0962500719
          </a>
        </div>

        {/* Zalo Icon - Sharp and jumping */}
        <a 
          href="https://zalo.me/0962500719" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative flex items-center justify-center"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
            alt="Zalo Chat" 
            className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl transform hover:scale-110 transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  );
};

export default ZaloChat;