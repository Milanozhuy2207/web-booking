import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // 1. Nâng giới hạn lên 1000kb để không bị báo lỗi vặt với các thư viện lớn
    chunkSizeWarningLimit: 1000, 
    
    rollupOptions: {
      output: {
        // 2. Tiếp tục chia nhỏ thư viện để trình duyệt load song song cho nhanh
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Tách các vendors lớn ra chunk riêng
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('lucide-react')) return 'vendor-icons';
            
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
})