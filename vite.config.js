import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: { // <--- YOU WERE MISSING THIS WRAPPER!
      '/jdoodle-api': {
        target: 'https://api.jdoodle.com/v1/execute',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jdoodle-api/, '')
      }
    }
  }
})