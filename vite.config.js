import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 補上這行

// https://vite.dev/config/
export default defineConfig({
  base: '/Veggie-with-you/',
  plugins: [
    react(),
    tailwindcss(), // 2. 補上這行
  ],
})
