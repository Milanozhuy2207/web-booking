import React from 'react';

const ZaloChat = () => {
  return (
    <div className="fixed bottom-24 right-6 z-9999 md:bottom-10 md:right-10 flex flex-col items-center gap-4 animate-bounce hover:animate-none transition-all duration-300 group">
      <a 
        href="https://zalo.me/0962500719" 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75 group-hover:opacity-0 transition-opacity duration-300"></div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
          alt="Zalo Chat" 
          className="w-14 h-14 md:w-16 md:h-16 relative z-10 drop-shadow-lg transform hover:scale-110 transition-transform duration-300"
        />
      </a>
      {/* Tooltip or Label if needed */}
      <span className="hidden group-hover:block absolute right-full mr-4 bg-white text-blue-600 px-3 py-1 rounded-lg shadow-md text-sm font-semibold whitespace-nowrap border border-blue-100">
        Chat với chúng tôi
      </span>
    </div>
  );
};

export default ZaloChat;