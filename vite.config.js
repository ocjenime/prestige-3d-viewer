import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/prestige-3d-viewer/',
  server: {
    port: 3000,
    host: true
  }
})
