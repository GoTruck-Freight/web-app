import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  fileURLToPath,
  URL
} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url))
    }
  },
  server: {
    port: 8000,
    host: true
  },
  preview: {
    port: 8000,
    host: true
  },
  devServer: {
    proxy: 'http://localhost:8000/'
  }
})