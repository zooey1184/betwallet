import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/web3bet/dist/',
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    proxy: {
      '/v1': 'http://47.242.226.50:7020'
    }
  },
  build: {
    
  }
})
