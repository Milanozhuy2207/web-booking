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
    // Cách 1: Tách nhỏ các thư viện trong node_modules ra từng file riêng
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    // Cách 2: Nếu ông lười chia nhỏ code mà muốn hết cảnh báo thì dùng dòng dưới
    // chunkSizeWarningLimit: 1000, 
  },
})